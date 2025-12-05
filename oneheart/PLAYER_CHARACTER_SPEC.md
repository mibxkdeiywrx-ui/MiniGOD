# Player Character System — Real-Life Avatar Design

**OneHeart treats every person as a living character in an open-world RPG.**

---

## Core Concept

Every player is a **persistent digital avatar** that:
- Grows through real-world actions
- Has verifiable identity (DID + anti-bot)
- Accumulates experience and rewards
- Reflects their true impact on society

---

## 1. Identity Core

### 1.1 DID Key (Decentralized Identity)

**What it is:**
- Unique cryptographic identifier (not username, not email)
- Self-sovereign (user controls it, not OneHeart)
- Portable (can port to other platforms)
- Verifiable (linked to physical person via one-time verification)

**Structure:**
```
did:oneheart:0x7f3k9m2p... (256-bit key)
```

**Properties:**
- Created once (on signup)
- Cannot be changed
- Proves ownership of all actions / proofs
- Can revoke + create new (if compromised)

**Verification (One-Time):**
1. User provides Thai ID card / national ID
2. Photo + government ID → verified by AI + manual review
3. Hash of ID stored (not full ID for privacy)
4. DID linked to hashed identity ✓

**Why it matters:**
- Prevents Sybil attacks (1 real person = 1 DID)
- Builds trust in proof verification
- Enables reputation across systems

---

### 1.2 Anti-Bot Signature

**What it is:**
- Behavioral fingerprint (not tracking, just uniqueness)
- Prevents same person operating multiple fake accounts

**Collected (Privacy-First):**
- Device type (without ID)
- Timezone
- Language
- Unique keystroke pattern / interaction rhythm
- Geolocation variance (natural travel patterns vs. VPN jumping)

**Scoring:**
- Every action generates a signature
- ML model checks: "Is this the same person as usual?"
- If suspicious: flag for additional verification
- If confirmed: anti-bot score increases (trust badge)

**Thresholds:**
- Score > 85%: Trusted account (fast verification)
- Score 70–85%: Normal (standard verification)
- Score < 70%: Suspicious (requires human review)

**Reset:**
- User can manually request re-verification
- Lost device → reclaim account with ID + security questions

---

## 2. Player Stats

### 2.1 Travel XP (ทำประสบการณ์ต่างแดน)

**Measurement:**
- Quests completed outside home region / country
- Distance traveled (verified by GPS proof)
- New places discovered (first proof in location)
- Cultural adaptation (language used, local engagement)

**Scaling:**
```
Travel XP = distance_km × location_novelty × cultural_depth × proof_quality
```

**Example:**
- Local area quest = 10 XP
- Different province = 50 XP
- Different country = 200 XP
- First time in location = 2x multiplier

**Unlocks:**
- Travel perks (discounts on flights, hostels)
- Ascension: WorldWalker pathway (study abroad, exchange programs)
- Cosmetic: Travel badges (flags for visited countries)

**Display:**
```json
{
  "travel_xp": 1250,
  "travel_level": 8,
  "countries_visited": 12,
  "regions_explored": 45,
  "next_level_at": 1500
}
```

---

### 2.2 Social Impact XP (ทำประสบการณ์สังคม)

**Measurement:**
- Community quests completed
- People helped / reached (verified)
- Consensus score (witnesses confirmed)
- Long-term impact (proof still valid after 3 months)

**Scaling:**
```
Social Impact XP = people_reached × sustainability_factor × community_recognition
```

**Example:**
- Helped 1 person = 5 XP
- Taught 10 people = 50 XP
- Community project (50+ people) = 200 XP
- 3-month follow-up (still working) = 2x multiplier

**Unlocks:**
- Leadership roles (regional quest creator)
- Mentor badge (can help others level faster)
- Ascension: Community Leader pathway

**Display:**
```json
{
  "social_impact_xp": 3200,
  "social_impact_level": 12,
  "people_helped": 287,
  "communities_engaged": 15,
  "mentor_score": 0.82
}
```

---

### 2.3 Green XP (ทำประสบการณ์สิ่งแวดล้อม)

**Measurement:**
- Environmental quests (tree planting, waste reduction, sustainability)
- Environmental proof submitted (carbon reduction, habitat restored)
- Long-term sustainability (impact tracked over months)
- Knowledge (environmental education)

