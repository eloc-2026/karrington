import { Entity } from '../Entity.js';
import { GAME_CONFIG, ENTITY_TYPES } from '../../utils/Constants.js';

/**
 * Zombie Slime - Basic melee enemy that patrols back and forth
 */
export class ZombieSlime extends Entity {
  constructor(x, y, patrolLeft, patrolRight) {
    const config = GAME_CONFIG.ENEMIES.ZOMBIE_SLIME;
    super(x, y, config.WIDTH, config.HEIGHT, ENTITY_TYPES.ENEMY);

    // Stats
    this.health = config.HEALTH;
    this.maxHealth = config.HEALTH;
    this.damage = config.DAMAGE;
    this.speed = config.SPEED;

    // AI behavior
    this.patrolLeft = patrolLeft;
    this.patrolRight = patrolRight;
    this.movingRight = true;
    this.hasGravity = true;
    this.hasCollision = true;

    // Combat
    this.attackCooldown = 0;
    this.canAttack = true;

    // Friendship state
    this.isFriendly = false;
    this.followTarget = null;

    // Initialize bounds
    this.updateBounds();
  }

  update(deltaTime, game) {
    super.update(deltaTime, game);

    // Update attack cooldown
    if (this.attackCooldown > 0) {
      this.attackCooldown -= deltaTime;
      if (this.attackCooldown <= 0) {
        this.canAttack = true;
      }
    }

    // Friendly slimes follow player instead of attacking
    if (this.isFriendly && this.followTarget) {
      this.followPlayer();
    } else {
      // Normal enemy behavior
      this.patrol();

      // Check if near player for attack
      if (game.player && !this.isFriendly) {
        this.checkPlayerProximity(game.player);
      }
    }
  }

  patrol() {
    // Move in current direction
    if (this.movingRight) {
      this.velocity.x = this.speed;
      this.facingRight = true;

      // Reverse at right boundary
      if (this.position.x >= this.patrolRight) {
        this.movingRight = false;
      }
    } else {
      this.velocity.x = -this.speed;
      this.facingRight = false;

      // Reverse at left boundary
      if (this.position.x <= this.patrolLeft) {
        this.movingRight = true;
      }
    }
  }

  checkPlayerProximity(player) {
    const distance = Math.abs(player.position.x - this.position.x);

    // Attack if player is close
    if (distance < 40 && this.canAttack) {
      this.attack(player);
    }
  }

  attack(player) {
    player.takeDamage(this.damage);
    this.canAttack = false;
    this.attackCooldown = 1.5; // Increased from 1.0 to 1.5 second cooldown
  }

  takeDamage(amount, game) {
    this.health -= amount;

    if (this.health <= 0) {
      this.die(game);
    }

    return true;
  }

  die(game) {
    console.log('💀 Slime died');

    // Drop gold
    if (game) {
      this.dropGold(game);
    }

    this.active = false;
    this.destroy();
  }

  dropGold(game) {
    // Import GoldDrop dynamically to avoid circular dependency
    import('../GoldDrop.js').then(({ GoldDrop }) => {
      const goldAmount = Math.floor(Math.random() * 7) + 5; // 5-11 gold
      const goldDrop = new GoldDrop(
        this.position.x + this.size.width / 2,
        this.position.y + this.size.height / 2,
        goldAmount
      );
      game.addEntity(goldDrop);
    });
  }

  isVulnerable() {
    const threshold = GAME_CONFIG.ENEMIES.VULNERABLE_THRESHOLD;
    return this.health <= this.maxHealth * threshold;
  }

  makeFriendly(player) {
    console.log('💚 Slime became friendly!');
    this.isFriendly = true;
    this.followTarget = player;
    this.canAttack = false;

    // Restore some health to show they're healed
    this.health = this.maxHealth;
  }

  followPlayer() {
    if (!this.followTarget) return;

    const distance = this.followTarget.position.x - this.position.x;
    const followDistance = 70; // Stay this far from player

    // Only move if too far away
    if (Math.abs(distance) > followDistance) {
      if (distance > 0) {
        this.velocity.x = this.speed * 0.6; // Move slower when following
        this.facingRight = true;
      } else {
        this.velocity.x = -this.speed * 0.6;
        this.facingRight = false;
      }
    } else {
      // Stay still when close enough
      this.velocity.x = 0;
    }
  }

  getEntityClasses() {
    const classes = ['entity', 'enemy', 'zombie-slime', this.animationState];

    if (this.isFriendly) {
      classes.push('friendly');
    } else if (this.isVulnerable()) {
      classes.push('vulnerable');
    }

    if (!this.facingRight) {
      classes.push('flipped');
    }

    return classes.join(' ');
  }
}
