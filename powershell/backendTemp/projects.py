from pymongo import MongoClient 
from pandas import DataFrame
from s_get_database import get_database
from bson.objectid import ObjectId

#could potentially use a class if needed
class Project:
    def __init__(self):
        pass

#inserts new project into database and add its to user projects
def new_projectA(user, name, description):

    client = get_database()
    db_name = client['Projects']
    collection_name = db_name['projectsA']

    id = ObjectId()

    project = {"Name":name,
               "_id":id,
               "Description": description,
               "userID": user
               }
    
    collection_name.insert_one(project)

    client.close()

#returns project information
def get_project(usr,projID):
    client = MongoClient("mongodb+srv://teamMember:PowerShell@cluster0.rj2w9t2.mongodb.net/?retryWrites=true&w=majority")

    db_name = client['Projects']
    collection_name = db_name['projectsA']

    
    return None

#########################################
#TODO: lower priority functions can implement later
def set_proj_name(name):
   pass

def set_proj_desc(desc):
    pass


#userID = "Ethan"
#new_projectA(userID, "second", "just adding another project")
