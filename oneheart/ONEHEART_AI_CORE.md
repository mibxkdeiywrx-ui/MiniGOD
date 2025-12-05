# ONEHEART AI CORE SPECIFICATION

Complete specification for OneHeart's three AI systems: Verification AI, Impact AI, and Social AI, with detection models, algorithms, and pilot implementation steps.

---

## System Overview

```
┌──────────────────────────────────────────────────────────────┐
│                    ONEHEART AI CORE                          │
└──────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│  VERIFICATION AI LAYER                         │
│  (Evidence Authenticity & Anti-Fraud)          │
├────────────────────────────────────────────────┤
│                                                │
│ ┌──────────────────────────────────────────┐   │
│ │ PROOF PROCESSOR                          │   │
│ ├──────────────────────────────────────────┤   │
│ │ • Image Analyzer (EXIF, metadata)        │   │
│ │ • GPS Validator (location plausibility)  │   │
│ │ • Timestamp Verifier (time consistency)  │   │
│ │ • Contextual Scoring Model (ML)          │   │
│ └──────────────────────────────────────────┘   │
│          ↓                                     │
│ ┌──────────────────────────────────────────┐   │
│ │ AUTHENTICITY ENGINE                      │   │
│ ├──────────────────────────────────────────┤   │
│ │ • Anti-Fake Detection (deepfake filter)  │   │
│ │ • Behavior Pattern Analysis (anomalies)  │   │
│ │ • Cross-User Validation (witness check)  │   │
│ │ • Confidence Score (0-100)               │   │
│ └──────────────────────────────────────────┘   │
│          ↓                                     │
│ ┌──────────────────────────────────────────┐   │
│ │ OUTPUT: Authenticity Score (0-100)       │   │
│ │ ├─ Score >= 70: Auto-approve             │   │
│ │ ├─ Score 50-69: Flag for human review    │   │
│ │ └─ Score < 50: Reject & penalize         │   │
│ └──────────────────────────────────────────┘   │
│                                                │
└────────────────────────────────────────────────┘
           ↓
┌────────────────────────────────────────────────┐
│  IMPACT AI LAYER                               │
│  (Quest Generation & Impact Projection)        │
├────────────────────────────────────────────────┤
│                                                │
│ ┌──────────────────────────────────────────┐   │
│ │ VALUE CALCULATOR                         │   │
│ ├──────────────────────────────────────────┤   │
│ │ • XP Generator (base + multipliers)      │   │
│ │ • Token Allocator (issuance rules)       │   │
│ │ • Impact Weighting Module (fund split)   │   │
│ │ • Impact Projection (simulation)         │   │
│ └──────────────────────────────────────────┘   │
│          ↓                                     │
│ ┌──────────────────────────────────────────┐   │
│ │ DIFFICULTY SCALING ENGINE                │   │
│ ├──────────────────────────────────────────┤   │
│ │ • Analyze player stats & history         │   │
│ │ • Adjust mission difficulty              │   │
│ │ • Predict player engagement level        │   │
│ │ • Generate personalized quests           │   │
│ └──────────────────────────────────────────┘   │
│          ↓                                     │
│ ┌──────────────────────────────────────────┐   │
│ │ OUTPUT: Personalized Quest List           │   │
│ │ ├─ Difficulty-matched missions           │   │
│ │ ├─ Expected engagement time              │   │
│ │ └─ Projected reward (XP/tokens)          │   │
│ └──────────────────────────────────────────┘   │
│                                                │
└────────────────────────────────────────────────┘
           ↓
┌────────────────────────────────────────────────┐
│  SOCIAL AI LAYER                               │
│  (Community Health & Behavior Reinforcement)   │
├────────────────────────────────────────────────┤
│                                                │
│ ┌──────────────────────────────────────────┐   │
│ │ COMMUNITY HEALTH MONITOR                 │   │
│ ├──────────────────────────────────────────┤   │
│ │ • Track sentiment (upvotes, comments)    │   │
│ │ • Detect conflicts (negative patterns)   │   │
│ │ • Monitor engagement trends              │   │
│ │ • Calculate community index (0-100)      │   │
│ └──────────────────────────────────────────┘   │
│          ↓                                     │
│ ┌──────────────────────────────────────────┐   │
│ │ CONFLICT DETECTION ENGINE                │   │
│ ├──────────────────────────────────────────┤   │
│ │ • Keyword analysis (negative language)   │   │
│ │ • Behavioral pattern detection           │   │
│ │ • Escalation prediction                  │   │
│ │ • Alert community moderators             │   │
│ └──────────────────────────────────────────┘   │
│          ↓                                     │
│ ┌──────────────────────────────────────────┐   │
│ │ OUTPUT: Community Health Report           │   │
│ │ ├─ Health index (0-100)                  │   │
│ │ ├─ Conflict alerts                       │   │
│ │ └─ Behavior reinforcement triggers       │   │
│ └──────────────────────────────────────────┘   │
│                                                │
└────────────────────────────────────────────────┘
```

