import json

def parse_gemini_response(raw_response):
    parsed_response = json.loads(raw_response)
    return parsed_response