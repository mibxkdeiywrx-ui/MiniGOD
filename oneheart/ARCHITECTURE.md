# OneHeart OS — Core Architecture & System Design

**Philosophy: ONE FOR ALL — ระบบเพื่อทุกคน ไม่ใช่เพื่อทุน ไม่ใช่เพื่อเส้นสาย**

---

## System Architecture Overview

```
ONEHEART OS
├── Core Ideology Layer
│   ├── One For All Engine          (ระบบเสมอภาค — ทุกคนโต ทุกคนชนะ)
│   ├── Real-Life RPG System        (เกมชีวิตจริง — ทักษะ → บทบาท → อัตลักษณ์)
│   └── Action → Value Conversion   (การทำ → ค่า → อิทธิพล)
│
├── Core Services Layer
│   ├── Identity Layer (DID)        (บัตรประชาชนดิจิทัลแบบเต็มอำนาจ)
│   ├── Verification Layer (AI)     (ตรวจสอบเป็น AI + ชุมชน — ไม่โกง)
│   ├── Impact Engine               (คำนวณผลกระทบ: บุคคล → ชุมชน → ประเทศ)
│   └── Engagement & Quest Engine   (เควส + สเกลข้าม — ทักษะ → อัตลักษณ์)
│
└── World Operation Layer
    ├── Nation Dashboard            (ภาพรวมประเทศ Real-time + Data-driven)
    ├── Regional Nodes              (จังหวัด, อปท., ชุมชน — Self-organizing)
    ├── Global Mission System        (โครงการโลก + Ascension Tracks)
    └── Proof & Evidence Ledger      (บันทึกอิมมิวเทเบิล)
```

---

## Layer 1: Core Ideology

### 1.1 One For All Engine

- **ความหมาย**: ระบบที่ทุกคนเติบโต → ทั้งประเทศก้าวหน้า
- **หลักการ**:
  - ไม่มี "ผู้ชนะ" ในความหมายของการแลกเปลี่ยนผลรวมศูนย์ (zero-sum)
  - Impact ของคุณ = ความมั่งคั่งของชุมชน
  - ระบบตัดสินจากการกระทำ ไม่ใช่เส้นสาย
- **เทคนิค**:
  - Shared Impact Pool (รวม Impact ของทั้งประเทศ → ใช้ป้องกันภาวะวิกฤต)
  - Mutual Growth Algorithm (หากใครโต ทั้งระบบโต)
  - Anti-Fraud Detection (ตัดการโกงและสร้างภาพ)

### 1.2 Real-Life RPG System

- **ความหมาย**: ชีวิตจริง = เกมกับระบบเลเวล + ทักษะ
- **ส่วนประกอบ**:
  - **Skill Trees**: ทักษะแบบชั้นเชิง (เกษตร → วิศวกรรม → บริหาร)
  - **Roles & Identity**: บทบาท = ตำแหน่งโลกจริง (ครู, วิศวกร, เกษตรกร)
  - **Ascension Paths**: เส้นทางขึ้นสู่ระดับโลก (แช่ง → อำเภอ → จังหวัด → ประเทศ → โลก)
  - **Companion System**: เมนทอร์ + AI + ชุมชน = "party" ของคุณ
- **คิด**: ทำให้ "พัฒนาตัวเอง" ด้วยระบบที่มีความหมาย ไม่ใช่ "วิ่งเพื่อวิ่ง"

### 1.3 Action → Value Conversion

- **ความหมาย**: ทุกสิ่งที่ทำ = ค่าที่วัดได้
- **กระบวนการ**:
  1. คุณทำภารกิจ (งานจริง)
  2. ระบบจัดเก็บหลักฐาน (ภาพ, เสียง, GPS, Sensor, Witness)
  3. AI + ชุมชน verify
  4. ถ้าจริง → คำนวณ Impact Unit (IU)
  5. IU → ทำให้ลง dashboard + unlock เควสใหม่ + ยกระดับตัวละคร
- **ผลกระทบ**: ไม่มี "นั่งคอยเงินเดือน" — คุณสร้าง ระบบรู้

---

## Layer 2: Core Services

### 2.1 Identity Layer (DID — Decentralized Identity)

- **ต้อง**: บัตรประชาชนดิจิทัล ที่ "เป็นของตัวเอง" ไม่ใช่ "เป็นของรัฐ"
- **มี**:
  - Wallet / ลายนิ้วมือดิจิทัล
  - Verifiable Credentials (ใบการณ์อบรม, บัญชีแรงงาน, ทักษะ)
  - Privacy-first data (ไม่ต้องบอกแพทย์คุณไปเมืองไหน เพียงแค่ว่า "verified")
