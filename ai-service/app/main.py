from fastapi import FastAPI
from app.routers import analysis

app = FastAPI(
    title="AI Knowledge Extractor Scraper Service",
    version="1.0.0"
)

app.include_router(analysis.router)

@app.get("/")
def root():
    return {
        "service": "AI Knowledge Extractor",
        "status": "Running"
    }