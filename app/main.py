from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
from pydantic import BaseModel
from bson.objectid import ObjectId
import os
import bcrypt

app = FastAPI()

# Conexión a MongoDB
mongo_host = os.getenv("MONGO_HOST", "login-mongo")
mongo_port = int(os.getenv("MONGO_PORT", 27017))
client = MongoClient(mongo_host, mongo_port)
db = client.mydatabase

class User(BaseModel):
    username: str
    email: str
    first_name: str
    last_name: str
    disabled: bool = False

    class Config:
        schema_extra = {
            "example": {
                "username": "johndoe",
                "email": "johndoe@example.com",
                "first_name": "John",
                "last_name": "Doe",
                "password": "secret",
                "disabled": False
            }
        }
class UserDB(User):
    password: str

@app.get("/")
def read_root():
    return {"Hello": "FastAPI with MongoDB"}

@app.post("/users/", response_model=User)
def create_user(user: UserDB):
    user_dict = user.model_dump()
    # Encriptar la contraseña antes de guardarla en la base de datos
    hashed_password = bcrypt.hashpw(user_dict["password"].encode('utf-8'), bcrypt.gensalt())
    user_dict["password"] = hashed_password
    result = db.users.insert_one(user_dict)
    user_dict["_id"] = str(result.inserted_id)
   
    return user_dict

@app.get("/users/{user_id}", response_model=User)
def read_user(user_id: str):
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if user:
        user["_id"] = str(user["_id"])
        return user
    raise HTTPException(status_code=404, detail="User not found")

@app.get("/users/")
def read_all_users():
    users = db.users.find()
    all_users = []
    for user in users:
        user["_id"] = str(user["_id"])
        all_users.append(user)
    return all_users

@app.put("/users/{user_id}", response_model=User)
def update_user(user_id: str, user: UserDB):
    user_dict = user.model_dump()
    if "password" in user_dict:
        # Encriptar la nueva contraseña antes de actualizarla en la base de datos
        user_dict["password"] = bcrypt.hashpw(user_dict["password"].encode('utf-8'), bcrypt.gensalt())
    update_result = db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": user_dict}
    )
    if update_result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    user_dict = db.users.find_one({"_id": ObjectId(user_id)})
    user_dict["_id"] = str(user_dict["_id"])
    return user_dict

@app.delete("/users/{user_id}")
def delete_user(user_id: str):
    delete_result = db.users.delete_one({"_id": ObjectId(user_id)})
    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"status": "User deleted"}