**Scaling:**
```
Green XP = environmental_units × sustainability_months × knowledge_depth
```

**Example:**
- Plant 1 tree = 10 XP
- Plant 100 trees = 300 XP
- 6 months of maintenance = 2x multiplier
- Teach others = 1.5x multiplier

**Unlocks:**
- Environmental impact certifications
- Green sponsor partnerships (solar companies, reforestation orgs)
- Ascension: Sustainability Expert pathway

**Display:**
```json
{
  "green_xp": 2100,
  "green_level": 9,
  "trees_planted": 240,
  "carbon_offset_kg": 1200,
  "sustainability_streak_months": 6
}
```

---

### 2.4 Skill Points

**What they are:**
- Earned by completing skill-building quests
- Allocated by player into chosen skill trees

**Skill Trees (Examples):**

```
Agricultural Skills
├── Basic Farming (XP: 0)
├── Organic Methods (XP: 50)
├── Permaculture Design (XP: 150)
└── Vertical Farming (XP: 300)

Tech Skills
├── Basic Coding (XP: 0)
├── Web Development (XP: 100)
├── Mobile Dev (XP: 250)
└── AI / ML (XP: 500)

Social Skills
├── Communication (XP: 0)
├── Leadership (XP: 75)
├── Conflict Resolution (XP: 150)
└── Community Organizing (XP: 300)

Education Skills
├── Teaching Basics (XP: 0)
├── Curriculum Design (XP: 100)
├── Adult Education (XP: 250)
└── Institutional Change (XP: 500)
```

**Allocation:**
- Player gets 1 skill point per quest
- Can invest in any tree (multi-specialization allowed)
- No level cap (continuous growth)
- Some quests require certain skills (gating)

**Display:**
```json
{
  "skill_points_available": 3,
  "skills": {
    "agricultural_skills": 12,
    "tech_skills": 8,
    "social_skills": 15,
    "education_skills": 6
  }
}
```

---

### 2.5 Alignment (บุคลิกภาพตัวละคร)

**What it is:**
- RPG-style alignment (not moral judgment, just play style)
- Reflects how player approaches quests + impact

**Three Axes:**

#### Axis 1: Creative ↔ Pragmatic
- **Creative**: Seeks innovative solutions, artistic expression, experimental approaches
- **Pragmatic**: Focuses on efficiency, proven methods, immediate results

**Earned by:**
- Creative: Submit proofs with novel approaches, art-based solutions
- Pragmatic: Complete quests fast, optimize resource use

#### Axis 2: Helper ↔ Explorer
- **Helper**: Focuses on direct aid, community support, mentoring
- **Explorer**: Seeks discovery, travel, new frontiers, personal growth

**Earned by:**
- Helper: Complete social impact quests, mentor others
- Explorer: Travel quests, discover new locations, ascension quests

#### Axis 3: Collaborative ↔ Independent
- **Collaborative**: Works in teams, community-focused, consensus-driven
- **Independent**: Solo projects, self-driven, leadership

**Earned by:**
- Collaborative: Group quests, witness-based proofs
- Independent: Solo quests, self-verified achievements

**Display:**
```json
{
  "alignment": {
    "creative": 0.65,
    "pragmatic": 0.35,
    "helper": 0.72,
    "explorer": 0.58,
    "collaborative": 0.80,
    "independent": 0.20
  },
  "archetype": "Creative Helper Collaborator",
  "playstyle": "Community-driven innovator"
}
```

**Impact:**
- Affects quest recommendations (show quests matching playstyle)
- Influences reward types (artists get cosmetics, pragmatists get tokens)
- Enables role specialization (healers vs. explorers in team quests)

---

## 3. Player Inventory

### 3.1 Heart Tokens (❤️)

**What they are:**
- Primary currency of OneHeart OS
- Earned through verified proofs
- Redeemable for rewards or reinvested in quests

**Earning:**
```
Heart Tokens = Impact Points × Category Multiplier × Sustainability Bonus
```

**Example:**
- Daily basic quest = 10 ❤️
- Regional impact = 50 ❤️
- National impact = 200 ❤️
- Multi-month sustained = 2x multiplier

**Using:**
- Fund new quests (crowdfunding projects)
- Unlock premium cosmetics
- Donate to shared pool (gets recognition + ascension bonus)
- Trade for real-world rewards (partner merchant discounts)

