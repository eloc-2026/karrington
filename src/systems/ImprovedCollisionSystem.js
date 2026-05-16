/**
 * Improved Collision System with guaranteed grounding detection
 */
export class ImprovedCollisionSystem {
  constructor() {
    this.platforms = [];
  }

  setPlatforms(platforms) {
    this.platforms = platforms;
  }

  /**
   * Check AABB collision between two entities
   */
  checkCollision(entity1, entity2) {
    const bounds1 = entity1.getBounds();
    const bounds2 = entity2.getBounds();
    return bounds1.intersects(bounds2);
  }

  /**
   * Resolve collision between entity and platform
   */
  resolvePlatformCollision(entity, platform) {
    const entityBounds = entity.getBounds();
    const platformBounds = platform.getBounds();

    // MULTI-LEVEL DETECTION: Check both overlap AND proximity
    const hasOverlap = entityBounds.intersects(platformBounds);

    // Proximity check: Within 2 pixels of platform surface for precise grounding
    const PROXIMITY_THRESHOLD = 2;
    const entityBottom = entityBounds.bottom;
    const platformTop = platformBounds.top;
    const verticalDistance = entityBottom - platformTop;

    // Near platform: Entity is above and very close to platform top
    const isNearPlatform = verticalDistance >= -0.5 && verticalDistance <= PROXIMITY_THRESHOLD &&
                           entityBounds.left < platformBounds.right &&
                           entityBounds.right > platformBounds.left;

    // No collision if neither overlapping nor near
    if (!hasOverlap && !isNearPlatform) {
      return false;
    }

    // Get overlap amounts
    const overlap = entityBounds.getOverlap(platformBounds);

    // Determine collision type
    const isVerticalCollision = overlap.y < overlap.x || isNearPlatform;

    if (!isVerticalCollision) {
      // HORIZONTAL collision (hitting sides)
      if (entity.position.x < platform.position.x) {
        entity.position.x = platform.position.x - entity.size.width;
      } else {
        entity.position.x = platform.position.x + platform.size.width;
      }
      if (entity.velocity) entity.velocity.x = 0;

    } else {
      // VERTICAL collision
      if (entity.velocity.y >= -10) {  // Allow small negative values for grounding tolerance
        // Falling or stationary - LAND ON TOP
        const targetY = platform.position.y - entity.size.height;
        entity.position.y = targetY;
        entity.velocity.y = 0;
        entity.isGrounded = true;
      } else if (hasOverlap && entity.velocity.y < -10) {
        // Moving upward fast and overlapping - HIT CEILING
        entity.position.y = platform.position.y + platform.size.height;
        entity.velocity.y = 0;
      }
    }

    // Update bounds after position correction
    entity.updateBounds();
    return true;
  }

  /**
   * Main collision update - GUARANTEED grounding
   */
  update(entities, platforms) {
    // STEP 1: Reset ALL grounded states
    for (const entity of entities) {
      if (entity.hasGravity) {
        entity.isGrounded = false;
      }
    }

    // STEP 2: Check all entity-platform collisions
    for (const entity of entities) {
      if (!entity.active || !entity.hasCollision) continue;

      for (const platform of platforms) {
        if (!platform.active) continue;
        this.resolvePlatformCollision(entity, platform);
      }
    }

    // STEP 3: SAFETY NET - Direct distance check (guaranteed grounding)
    for (const entity of entities) {
      if (!entity.hasGravity || !entity.active || entity.isGrounded) continue;

      for (const platform of platforms) {
        if (!platform.active) continue;

        const entityBottom = entity.position.y + entity.size.height;
        const platformTop = platform.position.y;
        const platformLeft = platform.position.x;
        const platformRight = platform.position.x + platform.size.width;
        const entityLeft = entity.position.x;
        const entityRight = entity.position.x + entity.size.width;

        // Check if entity is DIRECTLY ABOVE platform (within 3px for precision)
        const verticalDistance = entityBottom - platformTop;
        const isAbovePlatform = verticalDistance >= -0.5 && verticalDistance <= 3;
        const isHorizontallyAligned = entityRight > platformLeft && entityLeft < platformRight;

        if (isAbovePlatform && isHorizontallyAligned && entity.velocity.y >= -10) {
          // FORCE GROUNDING - snap to exact platform position
          const targetY = platformTop - entity.size.height;
          entity.position.y = targetY;
          entity.velocity.y = 0;
          entity.isGrounded = true;
          entity.updateBounds();
          break;
        }
      }
    }
  }
}
