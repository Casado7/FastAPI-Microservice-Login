from fastapi import HTTPException
from app.models.user import UserDB, User
from app.db.database import db
from bson.objectid import ObjectId
import bcrypt

def user_exists(username: str) -> bool:
    return db.users.find_one({"username": username}) is not None

def create_user(user: UserDB):
    user_dict = user.model_dump()
    hashed_password = bcrypt.hashpw(user_dict["password"].encode('utf-8'), bcrypt.gensalt())
    user_dict["password"] = hashed_password
    result = db.users.insert_one(user_dict)
    user_dict["_id"] = str(result.inserted_id)
    return user_dict

def get_user(user_id: str):
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if user:
        user["_id"] = str(user["_id"])
        return user
    return None

def get_user_by_username(username: str):
    user = db.users.find_one({"username": username})
    if user:
        user["_id"] = str(user["_id"])
        return User(**user)
    return None

def get_userdb_by_username(username: str):
    user = db.users.find_one({"username": username})
    if user:
        user["_id"] = str(user["_id"])
        return UserDB(**user)
    return None

def get_all_users():
    users = db.users.find()
    all_users = []
    for user in users:
        user["_id"] = str(user["_id"])
        all_users.append(user)
    return all_users

def update_user(user_id: str, user: UserDB):
    user_dict = user.model_dump()
    if "password" in user_dict:
        user_dict["password"] = bcrypt.hashpw(user_dict["password"].encode('utf-8'), bcrypt.gensalt())
    update_result = db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": user_dict}
    )
    if update_result.matched_count == 0:
        return None
    user_dict = db.users.find_one({"_id": ObjectId(user_id)})
    user_dict["_id"] = str(user_dict["_id"])
    return user_dict

def delete_user(user_id: str):
    delete_result = db.users.delete_one({"_id": ObjectId(user_id)})
    if delete_result.deleted_count == 0:
        return None
    return {"status": "User deleted"}
