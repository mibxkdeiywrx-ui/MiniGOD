# INFRASTRUCTURE SPECIFICATION

Complete specification for OneHeart's infrastructure, microservices architecture, data layer, and deployment strategy.

---

## System Architecture Overview

```
┌──────────────────────────────────────────────────────────────┐
│                    ONEHEART INFRASTRUCTURE                   │
└──────────────────────────────────────────────────────────────┘

┌────────────────────────────────┐
│   CLIENT LAYER                 │
├────────────────────────────────┤
│ Mobile App                     │ (Android/iOS via Expo)
│ ├─ Player Dashboard            │
│ ├─ Quest Log & World Map       │
│ ├─ Impact Upload (Photo/Video) │
│ └─ Real-time Notifications     │
│                                │
│ Web Portal                     │
│ ├─ Admin Console               │
│ ├─ Sponsor Panel               │
│ └─ Nation Dashboard (Gov)      │
└────────────────────────────────┘
           ↓ (REST/GraphQL)
┌────────────────────────────────┐
│   API GATEWAY LAYER            │
├────────────────────────────────┤
│ Route Dispatcher               │
│ Authentication & Authorization │
│ Rate Limiting & DDoS Protection│
│ Request Validation             │
│ Response Aggregation           │
└────────────────────────────────┘
           ↓
┌────────────────────────────────────────────────┐
│   MICROSERVICES LAYER                          │
├────────────────────────────────────────────────┤
│ ┌──────────────┐  ┌──────────────┐             │
│ │ Quest        │  │ Impact       │             │
│ │ Service      │  │ Engine       │             │
│ │              │  │              │             │
│ │ • Create     │  │ • Calculate  │             │
│ │ • Assign     │  │ • Distribute │             │
│ │ • Track      │  │ • Allocate   │             │
│ │ • Complete   │  │   Tokens     │             │
│ └──────────────┘  └──────────────┘             │
│                                                │
│ ┌──────────────┐  ┌──────────────┐             │
│ │ Player       │  │ Token        │             │
│ │ Profile      │  │ Economy      │             │
│ │              │  │              │             │
│ │ • Register   │  │ • Mint       │             │
│ │ • Stats      │  │ • Transfer   │             │
│ │ • Inventory  │  │ • Burn       │             │
│ │ • DID        │  │ • Ledger     │             │
│ └──────────────┘  └──────────────┘             │
│                                                │
│ ┌──────────────┐  ┌──────────────┐             │
│ │ Social       │  │ Notification │             │
│ │ Validation   │  │ Service      │             │
│ │              │  │              │             │
│ │ • Witnesses  │  │ • Push       │             │
│ │ • Upvote     │  │ • Email      │             │
│ │ • Comments   │  │ • In-app     │             │
│ │ • Community  │  │ • SMS        │             │
│ └──────────────┘  └──────────────┘             │
│                                                │
│ ┌──────────────┐  ┌──────────────┐             │
│ │ Proof Layer  │  │ Verification │             │
│ │              │  │ AI           │             │
│ │ • Evidence   │  │              │             │
│ │ • Ingestion  │  │ • Anti-Cheat │             │
│ │ • Storage    │  │ • Deepfake   │             │
│ │ • Retrieval  │  │ • Anomaly    │             │
│ └──────────────┘  └──────────────┘             │
│                                                │
│ ┌──────────────┐  ┌──────────────┐             │
│ │ Analytics    │  │ Recommendation
│ │ Service      │  │ AI           │             │
│ │              │  │              │             │
│ │ • Telemetry  │  │ • Quest Rec  │             │
│ │ • Dashboards │  │ • Mentor     │             │
│ │ • Reports    │  │ • Rewards    │             │
│ │ • Metrics    │  │ • Zones      │             │
│ └──────────────┘  └──────────────┘             │
└────────────────────────────────────────────────┘
           ↓ (Message Queue / Event Streams)
┌────────────────────────────────────────────────┐
│   AI LAYER                                     │
├────────────────────────────────────────────────┤
│ Verification AI                                │
│ ├─ Anti-Cheat Detector (heuristics)           │
│ ├─ Deepfake Filter (ML model)                 │
│ └─ Pattern Abuse Detector                     │
│                                                │
│ Impact Simulation AI                          │
│ ├─ Difficulty Scaling                         │
│ ├─ Quest Generation                           │
│ └─ Impact Projection                          │
│                                                │
│ Social AI                                     │
│ ├─ Community Health Monitor                   │
│ ├─ Conflict Detection                         │
│ └─ Behavior Reinforcement                     │
└────────────────────────────────────────────────┘
           ↓
┌────────────────────────────────────────────────┐
│   DATA LAYER                                   │
├────────────────────────────────────────────────┤
│ ┌──────────────────────────────────┐           │
│ │ SQL Core (PostgreSQL)            │           │
│ ├──────────────────────────────────┤           │
│ │ • Player Profiles                │           │
│ │ • Missions & Quests              │           │
│ │ • Actions & Evidence Metadata    │           │
│ │ • Verification Scores            │           │
│ │ • Social Graph                   │           │
│ │ • Zone Definitions               │           │
│ └──────────────────────────────────┘           │
│                                                │
│ ┌──────────────────────────────────┐           │
│ │ NoSQL (MongoDB/Redis)            │           │
│ ├──────────────────────────────────┤           │
│ │ • Telemetry Events               │           │
│ │ • Real-time Notifications        │           │
│ │ • Session Data (Redis)           │           │
│ │ • Caching Layer                  │           │
│ └──────────────────────────────────┘           │
│                                                │
│ ┌──────────────────────────────────┐           │
│ │ Object Storage (AWS S3 / GCS)    │           │
│ ├──────────────────────────────────┤           │
│ │ • Evidence Media (photos/videos) │           │
│ │ • User Avatars                   │           │
│ │ • Mission Media                  │           │
│ │ • Reports & Exports              │           │
│ └──────────────────────────────────┘           │
│                                                │
│ ┌──────────────────────────────────┐           │
│ │ Impact Ledger (Blockchain-style) │           │
│ ├──────────────────────────────────┤           │
│ │ • Append-only transaction log    │           │
│ │ • XP/Token distribution history  │           │
│ │ • Immutable audit trail          │           │
│ │ • Government export format       │           │
│ └──────────────────────────────────┘           │
└────────────────────────────────────────────────┘
```

