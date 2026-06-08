from datetime import datetime, timedelta
from database import SessionLocal, engine, Base
from models import User, Lead, Booking, Message, BusinessHour
from auth import hash_password

Base.metadata.create_all(bind=engine)

def days_ago(n):
    return datetime.utcnow() - timedelta(days=n)

def today_str():
    return datetime.utcnow().strftime("%Y-%m-%d")

def future_str(n):
    return (datetime.utcnow() + timedelta(days=n)).strftime("%Y-%m-%d")

def seed_demo_data():
    db = SessionLocal()
    if db.query(User).count() > 0:
        db.close()
        return

    db.add(User(
        email="demo@smartbiz.ai", password_hash=hash_password("demo123"),
        name="Demo User", business_name="SmartBiz Inc.",
        whatsapp_number="+1 (555) 000-0000", created_at=days_ago(14),
    ))
    db.commit()

    leads = [
        {"name": "Robert Kim", "phone": "+1 (555) 678-9012", "email": "robert.kim@email.com", "source": "whatsapp", "status": "hot", "notes": "CEO at TechStart — ready for Enterprise plan", "created_at": days_ago(0)},
        {"name": "Noura Al-Saud", "phone": "+966 55 123 4567", "email": "noura@alsaud.com", "source": "whatsapp", "status": "hot", "notes": "Interested in Arabic WhatsApp bot", "created_at": days_ago(0)},
        {"name": "Sarah Johnson", "phone": "+1 (555) 123-4567", "email": "sarah.j@email.com", "source": "whatsapp", "status": "hot", "notes": "Boutique owner — wants booking + WhatsApp", "created_at": days_ago(1)},
        {"name": "Mike Chen", "phone": "+1 (555) 234-5678", "email": "mike.chen@email.com", "source": "web", "status": "qualified", "notes": "Comparing plans — leaning toward Pro", "created_at": days_ago(1)},
        {"name": "Layla Hassan", "phone": "+971 50 987 6543", "email": "layla.h@email.com", "source": "whatsapp", "status": "qualified", "notes": "Dubai clinic — needs multi-language", "created_at": days_ago(2)},
        {"name": "Emily Watson", "phone": "+1 (555) 345-6789", "email": "emily.w@email.com", "source": "web", "status": "qualified", "notes": "Dental practice consultation", "created_at": days_ago(2)},
        {"name": "James Wilson", "phone": "+1 (555) 456-7890", "email": "james.w@email.com", "source": "referral", "status": "new", "notes": "Asked about pricing", "created_at": days_ago(3)},
        {"name": "Amr Khaled", "phone": "+20 100 555 1234", "email": "amr.k@email.com", "source": "whatsapp", "status": "new", "notes": "Real estate developer", "created_at": days_ago(3)},
        {"name": "Lisa Park", "phone": "+1 (555) 567-8901", "email": "lisa.park@email.com", "source": "web", "status": "warm", "notes": "Engaged with chatbot", "created_at": days_ago(4)},
        {"name": "Ahmed Mansour", "phone": "+966 54 321 0987", "email": "ahmed.m@email.com", "source": "whatsapp", "status": "new", "notes": "Restaurant chain — 5 branches", "created_at": days_ago(4)},
        {"name": "Priya Sharma", "phone": "+1 (555) 789-0123", "email": "priya.s@email.com", "source": "web", "status": "qualified", "notes": "Yoga studio", "created_at": days_ago(5)},
        {"name": "Omar Farouk", "phone": "+971 55 444 3333", "email": "omar.f@email.com", "source": "referral", "status": "warm", "notes": "Enterprise inquiry — 50+ employees", "created_at": days_ago(5)},
    ]
    for l in leads:
        db.add(Lead(**l))
    db.commit()

    today = today_str()
    yesterday = (datetime.utcnow() - timedelta(days=1)).strftime("%Y-%m-%d")
    tomorrow = future_str(1)
    day_after = future_str(2)

    bookings = [
        {"customer_name": "Sarah Johnson", "customer_phone": "+1 (555) 123-4567", "service": "Consultation", "date": today, "time": "10:00", "status": "confirmed", "notes": "First-time consultation", "created_at": days_ago(1)},
        {"customer_name": "Mike Chen", "customer_phone": "+1 (555) 234-5678", "service": "Product Demo", "date": today, "time": "14:30", "status": "confirmed", "notes": "Pro plan demo", "created_at": days_ago(1)},
        {"customer_name": "Noura Al-Saud", "customer_phone": "+966 55 123 4567", "service": "Consultation", "date": today, "time": "16:00", "status": "confirmed", "notes": "Arabic demo", "created_at": days_ago(0)},
        {"customer_name": "Layla Hassan", "customer_phone": "+971 50 987 6543", "service": "WhatsApp Setup", "date": yesterday, "time": "11:00", "status": "completed", "notes": "Multi-language config", "created_at": days_ago(2)},
        {"customer_name": "Emily Watson", "customer_phone": "+1 (555) 345-6789", "service": "Consultation", "date": yesterday, "time": "09:30", "status": "completed", "notes": "Dental practice onboarding", "created_at": days_ago(2)},
        {"customer_name": "Ahmed Mansour", "customer_phone": "+966 54 321 0987", "service": "Product Demo", "date": tomorrow, "time": "13:00", "status": "confirmed", "notes": "Restaurant chain", "created_at": days_ago(1)},
        {"customer_name": "Priya Sharma", "customer_phone": "+1 (555) 789-0123", "service": "Consultation", "date": tomorrow, "time": "15:30", "status": "confirmed", "notes": "Yoga studio", "created_at": days_ago(2)},
        {"customer_name": "Robert Kim", "customer_phone": "+1 (555) 678-9012", "service": "Enterprise Demo", "date": day_after, "time": "10:30", "status": "pending", "notes": "CEO needs custom quote", "created_at": days_ago(0)},
    ]
    for b in bookings:
        db.add(Booking(**b))
    db.commit()

    msgs = [
        (1, "Robert Kim", "Hi! We need an enterprise solution for 200 people.", "incoming", False, days_ago(0)),
        (1, "SmartBiz AI", "Our Enterprise plan supports unlimited users and dedicated support. Want a call?", "outgoing", True, days_ago(0)),
        (1, "Robert Kim", "Yes, let's do tomorrow at 10 AM.", "incoming", False, days_ago(0)),
        (1, "SmartBiz AI", "Scheduled! You'll receive a calendar invite shortly.", "outgoing", True, days_ago(0)),
        (2, "Noura Al-Saud", "السلام عليكم! هل تدعمون العربية؟", "incoming", False, days_ago(0)),
        (2, "SmartBiz AI", "وعليكم السلام! نعم، ندعم العربية بشكل كامل.", "outgoing", True, days_ago(0)),
        (3, "Sarah Johnson", "Hi! How does WhatsApp booking work?", "incoming", False, days_ago(1)),
        (3, "SmartBiz AI", "Customers message you, AI handles bookings and syncs with your calendar.", "outgoing", True, days_ago(1)),
        (3, "Sarah Johnson", "Sounds perfect! Let's do a demo.", "incoming", False, days_ago(1)),
        (4, "Mike Chen", "How does your pricing compare?", "incoming", False, days_ago(1)),
        (4, "SmartBiz AI", "Pro plan at $79/mo is typically 40%% cheaper than competitors.", "outgoing", True, days_ago(1)),
        (5, "Layla Hassan", "Hi! Do you support Arabic, English, and Urdu?", "incoming", False, days_ago(2)),
        (6, "Emily Watson", "I'd like to book a consultation.", "incoming", False, days_ago(2)),
        (6, "SmartBiz AI", "We have openings Wednesday at 11 AM or Thursday at 2 PM.", "outgoing", True, days_ago(2)),
        (10, "Ahmed Mansour", "نحتاج نظام حجوزات لـ ٥ فروع.", "incoming", False, days_ago(3)),
        (10, "SmartBiz AI", "ممتاز! نظامنا يدعم الفروع المتعددة.", "outgoing", True, days_ago(3)),
        (11, "Priya Sharma", "Can your system handle class bookings with capacity limits?", "incoming", False, days_ago(4)),
        (11, "SmartBiz AI", "Yes! Booking system supports capacity limits, waitlists, and reminders.", "outgoing", True, days_ago(4)),
        (12, "Omar Farouk", "What Enterprise features for 50+ team?", "incoming", False, days_ago(5)),
        (12, "SmartBiz AI", "SSO, custom integrations, dedicated account manager, SLA guarantees.", "outgoing", True, days_ago(5)),
    ]
    for lead_id, sender, content, direction, is_ai, created in msgs:
        db.add(Message(lead_id=lead_id, sender=sender, content=content, direction=direction, is_ai=is_ai, created_at=created))
    db.commit()

    hours = [(0, "09:00", "18:00", True), (1, "09:00", "18:00", True), (2, "09:00", "18:00", True), (3, "09:00", "18:00", True), (4, "09:00", "17:00", True), (5, "10:00", "15:00", False), (6, "00:00", "00:00", False)]
    for day, open_t, close_t, avail in hours:
        db.add(BusinessHour(day_of_week=day, open_time=open_t, close_time=close_t, is_available=avail))
    db.commit()
    db.close()

if __name__ == "__main__":
    seed_demo_data()
