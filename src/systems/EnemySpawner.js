import { Goblin } from '../entities/enemies/Goblin.js';
import { ZombieSlime } from '../entities/enemies/ZombieSlime.js';

/**
 * Enemy spawning system - spawns enemies over time
 */
export class EnemySpawner {
  constructor(game) {
    this.game = game;
    this.spawnTimer = 0;
    this.spawnInterval = 90; // 90 seconds = 1.5 minutes average
    this.maxEnemies = 15; // Maximum enemies on screen at once
    this.enabled = false;

    // Spawn positions across the map
    this.spawnLocations = [
      { x: 1100, y: 518, patrolLeft: 1050, patrolRight: 1200 },
      { x: 1400, y: 518, patrolLeft: 1350, patrolRight: 1550 },
      { x: 1650, y: 518, patrolLeft: 1600, patrolRight: 1800 },
      { x: 2000, y: 518, patrolLeft: 1950, patrolRight: 2150 },
      { x: 2500, y: 518, patrolLeft: 2450, patrolRight: 2650 },
      { x: 2850, y: 518, patrolLeft: 2800, patrolRight: 3000 },
      { x: 3250, y: 518, patrolLeft: 3200, patrolRight: 3400 },
      { x: 3600, y: 518, patrolLeft: 3550, patrolRight: 3750 },
    ];
  }

  enable() {
    this.enabled = true;
    console.log('👾 Enemy spawner enabled');
  }

  disable() {
    this.enabled = false;
  }

  update(deltaTime) {
    if (!this.enabled) return;

    // Count active enemies
    const activeEnemies = this.game.entities.filter(e =>
      e.type === 'enemy' && e.active
    ).length;

    // Don't spawn if at max capacity
    if (activeEnemies >= this.maxEnemies) {
      return;
    }

    // Update spawn timer
    this.spawnTimer += deltaTime;

    // Spawn enemies when timer reaches interval
    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnWave();
      this.spawnTimer = 0;
      // Randomize next spawn: 60-120 seconds (1-2 minutes)
      this.spawnInterval = 60 + Math.random() * 60;
    }
  }

  spawnWave() {
    const enemyCount = Math.min(3, this.maxEnemies - this.getCurrentEnemyCount());

    if (enemyCount <= 0) return;

    console.log(`👾 Spawning ${enemyCount} enemies...`);

    for (let i = 0; i < enemyCount; i++) {
      this.spawnEnemy();
    }
  }

  spawnEnemy() {
    // Pick random spawn location
    const location = this.spawnLocations[Math.floor(Math.random() * this.spawnLocations.length)];

    // 50% chance for Goblin or ZombieSlime
    const enemy = Math.random() < 0.5
      ? new Goblin(location.x, location.y, location.patrolLeft, location.patrolRight)
      : new ZombieSlime(location.x, location.y + 8, location.patrolLeft, location.patrolRight);

    // Add to game
    this.game.addEntity(enemy);
  }

  getCurrentEnemyCount() {
    return this.game.entities.filter(e => e.type === 'enemy' && e.active).length;
  }

  reset() {
    this.spawnTimer = 0;
    this.spawnInterval = 90;
  }
}
