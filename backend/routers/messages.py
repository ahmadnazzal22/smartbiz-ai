from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import Message, User
from schemas import MessageCreate, MessageResponse
from auth import get_current_user

router = APIRouter(prefix="/api/messages", tags=["messages"])


@router.get("/", response_model=List[MessageResponse])
def get_messages(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    messages = db.query(Message).order_by(Message.created_at.desc()).limit(100).all()
    return [MessageResponse.model_validate(m) for m in messages]


@router.post("/", response_model=MessageResponse)
def create_message(data: MessageCreate, db: Session = Depends(get_db)):
    msg = Message(**data.model_dump())
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return MessageResponse.model_validate(msg)


@router.get("/conversation/{lead_id}", response_model=List[MessageResponse])
def get_conversation(lead_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    messages = db.query(Message).filter(
        Message.lead_id == lead_id
    ).order_by(Message.created_at.asc()).all()
    return [MessageResponse.model_validate(m) for m in messages]
