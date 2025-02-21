from services.mongo import MongoReaderService


class DataService:
    def __init__(self, year: int, month: int | None):
        self.year_and_month = f"{str(year)}{str(month) if month else ''}"

    async def get_data(self):
        query = {"data_id": {"$regex": f"^{self.year_and_month}"}}
        return await MongoReaderService().find(query)