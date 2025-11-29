from fastapi import APIRouter

router = APIRouter()

@router.get("/alguma_rota")
async def algo():
    return {"ok": True}