**Display:**
```json
{
  "heart_tokens_current": 450,
  "heart_tokens_lifetime": 2340,
  "heart_tokens_donated": 300,
  "heart_tokens_spent": 1590
}
```

---

### 3.2 Quest Badges

**What they are:**
- Achievements unlocked by completing quests
- Visual proof of accomplishment
- Stackable (complete same quest type 5 times = higher tier badge)

**Badge Types:**

```
Quest Badges
├── Journey Badges
│   ├── First Steps (Complete 1 quest)
│   ├── Adventurer (Complete 10 quests)
│   └── Legend (Complete 100 quests)
│
├── Category Badges
│   ├── Friend of Nature (20 green quests)
│   ├── Community Champion (30 social quests)
│   ├── World Traveler (15 travel quests)
│   └── Scholar (25 education quests)
│
├── Impact Badges
│   ├── Local Hero (100 people helped)
│   ├── Regional Impact (1000 impact points)
│   └── National Leader (10000 impact points)
│
└── Rarity Badges
    ├── Common (silver)
    ├── Rare (gold)
    ├── Epic (purple)
    └── Legendary (rainbow)
```

**Display on Profile:**
- Badges arranged like achievements
- Hover to see: name, description, when earned, progress to next tier
- Badges affect reputation (more visible badges = more trusted)

**Example:**
```json
{
  "badges": [
    {
      "id": "first_steps",
      "name": "First Steps",
      "tier": 1,
      "earned_at": "2025-12-01T10:00:00Z",
      "progress": "1/1"
    },
    {
      "id": "community_champion",
      "name": "Community Champion",
      "tier": 2,
      "earned_at": "2025-12-04T15:30:00Z",
      "progress": "22/30"
    }
  ]
}
```

---

### 3.3 Real-World Rewards

**What they are:**
- Tangible benefits from partner organizations
- Redeemed using Heart Tokens or badges

**Types:**

#### Education
- Free online courses (Coursera, Udemy, local university)
- Scholarship programs (partner universities)
- Skills training (vocational centers)

#### Work
- Job board access (partner companies preferring OneHeart members)
- Freelance gigs (matched to skills)
- Mentorship (connect with industry leaders)

#### Travel
- Hostel / hotel discounts (partner networks)
- Transportation vouchers (buses, trains, flights)
- Tour guides (local experts in new areas)

#### Health & Wellness
- Gym memberships
- Health checkups (partner clinics)
- Mental health counseling

#### Lifestyle
- Food / restaurant discounts
- Tech gadget deals
- Artistic supplies

**Redemption:**
```json
{
  "available_rewards": [
    {
      "id": "udemy_course",
      "name": "$100 Udemy Course Credit",
      "cost_hearts": 250,
      "cost_badges": 0,
      "partner": "Udemy",
      "expires_at": "2025-12-31"
    },
    {
      "id": "hotel_discount",
      "name": "20% OFF Booking.com",
      "cost_hearts": 50,
      "cost_badges": 0,
      "partner": "Booking.com",
      "expires_at": "2025-12-31"
    }
  ]
}
```

---

### 3.4 Ascension Points

**What they are:**
- Track toward level-up in major pathways
- Unlock special roles + responsibilities

**Ascension Pathways:**

```
Community Leader
├── Requires: 500 Social Impact XP, 50+ people helped
├── Unlock: Create custom quests for region
├── Benefit: Reputation boost, revenue share (if quest popular)
└── Level Up: Regional Admin (manage quests, verify)

Skill Master
├── Requires: 300 Skill Points in 1 tree
├── Unlock: Mentorship role
├── Benefit: Students = impact points + heart tokens
└── Level Up: Curriculum Designer (create courses)

Environmental Guardian
├── Requires: 400 Green XP, 6-month streak
├── Unlock: Partner with environmental orgs
├── Benefit: Access to professional resources
└── Level Up: Sustainability Consultant

World Walker
├── Requires: 1000 Travel XP, 10+ countries
├── Unlock: International ascension program
├── Benefit: Study abroad / exchange opportunities
└── Level Up: Global Ambassador

Tech Pioneer
├── Requires: 250 Tech Skills, 20 tech quests completed
├── Unlock: Build custom tools for OneHeart
├── Benefit: Revenue share, open-source credit
└── Level Up: Platform Developer
```

