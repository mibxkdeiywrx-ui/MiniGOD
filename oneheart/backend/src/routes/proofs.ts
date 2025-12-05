import express, { Request, Response } from 'express';
import prisma from '../db';

const router = express.Router();

// POST /api/proof/submit
router.post('/submit', async (req: Request, res: Response) => {
    try {
        const { did, email, questId, title, description, impactCategory, evidence } = req.body;

        if (!did || !title) return res.status(400).json({ error: 'did and title required' });

        let user = await prisma.user.findUnique({ where: { did } });
        if (!user) {
            user = await prisma.user.create({ data: { did, email } });
        }

        const proof = await prisma.proof.create({
            data: {
                userId: user.id,
                questId,
                title,
                description,
                impactCategory,
            }
        });

        if (Array.isArray(evidence)) {
            for (const ev of evidence) {
                await prisma.evidence.create({
                    data: {
                        proofId: proof.id,
                        type: ev.type || 'photo',
                        url: ev.url,
                        metadata: ev.metadata || {},
                        hash: ev.hash || ''
                    }
                });
            }
        }

        res.status(201).json({ proof_id: proof.id, status: proof.status });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'internal_error' });
    }
});

// GET /api/proof/list
router.get('/list', async (req: Request, res: Response) => {
    try {
        const { did, page = 1, limit = 20 } = req.query as any;
        const where: any = {};
        if (did) {
            const user = await prisma.user.findUnique({ where: { did } });
            if (user) where.userId = user.id;
            else return res.json({ data: [], pagination: { page, limit, total: 0 } });
        }
        const proofs = await prisma.proof.findMany({
            where,
            include: { evidences: true, verifications: true },
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * limit,
            take: Number(limit),
        });
        const total = await prisma.proof.count({ where });
        res.json({ data: proofs, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'internal_error' });
    }
});

// GET /api/proof/:id
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const proof = await prisma.proof.findUnique({
            where: { id },
            include: { evidences: true, verifications: true, impact: true, witnesses: true }
        });
        if (!proof) return res.status(404).json({ error: 'not_found' });
        res.json(proof);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'internal_error' });
    }
});

export default router;
