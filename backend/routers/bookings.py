from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import Booking, User
from schemas import BookingCreate, BookingResponse
from auth import get_current_user
from utils.sanitize import strip_html

router = APIRouter(prefix="/api/bookings", tags=["bookings"])


@router.get("/", response_model=List[BookingResponse])
def get_bookings(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    bookings = db.query(Booking).order_by(Booking.date.desc(), Booking.time.desc()).all()
    return [BookingResponse.model_validate(b) for b in bookings]


@router.post("/", response_model=BookingResponse)
def create_booking(data: BookingCreate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    sanitized = {
        "customer_name": strip_html(data.customer_name),
        "customer_phone": strip_html(data.customer_phone or ""),
        "customer_email": strip_html(data.customer_email or ""),
        "service": strip_html(data.service or ""),
        "date": data.date,
        "time": data.time,
        "notes": strip_html(data.notes or ""),
    }
    booking = Booking(**sanitized)
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return BookingResponse.model_validate(booking)


@router.get("/slots")
def get_slots(date: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    all_slots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00",
                 "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"]
    existing = db.query(Booking.date, Booking.time).filter(
        Booking.date == date,
        Booking.status != "cancelled",
    ).all()
    booked = {b.time for b in existing}
    available = [s for s in all_slots if s not in booked]
    return {"date": date, "available_slots": available}


@router.put("/{booking_id}", response_model=BookingResponse)
def update_booking(booking_id: int, data: BookingCreate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    booking.customer_name = strip_html(data.customer_name)
    booking.customer_phone = strip_html(data.customer_phone or "")
    booking.service = strip_html(data.service or "")
    booking.date = data.date
    booking.time = data.time
    booking.notes = strip_html(data.notes or "")
    db.commit()
    db.refresh(booking)
    return BookingResponse.model_validate(booking)


@router.delete("/{booking_id}")
def delete_booking(booking_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    booking.status = "cancelled"
    db.commit()
    return {"status": "cancelled"}
