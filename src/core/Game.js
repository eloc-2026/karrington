import { GameLoop } from './GameLoop.js';
import { InputManager } from './InputManager.js';
import { StateManager } from './StateManager.js';
import { ThreeJSRenderer } from '../systems/ThreeJSRenderer.js';
import { ImprovedPhysicsSystem } from '../systems/ImprovedPhysicsSystem.js';
import { ImprovedCollisionSystem } from '../systems/ImprovedCollisionSystem.js';
import { EmergencyGroundFix } from '../systems/EmergencyGroundFix.js';
import { CombatSystem } from '../systems/CombatSystem.js';
import { SaveSystem } from '../systems/SaveSystem.js';
import { AudioSystem } from '../systems/AudioSystem.js';
import { HUD } from '../ui/HUD.js';
import { MenuSystem } from '../ui/MenuSystem.js';
import { DialogueSystem } from '../ui/DialogueSystem.js';
import { NamingScreen } from '../ui/NamingScreen.js';
import { IntroSequence } from '../ui/IntroSequence.js';
import { ClassSelection } from '../ui/ClassSelection.js';
import { CreatorNameScreen } from '../ui/CreatorNameScreen.js';
import { QuestSystem } from '../systems/QuestSystem.js';
import { EnemySpawner } from '../systems/EnemySpawner.js';
import { PlayerClass } from '../entities/PlayerClasses.js';
import { Level1 } from '../levels/Level1.js';
import { GAME_STATES, GAME_CONFIG, KEYS, ENTITY_TYPES } from '../utils/Constants.js';

/**
 * Main game controller - orchestrates all systems
 */
export class Game {
  constructor(containerElement) {
    this.container = containerElement;

    // Core systems
    this.stateManager = new StateManager();
    this.inputManager = new InputManager();
    this.renderSystem = new ThreeJSRenderer(containerElement);
    this.gameLoop = new GameLoop(
      (dt) => this.update(dt),
      (dt) => this.render(dt)
    );

    // Game systems
    this.physicsSystem = new ImprovedPhysicsSystem();
    this.collisionSystem = new ImprovedCollisionSystem();
    this.combatSystem = new CombatSystem();
    this.saveSystem = new SaveSystem(this);
    this.audioSystem = new AudioSystem();
    this.enemySpawner = new EnemySpawner(this);
    this.moralityTracker = null;

    // UI
    this.hud = new HUD();
    // Environment disabled - using 3D scene environment instead
    // this.environment = new Environment(containerElement);
    this.menuSystem = new MenuSystem(this);
    this.dialogueSystem = new DialogueSystem(this);
    this.questSystem = new QuestSystem(this);

    // Settings
    this.settings = this.loadSettings();

    // Entities
    this.entities = [];
    this.player = null;

    // Level info
    this.currentLevelData = null;
    this.levelWidth = GAME_CONFIG.VIEWPORT_WIDTH;
    this.levelHeight = GAME_CONFIG.VIEWPORT_HEIGHT;
  }

  /**
   * Initialize and start the game
   */
  init() {
    console.log('🎮 Game initializing in 3D mode...');

    // Initialize HUD
    this.hud.init(this.container);

    // Initialize dialogue system
    this.dialogueSystem.init(this.container);

    // Initialize audio
    this.audioSystem.init();

    // Show title screen
    this.menuSystem.init(this.container);

    console.log('✅ Game initialized in 3D - showing title screen');
  }

