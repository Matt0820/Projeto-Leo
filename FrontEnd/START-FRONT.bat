@echo off
setlocal enabledelayedexpansion

cd /d "%~dp0"

REM Se não tiver node_modules, instala
if not exist "node_modules" (
    echo Instalando dependencias do frontend...
    npm install
)

REM Inicia o Vite
echo Iniciando frontend...
npm run dev -- --host

pause
