from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.models.user import User
from app.schemas.user_schema import LoginSchema, LoginResponse, RegisterSchema
from app.core.database import get_session
from app.services.auth_sevice import AuthService

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=LoginResponse)
def register(data: RegisterSchema, session: Session = Depends(get_session)):
    # Verificar se email ou username já existem
    existing_email = session.exec(
        select(User).where(User.email == data.email)
    ).first()
    
    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="Email já cadastrado"
        )
    
    existing_user = session.exec(
        select(User).where(User.username == data.username)
    ).first()
    
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Username já existe"
        )
    
    # Criar novo usuário
    hashed_password = AuthService.hash_password(data.password)
    new_user = User(
        username=data.username,
        email=data.email,
        hashed_password=hashed_password
    )
    
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    
    # Gerar token
    token = AuthService.create_token({"sub": str(new_user.id)})
    
    return {"access_token": token, "token_type": "bearer"}

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
