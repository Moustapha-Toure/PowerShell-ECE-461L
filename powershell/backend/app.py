import json
import pymongo
import cipher
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
from flask import Flask, session, redirect, url_for, request, jsonify, make_response, render_template
from datetime import datetime
from flask_session import Session
from bson import ObjectId

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
shift = 30
direction = 1

# Mongo Configuration
mongoClient = pymongo.MongoClient(
    "mongodb+srv://touremmoustapha:Moussie@powershell.9kr31jk.mongodb.net/?retryWrites=true&w=majority")
user_db = mongoClient.Users
project_db = mongoClient.Projects
product_db = mongoClient.Products



@app.route('/')
def index():
    return "Welcome PowerShell"


@app.route('/login/', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return "This route is meant to be used along with frontend. For the futre, change up flask to be like the frontend and in this case testing with GET to try each of these routes"

    # in the frontend, make sure that the email and possowrds do not include ' ' or '!'
    client_collection = user_db.get_collection('clients')

    user = request.get_json(force=True)
    email = user['email']
    password = user['password']

    searchUser = client_collection.find_one(
        {'email': cipher.encrypt(email, shift, direction)})

    if searchUser == None:  # first check if the email even matches
        currentUser = {}
        sendBack = {
            'result': 'fail',
            'summary': 'Email not found!',
            'user': currentUser
        }
        return sendBack
    else:  # given the email matched, make sure the password matches
        if searchUser['password'] != cipher.encrypt(password, shift, direction):
            currentUser = {}
            sendBack = {
                'result': 'fail',
                'summary': 'Incorrect Password!',
                'user': currentUser
            }
            return sendBack
        else:
            currentUser = searchUser
            # keep returned email decrypted
            currentUser['email'] = email
            # we can't send back ObjectID so instead send as a string to frontend
            currentUser['_id'] = str(currentUser['_id'])
            stringifiedProjects = []
            for project in currentUser['projects']:
                stringifiedProjects.append(str(project))

            currentUser['projects'] = stringifiedProjects
            sendBack = {
                'result': 'success',
                'summary': 'User: ' + str(currentUser['Nickname']) + ' Authenticated',
                'user': currentUser
            }
            return sendBack


@app.route('/signup', methods=['POST', 'GET'])
def signup():
    if request.method == 'GET':
        return "This route is meant to be used along with frontend. For the futre, change up flask to be like the frontend and in this case testing with GET to try each of these routes"
    # in the frontend, make sure that the email and possowrds do not include ' ' or '!'
    user = request.get_json(force=True)
    Nickname = user['Nickname']
    email = user['email']
    password = user['password']
    # Nickname = 'Eren Yeager'
    # email = 'aot@final.season'
    # password = 'eldian'
    client_collection = user_db.get_collection('clients')
    newUser = {
        'Nickname': Nickname,
        # encrypted email
        'email': cipher.encrypt(email, shift, direction),
        # encrypted password
        'password': cipher.encrypt(password, shift, direction),
        'projects': []  # empty array of objectIDs for each project
    }
    # First make sure that the email isn't already in use
    if client_collection.find_one({'email': cipher.encrypt(email, shift, direction)}) != None:
        currentUser = {}
        sendBack = {
            'result': 'fail',
            'summary': 'Email is already in use!',
            'user': currentUser
        }
        return sendBack
    client_collection.insert_one(newUser)
    currentUser = client_collection.find_one(
        {'email': cipher.encrypt(email, shift, direction)})
    currentUser['email'] = email  # keep returned email decrypted
    currentUser['email'] = email
    currentUser['_id'] = str(currentUser['_id'])
    sendBack = {
        'result': 'success',
        'summary': 'New User Created!',
        'user': currentUser
    }
    return sendBack


@app.route('/getProjects', methods=['GET', 'POST'])
def getUserProjects():
    if request.method == 'GET':
        return "This route is meant to be used along with frontend. For the futre, change up flask to be like the frontend and in this case testing with GET to try each of these routes"
    
    # pass in the current user from the front end
    user = request.get_json(force=True)
    client_collection = user_db.get_collection('clients')
    currentUser = client_collection.find_one({'_id': ObjectId(user['_id'])})
    
    if currentUser != 'undefined' or currentUser != 'None' or currentUser != {}:
        userProjects = []
        userProjectIDs = currentUser['projects']
        project_collection = project_db.get_collection('clientProjects')
        for project in userProjectIDs:
            projectDetails = project_collection.find_one(
                {'_id': ObjectId(project)})
            projectDetails['_id'] = str(projectDetails['_id'])
            projectDetails['creator'] = str(projectDetails['creator'])
            authorizedUsers = []
            for user in projectDetails['authorizedUsers']:
                authorizedUsers.append(str(user))
            projectDetails['authorizedUsers'] = authorizedUsers

            hwOut = []
            for hardware in projectDetails['hardwareOut']:
                hardware['hardwareSet'] = str(hardware['hardwareSet'])
                hwOut.append(hardware)
            projectDetails['hardwareOut'] = hwOut
            userProjects.append(projectDetails)

        return {'result': 'success', 'summary': 'User is not authorized', 'projects': userProjects}

    else:
        return {'result': 'failed', 'summary': 'User is not authorized', 'projects': 'None'}


@app.route('/joinExisting', methods=['GET', 'POST'])
def joinExisting():
    if request.method == 'GET':
        return "This route is meant to be used along with frontend. For the futre, change up flask to be like the frontend and in this case testing with GET to try each of these routes"

    form = request.get_json(force=True)
    user = form['user']
    projectID = form['projectID']

    client_collection = user_db.get_collection('clients')
    currentUser = client_collection.find_one({'_id' : ObjectId(user['_id'])})
    
    if currentUser is None:
        sendBack = {
            'result' : 'fail',
            'summary' : 'no user'
        }
        return sendBack
    
    for project in currentUser['projects']:
        if (project == ObjectId(projectID)):
            sendBack = {
                'result': 'fail',
                'summary': 'You already are in this project!'
            }
            return sendBack

    project_collection = project_db.get_collection('clientProjects')
    searchProject = project_collection.find_one({'_id': ObjectId(projectID)})

    if (searchProject == None):
        sendBack = {
            'result': 'fail',
            'summary': 'This project does not exist! Please ensure the ID is correct'
        }
        return sendBack

    # update the project's authorized users list
    current = searchProject['authorizedUsers']
    current.append(ObjectId(projectID))
    # return str(current)

    project_collection.update_one(
        {'_id': ObjectId(projectID)},
        {
            '$set': {
                'authorizedUsers': current
            }
        }
    )

    # now update the user's list themselves
    client_collection = user_db.get_collection('clients')

    updateUser = currentUser['projects']
    updateUser.append(ObjectId(projectID))

    # return str(current) + '/' + str(currentUser) + '/' +  str(updateUser)

    client_collection.update_one(
        {'_id': ObjectId(user['_id'])},
        {
            '$set': {
                'projects': updateUser
            }
        }
    )

    sendBack = {
        'result': 'success',
        'summary': 'You have been added to: ' + str(searchProject['name']),
        'userUpdate': projectID
    }

    return sendBack


@app.route('/getHardwareSets', methods=['GET', 'POST'])
def getHardwareSets():
    hardware_collection = product_db.get_collection('HardwareSets')
    hwSets = hardware_collection.find()
    allSets = []
    for hwSet in hwSets:
        # Can't send objectId to frontend so send string
        hwSet['_id'] = str(hwSet['_id'])
        hwSet['creator'] = str(hwSet['creator'])
        allSets.append(hwSet)
    sendBack = {
        'hardwareSets': allSets
    }
    return sendBack


@app.route('/createProject', methods=['POST', 'GET'])
def createNewProject():
    recieved = request.get_json(force=True)
    user = recieved['user']
    name = recieved['projectName']
    # this should be an array of objects such as { 'hardwareSet': 'someID', 'qtyAsked' : 23 }
    hardwareChanges = recieved['hardwareChanges']

    print(user)
    print(name)
    print(hardwareChanges)

    client_collection = user_db.get_collection('clients')
    project_collection = project_db.get_collection('clientProjects')
    hardwareSet_collection = product_db.get_collection('HardwareSets')

    currentTime = datetime.now()
    # for hwOut in hardwareOut... add the update
    # if qty is 0 then we don't need to add it

    hardwareRequests = []
    for ask in hardwareChanges:
        if ask['request'] != 0:
            ask['request'] = int(ask['request'])
            hardwareRequests.append(ask)

    creationDetails = []
    hardwareCheckedOut = []

    for hardware in hardwareRequests:
        specificHardware = hardwareSet_collection.find_one(
            {'_id': ObjectId(hardware['hw'])})  # pass in the actual hardwareID

        # asked more than was available
        if (specificHardware['Availability'] < hardware['request']):
            print(specificHardware['Availability'])
            print(hardware['request'])
            print(specificHardware['Availability'] < hardware['request'])
            errorMsg = "For '" + str(specificHardware['name']) + "', was not able to checkout: #" + str(
                hardware['request']) + ". Instead giving you the available: #" + str(specificHardware['Availability'])
            creationDetails.append({
                'hardwareID': str(ObjectId(specificHardware['_id'])),
                'hwName': specificHardware['name'],
                'wasSuccessful': 'false',
                'error': errorMsg})
            hardwareCheckedOut.append({
                'hardwareSet': ObjectId(specificHardware['_id']),
                'lastUpdated': currentTime,
                'qtyOut': specificHardware['Availability'],
                'hwName': 'Hardware Set 1'
            })
            hardwareSet_collection.update_one(
                {'_id': ObjectId(specificHardware['_id'])},
                {
                    '$set': {'Availability': 0}
                }
            )
        else:  # request exactly or less than availability
            errorMsg = "Successfully checked out for '" + \
                str(specificHardware['name']) + \
                "' the requested #" + str(hardware['request'])
            creationDetails.append({
                'hardwareID': str(ObjectId(specificHardware['_id'])),
                'hwName': specificHardware['name'],
                'wasSuccessful': 'true',
                'error': errorMsg
            })
            hardwareCheckedOut.append({
                'hardwareSet': ObjectId(specificHardware['_id']),
                'lastUpdated': currentTime,
                'qtyOut': hardware['request'],
                'hwName': hardware['hardwareSet']['name']
            })
            hardwareSet_collection.update_one(
                {'_id': ObjectId(specificHardware['_id'])},
                {
                    '$set': {'Availability': specificHardware['Availability'] - hardware['request']}
                }
            )

    newProject = {
        'name': name,
        'hardwareOut': hardwareCheckedOut,
        'creator': ObjectId(user['_id']),
        # add the creator as an authorized user
        'authorizedUsers': [ObjectId(user['_id'])],
        'lastProjectUpdate': currentTime
    }

    # no need to make sure project name is unique... projects don't need a unique name just unique ID
    project_collection.insert_one(newProject)

    # Since this implementation allows for duplicate project names, in order to get this same exact project back we querry the entire project info. After creation, we have the unique _id so this would not be an issue
    getBackProject = project_collection.find_one({'name': name, 'creator': ObjectId(user['_id']), 'authorizedUsers': [
                                                 ObjectId(user['_id'])], 'hardwareOut': hardwareCheckedOut, 'lastProjectUpdate': currentTime})
    currentUser = client_collection.find_one({'_id': ObjectId(user['_id'])})
    newProjectId = getBackProject['_id']
    updateUser = currentUser['projects']
    updateUser.append(ObjectId(newProjectId))

    # return str(current) + '/' + str(currentUser) + '/' +  str(updateUser)

    client_collection.update_one(
        {'_id': ObjectId(user['_id'])},
        {
            '$set': {
                'projects': updateUser
            }
        }
    )
    
    userUpdate = []
    for project in updateUser:
        userUpdate.append(str(project))

    sendBack = {
        'details': creationDetails,
        'userUpdate': userUpdate
    }
    return sendBack

@app.route('/leaveProject', methods=['GET', 'POST'])
def leaveProject():
    recieved = request.get_json(force=True)
    projectId = recieved['projectId']
    userId = recieved['userId']
    
    
    project_collection = project_db.get_collection('clientProjects')
    client_collection = user_db.get_collection('clients')
    
    findProj = project_collection.find_one({ '_id' : ObjectId(projectId)})
    findUser = client_collection.find_one({ '_id' : ObjectId(userId) })
    
    if (findProj == None) :
        sendBack = {
            'result': 'fail',
            'summary': 'project not found'
        }
        
        return sendBack
    
    newProjects = []
    for project in findUser['projects']:
        if project == ObjectId(projectId):
            continue;
        newProjects.append(project)
    
    client_collection.update_one(
        {'_id': ObjectId(userId)},
        {
            '$set': {
                'projects' : newProjects
            }
        }
    )
    
    
    
    newAuthUsers= []
    for user in findProj['authorizedUsers']:
        if user == ObjectId(userId):
            continue;
        newAuthUsers.append(user)
        
    project_collection.update_one(
        {'_id': ObjectId(projectId)},
        {
            '$set': {
                'authorizedUsers' : newAuthUsers
            }
        }
    )
    print()
    
    sendBack = {
        'result': 'success',
        'summary': 'left project',
    }
            
    
    return sendBack


@app.route('/updateProject', methods=['GET','POST'])
def updateProject():
    recieved = request.get_json(force=True)
    projectId = recieved['projectId']
    userID = recieved['userId']
    hardwareChanges = recieved['hardwareChanges']
        
    project_collection = project_db.get_collection('clientProjects')
    hardware_collection = product_db.get_collection('HardwareSets')
    
    specificProject = project_collection.find_one({'_id': ObjectId(projectId)})
    
    
    if (specificProject is None):
        sendBack = {
            'result' : 'fail',
            'messages' : 'project not found'
        }
        return sendBack

    currentTime = datetime.now()
    updateMessage = []
    
    hardwareCheckedOut = []
    for hardware in hardwareChanges:
        specificHardware = hardware_collection.find_one({'_id': ObjectId(hardware['hw'])})  # pass in the actual hardwareID
        currentlyInProject = {}
        for setOut in specificProject['hardwareOut']:
            if setOut['hardwareSet'] == specificHardware['_id']:
                currentlyInProject = setOut
      
            # it means checking out
        if currentlyInProject == {}:
            if int(hardware['newQty']) == 0:
                continue
            difference = int(hardware['newQty'])
            newAvailability = int(specificHardware['Availability']) - int(difference)
            if(difference > specificHardware['Availability']):
                msg = {
                    'hw' : specificHardware['name'],
                    'status' : 'semi',
                    'msg' : 'Did not have the requested amount of ' + str(difference) + 'so gave you all of the ' + str(specificHardware['Availability'])
                }
                updateMessage.append(msg)
                hardware['newQty'] = specificHardware['Availability']
                newAvailability = 0
            
            newHw = {
                'hardwareSet' : ObjectId(specificHardware['_id']),
                'lastUpdated' : currentTime,
                'qtyOut' : int(hardware['newQty']),
                'hwName' : specificHardware['name']
            }
            hardwareCheckedOut.append(newHw)
            
            hardware_collection.update_one(
                {'_id' : ObjectId(specificHardware['_id'])},
                {
                    '$set' : {
                        'Availability' : newAvailability
                    }
                }
            )
        else:
            # it means checking out
            if currentlyInProject['qtyOut'] == int(hardware['newQty']):
                hardwareCheckedOut.append(currentlyInProject)
                
            elif currentlyInProject['qtyOut'] < int(hardware['newQty']):
                difference= int(hardware['newQty']) - int(currentlyInProject['qtyOut'])
                newAvailability = int(specificHardware['Availability']) - int(difference)
                if(difference > specificHardware['Availability']):
                    msg = {
                        'hw' : specificHardware['name'],
                        'status' : 'semi',
                        'msg' : 'Did not have the requested amount of ' + str(difference) + 'so gave you all of the ' + str(specificHardware['Availability'])
                    }
                    updateMessage.append(msg)
                    newAvailability = int(specificHardware['Availability']) - int(hardware['newQty']) # recheck this
                    hardware['newQty'] = int(currentlyInProject['qtyOut']) + int(specificHardware['Availability'])
                    newAvailability = 0


                newHw = {
                    'hardwareSet' : ObjectId(specificHardware['_id']),
                    'lastUpdated' : currentTime,
                    'qtyOut' : int(hardware['newQty']),
                    'hwName' : specificHardware['name']
                }
                hardwareCheckedOut.append(newHw)

                hardware_collection.update_one(
                    {'_id' : ObjectId(specificHardware['_id'])},
                    {
                        '$set' : {
                            'Availability' : newAvailability
                        }
                    }
                )

            elif currentlyInProject['qtyOut'] > int(hardware['newQty']): # it means checking in 
                # if new Qty is 0 then we do not add this hardware to the checkout array
                if (int(hardware['newQty']) <= 0):
                    msg = {
                        'hw' : specificHardware['name'],
                        'status' : 'success',
                        'msg' : 'CheckedIn all of this hardware'
                    }
                    newAvailability = int(specificHardware['Availability']) + int(currentlyInProject['qtyOut'])
                else:
                    difference = int(currentlyInProject['qtyOut']) - int(hardware['newQty'])
                    newAvailability = int(specificHardware['Availability']) + int(difference)

                    newHw = {
                        'hardwareSet' : ObjectId(specificHardware['_id']),
                        'lastUpdated' : currentTime,
                        'qtyOut' : int(hardware['newQty']),
                        'hwName' : specificHardware['name']
                    }
                    hardwareCheckedOut.append(newHw)

                hardware_collection.update_one(
                    {'_id' : ObjectId(specificHardware['_id'])},
                    {
                        '$set' : {
                            'Availability' : newAvailability
                        }
                    }
                )
                
        
            
            
    # next we need to figure out whether or not we are checking in hardware or checking out
    # updateMessage.append(
    #     {'hwName': 'Hardware Set 1', 'updateDetails': 'successful / was not able to checkout request, only had 30 available so giving you 30'})
    # update[0]['qtyOut'] = 0 # UPDATE THIS!!!!!!!!!!!!
    # update[0]['lastUpdated'] = currentTime
    # send in the updates

    for set in hardwareCheckedOut:
        print(set['qtyOut'])

    project_collection.update_one(
        {'_id': ObjectId(projectId)},
        {
            '$set': {
                'hardwareOut': hardwareCheckedOut,
                'lastProjectUpdate': currentTime
        },
        }
    )
    
    sendBack= {
        'result' : 'success',
        'messages' : updateMessage
    }
    
    return sendBack
