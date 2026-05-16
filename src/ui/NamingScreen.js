/**
 * Player Naming Screen - shown at game start
 */
export class NamingScreen {
  static show(game, onNameConfirmed) {
    console.log('🎭 NamingScreen.show() called');

    const namingHTML = `
      <div id="naming-overlay" class="menu-overlay">
        <div class="menu-container naming-container">
          <h1>💀 Welcome, Skeleton 💀</h1>
          <p class="naming-description">
            You've awakened in the depths of the crypt.<br>
            But who were you before the curse?
          </p>

          <div class="naming-input-group">
            <label for="player-name-input">Enter your name:</label>
            <input
              type="text"
              id="player-name-input"
              class="player-name-input"
              maxlength="20"
              placeholder="Skeleton Warrior"
              autocomplete="off"
              value="TestPlayer"
            />
          </div>

          <button class="menu-btn" id="confirm-name-btn">
            Begin Your Journey
          </button>

          <div class="naming-tips">
            <p>💡 Tip: NPCs will remember your name and react to you differently over time</p>
            <p style="color: #f80;">🐛 DEBUG: Press Enter or click button to start</p>
          </div>
        </div>
      </div>
    `;

    game.container.insertAdjacentHTML('beforeend', namingHTML);

    const input = document.getElementById('player-name-input');
    const confirmBtn = document.getElementById('confirm-name-btn');

    console.log('🎭 Naming screen HTML added, input and button found');

    // Focus input
    input.focus();

    // DEBUG: Auto-submit after 2 seconds for testing
    console.log('⏱️ DEBUG: Auto-submitting in 2 seconds...');
    setTimeout(() => {
      console.log('⏱️ DEBUG: Auto-submit triggered');
      confirmBtn.click();
    }, 2000);

    // Allow Enter key to submit
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        confirmBtn.click();
      }
    });

    confirmBtn.addEventListener('click', () => {
      console.log('✅ Confirm button clicked!');

      let playerName = input.value.trim();

      // Default name if empty
      if (!playerName) {
        playerName = 'Vessel';
      }

      console.log(`👤 Vessel named: ${playerName}`);

      // Remove naming screen
      const overlay = document.getElementById('naming-overlay');
      if (overlay) {
        overlay.remove();
        console.log('🎭 Naming overlay removed');
      }

      // Call callback if provided
      if (onNameConfirmed) {
        onNameConfirmed(playerName);
      }
    });
  }
}
