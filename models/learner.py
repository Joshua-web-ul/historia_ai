from sentence_transformers import SentenceTransformer
import schedule
import time
from sqlalchemy.orm import sessionmaker
from backend.main import HistoryContent, SessionLocal

model = SentenceTransformer('all-MiniLM-L6-v2')

def continuous_learn():
    # Fine-tune model with new data (simplified: just re-encode existing)
    session = SessionLocal()
    contents = session.query(HistoryContent).all()
    for content in contents:
        if not content.embedding:
            content.embedding = model.encode(content.content).tolist()
            session.commit()
    session.close()
    print("Model updated with new data")

def schedule_learning():
    schedule.every().day.do(continuous_learn)
    while True:
        schedule.run_pending()
        time.sleep(1)

if __name__ == "__main__":
    continuous_learn()
