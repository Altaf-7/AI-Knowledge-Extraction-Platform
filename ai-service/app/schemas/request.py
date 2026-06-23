from pydantic import BaseModel
from pydantic import HttpUrl

class AnalyzeRequest(BaseModel):
    url:HttpUrl