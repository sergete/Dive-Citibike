from fastapi import FastAPI

from routes import data_router, date_router

app = FastAPI(
    swagger_ui_parameters={"syntaxHighlight.theme": "obsidian"},
)

app.include_router(prefix="/api/v1/trips/bikes" ,router=data_router)
app.include_router(prefix="/api/v1/trips/bikes" ,router=date_router)
