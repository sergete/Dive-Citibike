from fastapi import APIRouter
from fastapi.responses import JSONResponse

from services.mongo.reader_service import MongoReaderService
from services.response import DateService, StatsService

router = APIRouter(prefix="/stats",
                   tags=["stats"])


@router.get("/{year}/{month}")
async def get_stats(year: str, month: str) -> JSONResponse:
    service = StatsService()
    results = await service.get_data(year=year, month=month)
    print(results)

    return JSONResponse(results)


@router.get("/dates")
async def info_dates() -> JSONResponse:
    service = DateService()
    results = await service.get_stats_dates()

    return JSONResponse(results)

