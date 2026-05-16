import { Player } from '../entities/Player.js';
import { Platform } from '../entities/Platform.js';
import { GroundPlane } from '../entities/GroundPlane.js';
import { ZombieSlime } from '../entities/enemies/ZombieSlime.js';
import { Goblin } from '../entities/enemies/Goblin.js';

/**
 * Level 1: The Crypt Awakening - EXPANDED
 */
export class Level1 {
  load() {
    // Player spawns on the ground with slight overlap for collision detection
    // Ground at y=550, player height=48, spawn at y=503 (overlaps 1px with platform)
    const player = new Player(100, 503);

    const platforms = [
      // === SAFETY GROUND PLANE (catches falling entities) ===
      new GroundPlane(650, 10000),        // Safety net at the very bottom

      // === GROUND FLOOR - Continuous (no holes!) ===
      new Platform(0, 550, 4000, 50),     // Full continuous ground floor

      // === SECTION 1: Starting Area (0-800) ===
      new Platform(300, 450, 180, 20),    // First jump platform
      new Platform(200, 350, 150, 20),    // Higher left platform
      new Platform(500, 380, 160, 20),    // Mid platform
      new Platform(400, 250, 140, 20),    // Upper platform

      // === SECTION 2: Mid area (800-1600) ===
      new Platform(800, 480, 200, 20),    // Step up
      new Platform(1050, 420, 180, 20),   // Higher step
      new Platform(1280, 360, 160, 20),   // Even higher
      new Platform(900, 300, 150, 20),    // Upper left
      new Platform(1150, 240, 180, 20),   // Upper right
      new Platform(1400, 180, 140, 20),   // Very high platform

      // === SECTION 3: Cave system (1600-2400) ===
      new Platform(1600, 470, 220, 20),   // Cave entrance
      new Platform(1850, 400, 200, 20),   // Cave platform 1
      new Platform(2100, 350, 180, 20),   // Cave platform 2
      new Platform(2000, 250, 160, 20),   // Upper cave
      new Platform(2300, 200, 200, 20),   // Highest cave platform
      new Platform(2250, 450, 150, 20),   // Mid cave

      // === SECTION 4: Ruins (2400-3200) ===
      new Platform(2500, 490, 170, 20),   // Ruin step 1
      new Platform(2700, 430, 160, 20),   // Ruin step 2
      new Platform(2550, 360, 140, 20),   // Ruin left platform
      new Platform(2850, 360, 180, 20),   // Ruin right platform
      new Platform(2700, 270, 200, 20),   // High ruin platform
      new Platform(3000, 200, 150, 20),   // Tower platform
      new Platform(2900, 150, 120, 20),   // Very high tower

      // === SECTION 5: Final stretch (3200-4000) ===
      new Platform(3200, 480, 190, 20),   // Final area start
      new Platform(3420, 410, 170, 20),   // Rising platforms
      new Platform(3300, 330, 160, 20),   // Jump platforms
      new Platform(3550, 250, 180, 20),   // Upper area
      new Platform(3750, 380, 200, 20),   // Before exit
      new Platform(3400, 180, 140, 20),   // Secret high platform

      // === Walls to prevent falling off ===
      new Platform(-20, 0, 20, 600),      // Left boundary
      new Platform(4000, 0, 20, 600)      // Right boundary
    ];

    // Start with only 3 enemies - more will spawn over time
    const enemies = [
      new Goblin(800, 518, 750, 950),      // First goblin
      new ZombieSlime(900, 526, 850, 1050), // First slime
      new Goblin(1000, 518, 950, 1150),    // Second goblin
    ];

    return {
      name: 'The Crypt Awakening',
      width: 4000,   // Expanded from 1200px!
      height: 600,
      player,
      platforms,
      enemies,
      npcs: [],
      powerups: []
    };
  }
}
