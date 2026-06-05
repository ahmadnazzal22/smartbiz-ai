from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, Float
from sqlalchemy.sql import func
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    name = Column(String, nullable=False)
    business_name = Column(String, default="")
    whatsapp_number = Column(String, default="")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    is_active = Column(Boolean, default=True)


class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, default="")
    email = Column(String, default="")
    source = Column(String, default="whatsapp")
    status = Column(String, default="new")
    notes = Column(Text, default="")
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String, nullable=False)
    customer_phone = Column(String, default="")
    customer_email = Column(String, default="")
    service = Column(String, default="")
    date = Column(String, nullable=False)
    time = Column(String, nullable=False)
    status = Column(String, default="confirmed")
    notes = Column(Text, default="")
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    lead_id = Column(Integer, default=0)
    sender = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    direction = Column(String, default="incoming")
    is_ai = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class BusinessHour(Base):
    __tablename__ = "business_hours"

    id = Column(Integer, primary_key=True, index=True)
    day_of_week = Column(Integer, nullable=False)
    open_time = Column(String, nullable=False)
    close_time = Column(String, nullable=False)
    is_available = Column(Boolean, default=True)
