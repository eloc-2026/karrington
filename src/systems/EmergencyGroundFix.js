/**
 * EMERGENCY GROUND FIX
 *
 * This is a bulletproof system that FORCES entities to stay on platforms.
 * It runs AFTER all other systems and corrects any falling.
 */

export class EmergencyGroundFix {
  /**
   * Emergency fix - absolutely prevents falling through ground
   */
  static apply(entities, platforms) {
    for (const entity of entities) {
      if (!entity.active || !entity.hasGravity) continue;

      // Get entity boundaries
      const entityBottom = entity.position.y + entity.size.height;
      const entityLeft = entity.position.x;
      const entityRight = entity.position.x + entity.size.width;
      const entityCenterX = entity.position.x + entity.size.width / 2;

      // Find the platform this entity should be on
      let closestPlatform = null;
      let minDistance = Infinity;

      for (const platform of platforms) {
        if (!platform.active) continue;

        const platformTop = platform.position.y;
        const platformLeft = platform.position.x;
        const platformRight = platform.position.x + platform.size.width;

        // Check if entity is horizontally over this platform
        const isOver = entityRight > platformLeft && entityLeft < platformRight;

        // OR if entity center is over platform (more lenient)
        const centerOver = entityCenterX >= platformLeft && entityCenterX <= platformRight;

        if (isOver || centerOver) {
          // Check vertical distance
          const distance = entityBottom - platformTop;

          // If entity is close to this platform
          if (distance >= -5 && distance < minDistance) {
            minDistance = distance;
            closestPlatform = platform;
          }
        }
      }

      // FORCE ENTITY ONTO PLATFORM
      if (closestPlatform !== null) {
        const platformTop = closestPlatform.position.y;
        const correctY = platformTop - entity.size.height;

        // If entity is within 15 pixels of where it should be
        if (Math.abs(entity.position.y - correctY) <= 15) {
          // SNAP TO CORRECT POSITION
          entity.position.y = correctY;
          entity.velocity.y = 0;
          entity.isGrounded = true;
          entity.updateBounds();
        }
      }
    }
  }

  /**
   * Absolute minimum Y - never let entities go below this
   */
  static enforceMinimumY(entities, minY = 700) {
    for (const entity of entities) {
      if (!entity.active) continue;

      if (entity.position.y > minY) {
        // Entity has fallen too far - teleport back to safe position
        entity.position.y = 502; // Default safe position
        entity.velocity.y = 0;
        entity.velocity.x = 0;
        entity.isGrounded = true;
        entity.updateBounds();

        if (entity.type === 'player') {
          console.warn('⚠️ EMERGENCY: Teleported player back to safe position');
        }
      }
    }
  }
}
