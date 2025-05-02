from pymongo import MongoClient
import os

# MONGO_URI = os.getenv('MONGO_URI')
# MONGO_DB_NAME = os.getenv('MONGO_DB_NAME')
# MONGO_DB_COLLECTION = os.getenv('MONGO_COLLECTION_NAME')
MONGO_URI = os.getenv('MONGO_URI', "mongodb://127.0.0.1:27017")
MONGO_DB_NAME = os.getenv('MONGO_DB_NAME', "tripdata")
MONGO_DB_COLLECTION = os.getenv('MONGO_COLLECTION_NAME', "links")

class MongoManager:
    __instance = None

    @staticmethod
    def get_instance():
        if MongoManager.__instance == None:
            MongoManager()
        return MongoManager.__instance

    def __init__(self):
        if MongoManager.__instance != None:
            raise Exception("This class is a singleton!")
        else:
            self.client = MongoClient(MONGO_URI,
                                      username=os.getenv('MONGO_INITDB_ROOT_USERNAME', 'root'),
                                      password=os.getenv('MONGO_INITDB_ROOT_PASSWORD', 'password'),
                                      maxPoolSize=100,
                                      waitQueueTimeoutMS=1000
                                      )
            self.db = self.client[MONGO_DB_NAME]
            self.collection = self.db[MONGO_DB_COLLECTION]
            MongoManager.__instance = self
