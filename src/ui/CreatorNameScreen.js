/**
 * Creator Name Screen
 * Asks for the creator's name with special dialogue if it matches
 */
export class CreatorNameScreen {
  static show(vesselName, onComplete) {
    const overlay = document.createElement('div');
    overlay.id = 'creator-name-screen';
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

    const dialogue = document.createElement('div');
    dialogue.style.cssText = `
      color: #ff3333;
      font-size: 28px;
      text-align: center;
      margin-bottom: 40px;
      text-shadow: 0 0 15px rgba(255, 51, 51, 0.8);
      letter-spacing: 3px;
      max-width: 80%;
      animation: textFlicker 0.1s infinite;
    `;

    const inputContainer = document.createElement('div');
    inputContainer.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      opacity: 0;
      transition: opacity 0.5s;
    `;

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter your name...';
    input.maxLength = 20;
    input.style.cssText = `
      padding: 15px 25px;
      font-size: 24px;
      background: rgba(30, 30, 40, 0.9);
      border: 2px solid #ff3333;
      border-radius: 8px;
      color: #fff;
      text-align: center;
      font-family: 'Courier New', monospace;
      width: 400px;
      box-shadow: 0 0 20px rgba(255, 51, 51, 0.4);
    `;

    input.addEventListener('focus', () => {
      input.style.borderColor = '#ff6666';
      input.style.boxShadow = '0 0 30px rgba(255, 51, 51, 0.6)';
    });

    input.addEventListener('blur', () => {
      input.style.borderColor = '#ff3333';
      input.style.boxShadow = '0 0 20px rgba(255, 51, 51, 0.4)';
    });

    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'CONFIRM';
    confirmButton.style.cssText = `
      padding: 12px 40px;
      font-size: 20px;
      background: #ff3333;
      color: #000;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-family: 'Courier New', monospace;
      font-weight: bold;
      transition: all 0.3s;
      box-shadow: 0 0 20px rgba(255, 51, 51, 0.4);
    `;

    confirmButton.addEventListener('mouseenter', () => {
      confirmButton.style.transform = 'scale(1.05)';
      confirmButton.style.boxShadow = '0 0 30px rgba(255, 51, 51, 0.6)';
    });

    confirmButton.addEventListener('mouseleave', () => {
      confirmButton.style.transform = 'scale(1)';
      confirmButton.style.boxShadow = '0 0 20px rgba(255, 51, 51, 0.4)';
    });

    const handleConfirm = () => {
      const creatorName = input.value.trim();
      if (!creatorName) {
        input.style.borderColor = '#ff0000';
        input.placeholder = 'Please enter a name...';
        return;
      }

      // Check if names match
      const namesMatch = creatorName.toLowerCase() === vesselName.toLowerCase();

      // Hide input
      inputContainer.style.opacity = '0';

      setTimeout(() => {
        if (namesMatch) {
          // Special dialogue for matching names
          this.showMatchingNameDialogue(overlay, creatorName, onComplete);
        } else {
          // Normal dialogue
          this.showNormalDialogue(overlay, creatorName, onComplete);
        }
      }, 500);
    };

    confirmButton.addEventListener('click', handleConfirm);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleConfirm();
      }
    });

    inputContainer.appendChild(input);
    inputContainer.appendChild(confirmButton);

    overlay.appendChild(dialogue);
    overlay.appendChild(inputContainer);
    document.body.appendChild(overlay);

    // Type out the question
    this.typeText(dialogue, 'I see what an amazingly horrific choice...', 60, () => {
      setTimeout(() => {
        dialogue.textContent = '';
        this.typeText(dialogue, 'what is the name of the creator?', 60, () => {
          setTimeout(() => {
            inputContainer.style.opacity = '1';
            input.focus();
          }, 800);
        });
      }, 1500);
    });

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes textFlicker {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
      }
    `;
    document.head.appendChild(style);

    this.overlay = overlay;
  }

  static showMatchingNameDialogue(overlay, name, onComplete) {
    const dialogue = document.createElement('div');
    dialogue.style.cssText = `
      color: #ff3333;
      font-size: 28px;
      text-align: center;
      text-shadow: 0 0 15px rgba(255, 51, 51, 0.8);
      letter-spacing: 3px;
      font-family: 'Courier New', monospace;
      max-width: 80%;
    `;

    overlay.innerHTML = '';
    overlay.appendChild(dialogue);

    // Play laugh sound (we'll add this to audio system)
    if (window.game && window.game.audioSystem) {
      window.game.audioSystem.playSFX('laugh');
    }

    // Type creepy laugh dialogue
    this.typeText(dialogue, 'yes yes of course...', 60, () => {
      setTimeout(() => {
        dialogue.textContent = '';
        this.typeText(dialogue, 'the vessel, the puppet and the creator are one in the same...', 50, () => {
          setTimeout(() => {
            // Flash white
            this.flashWhite(() => {
              overlay.remove();
              onComplete(name);
            });
          }, 1500);
        });
      }, 1500);
    });
  }

  static showNormalDialogue(overlay, name, onComplete) {
    const dialogue = document.createElement('div');
    dialogue.style.cssText = `
      color: #ff3333;
      font-size: 28px;
      text-align: center;
      text-shadow: 0 0 15px rgba(255, 51, 51, 0.8);
      letter-spacing: 3px;
      font-family: 'Courier New', monospace;
      max-width: 80%;
    `;

    overlay.innerHTML = '';
    overlay.appendChild(dialogue);

    this.typeText(dialogue, `Very well, ${name}...`, 60, () => {
      setTimeout(() => {
        dialogue.textContent = '';
        this.typeText(dialogue, 'Let the vessel awaken...', 60, () => {
          setTimeout(() => {
            // Flash white
            this.flashWhite(() => {
              overlay.remove();
              onComplete(name);
            });
          }, 1500);
        });
      }, 1500);
    });
  }

  static flashWhite(onComplete) {
    const flash = document.createElement('div');
    flash.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: #fff;
      z-index: 20000;
      opacity: 0;
      transition: opacity 0.3s;
    `;

    document.body.appendChild(flash);

    // Flash in
    setTimeout(() => {
      flash.style.opacity = '1';
    }, 10);

    // Flash out
    setTimeout(() => {
      flash.style.opacity = '0';
    }, 500);

    setTimeout(() => {
      flash.remove();
      if (onComplete) onComplete();
    }, 800);
  }

  static typeText(element, text, speed, onComplete) {
    element.textContent = '';
    let index = 0;

    const type = () => {
      if (index < text.length) {
        element.textContent += text[index];
        index++;
        setTimeout(type, speed);
      } else if (onComplete) {
        onComplete();
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
