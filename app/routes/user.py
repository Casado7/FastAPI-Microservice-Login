from fastapi import APIRouter, HTTPException
from app.models.user import User, UserDB
from app.services.user_service import user_exists, create_user, get_user, get_all_users, update_user, delete_user

router = APIRouter()

@router.post("/users/", response_model=User)
def create_user_endpoint(user: UserDB):
    if user_exists(user.username):
        raise HTTPException(status_code=400, detail="Username already exists")
    user_dict = create_user(user)
    return user_dict

@router.get("/users/{user_id}", response_model=User)
def read_user_endpoint(user_id: str):
    user = get_user(user_id)
    if user:
        return {key: user[key] for key in user if key != "password"}
    raise HTTPException(status_code=404, detail="User not found")

@router.get("/users/")
def read_all_users_endpoint():
    users = get_all_users()
    return [{key: user[key] for key in user if key != "password"} for user in users]

@router.put("/users/{user_id}", response_model=User)
def update_user_endpoint(user_id: str, user: UserDB):
    updated_user = update_user(user_id, user)
    if updated_user:
        return {key: updated_user[key] for key in updated_user if key != "password"}
    raise HTTPException(status_code=404, detail="User not found")

@router.delete("/users/{user_id}")
def delete_user_endpoint(user_id: str):
    result = delete_user(user_id)
    if result:
        return result
    raise HTTPException(status_code=404, detail="User not found")
