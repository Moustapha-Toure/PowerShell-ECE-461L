from pymongo import MongoClient 
from s_get_database import get_database
import cipher

#inserts new users into database and encrypts password
def new_userA(username, password):
    client = get_database()

    db_name = client['Users']
    collection_name = db_name['loginInfo']

    usr = {"Username":username,
            "password":cipher.encrypt(password, 2, 2)
            #could include email
        }
    collection_name.insert_one(usr)

    client.close()

#TODO:
def get_username(userID):
    pass

#TODO:
def get_password(userID):
    pass

#TODO: probably can use this to check login 
#given username and password (remember cipher) finds userID
def get_userID(username, password):
    pass

#TODO:
#returns a _?_ of projects user has
def get_projects(userID):
    pass
#new_userA("Ethan", "Password123")