---

## 1. VERIFICATION AI (Evidence Authenticity)

### Purpose

Ensure that submitted evidence (photos, videos, GPS data) is authentic and corresponds to claimed actions. Prevent fraud, cheating, and fake submissions.

### Proof Processor

#### 1.1 Image Analyzer

**Input:** JPEG/PNG file with EXIF metadata

**Extraction Logic:**
```json
{
  "file_hash": "sha256(image_bytes)",
  "exif_data": {
    "camera_model": "iPhone 13 Pro",
    "timestamp_taken": "2024-12-04T10:15:30Z",
    "gps_lat": 13.7563,
    "gps_lng": 100.5018,
    "gps_accuracy_m": 5
  },
  "image_properties": {
    "width": 1920,
    "height": 1080,
    "file_size_bytes": 2400000,
    "color_histogram": [...],
    "blur_score": 0.2,
    "brightness_score": 0.6
  }
}
```

**Heuristic Checks:**
- ✓ EXIF timestamp exists and is recent (within action window)
- ✓ GPS coordinates are within expected zone
- ✓ Image not obviously edited (histogram anomalies < 0.3)
- ✓ Blur score < 0.4 (image is in focus)
- ✓ File size reasonable (not AI-generated indicator)
- ✗ EXIF timestamp much older than submission (suspicious)
- ✗ GPS coordinates wildly different from claimed zone
- ✗ Multiple uploads with identical EXIF (copy-paste)

**Scoring:**
```
image_authenticity_score = 
  100 * (exif_present * 0.3 
       + gps_accurate * 0.25
       + timestamp_valid * 0.2
       + image_quality_good * 0.15
       + not_edited * 0.1)
```

#### 1.2 GPS Validator

**Plausibility Checks:**

```python
def validate_gps(action_gps, zone_gps, radius_km, timestamp, prev_actions):
    # 1. Check if GPS within zone bounds
    distance_km = haversine(action_gps, zone_gps)
    if distance_km > radius_km:
        return 0.0  # Not in zone
    
    # 2. Check if GPS plausible given previous actions
    # (can't teleport across country in minutes)
    for prev_action in prev_actions[-3:]:
        distance_prev = haversine(action_gps, prev_action.gps)
        time_diff_minutes = (timestamp - prev_action.timestamp).total_seconds() / 60
        max_plausible_km = time_diff_minutes * 2  # assume max 120 km/h travel
        if distance_prev > max_plausible_km:
            return 0.0  # Teleportation detected
    
    # 3. Score based on accuracy radius
    accuracy_m = action_gps.accuracy_m
    if accuracy_m > 50:
        return 0.7  # Lower score for low-accuracy GPS
    elif accuracy_m > 20:
        return 0.85
    else:
        return 1.0  # High-accuracy GPS
```

**Output:**
```json
{
  "gps_valid": true,
  "distance_from_zone_center_km": 0.3,
  "gps_accuracy_m": 5,
  "teleportation_risk": 0.0,
  "gps_score": 0.95
}
```

