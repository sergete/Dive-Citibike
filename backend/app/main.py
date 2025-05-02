from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import data_router, date_router, stats_router

app = FastAPI(
    swagger_ui_parameters={"syntaxHighlight.theme": "obsidian"},
)

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["OPTIONS, GET"],
    allow_headers=["*"],
)

app.include_router(prefix="/api/v1/trips/bikes" ,router=data_router)
app.include_router(prefix="/api/v1/trips/bikes" ,router=date_router)
app.include_router(prefix="/api/v1/trips/bikes" ,router=stats_router)
