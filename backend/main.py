import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import auth, leads, bookings, messages, ai, whatsapp, stats, business_hours

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SmartBiz AI API",
    description="Automated Business Assistant Platform",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
