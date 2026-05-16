import { Vector2 } from '../utils/Vector2.js';
import { Rectangle } from '../utils/Rectangle.js';

/**
 * Base class for all game entities
 */
export class Entity {
  constructor(x, y, width, height, type) {
    this.position = new Vector2(x, y);
    this.velocity = new Vector2(0, 0);
    this.size = { width, height };
    this.type = type;
    this.active = true;
    this.domElement = null;

    // Physics flags
    this.hasGravity = false;
    this.hasCollision = true;
    this.isGrounded = false;

    // Visual
    this.facingRight = true;
    this.visible = true;

    // Animation
    this.animationState = 'idle';
  }

  /**
   * Update entity logic (override in subclasses)
   */
  update(deltaTime, game) {
    // Override in subclasses
  }

  /**
   * Called when this entity collides with another
   */
  onCollision(other, game) {
    // Override in subclasses
  }

  /**
   * Get bounding box for collision detection
   */
  getBounds() {
    return new Rectangle(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }

  /**
   * Update bounding box (for collision detection)
   * Also provides shorthand x, y, width, height properties
   */
  updateBounds() {
    this.x = this.position.x;
    this.y = this.position.y;
    this.width = this.size.width;
    this.height = this.size.height;
  }

  /**
   * Destroy this entity
   */
  destroy() {
    this.active = false;
    if (this.domElement && this.domElement.parentNode) {
      this.domElement.remove();
    }
  }

  /**
   * Check if entity is off-screen or out of bounds
   */
  isOffScreen(worldWidth, worldHeight) {
    return (
      this.position.x + this.size.width < 0 ||
      this.position.x > worldWidth ||
      this.position.y > worldHeight
    );
  }

  /**
   * Get center position
   */
  getCenter() {
    return new Vector2(
      this.position.x + this.size.width / 2,
      this.position.y + this.size.height / 2
    );
  }

  /**
   * Set animation state
   */
  setAnimation(state) {
    if (this.animationState !== state) {
      this.animationState = state;
      if (this.domElement) {
        // Update DOM classes
        this.domElement.className = this.getEntityClasses();
      }
    }
  }

  /**
   * Get CSS classes for this entity
   */
  getEntityClasses() {
    const classes = ['entity', this.type];

    if (this.animationState) {
      classes.push(this.animationState);
    }

    if (!this.facingRight) {
      classes.push('flipped');
    }

    return classes.join(' ');
  }
}
