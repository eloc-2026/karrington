/**
 * Game constants and configuration
 */

export const GAME_CONFIG = {
  VIEWPORT_WIDTH: 800,
  VIEWPORT_HEIGHT: 600,

  PLAYER: {
    WIDTH: 32,
    HEIGHT: 48,
    MAX_HEALTH: 100, // Increased from 80 for better balance
    MAX_MANA: 100,
    MANA_REGEN: 10, // per second
    MOVE_SPEED: 320,
    JUMP_POWER: -480,
    ATTACK_COOLDOWN: 400, // ms
    DAMAGE_MULTIPLIER: 1.0, // Reduced from 1.2 - skeleton no longer fragile
    LIFE_STEAL: 0.2 // 20% of damage dealt
  },

  PHYSICS: {
    GRAVITY: 980,
    TERMINAL_VELOCITY: 600,
    FRICTION: 0.92, // Increased from 0.8 to make enemies slide less
    AIR_RESISTANCE: 0.98
  },

  COMBAT: {
    INVINCIBILITY_TIME: 0.5, // seconds
    KNOCKBACK_FORCE: 50, // Reduced from 100 to prevent teleporting
    CRIT_CHANCE: 0.1, // 10%
    CRIT_MULTIPLIER: 1.5
  },

  XP: {
    BASE_XP_TO_LEVEL: 100,        // xpToNextLevel = BASE_XP_TO_LEVEL * level
    HEALTH_PER_LEVEL: 10,
    MANA_PER_LEVEL: 5,
    DAMAGE_MULTIPLIER_PER_LEVEL: 0.05,  // 5% increase per level
    REWARDS: {
      GOBLIN: 15,
      ZOMBIE_SLIME: 25
    }
  },

  ENEMIES: {
    ZOMBIE_SLIME: {
      WIDTH: 32,
      HEIGHT: 24,
      HEALTH: 20,
      DAMAGE: 5,
      SPEED: 100,
      PATROL_RANGE: 200,
      XP_REWARD: 25
    },
    FLOATING_SKULL: {
      WIDTH: 40,
      HEIGHT: 32,
      HEALTH: 15,
      DAMAGE: 8,
      SPEED: 150,
      DETECTION_RANGE: 300,
      SHOOT_COOLDOWN: 2000 // ms
    },
    ARMORED_SKELETON: {
      WIDTH: 36,
      HEIGHT: 52,
      HEALTH: 50,
      DAMAGE: 10,
      SPEED: 120,
      PATROL_RANGE: 250
    },
    GOBLIN: {
      WIDTH: 28,
      HEIGHT: 32,
      HEALTH: 15,
      DAMAGE: 4,
      SPEED: 140,
      PATROL_RANGE: 200,
      XP_REWARD: 15
    },
    VULNERABLE_THRESHOLD: 0.2 // 20% health
  },

  BOSS: {
    BONE_LORD: {
      WIDTH: 120,
      HEIGHT: 180,
      HEALTH: 500,
      DAMAGE: 50,
      SPEED_PHASE_1: 100,
      SPEED_PHASE_2: 150,
      PHASE_2_THRESHOLD: 0.67, // 67% health
      PHASE_3_THRESHOLD: 0.33  // 33% health
    }
  },

  POWERS: {
    NECROMANCY: {
      BASIC_DAMAGE: 20,
      BASIC_SPEED: 400,
      BASIC_COOLDOWN: 0.4,
      MINION_COST: 30,
      MINION_COOLDOWN: 8,
      MINION_MAX: 2,
      MINION_HEALTH: 50,
      MINION_DAMAGE: 15,
      MINION_DURATION: 10
    },
    SOUL: {
      DRAIN_DAMAGE: 8, // per second
      DRAIN_RANGE: 150,
      DRAIN_COST: 15, // per second
      BURST_DAMAGE: 35,
      BURST_RADIUS: 100,
      BURST_COST: 40,
      BURST_COOLDOWN: 10,
      KNOCKBACK: 200
    },
    EXPLOSION: {
      DAMAGE: 50,
      AOE_DAMAGE: 30,
      RADIUS: 120,
      COST: 25,
      COOLDOWN: 3,
      MINE_DAMAGE: 60,
      MINE_COST: 35,
      MINE_TRIGGER_RADIUS: 60,
      MINE_DURATION: 20,
      MINE_MAX: 3
    }
  },

  MORALITY: {
    MONSTER_KILL_POINTS: 1,
    MONSTER_SPARE_POINTS: 2,
    BOSS_KILL_POINTS: 5,
    BOSS_SPARE_POINTS: 10,
    BOSS_JOIN_POINTS: 5,
    NPC_HELP_POINTS: 8,
    NPC_KILL_POINTS: 10,

    // Ending thresholds
    EVIL_THRESHOLD: 80,
    GOOD_THRESHOLD: 60,
    MIN_NPC_KILLS_FOR_EVIL: 2
  },

  Z_INDEX: {
    BACKGROUND: 0,
    PLATFORMS: 10,
    POWERUPS: 20,
    PROJECTILES: 30,
    ENEMIES: 40,
    PLAYER: 50,
    EFFECTS: 60,
    HUD: 100,
    UI: 200
  }
};

// Key mappings
export const KEYS = {
  LEFT: ['ArrowLeft', 'a', 'A'],
  RIGHT: ['ArrowRight', 'd', 'D'],
  JUMP: ['ArrowUp', 'w', 'W', ' '],
  PRIMARY_ATTACK: ['x', 'X'],
  SECONDARY_ATTACK: ['z', 'Z'],
  ATTACK_NECRO: ['q', 'Q'],  // Legacy necromancy key
  SUMMON: ['e', 'E'],
  SOUL_DRAIN: ['r', 'R'],
  SOUL_BURST: ['f', 'F'],
  EXPLOSION: ['t', 'T'],
  INTERACT: ['i', 'I'],
  SPARE: ['x', 'X'],  // Spare enemy key (same as primary attack)
  PAUSE: ['Escape', 'p', 'P']
};

// Game states
export const GAME_STATES = {
  MENU: 'menu',
  PLAYING: 'playing',
  PAUSED: 'paused',
  LEVEL_TRANSITION: 'levelTransition',
  DIALOGUE: 'dialogue',
  GAME_OVER: 'gameOver',
  ENDING: 'ending'
};

// Entity types
export const ENTITY_TYPES = {
  PLAYER: 'player',
  ENEMY: 'enemy',
  BOSS: 'boss',
  NPC: 'npc',
  PLATFORM: 'platform',
  PROJECTILE: 'projectile',
  POWERUP: 'powerup',
  HAZARD: 'hazard',
  GOLD: 'gold'
};

// Ending types
export const ENDINGS = {
  UNDEAD_KING: 'UNDEAD_KING',
  UNLIKELY_HERO: 'UNLIKELY_HERO',
  GRAVE_ROT: 'GRAVE_ROT'
};
