# IMPACT ENGINE SPECIFICATION

Complete specification for OneHeart's Impact Engine: the core system that converts real-world actions into measurable economic and social value.

---

## System Overview

```
+--------------------------------------------------------+
|                  ONEHEART IMPACT ENGINE                |
+--------------------------------------------------------+
|  Inputs:                                                |
|    • Real-world actions (verified via Proof Layer)    |
|    • Evidence (photo/video/GPS/time/metadata)         |
|    • Community validation & peer witness              |
|    • Historical player profile & context              |
|                                                        |
|  Processing:                                            |
|    • Integrity AI scoring (authenticity check)        |
|    • Impact quantification (XP/IU calculation)        |
|    • Multiplier application (difficulty, zone, etc)   |
|    • Ledger recording (append-only transaction)       |
|                                                        |
|  Outputs:                                               |
|    • XP progression (visible player stat)             |
|    • Heart Tokens (spendable currency)                |
|    • Impact Credits (internal accounting)             |
|    • Badges & unlocks (achievement rewards)           |
|    • Policy Insights (anonymized aggregates)          |
|    • Fund allocations (Local/National/Global)         |
+--------------------------------------------------------+
        ↑                                    ↓
         Citizens (Players)      Gov / Sponsors / NGOs
```

---

## Inputs

### 1. Real-World Action (from Proof Layer)

**Data fields:**
```json
{
  "action_id": "uuid",
  "user_did": "did:...",
  "mission_id": "mission_123",
  "mission_type": "cleanup|training|cultural|research|sports",
  "zone_id": "zone_456",
  "zone_type": "tourism_point|needs_area|community_node|crisis|eco",
  "action_timestamp": "2024-12-04T10:30:00Z",
  "location": { "lat": 13.7563, "lng": 100.5018 },
  "duration_minutes": 120,
  "beneficiaries_count": 5,
  "evidence_media": ["photo_hash_1", "photo_hash_2"],
  "peer_witnesses": 2,
  "player_level": 5,
  "player_inventory": { "badges": ["eco_warrior", "mentor"] }
}
```

### 2. Evidence Authenticity (from Integrity AI)

**Data fields:**
```json
{
  "action_id": "uuid",
  "authenticity_score": 92,
  "anti_cheat_flags": [],
  "deepfake_check": "pass",
  "geolocation_plausibility": "valid",
  "timestamp_plausibility": "valid",
  "pattern_abuse_risk": "low",
  "human_review_required": false,
  "verification_timestamp": "2024-12-04T10:35:00Z"
}
```

### 3. Community Validation

**Optional peer witness signals:**
- Upvotes/downvotes from other players who participated
- Mentor or moderator sign-off
- NGO partner confirmation (for official missions)

---

## Processing Pipeline

### Stage 1: Input Validation

```
IF authenticity_score < 70 → REJECT (flag for human review)
IF timestamp outside mission window → REJECT
IF location outside zone bounds → REJECT
ELSE → PROCEED to Impact Calculation
```

### Stage 2: Impact Quantification

**Base XP Calculation:**

```
base_xp = mission_type_xp + (duration_minutes / 10)

where:
  cleanup_xp = 50
  training_xp = 100
  cultural_xp = 75
  research_xp = 150
  sports_xp = 80
```

**Example:**
- 2-hour cleanup mission
- base_xp = 50 + (120 / 10) = 50 + 12 = 62 XP

### Stage 3: Multiplier Application

**Multiplier formula:**

```
final_xp = base_xp 
           × zone_difficulty_multiplier
           × community_health_bonus
           × player_level_penalty_or_bonus
           × authenticty_confidence_adjustment
           × time_sensitivity_bonus
```

**Detailed multipliers:**

1. **Zone Difficulty (0.5x – 2.0x)**
   - Tourism Point (easy): 0.8x
   - Needs Area (medium): 1.0x
   - Community Node (medium): 1.2x
   - Crisis Zone (hard, time-sensitive): 1.5x
   - Eco-Restoration (hard, long-term): 2.0x

