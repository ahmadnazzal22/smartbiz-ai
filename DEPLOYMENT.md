# 🚀 SmartBiz AI — Deployment Guide

## ✅ Already Configured

### Frontend (Vercel)
- [`vercel.json`](frontend/vercel.json) — SPA rewrites, cache headers, security headers
- `VITE_API_URL` env var — auto-detects local vs production
- Static files: `sitemap.xml`, `robots.txt`, `favicon.svg`, `og-image.svg`

### Backend (Render)
- [`render.yaml`](backend/render.yaml) — Python 3.11, uvicorn on `$PORT`
- `requirements.txt` — all dependencies unpinned for Python 3.14 compat
- CORS `allow_origins=["*"]` — production ready

---

## Step 1: Deploy Backend to Render

1. Go to **https://dashboard.render.com/new/web**
2. Connect GitHub → select `smartbiz-ai`
3. Fill the form:

| Field | Value |
|-------|-------|
| Name | `smartbiz-ai-api` |
| Root Directory | `backend` |
| Runtime | `Python 3` |
| Build Command | `pip install -r requirements.txt` |
| Start Command | `uvicorn main:app --host 0.0.0.0 --port $PORT` |
| Plan | **Free** |

4. Click **Create Web Service**
5. Wait for build & deploy (3-5 min)
6. Copy the URL → looks like `https://smartbiz-ai-api.onrender.com`

---

## Step 2: Deploy Frontend to Vercel

1. Go to **https://vercel.com/new**
2. Import GitHub repo `ahmadnazzal22/smartbiz-ai`
3. Fill the form:

| Field | Value |
|-------|-------|
| Root Directory | `frontend` |
| Framework Preset | **Vite** |
| Build Command | `npm run build` |
| Output Directory | `dist` |

4. Add **Environment Variable**:
   - Name: `VITE_API_URL`
   - Value: `https://smartbiz-ai-api.onrender.com/api` (from Step 1)

5. Click **Deploy**
6. Wait for build (30-60 sec)
7. ✅ Done! Your app is live at `https://smartbiz-ai.vercel.app`

---

## Step 3: Verify

```
# Test frontend
curl https://smartbiz-ai.vercel.app/

# Test backend health
curl https://smartbiz-ai-api.onrender.com/api/health

# Expected: {"status":"healthy","version":"1.0.0","platform":"SmartBiz AI"}
```

---

## Step 4: Custom Domain (Optional)

### Vercel
1. Go to Project → Settings → Domains
2. Add `smartbiz-ai.com`
3. Configure DNS (Vercel provides nameservers)

### Render
1. Go to Dashboard → Your service → Settings → Custom Domain
2. Add `api.smartbiz-ai.com`
3. Add CNAME record in your DNS

---

## Step 5: Production Checklist

- [ ] Frontend deployed and accessible
- [ ] Backend health check returns 200
- [ ] `VITE_API_URL` set correctly on Vercel
- [ ] Login works end-to-end
- [ ] Mock data loads when backend is available
- [ ] sitemap.xml accessible at `/sitemap.xml`
- [ ] robots.txt accessible at `/robots.txt`
- [ ] OG image renders at `/og-image.svg`
- [ ] Custom domain configured (optional)

---

## File Structure for Deployment

```
smartbiz-ai/
├── frontend/          → Vercel root
│   ├── public/
│   │   ├── sitemap.xml
│   │   ├── robots.txt
│   │   ├── favicon.svg
│   │   └── og-image.svg
│   ├── vercel.json
│   └── ... (Vite app)
├── backend/           → Render root
│   ├── render.yaml
│   ├── requirements.txt
│   └── main.py
└── README.md
```
