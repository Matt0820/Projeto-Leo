#!/bin/bash

python -m venv venv
source venv/bin/activate 2> /dev/null || venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
