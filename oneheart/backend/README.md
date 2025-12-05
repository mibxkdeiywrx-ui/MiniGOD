# OneHeart Backend - Impact Engine Implementation

This is the core backend service for OneHeart OS, implementing the **Impact Engine** that calculates rewards, manages player progression, and tracks community impact.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Player Mobile App                         │
│                   (Expo React Native)                        │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  Express.js REST API                         │
│              (http://localhost:3000/api)                    │
├─────────────────────────────────────────────────────────────┤
│ Routes:                                                      │
│  • /quests/* - Quest assignment & completion                │
│  • /players/* - Player stats & history                       │
│  • /tokens/* - Token balance & transfers                     │
│  • /proof/* - Proof submission & verification               │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│               Service Layer (TypeScript)                     │
├─────────────────────────────────────────────────────────────┤
│  • impact.service.ts - XP/token calculation                  │
│  • proofs.ts - Proof verification logic                      │
│  • (future) verification.service.ts - AI verification       │
│  • (future) economy.service.ts - marketplace                │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              Database Layer (Prisma ORM)                     │
│                   (PostgreSQL)                              │
├─────────────────────────────────────────────────────────────┤
│ Tables:                                                      │
│  • Player - Character stats & progression                    │
│  • Quest - Mission templates                                 │
│  • PlayerQuest - Quest assignments                           │
│  • ImpactLog - Immutable reward records                      │
│  • TokenLedger - Transaction history                         │
│  (+ Proof, Evidence, Verification, ImpactScore tables)      │
└─────────────────────────────────────────────────────────────┘
```

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up Database

```bash
# Create and initialize PostgreSQL database
npm run prisma:migrate

# Populate test data
npm run prisma:seed
```

### 3. Start Development Server

```bash
npm run dev
```

Server runs on `http://localhost:3000`

### 4. Test the API

```bash
# Health check
curl http://localhost:3000/health

# List quests for Alice
curl "http://localhost:3000/api/quests/available?playerId=player_alice"

# Complete a quest
curl -X POST http://localhost:3000/api/quests/quest_cleanup_1/complete \
  -H "Content-Type: application/json" \
  -d '{
    "playerId": "player_alice",
    "proofUrl": "https://example.com/proof.jpg",
    "durationMinutes": 45,
    "authenticityScore": 95
  }'
```

## File Structure

```
backend/
├── src/
│   ├── index.ts                    # Express app & server startup
│   ├── db.ts                       # Prisma client singleton
│   ├── services/
│   │   └── impact.service.ts       # Core impact calculation logic
│   └── routes/
│       ├── impact.ts               # Impact Engine API routes
│       └── proofs.ts               # Proof submission routes
├── prisma/
│   ├── schema.prisma               # Database schema (5 MVP tables)
│   └── seed.ts                     # Test data seeding
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Dependencies & scripts
└── README.md                       # This file
```

## Core Services

### 1. Impact Engine (`impact.service.ts`)

Calculates XP and tokens from player actions.

**Main Functions:**

```typescript
// Calculate impact from quest
calculateQuestImpact(
  playerId: string,
  questId: string,
  durationMinutes: number,
  authenticityScore?: number,
  beneficiariesCount?: number
): Promise<ImpactCalculation>

// Award player for completing quest
awardQuestCompletion(
  playerId: string,
  questId: string,
  proofUrl: string,
  durationMinutes: number,
  authenticityScore?: number,
  beneficiariesCount?: number
): Promise<AwardResult>

// Get player stats
getPlayerStats(playerId: string): Promise<PlayerStats>

// Record token transaction
recordTokenTransaction(
  playerId: string,
  amount: number,
  type: 'mint' | 'burn' | 'transfer' | 'redeem',
  source: string
): Promise<void>
```

**Impact Calculation Formula:**

```
baseXp = mission_type_xp + (duration_minutes / 10)

Multipliers:
  - Zone Difficulty (1.0x - 1.5x)
  - Community Health Bonus (1.2x)
  - Player Level (diminishing returns at 9+)
  - Authenticity Score (0-100%)
  - Time Sensitivity (crisis/event: 2x-3x)

finalXp = baseXp × zone_difficulty × community_health × player_level × authenticity × time_sensitivity

tokens = floor(finalXp / 10) + (authenticity >= 95 ? bonus : 0)
```

### 2. Quest Routes (`routes/impact.ts`)

REST API endpoints for quest and player management.

**Endpoints:**
- `POST /quests/assign` - Assign quest to player
- `GET /quests/available` - List difficulty-matched quests
- `POST /quests/{id}/complete` - Complete quest and award impact
- `GET /players/{id}/stats` - Get player stats
- `GET /players/{id}/history` - Get impact history (30 days)
- `POST /tokens/transfer` - Transfer between players
- `GET /tokens/balance` - Check token balance
- `POST /tokens/redeem` - Redeem tokens for rewards

See [API_DOCUMENTATION.md](../API_DOCUMENTATION.md) for full details.

## Database Schema

### Player
```
id:         string (UUID)
name:       string
level:      integer (1-10)
xpTotal:    integer
stats:      JSON { strength, wisdom, charisma, constitution }
alignment:  string (service|growth|community|wisdom)
createdAt:  timestamp
```

### Quest
```
id:           string (UUID)
title:        string
category:     string (cleanup|training|cultural|research|sports)
difficulty:   integer (1-5)
baseXp:       integer
baseTokens:   integer
regionId:     string
requirements: JSON { minLevel, ... }
```

### PlayerQuest
```
id:          string (UUID)
playerId:    string (FK → Player)
questId:     string (FK → Quest)
status:      string (available|active|completed|abandoned)
proofUrl:    string (optional)
score:       integer (0-100, authenticity)
completedAt: timestamp (optional)
```

### ImpactLog
```
id:            string (UUID)
playerId:      string (FK → Player)
questId:       string (FK → Quest)
xpAwarded:     integer
tokenAwarded:  integer
impactValue:   float
breakdown:     JSON { local: 0.5, national: 0.3, global: 0.2 }
timestamp:     timestamp
```

### TokenLedger
```
id:            string (UUID)
playerId:      string (FK → Player)
amount:        integer (signed)
type:          string (mint|burn|transfer|redeem)
source:        string
transactionId: string (idempotency key)
timestamp:     timestamp
```

## NPM Scripts

```bash
npm run dev                    # Start dev server (with hot reload)
npm run build                  # Compile TypeScript to dist/
npm start                      # Run compiled JavaScript
npm run prisma:generate        # Generate Prisma client
npm run prisma:migrate         # Run database migrations
npm run prisma:seed            # Populate test data
npm run db:setup               # Run migrate + seed
```

## Development Workflow

### 1. Update Schema

Edit `prisma/schema.prisma`, then run:

```bash
npm run prisma:migrate
```

This creates a migration and applies it to the database.

### 2. Add New Routes

Create `src/routes/mynewfeature.ts`:

```typescript
import { Router } from 'express';

const router = Router();

router.get('/myroute', (req, res) => {
  res.json({ message: 'Hello' });
});

export default router;
```

Then mount in `src/index.ts`:

```typescript
import myRouter from './routes/mynewfeature';
app.use('/api', myRouter);
```

### 3. Add Service Logic

Create `src/services/myfeature.service.ts` with pure functions:

```typescript
export async function doSomething(input: string): Promise<Result> {
  // business logic
}
```

Import in routes:

```typescript
import { doSomething } from '../services/myfeature.service';

router.post('/action', async (req, res) => {
  const result = await doSomething(req.body.input);
  res.json(result);
});
```

## Testing

### Manual Testing

Use the provided test suite in [API_DOCUMENTATION.md](../API_DOCUMENTATION.md):

```bash
# Complete a quest flow
curl -X POST http://localhost:3000/api/quests/assign \
  -H "Content-Type: application/json" \
  -d '{"playerId": "player_alice", "questId": "quest_cleanup_1"}'

curl -X POST http://localhost:3000/api/quests/quest_cleanup_1/complete \
  -H "Content-Type: application/json" \
  -d '{
    "playerId": "player_alice",
    "proofUrl": "https://example.com/proof.jpg",
    "durationMinutes": 45,
    "authenticityScore": 95,
    "beneficiariesCount": 3
  }'

curl http://localhost:3000/api/players/player_alice/stats
```

### Integration Testing

(Future: Jest + Supertest)

```bash
npm test
```

### Database Testing

Check database state:

```bash
# Via Adminer UI (http://localhost:8080)
# Login: PostgreSQL, localhost, postgres, root password

# Or via psql:
psql postgresql://root:root@localhost:5432/oneheart_dev
```

## Environment Variables

Create `.env` file in backend directory:

```env
# Database
DATABASE_URL="postgresql://root:root@localhost:5432/oneheart_dev"

# Server
PORT=3000
NODE_ENV=development

# (Future) AI Services
VERIFICATION_AI_URL=http://localhost:5001
IMPACT_ENGINE_URL=http://localhost:5002

# (Future) Auth
JWT_SECRET=your_secret_key_here
```

### Docker Compose Setup

Start PostgreSQL locally:

```bash
cd ../infra
docker-compose up -d

# Check it's running
docker-compose ps

# View logs
docker-compose logs postgres
```

This starts:
- **PostgreSQL** on port 5432
- **Adminer** (DB UI) on port 8080
- **PgAdmin** (Alternative UI) on port 5050

## Performance Optimization

### Current (Development)
- Single Express instance
- No caching
- Synchronous database queries

### Future (Production)
- Load balancing (multiple Express instances)
- Redis caching for player stats & quest lists
- Query optimization (indexes, batch operations)
- Connection pooling (PgBouncer)
- CDN for proof images
- Read replicas for analytics

## Logging & Debugging

### Console Logging

```typescript
console.log('ℹ️ Info:', data);
console.warn('⚠️ Warning:', data);
console.error('❌ Error:', error);
```

### Request Logging

(Future: Morgan middleware)

```typescript
import morgan from 'morgan';
app.use(morgan('combined'));
```

### Database Query Logging

```env
DATABASE_URL="postgresql://...?schema=public&log=query"
```

## Error Handling

All errors return JSON:

```json
{
  "error": "Description of error",
  "code": "PLAYER_NOT_FOUND",
  "details": {}
}
```

Standard HTTP status codes:
- `200` - Success
- `400` - Bad request (validation error)
- `401` - Unauthorized (auth required)
- `404` - Not found
- `500` - Server error

## Security Considerations

### Current (Development)
- No authentication
- No input validation
- No rate limiting
- No HTTPS

### Future (Production)
- JWT authentication
- Input validation (Zod/Joi)
- Rate limiting (express-rate-limit)
- HTTPS/TLS
- SQL injection prevention (Prisma handles this)
- XSS prevention (res.json() is safe)
- CORS configuration
- Helmet.js for security headers

## Deployment

### Local Development
```bash
npm run dev
```

### Docker Deployment
```bash
docker build -t oneheart-backend .
docker run -p 3000:3000 --env-file .env oneheart-backend
```

### Production (Kubernetes)
See [DEPLOYMENT_ARCHITECTURE.md](../DEPLOYMENT_ARCHITECTURE.md)

## Troubleshooting

### Database Connection Error
```
Error: Connection refused
```
Solution: Ensure PostgreSQL is running via Docker:
```bash
docker-compose up -d
npm run prisma:migrate
```

### TypeScript Errors
```
npm run build
```
Check for type mismatches and fix.

### Port Already in Use
```
Error: listen EADDRINUSE :::3000
```
Solution: Change PORT in .env or kill existing process:
```bash
lsof -i :3000
kill -9 <PID>
```

### Prisma Schema Issues
```bash
npm run prisma:generate
npm run prisma:migrate
```

## Next Steps

1. **Verification AI Integration** - Call external verification service
2. **Marketplace** - Redeem tokens for real items/services
3. **Social Features** - Witness rewards, guilds
4. **Analytics** - Impact dashboard, charts
5. **Mobile App** - Expo integration with API
6. **Authentication** - JWT login/registration
7. **Testing** - Unit & integration test suite

## References

- [API Documentation](../API_DOCUMENTATION.md)
- [Impact Engine Specification](../IMPACT_ENGINE_SPEC.md)
- [System Flow](../SYSTEM_FLOW.md)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Guide](https://expressjs.com)

## Contributing

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes following code style
3. Test with `npm run dev`
4. Commit: `git commit -m "feat: add my feature"`
5. Push: `git push origin feature/my-feature`
6. Open PR to `main`

## License

OneHeart OS - All Rights Reserved for human dignity

---

**Sacred Principle:**
> ทำคนให้เป็นมนุษย์ ทำมนุษย์ให้เป็นมนุษย์ยิ่งๆขึ้นไป
> 
> "Make people human, make humans more humane"
