# OneHeart OS

**ระบบปฏิบัติการประเทศ | The World Operation System**

---

## Philosophy

**ONE FOR ALL** — ระบบเพื่อทุกคน ไม่ใช่เพื่อทุน ไม่ใช่เพื่อเส้นสาย

---

## Core Architecture

```
Layer 0: Proof Layer           (ความจริงที่ตรวจสอบได้)
Layer 1: Action Engine         (เครื่องยนต์เปลี่ยนการกระทำเป็นค่า)
Layer 2: Impact Economy        (เศรษฐกิจผลกระทบ)
Layer 3: Quest System          (ระบบเควสแบบ RPG)
Layer 4: AI Guardian           (ระบบป้องกันประเทศ)
Layer 5: Nation Dashboard      (ภาพรวมประเทศแบบ Real-time)
```

---

## Project Structure

```
/oneheart
├── /.devcontainer          (Codespaces configuration)
├── /backend                (Node.js + TypeScript API)
│   ├── src/
│   │   └── index.ts        (Express server starter)
│   ├── package.json
│   └── tsconfig.json
├── /verify                 (Verification & Proof system)
├── /web                    (Web application)
├── /mobile                 (Mobile application)
├── /infra                  (Infrastructure & Deployment)
└── /sql                    (Database schema & migrations)
```

---

## Quick Start

### Using GitHub Codespaces

1. Go to Code → Open with Codespaces → New
2. Wait for container to build (Node + Python + Docker ready)
3. Terminal: `cd backend && npm run dev`
4. Visit: http://localhost:3000/health

### Local Development

```bash
cd backend
npm install
npm run dev
```

---

## What's Next

- [ ] Proof Layer implementation
- [ ] Action Engine calculations
- [ ] Impact Economy tokenomics
- [ ] Quest System UI
- [ ] AI Guardian deployment
- [ ] Nation Dashboard MVP

---

**Status**: Foundation Phase — Adding Core Systems

**Last Updated**: 2025-12-03