#### 1.3 Timestamp Verifier

**Consistency Checks:**

```
1. EXIF timestamp vs. submission timestamp
   ✓ Difference <= 1 hour (reasonable)
   ✗ Difference > 24 hours (suspicious)

2. Timestamp within mission window
   ✓ Mission active and action within time frame
   ✗ Action submitted before/after mission period

3. Timestamp sequence
   ✓ Not earlier than player's previous actions
   ✗ Retroactive submission (flagged as low-confidence)

Scoring:
- timestamp_exact_match: 1.0
- timestamp_within_1h: 0.9
- timestamp_within_24h: 0.7
- timestamp_after_mission: 0.0
```

#### 1.4 Contextual Scoring Model

**Simple ML model (logistic regression for pilot):**

```
authenticity_score = sigmoid(
    w_image * image_score
  + w_gps * gps_score
  + w_timestamp * timestamp_score
  + w_player_history * player_history_score
  + w_witness_count * witness_score
  + b
)

where:
  w_image = 0.25
  w_gps = 0.25
  w_timestamp = 0.2
  w_player_history = 0.15
  w_witness = 0.15
  b = -1.0 (bias)
```

**Example Calculation:**
```
image_score = 0.85
gps_score = 0.95
timestamp_score = 0.9
player_history_score = 0.8  (player has high completion rate)
witness_score = 1.0  (2 witnesses verified)

authenticity = sigmoid(
    0.25 * 0.85
  + 0.25 * 0.95
  + 0.2 * 0.9
  + 0.15 * 0.8
  + 0.15 * 1.0
  - 1.0
)
= sigmoid(0.2125 + 0.2375 + 0.18 + 0.12 + 0.15 - 1.0)
= sigmoid(-0.1)
= 0.475  (47.5%)

→ Flag for human review
```

### Authenticity Engine

#### Anti-Fake Detection (Deepfake Filter)

**Pilot approach (lightweight):**

```python
def detect_deepfake(image_path):
    """
    Use heuristics + optional lightweight ML model
    """
    
    # 1. EXIF metadata presence
    if not has_exif(image_path):
        deepfake_risk = 0.7  # AI-generated often lack EXIF
    else:
        deepfake_risk = 0.1
    
    # 2. Facial detection (if human required)
    faces = detect_faces(image_path)
    if len(faces) == 0 and action_requires_person:
        deepfake_risk = 0.8  # No face detected in selfie
    
    # 3. Optional: TensorFlow Lite deepfake model
    # (~50MB, runs on mobile/server)
    if deepfake_model.available:
        ml_score = deepfake_model.predict(image_path)
        deepfake_risk = deepfake_risk * 0.5 + ml_score * 0.5  # blend
    
    return deepfake_risk  # 0.0 = genuine, 1.0 = likely fake
```

**Decision Logic:**
```
if deepfake_risk > 0.6:
    authenticity_score *= 0.5  # penalize
if deepfake_risk > 0.8:
    action_status = "REJECTED"
```

#### Behavior Pattern Analysis

**Anomaly Detection (Z-score based):**

```python
def detect_pattern_abuse(player_id, action):
    """
    Compare current action to player's historical distribution
    """
    
    player_history = get_player_actions(player_id, days=30)
    
    # 1. Submission frequency
    actions_per_day = len(player_history) / 30
    current_frequency_zscore = (1.0 - actions_per_day) / std_dev
    if current_frequency_zscore > 3.0:
        return "SUDDEN_SPIKE"  # Unusual submission burst
    
    # 2. Reward per action
    avg_reward = mean(player_history.map(r => r.xp))
    current_reward_zscore = (action.xp - avg_reward) / std_dev
    if current_reward_zscore > 3.0:
        return "INFLATED_REWARD"  # Unusual high reward
    
    # 3. Mission type distribution
    action_mission_type = action.mission_type
    player_distribution = player_history.mission_types.distribution()
    if action_mission_type not in player_distribution:
        if action_mission_type == "high_reward_mission":
            return "NEW_HIGH_REWARD"  # Suspicious
    
    return "NORMAL"
```

