import random
import json

FAQ_RESPONSES = {
    "pricing": [
        "Our pricing starts at $29/month for the Starter plan, which includes WhatsApp integration and AI responses for up to 500 conversations. The Pro plan at $79/month includes unlimited conversations, advanced analytics, and priority support. Would you like me to help you choose the right plan?",
        "We have three plans: Starter ($29/mo), Pro ($79/mo), and Enterprise (custom pricing). Each plan includes WhatsApp integration, AI assistant, and booking management. Which plan interests you?",
    ],
    "booking": [
        "I'd be happy to help you book an appointment! Could you please tell me what service you're interested in and your preferred date and time?",
        "Booking is easy! Just let me know the service you need, your preferred date, and time. I'll check availability and confirm your appointment right away.",
    ],
    "services": [
        "We offer: 1) AI-powered WhatsApp customer support, 2) Automated appointment booking, 3) Lead management dashboard, 4) Smart scheduling with calendar sync, 5) Business analytics and reports. Which service would you like to learn more about?",
        "Our platform provides AI customer service via WhatsApp, automated booking, lead tracking, and business analytics. We help small businesses automate their customer communication and sales process.",
    ],
    "hours": [
        "Our business hours are Monday to Friday, 9:00 AM to 6:00 PM. We also offer limited Saturday appointments. Would you like to book a time slot?",
        "We're open Mon-Fri 9AM-6PM. Weekend appointments are available upon request. What day works best for you?",
    ],
    "contact": [
        "You can reach us via WhatsApp at +1 (555) 123-4567, email at support@smartbiz.ai, or just keep chatting with me here!",
        "Our support team is available through WhatsApp, email (support@smartbiz.ai), and this chat assistant. How can I help you today?",
    ],
    "hello": [
        "Hello! Welcome to SmartBiz AI! I'm your virtual assistant. I can help you with pricing, booking appointments, learning about our services, or anything else. How can I assist you today?",
        "Hi there! Thanks for reaching out to SmartBiz AI. I'm here to help you automate your business communication. What can I do for you?",
    ],
    "default": [
        "Thank you for your message. I'm here to help with pricing, bookings, services, and general inquiries. Could you please let me know what you're looking for?",
        "I understand you have a question. I can assist with: pricing information, appointment booking, service details, business hours, or general inquiries. What would you like to know?",
    ],
}


def get_ai_response(message: str, conversation_history: list = None) -> str:
    msg_lower = message.lower()

    if any(word in msg_lower for word in ["hi", "hello", "hey", "good morning", "good evening"]):
        category = "hello"
    elif any(word in msg_lower for word in ["price", "pricing", "cost", "plan", "subscription", "monthly", "fee"]):
        category = "pricing"
    elif any(word in msg_lower for word in ["book", "appointment", "schedule", "reserve", "calendar", "slot"]):
        category = "booking"
    elif any(word in msg_lower for word in ["service", "offer", "feature", "capability", "what do you"]):
        category = "services"
    elif any(word in msg_lower for word in ["hour", "open", "time", "when", "available"]):
        category = "hours"
    elif any(word in msg_lower for word in ["contact", "support", "email", "phone", "reach"]):
        category = "contact"
    else:
        category = "default"

    return random.choice(FAQ_RESPONSES[category])
