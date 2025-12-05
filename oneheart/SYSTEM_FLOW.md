# ONEHEART SYSTEM FLOW
## Real World Action → Verification → Impact → Progression → Knowledge Return

This document describes the complete end-to-end flow of OneHeart: from a real-world action through verification, impact calculation, player progression, mission unlocks, and finally knowledge transfer back to local communities.

```
[Real World Action]
        ↓
        [Verification AI]
                ↓
                [Impact Engine]
                        ↓
                        [XP / Tokens / Badges]
                                ↓
                                [Player Progression]
                                        ↓
                                        [Unlock Missions / Rewards]
                                                ↓
                                                [Local → National → Global Quests]
                                                        ↓
                                                        [Return Knowledge]
                                                                ↓
                                                                [Upgrade Thailand]
```

---

## Stage 1: Real World Action

**What happens:**
- Player completes a real-world mission: e.g., cleanup at Tourism Point, skill training at Community Node, or micro-task in Needs Area.
- Player captures evidence (photos, GPS, time, metadata) via mobile app.
- Evidence is submitted to `/api/proof/submit` endpoint (Proof Layer).

**Data collected:**
- User DID, mission ID, action type, location, timestamp
- Evidence media (photos/video), EXIF metadata
- Peer witness signals (optional)

---

## Stage 2: Verification AI

**What happens:**
- Evidence enters Integrity AI pipeline for anti-cheat and authenticity checks.
- Checks run:
  - **Anti-Cheat heuristics:** geolocation consistency, time plausibility, device patterns
  - **Deepfake Filter:** screen media for synthetic/edited content
  - **Pattern Abuse Detector:** detect coordinated abuse or replay attempts
- Integrity score is computed (0–100).
- Evidence is flagged for human review if score is uncertain or below threshold.

**Output:**
- Verified/Rejected status
- Integrity score + reason
- Flagged cases routed to Verification Service for human moderator review

---

## Stage 3: Impact Engine

**What happens (verified evidence only):**
- Verified evidence feeds into Impact Engine.
- Engine calculates:
  - **Base XP:** fixed per mission type (e.g., 50 XP for cleanup, 100 XP for training).
  - **Impact Credits (IU):** estimated real-world value impact (beneficiaries, hours × skills, outcome quality).
  - **Multipliers:** zone difficulty, community health bonus, seasonal effects.
  - **Token issuance:** XP → Heart Tokens conversion (e.g., 10 XP = 1 Heart Token).
  - **Badges:** unlock achievement badges based on thresholds (e.g., "First 10 cleanups" → bronze badge).

**Output:**
- XP amount, Heart Tokens, Impact Credits, Badges
- Ledger entry (append-only record for transparency)

---

## Stage 4: XP / Tokens / Badges

**What happens:**
- Player receives:
  - **XP:** visible in XP Tree; contributes to level-up progression.
  - **Heart Tokens:** spendable currency in Reward Marketplace; can be held or redeemed.
  - **Impact Credits:** internal accounting; visible in Impact Summary dashboard; used for leaderboards and sponsor allocation signals.
  - **Badges:** added to Player Inventory; visible in profile and guild.

**Dashboard updates:**
- Player Dashboard: XP bar fills, token balance updates, badges appear.
- Leaderboard: player rank updated by Impact Credits.

---

## Stage 5: Player Progression

**What happens:**
- Cumulative XP triggers level-ups (e.g., 0–100 XP = Level 1, 100–300 = Level 2, etc.).
- Each level-up unlocks new skill branches in XP Tree.
- Skill branches grant:
  - Passive bonuses (e.g., +5% XP on certain mission types)
  - Access to higher-difficulty missions
  - Mentor roles (unlock after reaching Level 5+)

**Example:**
- Player completes 5 cleanups → Level 2 → unlocks "Environmental Leadership" branch.

---

## Stage 6: Unlock Missions / Rewards

**What happens:**
- Progression unlocks access to new missions:
  - **Local Missions:** mini-expeditions in player's home region (low difficulty).
  - **National Missions:** cross-region collaborations (medium difficulty, unlock at Level 5+).
  - **Global Missions:** Worldwalker-type expeditions abroad (high difficulty, unlock at Level 10+, requires prep).
  
- Progression also unlocks marketplace rewards:
  - Bronze (Level 1–3): local travel gear, basic vouchers.
  - Silver (Level 4–7): regional experiences, training vouchers.
  - Gold (Level 8+): international travel passes, Worldwalker fund eligibility.

**Trigger points:**
- `GET /api/missions?level=X&player_id=Y` returns available missions.
- Unlock via event stream: `player.level_up` → check unlock rules → publish `mission.unlocked` event.

---

## Stage 7: Local → National → Global Quest Progression

**What happens:**

### Local Quests
- Start in player's home zone.
- Examples: 10 cleanups (tourism point), mentor 3 locals (community node), resolve 1 local crisis.
- Impact: local fund allocation, home zone improvement metrics.

### National Quests
- Require cross-region collaboration or travel.
- Examples: R&D mission with universities, sports training exchange, cultural fest coordination.
- Impact: national fund allocation, inter-zone reputation bonuses.

### Global Quests
- Worldwalker missions or global campaigns.
- Examples: research abroad (R&D), international cultural exchange, global pandemic response.
- Impact: Worldwalker fund allocation, global leaderboard, international reputation.

