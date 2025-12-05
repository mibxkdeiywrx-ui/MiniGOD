/**
 * Impact Engine API Routes
 * 
 * Endpoints:
 * POST   /api/quests/assign         - Assign quest to player
 * GET    /api/quests/available      - List available quests for player
 * POST   /api/quests/{id}/complete  - Complete quest and award impact
 * GET    /api/players/{id}/stats    - Get player stats
 * GET    /api/players/{id}/history  - Get impact history
 * POST   /api/tokens/transfer       - Transfer tokens between players
 * GET    /api/tokens/balance        - Get token balance
 */

import express, { Router, Request, Response } from 'express';
import {
    calculateQuestImpact,
    awardQuestCompletion,
    getPlayerStats,
    recordTokenTransaction,
    getPlayerImpactLog,
    assignQuestToPlayer,
    listQuestsForPlayer
} from '../services/impact.service';

const router = Router();

/**
 * POST /api/quests/assign
 * 
 * Assign a quest to a player
 * 
 * Request:
 * {
 *   "playerId": "player_123",
 *   "questId": "quest_456"
 * }
 */
router.post('/quests/assign', async (req: Request, res: Response) => {
    try {
        const { playerId, questId } = req.body;

        if (!playerId || !questId) {
            return res.status(400).json({
                error: 'Missing playerId or questId'
            });
        }

        await assignQuestToPlayer(playerId, questId);

        res.json({
            success: true,
            message: 'Quest assigned successfully',
            playerId,
            questId
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message
        });
    }
});

/**
 * GET /api/quests/available?playerId=player_123
 * 
 * List available quests for a player (difficulty-matched)
 */
router.get('/quests/available', async (req: Request, res: Response) => {
    try {
        const { playerId } = req.query;

        if (!playerId) {
            return res.status(400).json({
                error: 'Missing playerId query parameter'
            });
        }

        const quests = await listQuestsForPlayer(playerId as string);

        res.json({
            playerId,
            questCount: quests.length,
            quests
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message
        });
    }
});

/**
 * POST /api/quests/:questId/complete
 * 
 * Complete a quest and award impact
 * 
 * Request:
 * {
 *   "playerId": "player_123",
 *   "proofUrl": "https://...",
 *   "durationMinutes": 45,
 *   "authenticityScore": 98,
 *   "beneficiariesCount": 3
 * }
 * 
 * Response:
 * {
 *   "playerId": "player_123",
 *   "xpAwarded": 150,
 *   "tokensAwarded": 15,
 *   "leveledUp": true,
 *   "newLevel": 5,
 *   "badgesEarned": ["Eco Warrior"]
 * }
 */
router.post('/quests/:questId/complete', async (req: Request, res: Response) => {
    try {
        const { questId } = req.params;
        const {
            playerId,
            proofUrl,
            durationMinutes,
            authenticityScore = 100,
            beneficiariesCount = 1
        } = req.body;

        if (!playerId || !questId) {
            return res.status(400).json({
                error: 'Missing playerId or questId'
            });
        }

        if (!proofUrl || !durationMinutes) {
            return res.status(400).json({
                error: 'Missing proofUrl or durationMinutes'
            });
        }

        const result = await awardQuestCompletion(
            playerId,
            questId,
            proofUrl,
            durationMinutes,
            authenticityScore,
            beneficiariesCount
        );

        res.json(result);
    } catch (error: any) {
        res.status(400).json({
            error: error.message
        });
    }
});

/**
 * GET /api/players/:playerId/stats
 * 
 * Get player stats (XP, level, tokens, quests completed)
 * 
 * Response:
 * {
 *   "playerId": "player_123",
 *   "name": "Alice",
 *   "level": 5,
 *   "totalXp": 2500,
 *   "tokenBalance": 250,
 *   "questsCompleted": 25,
 *   "alignment": "balanced",
 *   "stats": { "strength": 10, "wisdom": 12, ... }
 * }
 */
router.get('/players/:playerId/stats', async (req: Request, res: Response) => {
    try {
        const { playerId } = req.params;

        const stats = await getPlayerStats(playerId);
        res.json(stats);
    } catch (error: any) {
        res.status(400).json({
            error: error.message
        });
    }
});

