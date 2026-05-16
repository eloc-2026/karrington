/**
 * Save System - Handles auto-save and game state persistence
 */
export class SaveSystem {
  constructor(game) {
    this.game = game;
    this.autoSaveInterval = 30000; // 30 seconds
    this.autoSaveTimer = null;
  }

  init() {
    // Start auto-save timer
    this.startAutoSave();
    console.log('💾 Auto-save enabled (every 30 seconds)');
  }

  startAutoSave() {
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
    }

    this.autoSaveTimer = setInterval(() => {
      this.autoSave();
    }, this.autoSaveInterval);
  }

  stopAutoSave() {
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
      this.autoSaveTimer = null;
    }
  }

  autoSave() {
    if (!this.game.player || !this.game.stateManager.isPlaying()) {
      return;
    }

    this.save();
    console.log('💾 Auto-saved game');

    // Show notification
    this.showSaveNotification();
  }

  save() {
    const saveData = {
      timestamp: Date.now(),
      player: {
        health: this.game.player.health,
        maxHealth: this.game.player.maxHealth,
        mana: this.game.player.mana,
        maxMana: this.game.player.maxMana,
        position: {
          x: this.game.player.position.x,
          y: this.game.player.position.y
        }
      },
      gameState: {
        currentLevel: this.game.stateManager.currentLevel,
        score: this.game.stateManager.score,
        lives: this.game.stateManager.lives,
        timeElapsed: this.game.stateManager.timeElapsed
      },
      enemies: this.game.entities
        .filter(e => e.type === 'enemy')
        .map(e => ({
          type: e.constructor.name,
          health: e.health,
          position: { x: e.position.x, y: e.position.y },
          active: e.active
        }))
    };

    localStorage.setItem('skeleton_save', JSON.stringify(saveData));
    return saveData;
  }

  load() {
    const saveDataStr = localStorage.getItem('skeleton_save');
    if (!saveDataStr) {
      console.log('📁 No save data found');
      return null;
    }

    try {
      const saveData = JSON.parse(saveDataStr);
      console.log('💾 Loaded save from:', new Date(saveData.timestamp).toLocaleString());

      return saveData;
    } catch (e) {
      console.error('❌ Failed to load save:', e);
      return null;
    }
  }

  applySave(saveData) {
    if (!saveData) return false;

    // Restore player state
    if (this.game.player && saveData.player) {
      this.game.player.health = saveData.player.health;
      this.game.player.maxHealth = saveData.player.maxHealth;
      this.game.player.mana = saveData.player.mana;
      this.game.player.maxMana = saveData.player.maxMana;
      this.game.player.position.x = saveData.player.position.x;
      this.game.player.position.y = saveData.player.position.y;
      this.game.player.updateBounds();
    }

    // Restore game state
    if (saveData.gameState) {
      this.game.stateManager.currentLevel = saveData.gameState.currentLevel;
      this.game.stateManager.score = saveData.gameState.score;
      this.game.stateManager.lives = saveData.gameState.lives;
      this.game.stateManager.timeElapsed = saveData.gameState.timeElapsed;
    }

    console.log('✅ Save data applied');
    return true;
  }

  deleteSave() {
    localStorage.removeItem('skeleton_save');
    console.log('🗑 Save data deleted');
  }

  hasSave() {
    return localStorage.getItem('skeleton_save') !== null;
  }

  showSaveNotification() {
    const notification = document.createElement('div');
    notification.className = 'save-notification';
    notification.textContent = '💾 Game Saved';
    document.getElementById('game-container').appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 2000);
  }
}
