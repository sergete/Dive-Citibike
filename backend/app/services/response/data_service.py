from services.mongo import MongoReaderService


class DataService:
    def __init__(self, year: str, month: str | None):
        self.year_and_month = f"{year}{month if month else ''}"

    async def get_data(self):
        query = {"data_id": {"$regex": f"^{self.year_and_month}"}}
        return await MongoReaderService().find(query)