# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes_auth import router as auth_router
from app.core.database import create_db_and_tables

# Cria app
app = FastAPI(title="Projeto Leo Backend")

# 🔥 Configuração de CORS (adicione isso)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # libera seu front-end
    allow_credentials=True,
    allow_methods=["*"],          # libera todos os métodos (GET, POST, etc)
    allow_headers=["*"],          # libera todos os headers
)

# Inclui rotas
app.include_router(auth_router)

# Cria DB + tabelas automaticamente
create_db_and_tables()

# Rota de teste
@app.get("/")
async def root():
    return {"message": "back-end funcionando"}
