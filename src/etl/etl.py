'''
This file contains the class to generate aggregated data from a config.
'''

import pandas as pd
import os

from config.config import *

class ETL:

    def __init__(self):
        self.datasets = datasets_to_process

    def prepare_data(self):
        out_df = pd.DataFrame()
        print(os.getcwd())

        for data in self.datasets:

            print("Processing data: " + data)

            data = eval(data)
            
            file_location = data['file']
            curr_usecols = data['usecols']
            curr_data = pd.read_csv(file_location, usecols = curr_usecols)

            dropna, drop_duplicates = data["dropna"], data["drop_duplicates"]

            if dropna:
                curr_data = curr_data.dropna()
            if drop_duplicates:
                curr_data = curr_data.drop_duplicates()

            if len(out_df) == 0:
                out_df = curr_data
            else:
                join_key = data["join_info"]["join_on"]
                join_how = data["join_info"]["how"]

                out_df = pd.merge(out_df, curr_data, on = join_key, how = join_how)
        
        file_destination = op_data["file"]

        out_df.to_csv(file_destination, index = False)

        return