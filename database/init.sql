-- PostgreSQL with pgvector setup
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS history_content (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    source VARCHAR(500),
    language VARCHAR(10),
    embedding vector(384)
);

-- Index for cosine similarity
CREATE INDEX ON history_content USING ivfflat (embedding vector_cosine_ops);
