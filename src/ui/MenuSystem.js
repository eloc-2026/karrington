/**
 * Menu System - Handles title screen, settings, pause, and game over menus
 */
export class MenuSystem {
  constructor(game) {
    this.game = game;
    this.container = null;
    this.currentMenu = null;
  }

  init(container) {
    this.container = container;
    this.showTitleScreen();
  }

  showTitleScreen() {
    this.currentMenu = 'title';

    const menuHTML = `
      <div id="menu-overlay" class="menu-overlay">
        <div class="menu-container">
          <div class="game-title">
            <h1>☠️ BONE WORKZ ☠️</h1>
            <h2>🦴 A Skeletal Adventure 🦴</h2>
          </div>

          <div class="menu-buttons">
            <button class="menu-btn" id="btn-start-game">
              ▶ START GAME
            </button>
            <button class="menu-btn" id="btn-continue" style="display: none;">
              💾 CONTINUE
            </button>
            <button class="menu-btn" id="btn-settings">
              ⚙ SETTINGS
            </button>
            <button class="menu-btn" id="btn-credits">
              ℹ CREDITS
            </button>
            <button class="menu-btn" id="btn-quit">
              ✖ QUIT
            </button>
          </div>

          <div class="menu-footer">
            <p>Controls: A/D - Move | W - Jump | Z - Magic | X - Spare</p>
          </div>
        </div>
      </div>
    `;

    this.container.insertAdjacentHTML('beforeend', menuHTML);

    // Check for saved game
    if (localStorage.getItem('skeleton_save')) {
      document.getElementById('btn-continue').style.display = 'block';
    }

    // Add event listeners
    document.getElementById('btn-start-game').addEventListener('click', () => this.startNewGame());
    document.getElementById('btn-continue').addEventListener('click', () => this.continueGame());
    document.getElementById('btn-settings').addEventListener('click', () => this.showSettings());
    document.getElementById('btn-credits').addEventListener('click', () => this.showCredits());
    document.getElementById('btn-quit').addEventListener('click', () => this.quitGame());
  }

