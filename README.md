<div align="center">
  <img src="frontend/public/favicon.svg" alt="SmartBiz AI" width="80"/>
  <h1>SmartBiz AI</h1>
  <p><strong>Turn your WhatsApp into a 24/7 AI sales team.</strong></p>

  <p>
    <a href="#features">Features</a> ·
    <a href="#quick-start">Quick Start</a> ·
    <a href="#deployment">Deployment</a> ·
    <a href="#tech-stack">Tech Stack</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/React-18-6366f1?style=flat-square&logo=react" alt="React 18"/>
    <img src="https://img.shields.io/badge/Vite-5-7c3aed?style=flat-square&logo=vite" alt="Vite 5"/>
    <img src="https://img.shields.io/badge/FastAPI-Python-14b8a6?style=flat-square&logo=fastapi" alt="FastAPI"/>
    <img src="https://img.shields.io/badge/Tailwind_CSS-3-6366f1?style=flat-square&logo=tailwindcss" alt="Tailwind CSS"/>
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql" alt="PostgreSQL"/>
    <img src="https://img.shields.io/badge/bcrypt-JWT-7c3aed?style=flat-square&logo=jsonwebtokens" alt="JWT + bcrypt"/>
  </p>

  <br/>
</div>

---

## 👋 Overview

**SmartBiz AI** is a production-ready SaaS platform that turns your WhatsApp Business number into an intelligent, automated sales and support system. Handles customer conversations, books appointments, captures and scores leads, and provides real-time business analytics — from a single dashboard.

> **Live: [smartbiz-ai-wine.vercel.app](https://smartbiz-ai-wine.vercel.app)**
> **API: [ahmadnazzal-ahmad-smartbiz.hf.space](https://ahmadnazzal-ahmad-smartbiz.hf.space)**

---

## ✨ Features

### 🤖 AI Sales Assistant
- 24/7 automated customer responses via WhatsApp
- Smart FAQ handling (pricing, services, bookings, hours)
- Lead qualification and scoring (Hot / Warm / Cold)
- Arabic and English language support

### 💬 WhatsApp Integration
- WhatsApp webhook endpoint for real messaging
- Full conversation history with search
- Arabic + English support

### 📅 Smart Booking Engine
- Customers book directly from WhatsApp
- Double-booking prevention with intelligent slot management
- Configurable business hours (per day of week)
- Confirmation and reminder messages

### 🎯 Lead Pipeline Management
- Visual pipeline with Hot/Warm/Cold scoring
- Source tracking (WhatsApp vs Web)
- One-click status updates

### 📊 Executive Dashboard
- Real-time stats (leads, bookings, messages, conversion)
- Weekly activity bar charts + service distribution pie charts
- AI-powered business insights

### 📋 Additional Features
- **Daily AI Report** — automated business summary
- **WhatsApp Conversation Viewer** — WhatsApp UI in browser
- **Calendar View** — monthly/weekly booking calendar
- **Notification Center** — real-time activity alerts
- **Settings** — business hours and profile management
- **Mobile Responsive** — works on phones and tablets
- **Dark Theme** — premium glass-morphism design

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18+ · **npm** v9+
- **Python** 3.10+ · **pip**

### Backend

```bash
cd backend
pip install -r requirements.txt
set JWT_SECRET=my-dev-secret
uvicorn main:app --reload --port 8000
```

API docs at `http://localhost:8000/docs`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

### Login
- **Email:** `demo@smartbiz.ai`
- **Password:** `demo123`

---

## ☁️ Deployment

### Frontend (Vercel)
- Import `frontend/` or root repo
- Build: `npm run build`
- Output: `dist/`
- Env: `VITE_API_URL` = your backend URL

### Backend (Hugging Face Spaces / Render)
- **Docker** — `Dockerfile` included
- Required env:
  - `JWT_SECRET` — 64-char hex (auto-generated if missing in dev)
- Optional:
  - `DATABASE_URL` — PostgreSQL connection string
  - `CORS_ORIGINS` — comma-separated frontend URLs
  - `ANTHROPIC_API_KEY` — for AI features
  - `WHATSAPP_VERIFY_TOKEN` — Meta webhook verification

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18 + Vite 5 |
| **Styling** | Tailwind CSS 3 + Framer Motion |
| **Charts** | Recharts 2 |
| **Routing** | React Router DOM v6 |
| **Backend** | FastAPI (Python) |
| **Database** | PostgreSQL / SQLite (SQLAlchemy 2) |
| **Auth** | JWT + bcrypt |
| **AI** | Anthropic Claude API |
| **Rate Limiting** | slowapi |
| **Input Sanitization** | strip_html (XSS prevention) |

---

## 🎨 Brand Identity

| Element | Hex |
|---|---|
| **Cosmic Indigo** (Primary) | `#7c3aed` |
| **Electric Blue** (Secondary) | `#6366f1` |
| **Teal Aurora** (Accent) | `#14b8a6` |
| **Deep Obsidian** (Background) | `#050508` |

---

## 📄 License

MIT License

---

<div align="center">
  <p>
    <a href="https://smartbiz-ai-wine.vercel.app">Live Demo</a>
  </p>
</div>
