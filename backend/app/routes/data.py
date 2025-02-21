from fastapi.routing import APIRouter

from models import DataModel
from services.mongo import MongoReaderService
from services.response.data_service import DataService

router = APIRouter(prefix="/data",
                  tags=["data"])

@router.get("/{year}", response_model=list[DataModel])
async def bikes_data(year: int, month: int | None = None) -> list[DataModel]:
    data = DataService(year=year, month=month)
    results = await data.get_data()
    return results
