from pymongo import MongoClient
from app.core.config import MONGO_HOST, MONGO_PORT

client = MongoClient(MONGO_HOST, MONGO_PORT)
db = client.mydatabase
