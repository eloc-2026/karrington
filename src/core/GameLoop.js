/**
 * Game loop using requestAnimationFrame
 * Handles delta time for frame-independent physics
 */
export class GameLoop {
  constructor(updateCallback, renderCallback) {
    this.updateCallback = updateCallback;
    this.renderCallback = renderCallback;
    this.lastTime = 0;
    this.running = false;
    this.rafId = null;
  }

  start() {
    if (this.running) {
      console.log('⚠️ Game loop already running');
      return;
    }

    console.log('▶️ Starting game loop...');
    this.running = true;
    this.lastTime = performance.now();
    this.rafId = requestAnimationFrame((time) => this.loop(time));
  }

  stop() {
    this.running = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  loop(currentTime) {
    if (!this.running) return;

    // Calculate delta time in seconds
    const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.1); // Cap at 100ms
    this.lastTime = currentTime;

    // Debug removed

    // Update game logic
    try {
      this.updateCallback(deltaTime);
    } catch (e) {
      console.error('❌ Update error:', e);
      console.error(e.stack);
    }

    // Render (pass deltaTime for animations)
    try {
      this.renderCallback(deltaTime);
    } catch (e) {
      console.error('❌ Render error:', e);
      console.error(e.stack);
    }

    // Continue loop
    this.rafId = requestAnimationFrame((time) => this.loop(time));
  }

  pause() {
    this.stop();
  }

  resume() {
    if (!this.running) {
      this.lastTime = performance.now(); // Reset time to avoid huge delta
      this.start();
    }
  }
}
