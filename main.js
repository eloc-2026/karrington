import { Game } from './src/core/Game.js';

console.log('🎮 Bone Workz - Loading...');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('game-container');

  if (!container) {
    console.error('Game container not found!');
    return;
  }

  // Create and initialize game
  window.game = new Game(container);
  const game = window.game;
  game.init();

  console.log('✅ Game initialized successfully!');
  console.log('Phase 1a: Core systems are running');
  console.log('Game loop active, rendering system ready');

  // Debug panel update
  const debugPanel = document.getElementById('debug-info');
  if (debugPanel) {
    setInterval(() => {
      const info = game.getDebugInfo();
      const loopRunning = game.gameLoop?.running || false;

      debugPanel.innerHTML = `
        <div>State: ${info.gameState}</div>
        <div>Loop: ${loopRunning ? '▶️ Running' : '⏸️ Stopped'}</div>
        <div>Entities: ${info.entities}</div>
        ${info.player ? `
          <div>Player X: ${info.player.pos.split(',')[0]} (+ = RIGHT→)</div>
          <div>Player Y: ${info.player.pos.split(',')[1]} (+ = DOWN↓)</div>
          <div>Velocity: ${info.player.vel}</div>
          <div>Grounded: ${info.player.grounded ? '✅ YES' : '❌ NO'}</div>
          <div>Health: ${info.player.health}</div>
        ` : '<div style="color: red;">⚠️ No player!</div>'}
        <div style="margin-top: 8px; padding-top: 5px; border-top: 1px solid #0f0;">
          <strong>Controls:</strong><br>
          A = LEFT ⬅ | D = RIGHT ➡<br>
          W/SPACE = JUMP ⬆ | Z = ATTACK ⚔️
        </div>
      `;
    }, 100);
  }

  // Keyboard events are handled by InputManager
});
