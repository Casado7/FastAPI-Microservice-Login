from pydantic import BaseModel

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
                "disabled": False
            }
        }

class UserDB(User):
    password: str
