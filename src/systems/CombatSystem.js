import { GAME_CONFIG, ENTITY_TYPES } from '../utils/Constants.js';

/**
 * Combat system - handles damage, knockback, and combat interactions
 */
export class CombatSystem {
  constructor() {
    this.combatLog = [];
  }

  /**
   * Check combat interactions between entities
   */
  update(game) {
    if (!game.player || !game.player.active) return;

    // Check player vs enemies
    for (const entity of game.entities) {
      if (entity.type === ENTITY_TYPES.ENEMY && entity.active) {
        this.checkPlayerEnemyContact(game.player, entity, game);
      }
    }
  }

  /**
   * Check if player is touching an enemy
   * NOTE: Enemies handle their own attack logic in checkPlayerProximity()
   * This is just for knockback when collision occurs
   */
  checkPlayerEnemyContact(player, enemy, game) {
    // Friendly enemies don't attack
    if (enemy.isFriendly) return;

    const bounds1 = player.getBounds();
    const bounds2 = enemy.getBounds();

    // Check actual collision (touch)
    if (bounds1.intersects(bounds2)) {
      // Apply knockback on collision (enemies handle their own damage)
      if (!player.isInvincible) {
        this.applyKnockback(player, enemy);

        // Debug log
        if (Math.random() < 0.1) {
          console.log(`⚔️ Player-Enemy collision: ${enemy.constructor.name} touching player`);
        }
      }
    }
  }

  /**
   * Deal damage to the player
   */
  dealDamageToPlayer(player, damage, game) {
    const actualDamage = damage * GAME_CONFIG.PLAYER.DAMAGE_MULTIPLIER;
    player.takeDamage(actualDamage);

    // Show damage number
    if (game.renderSystem) {
      game.renderSystem.createTextElement(
        `-${Math.round(actualDamage)}`,
        player.position.x + player.size.width / 2,
        player.position.y,
        'damage-number player-damage'
      );
    }

    // Log combat
    this.log(`Player took ${Math.round(actualDamage)} damage`);
  }

  /**
   * Apply knockback to target
   */
  applyKnockback(target, source) {
    const direction = target.position.x > source.position.x ? 1 : -1;
    const knockbackForce = GAME_CONFIG.COMBAT.KNOCKBACK_FORCE;

    // Apply gentle knockback using velocity Vector2
    if (target.velocity) {
      target.velocity.x = direction * knockbackForce;
      target.velocity.y = -knockbackForce * 0.3; // Small upward knock
    }
  }

  /**
   * Roll for critical hit
   */
  isCriticalHit() {
    return Math.random() < GAME_CONFIG.COMBAT.CRIT_CHANCE;
  }

  /**
   * Calculate damage with crit
   */
  calculateDamage(baseDamage) {
    if (this.isCriticalHit()) {
      return baseDamage * GAME_CONFIG.COMBAT.CRIT_MULTIPLIER;
    }
    return baseDamage;
  }

  /**
   * Log combat events
   */
  log(message) {
    this.combatLog.push(message);
    if (this.combatLog.length > 10) {
      this.combatLog.shift();
    }
  }

  /**
   * Get recent combat log
   */
  getLog() {
    return this.combatLog;
  }
}
