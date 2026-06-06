<div align="center">
  <br/>
---
title: Smartbiz AI
emoji: 🚀
colorFrom: blue
colorTo: cyberpunk
sdk: gradio
sdk_version: 5.0.0
app_file: app.py
pinned: false
---

  <img src="frontend/public/favicon.svg" alt="SmartBiz AI" width="80"/>
  <h1>SmartBiz AI</h1>
  <p><strong>Turn your WhatsApp into a 24/7 AI sales team.</strong></p>

  <p>
    <a href="#features">Features</a> ·
    <a href="#demo">Live Demo</a> ·
    <a href="#quick-start">Quick Start</a> ·
    <a href="#deployment">Deployment</a> ·
    <a href="#tech-stack">Tech Stack</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/React-18-6366f1?style=flat-square&logo=react" alt="React 18"/>
    <img src="https://img.shields.io/badge/Vite-5-7c3aed?style=flat-square&logo=vite" alt="Vite 5"/>
    <img src="https://img.shields.io/badge/FastAPI-Python-14b8a6?style=flat-square&logo=fastapi" alt="FastAPI"/>
    <img src="https://img.shields.io/badge/Tailwind_CSS-3-6366f1?style=flat-square&logo=tailwindcss" alt="Tailwind CSS"/>
    <img src="https://img.shields.io/badge/SQLite-SQLAlchemy-14b8a6?style=flat-square&logo=sqlite" alt="SQLite"/>
    <img src="https://img.shields.io/badge/JWT-Auth-7c3aed?style=flat-square&logo=jsonwebtokens" alt="JWT"/>
  </p>

  <br/>
</div>

---

## 👋 Overview

**SmartBiz AI** is a production-ready SaaS platform that turns your WhatsApp Business number into an intelligent, automated sales and support system. It handles customer conversations, books appointments, captures and scores leads, and provides real-time business analytics — all from a single, premium dashboard.

> **10-minute setup. No coding. No complexity.**

---

## ✨ Features

### 🤖 AI Sales Assistant
- 24/7 automated customer responses via WhatsApp
- Smart FAQ handling (pricing, services, bookings, hours)
- Lead qualification and scoring (Hot 🔥 / Warm 🟡 / Cold ⚪)
- Natural conversation flow with typing animation

### 💬 WhatsApp Integration
- Connect your WhatsApp Business number in one click
- Full conversation history with search and status tracking
- WhatsApp webhook endpoint for real messaging
- Arabic and English language support

### 📅 Smart Booking Engine
- Customers book directly from WhatsApp
- Double-booking prevention with intelligent slot management
- Configurable business hours (per day of week)
- Automatic confirmation and reminder messages
- Customer feedback and star rating system

### 🎯 Lead Pipeline Management
- Visual pipeline with Hot/Warm/Cold scoring
- Automatic score calculation based on engagement
- Source tracking (WhatsApp vs Web)
- Promote/demote with one click

### 📊 Executive Dashboard
- Real-time stats (leads, bookings, messages, conversion)
- Weekly activity bar charts
- Service distribution pie charts
- AI-powered business insights
- Today's summary with trend indicators

### 📋 Additional Features
- **Daily AI Report** — automated morning email/WhatsApp summary
- **WhatsApp Conversation Viewer** — full WhatsApp UI in the browser
- **Calendar View** — monthly/weekly visual booking calendar
- **Notification Center** — real-time activity alerts with bell icon
- **Customer Reviews** — post-booking rating and feedback collection
- **Mobile Responsive** — fully functional on phones and tablets
- **Dark Theme** — premium glass-morphism design with cosmic indigo branding

---

## 📸 Preview

