# RAG Architecture for HISTORIA AI

## Overview
Retrieval-Augmented Generation (RAG) enhances HISTORIA AI's responses by retrieving relevant historical context from a knowledge base before generating answers. This architecture ensures accuracy, verifiability, and up-to-date information while maintaining privacy and ethical standards.

## Ingestion Pipeline

### Data Sources
- **Web Scraping**: Automated scraping of reputable historical sites (e.g., Britannica, UNESCO, academic journals) using tools like Scrapy or BeautifulSoup. Focus on pages with clear licensing (CC-BY-SA).
- **Trusted Feeds**: RSS/Atom feeds from verified sources (e.g., JSTOR, African Studies Association) and partnerships with museums/libraries.
- **Community Contributions**: Verified stories from the community submissions pipeline.

### Processing Steps
1. **Crawling**: Scheduled crawlers run daily, respecting robots.txt and rate limits.
2. **Cleaning**: Remove HTML, extract text, normalize encoding, deduplicate content.
3. **Chunking**: Split documents into 500-1000 token chunks for embedding.
4. **Metadata Tagging**: Add tags for era, region, source credibility, and verification status.
5. **Storage**: Raw data stored in a data lake (e.g., S3), processed chunks in vector DB.

## Embedding Pipeline

### Embedding Models
- **Primary**: OpenAI Ada-002 for high-quality embeddings (1024 dimensions).
- **Fallback**: Cohere Embed for multilingual support or open-source models like Sentence Transformers (e.g., all-MiniLM-L6-v2) for cost efficiency.
- **Multilingual**: Use language-specific models for African languages (e.g., Afro-XLMR).

### Pipeline Flow
1. **Input**: Text chunks from ingestion.
2. **Embedding Generation**: Batch process via API calls, with retry logic.
3. **Dimensionality Reduction**: Optional PCA for storage optimization.
4. **Indexing**: Embeddings stored with metadata in vector DB.

## Vector Database

### Choice: Pinecone
- **Why Pinecone**: Managed service with high performance, scalability, and filtering capabilities. Supports metadata filtering for recency/region.
- **Alternative**: Chroma for self-hosted, open-source option.
- **Configuration**: Index with cosine similarity, namespaces for different content types (e.g., "verified", "community").

### Schema
- **Vector**: 1024-dimensional float array.
- **Metadata**: {source: string, date: ISO string, region: string, verified: boolean, score: float}.
- **Partitioning**: By era (e.g., "pre-colonial", "colonial") for efficient querying.

## Retrieval Policy

### Query Processing
1. **User Query**: Processed through embedding model to get query vector.
2. **Similarity Search**: Top-k (k=5-10) most similar vectors retrieved.
3. **Recency Boost**: Boost score for documents <5 years old by 20%.
4. **Filtering**: Prioritize verified sources; exclude low-trust content.
5. **Re-ranking**: Use cross-encoder (e.g., Sentence Transformers) for final ranking.

### Response Generation
- Retrieved context injected into LLM prompt (e.g., GPT-4) with instructions to cite sources.
- Fallback: If no relevant context, use base knowledge with disclaimer.

## Feedback Loop

### User Ratings
- **Mechanism**: After each response, users rate relevance/accuracy (1-5 stars) and provide feedback.
- **Data Collection**: Store ratings linked to query, retrieved docs, and response.

### Promote/Demote Logic
- **Promotion**: High ratings (>4) increase document score in DB, making it more retrievable.
- **Demotion**: Low ratings (<3) decrease score or flag for review.
- **Algorithm**: Weekly batch update using reinforcement learning (e.g., Elo rating system) to adjust vector weights.

## LLM Retraining/Fine-tuning

### When to Retrain
- **Trigger Events**: Monthly performance drops (>5% accuracy decline), new major historical discoveries, or accumulation of 10k+ verified community stories.
- **Datasets**: Curated from verified sources + top-rated community submissions.
- **Process**:
  1. **Data Preparation**: Fine-tune dataset with Q&A pairs from retrieved context.
  2. **Fine-tuning**: Use LoRA on GPT-4 base model for 1-2 epochs.
  3. **Evaluation**: Test on held-out set; A/B test in production.
  4. **Deployment**: Gradual rollout with rollback capability.

### Community-Verified Stories
- **Integration**: After moderation, embed and add to vector DB with "verified" flag.
- **Fine-tuning**: Include in retraining datasets to personalize for African history.

## Privacy and Retention

### GDPR-like Rules
- **Data Minimization**: Only store necessary metadata; anonymize user data.
- **Consent**: Explicit consent for feedback loop participation.
- **Right to Deletion**: Users can request removal of their contributions/ratings.
- **Retention**: Embeddings retained indefinitely (no PII), raw documents for 7 years, user data for 2 years.
- **Encryption**: All data encrypted at rest and in transit.

### Privacy Safeguards
- **Anonymization**: User IDs hashed; no personal data in embeddings.
- **Audit Logs**: Track access to sensitive data.
- **Compliance**: Regular audits for data protection regulations.

## Update Schedule

### Daily Updates
- Ingestion: Crawl new content, process, and embed.
- Feedback Processing: Update vector scores based on ratings.

### Weekly Updates
- Re-index: Full rebuild of vector DB with promoted/demoted docs.
- Moderation Review: Human check of flagged content.

### Monthly Updates
- Retraining Evaluation: Assess if fine-tuning needed.
- Performance Metrics: Update dashboards on retrieval accuracy.

## Sample Ingestion Script Outline

```python
import requests
from bs4 import BeautifulSoup
from sentence_transformers import SentenceTransformer
import pinecone

# Initialize
embedder = SentenceTransformer('all-MiniLM-L6-v2')
pinecone.init(api_key='your-key', environment='us-west1-gcp')
index = pinecone.Index('historia-knowledge')

def scrape_source(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    text = soup.get_text()
    chunks = [text[i:i+500] for i in range(0, len(text), 500)]
    return chunks

def process_and_embed(url, metadata):
    chunks = scrape_source(url)
    embeddings = embedder.encode(chunks)
    vectors = [
        {
            'id': f'{url}-{i}',
            'values': emb.tolist(),
            'metadata': {**metadata, 'chunk': i}
        }
        for i, emb in enumerate(embeddings)
    ]
    index.upsert(vectors)

# Example usage
process_and_embed(
    'https://example.com/history-article',
    {'source': 'reputable-site', 'date': '2023-10-01', 'verified': True}
)
```

## Acceptance Criteria
- Retrieval returns verified context with >90% accuracy on test queries.
- Clear update cadence ensures knowledge base stays current without manual intervention.
- Privacy rules prevent unauthorized data access and comply with data protection standards.
