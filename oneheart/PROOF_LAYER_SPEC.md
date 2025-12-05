# Proof Layer — Technical Specification

**Purpose**: Immutable record of actions + verifiable evidence = foundation of OneHeart Impact Economy

---

## Overview

The Proof Layer handles:

1. **Proof Submission**: User submits action + evidence (photo/video/GPS/sensor)
2. **Verification**: AI + Community verify proof is legitimate
3. **Recording**: Immutable ledger entry (hash-linked)
4. **Impact Calculation**: Convert proof → Impact Points
5. **Ledger Query**: Dashboard access to historical proofs + impact trends

---

## Data Model

### Tables

#### `users`
```sql
id (PK)
did (string, unique) -- Decentralized ID (or email for MVP)
email
created_at
updated_at
```

#### `proofs`
```sql
id (PK)
user_id (FK → users)
quest_id (FK → quests, nullable)
status (ENUM: submitted, pending_verification, verified, rejected, disputed)
title (string) -- "Built water well in Ban Tho"
description (text)
impact_category (ENUM: agriculture, health, education, environment, social, economic)
created_at
updated_at
verified_at (nullable)
verified_by_user_id (FK → users, nullable)
```

#### `evidence`
```sql
id (PK)
proof_id (FK → proofs)
evidence_type (ENUM: photo, video, audio, gps_trace, sensor_data, witness)
url (string) -- URL to stored file (S3/GCS)
metadata (JSON) -- GPS coords, timestamp, sensor readings
hash (string) -- SHA256 of file (for integrity check)
created_at
```

#### `verifications`
```sql
id (PK)
proof_id (FK → proofs)
verifier_id (FK → users, nullable) -- AI service or human
verification_method (ENUM: ai_scan, community_witness, human_review)
passed (boolean)
confidence_score (float 0-1) -- how confident is the verification
reason (text) -- why passed or failed
created_at
```

#### `impact_scores`
```sql
id (PK)
proof_id (FK → proofs)
impact_points (float) -- calculated IU (Impact Unit)
region_impact (float) -- effect on regional metrics
national_impact (float) -- effect on national metrics
breakdown (JSON) -- { "health": 10, "education": 5, "economy": 3 }
calculated_at
```

#### `witnesses` (for community verification)
```sql
id (PK)
proof_id (FK → proofs)
witness_user_id (FK → users)
confirmed (boolean)
witness_comment (text)
created_at
```

---

## Verification Flow

```
User submits proof
     ↓
[Stage 1: AI Scan]
  - Photo: human present? location public? not photoshopped?
  - GPS: is it the right area?
  - Metadata: timestamp reasonable?
     ↓
[Pass AI?]
  ├─ No → Reject (status: rejected)
  └─ Yes → Invite witnesses
     ↓
[Stage 2: Community Witness (3–5 people from region)]
  - Notification sent
  - "Did you see this?"
  - Require majority consensus
     ↓
[Witness majority reached?]
  ├─ Yes (≥ 60% confirm) → Mark as verified
  ├─ No / Dispute → Flag for human review
  └─ Timeout (7 days) → Auto-verify if AI confidence > 85%
     ↓
[Stage 3: (Optional) Human Review by Regional Lead]
  - If disputed or AI confidence < 75%
  - Lead reviews + decides
     ↓
Finalize: status = verified | rejected
Update Impact Ledger
```

---

## API Endpoints

### POST /api/proof/submit

**Submit a new proof.**

```json
{
  "quest_id": "uuid or null",
  "title": "Built water well in Ban Tho",
  "description": "Community project, 3 days, 50 people involved",
  "impact_category": "environment",
  "evidence": [
    {
      "type": "photo",
      "url": "s3://bucket/proof_123/photo_1.jpg",
      "metadata": {
        "gps": {"lat": 15.123, "lng": 101.456},
        "timestamp": "2025-12-04T10:30:00Z"
      }
    },
    {
      "type": "photo",
      "url": "s3://bucket/proof_123/photo_2.jpg"
    }
  ]
}
```

**Response (201 Created):**

```json
{
  "proof_id": "uuid",
  "status": "submitted",
  "message": "Proof submitted. Awaiting AI verification...",
  "verification_status": {
    "stage": 1,
    "ai_processing": true
  }
}
```

---

### GET /api/proof/:id

**Fetch proof details + verification status.**

