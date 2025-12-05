/**
 * Enterprise Layer Service
 * 
 * Manages national-level operations:
 * - Multiple business domains
 * - Stakeholder coordination
 * - Impact aggregation
 * - National metrics & reporting
 * - Partner revenue sharing
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ============================================
// DATA MODELS
// ============================================

export interface StakeholderProfile {
    id: string;
    name: string;
    type: 'citizen' | 'government' | 'tourism' | 'sponsor' | 'research';
    tier: 'bronze' | 'silver' | 'gold' | 'platinum';
    contactEmail: string;
    region: string;
    verificationStatus: 'pending' | 'verified' | 'rejected';
    createdAt: Date;
}

export interface BusinessDomain {
    id: string;
    name: string;
    description: string;
    owner: string; // stakeholder_id
    region: string;
    activeQuestsCount: number;
    totalImpactValue: number;
    revenueShare: {
        domain: number;
        national: number;
        global: number;
    };
}

export interface NationalMetrics {
    totalCitizens: number;
    totalQuestsCompleted: number;
    totalImpactValue: number;
    averageImpactPerCitizen: number;
    jobsCreated: number;
    skillsTransferred: number;
    communityHealthScore: number; // 0-100
    timeframe: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

// ============================================
// STAKEHOLDER MANAGEMENT
// ============================================

/**
 * Register a new stakeholder (citizen, government, partner, etc)
 */
export async function registerStakeholder(
    name: string,
    type: StakeholderProfile['type'],
    contactEmail: string,
    region: string,
    tier: StakeholderProfile['tier'] = 'bronze'
): Promise<StakeholderProfile> {

    const stakeholder = await prisma.stakeholder.create({
        data: {
            id: `stakeholder_${type}_${Date.now()}`,
            name,
            type,
            contactEmail,
            region,
            tier,
            verificationStatus: type === 'citizen' ? 'verified' : 'pending',
            createdAt: new Date()
        }
    });

    return stakeholder as any;
}

/**
 * Verify stakeholder identity (government, tourism entity, sponsor)
 */
export async function verifyStakeholder(
    stakeholderId: string,
    verificationData: {
        registrationNumber?: string;
        licenseNumber?: string;
        govtApproval?: boolean;
    }
): Promise<void> {

    await prisma.stakeholder.update({
        where: { id: stakeholderId },
        data: {
            verificationStatus: 'verified',
            verificationData: verificationData
        }
    });
}

/**
 * Get stakeholder profile
 */
export async function getStakeholderProfile(stakeholderId: string): Promise<StakeholderProfile> {
    const stakeholder = await prisma.stakeholder.findUnique({
        where: { id: stakeholderId }
    });

    if (!stakeholder) throw new Error('Stakeholder not found');
    return stakeholder as any;
}

/**
 * Upgrade stakeholder tier (bronze → silver → gold → platinum)
 */
export async function upgradeStakeholderTier(stakeholderId: string): Promise<void> {
    const tierProgression = ['bronze', 'silver', 'gold', 'platinum'];

    const current = await prisma.stakeholder.findUnique({
        where: { id: stakeholderId }
    });

    if (!current) throw new Error('Stakeholder not found');

    const currentIndex = tierProgression.indexOf(current.tier as string);
    if (currentIndex < tierProgression.length - 1) {
        await prisma.stakeholder.update({
            where: { id: stakeholderId },
            data: { tier: tierProgression[currentIndex + 1] }
        });
    }
}

// ============================================
// BUSINESS DOMAINS
// ============================================

/**
 * Create a business domain (Social Impact, Tourism, Development, etc)
 */
export async function createBusinessDomain(
    name: string,
    description: string,
    ownerId: string, // stakeholder who manages this domain
    region: string,
    revenueShare: { domain: number; national: number; global: number }
): Promise<BusinessDomain> {

    const domain = await prisma.businessDomain.create({
        data: {
            id: `domain_${name.toLowerCase()}_${Date.now()}`,
            name,
            description,
            owner: ownerId,
            region,
            activeQuestsCount: 0,
            totalImpactValue: 0,
            revenueShare
        }
    });

    return domain as any;
}

/**
 * List all business domains by region
 */
