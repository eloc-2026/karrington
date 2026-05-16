# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Elemental Platformer - Skeleton's Quest** is a 2D platformer game built with vanilla JavaScript and Vite. The player controls a skeleton character with necromancy powers in a morality-driven adventure with multiple endings based on player choices (kill vs spare enemies).

## Development Commands

```bash
# Start development server (accessible on 0.0.0.0 for remote access)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

The game follows an ECS-inspired architecture with distinct systems and entities:

### Entry Points
- **index.html**: Main HTML shell with `#game-container` div
- **main.js**: Bootstrap file that creates and initializes the `Game` instance
- **style.css**: Global styling

### Core Systems (`src/core/`)
- **Game.js**: Main orchestrator that manages all systems, entities, and game state
- **GameLoop.js**: Handles update/render loop using requestAnimationFrame
- **InputManager.js**: Centralized keyboard input handling (see `KEYS` in Constants.js)
- **StateManager.js**: Manages game states (menu, playing, paused, dialogue, etc.) and power-up timers

### Systems (`src/systems/`)
- **RenderSystem.js**: DOM-based rendering and camera following
- **PhysicsSystem.js**: Handles gravity, velocity, and movement
- **CollisionSystem.js**: Collision detection and resolution
- **CombatSystem.js**: Combat mechanics, health, damage calculations
- **QuestSystem.js**: Quest tracking, objectives, and rewards
- **SaveSystem.js**: localStorage-based save/load functionality
- **AudioSystem.js**: Sound effects and music management
- **CutsceneSystem.js**: Story sequences and cinematics

### Entities (`src/entities/`)
- **Entity.js**: Base class for all game objects
- **Player.js**: Player character with controls and abilities
- **enemies/**: Goblin, ZombieSlime
- **npcs/**: NPC base class and Scavenger (6-armed trader)
- **GoldDrop.js**: Collectible gold from defeated enemies
- **Projectile.js**: Magic projectiles for combat
- **Platform.js**: Platform entities for level geometry

### Game Features
- **Powers (`src/powers/`)**: Currently implements NecromancyPower with magic attacks
- **Levels (`src/levels/`)**: Level1 (combat level with enemies) and VillageHub (safe zone with NPCs and shops)
- **UI (`src/ui/`)**: 
  - **MenuSystem.js**: Main menu and pause menu
  - **HUD.js**: Health, mana, gold display
  - **DialogueSystem.js**: NPC conversations
  - **NamingScreen.js**: Player name input at game start
  - **Environment.js**: Visual effects and atmosphere
- **Utils (`src/utils/`)**: 
  - **Constants.js**: All game configuration (GAME_CONFIG, KEYS, GAME_STATES, ENTITY_TYPES)
  - **Vector2.js**, **Rectangle.js**: Math utilities

### Key Gameplay Mechanics

**Controls** (defined in `Constants.js` KEYS object):
- Movement: A/← (left), D/→ (right), W/Space/↑ (jump)
- Combat: Z (magic attack), X (spare enemy)
- Interaction: I (interact with NPCs), E (summon)
- System: Esc/P (pause)

**Spare System**: Press X near weakened enemies to convert them to allies instead of killing them. Sparing heals the player and affects morality positively.

**Health Regeneration**: Player regenerates health after 5 seconds without taking damage.

**Gold Economy**: Enemies drop gold when defeated. Gold is used in the shop system for purchasing items and upgrades.

**Shop System**: The Scavenger NPC runs a shop offering health potions (20g), mana potions (15g), upgrades (Bone Charm 50g, Soul Gem 100g), and spells (Ancient Scroll 150g).

**Quest System**: NPCs offer quests with objectives (e.g., defeat X enemies, spare Y enemies) that reward gold and experience. Managed by QuestSystem.js.

**Trust System**: NPCs have trust levels (0-100) that improve based on player actions. Higher trust unlocks better dialogue, deals, and quest rewards. Levels: Hostile (0-20), Wary (20-40), Neutral (40-60), Friendly (60-80), Trusted (80-100).

**Save System**: Game progress is saved to localStorage, including player stats, morality, gold, quests, and NPC trust levels.

### Morality System
Player actions affect morality score:
- Killing monsters: +1 point
- Sparing vulnerable enemies: +2 points
- Helping NPCs: +8 points
- Killing NPCs: +10 points (evil)

Three endings based on final morality: UNDEAD_KING (evil ≥80), UNLIKELY_HERO (good ≥60), GRAVE_ROT (neutral)

### Build Configuration
- **Build tool**: Vite 6.x with ES modules (`"type": "module"` in package.json)
- **Server config**: `vite.config.js` configured with `host: '0.0.0.0'` and `allowedHosts: true` for remote development
