from fastapi.routing import APIRouter

from services.response.data_service import DataService

router = APIRouter(prefix="/data",
                  tags=["data"])

@router.get("/{year}", response_model=list[str])
async def bikes_data(year: str, month: str | None = None) -> list[str]:
    data = DataService(year=year, month=month)
    results = await data.get_data()
    return results