#### Cross-User Validation (Witness)

**Peer Verification:**

```json
{
  "action_id": "uuid",
  "witnesses_required": 1,
  "witnesses_collected": 2,
  "witness_confirmations": [
    {
      "witness_player_id": "did:...",
      "confirmed_at": "2024-12-04T10:20:00Z",
      "confidence": "high"
    },
    {
      "witness_player_id": "did:...",
      "confirmed_at": "2024-12-04T10:22:00Z",
      "confidence": "high"
    }
  ],
  "witness_score": 1.0
}
```

**Scoring:**
```
if witnesses_collected >= witnesses_required:
    witness_score = min(1.0, witnesses_collected / (witnesses_required + 1))
else:
    witness_score = 0.0
```

### Output: Authenticity Decision

```json
{
  "action_id": "uuid",
  "authenticity_score": 92,
  "components": {
    "image_score": 0.85,
    "gps_score": 0.95,
    "timestamp_score": 0.9,
    "player_history_score": 0.8,
    "witness_score": 1.0,
    "deepfake_risk": 0.05,
    "pattern_abuse_risk": "NORMAL"
  },
  "decision": "AUTO_APPROVE",
  "reasoning": "Image authentic, GPS accurate, timestamp valid, 2 witnesses confirmed",
  "verified_at": "2024-12-04T10:35:00Z",
  "human_review_required": false
}
```

**Decision Logic:**
```
if authenticity_score >= 90 && deepfake_risk < 0.2:
    decision = "AUTO_APPROVE"
elif authenticity_score >= 70 && deepfake_risk < 0.5:
    decision = "AUTO_APPROVE"  (minor concerns)
elif authenticity_score >= 50 && authenticity_score < 70:
    decision = "HUMAN_REVIEW"  (flag for moderator)
else:
    decision = "REJECT"
    penalty = -10 XP  (fraud attempt penalty)
```

---

## 2. IMPACT AI (Quest Generation & Impact Projection)

### Purpose

Generate personalized quests, scale difficulty dynamically, and project impact across communities and time periods.

### Value Calculator

#### XP Generator (from IMPACT_ENGINE_SPEC)

```
base_xp = mission_type_xp + (duration_minutes / 10)
final_xp = base_xp × zone_difficulty × community_health × player_level × authenticity × time_sensitivity

Example: 62 base XP × 1.0 × 1.2 × 1.0 × 0.92 × 1.0 = 68 XP
```

#### Token Allocator

```python
def allocate_tokens(base_xp, action, player):
    """
    Mint Heart Tokens based on XP
    """
    
    # Base conversion: 10 XP = 1 token
    tokens_base = base_xp // 10
    
    # Bonus for high authenticity
    if authenticity_score >= 95:
        tokens_bonus = 1
    else:
        tokens_bonus = 0
    
    total_tokens = tokens_base + tokens_bonus
    
    return {
        "heart_tokens": total_tokens,
        "mint_reason": "action_completion",
        "exchange_rate": "10 XP = 1 token"
    }

# Example
allocate_tokens(68, action, player) → {"heart_tokens": 7, ...}
```

#### Impact Weighting Module (Fund Allocation)

```json
{
  "action_id": "uuid",
  "total_impact_value": 100,
  "fund_allocation": {
    "local_development_fund": 0.5,
    "national_ascension_fund": 0.3,
    "worldwalker_fund": 0.2
  },
  "breakdown": {
    "local_fund_amount": 50,
    "national_fund_amount": 30,
    "worldwalker_fund_amount": 20
  }
}
```

