from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


class UserCreate(BaseModel):
    email: str
    password: str
    name: str
    business_name: Optional[str] = ""


class UserLogin(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    business_name: str
    whatsapp_number: str
    created_at: datetime

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


class LeadCreate(BaseModel):
    name: str
    phone: Optional[str] = ""
    email: Optional[str] = ""
    source: Optional[str] = "whatsapp"
    notes: Optional[str] = ""


class LeadResponse(BaseModel):
    id: int
    name: str
    phone: str
    email: str
    source: str
    status: str
    notes: str
    created_at: datetime

    class Config:
        from_attributes = True


class BookingCreate(BaseModel):
    customer_name: str
    customer_phone: Optional[str] = ""
    customer_email: Optional[str] = ""
    service: Optional[str] = ""
    date: str
    time: str
    notes: Optional[str] = ""


class BookingResponse(BaseModel):
    id: int
    customer_name: str
    customer_phone: str
    customer_email: str
    service: str
    date: str
    time: str
    status: str
    notes: str
    created_at: datetime

    class Config:
        from_attributes = True


class MessageCreate(BaseModel):
    lead_id: Optional[int] = 0
    sender: str
    content: str
    direction: Optional[str] = "incoming"
    is_ai: Optional[bool] = False


class MessageResponse(BaseModel):
    id: int
    lead_id: int
    sender: str
    content: str
    direction: str
    is_ai: bool
    created_at: datetime

    class Config:
        from_attributes = True


class AIChatRequest(BaseModel):
    message: str
    conversation_history: Optional[List[dict]] = []


class AIChatResponse(BaseModel):
    reply: str


class WhatsAppIncoming(BaseModel):
    From: str
    Body: str
    ProfileName: Optional[str] = ""


class BusinessHourCreate(BaseModel):
    day_of_week: int
    open_time: str
    close_time: str
    is_available: Optional[bool] = True


class BusinessHourResponse(BaseModel):
    id: int
    day_of_week: int
    open_time: str
    close_time: str
    is_available: bool

    class Config:
        from_attributes = True
