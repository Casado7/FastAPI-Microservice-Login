from fastapi import FastAPI
from pymongo import MongoClient
from pydantic import BaseModel
from bson.objectid import ObjectId
import os

app = FastAPI()

# Conexión a MongoDB
mongo_host = os.getenv("MONGO_HOST", "login-mongo")
mongo_port = int(os.getenv("MONGO_PORT", 27017))
client = MongoClient(mongo_host, mongo_port)
db = client.mydatabase

class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None

@app.get("/")
def read_root():
    return {"Hello": "FastAPI with MongoDB"}

@app.post("/items/")
def create_item(item: Item):
    item_dict = item.model_dump()
    result = db.items.insert_one(item_dict)
    return {"id": str(result.inserted_id)}

@app.get("/items/{item_id}")
def read_item(item_id: str):
    item = db.items.find_one({"_id": ObjectId(item_id)})
    if item:
        item["_id"] = str(item["_id"])
        return item
    return {"error": "Item not found"}
