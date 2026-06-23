from fastapi import FastAPI
from app.schemas.request import AnalyzeRequest
from app.services import analysis_service

app = FastAPI(
    title="AI Knowledge Extractor Scraper Service",
    version="1.0.0"
)

@app.post("/analyze")
def analyze_article(data:AnalyzeRequest):
    return analysis_service.analyze(data.url)