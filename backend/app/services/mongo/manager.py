from pymongo import MongoClient
import os

MONGO_URI = os.getenv('MONGO_URI')
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")
MONGO_COLLECTION_NAME = os.getenv("MONGO_COLLECTION_NAME")

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
            self.client = MongoClient(os.getenv('MONGO_URI', None),
                                      username=os.getenv('MONGO_INITDB_ROOT_USERNAME', None),
                                      password=os.getenv('MONGO_INITDB_ROOT_PASSWORD', None),
                                      maxPoolSize=100,
                                      waitQueueTimeoutMS=1000
                                      )
            self.db = self.client[os.getenv("MONGO_DB_NAME", None)]
            self.collection = self.db[os.getenv("MONGO_COLLECTION_NAME", None)]
            MongoManager.__instance = self
