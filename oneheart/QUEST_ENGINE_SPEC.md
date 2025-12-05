# Quest Engine System — Real-Life Gameplay Design

**The Quest Engine is the core engagement loop of OneHeart. It transforms daily actions, stories, and community efforts into structured gameplay.**

---

## Overview

```
QUEST ENGINE
├── Daily Quests          (Everyday habits → XP accumulation)
├── Story Quests          (Long-term narrative arcs)
├── Community Quests      (Team-based, regional missions)
└── Ascension Tracks      (Specialization pathways to end-game roles)
```

---

## 1. Daily Quests

**Purpose**: Build habit loops + generate consistent impact data

### 1.1 Micro-Impact Tasks

**What they are:**
- Small, achievable quests (15–30 minutes each)
- Reset daily (refresh at midnight in player's timezone)
- No failure state (always completable if player tries)

**Examples:**

```
🌱 Green Daily
├── "Plant 5 seeds today" (5 mins)
├── "Walk to work (no vehicle)" (30 mins)
├── "Reduce water usage (photo proof)" (10 mins)
└── "Teach 1 person about recycling" (20 mins)

👥 Social Daily
├── "Help a neighbor (any way)" (15 mins)
├── "Call or visit an elderly person" (20 mins)
├── "Donate or volunteer (1 hour)" (60 mins)
└── "Share knowledge with 1 person" (30 mins)

🧠 Learning Daily
├── "Read 1 article on local issues" (10 mins)
├── "Practice a skill (30 mins)" (30 mins)
├── "Watch educational video (10 mins)" (10 mins)
└── "Teach someone what you learned" (20 mins)

🏃 Health Daily
├── "Exercise for 30 mins" (30 mins)
├── "Meditate (10 mins)" (10 mins)
├── "Prepare healthy meal (photo)" (45 mins)
└── "Sleep 7+ hours (auto-verified)" (---)
```

**Rewards per Daily:**
- Base: 5–10 Heart Tokens
- Streak bonus: +50% after 3 consecutive days
- All 4 categories: +100% "Perfect Day" bonus

**Submission:**
1. Complete task in real world
2. Take proof (selfie, photo, geolocation)
3. Tap "Submit" in app
4. AI + community verify within 24 hours
5. Reward claimed

**Auto-Reset Logic:**
```
if (today > player.last_daily_reset):
    reset_daily_quests()
    offer_new_quests_based_on_alignment()
```

---

### 1.2 Habit Builder

**What it is:**
- Long-term daily quest chains (30–90 day streaks)
- Higher multiplier for consistency

**Streaks:**

```
Day 1-7: Apprentice (1x)
Day 8-30: Practitioner (1.5x)
Day 31-90: Master (2x)
Day 91+: Legend (3x)
```

**Example Habit Chains:**

```
🌱 "Green Warrior" (90-day streak)
├── Week 1: Daily eco-friendly actions
├── Week 2: Teach others
├── Week 3: Community cleanup
├── Week 4: Propose local improvement
├── Repeat × 3 cycles
└── Reward: "Environmental Guardian" title + 500 ❤️

📖 "Knowledge Seeker" (60-day streak)
├── Read 1 article daily
├── Teach someone weekly
├── Create 1 guide/summary
└── Reward: "Scholar" title + mentor unlock

💪 "Fitness Master" (60-day streak)
├── Exercise 5+ days/week
├── Share progress weekly
├── Inspire 2 others
└── Reward: "Athletic Champion" title + sports track unlock
```

**Miss Penalty:**
- Break at day 15: restart at day 1 (no tokens lost)
- Break at day 45: lose 50% accumulated tokens
- Break at day 89: lose all, must restart
- Miss ≤ 1 day per week = no penalty (grace day built in)

**Display:**
```
🔥 STREAK: 23 days
Perfect Day Bonus: +150% (Day 15-30 bonus unlocked)
Next Milestone: Day 30 (rare reward!)
```

---

## 2. Story Quests

**Purpose**: Narrative-driven long-term engagement (weeks to months)

**Structure:** Each story has 5–7 chapters, player progresses through narrative while building real-world impact.

---

### 2.1 Tourism Development Arc

**Story**: "Build the Soul of Tourism"

**Narrative:**
Your region wants sustainable tourism. Help develop authentic experiences that attract visitors while preserving local culture.

**Chapters:**

```
Chapter 1: "Local Inventory" (Week 1)
├── Quest: "Map 10 hidden local attractions"
├── Proof: GPS location + photos + description
├── Reward: 50 ❤️, unlock Local Guide role
└── Impact: Tourism data layer started

Chapter 2: "Stories & Culture" (Week 2)
├── Quest: "Interview 5 local elders, record their stories"
├── Proof: Audio/video + transcripts
├── Reward: 75 ❤️, "Storyteller" badge
└── Impact: Cultural archive for tourists

Chapter 3: "Experience Design" (Week 3)
├── Quest: "Design 3 unique 1-day tourist itineraries"
├── Proof: Written plans + community feedback
├── Reward: 100 ❤️, "Experience Designer" badge
└── Impact: Tourist packages created

Chapter 4: "Trial Run" (Week 4)
├── Quest: "Host a tourist group on your itinerary"
├── Proof: Photos + tourist testimonials
├── Reward: 150 ❤️, unlock "Tourism Operator" role
├── Impact: Real tourism revenue generated
└── Impact Points: Multiply by visitors × local spend

Chapter 5: "Training Others" (Week 5)
├── Quest: "Teach 5 others to host tourists"
├── Proof: Training completion + host reviews
├── Reward: 200 ❤️, "Tourism Mentor" title
└── Impact: Multiplier effect on local tourism

Arc Complete Bonus: +500 ❤️ + "Tourism Pioneer" ascension unlock
```

**Impact Calculation:**
```
Tourism Impact = (visitors × local_spend) + (cultural_preservation) + (training_reach)
```

---

### 2.2 Social Betterment Arc

**Story**: "Build Community Resilience"

**Narrative:**
Create a safety net for your neighborhood. Help establish systems that protect vulnerable people.

**Chapters:**

```
Chapter 1: "Needs Assessment" (Week 1)
├── Quest: "Survey 20 neighbors about their challenges"
├── Proof: Survey responses + analysis
├── Reward: 50 ❤️, "Community Researcher" badge
└── Impact: Data gathered on local problems

Chapter 2: "Support Network" (Week 2)
├── Quest: "Organize a community gathering (20+ people)"
├── Proof: Event photos + attendance + feedback
├── Reward: 75 ❤️, "Community Organizer" badge
└── Impact: Network established

Chapter 3: "Skill Sharing" (Week 3)
├── Quest: "Teach a practical skill to the community"
├── Proof: Class photos + participant testimonials
├── Reward: 100 ❤️, "Skill Sharer" badge
└── Impact: Capability increased

Chapter 4: "Safety System" (Week 4)
├── Quest: "Set up emergency response system (phone tree, shelter, etc.)"
├── Proof: System documentation + participant confirmations
├── Reward: 150 ❤️, "Community Protector" role
└── Impact: Disaster readiness improved

Chapter 5: "Crisis Response" (Week 5)
├── Quest: "Respond to a local emergency using your system"
├── Proof: Response coordination + outcomes
├── Reward: 200 ❤️, "Crisis Leader" title
└── Impact: Lives impacted

Arc Complete Bonus: +500 ❤️ + "Community Fortress" ascension unlock
```

---

### 2.3 Environmental Arc

**Story**: "Restore the Land"

**Narrative:**
Plant trees, restore wetlands, clean rivers. Build a green legacy.

**Chapters:**

```
Chapter 1: "Assessment" (Week 1)
├── Quest: "Document local environmental damage (photos + analysis)"
├── Reward: 50 ❤️, "Eco-Scout" badge
└── Impact: Baseline environmental data

Chapter 2: "Mobilization" (Week 2)
├── Quest: "Organize community cleanup day (50+ people)"
├── Reward: 75 ❤️, "Eco-Organizer" badge
└── Impact: Environmental awareness raised

Chapter 3: "Reforestation" (Week 3)
├── Quest: "Plant 200 trees + set up maintenance system"
├── Reward: 100 ❤️, "Reforestation Expert" badge
└── Impact: CO2 offset calculated

Chapter 4: "Ecosystem Recovery" (Week 4)
├── Quest: "Restore habitat for 1 species (wetland, pollinator garden, etc.)"
├── Reward: 150 ❤️, "Ecosystem Guardian" role
└── Impact: Biodiversity improved

Chapter 5: "Monitoring & Teaching" (Week 5)
├── Quest: "Monitor recovery + teach others about it"
├── Reward: 200 ❤️, "Environmental Mentor" title
└── Impact: Systemic environmental improvement

Arc Complete Bonus: +500 ❤️ + "Green Pioneer" ascension unlock
```

---

## 3. Community Quests

**Purpose**: Large-scale collaborative missions that require coordination

### 3.1 Guild Missions

**What they are:**
- Regional groups ("guilds") band together
- Shared goal, shared rewards, divided labor
- 5–50 players, 1–4 weeks duration

**Examples:**

```
🌉 "Build Community Center" (Guild: 30 players, 4 weeks)
├── Phase 1: Fundraising (goal: 50,000 ❤️)
├── Phase 2: Construction planning
├── Phase 3: Physical building (volunteer labor)
├── Phase 4: Grand opening + programs launch
└── Reward: Each player gets 500 ❤️ + "Community Builder" badge
   Individual contributions matter: top 5 contributors get extra 200 ❤️

🌾 "Organic Farming Cooperative" (Guild: 15 players, 8 weeks)
├── Phase 1: Land acquisition
├── Phase 2: Training in organic methods
├── Phase 3: Planting season
├── Phase 4: Harvesting + revenue sharing
└── Reward: 30% of revenue to guild members (pro-rata to contribution)

📚 "Community Library" (Guild: 20 players, 6 weeks)
├── Phase 1: Book collection (1000 books goal)
├── Phase 2: Cataloging + repair
├── Phase 3: Setup + opening
├── Phase 4: Reading programs launch
└── Reward: Each player 300 ❤️ + "Librarian" badge
```

**Participation Tracker:**
```json
{
  "guild_mission_id": "uuid",
  "guild_name": "Ban Tho Community Builders",
  "mission": "Build Community Center",
  "status": "phase_3_construction",
  "deadline": "2025-12-31",
  "contributions": [
    { "player": "alice", "hearts_contributed": 500, "hours_worked": 40, "role": "project_lead" },
    { "player": "bob", "hearts_contributed": 200, "hours_worked": 16, "role": "worker" },
    { "player": "charlie", "hearts_contributed": 100, "hours_worked": 8, "role": "supporter" }
  ],
  "reward_pool": 15000,
  "distribution": "pro_rata"
}
```

---

### 3.2 Raid Operations

**What they are:**
- Massive coordinated efforts across multiple guilds/regions
- Nation-level impact (e.g., disaster response, national campaign)
- 100–1000+ players, weeks to months

**Examples:**

```
🌊 "Flood Recovery 2025" (National, 2 weeks)
├── Regions: Northeast (100 players), Central (80 players), South (60 players)
├── Goal: Distribute aid + rebuild homes in 3 provinces
├── Phases:
│   ├── Week 1: Donation collection + needs assessment
│   ├── Week 2: Distribution + rebuilding
│   └── Week 3: Follow-up + verification
├── Total Impact: 10,000+ homes helped, 50,000+ lives impacted
└── Reward: Tiered badges (Copper, Silver, Gold, Platinum) based on contribution
   Players can earn "Disaster Hero" title if top contributor

🌍 "Plant 1 Million Trees" (National, 6 months)
├── Goal: 1,000,000 trees planted across Thailand
├── Regional quotas: Each province has target
├── Tracking: GPS proof for each tree
├── Reward: Each tree = 1 ❤️, bonus for regional overachievement
   Leaderboard: Top regions get "Reforestation Champion" title

💡 "Skills for All" (National, 3 months)
├── Goal: Provide free training to 100,000 people
├── Paths: Tech, agriculture, trades, language
├── Participants: Teachers (skill experts) + Students
├── Reward: Teachers earn per student (1-5 ❤️), students get certificate + badges
```

**Raid Dashboard:**
```json
{
  "raid_id": "uuid",
  "raid_name": "Flood Recovery 2025",
  "status": "active",
  "regions": {
    "northeast": { "progress": 85, "target": 100, "players": 100 },
    "central": { "progress": 72, "target": 80, "players": 80 },
    "south": { "progress": 60, "target": 60, "players": 60 }
  },
  "total_impact": 54000,
  "player_count": 240,
  "deadline": "2025-12-18",
  "leaderboard": [
    { "region": "northeast", "completion": 85, "lives_impacted": 25000 },
    { "region": "central", "completion": 90, "lives_impacted": 20000 }
  ]
}
```

---

### 3.3 Disaster Response

**What it is:**
- Real-time quests triggered by actual events
- Flood, earthquake, fire, pandemic, etc.
- Activated within minutes of event declaration

**Example: Flood Response**

```
🚨 DISASTER RESPONSE: Northern Flood 2025-12-15

Stage 1: IMMEDIATE (First 24 hours)
├── Quest: "Report damage + needs in your area"
├── Reward: 50 ❤️ per submission
├── Info Used: Real-time damage map
└── Players: Anyone in affected area

Stage 2: RELIEF (Days 1-7)
├── Quest: "Donate supplies / volunteer"
├── Reward: 100 ❤️ per effort (minimum 4 hours)
├── Coordination: AI matches supplies to needs
└── Players: Anyone (donation shipping arranged)

Stage 3: RECOVERY (Weeks 1-4)
├── Quest: "Help rebuild homes / businesses"
├── Reward: 150 ❤️ per day of work + additional for specialized skills
├── Tracking: Before/after photos
└── Players: Skilled workers prioritized

Stage 4: RESILIENCE (Months 1-3)
├── Quest: "Set up early warning + preparedness systems"
├── Reward: 200 ❤️ per system established
├── Impact: Reduce future losses
└── Players: Community organizers + tech experts

Special Badge: "Disaster Hero" (earned if contributed at all stages)
Special Title: "Relief Champion" (for top 5% contributors)
```

**Disaster Response Triggers:**
- Natural disaster declared (government / international)
- Crisis threshold met (100+ people affected, major infrastructure damage)
- Community petition (if 100+ residents agree)

---

## 4. Ascension Tracks

**Purpose**: Specialization pathways leading to end-game roles and expertise

### 4.1 Sports Track

**Narrative**: "Become a Champion of Human Potential"

**Path:**
```
Level 1: Athlete (Complete 10 sports-related quests)
├── Can participate in sports quests
├── Get performance tracking
└── Unlock "Fitness" category

Level 2: Coach (Train 10 people to Level 1)
├── Can create training programs
├── Earn ❤️ from students
└── Unlock "Sports Organizer" role

Level 3: Champion (Win regional sports competition / achieve 1000 sports XP)
├── Access to national competitions
├── Sponsorship opportunities
└── Unlock "Sports Ambassador" role

Level 4: Sports Pioneer (Help 5 communities develop sports programs)
├── Can propose national sports initiatives
├── Revenue share from sports events
└── Title: "Sports Pioneer"
└── Ascension Complete ✓
```

**End-Game Benefits:**
- National sports league involvement
- Olympics scouting access
- International sports exchange programs

---

### 4.2 Research Track

**Narrative**: "Become a Knowledge Architect"

**Path:**
```
Level 1: Researcher (Complete 10 research-based quests)
├── Can document + analyze local issues
├── Database access
└── Unlock "Research" category

Level 2: Lead Researcher (Publish 5 research projects)
├── Can supervise junior researchers
├── Peer review privileges
└── Unlock "Research Manager" role

Level 3: Thought Leader (1000 research XP + 100+ citations)
├── Access to university partnerships
├── Grant writing support
└── Unlock "Academic Advisor" role

Level 4: Research Pioneer (Establish 3 research centers)
├── Can propose national research initiatives
├── Government research contracts
└── Title: "Research Pioneer"
└── Ascension Complete ✓
```

**End-Game Benefits:**
- University partnerships
- Government advisory roles
- Research funding access
- Publication platform

---

### 4.3 Creative Track

**Narrative**: "Become an Artist of Change"

**Path:**
```
Level 1: Creator (Complete 10 creative quests)
├── Can submit art / media / design
├── Portfolio platform access
└── Unlock "Creative" category

Level 2: Artist (Reach 1000 followers / 500 creative XP)
├── Can mentor other creators
├── Collaboration tools
└── Unlock "Art Mentor" role

Level 3: Master Artist (10,000 followers + 2000 creative XP)
├── Access to exhibition opportunities
├── Sponsor partnerships
└── Unlock "Cultural Ambassador" role

Level 4: Creative Pioneer (Establish 3 cultural centers / art initiatives)
├── Can propose national cultural programs
├── Arts funding access
└── Title: "Creative Pioneer"
└── Ascension Complete ✓
```

**End-Game Benefits:**
- Exhibition platform
- Sponsorship opportunities
- Cultural exchange programs
- Arts funding access

---

### 4.4 Leadership Track

**Narrative**: "Become a Nation Builder"

**Path:**
```
Level 1: Leader (Complete 10 leadership quests)
├── Can organize community events
├── Leadership training access
└── Unlock "Leadership" category

Level 2: Regional Leader (Manage 1 guild / community group)
├── Can create regional quests
├── Budget authority (guild funds)
└── Unlock "Regional Manager" role

Level 3: National Leader (Manage 5+ guilds / regions)
├── Can propose national initiatives
├── Policy advisory access
└── Unlock "National Advisor" role

Level 4: Leadership Pioneer (Establish governance model for 1+ province)
├── Can propose constitutional changes to OneHeart
├── Government partnership roles
└── Title: "Leadership Pioneer"
└── Ascension Complete ✓
```

**End-Game Benefits:**
- Government advisory roles
- Policy influence
- Governance authority
- International representation

---

## Database Schema

```sql
CREATE TABLE quests (
  id UUID PRIMARY KEY,
  quest_type ENUM('daily', 'story', 'community', 'ascension'),
  title VARCHAR(255),
  description TEXT,
  category VARCHAR(100),
  difficulty ENUM('easy', 'medium', 'hard', 'epic'),
  xp_reward INT,
  heart_reward INT,
  duration_days INT,
  deadline TIMESTAMP NULL,
  creator_user_id UUID REFERENCES players(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE quest_progress (
  id UUID PRIMARY KEY,
  player_id UUID REFERENCES players(id),
  quest_id UUID REFERENCES quests(id),
  status ENUM('available', 'active', 'completed', 'failed', 'abandoned'),
  progress_percent INT DEFAULT 0,
  started_at TIMESTAMP,
  completed_at TIMESTAMP NULL,
  proof_id UUID REFERENCES proofs(id) NULL,
  UNIQUE(player_id, quest_id)
);

CREATE TABLE quest_streak (
  id UUID PRIMARY KEY,
  player_id UUID REFERENCES players(id),
  quest_id UUID REFERENCES quests(id),
  current_streak INT DEFAULT 0,
  longest_streak INT DEFAULT 0,
  last_completed_at TIMESTAMP,
  multiplier FLOAT DEFAULT 1.0
);

CREATE TABLE guilds (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  region VARCHAR(100),
  leader_id UUID REFERENCES players(id),
  member_count INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE guild_members (
  id UUID PRIMARY KEY,
  guild_id UUID REFERENCES guilds(id),
  player_id UUID REFERENCES players(id),
  role ENUM('leader', 'officer', 'member'),
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(guild_id, player_id)
);

CREATE TABLE ascension_progress (
  id UUID PRIMARY KEY,
  player_id UUID REFERENCES players(id),
  track VARCHAR(100),
  level INT DEFAULT 1,
  experience INT DEFAULT 0,
  unlocked_at TIMESTAMP NULL
);

CREATE TABLE disaster_events (
  id UUID PRIMARY KEY,
  event_type VARCHAR(100),
  region VARCHAR(255),
  severity ENUM('low', 'medium', 'high', 'critical'),
  declared_at TIMESTAMP DEFAULT NOW(),
  resolved_at TIMESTAMP NULL,
  status ENUM('active', 'recovery', 'resolved')
);

CREATE TABLE disaster_responses (
  id UUID PRIMARY KEY,
  disaster_id UUID REFERENCES disaster_events(id),
  player_id UUID REFERENCES players(id),
  stage ENUM('immediate', 'relief', 'recovery', 'resilience'),
  contribution INT,
  hearts_earned INT,
  submitted_at TIMESTAMP DEFAULT NOW()
);
```

---

## API Endpoints

### GET /api/quests
**Fetch available quests for player (filtered by alignment + level)**

### GET /api/quests/:quest_id
**Get quest details**

### POST /api/quests/:quest_id/accept
**Start a quest**

### POST /api/quests/:quest_id/submit
**Submit quest completion (with proof)**

### GET /api/quests/active
**Fetch player's active quests**

### GET /api/guilds
**List all guilds in player's region**

### POST /api/guilds/create
**Create new guild**

### GET /api/raids
**Fetch active raids**

### POST /api/disaster-response/:event_id/respond
**Submit disaster response**

### GET /api/ascension/:track
**Get ascension track progress**

### POST /api/ascension/:track/claim
**Claim level-up reward**

---

**Status**: Quest Engine System Specification (ready for implementation)  
**Last Updated**: 2025-12-04
