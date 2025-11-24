# main.py
from fastapi import FastAPI
from app.api.routes_auth import router as auth_router
from app.core.database import create_db_and_tables

# Cria app
app = FastAPI(title="Projeto Leo Backend")

# Inclui rotas
app.include_router(auth_router)

# Cria DB + tabelas automaticamente
create_db_and_tables()

# Rota de teste
@app.get("/")
async def root():
    return {"message": "back-end funcionando"}
