from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
import requests
import os
from pathlib import Path
from dotenv import load_dotenv
from app.core.database import get_session

# Carrega variáveis do .env de múltiplos locais
# Tenta app/.env primeiro, depois BackEnd/.env
env_path_app = Path(__file__).parent.parent.parent / ".env"  # app/.env
env_path_backend = Path(__file__).parent.parent.parent.parent / ".env"  # BackEnd/.env

if env_path_app.exists():
    load_dotenv(env_path_app)
if env_path_backend.exists():
    load_dotenv(env_path_backend)

router = APIRouter(prefix="/spotify", tags=["spotify"])

# Credenciais do Spotify (lidas do .env)
SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID", "").strip()
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET", "").strip()
SPOTIFY_API_URL = "https://api.spotify.com/v1"

# Debug: print credenciais (remover em produção)
if not SPOTIFY_CLIENT_ID or not SPOTIFY_CLIENT_SECRET:
    print("⚠️  AVISO: Credenciais do Spotify não encontradas no .env!")
else:
    print(f"✅ Credenciais do Spotify carregadas: ID={SPOTIFY_CLIENT_ID[:10]}...")

# Cache para token de acesso
_spotify_token = None
_token_expiry = None

def get_spotify_token():
    """Obtém um token de acesso do Spotify usando Client Credentials Flow"""
    global _spotify_token, _token_expiry
    import time
    
    current_time = time.time()
    
    # Se tem token e não expirou, retorna
    if _spotify_token and _token_expiry and current_time < _token_expiry:
        return _spotify_token
    
    # Caso contrário, solicita novo token
    auth_url = "https://accounts.spotify.com/api/token"
    payload = {
        "grant_type": "client_credentials",
        "client_id": SPOTIFY_CLIENT_ID,
        "client_secret": SPOTIFY_CLIENT_SECRET,
    }
    
    try:
        response = requests.post(auth_url, data=payload)
        response.raise_for_status()
        try:
            data = response.json()
        except ValueError:
            # Non-JSON response from Spotify
            raise HTTPException(status_code=500, detail=f"Spotify token endpoint returned non-JSON: {response.text}")

        # Validate expected fields
        if not data or "access_token" not in data:
            raise HTTPException(status_code=500, detail=f"Invalid token response from Spotify: {data}")

        _spotify_token = data["access_token"]
        _token_expiry = current_time + data.get("expires_in", 3600)

        return _spotify_token
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erro ao obter token Spotify: {str(e)}")

@router.get("/top-playlists")
async def get_top_playlists():
    """Retorna as playlists mais populares do Spotify (ex: Top Brasil)"""
    try:
        token = get_spotify_token()
        
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        }
        
        # Busca a playlist "Top 50 - Brasil"
        search_url = f"{SPOTIFY_API_URL}/search"
        params = {
            "q": "Top 50",
            "type": "playlist",
            "limit": 20,
            "market": "BR"
        }
        
        response = requests.get(search_url, headers=headers, params=params)
        # If Spotify returns non-2xx this will raise and be handled below
        response.raise_for_status()

        try:
            data = response.json()
        except ValueError:
            # log raw body for debugging
            print("[spotify_routes] Non-JSON response from Spotify /search:", response.status_code, response.text)
            return {"playlists": []}

        if not isinstance(data, dict):
            print("[spotify_routes] Unexpected JSON type from Spotify /search:", type(data), data)
            return {"playlists": []}

        playlists = []
        items = data.get("playlists", {}).get("items", []) if data else []
        if not items:
            # no playlists found — return empty result instead of failing
            return {"playlists": []}

        for item in items:
            # Skip null/non-dict items that sometimes appear in Spotify responses
            if not item or not isinstance(item, dict):
                continue

            playlists.append({
                "id": item.get("id"),
                "name": item.get("name"),
                "description": item.get("description", ""),
                "image": (item.get("images") and len(item.get("images")) > 0 and item.get("images")[0].get("url")) or "",
                "followers": (item.get("followers") or {}).get("total", 0),
                "tracks": (item.get("tracks") or {}).get("total", 0),
            })

        return {"playlists": playlists}
    
    except Exception as e:
        import traceback
        raise HTTPException(status_code=500, detail=traceback.format_exc())

@router.get("/playlist/{playlist_id}/tracks")
async def get_playlist_tracks(playlist_id: str):
    """Retorna as músicas de uma playlist específica"""
    try:
        token = get_spotify_token()
        
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        }
        
        url = f"{SPOTIFY_API_URL}/playlists/{playlist_id}/tracks"
        response = requests.get(url, headers=headers, params={"limit": 50})
        response.raise_for_status()
        
        data = response.json()
        
        tracks = []
        for item in data.get("items", []):
            track = item.get("track", {})
            if track:
                tracks.append({
                    "id": track["id"],
                    "name": track["name"],
                    "artist": ", ".join([artist["name"] for artist in track.get("artists", [])]),
                    "image": track["album"]["images"][0]["url"] if track.get("album", {}).get("images") else "",
                    "duration": track.get("duration_ms", 0),
                    "preview_url": track.get("preview_url", ""),  # URL de áudio do Spotify
                })
        
        return {"tracks": tracks}
    
    except Exception as e:
        import traceback
        raise HTTPException(status_code=500, detail=traceback.format_exc())

@router.get("/search")
async def search_spotify(q: str):
    """Busca músicas, artistas ou playlists no Spotify"""
    try:
        token = get_spotify_token()
        
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        }
        
        url = f"{SPOTIFY_API_URL}/search"
        params = {
            "q": q,
            "type": "track,artist,playlist",
            "limit": 20,
            "market": "BR"
        }
        
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        
        return response.json()
    
    except Exception as e:
        import traceback
        raise HTTPException(status_code=500, detail=traceback.format_exc())
