from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Lead, Booking, Message, User
from auth import get_current_user

router = APIRouter(prefix="/api/stats", tags=["stats"])


@router.get("/")
def get_stats(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    total_leads = db.query(Lead).count()
    new_leads = db.query(Lead).filter(Lead.status == "new").count()
    total_bookings = db.query(Booking).count()
    today_bookings = db.query(Booking).filter(Booking.date == "2025-01-01").count()
    total_messages = db.query(Message).count()
    ai_messages = db.query(Message).filter(Message.is_ai == True).count()

    return {
        "total_leads": total_leads,
        "new_leads": new_leads,
        "total_bookings": total_bookings,
        "today_bookings": today_bookings,
        "total_messages": total_messages,
        "ai_messages": ai_messages,
    }