---

## API Gateway Specification

### Routes & Endpoints

```
POST   /api/auth/register               → Player Registration
POST   /api/auth/login                  → Authentication
POST   /api/auth/logout                 → Session End

GET    /api/player/:id                  → Fetch Player Profile
PATCH  /api/player/:id                  → Update Profile
GET    /api/player/:id/inventory        → Fetch Inventory

POST   /api/quest/create                → Quest Service (Admin)
GET    /api/quest/list                  → List Quests for Player
POST   /api/quest/:id/start             → Start Quest
POST   /api/quest/:id/complete          → Submit Completion
GET    /api/quest/:id/history           → Quest History

POST   /api/proof/submit                → Submit Evidence (Photo/Video)
GET    /api/proof/:id                   → Fetch Proof Details
GET    /api/proof/list                  → List Player's Proofs

POST   /api/impact/calculate            → Trigger Impact Calculation (Internal)
GET    /api/impact/distribution         → View Impact Distribution
GET    /api/impact/ledger               → Fetch Immutable Ledger

POST   /api/token/transfer              → Transfer Tokens
GET    /api/token/balance               → Check Token Balance
GET    /api/token/history               → Transaction History

GET    /api/reward/marketplace          → Browse Rewards
POST   /api/reward/redeem               → Redeem Tokens for Reward

POST   /api/social/witness              → Witness Validation
POST   /api/social/upvote               → Community Upvote
GET    /api/social/community/:zone_id   → Zone Community

GET    /api/map/zones                   → Fetch Map Zones
GET    /api/map/zones/:id/missions      → Missions in Zone
GET    /api/map/zones/:id/activity      → Zone Activity Feed

GET    /api/admin/dashboard             → Admin Dashboard
GET    /api/admin/reports               → Reports & Metrics
GET    /api/admin/users                 → User Management

GET    /api/sponsor/panel               → Sponsor Analytics
GET    /api/sponsor/roi                 → Sponsor ROI Dashboard
POST   /api/sponsor/campaign            → Create Sponsor Campaign

GET    /api/government/nation-dashboard → National-level Insights
GET    /api/government/export           → Impact Data Export
GET    /api/government/policy-insights  → Policy Recommendations
```