```json
{
  "proof_id": "uuid",
  "user_id": "uuid",
  "title": "Built water well in Ban Tho",
  "description": "...",
  "impact_category": "environment",
  "status": "verified",
  "evidence": [
    {
      "id": "uuid",
      "type": "photo",
      "url": "...",
      "hash": "sha256_hash"
    }
  ],
  "verifications": [
    {
      "method": "ai_scan",
      "passed": true,
      "confidence_score": 0.92,
      "created_at": "2025-12-04T10:35:00Z"
    },
    {
      "method": "community_witness",
      "confirmed_count": 4,
      "total_invited": 5,
      "passed": true,
      "created_at": "2025-12-04T11:00:00Z"
    }
  ],
  "impact": {
    "impact_points": 125.5,
    "breakdown": { "environment": 80, "social": 45.5 },
    "region_impact": 12.3,
    "national_impact": 0.5
  },
  "verified_at": "2025-12-04T11:00:00Z"
}
```

---

### GET /api/proof/list

**Fetch all proofs for a user or region (paginated).**

Query params:
- `user_id` (optional)
- `region` (optional)
- `status` (optional: submitted, pending, verified, rejected)
- `impact_category` (optional)
- `page` (default 1)
- `limit` (default 20, max 100)

**Response:**

```json
{
  "data": [
    { "proof_id": "uuid", "title": "...", "status": "verified", "impact_points": 125.5 },
    ...
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 342,
    "pages": 18
  }
}
```

---

### POST /api/proof/:id/witness

**Submit community witness confirmation.**

```json
{
  "witnessed": true,
  "comment": "I was there, it's real. Great work!"
}
```

**Response (200 OK):**

```json
{
  "proof_id": "uuid",
  "witness_accepted": true,
  "current_consensus": { "confirmed": 4, "total_invited": 5, "percent": 80 },
  "verification_status": "verified"
}
```

---

### POST /api/proof/:id/dispute

**Dispute a verification (request human review).**

```json
{
  "reason": "The photo was taken elsewhere, not the location claimed",
  "evidence": "..."
}
```

**Response (200 OK):**

```json
{
  "proof_id": "uuid",
  "status": "disputed",
  "escalated_to": "regional_lead",
  "review_deadline": "2025-12-11T10:30:00Z"
}
```

---

### GET /api/dashboard/impact-summary

**Dashboard view: aggregate impact by region, category.**

Query params:
- `region` (optional)
- `period` (daily, weekly, monthly, yearly)
- `start_date`, `end_date`

**Response:**

```json
{
  "total_impact_points": 45230.5,
  "by_category": {
    "agriculture": 18000,
    "health": 12500,
    "education": 8000,
    "environment": 6730.5
  },
  "by_region": {
    "north": 22000,
    "central": 18000,
    "south": 5230.5
  },
  "top_performers": [
    { "user_id": "uuid", "name": "Alice", "impact_points": 523 },
    { "user_id": "uuid", "name": "Bob", "impact_points": 421 }
  ],
  "trends": [
    { "date": "2025-11-01", "impact_points": 1200 },
    { "date": "2025-11-02", "impact_points": 1340 }
  ]
}
```

---

## Implementation Plan

### MVP (Week 1–2)

- [x] Schema + migrations (PostgreSQL)
- [ ] Express endpoints: POST /api/proof/submit, GET /api/proof/:id, GET /api/proof/list
- [ ] Stub AI verification (accept 90% of submissions for now, flag rest)
- [ ] Manual witness invitation (email + link)
- [ ] Impact calculation: simple formula per category
- [ ] Commit + push

### Phase 2 (Week 3–4)

- [ ] Integrate Google Vision API for AI scan
- [ ] Implement witness consensus algorithm
- [ ] Web dashboard (React) to review pending proofs
- [ ] Real-time WebSocket updates (proof status changes)

### Phase 3 (Week 5–6)

- [ ] Mobile form (React Native / Expo) to submit proofs
- [ ] Dispute flow + escalation
- [ ] Regional lead admin panel

---

## Security & Validation

- **Input Validation**: All inputs sanitized (title, description, URLs)
- **File Integrity**: Evidence files hashed (SHA256) at upload; verify on retrieval
- **Rate Limiting**: User can submit max 10 proofs/day (anti-spam)
- **CORS**: Backend CORS policy (allow mobile + web frontends)
- **Auth**: User must be authenticated (JWT) to submit proof
- **Audit Logging**: Every verification action logged with user + timestamp

---

## Deployment

- **Database**: PostgreSQL 14+ (managed Postgres recommended: RDS, Heroku, Railway)
- **Storage**: S3 / Google Cloud Storage for evidence files
- **API Server**: Node.js Express (deploy on Heroku, Railway, Render, or Docker Swarm)
- **Codespaces**: Local development using docker-compose (Postgres + Redis container)

---

**Status**: Technical Specification (ready for coding)  
**Last Updated**: 2025-12-04
