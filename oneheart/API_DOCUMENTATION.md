# OneHeart Impact Engine API

Complete REST API documentation for the Impact Engine service, Quest Management, and Token Economy.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Currently no authentication (development mode). In production:
- JWT bearer tokens required
- OAuth2 for social login
- Rate limiting per player_id

## Core Endpoints

### Quest Management

#### 1. Assign Quest to Player

**POST** `/quests/assign`

Assign an available quest to a player.

```bash
curl -X POST http://localhost:3000/api/quests/assign \
  -H "Content-Type: application/json" \
  -d '{
    "playerId": "player_alice",
    "questId": "quest_cleanup_1"
  }'
```

**Request Body:**
```json
{
  "playerId": "string (required)",
  "questId": "string (required)"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Quest assigned successfully",
  "playerId": "player_alice",
  "questId": "quest_cleanup_1"
}
```

**Error (400):**
```json
{
  "error": "Player or Quest not found"
}
```

---

#### 2. List Available Quests

**GET** `/quests/available?playerId=player_alice`

Get difficulty-matched quests available for a player.

```bash
curl -X GET "http://localhost:3000/api/quests/available?playerId=player_alice"
```

**Query Parameters:**
- `playerId` (string, required): Player ID

**Response (200):**
```json
{
  "playerId": "player_alice",
  "questCount": 10,
  "quests": [
    {
      "questId": "quest_cleanup_1",
      "title": "Park Cleanup",
      "category": "cleanup",
      "difficulty": 1,
      "baseXp": 50,
      "baseTokens": 5,
      "description": "Help clean up the local park"
    },
    {
      "questId": "quest_sports_1",
      "title": "Youth Soccer Training",
      "category": "sports",
      "difficulty": 2,
      "baseXp": 80,
      "baseTokens": 8,
      "description": "Coach local youth soccer team"
    }
  ]
}
```

---

#### 3. Complete Quest and Award Impact

**POST** `/quests/{questId}/complete`

Submit proof and complete a quest. Returns XP, tokens, and level-up status.

```bash
curl -X POST http://localhost:3000/api/quests/quest_cleanup_1/complete \
  -H "Content-Type: application/json" \
  -d '{
    "playerId": "player_alice",
    "proofUrl": "https://example.com/proof.jpg",
    "durationMinutes": 45,
    "authenticityScore": 98,
    "beneficiariesCount": 5
  }'
```

**Request Body:**
```json
{
  "playerId": "string (required)",
  "proofUrl": "string (required) - URL to proof image/video",
  "durationMinutes": "number (required) - Duration in minutes",
  "authenticityScore": "number (0-100, default: 100)",
  "beneficiariesCount": "number (default: 1)"
}
```

**Response (200):**
```json
{
  "playerId": "player_alice",
  "xpAwarded": 125,
  "tokensAwarded": 12,
  "leveledUp": false,
  "badgesEarned": []
}
```

**Response (200) - With Level-Up:**
```json
{
  "playerId": "player_alice",
  "xpAwarded": 150,
  "tokensAwarded": 15,
  "leveledUp": true,
  "newLevel": 3,
  "badgesEarned": ["Eco Warrior"]
}
```

**Impact Calculation Formula:**
```
baseXp = mission_type_xp + (duration_minutes / 10)
finalXp = baseXp × zone_difficulty × community_health × player_level_multiplier × authenticity × time_sensitivity
tokens = floor(finalXp / 10) + (authenticity_score >= 95 ? 1 : 0)
```

---

### Player Stats

#### 4. Get Player Stats

**GET** `/players/{playerId}/stats`

Get comprehensive player stats: level, XP, tokens, completed quests.

```bash
curl -X GET http://localhost:3000/api/players/player_alice/stats
```

**Path Parameters:**
- `playerId` (string, required): Player ID

**Response (200):**
```json
{
  "playerId": "player_alice",
  "name": "Alice",
  "level": 3,
  "totalXp": 2500,
  "tokenBalance": 250,
  "questsCompleted": 25,
  "alignment": "generous",
  "stats": {
    "strength": 10,
    "wisdom": 12,
    "charisma": 11,
    "constitution": 10
  },
  "createdAt": "2024-01-15T10:00:00Z"
}
```

---

#### 5. Get Player Impact History

**GET** `/players/{playerId}/history`

Get impact logs for the last 30 days showing all completed actions and rewards.

```bash
curl -X GET http://localhost:3000/api/players/player_alice/history
```

**Path Parameters:**
- `playerId` (string, required): Player ID

