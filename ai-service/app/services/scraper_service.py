from bs4 import BeautifulSoup
import requests
from app.config import HEADERS , MAX_CONTENT_LENGTH, REQUEST_TIMEOUT

def fetch_website_content(url:str):
    """
    Returns the json file containing title and content
    """
    try:
        response = requests.get(url,headers=HEADERS,timeout=REQUEST_TIMEOUT)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
            return dict(
                success=False,
                data=None,
                message=str(e),
                errorCode=500
            )


    soup = BeautifulSoup(response.text,'html.parser')

    title = soup.title.string if soup.title else "No title found"

    REMOVE_TAGS = ["script", "style", "img", "input", "header", "footer", "nav", "aside", "noscript", "svg", "iframe", "button", "form", "canvas", "video", "audio", "picture","figure", "source"]

    if soup.body:
        for irrelevant in soup.body(REMOVE_TAGS):
            irrelevant.decompose()
        text = soup.body.get_text(separator="\n", strip=True)
    else:
        return dict(
                success=False,
                data=None,
                message="Unable to process content of website",
                errorCode=500
            )

    return dict(
        success=True,
        data= dict(
                title=title,
                content=text[:MAX_CONTENT_LENGTH]
            ),
        message=None,
        errorCode=None
    )

if __name__ == "__main__":
    print(fetch_website_content("https://www.example.com"))