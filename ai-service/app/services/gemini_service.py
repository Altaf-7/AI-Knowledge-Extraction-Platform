from google import genai
from google.genai.errors import APIError
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
from app.config import API_KEY, PRIMARY_MODEL, FALLBACK_MODEL, TEMPERATURE, MAX_OUTPUT_TOKENS
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
                max_output_tokens=MAX_OUTPUT_TOKENS,
                response_mime_type="application/json"
            )
        )
        return dict(
            success=True,
            data=json.loads(response.text),
            message="Gemini JSON Response Available",
            errorCode=None
        )
    
    except APIError as e:
        print(f"[{model_name}] Gemini API Error: {e}")
        raise e
        
    except Exception as e:
        print(f"Local code or unexpected error: {type(e).__name__} - {e}")
        status_code = getattr(getattr(e, 'response', None), 'status_code', 500)
        return dict(
                success=False,
                data=None,
                message=str(e),
                errorCode=status_code
            )



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
        try:
            # Attempting fallback model
            return call_gemini_service(system_prompt,user_prompt,FALLBACK_MODEL)
        except Exception as fallback_error:
            status_code = getattr(fallback_error, 'code', 500)
            return dict(
                success=False,
                data=None,
                message= f"Primary model exhausted all retries. Fallback failed: {fallback_error}",
                errorCode=status_code
            )