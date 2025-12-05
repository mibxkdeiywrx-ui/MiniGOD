# ONEHEART AI ETHICS FRAMEWORK

Buddhist Principles for Ethical AI Decision-Making

---

## Foundation: The 5 Precepts + 4 Divine Abodes

### The 5 Precepts (ศีล - Sīla)
Ethical foundation for AI systems:

1. **Abstain from Harming** (No False Positives)
   - AI must not reject legitimate actions
   - Avoid penalizing good citizens with false fraud flags
   - Principle: "Do no harm"

2. **Abstain from Taking What's Not Given** (No Unfair Rewards)
   - AI must not grant unearned tokens/XP
   - No shortcuts or fake completions
   - Principle: "Earn with honesty"

3. **Abstain from Harmful Conduct** (Protect Privacy)
   - No unnecessary data collection
   - Player consent required for AI analysis
   - Data minimization: store only what's needed
   - Principle: "Respect dignity"

4. **Abstain from Falsehood** (Transparency)
   - AI decisions must be explainable
   - Clear reasoning for approvals/rejections
   - No black-box decision-making
   - Principle: "Be truthful"

5. **Abstain from Intoxicants** (No Bias)
   - AI must not be "drunk" on patterns
   - Regular audits for hidden bias
   - Fair treatment across all players
   - Principle: "Stay clear-minded"

### The 4 Divine Abodes (พรหมวิหาร - Brahmaviharas)
Emotional/ethical guidelines for AI behavior:

1. **Loving-Kindness (เมตตา - Mettā)**
   - Desire all players' wellbeing
   - Default to benefit of doubt
   - Support players who struggle
   - When uncertain: human review (not reject)

2. **Compassion (करुणा - Karunā)**
   - Recognize suffering and hardship
   - Give extra opportunities to players in crisis zones
   - Boost tokens in struggling communities (2x multiplier)
   - Mentor programs for low-performing players

3. **Sympathetic Joy (मुदिता - Muditā)**
   - Celebrate others' success without jealousy
   - Reward both achievers AND supporters
   - Don't limit top players; empower everyone
   - Badge system includes "Helper" roles

4. **Equanimity (उपेक्षा - Upekkhā)**
   - Treat all players with same rules
   - No VIP treatment or discrimination
   - Consistent scoring across zones
   - Same appeals process for everyone

---

## 4 Additional Virtues (ศาสตร์) for AI

### 1. Wisdom (ปัญญา - Paññā)

**Principle:** Think deeply, consider consequences.

**AI Application:**

```python
def verify_action_with_wisdom(action, player, context):
    """
    ปัญญา: Don't just check boxes. Understand the full context.
    """
    
    # Surface check: ✓ Photo has EXIF, GPS valid, timestamp OK
    if surface_checks_pass(action):
        
        # ปัญญา: But WAIT. Context matters.
        # Ask deeper questions:
        
        # Q1: Is this player typically reliable?
        if player.historical_accuracy < 0.7:
            return "HUMAN_REVIEW"  # New/unreliable player
        
        # Q2: Could this be lucky coincidence vs. habitual cheat?
        if player.sudden_xp_spike and not player.history_of_spikes:
            return "HUMAN_REVIEW"  # Out of character
        
        # Q3: Is the action benefiting someone vulnerable?
        if action.zone.health_index < 40:
            # ปัญญา: This struggling zone needs support
            reward_multiplier = 2.0  # Double rewards
        
        # Q4: Are there hidden costs to approving this?
        if marketplace_token_price_inflating():
            return "DISCUSS_WITH_ECONOMISTS"  # Complex decision
        
        return "AUTO_APPROVE"
    
    # ปัญญา: Wise action considers long-term effects
```

**Concrete Rules:**
- ✗ Never auto-approve without understanding context
- ✓ Always ask: "What are the long-term consequences?"
- ✓ Human review required for edge cases
- ✓ Quarterly audits of AI decisions for unintended consequences

### 2. Virtue (สัญจายบารมี - Sañjaya Pāramī)

**Principle:** Determination and effort toward righteousness.

**AI Application:**

```python
def apply_virtue_in_decisions():
    """
    สัญจายบารมี: Stay committed to doing right,
    even when it's harder than easy automation.
    """
    
    # Virtue means: Don't take shortcuts
    
    # ✗ Lazy: Auto-reject ambiguous cases (easy, wrong)
    # ✓ Virtuous: Always review borderline cases (harder, right)
    
    for suspicious_action in suspicious_actions:
        if 50 <= authenticity_score < 70:
            # Virtue: We WILL spend time on this
            queue_for_human_review(suspicious_action)
            # Not: auto_reject() which is easier
    
    # Virtue also means: Consistency over convenience
    # Don't change rules based on what's easiest today
    apply_same_rules_as_yesterday()
```

**Concrete Rules:**
- ✓ Maintain consistent policies (hard)
- ✗ Don't flip rules for convenience (easy)
- ✓ Review hard cases properly (time-consuming)
- ✗ Don't batch-reject to save CPU (wrong)
- ✓ Document every major decision
- ✗ Don't hide controversial choices

