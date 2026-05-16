import { GAME_CONFIG } from '../utils/Constants.js';

/**
 * Improved Physics System with guaranteed grounding
 */
export class ImprovedPhysicsSystem {
  constructor() {
    this.gravity = GAME_CONFIG.PHYSICS.GRAVITY;
    this.terminalVelocity = GAME_CONFIG.PHYSICS.TERMINAL_VELOCITY;
    this.friction = GAME_CONFIG.PHYSICS.FRICTION;
    this.airResistance = GAME_CONFIG.PHYSICS.AIR_RESISTANCE;
  }

  /**
   * Update entity physics
   */
  update(entity, deltaTime) {
    if (!entity.hasGravity) return;

    // CRITICAL: If grounded, lock vertical position
    if (entity.isGrounded) {
      // Completely prevent vertical movement when grounded
      entity.velocity.y = 0;

      // Apply friction (not for player/enemies - they control their own movement)
      if (entity.type !== 'player' && entity.type !== 'enemy') {
        entity.velocity.x *= this.friction;
      }
    } else {
      // In air - apply gravity
      entity.velocity.y += this.gravity * deltaTime;

      // Cap at terminal velocity
      if (entity.velocity.y > this.terminalVelocity) {
        entity.velocity.y = this.terminalVelocity;
      }

      // Air resistance for non-player/enemy entities
      if (entity.type !== 'player' && entity.type !== 'enemy') {
        entity.velocity.x *= this.airResistance;
      }
    }

    // Update position based on velocity
    entity.position.x += entity.velocity.x * deltaTime;

    // Only update Y position if not grounded or if velocity is negative (jumping)
    if (!entity.isGrounded || entity.velocity.y < 0) {
      entity.position.y += entity.velocity.y * deltaTime;
    }

    // Update bounds CRITICAL - must happen after position changes
    entity.updateBounds();
  }

  /**
   * Update all entities with physics
   */
  updateAll(entities, deltaTime) {
    for (const entity of entities) {
      if (entity.active && entity.hasGravity) {
        this.update(entity, deltaTime);
      }
    }
  }
}