**Logic:**
```
if action.zone_type == "local":
    local = 0.7, national = 0.2, worldwalker = 0.1
elif action.zone_type == "national" or action.mission_type == "cultural":
    local = 0.4, national = 0.4, worldwalker = 0.2
elif action.mission_type == "worldwalker":
    local = 0.2, national = 0.3, worldwalker = 0.5
else:
    local = 0.5, national = 0.3, worldwalker = 0.2
```

#### Impact Projection

**Simple simulation model:**

```python
def simulate_impact_30days(starting_players, avg_completions_per_player_per_day, 
                           verification_rate, xp_per_completion):
    """
    Project 30-day impact
    """
    
    daily_projections = []
    
    for day in range(1, 31):
        # Player growth (assume 10% daily)
        daily_players = starting_players * (1.1 ** day)
        
        # Actions submitted
        daily_actions = daily_players * avg_completions_per_player_per_day
        
        # Verified (filter out fraud)
        daily_verified = daily_actions * verification_rate
        
        # XP distributed
        daily_xp = daily_verified * xp_per_completion
        
        # Tokens minted (1 token per 10 XP)
        daily_tokens = daily_xp / 10
        
        daily_projections.append({
            "day": day,
            "players": int(daily_players),
            "actions_submitted": int(daily_actions),
            "actions_verified": int(daily_verified),
            "xp_distributed": int(daily_xp),
            "tokens_minted": int(daily_tokens)
        })
    
    return {
        "projection": daily_projections,
        "cumulative_30day": {
            "total_players": int(daily_players),
            "total_actions": int(sum(p["actions_verified"] for p in daily_projections)),
            "total_xp": int(sum(p["xp_distributed"] for p in daily_projections)),
            "total_tokens": int(sum(p["tokens_minted"] for p in daily_projections))
        }
    }

# Example pilot projection (100 starting players)
simulate_impact_30days(
    starting_players=100,
    avg_completions_per_player_per_day=2,
    verification_rate=0.85,
    xp_per_completion=50
)
```

**Output:**
```
Cumulative 30-day projection:
- Total players: ~1,744
- Total actions: 4,987
- Total XP distributed: 424,645
- Total tokens minted: 42,465
```

### Difficulty Scaling Engine

**Adaptive difficulty based on player stats:**

```python
def calculate_recommended_difficulty(player):
    """
    Recommend quest difficulty for player
    """
    
    player_power_level = (
        player.level * 100
      + player.total_xp / 10
      + len(player.badges) * 50
    )
    
    # Define difficulty bands
    if player_power_level < 500:
        return 1  # Beginner
    elif player_power_level < 1500:
        return 2  # Novice
    elif player_power_level < 3000:
        return 3  # Intermediate
    elif player_power_level < 5000:
        return 4  # Advanced
    else:
        return 5  # Expert

def generate_personalized_quests(player, num_quests=5):
    """
    Generate quests tailored to player
    """
    
    difficulty = calculate_recommended_difficulty(player)
    
    # Filter missions by difficulty + player interest
    eligible_missions = [
        m for m in all_missions
        if m.difficulty_level == difficulty
        and m.category in player.preferred_categories
    ]
    
    # Sort by predicted engagement (ML model)
    sorted_missions = sorted(
        eligible_missions,
        key=lambda m: predict_engagement(player, m),
        reverse=True
    )
    
    return sorted_missions[:num_quests]

def predict_engagement(player, mission):
    """
    Simple ML model to predict player engagement
    """
    
    score = (
        0.3 * mission_category_match(player, mission)
      + 0.25 * mission_difficulty_match(player, mission)
      + 0.2 * mission_reward_attractiveness(mission)
      + 0.15 * mission_community_engagement(mission)
      + 0.1 * mission_recency(mission)
    )
    
    return score

# Example output
generate_personalized_quests(player_level_5) → [
    {
        "mission_id": "mission_001",
        "title": "Clean Up Community Park",
        "difficulty": 2,
        "expected_duration_min": 90,
        "projected_xp": 65,
        "projected_tokens": 6,
        "engagement_score": 0.82
    },
    ...
]
```

---

## 3. SOCIAL AI (Community Health & Behavior Reinforcement)

