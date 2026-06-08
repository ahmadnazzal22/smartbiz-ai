import os
from fastapi import APIRouter, Request, HTTPException, Query
from schemas import WhatsAppIncoming, AIChatResponse
from utils.ai_assistant import get_ai_response

router = APIRouter(prefix="/api/whatsapp", tags=["whatsapp"])

VERIFY_TOKEN = os.getenv("WHATSAPP_VERIFY_TOKEN", "smartbiz_verify_token")


@router.post("/webhook")
async def whatsapp_webhook(data: WhatsAppIncoming):
    if not data.From or not data.Body:
        raise HTTPException(status_code=400, detail="Missing From or Body")

    reply = get_ai_response(data.Body)
    return {"reply": reply}


@router.get("/webhook")
def verify_webhook(
    hub_mode: str = Query(default="", alias="hub.mode"),
    hub_verify_token: str = Query(default="", alias="hub.verify_token"),
    hub_challenge: str = Query(default="", alias="hub.challenge"),
):
    if hub_mode == "subscribe" and hub_verify_token == VERIFY_TOKEN:
        return int(hub_challenge)
    raise HTTPException(status_code=403, detail="Verification failed")
