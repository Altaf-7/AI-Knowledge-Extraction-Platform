from typing import List, Optional, Literal
from pydantic import BaseModel


class FAQItem(BaseModel):
    question: str
    answer: str


class AnalysisResult(BaseModel):
    title: str
    summary: str
    keywords: List[str]
    mainTopics: List[str]
    faq: List[FAQItem]
    sentiment: Literal["Positive", "Neutral", "Negative"]
    readingTime: str


class AnalyzeResponse(BaseModel):
    success: bool
    data: Optional[AnalysisResult] = None
    message: str
    errorCode: Optional[str] = None
    status: int