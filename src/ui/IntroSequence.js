/**
 * Intro Sequence - "are you there? are we connected?"
 * Creepy intro with dialogue before class selection
 */
export class IntroSequence {
  static show(game, onComplete) {
    console.log('🎬 IntroSequence.show() called');

    // Create black screen overlay
    const overlay = document.createElement('div');
    overlay.id = 'intro-sequence';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: #000;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'Courier New', monospace;
    `;

    console.log('🎬 Overlay created, appending to body...');

    // Eyes container
    const eyesContainer = document.createElement('div');
    eyesContainer.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: opacity 2s ease-in;
    `;

    // Left eye
    const leftEye = document.createElement('div');
    leftEye.style.cssText = `
      position: absolute;
      width: 40px;
      height: 60px;
      background: #fff;
      border-radius: 50%;
      left: -60px;
      top: 0;
      box-shadow: 0 0 30px rgba(255, 255, 255, 0.8),
                  inset 0 0 20px rgba(200, 200, 200, 0.5);
      animation: eyeBlink 4s infinite;
    `;

    // Right eye
    const rightEye = document.createElement('div');
    rightEye.style.cssText = `
      position: absolute;
      width: 40px;
      height: 60px;
      background: #fff;
      border-radius: 50%;
      left: 20px;
      top: 0;
      box-shadow: 0 0 30px rgba(255, 255, 255, 0.8),
                  inset 0 0 20px rgba(200, 200, 200, 0.5);
      animation: eyeBlink 4s infinite;
    `;

    eyesContainer.appendChild(leftEye);
    eyesContainer.appendChild(rightEye);

    // Dialogue text
    const dialogue = document.createElement('div');
    dialogue.style.cssText = `
      position: absolute;
      bottom: 20%;
      left: 50%;
      transform: translateX(-50%);
      color: #ff3333;
      font-size: 24px;
      text-align: center;
      max-width: 80%;
      opacity: 0;
      text-shadow: 0 0 10px rgba(255, 51, 51, 0.8);
      letter-spacing: 2px;
      line-height: 1.6;
    `;

    overlay.appendChild(eyesContainer);
    overlay.appendChild(dialogue);
    document.body.appendChild(overlay);

    console.log('🎬 Intro overlay added to DOM');

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes eyeBlink {
        0%, 100% { height: 60px; }
        48%, 52% { height: 2px; }
      }

      @keyframes textFlicker {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
      }
    `;
    document.head.appendChild(style);

    // Sequence timing - starts immediately after 6-second wait
    const sequence = [
      {
        delay: 1000, // 1s: Eyes appear
        action: () => {
          console.log('🎬 Step 1: Eyes appearing');
          eyesContainer.style.opacity = '1';
        }
      },
      {
        delay: 2000, // 2s: First text appears
        action: () => {
          console.log('🎬 Step 2: First text appearing');
          dialogue.style.opacity = '1';
          dialogue.style.animation = 'textFlicker 0.1s infinite';
          this.typeText(dialogue, 'are you there? are we connected?', 40);
        }
      },
      {
        delay: 5000, // 5s: Second line appears
        action: () => {
          console.log('🎬 Step 3: Second text appearing');
          dialogue.style.opacity = '0';
          setTimeout(() => {
            dialogue.style.opacity = '1';
            this.typeText(dialogue, 'yes good, good.... now tell me who were you?', 40);
          }, 500);
        }
      },
      {
        delay: 9000, // 9s: Fade out to class selection
        action: () => {
          console.log('🎬 Step 4: Fading out');
          overlay.style.transition = 'opacity 1s ease-out';
          overlay.style.opacity = '0';
          setTimeout(() => {
            console.log('🎬 Intro complete, calling onComplete()');
            overlay.remove();
            if (onComplete) onComplete();
          }, 1000);
        }
      }
    ];

    // Execute sequence
    sequence.forEach(step => {
      setTimeout(step.action, step.delay);
    });

    // Store reference
    this.overlay = overlay;
  }

  static typeText(element, text, speed) {
    element.textContent = '';
    let index = 0;

    const type = () => {
      if (index < text.length) {
        element.textContent += text[index];
        index++;
        setTimeout(type, speed);
      }
    };

    type();
  }

  static hide() {
    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
    }
  }
}