2. **Community Health Bonus (0.8x – 1.5x)**
   - Declining community: 0.8x
   - Stable community: 1.0x
   - Growing community: 1.2x
   - Thriving community: 1.5x

3. **Player Level Penalty/Bonus (0.5x – 1.5x)**
   - Level 1–2: 1.5x (beginner boost)
   - Level 3–5: 1.2x
   - Level 6–8: 1.0x (baseline)
   - Level 9+: 0.8x (diminishing returns)

4. **Authenticity Confidence (0.7x – 1.0x)**
   - Score 50–69: 0.7x
   - Score 70–89: 0.85x
   - Score 90–100: 1.0x

5. **Time Sensitivity Bonus (1.0x – 1.5x)**
   - Normal mission: 1.0x
   - Crisis response (within 24h): 1.5x
   - Event missions (time-limited): 1.2x

**Example (full calculation):**
```
base_xp = 62
zone_difficulty = 1.0 (Needs Area)
community_health = 1.2 (Growing)
player_level = 1.0 (Level 5)
authenticity = 0.92 (Score 92)
time_sensitivity = 1.0 (Normal)

final_xp = 62 × 1.0 × 1.2 × 1.0 × 0.92 × 1.0
         = 62 × 1.104
         = 68.4 ≈ 68 XP
```

### Stage 4: Secondary Outputs

**Impact Credits (IU) Calculation:**

```
impact_credits = base_xp × beneficiary_multiplier × outcome_quality

beneficiary_multiplier = beneficiaries_count / 5 (e.g., 5 people = 1.0x)
outcome_quality = estimated from mission type (0.5 – 2.0)

Example: 68 XP × 1.0 (5 beneficiaries) × 1.2 (training outcome) = 81.6 IU
```

**Heart Tokens:**

```
heart_tokens = floor(base_xp / 10) + bonus_tokens

base_rate: 10 XP = 1 Heart Token
bonus: +1 token for authenticity_score >= 95

Example: 68 XP / 10 = 6 tokens (+ 1 bonus = 7 tokens)
```

**Badge Logic (on completion):**

```
IF total_cleanup_actions >= 10 AND hasn't_earned_badge → UNLOCK "Eco Warrior"
IF total_mentoring_actions >= 5 → UNLOCK "Mentor"
IF max(player_impact_credits) >= 500 → UNLOCK "Impact Maker"
IF player_level >= 10 AND completed_global_mission → UNLOCK "Worldwalker"
```

### Stage 5: Ledger Recording

**Append-only transaction:**

```json
{
  "ledger_id": "ledger_12345",
  "action_id": "uuid",
  "user_did": "did:...",
  "xp_delta": 68,
  "tokens_delta": 7,
  "impact_credits_delta": 81.6,
  "badges_earned": ["eco_warrior"],
  "ledger_timestamp": "2024-12-04T10:36:00Z",
  "idempotency_key": "sha256(action_id + user_did)",
  "fund_allocation": {
    "local_fund": 0.5,
    "national_fund": 0.3,
    "worldwalker_fund": 0.2
  }
}
```

---

## Outputs

### 1. Player Progression

**Real-time updates:**
- XP bar progresses toward next level
- Token balance increases
- Badges appear in inventory
- Level-up triggers mission unlocks

**Level progression:**
```
Level 1: 0–100 XP
Level 2: 100–300 XP
Level 3: 300–600 XP
Level 4: 600–1000 XP
Level 5: 1000–1500 XP
...
Level 10: 5000–7000 XP
```

### 2. Economic Rewards

**Heart Tokens:**
- Spendable in Reward Marketplace
- Redeemable for travel gear, experiences, education
- Transferable (optional) for social missions

**Token Burn (sinks):**
- Marketplace redemption (direct sink)
- Sponsorship tier access (e.g., "Gold tier requires 500 tokens")
- Reward marketplace price inflation if demand high

### 3. Quest/Mission System

**Progression unlocks:**
```
Level 1–3: Local missions only
Level 5+: Unlock National missions
Level 10+: Eligible for Global/Worldwalker missions
```

