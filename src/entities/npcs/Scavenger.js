import { NPC } from './NPC.js';

/**
 * The Scavenger - Mysterious 6-armed trader
 */
export class Scavenger extends NPC {
  constructor(x, y) {
    super(x, y, 48, 64, 'The Scavenger');

    this.icon = '🕷️'; // 6-armed representation
    this.trustLevel = 50; // Starts neutral

    // Shop inventory
    this.shopItems = [
      { name: 'Health Potion', price: 20, effect: 'heal', value: 30 },
      { name: 'Mana Potion', price: 15, effect: 'mana', value: 40 },
      { name: 'Bone Charm', price: 50, effect: 'damage', value: 5 },
      { name: 'Soul Gem', price: 100, effect: 'maxMana', value: 20 },
      { name: 'Ancient Scroll', price: 150, effect: 'spell', value: 'fireball' }
    ];

    // What the scavenger will buy
    this.buyPrices = {
      'enemy_soul': 10,
      'rare_bone': 25,
      'cursed_item': 50
    };
  }

  getDialogue(playerName, trustLevel) {
    let greeting = '';
    let text = '';

    // Dialogue changes based on trust
    if (trustLevel < 30) {
      greeting = `*eyes glow suspiciously*`;
      text = `You... ${playerName}. What do you want? I don't trust strangers.`;
    } else if (trustLevel < 60) {
      greeting = `*nods slowly*`;
      text = `Ah, ${playerName}. I remember you. What brings you to my corner?`;
    } else {
      greeting = `*all six arms gesture welcomingly*`;
      text = `${playerName}, my trusted friend! Welcome back! How can I assist you today?`;
    }

    return {
      text: `${greeting}\n\n${text}`,
      options: [
        {
          label: '🛒 Buy Items',
          action: (game, npc) => this.openShop(game, 'buy')
        },
        {
          label: '💰 Sell Items',
          action: (game, npc) => this.openShop(game, 'sell')
        },
        {
          label: '💬 Talk',
          action: (game, npc) => this.talk(game, npc)
        },
        {
          label: '👋 Leave',
          action: null
        }
      ]
    };
  }

  openShop(game, mode) {
    console.log('🛒 Opening shop:', mode);

    if (mode === 'buy') {
      this.showBuyMenu(game);
    } else {
      this.showSellMenu(game);
    }
  }

