/**
 * Worldwalker System Service
 * 
 * Manages the 4-phase global journey:
 * Phase 1: Preparation (readiness assessment)
 * Phase 2: Domestic Trial (local testing)
 * Phase 3: Global Operation (international missions)
 * Phase 4: Return (knowledge sharing)
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * ============================================
 * PHASE 1: READINESS CHECKER
 * ============================================
 * Assess if player is ready for global journey
 */

export interface ReadinessScore {
  overall: number;           // 0-100
  categories: {
    reputation: number;      // Community standing
    skills: number;          // Competency level
    experience: number;      // Quest completion history
    trustScore: number;      // Verification AI score
    alignment: number;       // Dharmic alignment
  };
  readyForPhase: number;     // Which phase they can enter
  recommendations: string[]; // What they need to improve
}

export async function assessReadiness(playerId: string): Promise<ReadinessScore> {
  const player = await prisma.player.findUnique({
    where: { id: playerId },
    include: {
      quests: {
        where: { status: 'completed' }
      },
      tokens: true,
      impacts: true
    }
  });

  if (!player) throw new Error('Player not found');

  // Calculate reputation (based on completed quests)
  const reputationScore = Math.min(100, player.quests.length * 5);

  // Calculate skills (based on XP and level)
  const skillsScore = Math.min(100, player.level * 10 + (player.xpTotal / 100));

  // Calculate experience (quest diversity)
  const questCategories = new Set(
    player.quests.map(q => (q as any).quest?.category)
  ).size;
  const experienceScore = Math.min(100, questCategories * 20);

  // Calculate trust score (average proof authenticity)
  const avgAuthScore = player.quests.length > 0
    ? player.quests.reduce((sum, q) => sum + ((q as any).score || 0), 0) / player.quests.length
    : 0;
  const trustScore = avgAuthScore;

  // Calculate alignment (dharmic principles: service > wealth)
  const tokenBalance = player.tokens.reduce((sum, t) => sum + t.amount, 0);
  const hasMinTokensForGreed = tokenBalance > 1000;
  const alignmentScore = player.alignment === 'service'
    ? 100
    : player.alignment === 'growth'
      ? 80
      : player.alignment === 'community'
        ? 90
        : 60;

  const overall = Math.round(
    (reputationScore + skillsScore + experienceScore + trustScore + alignmentScore) / 5
  );

  // Determine phase eligibility
  let readyForPhase = 1;
  if (overall >= 30) readyForPhase = 1;  // Phase 1: Preparation
  if (overall >= 50) readyForPhase = 2;  // Phase 2: Domestic Trial
  if (overall >= 70) readyForPhase = 3;  // Phase 3: Global Operation
  if (overall >= 85) readyForPhase = 4;  // Phase 4: Return & Share

  // Generate recommendations
  const recommendations: string[] = [];
  if (reputationScore < 50) recommendations.push('Complete more community quests to build reputation');
  if (skillsScore < 50) recommendations.push('Increase your level through training missions');
  if (experienceScore < 50) recommendations.push('Try diverse quest categories');
  if (trustScore < 70) recommendations.push('Improve proof authenticity scores');
  if (alignmentScore < 80) recommendations.push('Align actions with service and compassion');

  return {
    overall,
    categories: {
      reputation: reputationScore,
      skills: skillsScore,
      experience: experienceScore,
      trustScore,
      alignment: alignmentScore
    },
    readyForPhase,
    recommendations
  };
}

/**
 * ============================================
 * PHASE 2: SKILL EVALUATION ENGINE
 * ============================================
 * Evaluate specific skills needed for expeditions
 */

export interface SkillProfile {
  playerId: string;
  skills: {
    leadership: number;      // Can guide others
    communication: number;   // Can teach
    adaptability: number;    // Can handle new situations
    technical: number;       // Can use tools/tech
    compassion: number;      // Can support others
    documentation: number;   // Can record knowledge
  };
  gaps: string[];
  recommendedRoles: string[];
}

