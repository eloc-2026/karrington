/**
 * Player Class Definitions
 * Mage, Tech, and Graver
 */

export const PLAYER_CLASSES = {
  MAGE: {
    name: 'Mage',
    stats: {
      maxHealth: 80,
      maxMana: 150, // Higher mana pool
      moveSpeed: 300,
      jumpPower: -480,
      damageMultiplier: 1.0
    },
    abilities: {
      primary: {
        name: 'Blue Flame',
        key: 'X',
        manaCost: 2,
        damage: 25,
        cooldown: 0.3,
        projectileSpeed: 450,
        projectileColor: '#4488ff'
      },
      secondary: {
        name: 'Necromancy',
        key: 'Z',
        manaCost: 10,
        damage: 20,
        cooldown: 0.4
      }
    },
    model: 'mage'
  },

  TECH: {
    name: 'Tech',
    stats: {
      maxHealth: 120, // More health
      maxMana: 100,
      moveSpeed: 340,
      jumpPower: -460,
      damageMultiplier: 0.7 // Takes less damage (30% reduction)
    },
    abilities: {
      primary: {
        name: 'Plasma Gun',
        key: 'X',
        manaCost: 1,
        damage: 18,
        cooldown: 0.2, // Faster fire rate
        projectileSpeed: 600,
        projectileColor: '#00ffaa'
      },
      secondary: {
        name: 'EMP Blast',
        key: 'Z',
        manaCost: 15,
        damage: 30,
        cooldown: 1.0
      }
    },
    model: 'tech'
  },

  GRAVER: {
    name: 'Graver',
    stats: {
      maxHealth: 110,
      maxMana: 90,
      moveSpeed: 360, // Faster movement
      jumpPower: -500, // Higher jump
      damageMultiplier: 1.1 // Takes slightly more damage
    },
    abilities: {
      primary: {
        name: 'Sword Slash',
        key: 'X',
        manaCost: 0, // Free melee attacks
        damage: 35, // High melee damage
        cooldown: 0.5,
        range: 60, // Melee range
        type: 'melee'
      },
      secondary: {
        name: 'Magic Slash',
        key: 'Z',
        manaCost: 8,
        damage: 28,
        cooldown: 0.6,
        projectileSpeed: 400,
        projectileColor: '#ff4444'
      }
    },
    model: 'graver'
  }
};

export class PlayerClass {
  constructor(className) {
    const classData = PLAYER_CLASSES[className];
    if (!classData) {
      throw new Error(`Unknown class: ${className}`);
    }

    this.className = className;
    this.classData = classData;
    this.stats = { ...classData.stats };
    this.abilities = classData.abilities;
    this.model = classData.model;
  }

  getStats() {
    return this.stats;
  }

  getAbility(type) {
    return this.abilities[type];
  }

  getModelType() {
    return this.model;
  }
}