- **ทำไม**: Proof Layer อยู่บนตัวตนที่ไม่โกง

### 2.2 Verification Layer (AI + Community)

- **คิด**: ไม่ไว้ใจ AI คนเดียว, ไม่ไว้ใจคน คนเดียว → ทั้ง 2 ร่วมกัน
- **วิธี**:
  - **Stage 1**: AI scan หลักฐาน (ภาพ: มีคน, ที่สาธารณะ, ไม่fake)
  - **Stage 2**: 3-5 Witness ในพื้นที่ยืนยัน
  - **Stage 3**: ถ้า pass → บันทึก immutable ledger + ให้ reward
- **ตัดการโกง**: ใครพยายาม "ปั่น" หลักฐาน → ลบออกจากระบบ ไม่สถานีที่สอง

### 2.3 Impact Engine

- **ต้อง**: คำนวณว่าการทำของคุณส่งผลอะไร
- **วัด**:
  - **ระดับส่วนตัว**: เศรษฐฐาน, สุขภาพ, ทักษะ (ขึ้น)
  - **ระดับชุมชน**: ความปลอดภัย, อาชีวศึกษา, ความเชื่อมั่น (ขึ้น)
  - **ระดับระดับจังหวัด**: GDP ท้องถิ่น, การจ้างงาน, ความเสมอภาค (ขึ้น)
  - **ระดับประเทศ**: ความแข็งแกร่ง, การแข่งขันระหว่างประเทศ, "คุณภาพคน" (ขึ้น)
- **อัลกอริทึม**: 
  - Impact Points = (ผลโดยตรง) × (reach) × (sustainability) ÷ (เวลาทำ)
  - ทุกเดือน: อัปเดท Impact Score ให้ทั้งระบบ
- **ทำไม**: เหน็บแน่ -> "ต่อไป ควรไป REGIONAL ทำโครงการไหน?"

### 2.4 Engagement & Quest Engine

- **เควส**: หนึ่งของ 4 ประเภท:
  1. **Daily Quest**: ภารกิจรายวัน (ทะนุถนอม, อาหาร, การพูดคุย)
  2. **Skill Quest**: เรียนทักษะใหม่ (ถัดไปขึ้นระดับ Skill Tree)
  3. **Community Quest**: ทำร่วมกันท้องถิ่น (ชุมชน, อปท.)
  4. **Ascension Quest**: เป้าหลัก (ไป Regional เพื่อทำโครงการใหญ่)
- **Reward**:
  - XP (unlock Skill), Badges (บัตรเครื่องหมาย), Access (ขึ้นเลเวล)
  - Impact Unit (IU) → ใช้ support Shared Pool
  - Reputation (คุณคุณ) → คนไว้ใจตัวคุณ
- **แม่บ้าน**: "เควส" ท่านายก/ผู้บริหาร → mission ระดับจังหวัด/ประเทศ

---

## Layer 3: World Operation

### 3.1 Nation Dashboard

- **ภาพรวม**:
  - ประชาชน, ผู้บริหาร, นักวิจัย เห็นข้อมูลเหมือนกัน
  - Real-time: กำลังทำอะไร, ที่ไหน, ผล
- **แท็บ**:
  - **People**: ใครขึ้นเลเวลใหม่, ใครแล้ว regional
  - **Impact**: Impact Pool รวม, ที่ เด่น (agriculture ↑ 23%, healthcare ↑ 15%)
  - **Quests**: quest ที่ popular, quest ที่ urgent
  - **Regions**: แต่ละจังหวัด pending help?
  - **Risks**: ระบบระนาด/ความเสี่ยง
- **ไม่มี**: "ข้อมูลลับ" ถ้าไม่ใช่ privacy ส่วนบุคคล → ทั้งหมดเปิด

### 3.2 Regional Nodes

- **ประเมิน**: จังหวัด, อปท., ชุมชน = "node" ในเครือข่าย
- **หน้าที่**:
  - สร้างเควส local
  - วัดผล local
  - ยื่น "ช่วยด้วย" ขึ้นสู่ central
  - Self-organize: เลือก node lead (merit-based, ไม่ได้มาจากบิน)
- **ข้อดี**: ไม่มี "ระบบสลัม" — โหลด local, ทำ local, รีวอร์ด local

### 3.3 Global Mission System

