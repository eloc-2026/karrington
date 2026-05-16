import { KEYS } from '../utils/Constants.js';

/**
 * Manages keyboard input state
 */
export class InputManager {
  constructor() {
    this.keys = new Set();
    this.keysPressed = new Set();
    this.keysReleased = new Set();

    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener('keydown', (e) => this.onKeyDown(e));
    window.addEventListener('keyup', (e) => this.onKeyUp(e));
  }

  onKeyDown(e) {
    const key = e.key;

    // Only track as "pressed" if this is a NEW key press (not a repeat)
    if (!this.keys.has(key)) {
      this.keysPressed.add(key);
      this.keys.add(key);
    }
    // If key is already held, do nothing (prevent key repeat events)

    // Prevent default for game controls
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(key)) {
      e.preventDefault();
    }
  }

  onKeyUp(e) {
    const key = e.key;
    this.keys.delete(key);
    this.keysReleased.add(key);
  }

  /**
   * Check if a key is currently held down
   */
  isKeyDown(key) {
    if (Array.isArray(key)) {
      return key.some(k => this.keys.has(k));
    }
    return this.keys.has(key);
  }

  /**
   * Check if a key was just pressed this frame
   */
  wasKeyPressed(key) {
    if (Array.isArray(key)) {
      return key.some(k => this.keysPressed.has(k));
    }
    return this.keysPressed.has(key);
  }

  /**
   * Check if a key was just released this frame
   */
  wasKeyReleased(key) {
    if (Array.isArray(key)) {
      return key.some(k => this.keysReleased.has(k));
    }
    return this.keysReleased.has(key);
  }

  /**
   * Clear pressed/released states (call at end of frame)
   */
  update() {
    this.keysPressed.clear();
    this.keysReleased.clear();
  }

  /**
   * Helper methods for common actions
   */
  isLeftPressed() {
    return this.isKeyDown(KEYS.LEFT);
  }

  isRightPressed() {
    return this.isKeyDown(KEYS.RIGHT);
  }

  wasJumpPressed() {
    return this.wasKeyPressed(KEYS.JUMP);
  }

  wasAttackPressed() {
    return this.wasKeyPressed(KEYS.ATTACK_NECRO);
  }

  isSummonPressed() {
    return this.isKeyDown(KEYS.SUMMON);
  }

  wasSummonPressed() {
    return this.wasKeyPressed(KEYS.SUMMON);
  }

  isSoulDrainPressed() {
    return this.isKeyDown(KEYS.SOUL_DRAIN);
  }

  wasSoulBurstPressed() {
    return this.wasKeyPressed(KEYS.SOUL_BURST);
  }

  wasExplosionPressed() {
    return this.wasKeyPressed(KEYS.EXPLOSION);
  }

  isExplosionHeld() {
    return this.isKeyDown(KEYS.EXPLOSION);
  }

  wasInteractPressed() {
    return this.wasKeyPressed(KEYS.INTERACT);
  }

  wasSparePressed() {
    return this.wasKeyPressed(KEYS.SPARE);
  }

  wasPausePressed() {
    return this.wasKeyPressed(KEYS.PAUSE);
  }

  destroy() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  }
}
