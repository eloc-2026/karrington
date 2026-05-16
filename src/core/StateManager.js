import { GAME_STATES } from '../utils/Constants.js';

/**
 * Manages overall game state
 */
export class StateManager {
  constructor() {
    this.state = GAME_STATES.MENU;
    this.currentLevel = 1;
    this.score = 0;
    this.lives = 3;
    this.selectedElement = null;
    this.timeElapsed = 0;

    // Temporary power-ups/buffs
    this.activePowerUps = [];
  }

  setState(newState) {
    this.state = newState;
  }

  isPlaying() {
    return this.state === GAME_STATES.PLAYING;
  }

  isPaused() {
    return this.state === GAME_STATES.PAUSED;
  }

  isMenu() {
    return this.state === GAME_STATES.MENU;
  }

  isGameOver() {
    return this.state === GAME_STATES.GAME_OVER;
  }

  addScore(points) {
    this.score += points;
  }

  nextLevel() {
    this.currentLevel++;
  }

  resetLevel() {
    // Keep score and lives, but reset level progress
  }

  reset() {
    this.currentLevel = 1;
    this.score = 0;
    this.lives = 3;
    this.timeElapsed = 0;
    this.activePowerUps = [];
  }

  addPowerUp(powerUp, duration) {
    this.activePowerUps.push({
      type: powerUp,
      timeRemaining: duration
    });
  }

  updatePowerUps(deltaTime) {
    this.activePowerUps = this.activePowerUps.filter(pu => {
      pu.timeRemaining -= deltaTime;
      return pu.timeRemaining > 0;
    });
  }

  hasPowerUp(type) {
    return this.activePowerUps.some(pu => pu.type === type);
  }
}
