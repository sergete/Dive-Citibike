from typing import Any

from services.mongo.manager import MongoManager


# Config
class MongoReaderService:
    def __init__(self):
        self.mongo_client = MongoManager.get_instance()

    async def find(self,
             filter_query=dict[str, Any],
             projection: dict | None = None) -> list[dict[str, Any]]:
        if projection is None:
            projection = {}

        return list(self.mongo_client.collection.find(
            filter=filter_query,
            projection=projection)
        )