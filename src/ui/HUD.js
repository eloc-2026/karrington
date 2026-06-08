/**
 * HUD - Heads-Up Display for player stats
 */
export class HUD {
  constructor() {
    this.element = null;
    this.healthBar = null;
    this.manaBar = null;
    this.xpBar = null;
    this.healthText = null;
    this.manaText = null;
    this.xpText = null;
    this.levelText = null;
  }

  init(container) {
    // Create HUD container
    this.element = document.getElementById('hud');
    if (!this.element) {
      this.element = document.createElement('div');
      this.element.id = 'hud';
      container.appendChild(this.element);
    }

    this.element.style.display = 'block';

    // Create HUD HTML
    this.element.innerHTML = `
      <div class="hud-stats">
        <div class="stat-bar health-container">
          <div class="stat-label">HP</div>
          <div class="stat-bar-bg">
            <div class="stat-bar-fill health-bar" style="width: 100%"></div>
          </div>
          <div class="stat-text health-text">100 / 100</div>
        </div>
        <div class="stat-bar mana-container">
          <div class="stat-label">MANA</div>
          <div class="stat-bar-bg">
            <div class="stat-bar-fill mana-bar" style="width: 100%"></div>
          </div>
          <div class="stat-text mana-text">100 / 100</div>
        </div>
        <div class="stat-bar xp-container">
          <div class="stat-label">XP</div>
          <div class="stat-bar-bg">
            <div class="stat-bar-fill xp-bar" style="width: 0%"></div>
          </div>
          <div class="stat-text xp-text">0 / 100</div>
        </div>
        <div class="hud-level">
          <span class="level-label">Level:</span>
          <span class="level-text">1</span>
        </div>
        <div class="hud-gold" id="hud-gold">
          <span class="gold-icon">💰</span>
          <span class="gold-amount">0</span>
        </div>
      </div>
      <div class="level-up-notification" style="display: none;">
        <div class="level-up-content">
          <div class="level-up-title">🎉 LEVEL UP! 🎉</div>
          <div class="level-up-stats"></div>
        </div>
      </div>
    `;

    // Get references to bar elements
    this.healthBar = this.element.querySelector('.health-bar');
    this.manaBar = this.element.querySelector('.mana-bar');
    this.xpBar = this.element.querySelector('.xp-bar');
    this.healthText = this.element.querySelector('.health-text');
    this.manaText = this.element.querySelector('.mana-text');
    this.xpText = this.element.querySelector('.xp-text');
    this.levelText = this.element.querySelector('.level-text');
    this.levelUpNotification = this.element.querySelector('.level-up-notification');
  }

  update(player) {
    if (!player) return;

    // Update health
    const healthPercent = (player.health / player.maxHealth) * 100;
    this.healthBar.style.width = `${Math.max(0, healthPercent)}%`;
    this.healthText.textContent = `${Math.round(player.health)} / ${player.maxHealth}`;

    // Change health bar color based on percentage
    if (healthPercent > 50) {
      this.healthBar.style.background = 'linear-gradient(90deg, #4ade80, #22c55e)';
    } else if (healthPercent > 25) {
      this.healthBar.style.background = 'linear-gradient(90deg, #fbbf24, #f59e0b)';
    } else {
      this.healthBar.style.background = 'linear-gradient(90deg, #ef4444, #dc2626)';
    }

    // Update mana
    const manaPercent = (player.mana / player.maxMana) * 100;
    this.manaBar.style.width = `${Math.max(0, manaPercent)}%`;
    this.manaText.textContent = `${Math.round(player.mana)} / ${player.maxMana}`;

    // Update XP
    if (player.xp !== undefined && player.xpToNextLevel !== undefined) {
      const xpPercent = (player.xp / player.xpToNextLevel) * 100;
      this.xpBar.style.width = `${Math.max(0, xpPercent)}%`;
      this.xpText.textContent = `${Math.round(player.xp)} / ${player.xpToNextLevel}`;
    }

    // Update level
    if (player.level !== undefined && this.levelText) {
      this.levelText.textContent = player.level;
    }

    // Show level-up notification
    if (player.justLeveledUp && this.levelUpNotification) {
      this.showLevelUp(player.level);
    }

    // Update gold
    const goldAmount = this.element.querySelector('.gold-amount');
    if (goldAmount) {
      goldAmount.textContent = player.gold || 0;
    }
  }

  showLevelUp(level) {
    if (!this.levelUpNotification) return;

    // Set notification content
    const statsDiv = this.levelUpNotification.querySelector('.level-up-stats');
    if (statsDiv) {
      statsDiv.innerHTML = `
        <div>Now Level ${level}</div>
        <div>+10 Max Health</div>
        <div>+5 Max Mana</div>
        <div>+5% Damage</div>
      `;
    }

    // Show notification
    this.levelUpNotification.style.display = 'flex';

    // Hide after 2 seconds
    setTimeout(() => {
      if (this.levelUpNotification) {
        this.levelUpNotification.style.display = 'none';
      }
    }, 2000);
  }

  hide() {
    if (this.element) {
      this.element.style.display = 'none';
    }
  }

  show() {
    if (this.element) {
      this.element.style.display = 'block';
    }
  }
}
