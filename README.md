# HISTORIA AI: Kenya & Africa's Living History Companion

## Overview
HISTORIA AI is an innovative digital platform that serves as an interactive, AI-powered companion for exploring and preserving the rich historical and cultural heritage of Kenya and the broader African continent. It combines cutting-edge technology with historical scholarship to create an engaging, educational experience.

## Features
- AI-Powered Chat Interface for Q&A about African history
- Multilingual Support (50 Kenyan languages + top African languages)
- Interactive Timelines and Virtual Tours
- Community Engagement and Crowdsourced Content
- Web Scraping for Continuous Learning from Online Sources
- AR/VR Experiences and Gamification
- Cultural Preservation Tools

## Tech Stack
- Backend: FastAPI (Python), PostgreSQL with pgvector, Weaviate
- Frontend: React with TypeScript, Tailwind CSS
- AI/ML: OpenAI GPT-4, Sentence Transformers, Whisper, Coqui TTS
- DevOps: Docker, Kubernetes

## Getting Started
1. Clone the repo
2. Set up backend: `cd backend && pip install -r requirements.txt`
3. Set up frontend: `cd frontend && npm install`
4. Run database: `docker run -d -p 5432:5432 postgres`
5. Start backend: `uvicorn main:app --reload`
6. Start frontend: `npm start`

## License
MIT
