from fastapi import APIRouter
from fastapi.responses import JSONResponse

from services.mongo.reader_service import MongoReaderService
from services.response import DateService

router = APIRouter(prefix="/dates",
                   tags=["dates"])


@router.get("/")
async def info_dates() -> JSONResponse:
    service = DateService()
    results = await service.get_data()

    return JSONResponse(results)

