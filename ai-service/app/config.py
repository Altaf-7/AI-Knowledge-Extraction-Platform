from dotenv import load_dotenv
import os

load_dotenv()

API_KEY=os.getenv('GEMINI_API_KEY')

if not API_KEY:
    raise ValueError("GEMINI_API_KEY is not configured.")

PRIMARY_MODEL=os.getenv('PRIMARY_MODEL_NAME')

FALLBACK_MODEL=os.getenv('FALLBACK_MODEL_NAME')

TEMPERATURE=os.getenv('TEMPERATURE')

MAX_OUTPUT_TOKENS=os.getenv('MAX_OUTPUT_TOKENS')