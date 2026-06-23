from google import genai
from app.config import API_KEY, MODEL_NAME, TEMPERATURE, MAX_OUTPUT_TOKENS

client = genai.Client(api_key=API_KEY)

def call_gemini(system_prompt,user_prompt):
    try:
        respone = client.models.generate_content(
            model=MODEL_NAME,
            contents=user_prompt,

            config=genai.types.GenerateContentConfig(
                system_instruction=system_prompt,
                temperature=TEMPERATURE,
                max_output_tokens=MAX_OUTPUT_TOKENS,
            )
        )
    except Exception:
        raise ConnectionError("Gemini Calling Error")

    return respone.text