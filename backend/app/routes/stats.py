from fastapi import APIRouter
from fastapi.responses import JSONResponse

from services.mongo.reader_service import MongoReaderService
from services.response import DateService, StatsService

router = APIRouter(prefix="/stats",
                   tags=["stats"])


@router.get("/{year}/{month}")
async def get_stats(year: int, month: int) -> JSONResponse:
    service = StatsService()
    results = await service.get_data(year=year, month=month)

    return JSONResponse(results)

