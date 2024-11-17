'''
This is the driver file for data loading.
'''

from etl.etl import ETL

etl = ETL()

etl.prepare_data()