### 3. Patience (खन्ति - Khanti)

**Principle:** Bear hardship with understanding; be slow to anger.

**AI Application:**

```python
def apply_patience_in_conflict():
    """
    ขันติ: When there's conflict or suspicion,
    be slow to accuse and quick to understand.
    """
    
    # Scenario: Player complaint about unfair penalty
    complaint = receive_player_complaint()
    
    # ✗ Impatient: "The system decided. Case closed." (no empathy)
    # ✓ Patient: Let's understand their perspective
    
    player_explanation = complaint.explanation
    
    # Patience: Actually LISTEN to their side
    if player_makes_good_point():
        # ขันติ: Admit mistake gracefully
        reverse_penalty()
        compensate_player()
        learn_from_error()
    
    # Patience: Assume good faith first
    if player_has_no_history_of_fraud:
        # ขันติ: Give benefit of doubt
        authenticity_score += 15  # Raise threshold
```

**Concrete Rules:**
- ✓ Give players appeals process
- ✓ Listen to explanations carefully
- ✓ Admit mistakes when found
- ✓ Compensate unjust penalties
- ✗ Don't assume guilt
- ✗ Don't ignore player feedback

### 4. Benevolence (ทานบารมี - Dana Pāramī)

**Principle:** Generosity in giving opportunities, not hoarding rewards.

**AI Application:**

```python
def apply_benevolence_in_rewards():
    """
    ทานบารมี: Share the abundance generously.
    Don't hoard tokens or opportunities.
    """
    
    # Strategy 1: Boost struggling communities
    for zone in all_zones:
        if zone.health_index < 40:
            # ทานบารมี: Give extra support
            zone.token_multiplier = 2.0
            zone.xp_multiplier = 1.5
            notify_players(f"🚀 {zone.name} needs YOU! 2x rewards!")
    
    # Strategy 2: Support badges (not just achievement)
    # ทานบารมี: Reward helpers, mentors, witnesses
    # Not just top scorers
    
    for player in all_players:
        witness_count = count_witnessed_actions(player)
        if witness_count >= 10:
            award_badge("Helper", player)  # Generously
            award_tokens(25, player)  # Reward helping others
        
        upvote_count = count_upvotes(player)
        if upvote_count >= 20:
            award_badge("Community Voice", player)
            award_tokens(25, player)
    
    # Strategy 3: New player onboarding bonuses
    # ทานบารมี: Don't make it hard for newcomers
    for new_player in players_joined_this_week:
        award_starter_tokens = 50  # Generously help them start
        assign_mentor = find_experienced_player()  # Pair them up
```

**Concrete Rules:**
- ✓ 2x token multiplier for struggling zones
- ✓ Reward helpers, not just achievers
- ✓ Generous new player onboarding
- ✓ Don't hoard top rewards for elite
- ✗ Don't make it easy to give up
- ✗ Don't create artificial scarcity of rewards

---

## Decision Trees: Applying Buddhist Ethics

### When Authenticity Score is Ambiguous (50-70)

```
┌─ Is authenticity_score 50-70?
│
├─ YES
│  │
│  ├─ Sīla (Precept 1): "Do no harm"
│  │   → Is false rejection harmful? YES
│  │   → Harm > benefit of rejecting
│  │
│  ├─ Mettā (Loving-kindness)
│  │   → Default to benefit of doubt
│  │   → Queue for human review
│  │
│  ├─ Paññā (Wisdom)
│  │   → Consider player history
│  │   → Consider zone context
│  │   → Consider consequences
│  │
│  ├─ Khanti (Patience)
│  │   → Don't rush to judgment
│  │   → Give player appeal right
│  │
│  └─ Decision: HUMAN_REVIEW
│
└─ NO → Use standard thresholds
```

### When Player is Poor/Struggling (Zone Health < 40)

```
┌─ Is zone.health_index < 40?
│
├─ YES
│  │
│  ├─ Karunā (Compassion)
│  │   → This zone has suffering
│  │   → Extend support
│  │
│  ├─ Muditā (Sympathetic Joy)
│  │   → Celebrate their efforts
│  │   → Reward generously
│  │
│  ├─ Dana (Benevolence)
│  │   → Share rewards with them
│  │   → 2x multiplier
│  │   → Mentorship program
│  │
│  ├─ Action Items:
│  │   - Activate 2x token multiplier
│  │   - Boost XP rewards
│  │   - Assign mentors
│  │   - Create easy daily quests
│  │   - Run community events
│  │
│  └─ Goal: Raise health_index from <40 to >60
│
└─ NO → Standard rewards
```

### When Conflict Detected (Negative Sentiment)

