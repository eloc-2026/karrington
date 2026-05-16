/**
 * Rectangle class for bounding boxes and collision detection
 */
export class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  get left() {
    return this.x;
  }

  get right() {
    return this.x + this.width;
  }

  get top() {
    return this.y;
  }

  get bottom() {
    return this.y + this.height;
  }

  get centerX() {
    return this.x + this.width / 2;
  }

  get centerY() {
    return this.y + this.height / 2;
  }

  /**
   * Check if this rectangle intersects with another
   */
  intersects(other) {
    return (
      this.left < other.right &&
      this.right > other.left &&
      this.top < other.bottom &&
      this.bottom >= other.top  // Changed > to >= to handle edge touching
    );
  }

  /**
   * Check if a point is inside this rectangle
   */
  contains(x, y) {
    return (
      x >= this.left &&
      x <= this.right &&
      y >= this.top &&
      y <= this.bottom
    );
  }

  /**
   * Get the overlap amount on each axis
   */
  getOverlap(other) {
    const overlapX = Math.min(this.right, other.right) - Math.max(this.left, other.left);
    const overlapY = Math.min(this.bottom, other.bottom) - Math.max(this.top, other.top);
    return { x: overlapX, y: overlapY };
  }

  clone() {
    return new Rectangle(this.x, this.y, this.width, this.height);
  }
}
