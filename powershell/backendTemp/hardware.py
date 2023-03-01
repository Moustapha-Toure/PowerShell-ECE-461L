from pymongo import MongoClient 
from s_get_database import get_database
import cipher

#inserts new hardware set
def new_HWset(setName, availability, used=0):
    client = get_database()

    db_name = client['Resources']
    collection_name = db_name['HWsets']


    hw_set = {"Name":setName,
            "Availability":availability
            #TODO:add more HW attributes
        }
    collection_name.insert_one(hw_set)

################################
#TODO:
def initialize_capacity():
    pass

def get_availability():
    pass
    
def get_capacity():
    pass
    
def check_out():
    pass
    
def check_in():
    pass

def set_capacity():
    pass
    
def get_checkedout_qty():
    pass

#new_HWset("HWset1", 150)