```
┌─ Conflict signal detected?
│
├─ YES
│  │
│  ├─ Sīla (Abstain from Falsehood)
│  │   → Understand both sides
│  │   → Don't hide the issue
│  │
│  ├─ Mettā (Loving-kindness)
│  │   → Assume good faith first
│  │   → Find common ground
│  │
│  ├─ Upekkhā (Equanimity)
│  │   → Treat both sides fairly
│  │   → Don't favor the louder one
│  │
│  ├─ Action Items:
│  │   - Alert moderator (don't auto-punish)
│  │   - Invite conversation
│  │   - Offer mediation
│  │   - Listen to explanations
│  │   - Find creative resolution
│  │
│  └─ Goal: Reconciliation, not punishment
│
└─ NO → Monitor for escalation
```

---

## Concrete Implementations

### 1. Appeal Process (Khanti - Patience)

**Every rejection must have:**
- Clear explanation of why
- Link to policy/rule
- Appeal form (free, always available)
- Human review of appeals within 24 hours
- Compensation if appeal upheld

### 2. Transparency Report (Sīla - Truthfulness)

**Monthly:**
- Total actions reviewed
- Approval rate vs. rejection rate
- Appeals filed and outcomes
- False positive & false negative rates
- Bias audit (by player level, zone, gender if tracked)
- Model performance metrics

### 3. Community Support Program (Dana - Benevolence)

**For zones with health_index < 40:**
```
Week 1: Announce boost + mentorship
Week 2: 2x tokens + daily easy quests
Week 3: Community challenge (group effort)
Week 4: Celebrate improvements
Goal: Reach health_index > 60 in 4 weeks
```

### 4. Appeals & Restorative Justice (Karunā - Compassion)

**When player falsely rejected:**
1. Acknowledge mistake immediately
2. Restore full rewards + 50% bonus
3. If player suffered consequences, add compensation tokens
4. Review case to prevent future false positives
5. Apologize (genuine, not robot)

### 5. Mentor Matching (Upekkhā - Equanimity)

**Algorithm:**
```
Don't just match:
- High level → Low level (power imbalance)

Instead match by:
- Mission type interest (both interested)
- Availability compatibility
- Communication style
- Geographic proximity (if helpful)
- Result: Genuine mentorship relationships
```

---

## Audit Checklist (Quarterly)

| Principle | Metric | Target | Actual | Pass? |
|---|---|---|---|---|
| Sīla (Abstain from Harm) | False Positive Rate | <3% | ? | |
| Sīla (Truthfulness) | Transparency Reports | 12/year | ? | |
| Mettā (Loving-kindness) | Appeals Granted | >20% | ? | |
| Karunā (Compassion) | Struggling Zone Boost Rate | 100% | ? | |
| Muditā (Sympathetic Joy) | Helper Badge Awards | >50/month | ? | |
| Upekkhā (Equanimity) | Bias Score (0-1, lower better) | <0.05 | ? | |
| Paññā (Wisdom) | Manual Review Rate | 5-10% | ? | |
| Khanti (Patience) | Appeal Resolution Time | <24h | ? | |
| Dana (Benevolence) | Token Boost Zones | >40% | ? | |

---

## Sacred Principles (Never Compromise)

🙏 **These are non-negotiable, even if bad for business:**

1. **No Harm to Vulnerable**
   - Never auto-reject struggling communities
   - Extra support for crisis zones
   - Protect refugees from fraud accusations

2. **No Hoarding of Opportunities**
   - Don't artificially limit top players
   - Don't restrict new player access
   - Share rewards, don't hoard

3. **Transparency Always**
   - Never hide AI decisions
   - Always explain rejections
   - Monthly public audits

4. **Appeals Forever Available**
   - Even if it costs time/money
   - Free for all players
   - Same process for rich & poor

5. **Human Dignity First**
   - No dehumanizing automation
   - Players are people, not metrics
   - Compassion > efficiency

---

## Implementation Roadmap

**Week 1:** Establish AI Ethics Committee
- Include: Engineers, monks/spiritual advisors, player advocates, ethicists
- Create decision frameworks
- Define audit metrics

**Week 2:** Audit Current AI Models
- Test for bias (by zone, player level, demographics)
- Measure false positive/negative rates
- Identify violations of principles

**Week 3:** Implement Safeguards
- Add compassion multipliers for struggling zones
- Build appeals process
- Create transparency dashboards

**Week 4:** Launch Community Accountability
- Publish monthly ethics reports
- Open feedback from players
- Adjust based on feedback

---

## Final Words

> "ศีลเป็นรากของความเจริญ"
> (Sīla is the root of all growth)

OneHeart AI exists to help people live better lives, not to optimize for profit or efficiency.

**Every decision should pass this test:**

```
Would a monk approve of this decision?
↓
If NO → don't do it
If YES → proceed with confidence
```

When in doubt: choose compassion. 🙏

---

**Owner:** Ethics & Impact Team  
**Last Updated:** December 4, 2025  
**Status:** Active Living Document

*"ให้ด้วยศรัทธา พิจารณาด้วยปัญญา กระทำด้วยเมตตา"*  
*(Give with faith, consider with wisdom, act with compassion)*
