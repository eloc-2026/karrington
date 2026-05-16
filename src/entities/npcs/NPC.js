import { Entity } from '../Entity.js';
import { ENTITY_TYPES } from '../../utils/Constants.js';

/**
 * Base NPC class
 */
export class NPC extends Entity {
  constructor(x, y, width, height, name) {
    super(x, y, width, height, ENTITY_TYPES.NPC);

    this.name = name;
    this.trustLevel = 30; // 0-100, starts low
    this.hasGravity = true;
    this.hasCollision = true;
    this.icon = '🧑';

    // Interaction
    this.canInteract = true;
    this.interactRange = 80;
  }

  update(deltaTime, game) {
    super.update(deltaTime, game);

    // Check if player is nearby for interaction prompt
    if (game.player && this.canInteract) {
      const distance = Math.abs(game.player.position.x - this.position.x);

      if (distance < this.interactRange) {
        // Show interaction prompt
        this.showInteractPrompt = true;
      } else {
        this.showInteractPrompt = false;
      }
    }
  }

  /**
   * Interact with this NPC
   */
  interact(game) {
    console.log('💬 Interacting with', this.name);

    // Start dialogue through game's dialogue system
    if (game.dialogueSystem) {
      game.dialogueSystem.startDialogue(this, game.player.name);
    }
  }

  /**
   * Increase trust with this NPC
   */
  increaseTrust(amount) {
    this.trustLevel = Math.min(100, this.trustLevel + amount);
    console.log(`${this.name} trust increased to ${this.trustLevel}`);
  }

  /**
   * Decrease trust with this NPC
   */
  decreaseTrust(amount) {
    this.trustLevel = Math.max(0, this.trustLevel - amount);
    console.log(`${this.name} trust decreased to ${this.trustLevel}`);
  }

  /**
   * Get dialogue based on trust level - override in subclasses
   */
  getDialogue(playerName, trustLevel) {
    return {
      text: `Hello, ${playerName}.`,
      options: [
        {
          label: 'Goodbye',
          action: null
        }
      ]
    };
  }

  getEntityClasses() {
    return `entity npc ${this.name.toLowerCase().replace(/\s+/g, '-')}`;
  }
}
