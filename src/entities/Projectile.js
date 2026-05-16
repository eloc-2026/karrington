import { Entity } from './Entity.js';
import { ENTITY_TYPES } from '../utils/Constants.js';

/**
 * Projectile entity - bones, magic blasts, etc.
 */
export class Projectile extends Entity {
  constructor(x, y, velocityX, velocityY, damage, owner, projectileType = 'bone') {
    super(x, y, 20, 8, ENTITY_TYPES.PROJECTILE);

    // Use the velocity Vector2 from Entity
    this.velocity.x = velocityX;
    this.velocity.y = velocityY;
    this.damage = damage;
    this.owner = owner; // Who shot this
    this.projectileType = projectileType;
    this.lifetime = 3.0; // seconds
    this.hasGravity = false;
    this.hasCollision = false;
    this.color = null; // Optional color override for class-specific projectiles

    // Initialize bounds
    this.updateBounds();
  }

  update(deltaTime, game) {
    super.update(deltaTime, game);

    // Move the projectile (PhysicsSystem won't do it since hasGravity = false)
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;

    // Update bounds for collision detection
    this.updateBounds();

    // Update lifetime
    this.lifetime -= deltaTime;
    if (this.lifetime <= 0) {
      this.destroy();
      return;
    }

    // Check if off-screen
    if (this.isOffScreen(game.levelWidth, game.levelHeight)) {
      this.destroy();
      return;
    }

    // Check collision with enemies
    if (this.owner === game.player) {
      this.checkEnemyCollisions(game);
    }
  }

  checkEnemyCollisions(game) {
    let enemyCount = 0;
    for (const entity of game.entities) {
      // Check if entity is an enemy (type can be just 'enemy' string)
      if (entity.type === 'enemy' && entity.active) {
        enemyCount++;

        // Friendly enemies shouldn't be hit
        if (entity.isFriendly) continue;

        // Use getBounds() for reliable collision detection
        const myBounds = this.getBounds();
        const enemyBounds = entity.getBounds();

        if (myBounds.intersects(enemyBounds)) {
          console.log('💥 PROJECTILE HIT DETECTED!', entity.constructor.name, 'at', entity.position.x, entity.position.y);
          this.onHit(entity, game);
          return;
        }
      }
    }

    // Debug: log if no enemies found
    if (enemyCount === 0 && Math.random() < 0.02) {
      console.log('⚠️ Projectile: No enemies found in game.entities (total entities:', game.entities.length, ')');
    }
  }

  isCollidingWith(entity) {
    const myBounds = this.getBounds();
    const otherBounds = entity.getBounds();
    return myBounds.intersects(otherBounds);
  }

  onHit(target, game) {
    // Deal damage
    if (target.takeDamage) {
      const damageDealt = target.takeDamage(this.damage, game);
      console.log(`💥 Projectile hit ${target.constructor.name} for ${this.damage} damage! Health now: ${target.health}/${target.maxHealth}`);

      // Show damage number
      if (game.renderSystem) {
        game.renderSystem.createTextElement(
          `-${this.damage}`,
          target.position.x + target.size.width / 2,
          target.position.y,
          'damage-number'
        );
      }

      // Apply life steal to player
      if (this.owner === game.player) {
        const lifeSteal = this.damage * 0.2;
        if (lifeSteal > 0 && game.player.heal) {
          game.player.heal(lifeSteal);
        }
      }
    } else {
      console.log(`⚠️ Target ${target.constructor.name} has no takeDamage method!`);
    }

    // Destroy projectile
    this.destroy();
  }

  getEntityClasses() {
    return `entity projectile ${this.projectileType}`;
  }
}
