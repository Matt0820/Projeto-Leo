from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.models.user import User
from app.schemas.user_schema import LoginSchema, LoginResponse
from app.core.database import get_session
from app.services.auth_sevice import AuthService

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login", response_model=LoginResponse)
def login(data: LoginSchema, session: Session = Depends(get_session)):
    user = session.exec(
        select(User).where(User.email == data.email)
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="Email não encontrado"
        )

    if not AuthService.verify_password(data.password, user.hashed_password):
        raise HTTPException(
            status_code=401,
            detail="Senha incorreta"
        )

    token = AuthService.create_token({"sub": str(user.id)})

    return {"access_token": token, "token_type": "bearer"}
