/**
 * Database Seed Script
 * 
 * Populates test data for:
 * - Players (test users)
 * - Quests (missions by category/difficulty)
 * - PlayerQuests (available missions)
 * 
 * Usage: npx ts-node prisma/seed.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await prisma.tokenLedger.deleteMany({});
    await prisma.impactLog.deleteMany({});
    await prisma.playerQuest.deleteMany({});
    await prisma.quest.deleteMany({});
    await prisma.player.deleteMany({});
    await prisma.proof.deleteMany({});
    await prisma.evidence.deleteMany({});
    await prisma.verification.deleteMany({});
    await prisma.impactScore.deleteMany({});
    console.log('✅ Cleared all tables\n');

    // Create test players
    console.log('👤 Creating test players...');
    const players = await Promise.all([
        prisma.player.create({
            data: {
                id: 'player_alice',
                name: 'Alice',
                level: 1,
                xpTotal: 0,
                alignment: 'balanced',
                stats: {
                    strength: 10,
                    wisdom: 12,
                    charisma: 11,
                    constitution: 10
                }
            }
        }),
        prisma.player.create({
            data: {
                id: 'player_bob',
                name: 'Bob',
                level: 2,
                xpTotal: 500,
                alignment: 'generous',
                stats: {
                    strength: 12,
                    wisdom: 10,
                    charisma: 13,
                    constitution: 11
                }
            }
        }),
        prisma.player.create({
            data: {
                id: 'player_carol',
                name: 'Carol',
                level: 3,
                xpTotal: 1200,
                alignment: 'balanced',
                stats: {
                    strength: 11,
                    wisdom: 14,
                    charisma: 10,
                    constitution: 12
                }
            }
        })
    ]);
    console.log(`✅ Created ${players.length} players\n`);

    // Create test quests by category and difficulty
    console.log('🎯 Creating test quests...');

    const quests = await Promise.all([
        // Cleanup quests
        prisma.quest.create({
            data: {
                id: 'quest_cleanup_1',
                title: 'Park Cleanup',
                description: 'Help clean up the local park',
                category: 'cleanup',
                difficulty: 1,
                baseXp: 50,
                baseTokens: 5,
                regionId: 'region_bangkok',
                requirements: { minLevel: 0 }
            }
        }),
        prisma.quest.create({
            data: {
                id: 'quest_cleanup_2',
                title: 'Beach Cleanup',
                description: 'Remove trash from the beach',
                category: 'cleanup',
                difficulty: 2,
                baseXp: 75,
                baseTokens: 8,
                regionId: 'region_phuket',
                requirements: { minLevel: 2 }
            }
        }),

        // Training quests
        prisma.quest.create({
            data: {
                id: 'quest_training_1',
                title: 'Basic Coding Workshop',
                description: 'Learn JavaScript fundamentals',
                category: 'training',
                difficulty: 2,
                baseXp: 100,
                baseTokens: 10,
                regionId: 'region_bangkok',
                requirements: { minLevel: 0 }
            }
        }),
        prisma.quest.create({
            data: {
                id: 'quest_training_2',
                title: 'Advanced SQL Training',
                description: 'Master database design',
                category: 'training',
                difficulty: 3,
                baseXp: 150,
                baseTokens: 15,
                regionId: 'region_bangkok',
                requirements: { minLevel: 3 }
            }
        }),

        // Cultural quests
        prisma.quest.create({
            data: {
                id: 'quest_cultural_1',
                title: 'Temple Documentation',
                description: 'Document local temple history',
                category: 'cultural',
                difficulty: 2,
                baseXp: 75,
                baseTokens: 7,
                regionId: 'region_chiang_mai',
                requirements: { minLevel: 1 }
            }
        }),
        prisma.quest.create({
            data: {
                id: 'quest_cultural_2',
                title: 'Craft Workshop Teaching',
                description: 'Teach traditional crafts',
                category: 'cultural',
                difficulty: 3,
                baseXp: 125,
                baseTokens: 12,
                regionId: 'region_chiang_mai',
                requirements: { minLevel: 2 }
            }
        }),

        // Research quests
        prisma.quest.create({
            data: {
                id: 'quest_research_1',
                title: 'Water Quality Survey',
                description: 'Test water quality in local streams',
                category: 'research',
                difficulty: 2,
                baseXp: 100,
                baseTokens: 10,
                regionId: 'region_ubon',
                requirements: { minLevel: 1 }
            }
        }),
        prisma.quest.create({
            data: {
                id: 'quest_research_2',
                title: 'Community Health Study',
                description: 'Conduct health assessment survey',
                category: 'research',
                difficulty: 3,
                baseXp: 150,
                baseTokens: 15,
                regionId: 'region_isaan',
                requirements: { minLevel: 2 }
            }
        }),

        // Sports/Health quests
        prisma.quest.create({
            data: {
                id: 'quest_sports_1',
                title: 'Youth Soccer Training',
                description: 'Coach local youth soccer team',
                category: 'sports',
                difficulty: 2,
                baseXp: 80,
                baseTokens: 8,
                regionId: 'region_bangkok',
                requirements: { minLevel: 0 }
            }
        }),
        prisma.quest.create({
            data: {
                id: 'quest_sports_2',
                title: 'Senior Fitness Program',
                description: 'Lead fitness class for seniors',
                category: 'sports',
                difficulty: 2,
                baseXp: 85,
                baseTokens: 8,
                regionId: 'region_bangkok',
                requirements: { minLevel: 1 }
            }
        })
    ]);
    console.log(`✅ Created ${quests.length} quests\n`);

    // Assign quests to players
    console.log('📋 Assigning quests to players...');

    const playerQuests = await Promise.all([
        // Alice gets beginner quests
        prisma.playerQuest.create({
            data: {
                playerId: 'player_alice',
                questId: 'quest_cleanup_1',
                status: 'available'
            }
        }),
        prisma.playerQuest.create({
            data: {
                playerId: 'player_alice',
                questId: 'quest_sports_1',
                status: 'available'
            }
        }),

        // Bob gets intermediate quests
        prisma.playerQuest.create({
            data: {
                playerId: 'player_bob',
                questId: 'quest_training_1',
                status: 'available'
            }
        }),
        prisma.playerQuest.create({
            data: {
                playerId: 'player_bob',
                questId: 'quest_cultural_1',
                status: 'available'
            }
        }),

        // Carol gets advanced quests
        prisma.playerQuest.create({
            data: {
                playerId: 'player_carol',
                questId: 'quest_research_1',
                status: 'available'
            }
        }),
        prisma.playerQuest.create({
            data: {
                playerId: 'player_carol',
                questId: 'quest_training_2',
                status: 'available'
            }
        })
    ]);
    console.log(`✅ Assigned ${playerQuests.length} quests\n`);

    // Create some completed quests with rewards
    console.log('🏆 Creating completed quest records...');

    const completedQuests = await Promise.all([
        prisma.playerQuest.create({
            data: {
                playerId: 'player_bob',
                questId: 'quest_cleanup_1',
                status: 'completed',
                score: 95,
                completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                proofUrl: 'https://example.com/proof_bob_cleanup.jpg'
            }
        }),
        prisma.playerQuest.create({
            data: {
                playerId: 'player_carol',
                questId: 'quest_sports_1',
                status: 'completed',
                score: 98,
                completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                proofUrl: 'https://example.com/proof_carol_sports.jpg'
            }
        })
    ]);
    console.log(`✅ Created ${completedQuests.length} completed quests\n`);

    // Create impact logs for completed quests
    console.log('📊 Creating impact logs...');

    const impactLogs = await Promise.all([
        prisma.impactLog.create({
            data: {
                playerId: 'player_bob',
                questId: 'quest_cleanup_1',
                xpAwarded: 50,
                tokenAwarded: 5,
                impactValue: 60,
                breakdown: { local: 30, national: 18, global: 12 }
            }
        }),
        prisma.impactLog.create({
            data: {
                playerId: 'player_carol',
                questId: 'quest_sports_1',
                xpAwarded: 80,
                tokenAwarded: 8,
                impactValue: 96,
                breakdown: { local: 48, national: 28, global: 20 }
            }
        })
    ]);
    console.log(`✅ Created ${impactLogs.length} impact logs\n`);

    // Create token ledger entries
    console.log('💎 Creating token transactions...');

    const tokenLedger = await Promise.all([
        prisma.tokenLedger.create({
            data: {
                playerId: 'player_bob',
                amount: 5,
                type: 'mint',
                source: 'quest_completion',
                transactionId: 'tx_bob_mint_1'
            }
        }),
        prisma.tokenLedger.create({
            data: {
                playerId: 'player_carol',
                amount: 8,
                type: 'mint',
                source: 'quest_completion',
                transactionId: 'tx_carol_mint_1'
            }
        }),
        prisma.tokenLedger.create({
            data: {
                playerId: 'player_alice',
                amount: 10,
                type: 'mint',
                source: 'welcome_bonus',
                transactionId: 'tx_alice_welcome'
            }
        })
    ]);
    console.log(`✅ Created ${tokenLedger.length} token transactions\n`);

    console.log('✅ Database seeding complete!\n');
    console.log('📊 Summary:');
    console.log(`   - Players: ${players.length}`);
    console.log(`   - Quests: ${quests.length}`);
    console.log(`   - Player Quests: ${playerQuests.length + completedQuests.length}`);
    console.log(`   - Impact Logs: ${impactLogs.length}`);
    console.log(`   - Token Transactions: ${tokenLedger.length}`);
    console.log('\n🚀 Ready to test!\n');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
