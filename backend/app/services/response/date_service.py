from services.formatter import DataFormatterService, DateFormatterService
from services.mongo import MongoReaderService


class DateService:
    def __init__(self):
        pass

    async def get_data(self) -> dict:
        dates = await MongoReaderService().find({},
                                                projection={"_id": False, "data_id": True})
        results = {}
        for date in dates:
            date = date["data_id"]
            year = date[:4]
            month = "0"
            if len(date) == 6:
                month = date[4:6]

            if year in results:
                results[year].append(month)
            else:
                results[year] = [month]

        return DateFormatterService.format(data=dates)