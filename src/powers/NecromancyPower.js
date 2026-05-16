import { GAME_CONFIG } from '../utils/Constants.js';
import { Projectile } from '../entities/Projectile.js';

/**
 * Necromancy Power - Basic bone projectile attacks and minion summoning
 */
export class NecromancyPower {
  constructor(player) {
    this.player = player;
    this.config = GAME_CONFIG.POWERS.NECROMANCY;

    // Attack cooldowns
    this.basicAttackCooldown = 0;
    this.summonCooldown = 0;

    // Minions (for future implementation)
    this.minions = [];
  }

  update(deltaTime) {
    // Update cooldowns
    if (this.basicAttackCooldown > 0) {
      this.basicAttackCooldown -= deltaTime;
    }

    if (this.summonCooldown > 0) {
      this.summonCooldown -= deltaTime;
    }
  }

  /**
   * Fire a bone projectile
   */
  basicAttack(game) {
    // Check cooldown
    if (this.basicAttackCooldown > 0) {
      return false;
    }

    // Check mana
    const manaCost = 10;
    if (!this.player.consumeMana(manaCost)) {
      return false;
    }

    // Create bone projectile
    const direction = this.player.facingRight ? 1 : -1;
    const startX = this.player.position.x + (this.player.facingRight ? this.player.size.width : -20);
    const startY = this.player.position.y + this.player.size.height / 2 - 4;

    const projectile = new Projectile(
      startX,
      startY,
      this.config.BASIC_SPEED * direction,
      0,
      this.config.BASIC_DAMAGE,
      this.player,
      'bone'
    );

    game.addEntity(projectile);

    // Set cooldown
    this.basicAttackCooldown = this.config.BASIC_COOLDOWN;

    return true;
  }

  /**
   * Summon a skeletal minion (future implementation)
   */
  summonMinion(game) {
    // Check cooldown
    if (this.summonCooldown > 0) {
      return false;
    }

    // Check mana
    if (!this.player.consumeMana(this.config.MINION_COST)) {
      return false;
    }

    // Check minion limit
    if (this.minions.length >= this.config.MINION_MAX) {
      return false;
    }

    // TODO: Create minion entity
    console.log('Minion summoning not yet implemented');

    // Set cooldown
    this.summonCooldown = this.config.MINION_COOLDOWN;

    return true;
  }

  canBasicAttack() {
    return this.basicAttackCooldown <= 0 && this.player.mana >= 10;
  }

  canSummon() {
    return this.summonCooldown <= 0 &&
           this.player.mana >= this.config.MINION_COST &&
           this.minions.length < this.config.MINION_MAX;
  }
}
