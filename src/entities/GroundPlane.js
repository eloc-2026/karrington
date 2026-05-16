import { Entity } from './Entity.js';
import { ENTITY_TYPES } from '../utils/Constants.js';

/**
 * Ground plane - safety net at the bottom of the world
 * Prevents entities from falling infinitely
 */
export class GroundPlane extends Entity {
  constructor(y = 600, width = 10000) {
    // Create a very wide, thin platform at the bottom
    super(0, y, width, 50, ENTITY_TYPES.PLATFORM);

    this.hasGravity = false;
    this.hasCollision = true;
    this.isGroundPlane = true; // Mark as special ground

    console.log(`✅ Ground plane created at Y=${y}, width=${width}`);
  }

  update(deltaTime, game) {
    // Ground plane is static, no update needed
  }

  getEntityClasses() {
    return 'entity platform ground-plane';
  }
}
