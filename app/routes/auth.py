from fastapi import APIRouter, HTTPException, Depends, status
from app.models.user import User, UserDB
from app.db.database import db
from app.services.user_service import user_exists, create_user, get_user,get_user_by_username, get_all_users, update_user, delete_user, get_userdb_by_username
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime, timedelta
import jwt
from jwt.exceptions import InvalidTokenError
import bcrypt

ALGORITHM ="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
SECRET = "6d480a9093e41ca4cd60f5aba65e334d579b8292c99ffa6dd082d037403b14c4"

router = APIRouter()
oauth2 = OAuth2PasswordBearer(tokenUrl="login")

@router.get("/auth")
def read_root():
    return {"Hello": "FastAPI with MongoDB"}

async def auth_user(token: str = Depends(oauth2)):
    try:
        username = jwt.decode(token, SECRET, algorithms=ALGORITHM).get("sub")
        if username is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, 
                                detail="No estas autorizado",
                                headers={"WWW-Authenticate": "Bearer"})
        
    except InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, 
                            detail="No estas autorizado",
                            headers={"WWW-Authenticate": "Bearer"})
    return get_user_by_username(username)

async def current_user(user: User = Depends(auth_user)):
    if user.disabled:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, 
                            detail="Usuario Desabilitado",
                            headers={"WWW-Authenticate": "Bearer"})
    return user

@router.post("/login")
async def login(form: OAuth2PasswordRequestForm = Depends()):
    
    user_db = get_userdb_by_username(form.username)
    if not user_db:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="El usuario no existe")
    
    if not bcrypt.checkpw(form.password.encode('utf-8'), user_db.password.encode('utf-8')):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="La contraseña no es correcta")
    
    access_token_expiration = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    expire = datetime.utcnow() + access_token_expiration

    access_token = {"sub":user_db.username,
                    "exp": expire,
                    }

    return {"access_token":jwt.encode(access_token, SECRET, algorithm=ALGORITHM), "token_type":"bearer"}

@router.get("/me")
async def me(user: User = Depends(current_user)):
    return user