- **ความเป้าหมาย**: 
  - Ascension Tracks (ส่งคนดี ออกไปเรียนโลก)
  - WorldWalker Program (เที่ยวโลก = ภารกิจชีวิต + ทูตสหประสัทธิ์)
  - Cross-border Quests (ร่วมมือกับประเทศอื่น)
- **ตัวอย่าง**:
  - ม.ต้น ที่ฉลาด เข้า "หลักสูตรวิศวกรรม" → จบ → ไป Stanford → กลับมา บริหาร tech hub ไทย
  - เกษตรกร ที่ emerge → ไป Japan อบรม vertical farming → กลับ ทำ demo farm ใน TH
  - ศิลปิน → ไป Korea / Taiwan exhibit → กลับ ทำสตูดิโอโดยรวม + อพยพเยาวชน

### 3.4 Proof & Evidence Ledger

- **ต้อง**: บันทึกทั้งหมด ที่ hash-linked + immutable
- **มี**:
  - **Proofs**: ใครทำอะไร + หลักฐาน (reference: photo hash, GPS trace, timestamp)
  - **Verifications**: ใครตัดสินว่าจริง + เหตุผล
  - **Impact**: คำนวณผล + ใครแล้ว level up
  - **Disputes**: คัดค้านหลักฐาน + resolve (ชุมชน vote)
- **เทคโนโลยี**:
  - Postgres (consistency ส่วนกลาง) + Merkle tree checkpoint (ไม่โกง)
  - หรือ Blockchain (ถ้าต้องการ decentralized แบบสมบูรณ์; late stage)

---

## Technical Stack (Per Layer)

### Core Ideology Layer
- Decision Engine: TypeScript rules engine (if-then-else Impact scoring)
- Reputation System: PostgreSQL + in-memory cache (Redis)

### Core Services Layer
- **DID**: Ethereum / Polygon smart contract หรือ Verifiable Credential (W3C standard)
- **Verification**: OpenAI Vision API + human dashboard (TypeScript Express API)
- **Impact Engine**: Node.js service (real-time calculation)
- **Quest Engine**: GraphQL API + real-time subscription (WebSocket)

### World Operation Layer
- **Dashboard**: React SPA + WebSocket live update
- **Regional Nodes**: Federated API (REST + EventBus for async replication)
- **Ledger**: PostgreSQL with Merkle tree snapshots
- **Global Missions**: Task scheduler (Bull queue) + distributed tracing

---

## File Structure (Repo Layout)

```
/oneheart
├── /.devcontainer              # Codespaces config
├── /backend
│   ├── /src
│   │   ├── /services           # Core Services (DID, Verification, Impact, Quest)
│   │   ├── /routes             # Express routes (/api/proof, /api/quest, /api/dashboard)
│   │   ├── /entities           # TypeORM entities (User, Proof, Evidence, Quest)
│   │   ├── /middleware         # Auth, validation, error handling
│   │   └── index.ts            # App entry
│   ├── package.json
│   └── tsconfig.json
├── /mobile                     # Expo app (React Native)
├── /web                        # React dashboard
├── /verify                     # AI verification service (Python / Node)
├── /infra                      # Docker compose, Terraform, CI/CD
├── /sql                        # Database migrations, seed scripts
└── README.md
```

---

## Roadmap (Next Steps)

1. **Phase 1: Proof Layer MVP** (weeks 1–2)
   - Backend: PostgreSQL + Express API for proof submission
   - Verification: Basic AI (Google Vision API) + manual review queue
   - Mobile: Simple form to submit proof

2. **Phase 2: Impact Engine** (weeks 3–4)
   - Calculate Impact Points from proofs
   - Dashboard (simple bar charts of aggregate impact by region)
   - Identity: Stub DID or use email + hashed ID

3. **Phase 3: Quest System** (weeks 5–6)
   - Create quests in admin dashboard
   - Link quests to impact outcomes
   - Mobile: Show available quests + submit proof inline

4. **Phase 4: Regional Nodes** (weeks 7–8)
   - Multi-tenancy: each region has its own dashboard + set of quests
   - Regional leaders can create/edit quests
   - Real-time federation of impact data

5. **Phase 5: Global Missions + Ascension** (weeks 9+)
   - Ascension Tracks: identify high-impact users for advanced roles
   - WorldWalker: partnerships, study abroad links, exchange programs

---

## Philosophy in Code

- **Every action is verified** → Action must have proof
- **Every proof becomes value** → Value is transparent and accounted for
- **Every value raises the whole** → Impact is never zero-sum
- **Every person can lead** → Leadership by merit, not lineage

---

**Status**: Architecture Document (reference for development)  
**Last Updated**: 2025-12-04
