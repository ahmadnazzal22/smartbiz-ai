from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import BusinessHour, User
from schemas import BusinessHourCreate, BusinessHourResponse
from auth import get_current_user

router = APIRouter(prefix="/api/business-hours", tags=["business-hours"])


@router.get("/", response_model=List[BusinessHourResponse])
def get_hours(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    hours = db.query(BusinessHour).order_by(BusinessHour.day_of_week).all()
    return [BusinessHourResponse.model_validate(h) for h in hours]


@router.post("/", response_model=BusinessHourResponse)
def set_hours(data: BusinessHourCreate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    existing = db.query(BusinessHour).filter(
        BusinessHour.day_of_week == data.day_of_week
    ).first()
    if existing:
        existing.open_time = data.open_time
        existing.close_time = data.close_time
        existing.is_available = data.is_available
        db.commit()
        db.refresh(existing)
        return BusinessHourResponse.model_validate(existing)

    bh = BusinessHour(**data.model_dump())
    db.add(bh)
    db.commit()
    db.refresh(bh)
    return BusinessHourResponse.model_validate(bh)
