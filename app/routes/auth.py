from fastapi import APIRouter, HTTPException, Depends, status
from app.models.user import User, UserDB
from app.db.database import db
from app.services.user_service import user_exists, create_user, get_user,get_user_by_username, get_all_users, update_user, delete_user
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import bcrypt

router = APIRouter()

oauth2 = OAuth2PasswordBearer(tokenUrl="login")

@router.get("/auth")
def read_root():
    return {"Hello": "FastAPI with MongoDB"}

async def current_user(token: str = Depends(oauth2)):
    user = get_user_by_username(token)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, 
                            detail="No estas autorizado",
                            headers={"WWW-Authenticate": "Bearer"})
    return user

@router.post("/login")
async def login(form: OAuth2PasswordRequestForm = Depends()):
    
    user_db = get_user_by_username(form.username)
    if not user_db:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="El usuario no existe")
    
    if not bcrypt.checkpw(form.password.encode('utf-8'), user_db["password"]):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="La contraseña no es correcta")
    
    return {"access_token":user_db["username"], "token_type":"bearer"}

@router.get("/me")
async def me(user: User = Depends(current_user)):
    return user