export async function listBusinessDomainsByRegion(region: string): Promise<BusinessDomain[]> {
    const domains = await prisma.businessDomain.findMany({
        where: { region }
    });

    return domains as any;
}

/**
 * Get domain statistics
 */
export async function getDomainStats(domainId: string): Promise<{
    questCount: number;
    totalImpact: number;
    activeParticipants: number;
    revenueGenerated: number;
}> {

    const domain = await prisma.businessDomain.findUnique({
        where: { id: domainId },
        include: {
            quests: true
        }
    });

    if (!domain) throw new Error('Domain not found');

    return {
        questCount: domain.activeQuestsCount,
        totalImpact: domain.totalImpactValue,
        activeParticipants: 0, // TODO: Calculate from PlayerQuest
        revenueGenerated: domain.totalImpactValue * 0.1 // Rough estimate
    };
}

// ============================================
// NATIONAL METRICS & AGGREGATION
// ============================================

/**
 * Calculate national impact metrics
 */
export async function getNationalMetrics(timeframe: 'daily' | 'weekly' | 'monthly' = 'daily'): Promise<NationalMetrics> {

    // Get time window
    const now = new Date();
    let startDate = new Date();

    switch (timeframe) {
        case 'daily':
            startDate.setDate(now.getDate() - 1);
            break;
        case 'weekly':
            startDate.setDate(now.getDate() - 7);
            break;
        case 'monthly':
            startDate.setMonth(now.getMonth() - 1);
            break;
    }

    // Total citizens
    const totalCitizens = await prisma.player.count();

    // Total quests completed
    const completedQuests = await prisma.playerQuest.findMany({
        where: {
            status: 'completed',
            completedAt: {
                gte: startDate
            }
        }
    });

    // Total impact
    const impactSum = await prisma.impactLog.aggregate({
        where: {
            timestamp: {
                gte: startDate
            }
        },
        _sum: {
            impactValue: true
        }
    });

    const totalImpactValue = impactSum._sum.impactValue || 0;
    const averagePerCitizen = totalCitizens > 0 ? totalImpactValue / totalCitizens : 0;

    return {
        totalCitizens,
        totalQuestsCompleted: completedQuests.length,
        totalImpactValue,
        averageImpactPerCitizen: averagePerCitizen,
        jobsCreated: Math.floor(totalImpactValue * 0.05), // Estimate: 5% create jobs
        skillsTransferred: Math.floor(totalImpactValue * 0.15), // Estimate: 15% develop skills
        communityHealthScore: Math.min(100, totalImpactValue / 1000), // Normalized 0-100
        timeframe
    };
}

/**
 * Get regional impact breakdown
 */
export async function getRegionalImpactBreakdown(): Promise<Record<string, any>> {

    const domains = await prisma.businessDomain.findMany({
        select: {
            region: true,
            totalImpactValue: true,
            activeQuestsCount: true,
            name: true
        }
    });

    const breakdown: Record<string, any> = {};

    for (const domain of domains) {
        if (!breakdown[domain.region]) {
            breakdown[domain.region] = {
                totalImpact: 0,
                totalQuests: 0,
                domains: []
            };
        }

        breakdown[domain.region].totalImpact += domain.totalImpactValue;
        breakdown[domain.region].totalQuests += domain.activeQuestsCount;
        breakdown[domain.region].domains.push({
            name: domain.name,
            impact: domain.totalImpactValue
        });
    }

    return breakdown;
}

// ============================================
// PARTNER REVENUE SHARING
// ============================================

/**
 * Calculate revenue distribution for a completed quest
 */
export async function calculateRevenueShare(
    questImpactValue: number,
    domainId: string
): Promise<{
    domainShare: number;
    nationalShare: number;
    globalShare: number;
    stakeholderBonus: number;
}> {

    const domain = await prisma.businessDomain.findUnique({
        where: { id: domainId }
    });

    if (!domain) throw new Error('Domain not found');

    const share = domain.revenueShare;
    const total = share.domain + share.national + share.global;

    const domainShare = (questImpactValue * share.domain) / total;
    const nationalShare = (questImpactValue * share.national) / total;
    const globalShare = (questImpactValue * share.global) / total;

    // Stakeholder bonus (10% of domain share)
    const stakeholderBonus = domainShare * 0.1;

    return {
        domainShare: domainShare - stakeholderBonus,
        nationalShare,
        globalShare,
        stakeholderBonus
    };
}

