/**
 * Worldwalker System API Routes
 * 
 * Endpoints for global journey system:
 * - Phase 1: Readiness assessment
 * - Phase 2: Skill evaluation
 * - Phase 3: Expedition planning
 * - Phase 4: Global mission sync
 */

import express, { Router, Request, Response } from 'express';
import {
  assessReadiness,
  evaluateSkills,
  planExpedition,
  synchronizeGlobalMission,
  recordGlobalMissionCompletion,
  getWorldwalkerStatus,
  advancePhase
} from '../services/worldwalker.service';

const router = Router();

/**
 * POST /worldwalker/readiness?playerId=player_123
 * 
 * Assess if player is ready for global journey
 * Returns readiness score and phase eligibility
 */
router.get('/worldwalker/readiness', async (req: Request, res: Response) => {
  try {
    const { playerId } = req.query;

    if (!playerId) {
      return res.status(400).json({ error: 'Missing playerId' });
    }

    const readiness = await assessReadiness(playerId as string);

    res.json({
      playerId,
      readiness,
      interpretation: {
        score: readiness.overall,
        level: readiness.overall >= 85 ? 'Master' :
          readiness.overall >= 70 ? 'Advanced' :
            readiness.overall >= 50 ? 'Ready' :
              readiness.overall >= 30 ? 'Beginner' : 'Not Ready',
        nextPhase: readiness.readyForPhase
      }
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * GET /worldwalker/skills?playerId=player_123
 * 
 * Evaluate player's skill profile
 * Returns skills breakdown, gaps, and recommended roles
 */
router.get('/worldwalker/skills', async (req: Request, res: Response) => {
  try {
    const { playerId } = req.query;

    if (!playerId) {
      return res.status(400).json({ error: 'Missing playerId' });
    }

    const skillProfile = await evaluateSkills(playerId as string);

    res.json({
      playerId,
      skillProfile,
      summary: {
        strongestSkills: Object.entries(skillProfile.skills)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 2)
          .map(([skill, score]) => `${skill} (${score})`),
        recommendedRoles: skillProfile.recommendedRoles,
        areasForImprovement: skillProfile.gaps
      }
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * POST /worldwalker/expedition
 * 
 * Plan an expedition based on player capabilities
 * 
 * Request:
 * {
 *   "phase": 1,
 *   "region": "thailand",
 *   "difficulty": 2,
 *   "requiredSkills": ["leadership", "communication"]
 * }
 */
router.post('/worldwalker/expedition', async (req: Request, res: Response) => {
  try {
    const { phase, region, difficulty, requiredSkills } = req.body;

    if (!phase || !region || difficulty === undefined) {
      return res.status(400).json({
        error: 'Missing required fields: phase, region, difficulty'
      });
    }

    const expedition = await planExpedition(
      phase,
      region,
      difficulty,
      requiredSkills || []
    );

    res.json({
      success: true,
      expedition,
      message: `Expedition planned for Phase ${phase} in ${region}`
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * POST /worldwalker/mission
 * 
 * Synchronize a global mission across regions
 * 
 * Request:
 * {
 *   "theme": "Water Access Initiative",
 *   "regions": ["thailand", "cambodia", "laos"],
 *   "duration": 30
 * }
 */
router.post('/worldwalker/mission', async (req: Request, res: Response) => {
  try {
    const { theme, regions, duration } = req.body;

    if (!theme || !regions || !duration) {
      return res.status(400).json({
        error: 'Missing required fields: theme, regions, duration'
      });
    }

    const mission = await synchronizeGlobalMission(theme, regions, duration);

    res.json({
      success: true,
      mission,
      message: `Global mission "${theme}" synchronized across ${regions.length} regions`
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * POST /worldwalker/mission/{missionId}/complete
 * 
 * Record completion of global mission and sync impact
 * 
 * Request:
 * {
 *   "playerId": "player_123",
 *   "region": "thailand",
 *   "impactData": {
 *     "localImpact": 500,
 *     "documentsCreated": 3,
 *     "partnershipsFormed": 2,
 *     "skillsShared": 5
 *   }
 * }
 */
router.post('/worldwalker/mission/:missionId/complete', async (req: Request, res: Response) => {
  try {
    const { missionId } = req.params;
    const { playerId, region, impactData } = req.body;

    if (!playerId || !region || !impactData) {
      return res.status(400).json({
        error: 'Missing required fields: playerId, region, impactData'
      });
    }

    await recordGlobalMissionCompletion(missionId, playerId, region, impactData);

    res.json({
      success: true,
      message: 'Global mission impact recorded',
      playerId,
      region,
      impactRecorded: impactData
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * GET /worldwalker/status?playerId=player_123
 * 
 * Get complete worldwalker journey status
 * Returns current phase, readiness, skills, and progress
 */
router.get('/worldwalker/status', async (req: Request, res: Response) => {
  try {
    const { playerId } = req.query;

    if (!playerId) {
      return res.status(400).json({ error: 'Missing playerId' });
    }

    const status = await getWorldwalkerStatus(playerId as string);

    res.json({
      playerId,
      status,
      journey: {
        phase: status.currentPhase,
        readiness: status.readinessScore,
        expeditionsCompleted: status.expeditionsCompleted,
        globalImpactTotal: status.globalImpactTotal,
        nextStep: status.nextMilestone,
        topSkills: Object.entries(status.skillsProfile.skills)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 3)
          .map(([skill, score]) => `${skill}: ${Math.round(score)}`),
        roles: status.skillsProfile.recommendedRoles
      }
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * POST /worldwalker/advance?playerId=player_123
 * 
 * Advance player to next worldwalker phase
 * Awards bonus XP and tokens
 */
router.post('/worldwalker/advance', async (req: Request, res: Response) => {
  try {
    const { playerId } = req.query;

    if (!playerId) {
      return res.status(400).json({ error: 'Missing playerId' });
    }

    const result = await advancePhase(playerId as string);

    res.json({
      success: true,
      playerId,
      phaseAdvancement: result,
      message: result.rewards.message
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * GET /worldwalker/phases
 * 
 * Get information about all 4 worldwalker phases
 */
router.get('/worldwalker/phases', (req: Request, res: Response) => {
  res.json({
    phases: [
      {
        phase: 1,
        name: 'Preparation',
        description: 'Build skills and reputation locally',
        minReadiness: 30,
        duration: '1-2 weeks',
        focus: 'Self-development',
        rewards: { xp: 200, tokens: 20 },
        example: 'Complete 5 diverse quests to prove adaptability'
      },
      {
        phase: 2,
        name: 'Domestic Trial',
        description: 'Lead regional expeditions within your country',
        minReadiness: 50,
        duration: '2-4 weeks',
        focus: 'Team leadership',
        rewards: { xp: 500, tokens: 50 },
        example: 'Lead 3-person team on week-long regional mission'
      },
      {
        phase: 3,
        name: 'Global Operation',
        description: 'Coordinate multi-country expeditions',
        minReadiness: 70,
        duration: '1 month',
        focus: 'Cross-cultural collaboration',
        rewards: { xp: 1000, tokens: 100 },
        example: 'Coordinate missions across 3 SE Asian countries'
      },
      {
        phase: 4,
        name: 'Return & Share',
        description: 'Document and share knowledge globally',
        minReadiness: 85,
        duration: '2+ months',
        focus: 'Knowledge dissemination',
        rewards: { xp: 2000, tokens: 200 },
        example: 'Create curriculum from global expeditions'
      }
    ]
  });
});

export default router;
