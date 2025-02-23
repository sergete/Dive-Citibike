from services.mongo import MongoReaderService


class StatsService:
    def __init__(self):
        pass

    async def get_data(self, year: int, month: int) -> dict:
        query = {"data_id": f"{year}{month}"}
        results = await MongoReaderService().find(query, projection={"_id": False,
                                                                     "stats": True})
        return results