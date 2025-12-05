/**
 * Impact Engine Service
 * 
 * Core business logic for:
 * - Calculating XP from quests
 * - Minting Heart Tokens
 * - Recording impact ledger
 * - Allocating funds (Local/National/Global)
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ImpactCalculation {
    baseXp: number;
    finalXp: number;
    tokens: number;
    impactCredits: number;
    fundAllocation: {
        local: number;
        national: number;
        global: number;
    };
}

/**
 * Calculate impact from a completed quest
 * 
 * Formula:
 * base_xp = mission_type_xp + (duration_minutes / 10)
 * final_xp = base_xp × zone_difficulty × community_health × player_level × authenticity × time_sensitivity
 * tokens = floor(base_xp / 10) + bonus
 * impact_credits = base_xp × beneficiary_multiplier × outcome_quality
 */
export async function calculateQuestImpact(
    playerId: string,
    questId: string,
    durationMinutes: number,
    authenticityScore: number = 100,
    beneficiariesCount: number = 1
): Promise<ImpactCalculation> {

    // Get player and quest data
    const player = await prisma.player.findUnique({
        where: { id: playerId }
    });

    const quest = await prisma.quest.findUnique({
        where: { id: questId }
    });

    if (!player || !quest) {
        throw new Error('Player or Quest not found');
    }

    // Step 1: Base XP (mission type + duration)
    const missionTypeXp: Record<string, number> = {
        'cleanup': 50,
        'training': 100,
        'cultural': 75,
        'research': 150,
        'sports': 80
    };

    const baseXp = (missionTypeXp[quest.category] || 50) + Math.floor(durationMinutes / 10);

    // Step 2: Apply multipliers
    const zoneDifficultyMultiplier = 1.0; // TODO: Load from zone data
    const communityHealthBonus = 1.2; // TODO: Calculate from zone health
    const playerLevelMultiplier = player.level >= 9 ? 0.8 : 1.0; // Diminishing returns
    const authenticityMultiplier = authenticityScore / 100;
    const timeSensitivityBonus = 1.0; // TODO: Check if crisis/event

    const finalXp = Math.floor(
        baseXp *
        zoneDifficultyMultiplier *
        communityHealthBonus *
        playerLevelMultiplier *
        authenticityMultiplier *
        timeSensitivityBonus
    );

    // Step 3: Token allocation (10 XP = 1 token, +1 bonus for high auth)
    const tokens = Math.floor(finalXp / 10) + (authenticityScore >= 95 ? 1 : 0);

    // Step 4: Impact credits (outcome quality)
    const outcomeQuality = quest.category === 'training' ? 1.2 : 1.0;
    const beneficiaryMultiplier = beneficiariesCount / 5;
    const impactCredits = finalXp * beneficiaryMultiplier * outcomeQuality;

    // Step 5: Fund allocation (Local/National/Global split)
    const fundAllocation = {
        local: 0.5,
        national: 0.3,
        global: 0.2
    };

    return {
        baseXp,
        finalXp,
        tokens,
        impactCredits,
        fundAllocation
    };
}

/**
 * Award impact to player
 * - Update XP total
 * - Mint tokens
 * - Record in ledger
 * - Check for level-ups
 * - Award badges
 */
export async function awardQuestCompletion(
    playerId: string,
    questId: string,
    proofUrl: string,
    durationMinutes: number,
    authenticityScore: number = 100,
    beneficiariesCount: number = 1
): Promise<{
    playerId: string;
    xpAwarded: number;
    tokensAwarded: number;
    leveledUp: boolean;
    newLevel?: number;
    badgesEarned?: string[];
}> {

    // Calculate impact
    const impact = await calculateQuestImpact(
        playerId,
        questId,
        durationMinutes,
        authenticityScore,
        beneficiariesCount
    );

    // Update player XP
    const player = await prisma.player.findUnique({
        where: { id: playerId }
    });

    if (!player) throw new Error('Player not found');

    const newXpTotal = player.xpTotal + impact.finalXp;
    const oldLevel = player.level;
    const newLevel = calculateLevel(newXpTotal);
    const leveledUp = newLevel > oldLevel;

    // Update player
    const updatedPlayer = await prisma.player.update({
        where: { id: playerId },
        data: {
            xpTotal: newXpTotal,
            level: newLevel
        }
    });

    // Record impact log
    await prisma.impactLog.create({
        data: {
            playerId,
            questId,
            xpAwarded: impact.finalXp,
            tokenAwarded: impact.tokens,
            impactValue: impact.impactCredits,
            breakdown: impact.fundAllocation
        }
    });

    // Mint tokens (append-only ledger)
    await prisma.tokenLedger.create({
        data: {
            playerId,
            amount: impact.tokens,
            type: 'mint',
            source: 'quest_completion',
            transactionId: `quest_${questId}_${Date.now()}`
        }
    });

    // Mark quest as completed
    await prisma.playerQuest.updateMany({
        where: {
            playerId,
            questId
        },
        data: {
            status: 'completed',
            completedAt: new Date(),
            score: authenticityScore,
            proofUrl
        }
    });

    // Check for badges
    const badges = await checkBadges(playerId, impact);

    return {
        playerId,
        xpAwarded: impact.finalXp,
        tokensAwarded: impact.tokens,
        leveledUp,
        newLevel,
        badgesEarned: badges
    };
}

