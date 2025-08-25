from flask import Flask, render_template, request, jsonify
import pandas as pd
import os

app = Flask(__name__)

curr_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(curr_dir, 'ins_controls_indiana.csv')
contamination_data = pd.read_csv(csv_path)

def process(value):
    return value if pd.notna(value) else "Not specified"

def get_unique_values(data, col):
    vals = data[col].dropna().astype(str).unique()
    split_vals = set()
    for v in vals:
        split_vals.update(map(str.strip, v.split(',')))
    return sorted([v for v in split_vals if v])

def apply_filters(df, filters):
    for k, v in filters.items():
        if v and v != 'All':
            df = df[df[k].astype(str).str.contains(v)]
    return df

def format_cards(matches, search_type):
    if matches.empty:
        return None, f"No contamination records found for this {search_type}."
    else:
        matches = matches.drop_duplicates(subset=['FACILITY_NAME', 'FULL_ADDRESS'])
        cards = []
        for _, row in matches.iterrows():
            cards.append({
                "Facility Name": row['FACILITY_NAME'],
                "Address": row['FULL_ADDRESS'],
                "Contamination Recorded": row['DATE_IC_RECORDED'],
                "Affected Media": process(row['AFFECTED_MEDIA']),
                "Constituents of Concern": process(row['CONSTITUENTS_OF_CONCERN']),
                "Restriction Coverage": process(row['RESTRICTION_COVERAGE']),
                "Control Recommended": process(row['CONTROL_METHOD'])
            })
        return cards, None
    
def search_contamination_by_zip(zipcode, contamination_data):
    zipcode_str = str(zipcode)
    matches = contamination_data[contamination_data['ZIP_CODE'].astype(str) == zipcode_str]
    return format_cards(matches, "ZIP code")

def search_contamination(address, contamination_data):
    address_lower = address.lower()
    matches = contamination_data[contamination_data['FULL_ADDRESS'].str.lower().str.contains(address_lower)]
    return format_cards(matches, "address")

def search_by_area(area, contamination_data, area_type='CITY'):
    area_upper = area.strip().upper()
    city_matches = contamination_data['CITY'].astype(str).str.upper() == area_upper
    county_matches = contamination_data['COUNTY'].astype(str).str.upper() == area_upper
    matches = contamination_data[city_matches | county_matches]
    return format_cards(matches, area_type)


@app.route('/', methods=['GET', 'POST'])
def index():
    filters = {
        'AFFECTED_MEDIA': request.form.get('filter_media', ''),
        'RESTRICTION_COVERAGE': request.form.get('filter_restriction', ''),
        'CONSTITUENTS_OF_CONCERN': request.form.get('filter_constituents', ''),
        'CONTROL_METHOD': request.form.get('filter_control', '')
    }
    search_type = None
    search_value = None
    cards, result = None, None

    if request.method == 'POST':
        search_type = request.form['search_type']
        search_value = request.form['search_value']

        filtered_data = apply_filters(contamination_data, filters)

        if search_type == 'zip':
            cards, result = search_contamination_by_zip(search_value, filtered_data)
        elif search_type == 'area':
            cards, result = search_by_area(search_value, filtered_data)
        else:
            cards, result = search_contamination(search_value, filtered_data)
    media_options = ['All'] + get_unique_values(contamination_data, 'AFFECTED_MEDIA')
    restriction_options = ['All'] + get_unique_values(contamination_data, 'RESTRICTION_COVERAGE')
    constituents_options = ['All'] + get_unique_values(contamination_data, 'CONSTITUENTS_OF_CONCERN')
    control_options = ['All'] + get_unique_values(contamination_data, 'CONTROL_METHOD')

    return render_template(
        'index.html',
        cards=cards, result=result,
        media_options=media_options,
        restriction_options=restriction_options,
        constituents_options=constituents_options,
        control_options=control_options,
        selected_filters=filters
    )

@app.route('/autocomplete')
def autocomplete():
    term = request.args.get('term', '').strip().lower()
    search_type = request.args.get('search_type', 'zip')
    if search_type == 'zip':
        suggestions = contamination_data['ZIP_CODE'].astype(str).unique()
    elif search_type == 'address':
        suggestions = contamination_data['FULL_ADDRESS'].astype(str).unique()
    elif search_type == 'area':
        city_county = pd.concat([
            contamination_data['CITY'].dropna().astype(str), 
            contamination_data['COUNTY'].dropna().astype(str)
        ]).unique()
        suggestions = city_county
    else:
        return jsonify([])
    filtered = [s for s in suggestions if s.lower().startswith(term)]
    return jsonify(filtered[:10])

@app.route('/dashboards')
def dashboards():
    return render_template('dashboards.html')

if __name__ == '__main__':
    app.run(debug=True)
