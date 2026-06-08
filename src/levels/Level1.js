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

      // === SECTION 1: Starting Combat Arena (0-800) ===
      // Mostly flat with gentle elevation
      new Platform(300, 490, 200, 20),    // Slight elevation step
      new Platform(600, 450, 180, 20),    // Small raised platform

      // === SECTION 2: Mid Combat Arena (800-1600) ===
      // Open area with minimal obstacles
      new Platform(900, 480, 220, 20),    // Gentle step
      new Platform(1200, 460, 200, 20),   // Slight variation
      new Platform(1450, 420, 180, 20),   // Mild elevation

      // === SECTION 3: Cave Combat Zone (1600-2400) ===
      // Flatter terrain for combat
      new Platform(1650, 490, 250, 20),   // Cave entrance platform
      new Platform(1950, 460, 200, 20),   // Cave mid platform
      new Platform(2200, 440, 220, 20),   // Cave far platform

      // === SECTION 4: Ruins Arena (2400-3200) ===
      // Open ruins with gentle terrain
      new Platform(2450, 480, 190, 20),   // Ruin entrance
      new Platform(2700, 450, 200, 20),   // Ruin mid
      new Platform(2950, 420, 180, 20),   // Ruin upper area
      new Platform(2600, 400, 160, 20),   // Small elevated platform

      // === SECTION 5: Final Combat Arena (3200-4000) ===
      // Wide open final stretch
      new Platform(3250, 470, 210, 20),   // Final area platform
      new Platform(3550, 450, 200, 20),   // Near exit platform
      new Platform(3350, 410, 170, 20),   // Optional elevated position

      // === Walls to prevent falling off ===
      new Platform(-20, 0, 20, 600),      // Left boundary
      new Platform(4000, 0, 20, 600)      // Right boundary
    ];

    // Start with 15 enemies spread across all sections
    const enemies = [
      // Section 1: Starting area (0-800)
      new Goblin(400, 518, 350, 550),           // Starting goblin
      new ZombieSlime(600, 526, 500, 700),      // Starting slime
      new Goblin(300, 458, 250, 500),           // On elevated platform

      // Section 2: Mid area (800-1600)
      new ZombieSlime(950, 526, 850, 1050),     // Ground slime
      new Goblin(1100, 448, 1000, 1250),        // Platform goblin
      new ZombieSlime(1300, 526, 1200, 1500),   // Ground slime
      new Goblin(1500, 388, 1400, 1600),        // Elevated goblin

      // Section 3: Cave area (1600-2400)
      new Goblin(1700, 458, 1600, 1850),        // Cave entrance
      new ZombieSlime(1950, 526, 1850, 2100),   // Cave ground
      new Goblin(2100, 428, 2000, 2250),        // Cave platform
      new ZombieSlime(2300, 408, 2150, 2400),   // Upper cave slime

      // Section 4: Ruins (2400-3200)
      new Goblin(2550, 448, 2450, 2700),        // Ruin entrance
      new ZombieSlime(2800, 418, 2650, 2950),   // Ruin platform

      // Section 5: Final area (3200-4000)
      new Goblin(3350, 438, 3250, 3550),        // Final area goblin
      new ZombieSlime(3600, 418, 3500, 3750),   // Near exit slime
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