/**
 * Record revenue transaction to stakeholder
 */
export async function recordStakeholderRevenue(
    stakeholderId: string,
    amount: number,
    source: string,
    domainId: string
): Promise<void> {

    await prisma.stakeholderRevenue.create({
        data: {
            id: `rev_${stakeholderId}_${Date.now()}`,
            stakeholderId,
            amount,
            source,
            domainId,
            timestamp: new Date()
        }
    });
}

/**
 * Get stakeholder revenue dashboard
 */
export async function getStakeholderRevenueDashboard(stakeholderId: string): Promise<{
    totalRevenue: number;
    thisMonth: number;
    thisYear: number;
    recentTransactions: any[];
}> {

    const allRevenue = await prisma.stakeholderRevenue.findMany({
        where: { stakeholderId },
        orderBy: { timestamp: 'desc' }
    });

    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisYear = new Date(now.getFullYear(), 0, 1);

    const monthRevenue = allRevenue
        .filter(r => r.timestamp >= thisMonth)
        .reduce((sum, r) => sum + r.amount, 0);

    const yearRevenue = allRevenue
        .filter(r => r.timestamp >= thisYear)
        .reduce((sum, r) => sum + r.amount, 0);

    const totalRevenue = allRevenue.reduce((sum, r) => sum + r.amount, 0);

    return {
        totalRevenue,
        thisMonth: monthRevenue,
        thisYear: yearRevenue,
        recentTransactions: allRevenue.slice(0, 10)
    };
}

// ============================================
// PARTNERSHIP MANAGEMENT
// ============================================

/**
 * Create a partnership agreement
 */
export async function createPartnership(
    partnerId: string,
    partnerType: 'NGO' | 'Government' | 'Corporate' | 'Tourism' | 'Research',
    agreement: {
        questAllocation: number;
        revenueShare: number;
        commitmentPeriod: number; // months
        targetImpact: number;
    }
): Promise<void> {

    await prisma.partnership.create({
        data: {
            id: `partner_${partnerId}_${Date.now()}`,
            partnerId,
            partnerType,
            agreement,
            startDate: new Date(),
            endDate: new Date(Date.now() + agreement.commitmentPeriod * 30 * 24 * 60 * 60 * 1000),
            status: 'active'
        }
    });
}

/**
 * Track partnership performance
 */
export async function getPartnershipMetrics(partnerId: string): Promise<{
    questsCompleted: number;
    impactGenerated: number;
    revenueGenerated: number;
    targetProgress: number; // 0-100
    compliance: 'on-track' | 'at-risk' | 'exceeded';
}> {

    const partnership = await prisma.partnership.findFirst({
        where: { partnerId }
    });

    if (!partnership) throw new Error('Partnership not found');

    // TODO: Aggregate metrics from partner's quests

    return {
        questsCompleted: 0,
        impactGenerated: 0,
        revenueGenerated: 0,
        targetProgress: 0,
        compliance: 'on-track'
    };
}

// ============================================
// REPORTING & DASHBOARDS
// ============================================

/**
 * Generate national impact report
 */
export async function generateNationalReport(month: number, year: number): Promise<any> {

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const metrics = await getNationalMetrics('monthly');
    const regional = await getRegionalImpactBreakdown();

    return {
        reportDate: new Date(),
        period: `${month}/${year}`,
        nationalMetrics: metrics,
        regionalBreakdown: regional,
        topPerformingDomains: [],
        stakeholderPerformance: [],
        recommendations: []
    };
}

/**
 * Export data for government audit
 */
