@echo off
setlocal enabledelayedexpansion

REM Caminho absoluto da pasta onde este script está
set "BASE_DIR=%~dp0"

echo Iniciando Backend...
start "Backend" cmd /k "cd /d "%BASE_DIR%BackEnd" && call START-BACKEND.bat"

echo Iniciando Frontend...
start "Frontend" cmd /k "cd /d "%BASE_DIR%FrontEnd" && call START-FRONT.bat"

exit
