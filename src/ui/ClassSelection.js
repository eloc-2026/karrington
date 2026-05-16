/**
 * Class Selection Screen
 * Choose between Mage, Tech, or Graver
 */
export class ClassSelection {
  static show(game, onClassSelected) {
    const overlay = document.createElement('div');
    overlay.id = 'class-selection';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'Courier New', monospace;
      opacity: 0;
      animation: fadeIn 1s forwards;
    `;

    const title = document.createElement('h1');
    title.textContent = 'CHOOSE YOUR VESSEL';
    title.style.cssText = `
      color: #ff3333;
      font-size: 42px;
      margin-bottom: 60px;
      text-shadow: 0 0 20px rgba(255, 51, 51, 0.8);
      letter-spacing: 4px;
      animation: textGlow 2s infinite;
    `;

    const classContainer = document.createElement('div');
    classContainer.style.cssText = `
      display: flex;
      gap: 40px;
      justify-content: center;
      flex-wrap: wrap;
      max-width: 1200px;
    `;

    // Class definitions
    const classes = [
      {
        name: 'MAGE',
        description: 'Wielder of arcane fire',
        details: [
          '🔥 Blue flame magic',
          '✨ Press X to cast (2 mana)',
          '📖 High mana pool',
          '💫 Mystical robes'
        ],
        color: '#4488ff',
        icon: '🔮'
      },
      {
        name: 'TECH',
        description: 'Cyber-enhanced warrior',
        details: [
          '🔫 Futuristic gun',
          '🛡️ Armored plating',
          '💥 Reduced damage taken',
          '⚡ Advanced tech'
        ],
        color: '#00ffaa',
        icon: '🤖'
      },
      {
        name: 'GRAVER',
        description: 'Master of the blade',
        details: [
          '⚔️ Powerful sword',
          '💨 X for slash attacks',
          '✨ Z for magic cuts',
          '🗡️ Melee specialist'
        ],
        color: '#ff4444',
        icon: '⚔️'
      }
    ];

    classes.forEach(classData => {
      const card = this.createClassCard(classData, () => {
        // Show confirmation dialogue
        overlay.style.transition = 'opacity 0.5s';
        overlay.style.opacity = '0';
        setTimeout(() => {
          overlay.remove();
          this.showClassConfirmation(classData, () => {
            onClassSelected(classData.name);
          });
        }, 500);
      });
      classContainer.appendChild(card);
    });

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes textGlow {
        0%, 100% { text-shadow: 0 0 20px rgba(255, 51, 51, 0.8); }
        50% { text-shadow: 0 0 30px rgba(255, 51, 51, 1); }
      }

      @keyframes cardHover {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }

      .class-card:hover {
        animation: cardHover 0.5s;
      }
    `;
    document.head.appendChild(style);

    overlay.appendChild(title);
    overlay.appendChild(classContainer);
    document.body.appendChild(overlay);

    this.overlay = overlay;
  }

  static createClassCard(classData, onClick) {
    const card = document.createElement('div');
    card.className = 'class-card';
    card.style.cssText = `
      background: rgba(20, 20, 30, 0.9);
      border: 3px solid ${classData.color};
      border-radius: 15px;
      padding: 30px;
      width: 320px;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: 0 0 20px ${classData.color}40;
    `;

    card.addEventListener('mouseenter', () => {
      card.style.transform = 'scale(1.05)';
      card.style.boxShadow = `0 0 40px ${classData.color}80`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'scale(1)';
      card.style.boxShadow = `0 0 20px ${classData.color}40`;
    });

    card.addEventListener('click', onClick);

    // Icon
    const icon = document.createElement('div');
    icon.textContent = classData.icon;
    icon.style.cssText = `
      font-size: 64px;
      text-align: center;
      margin-bottom: 20px;
      filter: drop-shadow(0 0 10px ${classData.color});
    `;

    // Name
    const name = document.createElement('h2');
    name.textContent = classData.name;
    name.style.cssText = `
      color: ${classData.color};
      font-size: 32px;
      text-align: center;
      margin: 10px 0;
      letter-spacing: 3px;
    `;

    // Description
    const desc = document.createElement('p');
    desc.textContent = classData.description;
    desc.style.cssText = `
      color: #888;
      text-align: center;
      font-style: italic;
      margin-bottom: 20px;
      font-size: 14px;
    `;

    // Details
    const detailsList = document.createElement('div');
    detailsList.style.cssText = `
      color: #ccc;
      font-size: 14px;
      line-height: 2;
    `;

    classData.details.forEach(detail => {
      const item = document.createElement('div');
      item.textContent = detail;
      item.style.padding = '5px 0';
      detailsList.appendChild(item);
    });

    // Select button
    const button = document.createElement('button');
    button.textContent = 'SELECT';
    button.style.cssText = `
      width: 100%;
      padding: 12px;
      margin-top: 20px;
      background: ${classData.color};
      color: #000;
      border: none;
      border-radius: 8px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      font-family: 'Courier New', monospace;
      transition: all 0.3s;
    `;

    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.05)';
      button.style.boxShadow = `0 0 20px ${classData.color}`;
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
      button.style.boxShadow = 'none';
    });

    card.appendChild(icon);
    card.appendChild(name);
    card.appendChild(desc);
    card.appendChild(detailsList);
    card.appendChild(button);

    return card;
  }

  static showClassConfirmation(classData, onConfirm) {
    const overlay = document.createElement('div');
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
      opacity: 0;
      animation: fadeIn 1s forwards;
    `;

    const text = document.createElement('div');
    text.style.cssText = `
      color: #ff3333;
      font-size: 28px;
      text-align: center;
      text-shadow: 0 0 15px rgba(255, 51, 51, 0.8);
      letter-spacing: 3px;
      font-family: 'Courier New', monospace;
      max-width: 80%;
    `;

    overlay.appendChild(text);
    document.body.appendChild(overlay);

    // Type out dialogue
    this.typeText(text, 'Ah I see good, very very good...', 60, () => {
      setTimeout(() => {
        text.textContent = '';
        this.typeText(text, 'now shall we name the vessel?', 60, () => {
          setTimeout(() => {
            overlay.remove();
            onConfirm();
          }, 1500);
        });
      }, 1500);
    });
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
