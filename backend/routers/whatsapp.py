from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from database import get_db
from models import Message, Lead
from schemas import WhatsAppIncoming
from utils.ai_assistant import get_ai_response

router = APIRouter(prefix="/api/whatsapp", tags=["whatsapp"])


@router.post("/webhook")
async def whatsapp_webhook(data: WhatsAppIncoming, db: Session = Depends(get_db)):
    sender_number = data.From
    message_body = data.Body
    profile_name = data.ProfileName or "Customer"

    lead = db.query(Lead).filter(Lead.phone == sender_number).first()
    if not lead:
        lead = Lead(
            name=profile_name,
            phone=sender_number,
            source="whatsapp",
            status="new",
        )
        db.add(lead)
        db.commit()
        db.refresh(lead)

    incoming_msg = Message(
        lead_id=lead.id,
        sender=sender_number,
        content=message_body,
        direction="incoming",
        is_ai=False,
    )
    db.add(incoming_msg)

    ai_reply = get_ai_response(message_body)

    ai_msg = Message(
        lead_id=lead.id,
        sender="SmartBiz AI",
        content=ai_reply,
        direction="outgoing",
        is_ai=True,
    )
    db.add(ai_msg)
    db.commit()

    return {
        "status": "success",
        "reply": ai_reply,
    }


@router.get("/webhook")
async def verify_webhook(request: Request):
    mode = request.query_params.get("hub.mode")
    token = request.query_params.get("hub.verify_token")
    challenge = request.query_params.get("hub.challenge")

    if mode == "subscribe" and token == "smartbiz_verify_token":
        return int(challenge)
    return {"error": "Verification failed"}
