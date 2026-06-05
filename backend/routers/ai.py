from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Message, Lead, User
from schemas import AIChatRequest, AIChatResponse, MessageCreate
from auth import get_current_user
from utils.ai_assistant import get_ai_response

router = APIRouter(prefix="/api/ai", tags=["ai"])


@router.post("/chat", response_model=AIChatResponse)
def chat(data: AIChatRequest, db: Session = Depends(get_db)):
    reply = get_ai_response(data.message, data.conversation_history)
    return AIChatResponse(reply=reply)


@router.post("/whatsapp-reply", response_model=AIChatResponse)
def whatsapp_reply(data: AIChatRequest, db: Session = Depends(get_db)):
    reply = get_ai_response(data.message, data.conversation_history)
    return AIChatResponse(reply=reply)
