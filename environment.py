#!/usr/bin/env python3
import fileinput
import os

RW_PROJECT_ID = os.environ['RW_PROJECT_ID']
RW_API_KEY = os.environ['RW_API_KEY']
RW_AUTH_DOMAIN = os.environ['RW_AUTH_DOMAIN']
RW_DATABASE_URL = os.environ['RW_DATABASE_URL']
RW_STORAGE_BUCKET = os.environ['RW_STORAGE_BUCKET']
RW_MESSAGING_SENDER_ID = os.environ['RW_MESSAGING_SENDER_ID']
RW_APP_ID = os.environ['RW_APP_ID']
RW_MEASUREMENT_ID = os.environ['RW_MEASUREMENT_ID']

def firebaseFile():
    print("firebase file is starting")
    fileName = ".firebaserc"
    # read file into memory
    with open(fileName, 'r') as file :
        filedata = file.read()
    # replace variables in place
    filedata = filedata.replace("RW_PROJECT_ID", RW_PROJECT_ID)
    # write out updated file
    with open(fileName, 'w') as file:
        file.write(filedata)
    print("firebase file is finished")

def localEnvironment():
    print("local environment file is starting")
    fileName = "src/environments/environment.ts"
    # read file into memory
    with open(fileName, 'r') as file :
        filedata = file.read()
    # replace variables in place
    filedata = filedata.replace("RW_PROJECT_ID", RW_PROJECT_ID)
    filedata = filedata.replace("RW_API_KEY", RW_API_KEY)
    filedata = filedata.replace("RW_AUTH_DOMAIN", RW_AUTH_DOMAIN)
    filedata = filedata.replace("RW_DATABASE_URL", RW_DATABASE_URL)
    filedata = filedata.replace("RW_STORAGE_BUCKET", RW_STORAGE_BUCKET)
    filedata = filedata.replace("RW_MESSAGING_SENDER_ID", RW_MESSAGING_SENDER_ID)
    filedata = filedata.replace("RW_APP_ID", RW_APP_ID)
    filedata = filedata.replace("RW_MEASUREMENT_ID", RW_MEASUREMENT_ID) 
    # write out updated file
    with open(fileName, 'w') as file:
        file.write(filedata)
    print("local environment file is finished")

def productionEnvironment():
    print("production environment file is starting")
    fileName = "src/environments/environment.prod.ts"
    # read file into memory
    with open(fileName, 'r') as file :
        filedata = file.read()
    # replace variables in place
    filedata = filedata.replace("RW_PROJECT_ID", RW_PROJECT_ID)
    filedata = filedata.replace("RW_API_KEY", RW_API_KEY)
    filedata = filedata.replace("RW_AUTH_DOMAIN", RW_AUTH_DOMAIN)
    filedata = filedata.replace("RW_DATABASE_URL", RW_DATABASE_URL)
    filedata = filedata.replace("RW_STORAGE_BUCKET", RW_STORAGE_BUCKET)
    filedata = filedata.replace("RW_MESSAGING_SENDER_ID", RW_MESSAGING_SENDER_ID)
    filedata = filedata.replace("RW_APP_ID", RW_APP_ID)
    filedata = filedata.replace("RW_MEASUREMENT_ID", RW_MEASUREMENT_ID) 
    # write out updated file
    with open(fileName, 'w') as file:
        file.write(filedata)
    print("production environment file is finished")

print("setup environment has started")
firebaseFile()
localEnvironment()
productionEnvironment()
print("setup environment has finished")