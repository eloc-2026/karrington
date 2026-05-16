/**
 * Dialogue System - Handles NPC conversations
 */
export class DialogueSystem {
  constructor(game) {
    this.game = game;
    this.currentDialogue = null;
    this.isActive = false;
    this.container = null;
  }

  init(container) {
    this.container = container;
  }

  /**
   * Start a dialogue with an NPC
   */
  startDialogue(npc, playerName) {
    console.log('💬 Starting dialogue with', npc.name);

    this.currentDialogue = npc;
    this.isActive = true;

    // Pause game
    if (this.game.gameLoop) {
      this.game.gameLoop.pause();
    }

    // Show dialogue UI
    this.showDialogueUI(npc, playerName);
  }

  showDialogueUI(npc, playerName) {
    const dialogue = npc.getDialogue(playerName, npc.trustLevel);

    const dialogueHTML = `
      <div id="dialogue-overlay" class="dialogue-overlay">
        <div class="dialogue-box">
          <div class="dialogue-speaker">
            <span class="speaker-icon">${npc.icon || '🧑'}</span>
            <span class="speaker-name">${npc.name}</span>
          </div>

          <div class="dialogue-text">
            ${dialogue.text}
          </div>

          <div class="dialogue-options">
            ${dialogue.options.map((option, i) => `
              <button class="dialogue-option-btn" data-option="${i}">
                ${option.label}
              </button>
            `).join('')}
          </div>

          <div class="dialogue-footer">
            <span class="trust-level">Trust: ${this.getTrustLabel(npc.trustLevel)}</span>
          </div>
        </div>
      </div>
    `;

    this.container.insertAdjacentHTML('beforeend', dialogueHTML);

    // Add event listeners
    document.querySelectorAll('.dialogue-option-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const optionIndex = parseInt(e.target.dataset.option);
        this.selectOption(dialogue.options[optionIndex]);
      });
    });
  }

  selectOption(option) {
    console.log('Selected option:', option.label);

    // Execute option action
    if (option.action) {
      option.action(this.game, this.currentDialogue);
    }

    // Close dialogue
    this.closeDialogue();
  }

  closeDialogue() {
    const overlay = document.getElementById('dialogue-overlay');
    if (overlay) {
      overlay.remove();
    }

    this.isActive = false;
    this.currentDialogue = null;

    // Resume game
    if (this.game.gameLoop) {
      this.game.gameLoop.resume();
    }
  }

  getTrustLabel(level) {
    if (level < 20) return '😠 Hostile';
    if (level < 40) return '😐 Wary';
    if (level < 60) return '🙂 Neutral';
    if (level < 80) return '😊 Friendly';
    return '🤗 Trusted';
  }
}