### Purpose

Monitor community health, detect conflicts early, and reinforce positive behaviors through game mechanics and social feedback.

### Community Health Monitor

**Metrics:**

```python
def calculate_community_health_index(zone_id, days=7):
    """
    Overall health score 0-100
    """
    
    zone_actions = get_actions_in_zone(zone_id, days)
    zone_comments = get_comments_in_zone(zone_id, days)
    zone_upvotes = get_upvotes_in_zone(zone_id, days)
    
    # 1. Participation score (0-40)
    actions_per_day = len(zone_actions) / days
    target_actions_per_day = 50
    participation_score = min(40, (actions_per_day / target_actions_per_day) * 40)
    
    # 2. Sentiment score (0-30)
    total_interactions = len(zone_upvotes) + len(zone_comments)
    negative_comments = sum(1 for c in zone_comments if is_negative_sentiment(c))
    upvote_ratio = len(zone_upvotes) / total_interactions if total_interactions > 0 else 0.5
    sentiment_score = upvote_ratio * 30
    
    # 3. Growth score (0-30)
    new_players_this_week = count_new_players(zone_id, days)
    returning_players = count_returning_players(zone_id, days)
    growth_rate = (new_players_this_week + returning_players) / len(set(zone_actions.user_id))
    growth_score = min(30, growth_rate * 30)
    
    total_health = participation_score + sentiment_score + growth_score
    
    return {
        "zone_id": zone_id,
        "health_index": int(total_health),
        "participation_score": int(participation_score),
        "sentiment_score": int(sentiment_score),
        "growth_score": int(growth_score),
        "description": get_health_description(total_health)
    }

def get_health_description(health_index):
    if health_index >= 80:
        return "Thriving"
    elif health_index >= 60:
        return "Growing"
    elif health_index >= 40:
        return "Stable"
    elif health_index >= 20:
        return "Declining"
    else:
        return "Critical"

# Example output
calculate_community_health_index("zone_456") → {
    "zone_id": "zone_456",
    "health_index": 74,
    "description": "Growing",
    "participation_score": 28,
    "sentiment_score": 24,
    "growth_score": 22
}
```

### Conflict Detection Engine

**Keyword-based + behavioral analysis:**

```python
def detect_conflict_signals(zone_id, days=3):
    """
    Flag emerging conflicts
    """
    
    negative_keywords = ["hate", "stupid", "scam", "cheater", "unfair", "rigged"]
    
    zone_comments = get_comments_in_zone(zone_id, days)
    
    conflicts = []
    
    for comment in zone_comments:
        # 1. Keyword detection
        has_negative = any(kw in comment.text.lower() for kw in negative_keywords)
        
        # 2. Sentiment analysis (simple: negative if has_negative)
        if has_negative:
            # 3. Behavioral context
            commenter = get_player(comment.user_id)
            
            # Check if player is typically positive
            player_history = get_player_sentiment_history(commenter.user_id, days=7)
            historical_negative_ratio = player_history.negative_count / len(player_history)
            
            # Escalation risk if suddenly negative
            if historical_negative_ratio < 0.2 and has_negative:
                escalation_risk = "HIGH"
            else:
                escalation_risk = "MEDIUM"
            
            conflicts.append({
                "comment_id": comment.id,
                "user_id": comment.user_id,
                "text": comment.text,
                "negative_keywords": [kw for kw in negative_keywords if kw in comment.text.lower()],
                "escalation_risk": escalation_risk,
                "action": "ALERT_MODERATOR" if escalation_risk == "HIGH" else "MONITOR"
            })
    
    return {
        "zone_id": zone_id,
        "conflicts_detected": len(conflicts),
        "conflicts": conflicts,
        "alert_sent": len([c for c in conflicts if c["action"] == "ALERT_MODERATOR"]) > 0
    }

# Example output
detect_conflict_signals("zone_456") → {
    "zone_id": "zone_456",
    "conflicts_detected": 2,
    "conflicts": [
        {
            "comment_id": "comment_123",
            "user_id": "player_001",
            "text": "This mission is a scam!",
            "negative_keywords": ["scam"],
            "escalation_risk": "HIGH",
            "action": "ALERT_MODERATOR"
        }
    ],
    "alert_sent": true
}
```

