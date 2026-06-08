from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import Lead, User
from schemas import LeadCreate, LeadResponse
from auth import get_current_user
from utils.sanitize import strip_html

router = APIRouter(prefix="/api/leads", tags=["leads"])


@router.get("/", response_model=List[LeadResponse])
def get_leads(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    leads = db.query(Lead).order_by(Lead.created_at.desc()).all()
    return [LeadResponse.model_validate(l) for l in leads]


@router.post("/", response_model=LeadResponse)
def create_lead(data: LeadCreate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    sanitized = {
        "name": strip_html(data.name),
        "phone": strip_html(data.phone or ""),
        "email": strip_html(data.email or ""),
        "source": strip_html(data.source or "whatsapp"),
        "notes": strip_html(data.notes or ""),
    }
    lead = Lead(**sanitized)
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return LeadResponse.model_validate(lead)


@router.get("/{lead_id}", response_model=LeadResponse)
def get_lead(lead_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return LeadResponse.model_validate(lead)


@router.put("/{lead_id}", response_model=LeadResponse)
def update_lead(lead_id: int, data: LeadCreate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    lead.name = strip_html(data.name)
    lead.phone = strip_html(data.phone or "")
    lead.email = strip_html(data.email or "")
    lead.source = strip_html(data.source or "whatsapp")
    lead.notes = strip_html(data.notes or "")
    db.commit()
    db.refresh(lead)
    return LeadResponse.model_validate(lead)
