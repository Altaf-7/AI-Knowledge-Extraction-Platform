from fastapi import APIRouter
from app.schemas.request import AnalyzeRequest
from app.services import analysis_service
from app.schemas.response import AnalyzeResponse

router = APIRouter(
    prefix="/api",
    tags=["Analysis"]
)

@router.post("/analyze",response_model=AnalyzeResponse)
def analyze_article(data:AnalyzeRequest):
    return analysis_service.analyze(data.url)