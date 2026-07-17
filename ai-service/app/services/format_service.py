from app.schemas.response import AnalyzeResponse, AnalysisResult

def format_response(raw_data):
    if(raw_data["success"]):
        return AnalyzeResponse(
            success=True,
            data=AnalysisResult(**(raw_data["data"])),
            message=raw_data["message"],
            errorCode=None,
            status=200
        )
    else:
        return AnalyzeResponse(
            success=False,
            data=None,
            message=raw_data["message"],
            errorCode=raw_data["errorCode"],
            status=500
        )