/**
 * GET /api/players/:playerId/history
 * 
 * Get impact history for player (last 30 days)
 * 
 * Response:
 * [
 *   {
 *     "impactId": "imp_123",
 *     "questTitle": "Clean Park",
 *     "questCategory": "cleanup",
 *     "xpAwarded": 125,
 *     "tokenAwarded": 12,
 *     "impactValue": 150,
 *     "fundAllocation": { "local": 75, "national": 45, "global": 30 },
 *     "timestamp": "2024-01-15T10:30:00Z"
 *   },
 *   ...
 * ]
 */
router.get('/players/:playerId/history', async (req: Request, res: Response) => {
    try {
        const { playerId } = req.params;

        const history = await getPlayerImpactLog(playerId);
        res.json({
            playerId,
            historyCount: history.length,
            history
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message
        });
    }
});

/**
 * POST /api/tokens/transfer
 * 
 * Transfer tokens between players
 * 
 * Request:
 * {
 *   "fromPlayerId": "player_123",
 *   "toPlayerId": "player_456",
 *   "amount": 50
 * }
 */
router.post('/tokens/transfer', async (req: Request, res: Response) => {
    try {
        const { fromPlayerId, toPlayerId, amount } = req.body;

        if (!fromPlayerId || !toPlayerId || !amount) {
            return res.status(400).json({
                error: 'Missing fromPlayerId, toPlayerId, or amount'
            });
        }

        if (amount <= 0) {
            return res.status(400).json({
                error: 'Amount must be positive'
            });
        }

        // Record debit
        await recordTokenTransaction(
            fromPlayerId,
            amount,
            'transfer',
            `transfer_to_${toPlayerId}`
        );

        // Record credit
        await recordTokenTransaction(
            toPlayerId,
            amount,
            'transfer',
            `transfer_from_${fromPlayerId}`
        );

        res.json({
            success: true,
            message: 'Transfer completed',
            from: fromPlayerId,
            to: toPlayerId,
            amount,
            timestamp: new Date().toISOString()
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message
        });
    }
});

/**
 * GET /api/tokens/balance?playerId=player_123
 * 
 * Get token balance for a player
 * 
 * Response:
 * {
 *   "playerId": "player_123",
 *   "balance": 250,
 *   "lastUpdated": "2024-01-15T10:30:00Z"
 * }
 */
router.get('/tokens/balance', async (req: Request, res: Response) => {
    try {
        const { playerId } = req.query;

        if (!playerId) {
            return res.status(400).json({
                error: 'Missing playerId query parameter'
            });
        }

        const stats = await getPlayerStats(playerId as string);

        res.json({
            playerId,
            balance: stats.tokenBalance,
            level: stats.level,
            totalXp: stats.totalXp,
            lastUpdated: new Date().toISOString()
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message
        });
    }
});

/**
 * POST /api/tokens/redeem
 * 
 * Redeem tokens for rewards (marketplace transaction)
 * 
 * Request:
 * {
 *   "playerId": "player_123",
 *   "rewardId": "reward_abc",
 *   "amount": 50
 * }
 */
router.post('/tokens/redeem', async (req: Request, res: Response) => {
    try {
        const { playerId, rewardId, amount } = req.body;

        if (!playerId || !rewardId || !amount) {
            return res.status(400).json({
                error: 'Missing playerId, rewardId, or amount'
            });
        }

        // Validate balance
        const stats = await getPlayerStats(playerId);
        if (stats.tokenBalance < amount) {
            return res.status(400).json({
                error: `Insufficient balance. Current: ${stats.tokenBalance}, Required: ${amount}`
            });
        }

        // Record redemption
        await recordTokenTransaction(
            playerId,
            amount,
            'redeem',
            `reward_${rewardId}`
        );

        res.json({
            success: true,
            message: 'Redemption successful',
            playerId,
            rewardId,
            amountRedeemed: amount,
            newBalance: stats.tokenBalance - amount,
            timestamp: new Date().toISOString()
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message
        });
    }
});

export default router;
