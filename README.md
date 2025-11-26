# 📘 Projeto LEO — Plataforma de Vídeos Educacionais

Aplicação full-stack desenvolvida em **React + TypeScript** no frontend e **FastAPI (Python)** no backend.

Este repositório contém os dois ambientes prontos para desenvolvimento e colaboração.

---

## 📂 Estrutura do Projeto

```text
PROJETO-LEO/
├── BackEnd/   # API, banco e serviços em Python (FastAPI)
└── FrontEnd/  # Interface web em React + TS + SCSS
````

-----

## 🚀 Como Rodar o Projeto

### 🔧 Pré-requisitos

  - Node.js 18+
  - Python 3.10+
  - Git
  - Docker (opcional)

-----

## 🟦 FRONTEND — React + TypeScript

### ▶️ Rodar o Front-End

Execute os comandos abaixo no terminal:

```bash
cd FrontEnd
npm install
npm run dev
```

> **Acesse:** [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173)

-----

## 🟧 BACKEND — FastAPI + SQLite

### ▶️ Criar ambiente virtual

```bash
cd BackEnd
python -m venv venv

# Ativar no Linux/Mac:
source venv/bin/activate

# Ativar no Windows:
.\venv\Scripts\activate
```

### ▶️ Instalar dependências

```bash
pip install -r requirements.txt
```

### ▶️ Rodar o servidor

```bash
uvicorn app.main:app --reload
```

> **Documentação da API:** [http://localhost:8000/docs](https://www.google.com/search?q=http://localhost:8000/docs)

-----

## 🛠️ Funcionalidades Principais

  * **✔️ Login e Registro:** Autenticação com JWT no backend e formulários no frontend.
  * **✔️ Player de Vídeo:** Página dedicada para exibição de conteúdos.
  * **✔️ Dashboard / Home:** Tela inicial com navegação entre módulos e funcionalidades.

-----

## 🗂️ Estrutura de Pastas (Resumo)

### 🔸 Backend

```bash
app/
 ├── api/         # Rotas de autenticação e endpoints
 ├── core/        # Configurações do banco
 ├── models/      # Tabelas SQLAlchemy
 ├── schemas/     # Modelos Pydantic
 ├── services/    # Regras e lógica de autenticação
 └── main.py      # Entrada da aplicação FastAPI
```

### 🔹 Frontend

```bash
src/
 ├── assets/      # Imagens, vídeos, ícones
 ├── components/  # Componentes reutilizáveis
 ├── pages/       # Páginas principais
 ├── services/    # Comunicação com API
 └── styles/      # SCSS/CSS do projeto
```

-----

## 👥 Como Contribuir

1.  Faça um **fork** do repositório.
2.  Crie uma branch para sua feature:

<!-- end list -->

```bash
git checkout -b feature/nome-da-feature
```

3.  Realize alterações e commit:

<!-- end list -->

```bash
git commit -m "Adiciona nova feature"
```

4.  Envie para o repositório remoto:

<!-- end list -->

```bash
git push origin feature/nome-da-feature
```

5.  Abra um **Pull Request**.

-----

## 📄 Licença

Este projeto é open-source e pode ser utilizado livremente.