### Authentication & Security

```
JWT Token Flow:
1. Client sends credentials to /api/auth/login
2. Server issues JWT (exp: 24h, refresh token: 7d)
3. Client includes Authorization: Bearer <jwt> in headers
4. API Gateway validates token, extracts claims
5. Injects user_did, role into request context
6. Services use context for authorization

Rate Limiting:
- 100 req/min per authenticated user
- 1000 req/min per IP for admin endpoints
- 10 req/min per IP for unauthenticated endpoints

CORS & HTTPS:
- All traffic over TLS 1.3
- CORS headers configured per environment
- CSP (Content Security Policy) headers
- X-Frame-Options: DENY
```

---

## Microservices Specifications

### 1. Quest Service

**Responsibilities:**
- Quest creation, assignment, completion tracking
- Daily/Story/Community/Ascension quest logic
- Mission unlock based on player level
- Quest reward calculation

**Key Endpoints:**
```
POST   /api/quest/create
GET    /api/quest/list
POST   /api/quest/:id/start
POST   /api/quest/:id/complete
GET    /api/quest/:id/history
```

**Data Model:**
```json
{
  "quest_id": "uuid",
  "mission_id": "uuid",
  "player_did": "did:...",
  "quest_type": "daily|story|community|ascension",
  "status": "available|active|completed|failed",
  "created_at": "2024-12-04T10:00:00Z",
  "started_at": "2024-12-04T10:15:00Z",
  "completed_at": "2024-12-04T11:30:00Z",
  "reward_xp": 50,
  "reward_tokens": 5,
  "difficulty_level": 3
}
```

### 2. Impact Engine Service

**Responsibilities:**
- Calculate XP and tokens from submitted actions
- Apply multipliers (zone, community, player level, etc.)
- Record immutable ledger entries
- Allocate funds (Local/National/Global)

**Key Endpoints:**
```
POST   /api/impact/calculate
GET    /api/impact/distribution
GET    /api/impact/ledger
```

**Processing:**
```
1. Receive action from Proof Layer
2. Run through Verification AI
3. Calculate base XP (mission type + duration)
4. Apply multipliers
5. Generate tokens and impact credits
6. Record to immutable ledger
7. Update player state
8. Publish impact event to event stream
```

### 3. Player Profile Service

**Responsibilities:**
- Player registration and profile management
- DID (Decentralized Identity) issuance
- Stats tracking (level, XP, badges)
- Inventory management

**Key Endpoints:**
```
POST   /api/player/register
GET    /api/player/:id
PATCH  /api/player/:id
GET    /api/player/:id/inventory
```

**Data Model:**
```json
{
  "user_did": "did:oneheart:abc123xyz",
  "username": "citizen_001",
  "email": "player@example.com",
  "location": { "lat": 13.7563, "lng": 100.5018 },
  "profile": {
    "level": 5,
    "total_xp": 1250,
    "heart_tokens": 125,
    "impact_credits": 500.5,
    "badges": ["eco_warrior", "mentor"],
    "created_at": "2024-11-01T00:00:00Z"
  },
  "inventory": {
    "active_quests": 3,
    "completed_missions": 15,
    "purchased_items": ["travel_kit_001"]
  }
}
```

### 4. Token Economy Service

**Responsibilities:**
- Token minting and burning
- Marketplace transactions
- Sponsorship pool management
- Fund distribution (Local/National/Global)

**Key Endpoints:**
```
POST   /api/token/transfer
GET    /api/token/balance
GET    /api/token/history
POST   /api/reward/redeem
```

**Token Flows:**
```
Mint Flow:
1. Action completed & verified
2. Impact Engine calculates tokens
3. Token Economy Service mints
4. Record to ledger

Burn Flow:
1. Player redeems tokens in marketplace
2. Token Economy Service burns
3. Reward fulfillment triggered
4. Record to ledger

Sponsor Pool:
1. Sponsor contributes $ to fund
2. Convert to Heart Tokens via rate
3. Allocate to Local/National/Global pools
4. Track ROI per sponsor
```

