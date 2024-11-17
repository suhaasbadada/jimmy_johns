from flask import Flask, render_template, request
import pandas as pd

app = Flask(__name__)

# Load the contamination data
contamination_data = pd.read_csv('ins_controls_indiana.csv')

def process(value):
    return value if pd.notna(value) else "Not specified"

def search_contamination_by_zip(zipcode, contamination_data):
    zipcode_str = str(zipcode)
    matches = contamination_data[contamination_data['ZIP_CODE'].astype(str) == zipcode_str]
    
    if matches.empty:
        return "No contamination records found for this ZIP code."
    else:
        results = []
        for _, row in matches.iterrows():
            result = f"Facility Name: {row['FACILITY_NAME']}\n"
            result += f"Address: {row['FULL_ADDRESS']}\n"
            result += f"Contamination Recorded: {row['DATE_IC_RECORDED']}\n"
            result += f"Affected Media: {row['AFFECTED_MEDIA']}\n"
            constituents_of_concern = process(row['CONSTITUENTS_OF_CONCERN'])
            result += f"Constituents of Concern: {constituents_of_concern}\n"
            result += f"Restriction Coverage: {row['RESTRICTION_COVERAGE']}\n"
            result += f"Control Recommended: {row['CONTROL_METHOD']}\n"
            result += "-" * 45 + "\n"
            results.append(result)
        
        return "\n".join(results)

def search_contamination(address, contamination_data):
    address_lower = address.lower()
    matches = contamination_data[contamination_data['FULL_ADDRESS'].str.lower().str.contains(address_lower)]
    
    if matches.empty:
        return "No contamination records found for this address."
    else:
        results = []
        for _, row in matches.iterrows():
            result = f"Facility Name: {row['FACILITY_NAME']}\n"
            result += f"Address: {row['FULL_ADDRESS']}\n"
            result += f"Contamination Recorded: {row['DATE_IC_RECORDED']}\n"
            result += f"Affected Media: {row['AFFECTED_MEDIA']}\n"
            constituents_of_concern = process(row['CONSTITUENTS_OF_CONCERN'])
            result += f"Constituents of Concern: {constituents_of_concern}\n"
            result += f"Restriction Coverage: {row['RESTRICTION_COVERAGE']}\n"
            result += f"Control Recommended: {row['CONTROL_METHOD']}\n"
            result += "-" * 45 + "\n"
            results.append(result)
        
        return "\n".join(results)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        search_type = request.form['search_type']
        search_value = request.form['search_value']
        
        if search_type == 'zip':
            result = search_contamination_by_zip(search_value, contamination_data)
        else:
            result = search_contamination(search_value, contamination_data)
        
        return render_template('index.html', result=result)
    
    return render_template('index.html')

@app.route('/dashboards')
def dashboards():
    return render_template('dashboards.html')

if __name__ == '__main__':
    app.run()