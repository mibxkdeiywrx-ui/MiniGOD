/**
 * Enterprise Layer API Routes
 * 
 * Endpoints for:
 * - Stakeholder management
 * - Business domain coordination
 * - National metrics & reporting
 * - Partner revenue sharing
 * - Government budget allocation
 * - Tourism integration
 */

import express, { Router, Request, Response } from 'express';
import * as enterpriseService from '../services/enterprise.service';

const router = Router();

// ============================================
// STAKEHOLDER MANAGEMENT
// ============================================

/**
 * POST /enterprise/stakeholders/register
 * Register a new stakeholder
 */
router.post('/stakeholders/register', async (req: Request, res: Response) => {
    try {
        const { name, type, contactEmail, region, tier } = req.body;

        const stakeholder = await enterpriseService.registerStakeholder(
            name,
            type,
            contactEmail,
            region,
            tier || 'bronze'
        );

        res.json({
            success: true,
            stakeholder
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * GET /enterprise/stakeholders/:stakeholderId
 * Get stakeholder profile
 */
router.get('/stakeholders/:stakeholderId', async (req: Request, res: Response) => {
    try {
        const { stakeholderId } = req.params;

        const profile = await enterpriseService.getStakeholderProfile(stakeholderId);

        res.json(profile);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * PUT /enterprise/stakeholders/:stakeholderId/verify
 * Verify stakeholder identity
 */
router.put('/stakeholders/:stakeholderId/verify', async (req: Request, res: Response) => {
    try {
        const { stakeholderId } = req.params;
        const verificationData = req.body;

        await enterpriseService.verifyStakeholder(stakeholderId, verificationData);

        res.json({
            success: true,
            message: 'Stakeholder verified'
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * PUT /enterprise/stakeholders/:stakeholderId/upgrade
 * Upgrade stakeholder tier
 */
router.put('/stakeholders/:stakeholderId/upgrade', async (req: Request, res: Response) => {
    try {
        const { stakeholderId } = req.params;

        await enterpriseService.upgradeStakeholderTier(stakeholderId);

        res.json({
            success: true,
            message: 'Stakeholder tier upgraded'
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

// ============================================
// BUSINESS DOMAINS
// ============================================

/**
 * POST /enterprise/domains/create
 * Create a business domain
 */
router.post('/domains/create', async (req: Request, res: Response) => {
    try {
        const { name, description, ownerId, region, revenueShare } = req.body;

        const domain = await enterpriseService.createBusinessDomain(
            name,
            description,
            ownerId,
            region,
            revenueShare
        );

        res.json({
            success: true,
            domain
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * GET /enterprise/domains/region/:region
 * List domains by region
 */
router.get('/domains/region/:region', async (req: Request, res: Response) => {
    try {
        const { region } = req.params;

        const domains = await enterpriseService.listBusinessDomainsByRegion(region);

        res.json({
            region,
            domainCount: domains.length,
            domains
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * GET /enterprise/domains/:domainId/stats
 * Get domain statistics
 */
router.get('/domains/:domainId/stats', async (req: Request, res: Response) => {
    try {
        const { domainId } = req.params;

        const stats = await enterpriseService.getDomainStats(domainId);

        res.json(stats);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

// ============================================
// NATIONAL METRICS
// ============================================

/**
 * GET /enterprise/metrics/national
 * Get national impact metrics
 */
router.get('/metrics/national', async (req: Request, res: Response) => {
    try {
        const { timeframe } = req.query;

        const metrics = await enterpriseService.getNationalMetrics(
            (timeframe as any) || 'daily'
        );

        res.json(metrics);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * GET /enterprise/metrics/regional
 * Get regional impact breakdown
 */
router.get('/metrics/regional', async (req: Request, res: Response) => {
    try {
        const breakdown = await enterpriseService.getRegionalImpactBreakdown();

        res.json(breakdown);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

// ============================================
// PARTNER REVENUE SHARING
// ============================================

/**
 * POST /enterprise/revenue/calculate
 * Calculate revenue share for a quest
 */
router.post('/revenue/calculate', async (req: Request, res: Response) => {
    try {
        const { questImpactValue, domainId } = req.body;

        const share = await enterpriseService.calculateRevenueShare(
            questImpactValue,
            domainId
        );

        res.json(share);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * POST /enterprise/revenue/record
 * Record revenue transaction to stakeholder
 */
router.post('/revenue/record', async (req: Request, res: Response) => {
    try {
        const { stakeholderId, amount, source, domainId } = req.body;

        await enterpriseService.recordStakeholderRevenue(
            stakeholderId,
            amount,
            source,
            domainId
        );

        res.json({
            success: true,
            message: 'Revenue recorded'
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * GET /enterprise/revenue/dashboard/:stakeholderId
 * Get stakeholder revenue dashboard
 */
router.get('/revenue/dashboard/:stakeholderId', async (req: Request, res: Response) => {
    try {
        const { stakeholderId } = req.params;

        const dashboard = await enterpriseService.getStakeholderRevenueDashboard(stakeholderId);

        res.json(dashboard);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

// ============================================
// PARTNERSHIP MANAGEMENT
// ============================================

/**
 * POST /enterprise/partnerships/create
 * Create partnership agreement
 */
router.post('/partnerships/create', async (req: Request, res: Response) => {
    try {
        const { partnerId, partnerType, agreement } = req.body;

        await enterpriseService.createPartnership(partnerId, partnerType, agreement);

        res.json({
            success: true,
            message: 'Partnership created'
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * GET /enterprise/partnerships/:partnerId/metrics
 * Get partnership performance metrics
 */
router.get('/partnerships/:partnerId/metrics', async (req: Request, res: Response) => {
    try {
        const { partnerId } = req.params;

        const metrics = await enterpriseService.getPartnershipMetrics(partnerId);

        res.json(metrics);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

// ============================================
// GOVERNMENT COORDINATION
// ============================================

/**
 * POST /enterprise/government/register
 * Register government unit
 */
router.post('/government/register', async (req: Request, res: Response) => {
    try {
        const { name, type, region, contactEmail } = req.body;

        await enterpriseService.registerGovernmentUnit(name, type, region, contactEmail);

        res.json({
            success: true,
            message: 'Government unit registered'
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * POST /enterprise/government/:govtUnitId/budget
 * Allocate government budget
 */
router.post('/government/:govtUnitId/budget', async (req: Request, res: Response) => {
    try {
        const { govtUnitId } = req.params;
        const { domainId, amount, fiscalYear } = req.body;

        await enterpriseService.allocateGovernmentBudget(
            govtUnitId,
            domainId,
            amount,
            fiscalYear
        );

        res.json({
            success: true,
            message: 'Budget allocated'
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * GET /enterprise/government/:govtUnitId/budget/:fiscalYear
 * Get budget utilization status
 */
router.get('/government/:govtUnitId/budget/:fiscalYear', async (req: Request, res: Response) => {
    try {
        const { govtUnitId, fiscalYear } = req.params;

        const status = await enterpriseService.getGovernmentBudgetStatus(
            govtUnitId,
            parseInt(fiscalYear)
        );

        res.json(status);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

// ============================================
// TOURISM INTEGRATION
// ============================================

/**
 * POST /enterprise/tourism/register
 * Register tourism entity
 */
router.post('/tourism/register', async (req: Request, res: Response) => {
    try {
        const { name, entityType, region, contactEmail, location } = req.body;

        await enterpriseService.registerTourismEntity(
            name,
            entityType,
            region,
            contactEmail,
            location
        );

        res.json({
            success: true,
            message: 'Tourism entity registered'
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * POST /enterprise/tourism/:tourismEntityId/impact
 * Record tourism impact
 */
router.post('/tourism/:tourismEntityId/impact', async (req: Request, res: Response) => {
    try {
        const { tourismEntityId } = req.params;
        const { visitors, revenue, culturalValue } = req.body;

        await enterpriseService.recordTourismImpact(
            tourismEntityId,
            visitors,
            revenue,
            culturalValue
        );

        res.json({
            success: true,
            message: 'Tourism impact recorded'
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * GET /enterprise/tourism/metrics
 * Get tourism sector metrics
 */
router.get('/tourism/metrics', async (req: Request, res: Response) => {
    try {
        const { region } = req.query;

        const metrics = await enterpriseService.getTourismMetrics(region as string);

        res.json(metrics);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

// ============================================
// REPORTING & EXPORTS
// ============================================

/**
 * POST /enterprise/reports/national
 * Generate national impact report
 */
router.post('/reports/national', async (req: Request, res: Response) => {
    try {
        const { month, year } = req.body;

        const report = await enterpriseService.generateNationalReport(month, year);

        res.json(report);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * POST /enterprise/reports/audit-export
 * Export data for government audit
 */
router.post('/reports/audit-export', async (req: Request, res: Response) => {
    try {
        const { startDate, endDate } = req.body;

        const audit = await enterpriseService.exportForAudit(
            new Date(startDate),
            new Date(endDate)
        );

        res.json(audit);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
