@echo off
setlocal enabledelayedexpansion

REM Garante que está dentro da pasta BackEnd
cd /d "%~dp0"

REM Cria o ambiente virtual se não existir
if not exist "venv\Scripts\activate.bat" (
    echo Criando ambiente virtual...
    python -m venv venv
)

REM Ativa o ambiente virtual
call venv\Scripts\activate.bat

REM Instalar dependências
echo Instalando dependencias...
pip install --upgrade pip
pip install -r requirements.txt

REM Rodar FastAPI
echo Iniciando servidor FastAPI...
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

pause
