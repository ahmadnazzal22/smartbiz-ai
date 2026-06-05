from datetime import datetime, timedelta
from typing import List, Tuple
from models import Booking, BusinessHour
from sqlalchemy.orm import Session

TIME_SLOTS = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
]


def get_available_slots(date: str, db: Session) -> List[str]:
    day_of_week = datetime.strptime(date, "%Y-%m-%d").weekday()

    business_hour = db.query(BusinessHour).filter(
        BusinessHour.day_of_week == day_of_week,
        BusinessHour.is_available == True,
    ).first()

    if not business_hour:
        return []

    booked = db.query(Booking).filter(
        Booking.date == date,
        Booking.status != "cancelled",
    ).all()
    booked_times = {b.time for b in booked}

    available = []
    for slot in TIME_SLOTS:
        if business_hour.open_time <= slot <= business_hour.close_time:
            if slot not in booked_times:
                available.append(slot)

    return available


def is_slot_available(date: str, time: str, db: Session) -> bool:
    existing = db.query(Booking).filter(
        Booking.date == date,
        Booking.time == time,
        Booking.status != "cancelled",
    ).first()
    return existing is None
