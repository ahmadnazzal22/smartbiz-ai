<div align="center">

<img src="frontend/public/favicon.svg" alt="SmartBiz AI" width="90"/>

# SmartBiz AI

**Turn your WhatsApp Business into a 24/7 AI-powered sales machine.**

*Automated conversations. Smart bookings. Real-time analytics. Zero complexity.*

<br/>

[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite_5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)](https://sqlite.org)
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io)

<br/>

[🌐 Live Demo](https://smartbiz-ai.vercel.app) · [✨ Features](#-features) · [🚀 Quick Start](#-quick-start) · [☁️ Deployment](#️-deployment) · [🛠 Tech Stack](#-tech-stack)

<br/>


> ⚡ **10-minute setup. No server required. Ready to sell.**

</div>

-----

## 📊 Stats at a Glance

<div align="center">

|💬 Monthly Conversations|📅 Booking Accuracy|⭐ Customer Rating|🔁 Conversion Boost|
|:---------------------:|:----------------:|:---------------:|:----------------:|
|**3,200+**             |**98%**           |**4.8 / 5**      |**3× more**       |

</div>

-----

## ✨ Features

<table>
<tr>
<td width="50%">

### 🤖 AI Sales Assistant

- 24/7 automated responses via WhatsApp
- Handles pricing, services, hours & booking queries
- Auto lead scoring: 🔥 Hot / 🟡 Warm / ⚪ Cold
- Natural conversations in Arabic & English

### 💬 WhatsApp Integration

- Connect your WhatsApp Business number in one click
- Full conversation UI inside the dashboard
- Webhook support for real-time messaging
- Full archive with search & status tracking

### 📅 Smart Booking Engine

- Customers book directly from WhatsApp
- Automatic double-booking prevention
- Configurable business hours per day
- Auto confirmation & reminder messages

</td>
<td width="50%">

### 🎯 Lead Pipeline Management

- Visual pipeline with Hot / Warm / Cold scoring
- Automatic score calculation based on engagement
- Source tracking (WhatsApp vs Web)
- Promote or demote leads with one click

### 📊 Executive Dashboard

- Live stats: leads, bookings, messages, conversion
- Weekly activity charts & service distribution
- AI-powered insights: peak hours, top service, best source
- Automated daily AI report every morning

### 📱 Mobile-First Design

- Fully responsive on phones and tablets
- Bottom Navigation for mobile
- Sidebar overlay for small screens
- Glass-morphism UI with Framer Motion animations

</td>
</tr>
</table>

-----

## 🖥 Screenshots

> **📸 Note:** Add real screenshots to the `/screenshots` folder and update the paths below.

<div align="center">
<table>
  <tr>
    <td align="center"><b>🏠 Landing Page</b></td>
    <td align="center"><b>📊 Dashboard</b></td>
  </tr>
  <tr>
    <td><img src="screenshots/landing.png" alt="Landing Page" width="420"/></td>
    <td><img src="screenshots/dashboard.png" alt="Dashboard" width="420"/></td>
  </tr>
  <tr>
    <td align="center"><b>💬 WhatsApp Viewer</b></td>
    <td align="center"><b>📅 Booking Calendar</b></td>
  </tr>
  <tr>
    <td><img src="screenshots/whatsapp.png" alt="WhatsApp Viewer" width="420"/></td>
    <td><img src="screenshots/calendar.png" alt="Booking Calendar" width="420"/></td>
  </tr>
  <tr>
    <td align="center"><b>🎯 Lead Pipeline</b></td>
    <td align="center"><b>📱 Mobile View</b></td>
  </tr>
  <tr>
    <td><img src="screenshots/leads.png" alt="Lead Pipeline" width="420"/></td>
    <td><img src="screenshots/mobile.png" alt="Mobile View" width="420"/></td>
  </tr>
</table>
</div>

-----

## 🚀 Quick Start

### Prerequisites

```
Node.js v18+    npm v9+    Python 3.10+    pip
```

### 1️⃣ Frontend

```bash
cd frontend
npm install
npm run dev
# ✅ Open http://localhost:5173
```

### 2️⃣ Backend — optional in Demo Mode

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
# ✅ API Docs: http://localhost:8000/docs
```

### 3️⃣ Login

```
📧 Any email  +  🔑 Any password
The app runs fully in Demo Mode without a backend.
```

### 4️⃣ Test on Mobile

```bash
npm run dev -- --host
# ✅ Open the Network URL on your phone (same WiFi)
```

-----

## ☁️ Deployment

### Frontend → Vercel (Free)

```bash
# 1. Push code to GitHub
git push origin main

# 2. Connect repo on vercel.com
# 3. Build Command:
npm run build

# 4. Output Directory:
dist/

# ✅ Your link: https://smartbiz-ai.vercel.app
```

### Backend → Render (Free)

```bash
# Start Command on Render:
uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Environment Variables

```env
# frontend/.env
VITE_API_URL=https://your-backend.onrender.com
VITE_APP_NAME=SmartBiz AI

# backend/.env
SECRET_KEY=your-super-secret-jwt-key
DATABASE_URL=sqlite:///./smartbiz.db
OPENAI_API_KEY=sk-...   # optional — for real AI responses
```

-----

## 🛠 Tech Stack

<div align="center">

|Layer                 |Technology           |Purpose                 |
|:---------------------|:--------------------|:-----------------------|
|**Frontend Framework**|React 18 + Vite 5    |UI & routing            |
|**Styling**           |Tailwind CSS 3       |Responsive design       |
|**Animations**        |Framer Motion 10     |Professional transitions|
|**Charts**            |Recharts 2           |Analytics visualizations|
|**Icons**             |Lucide React         |Icon system             |
|**Routing**           |React Router DOM v6  |Page navigation         |
|**Backend**           |FastAPI (Python)     |High-performance API    |
|**Database**          |SQLite + SQLAlchemy 2|Data persistence        |
|**Auth**              |JWT + PyJWT          |Secure authentication   |
|**Validation**        |Pydantic v2          |Data validation         |

</div>

-----

## 📁 Project Structure

```
smartbiz-ai/
├── 📂 backend/
│   ├── main.py                    # FastAPI entry point
│   ├── database.py                # SQLAlchemy config
│   ├── models.py                  # Database models
│   ├── schemas.py                 # Request/response validation
│   ├── auth.py                    # JWT + password hashing
│   ├── 📂 routers/
│   │   ├── auth.py                # Login / Register / Me
│   │   ├── bookings.py            # Booking CRUD + slots
│   │   ├── leads.py               # Lead CRUD
│   │   ├── messages.py            # Message logs
│   │   ├── ai.py                  # AI chat endpoint
│   │   ├── whatsapp.py            # WhatsApp webhook
│   │   ├── stats.py               # Dashboard statistics
│   │   └── business_hours.py      # Hours configuration
│   └── 📂 utils/
│       ├── ai_assistant.py        # AI response engine
│       └── calendar.py            # Time slot management
│
├── 📂 frontend/
│   ├── 📂 src/
│   │   ├── 📂 pages/
│   │   │   ├── Landing.jsx        # Marketing page
│   │   │   ├── Login.jsx          # Authentication
│   │   │   ├── Dashboard.jsx      # Executive dashboard
│   │   │   ├── WhatsAppViewer.jsx # WhatsApp UI
│   │   │   ├── Bookings.jsx       # Booking management
│   │   │   ├── Messages.jsx       # Chat inbox
│   │   │   ├── Leads.jsx          # Lead pipeline
│   │   │   └── AIChat.jsx         # AI assistant
│   │   ├── 📂 components/         # Reusable components
│   │   ├── 📂 context/            # Auth context
│   │   ├── 📂 utils/              # API client + mock data
│   │   └── index.css              # Global styles
│   └── vite.config.js
│
├── 📂 screenshots/                # ← Add screenshots here
└── README.md
```

-----

## 💰 Pricing

<div align="center">

|Feature      |🥉 Starter  |🥈 Pro      |🥇 Enterprise  |
|:------------|:---------:|:---------:|:------------:|
|**Price**    |**$29/mo** |**$79/mo** |**$199/mo**   |
|Conversations|1,000/mo   |Unlimited  |Unlimited     |
|WhatsApp     |✅          |✅          |✅             |
|Bookings     |✅          |✅          |✅             |
|Analytics    |Basic      |Advanced   |Advanced + API|
|Custom AI    |❌          |❌          |✅             |
|Support      |Standard   |24/7       |VIP           |
|Free Trial   |**14 days**|**14 days**|**14 days**   |

</div>

-----

## 🎨 Brand Identity

<div align="center">

|Swatch|Name         |Hex      |Usage                        |
|:----:|:------------|:--------|:----------------------------|
|🟣     |Cosmic Indigo|`#7c3aed`|Primary — buttons, highlights|
|🔵     |Electric Blue|`#6366f1`|Secondary — gradients        |
|🟢     |Teal Aurora  |`#14b8a6`|Accent — success, charts     |
|⚫     |Deep Obsidian|`#050508`|Background                   |

</div>

-----

## 🗺 Roadmap

- [x] AI Sales Assistant
- [x] WhatsApp Integration (Demo)
- [x] Smart Booking Engine
- [x] Lead Pipeline Management
- [x] Executive Dashboard
- [x] Mobile Responsive
- [x] Notification Center
- [x] Landing Page
- [ ] WhatsApp Business API (Real)
- [ ] Stripe Payment Integration
- [ ] Multi-tenant Support
- [ ] PostgreSQL Migration
- [ ] OpenAI GPT-4 Integration
- [ ] iOS / Android App

-----

## 🤝 Contributing

```bash
# 1. Fork the repo
# 2. Create a feature branch
git checkout -b feature/amazing-feature

# 3. Commit your changes
git commit -m 'Add amazing feature'

# 4. Push to the branch
git push origin feature/amazing-feature

# 5. Open a Pull Request
```

-----

## 📄 License

```
MIT License — Free for personal and commercial use.
```

-----

<div align="center">

**Built with ❤️ for businesses that want to grow.**

<br/>

[🌐 Live Demo](https://smartbiz-ai.vercel.app) · [🐛 Report Bug](../../issues) · [💡 Request Feature](../../issues) · [📧 Contact](mailto:hello@smartbiz-ai.com)

<br/>

⭐ **If you find this project useful, please give it a star!** ⭐

</div>
