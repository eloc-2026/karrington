import { Entity } from './Entity.js';
import { ENTITY_TYPES } from '../utils/Constants.js';

/**
 * Static platform entity
 */
export class Platform extends Entity {
  constructor(x, y, width, height) {
    super(x, y, width, height, ENTITY_TYPES.PLATFORM);

    this.hasGravity = false;
    this.hasCollision = true;

    // Debug: verify platform type
    if (this.type !== 'platform') {
      console.error('❌ PLATFORM TYPE MISMATCH!', this.type, 'expected: platform');
    }
  }

  update(deltaTime, game) {
    // Platforms are static, no update needed
  }

  getEntityClasses() {
    return 'entity platform';
  }
}
