from app.schemas.response import AnalyzeResponse, AnalysisResult

def format_analysis_response(raw_data):
    if(raw_data["success"]):
        return AnalyzeResponse(
            success=True,
            data=AnalysisResult(**(raw_data["response"])),
            message="Gemini JSON Response Available",
            errorCode=None,
            status=200
        )
    else:
        return AnalyzeResponse(
            success=False,
            data=None,
            message="Primary model failed. Fallback model also failed.",
            errorCode=raw_data.response,
            status=500
        )