**Progression rules:**
- Complete 50% of Local Quests → unlock National.
- Complete 50% of National Quests + Level 8+ → eligible for Global.
- Each tier feeds upward: Local impact → National aggregation → Global multiplier.

**Data model:**
```
Quest {
  id, tier (local/national/global),
  zone_id, location_bounds,
  unlock_condition (level, quest_count, item_requirement),
  impact_multiplier (1x local, 1.5x national, 2x global)
}
```

---

## Stage 8: Return Knowledge & Thailand Upgrade

**What happens after Worldwalker expeditions:**

### Knowledge Transfer
- **Structured Debrief:** player documents learnings (template: what worked, what failed, resources needed).
- **Mentorship:** player becomes junior mentor to next cohort preparing for similar expeditions.
- **Documentation:** video/written guides published to Learning Portal for others.

### Local Implementation
- Player/team pilots locally adapted versions of successful global missions.
- Examples:
  - "R&D project from Japan adapted for Thai context" → Local Implementation quest.
  - Run 2–3 cycles with measurement and refinement.

### Thailand Upgrade Impact
- Aggregated outcomes measured via KPIs:
  - **Skills upgraded:** X workers trained in new skills.
  - **Infrastructure:** Y communities have new facilities/resources.
  - **Economic uplift:** Z new job placements or income increases.
  - **Social capital:** reputation and peer network growth.

**Measurement:**
- Local Implementation Ledger tracks:
  - Original mission (global), adapted mission (local), outcomes, cost vs. value.
- Annual "Thailand Upgrade Report" aggregates impact across all return phases.

**Incentives:**
- Successful Local Implementation grants:
  - +50% XP bonus for mentors.
  - Unlock "Mentor" badge tier.
  - Nomination for National/Worldwalker leadership roles.

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                       Proof Layer                                   │
│                  (Evidence Ingestion)                               │
│   POST /api/proof/submit → { user_did, mission_id, media, meta }  │
└──────────────────┬──────────────────────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────────────────────┐
│                     Integrity AI                                    │
│    (Anti-Cheat, Deepfake, Pattern Abuse Detection)                │
│    Output: { verified: bool, integrity_score: 0-100 }             │
└──────────────────┬──────────────────────────────────────────────────┘
                   │
         (if verified)
                   │
                   ↓
┌─────────────────────────────────────────────────────────────────────┐
│                     Impact Engine                                   │
│    (XP, Token, Badge Calculation)                                  │
│    Output: { xp, tokens, impact_credits, badges }                 │
└──────────────────┬──────────────────────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────────────────────┐
│                  Player State Update                                │
│    (Ledger writes, XP accumulation, level-up checks)              │
│    Publish: player.level_up, mission.unlocked events              │
└──────────────────┬──────────────────────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────────────────────┐
│               Mission Unlock & Progression                          │
│    (Quest system auto-unlocks higher tiers, global eligibility)    │
│    GET /api/missions?tier=global&player_id=X                      │
└──────────────────┬──────────────────────────────────────────────────┘
                   │
      (Player completes Global Quest/Worldwalker expedition)
                   │
                   ↓
┌─────────────────────────────────────────────────────────────────────┐
│             Knowledge Transfer & Local Implementation               │
│    (Debrief, mentorship, local mission templates, outcome tracking)│
│    Publish: localImplementation.completed event                    │
└──────────────────┬──────────────────────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────────────────────┐
│                  Thailand Upgrade Aggregation                       │
│    Annual report: skills trained, infrastructure, income, social   │
│    national impact metrics, fund allocation recommendations        │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Implementation Roadmap (Phased)

### Phase 1 (Pilot): Stages 1–5
- Proof Layer + Verification AI in place.
- Impact Engine calculates XP/Tokens.
- Player progression and local missions only.
- Duration: 4 weeks.

### Phase 2 (Scale): Stages 6–7
- Add National/Global quest tiers.
- Unlock system wired to progression.
- Cross-zone missions operational.
- Duration: 8 weeks (post-pilot feedback integration).

### Phase 3 (Impact): Stage 8
- Worldwalker expeditions run (domestic trial then global).
- Knowledge transfer processes formalized.
- Local implementation templates and tracking.
- Annual Thailand Upgrade report published.
- Duration: ongoing (6+ months for full cycle).

---

## Success Metrics (per stage)

| Stage | Metric | Target (Pilot) |
|-------|--------|----------------|
| Real World Action | Actions submitted | 500+ proofs |
| Verification AI | Verification rate (%) | >85% verified |
| Impact Engine | Avg tokens/action | 1–5 tokens |
| Player Progression | Level 5+ players (%) | >30% |
| Missions Unlocked | Avg missions/player | 8+ |
| Local→Global | Cross-tier players (%) | >20% reach National |
| Knowledge Return | Debriefs completed | 100% Worldwalker cohort |
| Thailand Upgrade | Impact metric uplift | +20% beneficiaries trained |

---

## Next Actions (Pick One)

1. **Implement Proof → Verification pipeline:** wire Proof Layer evidence to Integrity AI; build heuristics module.
2. **Extend Impact Engine:** create token/XP calculator and ledger write logic; test with sample data.
3. **Build Mission Unlock system:** implement `player.level_up` event handler; query and unlock missions by tier.
4. **Run Pilot Flow Test:** manually walk through stages 1–5 with sample user and verify all data flows correctly.

Tell me which phase (1–4) you'd like me to implement first — I'll start coding and update the TODO accordingly.
