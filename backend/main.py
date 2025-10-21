from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os
from sentence_transformers import SentenceTransformer
import weaviate
from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import pgvector.sqlalchemy
from scrapers.scraper import scrape_history_data
from models.learner import continuous_learn

app = FastAPI(title="HISTORIA AI", description="AI-powered history companion for Kenya & Africa")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/historia")
engine = create_engine(DATABASE_URL)
Base = declarative_base()

class HistoryContent(Base):
    __tablename__ = "history_content"
    id = Column(Integer, primary_key=True)
    title = Column(String)
    content = Column(Text)
    source = Column(String)
    language = Column(String)
    embedding = Column(pgvector.sqlalchemy.Vector(384))  # For sentence transformers

Base.metadata.create_all(bind=engine)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# AI setup
openai.api_key = os.getenv("OPENAI_API_KEY")
if not openai.api_key:
    print("Warning: OPENAI_API_KEY not set. Chat functionality will not work.")
model = SentenceTransformer('all-MiniLM-L6-v2')
weaviate_client = weaviate.Client("http://localhost:8080")

# Models
class ChatRequest(BaseModel):
    message: str
    language: str = "en"

class SearchRequest(BaseModel):
    query: str
    language: str = "en"

@app.on_event("startup")
async def startup_event():
    # Initial scrape and learn
    scrape_history_data()
    continuous_learn()

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        # Translate to English if needed (simplified)
        query = request.message
        if request.language != "en":
            # Use Google Translate API or similar
            pass  # Placeholder

        # Generate response with GPT-4
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are HISTORIA AI, an expert on Kenyan and African history. Provide accurate, engaging responses."},
                {"role": "user", "content": query}
            ]
        )
        answer = response.choices[0].message.content

        # Translate back if needed
        if request.language != "en":
            pass  # Placeholder

        return {"response": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/search")
async def search(request: SearchRequest):
    try:
        # Semantic search
        query_embedding = model.encode(request.query)
        session = SessionLocal()
        results = session.query(HistoryContent).order_by(HistoryContent.embedding.cosine_distance(query_embedding)).limit(10).all()
        session.close()
        return {"results": [{"title": r.title, "content": r.content, "source": r.source} for r in results]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ingest")
async def ingest_data():
    scrape_history_data()
    continuous_learn()
    return {"message": "Data ingested and model updated"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