**Response (200):**
```json
{
  "playerId": "player_alice",
  "historyCount": 5,
  "history": [
    {
      "impactId": "imp_123",
      "questTitle": "Park Cleanup",
      "questCategory": "cleanup",
      "xpAwarded": 125,
      "tokenAwarded": 12,
      "impactValue": 150,
      "fundAllocation": {
        "local": 75,
        "national": 45,
        "global": 30
      },
      "timestamp": "2024-01-15T10:30:00Z"
    },
    {
      "impactId": "imp_124",
      "questTitle": "Youth Soccer Training",
      "questCategory": "sports",
      "xpAwarded": 85,
      "tokenAwarded": 8,
      "impactValue": 102,
      "fundAllocation": {
        "local": 51,
        "national": 31,
        "global": 20
      },
      "timestamp": "2024-01-14T14:15:00Z"
    }
  ]
}
```

---

### Token Economy

#### 6. Get Token Balance

**GET** `/tokens/balance?playerId=player_alice`

Get current token balance for a player.

```bash
curl -X GET "http://localhost:3000/api/tokens/balance?playerId=player_alice"
```

**Query Parameters:**
- `playerId` (string, required): Player ID

**Response (200):**
```json
{
  "playerId": "player_alice",
  "balance": 250,
  "level": 3,
  "totalXp": 2500,
  "lastUpdated": "2024-01-15T10:30:00Z"
}
```

---

#### 7. Transfer Tokens Between Players

**POST** `/tokens/transfer`

Transfer tokens from one player to another (gift or marketplace).

```bash
curl -X POST http://localhost:3000/api/tokens/transfer \
  -H "Content-Type: application/json" \
  -d '{
    "fromPlayerId": "player_alice",
    "toPlayerId": "player_bob",
    "amount": 50
  }'
```

**Request Body:**
```json
{
  "fromPlayerId": "string (required)",
  "toPlayerId": "string (required)",
  "amount": "number (required, > 0)"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Transfer completed",
  "from": "player_alice",
  "to": "player_bob",
  "amount": 50,
  "timestamp": "2024-01-15T10:35:00Z"
}
```

**Error (400):**
```json
{
  "error": "Insufficient balance. Current: 30, Required: 50"
}
```

---

#### 8. Redeem Tokens for Rewards

**POST** `/tokens/redeem`

Redeem tokens for marketplace rewards or services.

```bash
curl -X POST http://localhost:3000/api/tokens/redeem \
  -H "Content-Type: application/json" \
  -d '{
    "playerId": "player_alice",
    "rewardId": "reward_mentor_1hr",
    "amount": 50
  }'
```

**Request Body:**
```json
{
  "playerId": "string (required)",
  "rewardId": "string (required) - Reward/item ID",
  "amount": "number (required)"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Redemption successful",
  "playerId": "player_alice",
  "rewardId": "reward_mentor_1hr",
  "amountRedeemed": 50,
  "newBalance": 200,
  "timestamp": "2024-01-15T10:40:00Z"
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "error": "Description of what went wrong"
}
```

### Common HTTP Status Codes

- `200 OK` - Request succeeded
- `400 Bad Request` - Invalid input or business rule violation
- `401 Unauthorized` - Authentication required (future)
- `404 Not Found` - Player/Quest not found
- `500 Internal Server Error` - Server error

---

## Testing Endpoints

### Quick Test Suite

```bash
# 1. Get available quests for Alice
curl -s "http://localhost:3000/api/quests/available?playerId=player_alice" | jq

# 2. Assign quest to Alice
curl -s -X POST http://localhost:3000/api/quests/assign \
  -H "Content-Type: application/json" \
  -d '{"playerId": "player_alice", "questId": "quest_cleanup_1"}' | jq

# 3. Complete quest with impact
curl -s -X POST http://localhost:3000/api/quests/quest_cleanup_1/complete \
  -H "Content-Type: application/json" \
  -d '{
    "playerId": "player_alice",
    "proofUrl": "https://example.com/proof.jpg",
    "durationMinutes": 45,
    "authenticityScore": 95,
    "beneficiariesCount": 3
  }' | jq

# 4. Check Alice's stats
curl -s http://localhost:3000/api/players/player_alice/stats | jq

# 5. Check Alice's token balance
curl -s "http://localhost:3000/api/tokens/balance?playerId=player_alice" | jq

# 6. Get Alice's impact history
curl -s http://localhost:3000/api/players/player_alice/history | jq

# 7. Transfer tokens
curl -s -X POST http://localhost:3000/api/tokens/transfer \
  -H "Content-Type: application/json" \
  -d '{"fromPlayerId": "player_alice", "toPlayerId": "player_bob", "amount": 10}' | jq
```