  showBuyMenu(game) {
    const shopHTML = `
      <div id="shop-overlay" class="dialogue-overlay">
        <div class="shop-box">
          <div class="shop-header">
            <h2>🕷️ The Scavenger's Wares</h2>
            <p class="player-gold">Your Gold: <span class="gold-amount">${game.player.gold}</span> 💰</p>
          </div>

          <div class="shop-items">
            ${this.shopItems.map((item, i) => `
              <div class="shop-item ${game.player.gold >= item.price ? '' : 'cant-afford'}">
                <div class="item-info">
                  <span class="item-name">${item.name}</span>
                  <span class="item-description">${this.getItemDescription(item)}</span>
                </div>
                <div class="item-actions">
                  <span class="item-price">${item.price} 💰</span>
                  <button class="buy-btn" data-item="${i}" ${game.player.gold >= item.price ? '' : 'disabled'}>
                    Buy
                  </button>
                </div>
              </div>
            `).join('')}
          </div>

          <button class="close-shop-btn">Close</button>
        </div>
      </div>
    `;

    document.getElementById('dialogue-overlay')?.remove();
    game.container.insertAdjacentHTML('beforeend', shopHTML);

    // Add event listeners
    document.querySelectorAll('.buy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemIndex = parseInt(e.target.dataset.item);
        this.buyItem(game, itemIndex);
      });
    });

    document.querySelector('.close-shop-btn').addEventListener('click', () => {
      document.getElementById('shop-overlay')?.remove();
      game.dialogueSystem.closeDialogue();
    });
  }

  showSellMenu(game) {
    const sellHTML = `
      <div id="shop-overlay" class="dialogue-overlay">
        <div class="shop-box">
          <div class="shop-header">
            <h2>💰 Sell to The Scavenger</h2>
            <p class="player-gold">Your Gold: <span class="gold-amount">${game.player.gold}</span> 💰</p>
          </div>

          <div class="shop-items">
            <p style="text-align: center; color: #aaa; padding: 40px;">
              You don't have any items to sell yet.<br>
              Defeat powerful enemies to find rare items!
            </p>
          </div>

          <button class="close-shop-btn">Close</button>
        </div>
      </div>
    `;

    document.getElementById('dialogue-overlay')?.remove();
    game.container.insertAdjacentHTML('beforeend', sellHTML);

    document.querySelector('.close-shop-btn').addEventListener('click', () => {
      document.getElementById('shop-overlay')?.remove();
      game.dialogueSystem.closeDialogue();
    });
  }

  buyItem(game, itemIndex) {
    const item = this.shopItems[itemIndex];

    if (game.player.gold < item.price) {
      console.log('❌ Not enough gold!');
      return;
    }

    // Deduct gold
    game.player.gold -= item.price;

    // Apply item effect
    this.applyItemEffect(game.player, item);

    // Increase trust
    this.increaseTrust(5);

    console.log(`✅ Bought ${item.name} for ${item.price} gold`);

    // Update UI
    document.querySelector('.gold-amount').textContent = game.player.gold;

    // Show notification
    this.showNotification(game, `Purchased ${item.name}!`);

    // Refresh shop to update affordability
    setTimeout(() => {
      document.getElementById('shop-overlay')?.remove();
      this.showBuyMenu(game);
    }, 500);
  }

  applyItemEffect(player, item) {
    switch (item.effect) {
      case 'heal':
        player.health = Math.min(player.maxHealth, player.health + item.value);
        break;
      case 'mana':
        player.mana = Math.min(player.maxMana, player.mana + item.value);
        break;
      case 'damage':
        // Temporary damage boost (would need buff system)
        console.log(`+${item.value} damage boost`);
        break;
      case 'maxMana':
        player.maxMana += item.value;
        player.mana = player.maxMana;
        break;
      case 'spell':
        console.log(`Learned new spell: ${item.value}`);
        break;
    }
  }

  getItemDescription(item) {
    switch (item.effect) {
      case 'heal': return `Restores ${item.value} HP`;
      case 'mana': return `Restores ${item.value} Mana`;
      case 'damage': return `+${item.value} Attack Damage`;
      case 'maxMana': return `+${item.value} Max Mana`;
      case 'spell': return `Learn ${item.value}`;
      default: return 'Mysterious item';
    }
  }

  talk(game, npc) {
    const stories = [
      {
        low: "I've seen many like you. Most don't last long in these crypts.",
        mid: "This place... it wasn't always so dark. But the curse changed everything.",
        high: "You want to know about my arms? Ancient magic. A blessing and a curse."
      },
      {
        low: "Keep your distance, skeleton. I don't need trouble.",
        mid: "The creatures here... they weren't always monsters. Remember that.",
        high: "You're different from the others. There's still... humanity in you, somehow."
      },
      {
        low: "Gold first, questions later.",
        mid: "These items? Found them in the deepest parts of the ruins. Dangerous places.",
        high: "If you're truly trying to break the curse, you'll need more than just power. You'll need wisdom."
      }
    ];

    const trustCategory = npc.trustLevel < 40 ? 'low' : npc.trustLevel < 70 ? 'mid' : 'high';
    const randomStory = stories[Math.floor(Math.random() * stories.length)];

    const storyHTML = `
      <div id="dialogue-overlay" class="dialogue-overlay">
        <div class="dialogue-box">
          <div class="dialogue-speaker">
            <span class="speaker-icon">🕷️</span>
            <span class="speaker-name">The Scavenger</span>
          </div>

          <div class="dialogue-text">
            ${randomStory[trustCategory]}
          </div>

          <div class="dialogue-options">
            <button class="dialogue-option-btn" onclick="document.getElementById('dialogue-overlay').remove(); window.game.dialogueSystem.isActive = false; window.game.gameLoop.resume();">
              Continue
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('dialogue-overlay')?.remove();
    document.getElementById('shop-overlay')?.remove();
    game.container.insertAdjacentHTML('beforeend', storyHTML);

    // Increase trust a bit
    npc.increaseTrust(2);
  }

  showNotification(game, message) {
    const notif = document.createElement('div');
    notif.className = 'shop-notification';
    notif.textContent = message;
    game.container.appendChild(notif);

    setTimeout(() => notif.remove(), 2000);
  }

  getEntityClasses() {
    return 'entity npc scavenger';
  }
}