### Behavior Reinforcement System

**Reward positive behaviors:**

```python
def apply_behavior_reinforcement(zone_id):
    """
    Incentivize positive community behaviors
    """
    
    # 1. Helper Badge (witness 10 actions)
    players_witnessing = get_players_witnessing_actions(zone_id, count_threshold=10)
    for player in players_witnessing:
        award_badge(player.user_id, "helper", "Witnessed 10+ actions this week")
    
    # 2. Mentor Badge (upvoted 20+ times)
    players_upvoted = get_players_upvoted(zone_id, count_threshold=20)
    for player in players_upvoted:
        award_badge(player.user_id, "mentor", "Earned 20+ upvotes this month")
    
    # 3. Community Hero Badge (consistent positive comments)
    players_positive = get_players_positive_comments(zone_id, threshold=0.8, min_comments=10)
    for player in players_positive:
        award_badge(player.user_id, "community_hero", "80%+ positive comments")
    
    # 4. Boost tokens for zone during low-participation days
    health_index = calculate_community_health_index(zone_id)
    if health_index < 40:
        # Temporary 2x token multiplier for actions in this zone
        set_zone_token_multiplier(zone_id, 2.0, duration_hours=24)
        notify_players(zone_id, "🚀 Community Boost! 2x tokens for 24 hours!")
    
    return {
        "badges_awarded": len(players_witnessing) + len(players_upvoted) + len(players_positive),
        "zone_boost_active": health_index < 40
    }
```

---

## Pilot Implementation Roadmap

### Week 1: Verification AI (MVP)

**Deliverables:**
1. Image analyzer (EXIF extraction)
2. GPS validator (zone bounds check)
3. Timestamp verifier (consistency check)
4. Simple scoring model (logistic regression)

**Testing:**
- 50 sample images (authentic + fraudulent)
- Verify false positive rate < 5%

### Week 2: Authenticity Engine

**Deliverables:**
1. Deepfake detection (heuristics-based)
2. Pattern abuse detector (Z-score)
3. Witness validation integration

**Testing:**
- End-to-end with Proof Layer
- 100 test submissions with ground truth labels

### Week 3: Impact AI (MVP)

**Deliverables:**
1. XP generator (base + multipliers)
2. Token allocator
3. Difficulty scaling engine

**Testing:**
- 500 simulated player actions
- Verify token distribution follows expected curve

### Week 4: Social AI + Integration

**Deliverables:**
1. Community health monitor
2. Conflict detection (keyword-based)
3. Behavior reinforcement badges

**Testing:**
- Monitor live pilot community
- Verify conflict alerts timely and accurate

---

## Success Metrics (Pilot)

| Metric | Target | Measurement |
|---|---|---|
| Verification Accuracy | >95% | Ground truth comparison |
| False Positive Rate | <3% | Legitimate actions rejected |
| False Negative Rate | <5% | Fraudulent actions passed |
| Deepfake Detection | >80% | Test set evaluation |
| Impact Projection Accuracy | ±10% | Compare projection vs. actual |
| Community Health Index | >60 | 7-day rolling average |
| Conflict Detection Latency | <1h | Alert time from comment |
| Behavior Reinforcement Engagement | +20% | Badges → more participation |

---

## Data Privacy & Governance

```
- No facial recognition storage (only temporary for detection)
- EXIF data stripped before media archival
- Comments anonymized in reports (no names)
- Player consent required for AI analysis (PDPA Thailand)
- Monthly audit of AI decisions
- Human review available for appeals
```

---

**Owner:** AI/ML Engineering Team  
**Last Updated:** December 4, 2025  
**Status:** Ready for Pilot Implementation
