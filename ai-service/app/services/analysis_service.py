from app.services.scraper_service import fetch_website_content
from app.services.prompt_service import get_system_prompt, build_prompt
from app.services.gemini_service import call_gemini
from app.services.parser_service import parse_gemini_response

def analyze(url):
    """
    Orchestrates the complete AI analysis pipeline.

    Steps:
    1. Scrape webpage
    2. Clean content
    3. Build AI prompt
    4. Call Gemini
    5. Parse response
    6. Return structured result
    """
   
    article = fetch_website_content(url)
  
    system_prompt = get_system_prompt()

    user_prompt = build_prompt(article)

    raw_gemini_response = call_gemini(system_prompt,user_prompt)

    parsed_response = parse_gemini_response(raw_gemini_response)
    
    return parsed_response