---

## Database Entities

### Player
```
id:            string (primary)
name:          string
level:         integer (1-10)
xpTotal:       integer
stats:         JSON { strength, wisdom, charisma, constitution }
alignment:     enum (generous|balanced|cautious)
createdAt:     timestamp
updatedAt:     timestamp
```

### Quest
```
id:            string (primary)
title:         string
description:   string
category:      enum (cleanup|training|cultural|research|sports)
difficulty:    integer (1-5)
baseXp:        integer
baseTokens:    integer
regionId:      string
requirements:  JSON { minLevel, ... }
createdAt:     timestamp
```

### PlayerQuest
```
id:            string (primary)
playerId:      string (foreign key)
questId:       string (foreign key)
status:        enum (available|in_progress|completed|abandoned)
proofUrl:      string (nullable)
score:         integer (0-100, authenticity)
completedAt:   timestamp (nullable)
createdAt:     timestamp
```

### ImpactLog
```
id:            string (primary)
playerId:      string (foreign key)
questId:       string (foreign key)
xpAwarded:     integer
tokenAwarded:  integer
impactValue:   integer
breakdown:     JSON { local, national, global }
timestamp:     timestamp
```

### TokenLedger
```
id:            string (primary)
playerId:      string (foreign key)
amount:        integer (signed)
type:          enum (mint|burn|transfer|redeem)
source:        string (quest_completion|welcome_bonus|...)
transactionId: string (unique)
timestamp:     timestamp
```

---

## Getting Started

### 1. Start the Backend

```bash
cd backend
npm install
npm run dev
```

This starts the Express server on port 3000.

### 2. Set Up Database

```bash
npm run prisma:migrate
npm run prisma:seed
```

This creates the database and populates test data.

### 3. Test the API

```bash
curl http://localhost:3000/health
```

Should return:
```json
{
  "status": "ok",
  "service": "oneheart-backend",
  "timestamp": "2024-01-15T10:00:00Z"
}
```

---

## Integration Example (Node.js)

```typescript
import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

// Complete quest and get rewards
async function completeQuest(playerId: string, questId: string) {
  try {
    const response = await axios.post(`${API_BASE}/quests/${questId}/complete`, {
      playerId,
      proofUrl: 'https://example.com/proof.jpg',
      durationMinutes: 45,
      authenticityScore: 95,
      beneficiariesCount: 3
    });
    
    console.log(`✅ Quest completed!`);
    console.log(`   XP awarded: ${response.data.xpAwarded}`);
    console.log(`   Tokens awarded: ${response.data.tokensAwarded}`);
    if (response.data.leveledUp) {
      console.log(`   🎉 Leveled up to ${response.data.newLevel}!`);
    }
    
    return response.data;
  } catch (error) {
    console.error('❌ Failed to complete quest:', error.response.data.error);
  }
}

// Get player stats
async function getStats(playerId: string) {
  const response = await axios.get(`${API_BASE}/players/${playerId}/stats`);
  return response.data;
}

// Example usage
(async () => {
  const stats = await getStats('player_alice');
  console.log(`Alice's Level: ${stats.level}, XP: ${stats.totalXp}, Tokens: ${stats.tokenBalance}`);
})();
```

---

## Real-World Test Scenarios

### Scenario 1: New Player Journey
1. Create player (via client)
2. Get available quests → Receive 3 beginner cleanup quests
3. Complete first quest → Earn 50 XP, 5 tokens
4. Level up at 100 XP
5. Receive "Getting Started" badge

### Scenario 2: Impact Multipliers
1. Player completes same quest twice
2. First time: 50 XP (fresh)
3. Second time: 40 XP (diminishing returns for repetition)
4. Third time in crisis zone: 125 XP (3x multiplier)

### Scenario 3: Social Economy
1. Alice completes quest, earns 10 tokens
2. Alice transfers 5 tokens to Bob (gift)
3. Bob redeems 5 tokens for "1hr mentorship"
4. Tokens recorded as immutable ledger entries

---

## Performance Metrics

Expected response times (development):
- GET requests: < 100ms
- POST requests: < 200ms
- Batch queries: < 500ms

For production scaling, implement:
- Database query caching (Redis)
- API response caching (1min TTL)
- Rate limiting (1000 req/min per player)
- Load balancing across API servers
