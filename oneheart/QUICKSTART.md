# Quick Start Guide - OneHeart Backend

**Get the system running in 5 minutes**

## Prerequisites

- Node.js 16+ (or available in Codespaces)
- PostgreSQL (via Docker Compose)
- Git

## 1. Clone & Navigate

```bash
cd /path/to/oneheart/backend
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Start Database

From the infra directory:

```bash
cd ../infra
docker-compose up -d
```

Verify:
```bash
docker-compose ps
```

You should see:
- postgres (running on port 5432)
- adminer (UI on port 8080)

## 4. Setup Database

Back in backend directory:

```bash
npm run db:setup
```

This runs:
1. `prisma migrate` - Creates tables
2. `prisma seed` - Populates test data

Output should show:
```
🌱 Seeding database...
✅ Created 3 players
✅ Created 10 quests
✅ Assigned 8 quests
✅ Created 2 completed quests
✅ Created 2 impact logs
✅ Created 3 token transactions
```

## 5. Start Backend

```bash
npm run dev
```

Output:
```
✨ OneHeart Backend running on port 3000
   Philosophy: ONE FOR ALL
   Verify your system: http://localhost:3000/health
```

## 6. Test the API

In a new terminal:

```bash
# Health check
curl http://localhost:3000/health

# Get quests for Alice
curl "http://localhost:3000/api/quests/available?playerId=player_alice"

# Get Alice's stats
curl http://localhost:3000/api/players/player_alice/stats
```

## 7. (Optional) View Database

Open browser to **http://localhost:8080**

Login:
- System: PostgreSQL
- Server: localhost
- Username: postgres (or root)
- Password: root

## Common Commands

```bash
# Development mode (hot reload)
npm run dev

# Build for production
npm run build

# Run tests (future)
npm test

# Database migrations only
npm run prisma:migrate

# Reseed test data
npm run prisma:seed

# View database schema
cat prisma/schema.prisma
```

## API Endpoints

All requests to: `http://localhost:3000/api`

### Quests
```bash
# List quests for player
GET /quests/available?playerId=player_alice

# Assign quest
POST /quests/assign
{
  "playerId": "player_alice",
  "questId": "quest_cleanup_1"
}

# Complete quest
POST /quests/quest_cleanup_1/complete
{
  "playerId": "player_alice",
  "proofUrl": "https://example.com/proof.jpg",
  "durationMinutes": 45,
  "authenticityScore": 95
}
```

### Players
```bash
# Get stats
GET /players/player_alice/stats

# Get history (30 days)
GET /players/player_alice/history
```

### Tokens
```bash
# Check balance
GET /tokens/balance?playerId=player_alice

# Transfer tokens
POST /tokens/transfer
{
  "fromPlayerId": "player_alice",
  "toPlayerId": "player_bob",
  "amount": 10
}

# Redeem tokens
POST /tokens/redeem
{
  "playerId": "player_alice",
  "rewardId": "reward_mentor_1hr",
  "amount": 50
}
```

## Test Sequence

Complete journey from scratch:

```bash
# 1. Get Alice's current stats
curl http://localhost:3000/api/players/player_alice/stats

# 2. See available quests
curl "http://localhost:3000/api/quests/available?playerId=player_alice"

# 3. Assign a cleanup quest
curl -X POST http://localhost:3000/api/quests/assign \
  -H "Content-Type: application/json" \
  -d '{
    "playerId": "player_alice",
    "questId": "quest_cleanup_1"
  }'

# 4. Complete the quest
curl -X POST http://localhost:3000/api/quests/quest_cleanup_1/complete \
  -H "Content-Type: application/json" \
  -d '{
    "playerId": "player_alice",
    "proofUrl": "https://example.com/proof.jpg",
    "durationMinutes": 45,
    "authenticityScore": 95,
    "beneficiariesCount": 3
  }'

# 5. Check updated stats
curl http://localhost:3000/api/players/player_alice/stats

# 6. View impact history
curl http://localhost:3000/api/players/player_alice/history

# 7. Check token balance
curl "http://localhost:3000/api/tokens/balance?playerId=player_alice"
```

## Troubleshooting

### "Connection refused" Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution:** Start PostgreSQL
```bash
cd infra
docker-compose up -d
```

### "Port 3000 already in use"
```
Error: listen EADDRINUSE :::3000
```
**Solution:** Kill existing process
```bash
lsof -i :3000
kill -9 <PID>
```

Or use different port:
```bash
PORT=3001 npm run dev
```

### Database error after migration
```
Error: Migration failed
```
**Solution:** Reset and reseed
```bash
npm run prisma:migrate reset
npm run prisma:seed
```

### TypeScript compilation error
```bash
npm run build
```

Check output for type errors and fix.

## Project Structure

```
backend/
├── src/
│   ├── index.ts              # Express app entry
│   ├── db.ts                 # Prisma client
│   ├── services/
│   │   └── impact.service.ts # Impact calculation
│   └── routes/
│       ├── impact.ts         # Impact API
│       └── proofs.ts         # Proof API
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Test data
├── package.json              # Dependencies
└── README.md                 # Full guide
```

## Next Steps

1. **Explore the API**
   - Complete example quests
   - Transfer tokens between test players
   - Check impact history

2. **Review Code**
   - Read `/backend/src/services/impact.service.ts`
   - Review API endpoints in `/backend/src/routes/impact.ts`
   - Check database schema in `/backend/prisma/schema.prisma`

3. **Understand the System**
   - Read [API_DOCUMENTATION.md](../API_DOCUMENTATION.md)
   - Study [IMPACT_ENGINE_SPEC.md](../IMPACT_ENGINE_SPEC.md)
   - Review [SYSTEM_FLOW.md](../SYSTEM_FLOW.md)

4. **Extend Functionality**
   - Add verification AI integration
   - Build marketplace
   - Add authentication
   - Create mobile UI

## Documentation

- **API Docs:** [API_DOCUMENTATION.md](../API_DOCUMENTATION.md)
- **Backend Guide:** [backend/README.md](../backend/README.md)
- **Implementation:** [IMPLEMENTATION_SUMMARY.md](../IMPLEMENTATION_SUMMARY.md)
- **Impact Spec:** [IMPACT_ENGINE_SPEC.md](../IMPACT_ENGINE_SPEC.md)
- **System Flow:** [SYSTEM_FLOW.md](../SYSTEM_FLOW.md)

## Support

For issues, check:
1. Backend README troubleshooting section
2. API_DOCUMENTATION.md examples
3. IMPLEMENTATION_SUMMARY.md architecture
4. Git logs for recent changes

---

**Happy coding! 🚀**

Remember: We're building to **make humans more humane**, not rich.
