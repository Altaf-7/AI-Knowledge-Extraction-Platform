from fastapi import FastAPI
# from fastapi import HTTPException
from pydantic import BaseModel
from scraper import fetch_website_content

app = FastAPI(
    title="AI Knowledge Extractor Scraper Service",
    version="1.0.0"
)

class URLRequest(BaseModel):
    url:str

@app.post("/analyze")
def scrape_website(data:URLRequest):
    result = fetch_website_content(data.url)
    return result