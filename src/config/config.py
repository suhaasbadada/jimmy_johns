'''
This file contains the data and the processing that has to be done on it to create an aggregated form of data.
The purpose of this config is to simplify adding and removing data fields required to derive effective analysis.
'''

datasets_to_process = ["toxic_metals_data", "health_data", "death_data"]

toxic_metals_data = {
    "file" : "data/county_releases.csv",
    "usecols" : ["County", "Chemical", "Total Releases", "Total Transfers"],
    "dropna" : True,
    "drop_duplicates" : True,
}

health_data = {
    "file" : "data/quality_of_life.csv",
    "usecols" : ["County", "Length of Life Z-Score", "Length of Life Rank", "Quality of Life Z-Score", "Quality of Life Rank", "Health Behaviors Z-Score", 
                 "Health Behaviors Rank", "Clinical Care Z-Score", "Clinical Care Rank", "Social and Economica Factors Z-Score", "Social and Economic Factors Rank",
                 "Physical Environment Z-Score", "Physical Environment Rank"],
    "dropna" : True,
    "drop_duplicates" : True,
    "join_info" : {"join_on" : "County", "how" : "left"}
}

death_data = {
    "file" : "data/premature_death_statistics.csv",
    "usecols" : ["County", "Deaths", "Years of Potential Life Lost"],
    "dropna" : True,
    "drop_duplicates" : True,
    "join_info" : {"join_on" : "County", "how" : "left"}
}

op_data = {
    "file" : "data/aggregated_stats.csv"
}