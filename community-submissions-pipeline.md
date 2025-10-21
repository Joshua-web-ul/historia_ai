# Community Submissions Pipeline for HISTORIA AI

## Overview
The community submissions pipeline allows users to contribute historical stories, audio recordings, and documents to enrich the HISTORIA AI platform. It includes a user-friendly frontend form, secure backend processing, AI-powered moderation, human review, and contributor notifications.

## Frontend Form Design

### Form Components
- **Title Field**: Text input (max 100 chars) for story title.
- **Location Field**: Autocomplete dropdown using Google Places API or custom location selector.
- **Audio/File Upload**: Drag-and-drop area supporting MP3, WAV, PDF, DOCX (max 50MB).
- **Transcript Field**: Optional text area for manual transcript or auto-generated from audio.
- **Consent Checkbox**: "I consent to my submission being used in HISTORIA AI and shared publicly."
- **Autosave**: Automatic draft saving every 30 seconds.
- **Progress Indicator**: Upload progress bar and status messages.

### Form Validation
- Required fields: Title, Location, Consent.
- File type/size validation with user-friendly error messages.
- Real-time validation feedback.

## Backend Endpoints

### API Endpoints
- **POST /api/submissions/upload**: Multipart upload for files.
  - Request: FormData with file, metadata.
  - Response: Upload ID and status.
- **POST /api/submissions/autosave**: Save draft data.
  - Request: JSON with form data.
  - Response: Draft ID.
- **POST /api/submissions/submit**: Final submission.
  - Request: JSON with complete form data.
  - Response: Submission ID and status.
- **GET /api/submissions/status/:id**: Check submission status.
  - Response: Status object (draft, submitted, verified, rejected).

### Security
- All data encrypted in transit (HTTPS) and at rest (AES-256).
- File storage: Cloud storage (AWS S3) with access controls.
- Rate limiting: 5 submissions per user per day.

## AI-Based Moderation

### Moderation Process
1. **Toxicity Check**: Use Perspective API to detect hate speech, violence, etc.
2. **Content Analysis**: Custom ML model for historical accuracy and relevance.
3. **Automated Flags**: Score submissions (0-1); auto-reject if >0.8 toxicity.
4. **Human Queue**: Submissions with 0.3-0.8 score go to moderator review.

### Moderation Rules
- **Reject Criteria**: Hate speech, misinformation, copyright infringement, explicit content.
- **Approve Criteria**: Accurate historical content, respectful tone, verifiable sources.
- **Flag for Review**: Ambiguous content, potential bias, or low confidence scores.
- **Escalation**: Repeated violators banned; appeals process available.

## Database Schema

### Stories Table
```sql
CREATE TABLE stories (
  id UUID PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  location JSONB, -- {lat, lng, name}
  transcript TEXT,
  file_url VARCHAR(500),
  file_type VARCHAR(10), -- audio, document
  status ENUM('draft', 'submitted', 'verified', 'rejected') DEFAULT 'draft',
  contributor_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  moderated_at TIMESTAMP,
  moderator_notes TEXT,
  embedding VECTOR(1536), -- For semantic search
  consent_given BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_stories_status ON stories(status);
CREATE INDEX idx_stories_contributor ON stories(contributor_id);
CREATE INDEX idx_stories_location ON stories USING GIST(location);
```

### Contributors Table
```sql
CREATE TABLE contributors (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  name VARCHAR(100),
  location VARCHAR(100),
  submission_count INT DEFAULT 0,
  trust_score DECIMAL(3,2) DEFAULT 0.5, -- 0-1 scale
  banned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Sample API Responses

### Upload Endpoint
```json
POST /api/submissions/upload
{
  "upload_id": "uuid-123",
  "status": "success",
  "file_url": "https://storage.historia.ai/uploads/uuid-123.mp3"
}
```

### Submission Status
```json
GET /api/submissions/status/uuid-123
{
  "status": "verified",
  "message": "Your story has been approved and is now live!",
  "moderator_feedback": "Great addition to our collection."
}
```

## Email Templates

### Approval Notification
```
Subject: Your HISTORIA AI Story is Live!

Dear [Contributor Name],

Thank you for contributing "[Story Title]" to HISTORIA AI! After review, we're excited to share your story with our community.

View it here: [Story URL]

Keep sharing history!
The HISTORIA AI Team
```

### Rejection Notification
```
Subject: Update on Your HISTORIA AI Submission

Dear [Contributor Name],

We reviewed "[Story Title]" but couldn't approve it at this time due to [reason: e.g., content guidelines].

Please revise and resubmit, or contact us for feedback.

Best,
The HISTORIA AI Team
```

### Moderation Queue Alert (Internal)
```
Subject: New Submission Requires Review

Submission ID: [ID]
Title: [Title]
Contributor: [Name]
Toxicity Score: [Score]

Review here: [Admin URL]
```

## Acceptance Criteria
- Submissions are encrypted in transit (TLS 1.3) and at rest (AES-256 encryption).
- AI moderation prevents harmful content with >95% accuracy on test data.
- Contributors receive email notifications within 24 hours of status changes.
- Pipeline handles 1000+ submissions/day without performance degradation.
