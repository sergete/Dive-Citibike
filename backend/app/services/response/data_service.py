from services.formatter import DataFormatterService
from services.mongo import MongoReaderService


class DataService:
    def __init__(self, year: str, month: str | None):
        self.year_and_month = f"{year}{month if month else ''}"

    async def get_data(self):
        query = {"data_id": {"$regex": f"^{self.year_and_month}"}}
        results = await MongoReaderService().find(query, projection={"_id": False,
                                                               "data": True})
        return DataFormatterService.format(results)