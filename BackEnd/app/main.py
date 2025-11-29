from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Rotas
from app.api.routes.auth_routes import router as auth_router
from app.api.routes.music_routes import router as music_router
from app.api.routes.spotify_routes import router as spotify_router

# Banco
from app.core.database import create_db_and_tables

# ============================================================
# CONFIG APP
# ============================================================

app = FastAPI(title="Projeto Leo Backend")

# Origem do front-end (Vite)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# ============================================================
# ROTAS
# ============================================================

app.include_router(auth_router)
app.include_router(music_router)
app.include_router(spotify_router)

# ============================================================
# BANCO DE DADOS
# ============================================================

# cria tabelas automaticamente
create_db_and_tables()

# ============================================================
# ROTA PADRÃO
# ============================================================

@app.get("/")
async def root():
    return {"message": "backend funcionando"}
