from dotenv import load_dotenv
import os

load_dotenv()

API_KEY=os.getenv('GEMINI_API_KEY')

if not API_KEY:
    raise ValueError("GEMINI_API_KEY is not configured.")

MODEL_NAME="gemini-2.5-flash"

TEMPERATURE=0.2

MAX_OUTPUT_TOKENS=2048