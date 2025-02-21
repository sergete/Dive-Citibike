from fastapi import APIRouter
from fastapi.responses import JSONResponse

from services.mongo.reader_service import MongoReaderService

router = APIRouter(prefix="/dates",
                   tags=["dates"])


@router.get("/")
async def info_dates() -> JSONResponse:
    # dates = MongoReaderService().find({}, projection={"_id": False, "data_id": True})
    dates = await MongoReaderService().find({}, projection={"_id": False, "data_id": True})
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

    return JSONResponse(results)

