from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import pandas as pd
import joblib

df = pd.read_excel("../derived_data/who_aap_2021_v9_11august2022.xlsx", sheet_name = "AAP_2022_city_v9")
tb = pd.read_csv('../derived_data/TB_notifications_2024-11-17.csv')

tb_cols = ['all_conf_xdr', 'conf_mdr', 'conf_rrmdr']
tb = tb[['country', 'year'] + tb_cols]
tb = tb.fillna(0)
tb['total_tb_cases'] = tb['all_conf_xdr'] + tb['conf_mdr'] + tb['conf_rrmdr']

tb = tb.loc[tb['total_tb_cases'] > 0]
df = df[['WHO Region', 'WHO Country Name', 'Measurement Year', 'PM2.5 (μg/m3)', 'PM10 (μg/m3)', 'NO2 (μg/m3)',
       'PM25 temporal coverage (%)', 'PM10 temporal coverage (%)',
       'NO2 temporal coverage (%)']]
df = df.rename(columns = {'WHO Country Name' : 'country', 'Measurement Year' : 'year'})
grp_data = df.groupby(['country', 'year']).sum()
grp_data = grp_data.reset_index()

final = pd.merge(tb, grp_data, on = ['country', 'year'], how = 'left')

features = ['PM2.5 (μg/m3)', 'PM10 (μg/m3)',
       'NO2 (μg/m3)']

label = 'total_tb_cases'

final[features] = final[features].fillna(final[features].median())

correlation_matrix = final[features + [label]].corr()

scaler = StandardScaler()
scaled_features = scaler.fit_transform(final[features])

X_train, X_test, y_train, y_test = train_test_split(scaled_features, final[label], test_size=0.2, random_state=42)

rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)

y_pred = rf_model.predict(X_test)

mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Mean Squared Error: {mse}")
print(f"R-squared: {r2}")

importances = rf_model.feature_importances_
feature_importances = {feature: importance for feature, importance in zip(features, importances)}

sorted_importances = dict(sorted(feature_importances.items(), key=lambda item: item[1], reverse=True))

print("Feature Importances:")
fi_df = pd.DataFrame(columns = ['Feature', 'Importance'])
for feature, importance in sorted_importances.items():

    print(f"{feature}: {importance}")

    curr_row = [feature, importance]

    fi_df.loc[len(fi_df)] = curr_row

joblib.dump(rf_model, 'models/tb_rf_model.pkl')

print("Random Forest model saved as tb_rf_model.pkl")

fi_df.to_csv('data/effect_of_pollutants_on_tb.csv', index = False)