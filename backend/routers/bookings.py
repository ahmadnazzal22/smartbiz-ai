from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import Booking, User
from schemas import BookingCreate, BookingResponse, BusinessHourCreate, BusinessHourResponse
from auth import get_current_user
from utils.calendar import get_available_slots, is_slot_available, TIME_SLOTS

router = APIRouter(prefix="/api/bookings", tags=["bookings"])


@router.get("/", response_model=List[BookingResponse])
def get_bookings(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    bookings = db.query(Booking).order_by(Booking.date.desc(), Booking.time.desc()).all()
    return [BookingResponse.model_validate(b) for b in bookings]


@router.post("/", response_model=BookingResponse)
def create_booking(data: BookingCreate, db: Session = Depends(get_db)):
    if not is_slot_available(data.date, data.time, db):
        raise HTTPException(status_code=409, detail="Time slot is already booked")

    booking = Booking(**data.model_dump())
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return BookingResponse.model_validate(booking)


@router.get("/slots")
def available_slots(date: str, db: Session = Depends(get_db)):
    slots = get_available_slots(date, db)
    return {"date": date, "available_slots": slots}


@router.get("/{booking_id}", response_model=BookingResponse)
def get_booking(booking_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return BookingResponse.model_validate(booking)


@router.put("/{booking_id}", response_model=BookingResponse)
def update_booking(booking_id: int, data: BookingCreate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    for key, val in data.model_dump().items():
        setattr(booking, key, val)
    db.commit()
    db.refresh(booking)
    return BookingResponse.model_validate(booking)


@router.delete("/{booking_id}")
def cancel_booking(booking_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    booking.status = "cancelled"
    db.commit()
    return {"message": "Booking cancelled"}
