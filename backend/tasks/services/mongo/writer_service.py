from typing import Any
from services.mongo import MongoManager

# Config
class MongoWriterService:
    def __init__(self):
        self.mongo_client = MongoManager.get_instance()

    def insert_doc(self, filter_query=dict[str, Any], doc=dict):
        self.mongo_client.collection.update_one(filter=filter_query,
                                                update={'$set': doc},
                                                upsert=True)
