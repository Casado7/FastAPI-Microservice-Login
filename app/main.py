from fastapi import FastAPI
from app.routes import user
from app.routes import auth

app = FastAPI()

app.include_router(user.router)
app.include_router(auth.router)

@app.get("/")
def read_root():
    return {"Hello": "FastAPI with MongoDB"}
