from google import genai
from google.genai.errors import APIError
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
from app.config import API_KEY, PRIMARY_MODEL, FALLBACK_MODEL, TEMPERATURE, MAX_OUTPUT_TOKENS
from app.schemas.response import AnalyzeResponse
import json

client = genai.Client(api_key=API_KEY)

def call_gemini_service(system_prompt, user_prompt, model_name=PRIMARY_MODEL):
    """
    Core function to handle the direct API call. 
    Letting APIError propagate naturally so the retry decorator can see it.
    """
    try:
        response = client.models.generate_content(
            model=model_name,
            contents=user_prompt,

            config=genai.types.GenerateContentConfig(
                system_instruction=system_prompt,
                temperature=TEMPERATURE,
                max_output_tokens=MAX_OUTPUT_TOKENS
            )
        )
        return AnalyzeResponse(
            success=True,
            data=json.loads(response.text),
            message="Gemini JSON Response Available",
            errorCode=None
        )
    
    except APIError as e:
        # This catches actual API issues (Rate limits, Invalid API keys, Blocked content)
        print(f"[{model_name}] Gemini API Error: {e}")
        raise e
        
    except Exception as e:
        # This catches local code issues (like NameErrors, TypeErrors, etc.)
        print(f"Local code or unexpected error: {type(e).__name__} - {e}")
        raise e



# Wait times: 2s, 4s, 8s, 16s... before finally giving up.
# Automatically retries ONLY on Gemini APIErrors (like 503 high demand or 429 rate limit)
@retry(
    reraise=True,
    stop=stop_after_attempt(5),
    wait=wait_exponential(multiplier=1, min=2, max=16),
    retry=retry_if_exception_type(APIError) 
)
def call_gemini_with_retry(system_prompt, user_prompt):
    return call_gemini_service(system_prompt, user_prompt, PRIMARY_MODEL)


def call_gemini(system_prompt, user_prompt):
    """
    Main entry point orchestrating:
    1. Primary Model + Exponential Backoff Retries
    2. Fallback Model (if primary completely exhausts retries)
    """
    try:
        return call_gemini_with_retry(system_prompt,user_prompt)
    except APIError as primary_error:
        print(f"\n[CRITICAL] Primary model exhausted all retries. Falling back to {FALLBACK_MODEL}...")

        try:
            # Attempting fallback model
            return call_gemini_service(system_prompt,user_prompt,FALLBACK_MODEL)
        except Exception as fallback_error:
            return AnalyzeResponse(
                success=False,
                data=None,
                message=str(primary_error + fallback_error),
                errorCode="PRIMARY_MODEL_FAILED + FALLBACK_MODEL_FAILED"
            )