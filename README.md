# SmartBiz AI - Automated Business Assistant Platform

Turn your WhatsApp into a smart AI sales system. Automate customer responses, book appointments, capture leads, and close more deals.

## 🚀 Quick Start

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

```
smartbiz-ai/
├── backend/               # FastAPI Python backend
│   ├── main.py           # App entry point
│   ├── database.py       # SQLite database config
│   ├── models.py         # SQLAlchemy models
│   ├── schemas.py        # Pydantic schemas
│   ├── auth.py           # JWT authentication
│   ├── routers/          # API routes
│   │   ├── auth.py       # Login/Register
│   │   ├── bookings.py   # Booking management
│   │   ├── leads.py      # Lead management
│   │   ├── messages.py   # Conversation logs
│   │   ├── ai.py         # AI chat endpoint
│   │   ├── whatsapp.py   # WhatsApp webhook
│   │   ├── stats.py      # Dashboard stats
│   │   └── business_hours.py
│   └── utils/
│       ├── ai_assistant.py  # Smart FAQ responses
│       └── calendar.py      # Slot management
├── frontend/              # React + Vite + Tailwind
│   ├── src/
│   │   ├── pages/        # Landing, Dashboard, etc.
│   │   ├── components/   # Reusable components
│   │   ├── context/      # Auth context
│   │   └── utils/        # API client
│   └── ...
└── README.md
```

## 🔥 Features

- **WhatsApp Integration** — Receive & respond via WhatsApp webhook
- **AI Assistant** — Smart FAQ responses (pricing, booking, services)
- **Booking System** — Calendar with double-booking prevention
- **Lead Management** — Track, filter, and qualify leads
- **Admin Dashboard** — Charts, stats, recent activity
- **Conversation Logs** — Full chat history per customer
- **Authentication** — JWT-based login/register

## 🛠 Tech Stack

| Layer    | Technology           |
|----------|----------------------|
| Frontend | React 18 + Vite      |
| Styling  | Tailwind CSS + Framer Motion |
| Backend  | FastAPI (Python)     |
| Database | SQLite (via SQLAlchemy) |
| Auth     | JWT (python-jose)    |
| Charts   | Recharts             |
| Icons    | Lucide React         |

Backend runs on `http://localhost:8000`  
Frontend runs on `http://localhost:5173`