**Mission allocation:**
- System recommends missions based on:
  - Player level & skills
  - Location & availability
  - Impact goals (social / environmental / economic)

### 4. Policy Insights (Anonymized)

**Aggregated dashboards for government:**
```
Daily Report:
- Total actions submitted: 1,247
- Total XP distributed: 84,400
- Total tokens minted: 8,440
- Community health index: 72/100
- Top-performing zones: [zone_id_1, zone_id_2]
- Emerging issues flagged: [crisis_zone_5]
```

**Impact ledger (public anonymized):**
- Skills trained (by category)
- Jobs created / economic value generated
- Infrastructure/community improvements
- Environmental metrics (cleanup hours, trees planted)

---

## Data Model (Database Schema)

### actions table
```sql
CREATE TABLE actions (
  id UUID PRIMARY KEY,
  user_did TEXT NOT NULL,
  mission_id UUID NOT NULL,
  zone_id UUID NOT NULL,
  action_type VARCHAR(50),
  timestamp TIMESTAMP,
  location GEOMETRY,
  duration_minutes INT,
  beneficiaries_count INT,
  peer_witnesses INT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### integrity_scores table
```sql
CREATE TABLE integrity_scores (
  id UUID PRIMARY KEY,
  action_id UUID NOT NULL UNIQUE REFERENCES actions(id),
  authenticity_score INT CHECK (authenticity_score >= 0 AND authenticity_score <= 100),
  anti_cheat_flags TEXT[],
  verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### impact_ledger table (append-only)
```sql
CREATE TABLE impact_ledger (
  id UUID PRIMARY KEY,
  action_id UUID NOT NULL REFERENCES actions(id),
  user_did TEXT NOT NULL,
  xp_delta INT NOT NULL,
  tokens_delta INT NOT NULL,
  impact_credits_delta DECIMAL NOT NULL,
  badges_earned TEXT[],
  fund_allocation JSONB,
  ledger_timestamp TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### player_state table
```sql
CREATE TABLE player_state (
  user_did TEXT PRIMARY KEY,
  current_level INT DEFAULT 1,
  total_xp INT DEFAULT 0,
  heart_tokens INT DEFAULT 0,
  impact_credits DECIMAL DEFAULT 0,
  badges TEXT[] DEFAULT '{}',
  last_updated TIMESTAMP
);
```

---

## Pilot Implementation Steps

### Week 1: Core Impact Engine
1. Implement XP calculation engine (base + multipliers)
2. Add Heart Token issuance logic
3. Create impact ledger tables and write functions
4. Wire `/api/proof/submit` endpoint to trigger impact calculation

### Week 2: Testing & Tuning
1. Run sample actions through engine
2. Verify multiplier logic with QA cases
3. Adjust multiplier values based on pilot feedback
4. Add monitoring/logging

### Week 3: Player State & Unlocks
1. Implement player state updates (level, XP, tokens)
2. Wire level-up events to mission unlock system
3. Add badge logic
4. Test end-to-end flow

### Week 4: Dashboards & Reporting
1. Create Impact Engine monitoring dashboard
2. Build aggregated policy insights export
3. Prepare pilot metrics report

---

## Success Metrics (Pilot)

| Metric | Target |
|---|---|
| Actions processed | 500+ |
| Avg authenticity score | >85% |
| Level 5+ players (%) | >30% |
| Token velocity (redemptions/week) | >100 |
| Badge distribution | 5+ badge types earned |
| Ledger consistency (0 data loss) | 100% |
| API latency (impact calc) | <500ms |

---

## Safety & Validation

- **Idempotency:** Ledger entries use `idempotency_key` to prevent double-counting
- **Append-only:** No updates/deletes to ledger (audit trail)
- **Multiplier bounds:** All multipliers capped at 0.1 – 3.0x to prevent extremes
- **Token inflation limits:** Daily mint cap = 10K tokens / day (can adjust)

---

**Owner:** Engineering Team  
**Last Updated:** December 4, 2025  
**Status:** Ready for Pilot Implementation
