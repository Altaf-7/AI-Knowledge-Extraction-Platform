from bs4 import BeautifulSoup
import requests

headers = {"User-Agent":"Mozilla/5.0"}

def fetch_website_content(url:str):
    """
    Returns the json file containing title and content
    """
    
    response = requests.get(url,headers=headers,timeout=10)

    soup = BeautifulSoup(response.text,'html.parser')

    title = soup.title.string if soup.title else "No title found"

    if soup.body:
        for irrelevant in soup.body(["script", "style", "img", "input"]):
            irrelevant.decompose()
        text = soup.body.get_text(separator="\n", strip=True)
    else:
        text = ""

    return {
        "title":title,
        "content":text[:2_000]
    }