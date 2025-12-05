# OneHeart = Real-Life RPG OS (National Operation System)

This repository is the bootstrap of the OneHeart core platform:
- Backend: Node.js + Fastify + Prisma + PostgreSQL
- Frontend: Next.js + Tailwind
- AI: Python FastAPI stub (local inference / orchestration)
- DB: PostgreSQL (Prisma schema included)
- Infra: Docker Compose for local dev, Kubernetes-ready manifests for prod
- Event Bus: Kafka/Redpanda (placeholder)
- Identity: DID-capable stub (OIDC-compatible in future)

Goals
1. Provide copy/paste-ready skeleton to run locally or in Codespace.
2. Deliver standards-based structure for professional expansion.
3. Keep anti-cheat, PoE (Proof-of-Engagement) and token/economy primitives ready.

Quickstart (Local / Codespace)

Prereqs:
- Docker & Docker Compose
- Node 18+
- pnpm (or npm/yarn)
- GitHub CLI (optional)
- Python 3.10+ (for AI microservice)

Steps:
```bash
# 1. Clone repo (or work in Codespace)
git clone git@github.com:<YOU>/oneheart.git
cd oneheart

# 2. Create .env following .env.example
cp .env.example .env

# 3. Start local infra (Postgres + Redis)
docker-compose -f infra/docker/docker-compose.yml up -d

# 4. Install and run backend
cd src/api
pnpm install
pnpm dev

# 5. Run frontend
cd ../../src/web
pnpm install
pnpm dev

# 6. Run AI service (optional)
cd ../../src/ai
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8100
```

Project layout
- `infra/` — docker compose and infra helper manifests
- `src/api` — backend Fastify + Prisma
- `src/web` — Next.js frontend
- `src/ai` — Python FastAPI AI stub
- `prisma/` — shared Prisma schemas and migrations (if any)

See `start.sh` for a tiny bootstrap helper.
