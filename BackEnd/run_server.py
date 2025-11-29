#!/usr/bin/env python
"""
Script para rodar o backend FastAPI
Rodando em processo separado para evitar encerramento prematuro
"""
import subprocess
import sys
import os

os.chdir(r"c:\Users\mateu\Projeto-leo\BackEnd")

# Roda uvicorn como subprocess
try:
    subprocess.run([
        sys.executable, "-m", "uvicorn",
        "app.main:app",
        "--host", "0.0.0.0",
        "--port", "8001"
    ], check=False)
except KeyboardInterrupt:
    print("\n\nServidor encerrado.")
except Exception as e:
    print(f"Erro ao iniciar servidor: {e}")
    sys.exit(1)
