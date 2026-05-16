import { Entity } from './Entity.js';
import { ENTITY_TYPES } from '../utils/Constants.js';

/**
 * Gold coin that drops from enemies
 */
export class GoldDrop extends Entity {
  constructor(x, y, amount) {
    super(x, y, 16, 16, ENTITY_TYPES.POWERUP);

    this.goldAmount = amount;
    this.hasGravity = true;
    this.hasCollision = true;

    // Slight upward velocity for bounce effect
    this.velocity.y = -200;
    this.velocity.x = (Math.random() - 0.5) * 100;

    // Lifetime
    this.lifetime = 10; // Disappears after 10 seconds
    this.age = 0;

    // Visual
    this.animationState = 'spinning';

    console.log(`💰 Gold drop created: ${amount} gold`);
  }

  update(deltaTime, game) {
    super.update(deltaTime, game);

    // Age timer
    this.age += deltaTime;
    if (this.age >= this.lifetime) {
      this.destroy();
      return;
    }

    // Check if player collects it
    if (game.player) {
      const bounds1 = this.getBounds();
      const bounds2 = game.player.getBounds();

      if (bounds1.intersects(bounds2)) {
        this.collect(game.player, game);
      }
    }
  }

  collect(player, game) {
    // Add gold to player
    if (!player.gold) player.gold = 0;
    player.gold += this.goldAmount;

    console.log(`💰 Collected ${this.goldAmount} gold! Total: ${player.gold}`);

    // Show text
    if (game.renderSystem) {
      game.renderSystem.createTextElement(
        `+${this.goldAmount} gold`,
        this.position.x,
        this.position.y - 20,
        'gold-text'
      );
    }

    // Play sound
    if (game.audioSystem) {
      game.audioSystem.playSFX('coin');
    }

    // Remove this gold drop
    this.destroy();
  }

  getEntityClasses() {
    return `entity powerup gold-drop ${this.animationState}`;
  }
}
