import os
import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from database import engine, Base, SessionLocal
from models import User
from routers import auth, leads, bookings, messages, ai, whatsapp, stats, business_hours

Base.metadata.create_all(bind=engine)

# Auto-seed demo data on first run
db = SessionLocal()
if db.query(User).count() == 0:
    from seed import seed_demo_data
    seed_demo_data()
db.close()

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="SmartBiz AI API",
    description="Automated Business Assistant Platform",
    version="1.0.0",
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

cors_origins = os.getenv("CORS_ORIGINS", "*")
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"
    return response


app.include_router(auth.router)
app.include_router(leads.router)
app.include_router(bookings.router)
app.include_router(messages.router)
app.include_router(ai.router)
app.include_router(whatsapp.router)
app.include_router(stats.router)
app.include_router(business_hours.router)


@app.get("/api/health")
def health():
    return {"status": "healthy", "version": "1.0.0", "platform": "SmartBiz AI"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