### 5. Social Validation Service

**Responsibilities:**
- Peer witness collection
- Upvote/downvote mechanics
- Community health monitoring
- Conflict detection

**Key Endpoints:**
```
POST   /api/social/witness
POST   /api/social/upvote
GET    /api/social/community/:zone_id
```

### 6. Notification Service

**Responsibilities:**
- Push notifications (mobile)
- Email alerts
- In-app notifications
- SMS for critical updates

**Key Endpoints:**
```
GET    /api/notification/list
PATCH  /api/notification/:id/read
POST   /api/notification/preferences
```

### 7. Verification AI Service

**Responsibilities:**
- Anti-cheat detection
- Deepfake filtering
- Anomaly pattern detection
- Human review flagging

**Integrated via:**
- Webhook from Proof Layer
- Event stream subscription

### 8. Analytics Service

**Responsibilities:**
- Telemetry collection
- Dashboard generation
- Report building
- Metrics aggregation

**Key Endpoints:**
```
GET    /api/admin/dashboard
GET    /api/admin/reports
GET    /api/government/nation-dashboard
```

---

## Data Layer Architecture

### Database Strategy

**PostgreSQL (SQL Core)**
- Primary relational store
- Normalized schema for consistency
- ACID transactions
- Indexes on frequently queried columns

**Tables:**
```sql
-- Player Management
CREATE TABLE players (
  id UUID PRIMARY KEY,
  user_did TEXT UNIQUE NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  location_lat DECIMAL,
  location_lng DECIMAL,
  level INT DEFAULT 1,
  total_xp INT DEFAULT 0,
  heart_tokens INT DEFAULT 0,
  impact_credits DECIMAL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Quest/Mission System
CREATE TABLE missions (
  id UUID PRIMARY KEY,
  zone_id UUID NOT NULL,
  mission_type VARCHAR(50),
  title VARCHAR(255),
  description TEXT,
  base_xp INT,
  base_tokens INT,
  difficulty_level INT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE quest_assignments (
  id UUID PRIMARY KEY,
  player_id UUID NOT NULL REFERENCES players(id),
  mission_id UUID NOT NULL REFERENCES missions(id),
  status VARCHAR(50),
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Actions & Evidence
CREATE TABLE actions (
  id UUID PRIMARY KEY,
  player_id UUID NOT NULL REFERENCES players(id),
  mission_id UUID NOT NULL REFERENCES missions(id),
  action_type VARCHAR(50),
  location_lat DECIMAL,
  location_lng DECIMAL,
  duration_minutes INT,
  beneficiaries_count INT,
  timestamp TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE evidence (
  id UUID PRIMARY KEY,
  action_id UUID NOT NULL REFERENCES actions(id),
  media_type VARCHAR(20),
  media_hash TEXT,
  storage_path TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Verification & Impact
CREATE TABLE integrity_scores (
  id UUID PRIMARY KEY,
  action_id UUID NOT NULL UNIQUE REFERENCES actions(id),
  authenticity_score INT CHECK (authenticity_score >= 0 AND authenticity_score <= 100),
  anti_cheat_flags TEXT[],
  verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE impact_ledger (
  id UUID PRIMARY KEY,
  action_id UUID NOT NULL REFERENCES actions(id),
  player_id UUID NOT NULL REFERENCES players(id),
  xp_delta INT,
  tokens_delta INT,
  impact_credits_delta DECIMAL,
  badges_earned TEXT[],
  fund_allocation JSONB,
  ledger_timestamp TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Zones & World Map
CREATE TABLE zones (
  id UUID PRIMARY KEY,
  zone_type VARCHAR(50),
  name VARCHAR(255),
  description TEXT,
  location_lat DECIMAL,
  location_lng DECIMAL,
  radius_km DECIMAL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Rewards & Marketplace
CREATE TABLE rewards (
  id UUID PRIMARY KEY,
  category VARCHAR(50),
  name VARCHAR(255),
  description TEXT,
  price_tokens INT,
  quantity INT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE redemptions (
  id UUID PRIMARY KEY,
  player_id UUID NOT NULL REFERENCES players(id),
  reward_id UUID NOT NULL REFERENCES rewards(id),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Social & Community
CREATE TABLE witnesses (
  id UUID PRIMARY KEY,
  action_id UUID NOT NULL REFERENCES actions(id),
  witness_player_id UUID NOT NULL REFERENCES players(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE upvotes (
  id UUID PRIMARY KEY,
  action_id UUID NOT NULL REFERENCES actions(id),
  voter_player_id UUID NOT NULL REFERENCES players(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Badges & Achievements
CREATE TABLE badges (
  id UUID PRIMARY KEY,
  badge_type VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255),
  description TEXT,
  icon_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE player_badges (
  id UUID PRIMARY KEY,
  player_id UUID NOT NULL REFERENCES players(id),
  badge_id UUID NOT NULL REFERENCES badges(id),
  earned_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_players_user_did ON players(user_did);
CREATE INDEX idx_players_level ON players(level);
CREATE INDEX idx_quest_assignments_player ON quest_assignments(player_id);
CREATE INDEX idx_quest_assignments_status ON quest_assignments(status);
CREATE INDEX idx_actions_player ON actions(player_id);
CREATE INDEX idx_actions_mission ON actions(mission_id);
CREATE INDEX idx_actions_timestamp ON actions(timestamp);
CREATE INDEX idx_impact_ledger_player ON impact_ledger(player_id);
CREATE INDEX idx_impact_ledger_action ON impact_ledger(action_id);
CREATE INDEX idx_zones_location ON zones(location_lat, location_lng);
```