export async function exportForAudit(startDate: Date, endDate: Date): Promise<any> {

    const impactLogs = await prisma.impactLog.findMany({
        where: {
            timestamp: {
                gte: startDate,
                lte: endDate
            }
        },
        include: {
            player: true,
            quest: true
        }
    });

    const tokenTransactions = await prisma.tokenLedger.findMany({
        where: {
            timestamp: {
                gte: startDate,
                lte: endDate
            }
        }
    });

    return {
        exportDate: new Date(),
        period: { start: startDate, end: endDate },
        impactLogsCount: impactLogs.length,
        totalImpactValue: impactLogs.reduce((sum, log) => sum + (log.impactValue || 0), 0),
        tokenTransactionsCount: tokenTransactions.length,
        totalTokensIssued: tokenTransactions
            .filter(t => t.type === 'mint')
            .reduce((sum, t) => sum + t.amount, 0),
        dataFile: 'audit_export.csv' // In production, generate actual CSV
    };
}

// ============================================
// GOVERNMENT COORDINATION
// ============================================

/**
 * Register government unit (province, municipality, department)
 */
export async function registerGovernmentUnit(
    name: string,
    type: 'province' | 'municipality' | 'department',
    region: string,
    contactEmail: string
): Promise<void> {

    await registerStakeholder(
        name,
        'government',
        contactEmail,
        region,
        'gold' // Government gets gold tier by default
    );
}

/**
 * Allocate government budget to quest domain
 */
export async function allocateGovernmentBudget(
    govtUnitId: string,
    domainId: string,
    amount: number,
    fiscalYear: number
): Promise<void> {

    await prisma.governmentBudget.create({
        data: {
            id: `budget_${govtUnitId}_${Date.now()}`,
            govtUnitId,
            domainId,
            amount,
            fiscalYear,
            allocatedDate: new Date(),
            spent: 0
        }
    });
}

/**
 * Get government budget utilization
 */
export async function getGovernmentBudgetStatus(govtUnitId: string, fiscalYear: number): Promise<any> {

    const budgets = await prisma.governmentBudget.findMany({
        where: {
            govtUnitId,
            fiscalYear
        }
    });

    const totalAllocated = budgets.reduce((sum, b) => sum + b.amount, 0);
    const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
    const utilization = totalAllocated > 0 ? (totalSpent / totalAllocated) * 100 : 0;

    return {
        fiscalYear,
        totalAllocated,
        totalSpent,
        utilization: `${utilization.toFixed(1)}%`,
        budgetDetails: budgets
    };
}

// ============================================
// TOURISM INTEGRATION
// ============================================

/**
 * Register tourism entity (hotel, attraction, guide)
 */
export async function registerTourismEntity(
    name: string,
    entityType: 'hotel' | 'attraction' | 'guide' | 'restaurant',
    region: string,
    contactEmail: string,
    location: { lat: number; lng: number }
): Promise<void> {

    const stakeholder = await registerStakeholder(
        name,
        'tourism',
        contactEmail,
        region,
        'silver'
    );

    // Link to tourism domain
    await prisma.tourismEntity.create({
        data: {
            id: `tourism_${stakeholder.id}`,
            stakeholderId: stakeholder.id,
            entityType,
            location,
            verificationStatus: 'pending'
        }
    });
}

/**
 * Track tourism impact (visitors, revenue, cultural preservation)
 */
export async function recordTourismImpact(
    tourismEntityId: string,
    visitors: number,
    revenue: number,
    culturalValue: number
): Promise<void> {

    await prisma.tourismImpact.create({
        data: {
            id: `impact_${tourismEntityId}_${Date.now()}`,
            tourismEntityId,
            visitors,
            revenue,
            culturalValue,
            recordDate: new Date()
        }
    });
}

/**
 * Get tourism sector metrics
 */
export async function getTourismMetrics(region?: string): Promise<any> {

    const impacts = await prisma.tourismImpact.findMany({
        include: {
            tourismEntity: true
        }
    });

    const filtered = region
        ? impacts.filter(i => i.tourismEntity.location.region === region)
        : impacts;

    return {
        totalVisitors: filtered.reduce((sum, i) => sum + i.visitors, 0),
        totalRevenue: filtered.reduce((sum, i) => sum + i.revenue, 0),
        culturalValue: filtered.reduce((sum, i) => sum + i.culturalValue, 0),
        entityCount: new Set(filtered.map(i => i.tourismEntityId)).size,
        averageRevenuePerEntity: 0 // Calculate
    };
}