<div align="center">
  <table>
    <tr>
      <td><b>Landing Page</b></td>
      <td><b>Executive Dashboard</b></td>
    </tr>
    <tr>
      <td><img src="https://via.placeholder.com/400x250/0a0a12/7c3aed?text=Landing+Page" alt="Landing" width="400"/></td>
      <td><img src="https://via.placeholder.com/400x250/0a0a12/14b8a6?text=Dashboard" alt="Dashboard" width="400"/></td>
    </tr>
    <tr>
      <td><b>WhatsApp View</b></td>
      <td><b>Booking Calendar</b></td>
    </tr>
    <tr>
      <td><img src="https://via.placeholder.com/400x250/0a0a12/6366f1?text=WhatsApp" alt="WhatsApp" width="400"/></td>
      <td><img src="https://via.placeholder.com/400x250/0a0a12/14b8a6?text=Calendar" alt="Calendar" width="400"/></td>
    </tr>
  </table>
</div>

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+ · **npm** v9+
- **Python** 3.10+ · **pip**

### 1. Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API docs available at `http://localhost:8000/docs`

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

### 3. Login

Use any email/password — the app works in **demo mode** without a running backend.

---

## ☁️ Deployment

### Frontend (Vercel)

```bash
npm run build
# Deploy the dist/ folder to Vercel
```

### Backend (Render)

```bash
# Render start command:
uvicorn main:app --host 0.0.0.0 --port $PORT
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + Vite 5 |
| **Styling** | Tailwind CSS 3 + Framer Motion 10 |
| **Charts** | Recharts 2 |
| **Icons** | Lucide React |
| **Routing** | React Router DOM v6 |
| **Backend** | FastAPI (Python) |
| **Database** | SQLite via SQLAlchemy 2 |
| **Auth** | JWT (PyJWT + hashlib SHA-256) |
| **Validation** | Pydantic v2 |

---

## 📁 Project Structure

```
smartbiz-ai/
├── backend/
│   ├── main.py                 # FastAPI entry point
│   ├── database.py             # SQLAlchemy config
│   ├── models.py               # Database models
│   ├── schemas.py              # Request/response validation
│   ├── auth.py                 # JWT + password hashing
│   ├── routers/
│   │   ├── auth.py             # Login / Register / Me
│   │   ├── bookings.py         # Booking CRUD + slots
│   │   ├── leads.py            # Lead CRUD
│   │   ├── messages.py         # Message logs
│   │   ├── ai.py               # AI chat endpoint
│   │   ├── whatsapp.py         # WhatsApp webhook
│   │   ├── stats.py            # Dashboard stats
│   │   └── business_hours.py   # Hours config
│   └── utils/
│       ├── ai_assistant.py     # AI response engine
│       └── calendar.py         # Time slot management
├── frontend/
│   ├── src/
│   │   ├── pages/              # All page components
│   │   │   ├── Landing.jsx     # Marketing page
│   │   │   ├── Login.jsx       # Auth page
│   │   │   ├── Dashboard.jsx   # Executive dashboard
│   │   │   ├── WhatsAppViewer.jsx  # WhatsApp UI
│   │   │   ├── Bookings.jsx    # Booking management
│   │   │   ├── Messages.jsx    # Chat inbox
│   │   │   ├── Leads.jsx       # Lead pipeline
│   │   │   └── AIChat.jsx      # AI assistant
│   │   ├── components/         # Reusable components
│   │   ├── context/            # Auth context
│   │   ├── utils/              # API client + mock data
│   │   └── index.css           # Global styles
│   └── vite.config.js          # Vite config
└── README.md
```

---

## 🎨 Brand Identity

| Element | Color | Hex |
|---------|-------|-----|
| **Cosmic Indigo** (Primary) | <span style="color:#7c3aed">■</span> | `#7c3aed` |
| **Electric Blue** (Secondary) | <span style="color:#6366f1">■</span> | `#6366f1` |
| **Teal Aurora** (Accent) | <span style="color:#14b8a6">■</span> | `#14b8a6` |
| **Deep Obsidian** (Background) | <span style="color:#050508">■</span> | `#050508` |

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">
  <p>Built with ❤️ for businesses that want to grow.</p>
  <p>
    <a href="https://smartbiz-ai.vercel.app">🌐 Live Demo</a> ·
    <a href="#features">📋 Features</a> ·
    <a href="#quick-start">🚀 Quick Start</a>
  </p>
</div>
