# Container Architecture - OneHeart OS

**Status:** Production Design Document ✅  
**Version:** 1.0 - Complete Container Specification  
**Last Updated:** December 4, 2025

---

## 🏗️ Complete System Architecture

```
┌────────────────────────────────────────────────────────────────────────────┐
│                        ONEHEART OS - CONTAINER STACK                       │
└────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                          CLIENT LAYER (User Interfaces)                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────┐        ┌──────────────────────────┐           │
│  │  Mobile App             │        │  Web Portal              │           │
│  │  (Android/iOS - Expo)   │        │  (React / Next.js)       │           │
│  ├─────────────────────────┤        ├──────────────────────────┤           │
│  │ • Player Dashboard      │        │ • Admin Console          │           │
│  │ • Quest Log             │        │ • Sponsor Panel          │           │
│  │ • Impact Upload         │        │ • Nation Dashboard       │           │
│  │ • Real-time Map UI      │        │ • Analytics Dashboard    │           │
│  │ • Leaderboards          │        │ • Budget Allocation      │           │
│  │ • Social Features       │        │ • Impact Reports         │           │
│  │ • Marketplace           │        │ • User Management        │           │
│  └─────────────────────────┘        └──────────────────────────┘           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                         API GATEWAY LAYER (Communication)                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ API Gateway (Kong / NGINX / AWS API Gateway)                        │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │ • REST Endpoints (/api/v1/*)                                        │   │
│  │ • GraphQL Endpoint (optional, for complex queries)                  │   │
│  │ • WebSocket Support (real-time updates)                             │   │
│  │ • Authentication & Authorization (JWT + OAuth2)                     │   │
│  │ • Rate Limiting (1000 req/min per user)                             │   │
│  │ • Request Validation & Sanitization                                 │   │
│  │ • CORS Management                                                   │   │
│  │ • Request/Response Logging                                          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                    BUSINESS LOGIC LAYER (Microservices)                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐        │
│  │ Quest Service    │  │ Impact Engine    │  │ Player Profile   │        │
│  │                  │  │ Service          │  │ Service          │        │
│  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤        │
│  │ • Quest creation │  │ • XP calculation │  │ • Identity mgmt  │        │
│  │ • Quest assign   │  │ • Token minting  │  │ • Stats & levels │        │
│  │ • Quest tracking │  │ • Multipliers    │  │ • Inventory      │        │
│  │ • Difficulty     │  │ • Authenticity   │  │ • Achievements   │        │
│  │   calibration    │  │   scoring        │  │ • Preferences    │        │
│  │ • Zone-based     │  │ • Impact ledger  │  │ • Social graph   │        │
│  │   rewards        │  │ • Audit trails   │  │ • Tier tracking  │        │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘        │
│                                                                             │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐        │
│  │ Token Economy    │  │ Social           │  │ Notification     │        │
│  │ Service          │  │ Validation       │  │ Service          │        │
│  │                  │  │ Service          │  │                  │        │
│  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤        │
│  │ • Token transfer │  │ • Community vote │  │ • Push notifs    │        │
│  │ • Token redeem   │  │ • Proof review   │  │ • Email notifs   │        │
│  │ • Marketplace    │  │ • Badge award    │  │ • In-app alerts  │        │
│  │ • Revenue share  │  │ • Reputation     │  │ • Event triggers │        │
│  │ • Ledger mgmt    │  │   scoring        │  │ • Broadcast msgs │        │
│  │ • Rewards        │  │ • Community      │  │ • Task reminders │        │
│  │   distribution   │  │   health score   │  │ • Leaderboard    │        │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘        │
│                                                                             │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐        │
│  │ Worldwalker      │  │ Enterprise       │  │ Analytics        │        │
│  │ Service          │  │ Service          │  │ Service          │        │
│  │                  │  │                  │  │                  │        │
│  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤        │
│  │ • Readiness      │  │ • Stakeholder    │  │ • User analytics │        │
│  │   checker        │  │   management     │  │ • Impact metrics │        │
│  │ • Skill eval     │  │ • Domain coord   │  │ • Quest analysis │        │
│  │ • Expedition     │  │ • Government     │  │ • Revenue trends │        │
│  │   planning       │  │   coordination   │  │ • Community      │        │
│  │ • Global mission │  │ • Tourism integ  │  │   health trends  │        │
│  │   sync           │  │ • National       │  │ • Predictive AI  │        │
│  │ • Phase tracking │  │   metrics        │  │ • Cohort compare │        │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                         AI/ML LAYER (Intelligence)                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────┐ │
│  │ Verification AI      │  │ Recommendation AI    │  │ Impact           │ │
│  │                      │  │                      │  │ Simulation AI    │ │
│  ├──────────────────────┤  ├──────────────────────┤  ├──────────────────┤ │
│  │ Image Analysis:      │  │ • Personalized quest │  │ • Predict impact │ │
│  │ • Authenticity check │  │   suggestions        │  │ • Simulate scale │ │
│  │ • Face detection     │  │ • Difficulty level   │  │ • Forecast trend │ │
│  │ • Object detection   │  │   recommendation     │  │ • Regional model │ │
│  │ • Quality scoring    │  │ • Reward prediction  │  │ • Economic model │ │
│  │                      │  │ • Partner matching   │  │ • Social model   │ │
│  │ GPS/Location:        │  │ • Content ranking    │  │ • Environmental  │ │
│  │ • Location validity  │  │ • Community          │  │   impact predict │ │
│  │ • Distance check     │  │   suggestions        │  │                  │ │
│  │ • Geo-fencing        │  │                      │  │ • Model version  │ │
│  │ • Map rendering      │  │                      │  │   tracking       │ │
│  │                      │  │                      │  │ • A/B testing    │ │
│  │ Timestamp & Pattern: │  │                      │  │                  │ │
│  │ • Time validity      │  │                      │  │                  │ │
│  │ • Anomaly detection  │  │                      │  │                  │ │
│  │ • Fraud pattern      │  │                      │  │                  │ │
│  │                      │  │                      │  │                  │ │
│  └──────────────────────┘  └──────────────────────┘  └──────────────────┘ │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ Community Health AI                                                   │  │
│  ├──────────────────────────────────────────────────────────────────────┤  │
│  │ • Sentiment analysis on community feedback                            │  │
│  │ • Toxicity detection (comment moderation)                             │  │
│  │ • Community engagement scoring                                        │  │
│  │ • Cohort health prediction                                            │  │
│  │ • Early warning for community issues                                  │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                     DATA INFRASTRUCTURE LAYER (Persistence)                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │ SQL CORE (PostgreSQL - Normalized Relational Data)                │   │
│  ├────────────────────────────────────────────────────────────────────┤   │
│  │                                                                   │   │
│  │ Transaction Tables:                                             │   │
│  │ ├─ Player (identity, stats, progression)                        │   │
│  │ ├─ Quest (definition, difficulty, rewards)                      │   │
│  │ ├─ PlayerQuest (assignment, completion, proofs)                 │   │
│  │ └─ Evidence (image/video/GPS/timestamp references)              │   │
│  │                                                                   │   │
│  │ Impact & Token Tables:                                          │   │
│  │ ├─ ImpactLog (immutable audit trail - append-only)              │   │
│  │ ├─ TokenLedger (append-only transaction history)                │   │
│  │ ├─ ImpactScore (authenticity & value breakdown)                 │   │
│  │ └─ Witness (community validation records)                       │   │
│  │                                                                   │   │
│  │ Enterprise Tables:                                              │   │
│  │ ├─ Stakeholder (type, tier, region, verification)               │   │
│  │ ├─ BusinessDomain (regional coordination)                       │   │
│  │ ├─ StakeholderRevenue (transaction ledger)                      │   │
│  │ ├─ Partnership (NGO/corporate agreements)                       │   │
│  │ ├─ GovernmentBudget (fiscal allocation)                         │   │
│  │ ├─ TourismEntity (entity registration)                          │   │
│  │ └─ TourismImpact (visitor/revenue/cultural metrics)             │   │
│  │                                                                   │   │
│  │ Infrastructure:                                                 │   │
│  │ ├─ Indexes on frequently queried columns                        │   │
│  │ ├─ Foreign key constraints (data integrity)                     │   │
│  │ ├─ Row-level security (multi-tenancy)                           │   │
│  │ ├─ VACUUM & ANALYZE (performance)                               │   │
│  │ └─ Automated backups (hourly, daily, weekly)                    │   │
│  │                                                                   │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │ NoSQL TELEMETRY (MongoDB/DynamoDB - Event & Time-Series Data)    │   │
│  ├────────────────────────────────────────────────────────────────────┤   │
│  │                                                                   │   │
│  │ Event Collections:                                              │   │
│  │ ├─ QuestEvents (quest_id, timestamp, event_type, player_id)     │   │
│  │ ├─ PlayerActivity (player_id, activity, timestamp)              │   │
│  │ ├─ ProofVerification (proof_id, status, timestamp, ai_score)    │   │
│  │ ├─ SocialValidation (validator_id, target_id, vote, timestamp)  │   │
│  │ └─ SystemEvents (error_logs, api_calls, performance metrics)    │   │
│  │                                                                   │   │
│  │ Time-Series Collections:                                        │   │
│  │ ├─ DailyMetrics (aggregated daily impact, quest completion)      │   │
│  │ ├─ HourlyActivity (real-time activity trends)                   │   │
│  │ ├─ UserMetrics (user engagement, session duration)              │   │
│  │ └─ SystemMetrics (API latency, error rates, throughput)         │   │
│  │                                                                   │   │
│  │ TTL Indexes (auto-expiring old telemetry):                      │   │
│  │ ├─ Raw events: 90 days                                          │   │
│  │ ├─ Hourly aggregates: 1 year                                    │   │
│  │ ├─ Daily aggregates: 7 years (historical)                       │   │
│  │ └─ Monthly rollups: permanent                                   │   │
│  │                                                                   │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │ OBJECT STORAGE (S3 / Azure Blob - Media & Large Files)           │   │
│  ├────────────────────────────────────────────────────────────────────┤   │
│  │                                                                   │   │
│  │ Structure:                                                      │   │
│  │ ├─ /proofs/{proofId}/image.jpg (quest proof media)              │   │
│  │ ├─ /proofs/{proofId}/video.mp4 (proof video)                    │   │
│  │ ├─ /profiles/{playerId}/avatar.png (player avatar)              │   │
│  │ ├─ /exports/national_report_{date}.pdf (compliance)             │   │
│  │ ├─ /backups/daily/{date}/ (database backups)                    │   │
│  │ ├─ /analytics/{date}/events.parquet (analytics data)            │   │
│  │ └─ /ai_models/verification_v2.pb (model files)                  │   │
│  │                                                                   │   │
│  │ Lifecycle Management:                                           │   │
│  │ ├─ Hot storage (30 days): Immediate access                      │   │
│  │ ├─ Warm storage (1 year): Infrequent access                     │   │
│  │ ├─ Cold storage (7 years): Archival                             │   │
│  │ └─ Deep freeze (>7 years): Compliance hold                      │   │
│  │                                                                   │   │
│  │ Content Delivery:                                               │   │
│  │ ├─ CloudFront / Cloudflare CDN (fast global delivery)           │   │
│  │ ├─ Signed URLs (secure temporary access)                        │   │
│  │ ├─ Caching headers (browser caching)                            │   │
│  │ └─ Compression (gzip for text, WebP for images)                 │   │
│  │                                                                   │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │ IMMUTABLE LEDGER (Blockchain / Append-Only Database)             │   │
│  ├────────────────────────────────────────────────────────────────────┤   │
│  │                                                                   │   │
│  │ Purpose: Cryptographically secure audit trail                   │   │
│  │                                                                   │   │
│  │ Records:                                                        │   │
│  │ ├─ ImpactLog: Every XP/token event (immutable)                  │   │
│  │ ├─ TokenLedger: Every transaction (append-only)                 │   │
│  │ ├─ Verification: AI confidence scores & decisions               │   │
│  │ └─ Governance: All parameter changes (audit trail)              │   │
│  │                                                                   │   │
│  │ Technology:                                                     │   │
│  │ ├─ Option 1: PostgreSQL with row-level locks (production)       │   │
│  │ ├─ Option 2: Hyperledger Fabric (enterprise deployments)        │   │
│  │ ├─ Option 3: Merkle tree checksums (cost-effective)             │   │
│  │ └─ Option 4: Ethereum smart contract (public transparency)      │   │
│  │                                                                   │   │
│  │ Verification:                                                   │   │
│  │ ├─ Monthly audit reports (government compliance)                │   │
│  │ ├─ Merkle root verification (tamper detection)                  │   │
│  │ ├─ Timestamp authority (time proof)                             │   │
│  │ └─ Public ledger export (national transparency)                 │   │
│  │                                                                   │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │ CACHING LAYER (Redis - High-Performance Data Access)             │   │
│  ├────────────────────────────────────────────────────────────────────┤   │
│  │                                                                   │   │
│  │ Cache Strategies:                                               │   │
│  │ ├─ Player stats (TTL: 5 min): Common queries                    │   │
│  │ ├─ Leaderboard (TTL: 1 hour): Top 100 players/region            │   │
│  │ ├─ Available quests (TTL: 15 min): Quest availability           │   │
│  │ ├─ Player inventory (TTL: 1 min): Dynamic user data             │   │
│  │ ├─ Session tokens (TTL: varies): Authentication cache           │   │
│  │ ├─ Rate limiter counters (TTL: varies): Prevent abuse           │   │
│  │ ├─ Feature flags (TTL: 1 hour): A/B testing                     │   │
│  │ └─ National metrics (TTL: 1 day): Aggregated stats              │   │
│  │                                                                   │   │
│  │ Cache Invalidation:                                             │   │
│  │ ├─ Event-driven: Quest completion → invalidate player stats     │   │
│  │ ├─ Time-based: Hourly refresh of leaderboards                   │   │
│  │ ├─ Manual: Admin override for emergency updates                 │   │
│  │ └─ Smart: Only invalidate affected records                      │   │
│  │                                                                   │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ORCHESTRATION LAYER (DevOps)                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────┐ │
│  │ Container Engine     │  │ Orchestration        │  │ CI/CD Pipeline   │ │
│  │ (Docker)             │  │ (Kubernetes)         │  │ (GitHub Actions) │ │
│  ├──────────────────────┤  ├──────────────────────┤  ├──────────────────┤ │
│  │ • Image registry     │  │ • Pod deployment     │  │ • Automated tests│ │
│  │ • Multi-stage builds │  │ • Service discovery  │  │ • Code scanning  │ │
│  │ • Network isolation  │  │ • Load balancing     │  │ • Container scan │ │
│  │ • Volume management  │  │ • Auto-scaling       │  │ • Build images   │ │
│  │ • Health checks      │  │ • Self-healing       │  │ • Push to ECR    │ │
│  │ • Resource limits    │  │ • Rolling updates    │  │ • Deploy to K8s  │ │
│  │                      │  │ • ConfigMaps/Secrets │  │ • Smoke tests    │ │
│  │                      │  │ • StatefulSets       │  │ • Rollback if err│ │
│  │                      │  │ • Network policies   │  │ • Notifications  │ │
│  │                      │  │ • RBAC               │  │                  │ │
│  └──────────────────────┘  └──────────────────────┘  └──────────────────┘ │
│                                                                             │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────┐ │
│  │ Monitoring &         │  │ Logging              │  │ Security         │ │
│  │ Observability        │  │                      │  │                  │ │
│  ├──────────────────────┤  ├──────────────────────┤  ├──────────────────┤ │
│  │ • Prometheus metrics │  │ • ELK Stack (ES+K+B) │  │ • TLS/SSL certs  │ │
│  │ • Grafana dashboards │  │ • Structured logging │  │ • Secret mgmt    │ │
│  │ • Alert rules        │  │ • Distributed trace  │  │ • Network policy │ │
│  │ • Health checks      │  │ • Request logging    │  │ • RBAC          │ │
│  │ • Performance metrics│  │ • Audit trails       │  │ • DDoS protect   │ │
│  │ • Error budgets      │  │ • Search & analytics │  │ • Data encrypt   │ │
│  │                      │  │ • Retention policy   │  │ • Compliance     │ │
│  │                      │  │ • Dashboard creation │  │ • Backup encrypt │ │
│  │                      │  │ • Alert integration  │  │ • Vulnerability  │ │
│  │                      │  │                      │  │   scanning       │ │
│  └──────────────────────┘  └──────────────────────┘  └──────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Layer-by-Layer Details

### Layer 1: Client Layer

#### Mobile App (React Native + Expo)
**Deployed to:** App Store, Google Play Store, or internal beta distribution

**Features:**
- **Player Dashboard:** Stats, level, XP progress, tokens, achievements
- **Quest Log:** Active, completed, and available quests with difficulty filtering
- **Impact Upload:** Camera integration for photo/video proof submission with GPS tagging
- **Real-time Map UI:** Zone map with quest locations, leaderboards, social features
- **Push Notifications:** Real-time quest updates, achievement unlocks
- **Offline Mode:** Cache recent data for areas with poor connectivity

**Tech Stack:**
- React Native / Expo
- Redux or Context API (state management)
- SQLite (local caching)
- React Navigation (routing)
- Camera & Maps APIs (native)

---

#### Web Portal (React + Next.js)
**Deployed to:** nextjs-app.example.com

**Admin Console:**
- User management (activate, suspend, verify)
- Quest management (create, edit, difficulty calibration)
- Moderation tools (flag inappropriate content)
- System configuration (parameters, feature flags)
- Emergency interventions (payment holds, etc)

**Sponsor/Partner Panel:**
- Revenue tracking & dashboards
- Quest performance analytics
- Team management
- Partnership agreement tracking
- Payout scheduling

**Nation Dashboard:**
- National metrics (citizens, quests, impact, revenue)
- Regional breakdowns
- Government budget allocation
- Tourism impact tracking
- Policy recommendations
- Export compliance reports

**Tech Stack:**
- Next.js (SSR + API routes)
- React for UI components
- TypeScript for type safety
- TailwindCSS for styling
- Recharts for visualizations
- Auth0/Okta for enterprise auth

---

### Layer 2: API Gateway Layer

**Technology:** Kong, NGINX, or AWS API Gateway

**Responsibilities:**

1. **Request Routing**
   - Route `/api/v1/quests/*` → Quest Service
   - Route `/api/v1/players/*` → Player Service
   - Route `/api/v1/impact/*` → Impact Service
   - Route `/api/v1/enterprise/*` → Enterprise Service

2. **Authentication & Authorization**
   - JWT token validation
   - OAuth2 support (social login)
   - Role-based access control (RBAC)
   - User session management

3. **Rate Limiting**
   - 1000 requests/minute per authenticated user
   - 100 requests/minute per IP (anonymous)
   - Burst allowance: 20 requests in 5 seconds
   - Daily quota: 100,000 requests

4. **Request/Response Processing**
   - Request validation (schema validation)
   - Input sanitization (prevent injection attacks)
   - CORS handling (cross-origin requests)
   - Compression (gzip for responses)
   - Content negotiation (JSON, XML)

5. **Monitoring**
   - Request/response logging (all traffic)
   - Error tracking (4xx, 5xx responses)
   - Performance metrics (latency, throughput)
   - Alerting (p99 latency threshold)

---

### Layer 3: Business Logic Layer (Microservices)

Each microservice:
- Listens on unique port
- Has own database (database per service pattern)
- Can be scaled independently
- Communicates via REST API
- Implements circuit breaker pattern
- Includes health check endpoint

**Architecture:**

```
Service Pattern:

Service Name
├─ Controller (HTTP request handling)
├─ Route Handlers (business logic entry)
├─ Service Layer (core business logic)
├─ Repository Layer (data access)
├─ Database Connection (isolated)
├─ Error Handling (service-specific)
└─ Logging (structured JSON logs)
```

**Service Details:**

#### Quest Service
- Port: 3001
- Database: PostgreSQL (quest_service_db)
- Responsibilities:
  - Quest CRUD operations
  - Difficulty calibration
  - Regional quest distribution
  - Zone-based filtering
  - Quest completion tracking

#### Impact Engine Service
- Port: 3002
- Database: PostgreSQL (impact_service_db)
- Responsibilities:
  - XP calculation (6 multipliers)
  - Token minting/burning
  - Authenticity scoring
  - Impact value calculation
  - Ledger management
  - Badge unlocking

#### Player Profile Service
- Port: 3003
- Database: PostgreSQL (player_service_db)
- Responsibilities:
  - Player identity management
  - Stats tracking
  - Inventory management
  - Achievement tracking
  - Tier progression
  - Social graph

#### Token Economy Service
- Port: 3004
- Database: PostgreSQL (token_service_db)
- Responsibilities:
  - Token transfers
  - Redemption processing
  - Marketplace transactions
  - Revenue sharing calculations
  - Ledger reconciliation
  - Audit reporting

#### Social Validation Service
- Port: 3005
- Database: PostgreSQL (social_service_db)
- Responsibilities:
  - Community voting on proofs
  - Witness management
  - Reputation scoring
  - Badge awarding
  - Dispute resolution
  - Community health scoring

#### Notification Service
- Port: 3006
- Database: PostgreSQL (notification_service_db)
- Responsibilities:
  - Push notifications
  - Email notifications
  - In-app alerts
  - Event triggering
  - Broadcast messaging
  - Task reminders
  - Leaderboard updates

#### Additional Services (Deployed in Phase 2)
- **Worldwalker Service** (Port 3007)
- **Enterprise Service** (Port 3008)
- **Analytics Service** (Port 3009)
- **Search Service** (Port 3010) - Elasticsearch

---

### Layer 4: AI/ML Layer

#### Verification AI Service
**Purpose:** Ensure proof authenticity

**Endpoints:**
- `POST /verify/image` - Analyze proof image
- `POST /verify/location` - Validate GPS coordinates
- `POST /verify/timestamp` - Check time validity
- `POST /verify/comprehensive` - Full proof verification

**Image Analysis Pipeline:**
```
Input Image
    ↓
Face Detection (MTCNN)
    ↓
Liveness Check (Anti-spoofing)
    ↓
Object Detection (YOLO v5)
    ↓
Authenticity Scoring
    ↓
Quality Assessment
    ↓
Output: Score (0-100) + Confidence + Flags
```

**GPS Validation:**
- Check if location is within quest zone (±50m radius)
- Validate GPS accuracy (within 15m accuracy)
- Detect impossible movement (>100 km/h)
- Check for spoofing patterns (jumps between continents)

**Timestamp Analysis:**
- Verify timestamp against blockchain for tamper-proofing
- Check if timestamp matches actual submission time
- Detect pattern anomalies (multiple submissions in 1 second)

---

#### Recommendation AI Service
**Purpose:** Personalize quest & reward suggestions

**Endpoints:**
- `POST /recommend/quests` - Suggest quests
- `POST /recommend/difficulty` - Recommend difficulty
- `POST /recommend/rewards` - Suggest redemptions
- `POST /recommend/partners` - Suggest partners to follow

**Recommendation Algorithm:**
```
User Features:
├─ Skill level
├─ Location
├─ Time availability
├─ Category preferences
├─ Difficulty history
└─ Social network

        ↓

Collaborative Filtering:
├─ Similar users' choices
├─ Item similarity
└─ Hybrid filtering

        ↓

Ranking:
├─ Relevance score
├─ Diversity score
├─ Novelty score
└─ Engagement score

        ↓

Output: Ranked recommendation list (top 10)
```

---

#### Impact Simulation AI Service
**Purpose:** Forecast national impact

**Endpoints:**
- `POST /simulate/national-impact` - 12-month forecast
- `POST /simulate/regional-impact` - Regional breakdown
- `POST /simulate/cohort-impact` - Cohort comparison

**Simulation Model:**
```
Historical Data (12 months)
    ↓
Trend Analysis
├─ Linear regression
├─ Time-series decomposition
├─ Seasonality analysis
└─ Anomaly detection
    ↓
Feature Engineering
├─ External factors (GDP, employment)
├─ Seasonal patterns
├─ Policy changes
└─ Social events
    ↓
ML Model
├─ XGBoost Regression
├─ ARIMA
├─ Prophet
└─ Ensemble methods
    ↓
Output: Point forecast + confidence intervals + sensitivity analysis
```

---

### Layer 5: Data Infrastructure Layer

#### PostgreSQL (Primary Relational Database)

**Schema Organization:**

```sql
-- Core Tables
├─ public.player
├─ public.quest
├─ public.player_quest
├─ public.evidence

-- Immutable Tables (Append-only)
├─ public.impact_log (clustered index on timestamp)
├─ public.token_ledger (clustered index on timestamp)
├─ public.witness (social validation records)
└─ public.verification_audit (AI decisions)

-- Enterprise Tables
├─ public.stakeholder
├─ public.business_domain
├─ public.stakeholder_revenue
├─ public.partnership
├─ public.government_budget
├─ public.tourism_entity
└─ public.tourism_impact

-- Supporting Tables
├─ public.achievement_definition
├─ public.badge_definition
├─ public.zone_definition
├─ public.quest_category
└─ public.regional_configuration
```

**Performance Optimization:**
- Partitioning by date on impact_log (monthly partitions)
- Indexes on frequently queried columns (player_id, quest_id, created_at)
- Materialized views for common aggregations
- Connection pooling (PgBouncer, 200 connections)
- Read replicas for analytics queries

**Backup Strategy:**
- Hourly WAL archiving (WAL-E)
- Daily full backups (S3)
- Weekly incremental backups
- Point-in-time recovery (30-day window)

---

#### MongoDB (Telemetry & Events)

**Collections:**

```javascript
// Event Collections
db.quest_events           // Quest start/complete/abandon
db.player_activity       // Player login/logout/achievement
db.proof_verification    // AI verification results
db.social_validation     // Community voting records
db.system_events         // API errors, performance issues

// Time-Series Collections
db.daily_metrics         // National stats (daily rollup)
db.hourly_activity       // Real-time activity
db.user_metrics          // Per-user engagement
db.system_metrics        // API latency, error rates

// Feature Collections
db.leaderboard_cache     // Top 100 by region
db.trending_quests       // Popular quests this week
db.recommended_content   // Personalized recommendations
db.community_highlights  // Featured achievements
```

**TTL Index Configuration:**
```javascript
// Auto-delete old events after 90 days
db.quest_events.createIndex({ created_at: 1 }, { expireAfterSeconds: 7776000 })

// Keep hourly data for 1 year
db.hourly_activity.createIndex({ created_at: 1 }, { expireAfterSeconds: 31536000 })

// Permanent monthly rollups
// No TTL index - kept forever
```

---

#### S3 (Object Storage)

**Bucket Structure:**

```
s3://oneheart-media/
├─ proofs/
│  ├─ {proofId}/
│  │  ├─ image.jpg (resized: 100x100, 400x400, original)
│  │  ├─ video.mp4 (transcoded: 480p, 720p, 1080p)
│  │  └─ metadata.json (timestamp, size, hash)
│  └─ ... (one dir per proof)
│
├─ profiles/
│  ├─ {playerId}/
│  │  ├─ avatar.png (resized: 50x50, 200x200, original)
│  │  └─ banner.jpg (optimized for web)
│  └─ ... (one dir per player)
│
├─ exports/
│  ├─ national_report_2025_Q1.pdf
│  ├─ government_audit_2025_01_15.csv
│  ├─ compliance_attestation.pdf
│  └─ tournament_results_2025_01_10.json
│
├─ backups/
│  ├─ daily/
│  │  ├─ 2025_01_10/
│  │  │  ├─ player_service_db.dump
│  │  │  ├─ impact_service_db.dump
│  │  │  └─ token_service_db.dump
│  │  └─ ...
│  └─ weekly/
│
├─ analytics/
│  ├─ 2025_01_10/
│  │  ├─ events_2025_01_10.parquet
│  │  ├─ metrics_2025_01_10.parquet
│  │  └─ errors_2025_01_10.parquet
│  └─ ...
│
└─ ai_models/
   ├─ verification_v2.pb (verification AI)
   ├─ recommendation_v1.pb (recommendation engine)
   ├─ impact_sim_v3.pb (impact forecasting)
   └─ VERSION.txt (model tracking)
```

**Lifecycle Policies:**
- Hot (0-30 days): Standard storage, immediate access
- Warm (30-365 days): Infrequent access tier
- Cold (365-2555 days, 7 years): Archival tier
- Deep freeze (>2555 days): Glacier deep archive

---

#### Immutable Ledger (PostgreSQL Append-Only)

**Implementation Strategy:**

```sql
-- Create append-only table (prevent updates/deletes)
CREATE TABLE impact_ledger (
    id BIGSERIAL PRIMARY KEY,
    player_id UUID NOT NULL,
    quest_id UUID NOT NULL,
    xp_awarded INTEGER NOT NULL,
    token_awarded DECIMAL NOT NULL,
    impact_value DECIMAL NOT NULL,
    breakdown JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    merkle_hash VARCHAR(64) NOT NULL,
    signature VARCHAR(128) NOT NULL,
    verified_by_auditor BOOLEAN DEFAULT FALSE
);

-- Trigger to prevent updates
CREATE OR REPLACE FUNCTION prevent_update_trigger()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'INSERT-only table. Updates not allowed.';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER impact_ledger_prevent_update
BEFORE UPDATE ON impact_ledger
FOR EACH ROW
EXECUTE FUNCTION prevent_update_trigger();

-- Cluster on timestamp for efficient range queries
CLUSTER impact_ledger USING impact_ledger_created_at_idx;
```

**Verification Process:**
```
Monthly Ledger Verification:

1. Extract all records from month
2. Calculate Merkle root hash
3. Sign with auditor private key
4. Generate cryptographic proof
5. Publish to immutable storage (Arweave or blockchain)
6. Create government attestation certificate
7. Archive to compliance S3 bucket
```

---

#### Redis (Caching Layer)

**Cache Keys & Strategies:**

```
player:{playerId}:stats
├─ TTL: 5 minutes
├─ Pattern: Hash (level, xp, tokens, achievements)
└─ Invalidation: On XP award, token transfer

leaderboard:{region}:daily
├─ TTL: 1 hour
├─ Pattern: Sorted set (player_id → score)
└─ Invalidation: On daily reset

quest:available:{region}
├─ TTL: 15 minutes
├─ Pattern: List (quest_ids)
└─ Invalidation: On new quest creation

player:{playerId}:inventory
├─ TTL: 1 minute
├─ Pattern: Hash (item_id → quantity)
└─ Invalidation: On purchase, equip

session:{sessionId}
├─ TTL: 24 hours (or custom)
├─ Pattern: Hash (user_id, permissions, metadata)
└─ Invalidation: On logout

rate_limit:{userId}:{endpoint}
├─ TTL: 60 seconds
├─ Pattern: Integer (request_count)
└─ Invalidation: Auto-expire

feature_flag:{flagName}
├─ TTL: 1 hour
├─ Pattern: String (enabled/disabled)
└─ Invalidation: On admin override
```

**Cache Invalidation Strategy:**
```
Event-Driven Invalidation:

QuestCompleted Event
    → Invalidate player:stats
    → Invalidate leaderboard:daily
    → Invalidate player:inventory
    → Invalidate national:metrics

TokenTransferred Event
    → Invalidate player:stats (sender & receiver)
    → Invalidate leaderboard:wealth
    → Invalidate national:metrics

LeveledUp Event
    → Invalidate player:stats
    → Invalidate leaderboard:daily
    → Publish achievement notification
```

---

## 🚀 Deployment Architecture

### Development Environment
```
Local Machine:
├─ Docker Compose (5 containers)
│  ├─ Backend API (Node.js)
│  ├─ PostgreSQL
│  ├─ Redis
│  ├─ Mongo (optional)
│  └─ Adminer (DB GUI)
└─ Mobile Emulator (Android/iOS)
```

### Staging Environment
```
AWS/GCP Cloud:
├─ Kubernetes Cluster (2-3 nodes)
│  ├─ API Services (3 replicas)
│  ├─ Microservices (1-2 replicas each)
│  ├─ PostgreSQL (managed, RDS)
│  ├─ Redis Cluster (managed)
│  └─ MongoDB Atlas
│
├─ CDN (CloudFront)
├─ SSL/TLS (AWS Certificate Manager)
└─ DNS (Route53)
```

### Production Environment
```
Multi-Region AWS/GCP:
├─ Primary Region (US-East)
│  ├─ Kubernetes Cluster (5-10 nodes)
│  │  ├─ API Services (5+ replicas)
│  │  ├─ Microservices (2-3 replicas each)
│  │  └─ AI Services (2 replicas each)
│  │
│  ├─ PostgreSQL (Multi-AZ, automated failover)
│  ├─ Redis Cluster (3 nodes, automatic failover)
│  ├─ S3 (cross-region replication)
│  └─ Elasticsearch Cluster (3+ nodes)
│
├─ Secondary Region (AP-Singapore)
│  ├─ Read-only replica cluster
│  ├─ Database read replicas
│  └─ Regional CDN edge
│
├─ Global Services
│  ├─ CloudFront (global CDN)
│  ├─ Route53 (DNS + health checks)
│  ├─ AWS WAF (DDoS protection)
│  └─ Certificate Manager (TLS)
│
└─ Monitoring & Logging
   ├─ Prometheus (metrics)
   ├─ Grafana (dashboards)
   ├─ ELK Stack (centralized logging)
   └─ Jaeger (distributed tracing)
```

---

## 📈 Scalability Considerations

### Horizontal Scaling
- **Stateless Services:** All API services can be scaled by adding replicas
- **Database:** PostgreSQL read replicas for query scaling
- **Cache:** Redis cluster for distributed caching
- **Storage:** S3 scales automatically

### Vertical Scaling
- **Node Size:** Scale individual K8s nodes from 2 CPU to 16+ CPU
- **Database:** Increase instance class (db.t3.medium → db.r5.2xlarge)
- **Redis:** Increase memory (2GB → 256GB+)

### Load Balancing
- **Kubernetes Service:** Distributes traffic to pods
- **Ingress Controller (NGINX):** Routes external traffic
- **API Gateway:** Implements rate limiting & routing

---

## 🔐 Security Architecture

### Network Security
- **TLS/SSL:** All traffic encrypted in transit
- **VPC Isolation:** Microservices in private subnets
- **Network Policies:** Pod-to-pod communication restricted
- **WAF Rules:** Prevent SQL injection, XSS, DDoS

### Data Security
- **At Rest:** AES-256 encryption for databases & S3
- **Secrets Management:** HashiCorp Vault or AWS Secrets Manager
- **Row-Level Security:** Users can only access own data
- **Backup Encryption:** All backups encrypted with KMS

### Application Security
- **Input Validation:** Strict schema validation on all inputs
- **Authentication:** JWT with RS256 signing
- **Authorization:** RBAC at service level
- **Audit Logging:** All actions logged with user/timestamp

---

## 🎯 Current Implementation Status

**✅ Deployed in Production:**
- API Gateway
- Quest Service
- Impact Engine Service
- Player Profile Service
- Verification AI (basic)
- PostgreSQL with 15 tables
- Redis caching layer
- Basic monitoring

**🔄 In Development:**
- Recommendation AI
- Impact Simulation AI
- Elasticsearch integration
- Mobile app UI refinement
- Tourism entity tracking

**⏳ Planned:**
- Multi-region deployment
- Blockchain ledger integration
- Advanced analytics dashboard
- ML model versioning system

---

## 📞 Next Steps

1. **Database Migration** - Run migrations for all 15 tables
2. **Mobile Deployment** - Deploy to beta testers
3. **AI Integration** - Deploy verification + recommendation engines
4. **Pilot Testing** - Launch with 10-30 real users
5. **Monitoring Setup** - Configure Prometheus + Grafana
6. **Partner Integration** - Connect real government/NGO partners

---

**Repository:** github.com/doxkill-collab/codespaces-blank  
**Status:** ✅ Architecture Complete - Ready for Pilot