/**
 * Calculate player level from XP
 * 
 * Level 1: 0–100 XP
 * Level 2: 100–300 XP
 * Level 3: 300–600 XP
 * ...
 * Level 10: 5000–7000 XP
 */
function calculateLevel(totalXp: number): number {
    const levels = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 5000, 7000];
    for (let i = levels.length - 1; i >= 0; i--) {
        if (totalXp >= levels[i]) {
            return i + 1;
        }
    }
    return 1;
}

/**
 * Check for badge achievements
 */
async function checkBadges(playerId: string, impact: ImpactCalculation): Promise<string[]> {
    const badges: string[] = [];

    // TODO: Implement badge logic based on player history
    // Examples:
    // - "Eco Warrior" after 10 cleanup missions
    // - "Mentor" after 5 mentoring sessions
    // - "Impact Maker" after 500 impact credits
    // - "Helper" after witnessing 10 actions

    return badges;
}

/**
 * Get player stats (XP, level, tokens)
 */
export async function getPlayerStats(playerId: string) {
    const player = await prisma.player.findUnique({
        where: { id: playerId },
        include: {
            quests: {
                where: { status: 'completed' }
            },
            tokens: {
                orderBy: { timestamp: 'desc' },
                take: 10
            }
        }
    });

    if (!player) throw new Error('Player not found');

    // Calculate total tokens (sum of mints minus burns)
    const tokenBalance = await prisma.tokenLedger.aggregate({
        where: { playerId },
        _sum: {
            amount: true
        }
    });

    return {
        playerId: player.id,
        name: player.name,
        level: player.level,
        totalXp: player.xpTotal,
        tokenBalance: tokenBalance._sum.amount || 0,
        questsCompleted: player.quests.length,
        stats: player.stats,
        alignment: player.alignment,
        createdAt: player.createdAt
    };
}

/**
 * Record token transaction (transfer, redeem, etc)
 */
export async function recordTokenTransaction(
    playerId: string,
    amount: number,
    type: 'mint' | 'burn' | 'transfer' | 'redeem',
    source: string
): Promise<void> {

    // Validate player exists
    const player = await prisma.player.findUnique({
        where: { id: playerId }
    });

    if (!player) throw new Error('Player not found');

    // Validate sufficient balance for burn/transfer/redeem
    if (['burn', 'transfer', 'redeem'].includes(type)) {
        const balance = await prisma.tokenLedger.aggregate({
            where: { playerId },
            _sum: { amount: true }
        });

        const current = balance._sum.amount || 0;
        if (amount > current) {
            throw new Error(`Insufficient balance. Current: ${current}, Required: ${amount}`);
        }
    }

    // Record transaction
    await prisma.tokenLedger.create({
        data: {
            playerId,
            amount: type === 'burn' || type === 'transfer' || type === 'redeem' ? -amount : amount,
            type,
            source,
            transactionId: `${type}_${playerId}_${Date.now()}`
        }
    });
}

/**
 * Get impact log for player (last 30 days)
 */
export async function getPlayerImpactLog(playerId: string) {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const impacts = await prisma.impactLog.findMany({
        where: {
            playerId,
            timestamp: {
                gte: thirtyDaysAgo
            }
        },
        include: {
            quest: true
        },
        orderBy: { timestamp: 'desc' }
    });

    return impacts.map(impact => ({
        impactId: impact.id,
        questTitle: impact.quest.title,
        questCategory: impact.quest.category,
        xpAwarded: impact.xpAwarded,
        tokenAwarded: impact.tokenAwarded,
        impactValue: impact.impactValue,
        fundAllocation: impact.breakdown,
        timestamp: impact.timestamp
    }));
}

/**
 * Assign quest to player
 */
export async function assignQuestToPlayer(
    playerId: string,
    questId: string
): Promise<void> {

    const player = await prisma.player.findUnique({
        where: { id: playerId }
    });

    const quest = await prisma.quest.findUnique({
        where: { id: questId }
    });

    if (!player || !quest) {
        throw new Error('Player or Quest not found');
    }

    // Check quest requirements (optional)
    if (quest.requirements) {
        const req = quest.requirements as any;
        if (req.minLevel && player.level < req.minLevel) {
            throw new Error(`Minimum level ${req.minLevel} required`);
        }
    }

    // Create assignment
    await prisma.playerQuest.create({
        data: {
            playerId,
            questId,
            status: 'available'
        }
    });
}

/**
 * List available quests for player (difficulty-matched)
 */
export async function listQuestsForPlayer(playerId: string) {
    const player = await prisma.player.findUnique({
        where: { id: playerId }
    });

    if (!player) throw new Error('Player not found');

    // Difficulty scaling: recommend based on player level
    const recommendedDifficulty = Math.min(
        Math.max(1, Math.floor(player.level / 2)),
        5
    );

    const quests = await prisma.quest.findMany({
        where: {
            difficulty: {
                gte: Math.max(1, recommendedDifficulty - 1),
                lte: Math.min(5, recommendedDifficulty + 1)
            }
        },
        take: 10,
        orderBy: { difficulty: 'asc' }
    });

    return quests.map(quest => ({
        questId: quest.id,
        title: quest.title,
        category: quest.category,
        difficulty: quest.difficulty,
        baseXp: quest.baseXp,
        baseTokens: quest.baseTokens,
        description: quest.description
    }));
}