  showSettings() {
    const settings = this.game.settings || {
      musicVolume: 70,
      sfxVolume: 80,
      difficulty: 'normal',
      showFPS: true
    };

    const menuHTML = `
      <div id="settings-menu" class="menu-overlay">
        <div class="menu-container">
          <h1>⚙ SETTINGS</h1>

          <div class="settings-panel">
            <div class="setting-item">
              <label>Music Volume</label>
              <input type="range" id="music-volume" min="0" max="100" value="${settings.musicVolume}">
              <span id="music-value">${settings.musicVolume}%</span>
            </div>

            <div class="setting-item">
              <label>SFX Volume</label>
              <input type="range" id="sfx-volume" min="0" max="100" value="${settings.sfxVolume}">
              <span id="sfx-value">${settings.sfxVolume}%</span>
            </div>

            <div class="setting-item">
              <label>Difficulty</label>
              <select id="difficulty">
                <option value="easy" ${settings.difficulty === 'easy' ? 'selected' : ''}>Easy</option>
                <option value="normal" ${settings.difficulty === 'normal' ? 'selected' : ''}>Normal</option>
                <option value="hard" ${settings.difficulty === 'hard' ? 'selected' : ''}>Hard</option>
                <option value="nightmare" ${settings.difficulty === 'nightmare' ? 'selected' : ''}>Nightmare</option>
              </select>
            </div>

            <div class="setting-item">
              <label>Show FPS</label>
              <input type="checkbox" id="show-fps" ${settings.showFPS ? 'checked' : ''}>
            </div>
          </div>

          <div class="menu-buttons">
            <button class="menu-btn" id="btn-save-settings">💾 SAVE</button>
            <button class="menu-btn" id="btn-back">← BACK</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('menu-overlay').remove();
    this.container.insertAdjacentHTML('beforeend', menuHTML);

    // Volume sliders
    document.getElementById('music-volume').addEventListener('input', (e) => {
      document.getElementById('music-value').textContent = e.target.value + '%';
    });

    document.getElementById('sfx-volume').addEventListener('input', (e) => {
      document.getElementById('sfx-value').textContent = e.target.value + '%';
    });

    document.getElementById('btn-save-settings').addEventListener('click', () => {
      this.saveSettings();
      this.showTitleScreen();
    });

    document.getElementById('btn-back').addEventListener('click', () => {
      document.getElementById('settings-menu').remove();
      this.showTitleScreen();
    });
  }

  showGameOver() {
    this.currentMenu = 'gameover';

    const menuHTML = `
      <div id="gameover-menu" class="menu-overlay">
        <div class="menu-container death-menu">
          <div class="death-title">
            <h1>💀 YOU DIED 💀</h1>
            <p class="death-subtitle">The darkness has claimed you...</p>
          </div>

          <div class="death-stats">
            <p>Enemies Defeated: <span id="enemies-killed">0</span></p>
            <p>Time Survived: <span id="time-survived">0:00</span></p>
          </div>

          <div class="menu-buttons">
            <button class="menu-btn" id="btn-respawn">
              ♻ RESPAWN
            </button>
            <button class="menu-btn" id="btn-load-save">
              💾 LOAD LAST SAVE
            </button>
            <button class="menu-btn" id="btn-main-menu">
              🏠 MAIN MENU
            </button>
          </div>
        </div>
      </div>
    `;

    this.container.insertAdjacentHTML('beforeend', menuHTML);

    // Update stats
    if (this.game.stateManager) {
      document.getElementById('enemies-killed').textContent = this.game.stateManager.score || 0;
      const minutes = Math.floor(this.game.stateManager.timeElapsed / 60);
      const seconds = Math.floor(this.game.stateManager.timeElapsed % 60);
      document.getElementById('time-survived').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    document.getElementById('btn-respawn').addEventListener('click', () => this.respawn());
    document.getElementById('btn-load-save').addEventListener('click', () => this.loadSave());
    document.getElementById('btn-main-menu').addEventListener('click', () => {
      document.getElementById('gameover-menu').remove();
      this.showTitleScreen();
    });
  }

  showCredits() {
    const menuHTML = `
      <div id="credits-menu" class="menu-overlay">
        <div class="menu-container">
          <h1>ℹ ABOUT</h1>

          <div class="credits-content">
            <h2>Elemental Platformer - Skeleton's Quest</h2>
            <p>A 2D platformer adventure featuring a skeleton warrior<br>
            with necromantic powers on a quest for redemption.</p>

            <h3>Features:</h3>
            <ul>
              <li>• 3 Elemental Power Sets</li>
              <li>• Morality System with Multiple Endings</li>
              <li>• Boss Battles & Enemy Encounters</li>
              <li>• Auto-Save System</li>
            </ul>

            <p class="version">Version 1.0.0</p>
          </div>

          <div class="menu-buttons">
            <button class="menu-btn" id="btn-back-credits">← BACK</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('menu-overlay').remove();
    this.container.insertAdjacentHTML('beforeend', menuHTML);

    document.getElementById('btn-back-credits').addEventListener('click', () => {
      document.getElementById('credits-menu').remove();
      this.showTitleScreen();
    });
  }

  startNewGame() {
    console.log('🎮 Starting new game...');
    this.hideMenu();
    this.game.startNewGame();
  }

  continueGame() {
    console.log('💾 Loading save...');
    this.hideMenu();
    this.game.loadGame();
  }

  respawn() {
    document.getElementById('gameover-menu').remove();
    this.game.respawnPlayer();
  }

  loadSave() {
    document.getElementById('gameover-menu').remove();
    this.game.loadGame();
  }

  quitGame() {
    if (confirm('Are you sure you want to quit?')) {
      window.close();
    }
  }

  saveSettings() {
    const settings = {
      musicVolume: parseInt(document.getElementById('music-volume').value),
      sfxVolume: parseInt(document.getElementById('sfx-volume').value),
      difficulty: document.getElementById('difficulty').value,
      showFPS: document.getElementById('show-fps').checked
    };

    localStorage.setItem('skeleton_settings', JSON.stringify(settings));
    this.game.settings = settings;

    // Apply settings
    if (this.game.audioSystem) {
      this.game.audioSystem.setMusicVolume(settings.musicVolume / 100);
      this.game.audioSystem.setSFXVolume(settings.sfxVolume / 100);
    }

    console.log('⚙ Settings saved:', settings);
  }

  hideMenu() {
    const overlay = document.getElementById('menu-overlay') ||
                    document.getElementById('settings-menu') ||
                    document.getElementById('gameover-menu') ||
                    document.getElementById('credits-menu');
    if (overlay) {
      overlay.remove();
    }
    this.currentMenu = null;
  }

  isMenuOpen() {
    return this.currentMenu !== null;
  }
}