**MongoDB (NoSQL Telemetry)**
- Event-based telemetry (JSON documents)
- Real-time session data
- No schema enforcement
- Time-series data

**Collections:**
```javascript
// Telemetry Events
db.telemetry_events.insert({
  _id: ObjectId(),
  player_id: "uuid",
  event_type: "quest_started|action_submitted|badge_earned",
  timestamp: ISODate(),
  metadata: { ... }
});

// Session Data
db.sessions.insert({
  _id: ObjectId(),
  player_id: "uuid",
  session_token: "jwt",
  created_at: ISODate(),
  expires_at: ISODate(),
  device: "mobile|web",
  ip_address: "x.x.x.x"
});

// Notifications
db.notifications.insert({
  _id: ObjectId(),
  player_id: "uuid",
  type: "reward|badge|mission",
  title: "string",
  body: "string",
  created_at: ISODate(),
  read_at: ISODate()
});
```

**Redis (Caching & Real-time)**
- Session storage (TTL)
- Real-time leaderboards
- Rate limiting counters
- Task queues

```
KEYS:
- session:{jwt_token} → {player_id, role, exp}
- leaderboard:daily → sorted set of {player_id: xp}
- leaderboard:weekly → sorted set of {player_id: xp}
- rate_limit:{player_id} → counter
- quest_queue → job queue for async processing
```

**Object Storage (AWS S3 / Google Cloud Storage)**
- Evidence media files (photos, videos)
- Compressed for delivery
- Access via signed URLs
- Archival after 1 year

**Impact Ledger (PostgreSQL append-only table)**
```
Immutable record of all XP/Token distributions
No updates/deletes allowed
Cryptographic hash chain optional (for high-trust environments)
Daily snapshots exported to government
```

---

## DevOps & Deployment

### Local Development Environment

**Docker Compose:**

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: oneheart
      POSTGRES_USER: oneheart_dev
      POSTGRES_PASSWORD: dev_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  mongodb:
    image: mongo:6-alpine
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  adminer:
    image: adminer
    ports:
      - "8080:8080"
    depends_on:
      - postgres

  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://oneheart_dev:dev_password@postgres:5432/oneheart
      MONGODB_URL: mongodb://mongodb:27017/oneheart
      REDIS_URL: redis://redis:6379
      NODE_ENV: development
    depends_on:
      - postgres
      - mongodb
      - redis
    volumes:
      - ./backend/src:/app/src

  # Optional: localstack for S3 emulation
  localstack:
    image: localstack/localstack:latest
    ports:
      - "4566:4566"
    environment:
      SERVICES: s3
      DEBUG: 1

volumes:
  postgres_data:
  mongo_data:
```

**Commands:**
```bash
# Start full stack
docker-compose up -d

