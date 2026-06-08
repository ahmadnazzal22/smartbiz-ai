import os
import json
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
MODEL = os.getenv("ANTHROPIC_MODEL", "claude-sonnet-4-20250514")
MAX_TOKENS = 512

_conversations = {}

SYSTEM_PROMPT = """You are the AI assistant for SmartBiz AI, a platform that helps small businesses automate WhatsApp customer communication, appointment booking, lead management, and business analytics.

Your role:
- Answer questions about SmartBiz AI features, pricing ($29 Starter / $79 Pro / custom Enterprise), and capabilities
- Help book appointments (ask for service, date, time)
- Explain how WhatsApp automation, lead scoring, and analytics work
- Be friendly, concise, and professional
- If asked something outside your scope, redirect to SmartBiz AI features
- Keep responses under 3 sentences when possible
- You can check availability and help schedule demos

For booking: ask for service type, preferred date (YYYY-MM-DD), and time (HH:MM)."""


def _get_client():
    if not ANTHROPIC_API_KEY or ANTHROPIC_API_KEY == "sk-ant-xxxxxxxxxxxxx":
        return None
    try:
        import anthropic
        return anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
    except Exception:
        return None


def generate_response(message: str, conversation_id: str = None, system_override: str = None) -> str:
    client = _get_client()
    if client is None:
        return _fallback_response(message)

    if conversation_id is None:
        conversation_id = "default"

    if conversation_id not in _conversations:
        _conversations[conversation_id] = []

    _conversations[conversation_id].append({"role": "user", "content": message})
    _conversations[conversation_id] = _conversations[conversation_id][-20:]

    try:
        response = client.messages.create(
            model=MODEL,
            max_tokens=MAX_TOKENS,
            system=system_override or SYSTEM_PROMPT,
            messages=_conversations[conversation_id],
        )
        reply = response.content[0].text
    except Exception:
        reply = _fallback_response(message)

    _conversations[conversation_id].append({"role": "assistant", "content": reply})
    return reply


def generate_daily_report(stats: dict, leads: list, bookings: list) -> dict:
    client = _get_client()
    if client is None:
        return _mock_report(stats, leads, bookings)

    report_prompt = f"""You are an AI business analyst. Generate a concise daily report based on this data:

Today's Stats: {json.dumps(stats)}
Recent Leads: {json.dumps(leads[:5])}
Recent Bookings: {json.dumps(bookings[:5])}

Return ONLY valid JSON with this exact structure (no markdown, no extra text):
{{
  "summary": "2-3 sentence executive summary",
  "key_metrics": [
    {{"label": "New Leads", "value": number, "change": "±X%"}},
    {{"label": "Bookings", "value": number, "change": "±X%"}},
    {{"label": "Messages", "value": number, "change": "±X%"}},
    {{"label": "Hot Leads", "value": number, "change": "±X%"}}
  ],
  "hot_leads": [
    {{"name": "string", "score": number, "note": "string", "status": "string"}}
  ],
  "recommendations": [
    {{"time": "string", "task": "string", "description": "string"}}
  ],
  "focus_area": "string"
}}"""

    try:
        response = client.messages.create(
            model=MODEL,
            max_tokens=1024,
            system="You are a JSON-only business analyst. Never include markdown or text outside JSON.",
            messages=[{"role": "user", "content": report_prompt}],
        )
        text = response.content[0].text.strip()
        if text.startswith("```"):
            text = text.split("\n", 1)[-1]
            text = text.rsplit("\n", 1)[0]
        return json.loads(text)
    except Exception:
        return _mock_report(stats, leads, bookings)


def clear_conversation(conversation_id: str):
    _conversations.pop(conversation_id, None)


def _fallback_response(message: str) -> str:
    msg = message.lower()
    if any(w in msg for w in ["hi", "hello", "hey"]):
        return "Hello! Welcome to SmartBiz AI. I can help with pricing, bookings, and features. What would you like to know?"
    if any(w in msg for w in ["price", "pricing", "cost", "plan"]):
        return "Our plans: Starter $29/mo, Pro $79/mo, Enterprise custom. All plans include WhatsApp AI, booking, and lead management. Which fits your needs?"
    if any(w in msg for w in ["book", "appointment", "schedule"]):
        return "I'd be happy to help you book! What service are you interested in, and what date/time works for you?"
    if any(w in msg for w in ["service", "feature", "offer"]):
        return "We offer WhatsApp AI automation, smart booking, lead scoring, analytics, and 24/7 customer support. Want a demo?"
    return "Thanks for reaching out! I can assist with pricing, bookings, features, or general questions. What can I help you with?"


def _mock_report(stats, leads, bookings) -> dict:
    today = datetime.now().strftime("%A, %B %d")
    hot = [l for l in leads if l.get("status") == "hot"][:3]
    hot_leads = []
    for l in hot:
        hot_leads.append({
            "name": l["name"],
            "score": 95 if l.get("status") == "hot" else 70,
            "note": l.get("notes", f"Lead from {l.get('source', 'whatsapp')} — needs follow-up"),
            "status": l.get("status", "hot"),
        })
    if not hot_leads:
        hot_leads = [
            {"name": l["name"], "score": 80, "note": l.get("notes", "Recent lead — follow up soon"), "status": l.get("status", "new")}
            for l in leads[:3]
        ]

    recommendations = []
    if hot_leads:
        recommendations.append({
            "time": "9:00 AM", "task": f"Follow up with {hot_leads[0]['name']}",
            "description": f"{hot_leads[0]['note']}",
        })
    recommendations.append({
        "time": "12:00 PM", "task": "Review weekly analytics",
        "description": "Check conversion rates and adjust campaigns",
    })
    if bookings:
        recommendations.append({
            "time": "3:00 PM", "task": f"Prepare for {len(bookings)} upcoming bookings",
            "description": f"Review {bookings[0].get('customer_name', 'next client')}'s appointment",
        })

    return {
        "summary": f"Good morning! Here's your {today} business snapshot. {stats.get('new_leads', 0)} new leads, {stats.get('today_bookings', 0)} bookings today, {stats.get('hot_leads', 0)} hot leads needing priority attention.",
        "key_metrics": [
            {"label": "New Leads", "value": stats.get("new_leads", 0), "change": "+12%"},
            {"label": "Bookings", "value": stats.get("today_bookings", 0), "change": "+8%"},
            {"label": "Messages", "value": stats.get("total_messages", 0), "change": "+15%"},
            {"label": "Hot Leads", "value": stats.get("hot_leads", 0), "change": "+10%"},
        ],
        "hot_leads": hot_leads if hot_leads else [
            {"name": "No hot leads", "score": 0, "note": "All leads have been followed up", "status": "cold"},
        ],
        "recommendations": recommendations,
        "focus_area": "Lead response time — aim for under 2 minutes for WhatsApp inquiries",
    }
