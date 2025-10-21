import requests
from bs4 import BeautifulSoup
import time
from sqlalchemy.orm import sessionmaker
from backend.main import HistoryContent, SessionLocal, model

def scrape_history_data():
    # Example sources: Britannica, JSTOR, etc. (simplified)
    sources = [
        "https://www.britannica.com/place/Kenya",
        "https://en.wikipedia.org/wiki/History_of_Kenya",
        # Add more
    ]
    session = SessionLocal()
    for url in sources:
        try:
            response = requests.get(url)
            soup = BeautifulSoup(response.text, 'html.parser')
            title = soup.find('title').text if soup.find('title') else "Unknown"
            content = soup.get_text()[:5000]  # Limit content
            embedding = model.encode(content)
            new_content = HistoryContent(
                title=title,
                content=content,
                source=url,
                language="en",
                embedding=embedding.tolist()
            )
            session.add(new_content)
            session.commit()
        except Exception as e:
            print(f"Error scraping {url}: {e}")
        time.sleep(1)  # Respectful scraping
    session.close()

if __name__ == "__main__":
    scrape_history_data()
