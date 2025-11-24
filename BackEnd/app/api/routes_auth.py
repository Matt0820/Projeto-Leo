from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.models.user import User
from app.schemas.user_schema import UserCreate, UserRead
from app.services.auth_sevice import AuthService
from app.core.database import get_session

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=UserRead)
def register(user_create: UserCreate, session: Session = Depends(get_session)):
    # Checa se usuário/email já existe
    user_exists = session.exec(select(User).where((User.username==user_create.username) | (User.email==user_create.email))).first()
    if user_exists:
        raise HTTPException(status_code=400, detail="Usuário ou email já existe")

    hashed_pwd = AuthService.hash_password(user_create.password)
    user = User(username=user_create.username, email=user_create.email, hashed_password=hashed_pwd)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user
