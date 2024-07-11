from fastapi import FastAPI
from app.routes import user

app = FastAPI()

app.include_router(user.router)

@app.get("/")
def read_root():
    return {"Hello": "FastAPI with MongoDB"}