# Run migrations
docker-compose exec backend npm run prisma:migrate

# View logs
docker-compose logs -f backend

# Stop
docker-compose down
```

### Production Deployment

**Kubernetes (Recommended)**

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: oneheart-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: oneheart-backend
  template:
    metadata:
      labels:
        app: oneheart-backend
    spec:
      containers:
      - name: backend
        image: oneheart/backend:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secrets
              key: connection-string
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
```

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup Node
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    - run: npm install
    - run: npm run test
    - run: npm run lint

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Build Docker image
      run: docker build -t oneheart/backend:${{ github.sha }} ./backend
    - name: Push to registry
      run: docker push oneheart/backend:${{ github.sha }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
    - name: Deploy to Kubernetes
      run: |
        kubectl set image deployment/oneheart-backend \
          backend=oneheart/backend:${{ github.sha }}
```

---

## Pilot Infrastructure (Minimal Viable)

### Week 1-2: Single Server Setup

```
Single Ubuntu VM (t2.medium on AWS)
├─ Docker containers (Postgres + Redis + Backend)
├─ Nginx reverse proxy
├─ SSL via Let's Encrypt
└─ Monitoring (Prometheus + Grafana)

Cost: ~$30-50/month
Suitable for: 1K-5K concurrent players
```

### Week 3-4: Multi-Service Expansion

```
Separate services on dedicated instances:
├─ API Gateway (t2.small)
├─ Quest Service (t2.small)
├─ Impact Engine (t2.small)
├─ Database Cluster (t2.medium RDS)
├─ Redis Cache (ElastiCache)
└─ S3 for media storage

Cost: ~$150-200/month
Suitable for: 10K-50K concurrent players
```

### Month 2+: Kubernetes Cluster

```
EKS Cluster (AWS):
├─ 3x master nodes
├─ Auto-scaling worker nodes (2-10)
├─ RDS PostgreSQL (Multi-AZ)
├─ ElastiCache Redis (Cluster mode)
├─ S3 + CloudFront CDN
├─ CloudWatch monitoring
└─ Auto-backup & disaster recovery

Cost: ~$500-1000/month (scales with load)
Suitable for: 100K+ concurrent players
```

---

## Monitoring & Observability

### Key Metrics

```
Application Level:
- Requests per second (RPS)
- Latency (p50, p95, p99)
- Error rate (4xx, 5xx)
- Quest completion rate
- Token velocity
- Player retention

Infrastructure Level:
- CPU utilization
- Memory usage
- Disk I/O
- Network bandwidth
- Container restart count
- Database connection pool

Business Level:
- Active players (DAU, WAU, MAU)
- Average session duration
- Impact score distribution
- Token exchange rate
- Sponsor ROI
- Government report completeness
```

### Dashboards

**Grafana Dashboards:**
1. **System Health:** CPU, Memory, Disk, Network
2. **API Performance:** RPS, Latency, Error Rate
3. **Business Metrics:** Users, Quests, Tokens, Impact
4. **Alerts:** Critical errors, service down, quota exceeded

---

## Security Best Practices

```
1. Data Encryption
   - TLS 1.3 for all traffic
   - Encryption at rest (PostgreSQL with pgcrypto)
   - Encryption in transit (SSH for admin access)

2. Access Control
   - Role-based access control (RBAC)
   - API rate limiting per user
   - DDoS protection via CloudFlare

3. Secrets Management
   - Vault for database passwords, API keys
   - Rotation every 90 days
   - No secrets in code or logs

4. Audit Logging
   - All admin actions logged
   - Impact ledger immutable
   - Monthly security audit

5. Backups
   - Daily automated backups (PostgreSQL)
   - 30-day retention
   - Cross-region replication
```

---

## Pilot Success Metrics

| Component | Target | Measurement |
|---|---|---|
| API Uptime | 99.5% | CloudWatch monitor |
| API Latency (p95) | <500ms | APM dashboard |
| Data Consistency | 100% | Automated audit |
| Security Audit Pass | 100% | Monthly review |
| Backup Integrity | 100% | Test restore monthly |

---

**Owner:** DevOps & Infrastructure Team  
**Last Updated:** December 4, 2025  
**Status:** Ready for Pilot Deployment