export async function evaluateSkills(playerId: string): Promise<SkillProfile> {
  const player = await prisma.player.findUnique({
    where: { id: playerId },
    include: {
      quests: {
        include: {
          quest: true
        },
        where: { status: 'completed' }
      },
      impacts: true
    }
  });

  if (!player) throw new Error('Player not found');

  // Analyze quest history for skill signals
  const questCategories = player.quests.map(pq => (pq.quest as any).category);

  // Leadership: training/mentoring quests
  const leadershipQuests = questCategories.filter(c => c === 'training').length;
  const leadership = Math.min(100, leadershipQuests * 15);

  // Communication: cultural/research quests
  const commQuests = questCategories.filter(c => c === 'cultural' || c === 'research').length;
  const communication = Math.min(100, commQuests * 15);

  // Adaptability: diverse category spread
  const categoryDiversity = new Set(questCategories).size;
  const adaptability = Math.min(100, categoryDiversity * 20);

  // Technical: research quests (proxy for tech aptitude)
  const techQuests = questCategories.filter(c => c === 'research').length;
  const technical = Math.min(100, techQuests * 20);

  // Compassion: cleanup/community quests
  const compassionQuests = questCategories.filter(
    c => c === 'cleanup' || c === 'sports'
  ).length;
  const compassion = Math.min(100, compassionQuests * 15);

  // Documentation: research + training quests (proxy for documentation)
  const docQuests = questCategories.filter(
    c => c === 'research' || c === 'cultural'
  ).length;
  const documentation = Math.min(100, docQuests * 12);

  // Identify gaps
  const gaps: string[] = [];
  if (leadership < 40) gaps.push('Leadership - take mentoring roles');
  if (communication < 40) gaps.push('Communication - teach others');
  if (adaptability < 40) gaps.push('Adaptability - try new quest types');
  if (technical < 40) gaps.push('Technical - participate in research');
  if (compassion < 40) gaps.push('Compassion - help vulnerable');
  if (documentation < 40) gaps.push('Documentation - record experiences');

  // Recommend roles based on strengths
  const recommendedRoles: string[] = [];
  if (leadership > 60) recommendedRoles.push('Team Lead');
  if (communication > 60) recommendedRoles.push('Educator');
  if (adaptability > 60) recommendedRoles.push('Scout');
  if (technical > 60) recommendedRoles.push('Tech Support');
  if (compassion > 60) recommendedRoles.push('Care Coordinator');
  if (documentation > 60) recommendedRoles.push('Chronicler');

  return {
    playerId,
    skills: {
      leadership,
      communication,
      adaptability,
      technical,
      compassion,
      documentation
    },
    gaps,
    recommendedRoles: recommendedRoles.length > 0 ? recommendedRoles : ['Apprentice']
  };
}

/**
 * ============================================
 * PHASE 3: EXPEDITION PLANNER
 * ============================================
 * Plan and assign expeditions based on player capabilities
 */

export interface ExpeditionPlan {
  expeditionId: string;
  phase: number;
  region: string;
  difficulty: number;
  teamSize: number;
  duration: number;          // days
  requiredSkills: string[];
  objectives: string[];
  rewards: {
    xp: number;
    tokens: number;
    globalImpactCredits: number;
  };
  playersAssigned: string[];
}

export async function planExpedition(
  phase: number,
  region: string,
  difficulty: number,
  requiredSkills: string[]
): Promise<ExpeditionPlan> {
  const expeditionId = `exp_${phase}_${region}_${Date.now()}`;

  // Base parameters by phase
  const phaseConfig = {
    1: { teamSize: 3, duration: 7, xp: 200, tokens: 20, globalImpact: 100 },
    2: { teamSize: 5, duration: 14, xp: 500, tokens: 50, globalImpact: 250 },
    3: { teamSize: 10, duration: 30, xp: 1000, tokens: 100, globalImpact: 500 },
    4: { teamSize: 20, duration: 60, xp: 2000, tokens: 200, globalImpact: 1000 }
  };

  const config = phaseConfig[phase as keyof typeof phaseConfig] || phaseConfig[1];

  // Find players who match requirements
  const matchingPlayers = await findPlayersForExpedition(
    difficulty,
    requiredSkills,
    config.teamSize
  );

  return {
    expeditionId,
    phase,
    region,
    difficulty,
    teamSize: config.teamSize,
    duration: config.duration,
    requiredSkills,
    objectives: [
      `Complete Phase ${phase} missions in ${region}`,
      'Document cultural practices',
      'Build local partnerships',
      'Share knowledge globally'
    ],
    rewards: {
      xp: config.xp,
      tokens: config.tokens,
      globalImpactCredits: config.globalImpact
    },
    playersAssigned: matchingPlayers
  };
}

/**
 * Find qualified players for an expedition
 */
async function findPlayersForExpedition(
  difficulty: number,
  requiredSkills: string[],
  targetCount: number
): Promise<string[]> {
  // Get all players above difficulty threshold
  const minLevel = Math.max(1, difficulty - 1);
  const players = await prisma.player.findMany({
    where: {
      level: {
        gte: minLevel
      }
    },
    take: targetCount * 2  // Get more, then filter
  });

  // Score and sort players by fit
  const scored = await Promise.all(
    players.map(async (p) => {
      const skillProfile = await evaluateSkills(p.id);
      const skillMatch = requiredSkills.filter(skill =>
        skillProfile.recommendedRoles.includes(skill)
      ).length;
      return {
        playerId: p.id,
        score: p.level * 10 + skillMatch * 20
      };
    })
  );

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, targetCount)
    .map(s => s.playerId);
}

/**
 * ============================================
 * PHASE 4: GLOBAL MISSION SYNCHRONIZER
 * ============================================
 * Sync missions across regions and verify global impact
 */

export interface GlobalMissionSync {
  missionId: string;
  phase: number;
  regions: string[];
  theme: string;
  startDate: Date;
  endDate: Date;
  globalObjective: string;
  regionalVariations: {
    [region: string]: {
      localObjective: string;
      localRewards: number;
    };
  };
  synchronizationPoints: string[];
  globalImpactTarget: number;
}

