import { Player } from '../entities/Player.js';
import { Platform } from '../entities/Platform.js';
import { Scavenger } from '../entities/npcs/Scavenger.js';
import { NPC } from '../entities/npcs/NPC.js';

/**
 * Village Hub - Safe zone with NPCs and shops
 */
export class VillageHub {
  load() {
    // Player spawns in center of village
    const player = new Player(400, 502);

    const platforms = [
      // Main ground - continuous floor
      new Platform(0, 550, 1200, 50),

      // Building platforms (shops/houses)
      new Platform(100, 450, 150, 20),   // Blacksmith platform
      new Platform(400, 420, 180, 20),   // Magic school entrance
      new Platform(750, 450, 150, 20),   // Guild hall platform

      // Decorative platforms
      new Platform(50, 350, 80, 15),     // Left decoration
      new Platform(950, 370, 100, 15),   // Right decoration

      // Walls
      new Platform(-20, 0, 20, 600),     // Left boundary
      new Platform(1200, 0, 20, 600)     // Right boundary
    ];

    // NPCs
    const npcs = [
      // The Scavenger - main trader
      new Scavenger(200, 518),

      // Guild Master
      this.createGuildMaster(800, 418),

      // Blacksmith
      this.createBlacksmith(150, 418),

      // Magic Teacher
      this.createMagicTeacher(450, 388),

      // Village Elder (roaming)
      this.createVillageElder(600, 518),

      // Wandering NPCs
      this.createWanderingNPC(300, 518, 'Traveler', '🎒'),
      this.createWanderingNPC(900, 518, 'Merchant', '💼')
    ];

    return {
      name: 'Village Hub',
      width: 1200,
      height: 600,
      player,
      platforms,
      enemies: [], // No enemies in safe zone
      npcs,
      powerups: []
    };
  }

  createGuildMaster(x, y) {
    const guildMaster = new NPC(x, y, 32, 48, 'Guild Master');
    guildMaster.icon = '🛡️';
    guildMaster.trustLevel = 60;

    guildMaster.getDialogue = (playerName, trustLevel) => {
      return {
        text: `Welcome, ${playerName}. The Guild has many opportunities for capable warriors.`,
        options: [
          {
            label: '📜 View Quests',
            action: (game) => this.showQuestBoard(game)
          },
          {
            label: '💬 Talk',
            action: (game) => {
              console.log('Guild Master: The monsters grow stronger each day. We need heroes like you.');
            }
          },
          {
            label: '👋 Leave',
            action: null
          }
        ]
      };
    };

    return guildMaster;
  }

  createBlacksmith(x, y) {
    const blacksmith = new NPC(x, y, 36, 52, 'Blacksmith');
    blacksmith.icon = '⚒️';
    blacksmith.trustLevel = 50;

    blacksmith.getDialogue = (playerName, trustLevel) => {
      const greeting = trustLevel < 40
        ? `*grunts* What do you want?`
        : trustLevel < 70
        ? `${playerName}. Need something forged?`
        : `Ah, ${playerName}! My favorite customer!`;

      return {
        text: greeting,
        options: [
          {
            label: '🔨 Upgrade Weapon (50 gold)',
            action: (game) => this.upgradeWeapon(game, blacksmith)
          },
          {
            label: '🛡️ Repair Armor (30 gold)',
            action: (game) => this.repairArmor(game, blacksmith)
          },
          {
            label: '💬 Talk',
            action: (game) => {
              blacksmith.increaseTrust(2);
              console.log('Blacksmith: These bones make for interesting weapons. Strong, yet light.');
            }
          },
          {
            label: '👋 Leave',
            action: null
          }
        ]
      };
    };

    return blacksmith;
  }

  createMagicTeacher(x, y) {
    const teacher = new NPC(x, y, 32, 48, 'Magic Teacher');
    teacher.icon = '🧙';
    teacher.trustLevel = 40;

    teacher.getDialogue = (playerName, trustLevel) => {
      return {
        text: `${playerName}, the path of magic is long and difficult. But I sense potential in you.`,
        options: [
          {
            label: '✨ Learn Spell (100 gold)',
            action: (game) => this.learnSpell(game, teacher)
          },
          {
            label: '📚 Study Magic',
            action: (game) => {
              teacher.increaseTrust(3);
              console.log('Magic Teacher: Magic flows through all things, even the undead.');
            }
          },
          {
            label: '👋 Leave',
            action: null
          }
        ]
      };
    };

    return teacher;
  }

  createVillageElder(x, y) {
    const elder = new NPC(x, y, 32, 48, 'Village Elder');
    elder.icon = '👴';
    elder.trustLevel = 20; // Very distrustful at first

    elder.getDialogue = (playerName, trustLevel) => {
      let text = '';

      if (trustLevel < 30) {
        text = `A skeleton... in our village? This is... unsettling.`;
      } else if (trustLevel < 60) {
        text = `${playerName}... perhaps I judged you too harshly. You've proven yourself.`;
      } else {
        text = `${playerName}, my friend! The village is safer with you here.`;
      }

      return {
        text,
        options: [
          {
            label: '❤️ Help Village (Quest)',
            action: (game) => {
              if (game.questSystem) {
                game.questSystem.acceptQuest('slime_problem');
                elder.increaseTrust(10);
              }
            }
          },
          {
            label: '💬 Talk',
            action: (game) => {
              elder.increaseTrust(5);
              console.log('Elder: The curse... it took so much from us.');
            }
          },
          {
            label: '👋 Leave',
            action: null
          }
        ]
      };
    };

    return elder;
  }

  createWanderingNPC(x, y, name, icon) {
    const npc = new NPC(x, y, 28, 44, name);
    npc.icon = icon;
    npc.trustLevel = 30 + Math.random() * 30; // Random starting trust

    npc.getDialogue = (playerName, trustLevel) => {
      const greetings = [
        `Hello, ${playerName}.`,
        `Oh, ${playerName}! Good to see you.`,
        `${playerName}! How goes your adventure?`
      ];

      return {
        text: greetings[Math.floor(Math.random() * greetings.length)],
        options: [
          {
            label: '💬 Chat',
            action: (game) => {
              npc.increaseTrust(2);
              console.log(`${name}: The village has been safer since you arrived.`);
            }
          },
          {
            label: '👋 Goodbye',
            action: null
          }
        ]
      };
    };

    return npc;
  }

  // Helper methods for NPC actions
  showQuestBoard(game) {
    console.log('📜 Opening quest board...');
    // Quest board would show available quests
    if (game.questSystem) {
      const quests = game.questSystem.getAvailableQuests('Guild Master');
      console.log('Available quests:', quests);
    }
  }

  upgradeWeapon(game, npc) {
    if (game.player.gold >= 50) {
      game.player.gold -= 50;
      console.log('⚔️ Weapon upgraded!');
      npc.increaseTrust(5);
    } else {
      console.log('❌ Not enough gold!');
    }
  }

  repairArmor(game, npc) {
    if (game.player.gold >= 30) {
      game.player.gold -= 30;
      game.player.health = game.player.maxHealth;
      console.log('🛡️ Armor repaired! Health restored!');
      npc.increaseTrust(3);
    } else {
      console.log('❌ Not enough gold!');
    }
  }

  learnSpell(game, npc) {
    if (game.player.gold >= 100) {
      game.player.gold -= 100;
      console.log('✨ Learned new spell!');
      npc.increaseTrust(10);
    } else {
      console.log('❌ Not enough gold!');
    }
  }
}
