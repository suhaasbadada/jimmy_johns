import pandas as pd
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import joblib

df = pd.read_csv("../src/data/aggregated_stats.csv")

pivoted_table = df.pivot_table(index='County', columns='Chemical', values='Total Releases', aggfunc='sum')

pivoted_table = pivoted_table.reset_index()

model_df = pd.merge(pivoted_table, df[["County", "Years of Potential Life Lost"]].drop_duplicates(), on = "County", how = "left")

features = [
    '1,2,4-Trimethylbenzene', 'Ammonia', 'Certain glycol ethers',
    'Chromium', 'Copper', 'Diisocyanates', 'Ethylbenzene',
    'Ethylene glycol',
    'Hydrochloric acid (acid aerosols including mists, vapors, gas, fog, and other airborne forms of any particle size)',
    'Lead', 'Lead  And Lead Compounds', 'Lead compounds', 'Manganese',
    'Manganese compounds', 'Methanol', 'Naphthalene', 'Nickel',
    'Nitrate compounds (water dissociable; reportable only when in aqueous solution)',
    'Nitric acid', 'Polycyclic aromatic compounds', 'Styrene', 'Toluene',
    'Xylene (mixed isomers)', 'Zinc compounds', 'n-Hexane'
]
target = 'Years of Potential Life Lost'

data = model_df[features + [target]].fillna(0)

if len(data) <= 1:
    raise ValueError("Not enough data points to train the model. Consider collecting more data.")

X = data[features]
y = data[target]

rf_regressor = RandomForestRegressor(random_state=42)
rf_regressor.fit(X, y)

print("Model trained using all available data.")
preds = rf_regressor.predict(X)
print("Mean squared error: ", mean_squared_error(y, preds))
print("R2 score: ", r2_score(y, preds))

fi_df = pd.DataFrame(columns = ["Feature", "Importance"])

for itr in range(len(features)):
    curr_row = [features[itr], rf_regressor.feature_importances_[itr]]
    fi_df.loc[itr] = curr_row

fi_df = fi_df.sort_values(by='Importance', ascending=False)

joblib.dump(rf_regressor, 'models/deaths_rf_regressor.pkl')

fi_df.to_csv('data/effect_of_effect_of_metals_on_premature_deaths.csv', index = False)