export async function synchronizeGlobalMission(
  theme: string,
  regions: string[],
  duration: number
): Promise<GlobalMissionSync> {
  const missionId = `mission_${theme}_${Date.now()}`;
  const now = new Date();
  const startDate = now;
  const endDate = new Date(now.getTime() + duration * 24 * 60 * 60 * 1000);

  // Create regional variations
  const regionalVariations: any = {};
  for (const region of regions) {
    regionalVariations[region] = {
      localObjective: `${theme} initiative in ${region}`,
      localRewards: 250
    };
  }

  // Define synchronization points (global check-ins)
  const syncPoints = [];
  const daysPerCheckpoint = Math.ceil(duration / 4);
  for (let i = 1; i <= 4; i++) {
    const checkDate = new Date(startDate.getTime() + (i * daysPerCheckpoint * 24 * 60 * 60 * 1000));
    syncPoints.push(`Checkpoint ${i}: ${checkDate.toLocaleDateString()}`);
  }

  return {
    missionId,
    phase: 3,
    regions,
    theme,
    startDate,
    endDate,
    globalObjective: `Connect ${regions.length} regions through "${theme}" initiative`,
    regionalVariations,
    synchronizationPoints: syncPoints,
    globalImpactTarget: regions.length * 500
  };
}

/**
 * Record global mission completion and sync impact
 */
export async function recordGlobalMissionCompletion(
  missionId: string,
  playerId: string,
  region: string,
  impactData: {
    localImpact: number;
    documentsCreated: number;
    partnershipsFormed: number;
    skillsShared: number;
  }
): Promise<void> {
  // Record impact with global attribution
  const globalMultiplier = 1.5;  // Global missions worth more
  const totalImpact = impactData.localImpact * globalMultiplier;

  await prisma.impactLog.create({
    data: {
      playerId,
      questId: missionId,
      xpAwarded: Math.round(totalImpact * 0.1),
      tokenAwarded: Math.round(totalImpact / 5),
      impactValue: totalImpact,
      breakdown: {
        local: 0.4,
        national: 0.3,
        global: 0.3,  // Higher global allocation
        documentation: impactData.documentsCreated,
        partnerships: impactData.partnershipsFormed,
        skillsShared: impactData.skillsShared
      }
    }
  });

  // Record in token ledger with global tag
  await prisma.tokenLedger.create({
    data: {
      playerId,
      amount: Math.round(totalImpact / 5),
      type: 'mint',
      source: `global_mission_${missionId}`,
      transactionId: `global_${playerId}_${missionId}_${Date.now()}`
    }
  });
}

/**
 * Get worldwalker journey status
 */
export interface WorldwalkerStatus {
  playerId: string;
  currentPhase: number;
  readinessScore: number;
  skillsProfile: SkillProfile;
  expeditionsCompleted: number;
  globalImpactTotal: number;
  nextMilestone: string;
}

export async function getWorldwalkerStatus(playerId: string): Promise<WorldwalkerStatus> {
  const readiness = await assessReadiness(playerId);
  const skills = await evaluateSkills(playerId);

  const impacts = await prisma.impactLog.findMany({
    where: { playerId }
  });

  const expeditionsCompleted = impacts.filter(i =>
    (i.questId as any).includes('exp_')
  ).length;

  const globalImpactTotal = impacts.reduce((sum, i) => sum + (i.impactValue || 0), 0);

  return {
    playerId,
    currentPhase: readiness.readyForPhase,
    readinessScore: readiness.overall,
    skillsProfile: skills,
    expeditionsCompleted,
    globalImpactTotal,
    nextMilestone: `Phase ${readiness.readyForPhase} Global Mission`
  };
}

/**
 * Advance player to next worldwalker phase
 */
export async function advancePhase(playerId: string): Promise<{ newPhase: number; rewards: any }> {
  const status = await getWorldwalkerStatus(playerId);
  const nextPhase = status.currentPhase + 1;

  if (nextPhase > 4) {
    throw new Error('Already at maximum phase (4)');
  }

  // Award phase-up bonus
  const bonusXp = nextPhase * 500;
  const bonusTokens = nextPhase * 50;

  const player = await prisma.player.findUnique({
    where: { id: playerId }
  });

  if (player) {
    await prisma.player.update({
      where: { id: playerId },
      data: {
        xpTotal: player.xpTotal + bonusXp
      }
    });
  }

  // Record phase advancement
  await prisma.tokenLedger.create({
    data: {
      playerId,
      amount: bonusTokens,
      type: 'mint',
      source: `phase_${nextPhase}_advancement`,
      transactionId: `phase_${playerId}_${nextPhase}_${Date.now()}`
    }
  });

  return {
    newPhase: nextPhase,
    rewards: {
      xp: bonusXp,
      tokens: bonusTokens,
      message: `🌍 Advanced to Phase ${nextPhase}! You're now ready for global expeditions.`
    }
  };
}