**Display:**
```json
{
  "ascension_points": 150,
  "ascension_progress": {
    "community_leader": {
      "current": 350,
      "required": 500,
      "percent": 70,
      "status": "in_progress"
    },
    "world_walker": {
      "current": 650,
      "required": 1000,
      "percent": 65,
      "status": "in_progress"
    }
  },
  "unlocked_pathways": ["Community Leader (ready)"],
  "active_pathway": "World Walker"
}
```

---

## Full Character Sheet Example

```json
{
  "player_id": "did:oneheart:0x7f3k9m2p...",
  "username": "alice_explorer",
  "created_at": "2025-01-15",
  "anti_bot_score": 0.93,
  
  "stats": {
    "travel_xp": 1250,
    "travel_level": 8,
    "social_impact_xp": 3200,
    "social_impact_level": 12,
    "green_xp": 2100,
    "green_level": 9,
    "skill_points_available": 3,
    "skills": {
      "agricultural_skills": 12,
      "tech_skills": 8,
      "social_skills": 15,
      "education_skills": 6
    }
  },
  
  "alignment": {
    "creative": 0.65,
    "pragmatic": 0.35,
    "helper": 0.72,
    "explorer": 0.58,
    "collaborative": 0.80,
    "independent": 0.20,
    "archetype": "Creative Helper Collaborator"
  },
  
  "inventory": {
    "heart_tokens": 450,
    "badges": [
      { "id": "adventurer", "tier": 2 },
      { "id": "community_champion", "tier": 2 }
    ],
    "ascension_points": 150,
    "ascension_active": "World Walker"
  },
  
  "profile": {
    "bio": "Exploring the world while building communities",
    "avatar_url": "...",
    "region": "Bangkok",
    "languages": ["Thai", "English", "Spanish"]
  }
}
```

---

## API Endpoints (Character System)

### GET /api/character/:player_id
**Fetch full character sheet**

### POST /api/character/create
**Create new character (on signup)**

### PATCH /api/character/:player_id
**Update alignment / bio / avatar**

### GET /api/character/:player_id/badges
**Fetch all badges + progress**

### POST /api/character/:player_id/skill-point
**Allocate skill point to tree**

### GET /api/character/:player_id/ascension
**Fetch ascension pathways + progress**

### POST /api/character/:player_id/ascension/unlock
**Unlock ascension pathway (if requirements met)**

---

## Database Schema

```sql
CREATE TABLE players (
  id UUID PRIMARY KEY,
  did VARCHAR(255) UNIQUE NOT NULL,
  anti_bot_score FLOAT DEFAULT 0.5,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE player_stats (
  id UUID PRIMARY KEY,
  player_id UUID REFERENCES players(id),
  travel_xp INT DEFAULT 0,
  social_impact_xp INT DEFAULT 0,
  green_xp INT DEFAULT 0,
  skill_points_available INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE player_alignment (
  id UUID PRIMARY KEY,
  player_id UUID REFERENCES players(id),
  creative FLOAT DEFAULT 0.5,
  pragmatic FLOAT DEFAULT 0.5,
  helper FLOAT DEFAULT 0.5,
  explorer FLOAT DEFAULT 0.5,
  collaborative FLOAT DEFAULT 0.5,
  independent FLOAT DEFAULT 0.5
);

CREATE TABLE player_badges (
  id UUID PRIMARY KEY,
  player_id UUID REFERENCES players(id),
  badge_id VARCHAR(100),
  tier INT DEFAULT 1,
  earned_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(player_id, badge_id)
);

CREATE TABLE player_inventory (
  id UUID PRIMARY KEY,
  player_id UUID REFERENCES players(id),
  heart_tokens INT DEFAULT 0,
  ascension_points INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE skill_allocation (
  id UUID PRIMARY KEY,
  player_id UUID REFERENCES players(id),
  skill_tree VARCHAR(100),
  points INT DEFAULT 0,
  UNIQUE(player_id, skill_tree)
);

CREATE TABLE ascension_progress (
  id UUID PRIMARY KEY,
  player_id UUID REFERENCES players(id),
  pathway VARCHAR(100),
  progress INT DEFAULT 0,
  unlocked_at TIMESTAMP NULL,
  active BOOLEAN DEFAULT FALSE
);
```

---

**Status**: Player Character System Specification (ready for implementation)  
**Last Updated**: 2025-12-04
