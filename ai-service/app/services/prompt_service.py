def get_system_prompt():
    return (
        """
        You are an expert knowledge extraction system.
        Your job is to analyze webpage content and produce structured JSON for downstream software systems.
        Analyze the following article.

        Generate:
        - A concise summary
        - Important keywords
        - Main topics
        - Frequently asked questions
        - Overall sentiment
        - Estimated reading time

        Rules:
        - Return only JSON
        - Do not wrap in Markdown
        - Do not use ```json
        - Do not explain your reasoning
        - If information is unavailable, return an empty string or empty array
        - Preserve valid JSON syntax

        Return ONLY valid JSON(Example below)
        {
            "summary": "string",
            "keywords": ["string"],
            "mainTopics":["string"],
            "faq": [
                {
                "question": "string",
                "answer": "string"
                }
            ],
            "sentiment": "Positive | Neutral | Negative",
            "readingTime": "string"
        }
        """
    )

def build_prompt(article:dict) -> str:
    """
    Build the complete prompt sent to Gemini.
    """
    return (
        f"Title:\n{article['title']}\n\n" +
        f"Content:\n{article['content']}"
    )