  /**
   * Start a new game
   */
  startNewGame() {
    console.log('🎮 Game.startNewGame() called');

    // Clear old save
    this.saveSystem.deleteSave();

    // Reset game state
    this.stateManager.reset();

    // Create black screen immediately
    const blackScreen = document.createElement('div');
    blackScreen.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: #000;
      z-index: 10000;
    `;
    document.body.appendChild(blackScreen);
    console.log('🎮 Black screen created, waiting 6 seconds...');

    // Play intro music
    if (this.audioSystem) {
      this.audioSystem.playMusic('intro');
    }

    // Wait 6 seconds, then show intro sequence
    setTimeout(() => {
      blackScreen.remove();
      console.log('🎮 6 seconds passed, showing IntroSequence...');
      // Show intro sequence first
      IntroSequence.show(this, () => {
        console.log('🎮 IntroSequence completed, showing ClassSelection...');
      // After intro, show class selection
      ClassSelection.show(this, (className) => {
        // Store selected class
        this.selectedClass = new PlayerClass(className);

        // Show naming screen for vessel
        NamingScreen.show(this, (vesselName) => {
          // Store vessel name temporarily
          this.selectedVesselName = vesselName;

          // Show creator name screen
          CreatorNameScreen.show(vesselName, (creatorName) => {
            // Now start the actual game
            this.initializeGame(vesselName, creatorName);
          });
        });
      });
    });
    }, 6000); // 6 second delay
  }

  /**
   * Initialize game after character creation
   */
  initializeGame(vesselName, creatorName) {
    console.log('🎮 Initializing game with class:', this.selectedClass.className);

    // Store names for when player is created
    this.vesselName = vesselName;
    this.creatorName = creatorName;

    // Load the first level with selected class (async)
    this.loadLevelWithClass(new Level1(), this.selectedClass, () => {
      // This callback runs after player is created
      console.log('✅ New game started -', vesselName, 'created by', creatorName);
    });
  }

  /**
   * Load saved game
   */
  loadGame() {
    console.log('💾 Loading game...');

    const saveData = this.saveSystem.load();
    if (!saveData) {
      console.log('No save found, starting new game');
      this.startNewGame();
      return;
    }

    // Load level
    this.loadLevel(new Level1());

    // Apply save data
    this.saveSystem.applySave(saveData);

    // Start playing
    this.stateManager.setState(GAME_STATES.PLAYING);
    this.gameLoop.start();

    // Start auto-save
    this.saveSystem.init();

    // Play level music
    this.audioSystem.playLevelMusic(this.stateManager.currentLevel);

    console.log('✅ Game loaded from save!');
  }

  /**
   * Respawn player after death
   */
  respawnPlayer() {
    if (!this.player) return;

    console.log('♻ Respawning player...');

    // Reset player health
    this.player.health = this.player.maxHealth;
    this.player.mana = this.player.maxMana;

    // Reset position (on ground with 1px overlap for collision detection)
    this.player.position.x = 100;
    this.player.position.y = 503;
    this.player.velocity.x = 0;
    this.player.velocity.y = 0;
    this.player.isGrounded = true;
    this.player.updateBounds();

    // Run collision detection to ensure proper grounded state
    const platforms = this.entities.filter(e =>
      (e.type === 'platform' || e.type === ENTITY_TYPES.PLATFORM) && e.active
    );
    this.collisionSystem.update(this.entities, platforms);

    // Resume game
    this.stateManager.setState(GAME_STATES.PLAYING);
    this.gameLoop.start();
  }

  /**
   * Load settings from localStorage
   */
  loadSettings() {
    const settingsStr = localStorage.getItem('skeleton_settings');
    if (settingsStr) {
      return JSON.parse(settingsStr);
    }

    // Default settings
    return {
      musicVolume: 70,
      sfxVolume: 80,
      difficulty: 'normal',
      showFPS: true
    };
  }

  /**
   * Load a level
   */
  loadLevel(level) {
    console.log('🎮 Loading level...');

    // Clear existing entities
    this.entities = [];
    this.renderSystem.clear();

    // Load level data
    const levelData = level.load();
    this.currentLevelData = levelData;
    this.levelWidth = levelData.width;
    this.levelHeight = levelData.height;

    console.log('📊 Level data:', {
      width: levelData.width,
      height: levelData.height,
      platforms: levelData.platforms.length,
      enemies: levelData.enemies.length
    });

    // Set player
    this.player = levelData.player;
    console.log('👤 Player created at:', this.player.position);
    this.addEntity(this.player);

    // Add platforms
    console.log('🧱 Adding platforms...');
    for (const platform of levelData.platforms) {
      this.addEntity(platform);
    }

    // Add enemies
    console.log('👾 Adding enemies...');
    for (const enemy of levelData.enemies) {
      console.log('  - Enemy at:', enemy.position);
      this.addEntity(enemy);
    }

    // Add NPCs
    if (levelData.npcs && levelData.npcs.length > 0) {
      console.log('👥 Adding NPCs...');
      for (const npc of levelData.npcs) {
        console.log('  - NPC:', npc.name);
        this.addEntity(npc);
      }
    }

    // Register platforms with collision system
    this.collisionSystem.setPlatforms(levelData.platforms);

    // CRITICAL: Run collision detection immediately to set initial grounded state
    const platforms = this.entities.filter(e =>
      (e.type === 'platform' || e.type === ENTITY_TYPES.PLATFORM) && e.active
    );

    console.log(`🔧 INITIAL COLLISION CHECK`);
    console.log(`  Total entities: ${this.entities.length}`);
    console.log(`  Platforms found: ${platforms.length}`);
    console.log(`  Player position BEFORE collision: (${Math.round(this.player.position.x)}, ${Math.round(this.player.position.y)})`);
    console.log(`  Player grounded BEFORE: ${this.player.isGrounded}`);

    this.collisionSystem.update(this.entities, platforms);

    console.log(`  Player position AFTER collision: (${Math.round(this.player.position.x)}, ${Math.round(this.player.position.y)})`);
    console.log(`  Player grounded AFTER: ${this.player.isGrounded}`);
    console.log(`✅ Level loaded: ${this.entities.length} total entities`);
  }

  /**
   * Load a level with a specific player class
   */
  loadLevelWithClass(level, playerClass, onComplete) {
    console.log('🎮 Loading level with class:', playerClass.className);

    // Clear existing entities
    this.entities = [];
    this.renderSystem.clear();

    // Load level data
    const levelData = level.load();
    this.currentLevelData = levelData;
    this.levelWidth = levelData.width;
    this.levelHeight = levelData.height;

    // Create player with selected class (replace level's default player)
    import('../entities/Player.js').then(({ Player }) => {
      this.player = new Player(100, 503, playerClass);
      this.player.playerClass = playerClass;

      // Set player names
      if (this.vesselName) {
        this.player.name = this.vesselName;
      }
      if (this.creatorName) {
        this.player.creatorName = this.creatorName;
      }

      // Update renderer with class-specific model
      this.renderSystem.setPlayerClass(playerClass.getModelType());

      this.addEntity(this.player);

      // Add platforms
      for (const platform of levelData.platforms) {
        this.addEntity(platform);
      }

      // Add enemies
      for (const enemy of levelData.enemies) {
        this.addEntity(enemy);
      }

      // Add NPCs
      if (levelData.npcs && levelData.npcs.length > 0) {
        for (const npc of levelData.npcs) {
          this.addEntity(npc);
        }
      }

      // Register platforms with collision system
      this.collisionSystem.setPlatforms(levelData.platforms);

      // Run collision detection to set initial grounded state
      const platforms = this.entities.filter(e =>
        (e.type === 'platform' || e.type === ENTITY_TYPES.PLATFORM) && e.active
      );
      this.collisionSystem.update(this.entities, platforms);

      console.log(`✅ Level loaded with ${playerClass.className} class`);

      // Start playing
      this.stateManager.setState(GAME_STATES.PLAYING);

      // Start game loop
      this.gameLoop.start();

      // Start auto-save
      this.saveSystem.init();

      // Enable enemy spawner
      this.enemySpawner.enable();

      // Play level music
      this.audioSystem.playLevelMusic(1);

      // Call completion callback
      if (onComplete) {
        onComplete();
      }
    });
  }

  /**
   * Main update loop
   */
  update(deltaTime) {
    // Handle game state FIRST (while keys are still available)
    if (this.stateManager.isPlaying() && !this.dialogueSystem.isActive) {
      this.updateGameplay(deltaTime);

      // Check for NPC interaction
      this.checkNPCInteraction();
    } else if (this.stateManager.isMenu()) {
      this.updateMenu();
    } else if (this.stateManager.isPaused()) {
      this.updatePaused();
    }

    // Clear input state AFTER everything has processed
    this.inputManager.update();
  }

  /**
   * Check for NPC interaction
   */
  checkNPCInteraction() {
    if (this.inputManager.wasKeyPressed(KEYS.INTERACT)) {
      // Find nearby NPCs
      for (const entity of this.entities) {
        if (entity.type === ENTITY_TYPES.NPC && entity.canInteract) {
          const distance = Math.abs(entity.position.x - this.player.position.x);

          if (distance < entity.interactRange) {
            entity.interact(this);
            break; // Only interact with one NPC at a time
          }
        }
      }
    }
  }

  /**
   * Called when player dies
   */
  onPlayerDeath() {
    console.log('💀 Game Over');

    // Stop game loop
    this.gameLoop.stop();

    // Stop auto-save
    this.saveSystem.stopAutoSave();

    // Play death sound
    this.audioSystem.playSFX('death');

    // Show game over menu
    this.menuSystem.showGameOver();
  }

  /**
   * Debug info
   */
  getDebugInfo() {
    return {
      entities: this.entities.length,
      player: this.player ? {
        pos: `${Math.round(this.player.position.x)},${Math.round(this.player.position.y)}`,
        vel: `${Math.round(this.player.velocity.x)},${Math.round(this.player.velocity.y)}`,
        grounded: this.player.isGrounded,
        health: `${Math.round(this.player.health)}/${this.player.maxHealth}`
      } : null,
      gameState: this.stateManager.state
    };
  }

  /**
   * Update gameplay logic
   */
  updateGameplay(deltaTime) {
    // 1. Update all entities (handles input, AI, etc.)
    for (const entity of this.entities) {
      if (entity.active) {
        entity.update(deltaTime, this);
      }
    }

    // 2. Apply physics to all entities with gravity
    if (this.physicsSystem) {
      for (const entity of this.entities) {
        if (entity.hasGravity && entity.active) {
          this.physicsSystem.update(entity, deltaTime);
        }
      }
    }

    // 3. Check and resolve collisions
    if (this.collisionSystem) {
      // Get all active platforms
      const platforms = this.entities.filter(e =>
        (e.type === 'platform' || e.type === ENTITY_TYPES.PLATFORM) && e.active
      );

      // Update collision system for all entities
      this.collisionSystem.update(this.entities, platforms);

      // EMERGENCY FIX - Force entities onto platforms
      EmergencyGroundFix.apply(this.entities, platforms);

      // SAFETY NET - Prevent falling out of world
      EmergencyGroundFix.enforceMinimumY(this.entities, 700);
    }

    // 4. Update combat system
    if (this.combatSystem) {
      this.combatSystem.update(this);
    }

    // 5. Update enemy spawner
    if (this.enemySpawner) {
      this.enemySpawner.update(deltaTime);
    }

    // 6. Remove inactive entities
    this.entities = this.entities.filter(e => e.active);

    // 7. Update power-ups
    this.stateManager.updatePowerUps(deltaTime);
  }

  /**
   * Update menu state
   */
  updateMenu() {
    // Menu logic (will implement with UI)
  }

  /**
   * Update paused state
   */
  updatePaused() {
    if (this.inputManager.wasPausePressed()) {
      this.resume();
    }
  }

  /**
   * Render all game elements
   */
  render(deltaTime = 0) {
    if (this.stateManager.isPlaying()) {
      // Render entities
      this.renderSystem.renderEntities(this.entities);

      // Update camera to follow player
      if (this.player) {
        this.renderSystem.updateCamera(
          this.player,
          this.levelWidth,
          this.levelHeight
        );
      }

      // Render the 3D scene
      this.renderSystem.render(deltaTime);

      // Update HUD
      if (this.player) {
        this.hud.update(this.player);
      }
    }
  }

  /**
   * Add an entity to the game
   */
  addEntity(entity) {
    this.entities.push(entity);
    this.renderSystem.createEntity(entity);
  }

  /**
   * Remove an entity from the game
   */
  removeEntity(entity) {
    entity.destroy();
  }

  /**
   * Start the game
   */
  start() {
    this.stateManager.setState(GAME_STATES.PLAYING);
    this.gameLoop.start();
  }

  /**
   * Pause the game
   */
  pause() {
    this.stateManager.setState(GAME_STATES.PAUSED);
    this.gameLoop.pause();
  }

  /**
   * Resume from pause
   */
  resume() {
    this.stateManager.setState(GAME_STATES.PLAYING);
    this.gameLoop.resume();
  }

  /**
   * Stop the game
   */
  stop() {
    this.gameLoop.stop();
  }

  /**
   * Clean up resources
   */
  destroy() {
    this.gameLoop.stop();
    this.inputManager.destroy();
    this.renderSystem.clear();
    this.entities = [];
  }
}
