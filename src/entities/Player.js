import { Entity } from './Entity.js';
import { ENTITY_TYPES, GAME_CONFIG, KEYS } from '../utils/Constants.js';
import { NecromancyPower } from '../powers/NecromancyPower.js';
import { PlayerClass } from './PlayerClasses.js';

/**
 * Player character - The Skeleton
 */
export class Player extends Entity {
  constructor(x, y, playerClass = null) {
    super(x, y, GAME_CONFIG.PLAYER.WIDTH, GAME_CONFIG.PLAYER.HEIGHT, ENTITY_TYPES.PLAYER);

    // Class system
    this.playerClass = playerClass;
    const classStats = playerClass ? playerClass.getStats() : {};

    // Stats (use class stats or defaults)
    this.maxHealth = classStats.maxHealth || GAME_CONFIG.PLAYER.MAX_HEALTH;
    this.health = this.maxHealth;
    this.maxMana = classStats.maxMana || GAME_CONFIG.PLAYER.MAX_MANA;
    this.mana = this.maxMana;
    this.moveSpeed = classStats.moveSpeed || GAME_CONFIG.PLAYER.MOVE_SPEED;
    this.jumpPower = classStats.jumpPower || GAME_CONFIG.PLAYER.JUMP_POWER;
    this.damageMultiplier = classStats.damageMultiplier || GAME_CONFIG.PLAYER.DAMAGE_MULTIPLIER;

    this.gold = 0; // Currency
    this.name = 'Skeleton'; // Default name, will be set at game start
    this.creatorName = ''; // Creator name

    // XP & Leveling
    this.xp = 0;
    this.level = 1;
    this.xpToNextLevel = GAME_CONFIG.XP.BASE_XP_TO_LEVEL; // 100 for level 1->2
    this.levelMultiplier = 1.0; // Damage output multiplier from leveling
    this.justLeveledUp = false;
    this.levelUpDisplayTimer = 0;

    // Physics - Entity has velocity Vector2, use that
    this.hasGravity = true;
    this.hasCollision = true;
    this.isGrounded = true; // Start grounded

    // Ensure velocity starts at zero
    this.velocity.x = 0;
    this.velocity.y = 0;

    // Combat
    this.isInvincible = false;
    this.invincibilityTimer = 0;
    this.timeSinceLastDamage = 0; // Track time since last hit

    // Jump cooldown to prevent constant jumping
    this.jumpCooldown = 0;
    this.canJump = true;

    // Ability cooldowns
    this.primaryCooldown = 0;
    this.secondaryCooldown = 0;

    // Powers (keep for backwards compatibility, but use class abilities)
    this.necromancyPower = new NecromancyPower(this);

    // Initialize bounds
    this.updateBounds();
  }

  update(deltaTime, game) {
    super.update(deltaTime, game);

    // Update jump cooldown
    if (this.jumpCooldown > 0) {
      this.jumpCooldown -= deltaTime;
      if (this.jumpCooldown <= 0) {
        this.canJump = true;
      }
    }

    // Update ability cooldowns
    if (this.primaryCooldown > 0) {
      this.primaryCooldown -= deltaTime;
    }
    if (this.secondaryCooldown > 0) {
      this.secondaryCooldown -= deltaTime;
    }

    // Handle input BEFORE physics
    this.handleInput(game.inputManager, game);

    // Regenerate mana
    this.regenerateMana(deltaTime);

    // Regenerate health after 5 seconds
    this.regenerateHealth(deltaTime);

    // Update invulnerability
    this.updateInvulnerability(deltaTime);

    // Update level up notification timer
    if (this.levelUpDisplayTimer > 0) {
      this.levelUpDisplayTimer -= deltaTime;
      if (this.levelUpDisplayTimer <= 0) {
        this.justLeveledUp = false;
      }
    }

    // Update powers
    if (this.necromancyPower) {
      this.necromancyPower.update(deltaTime);
    }
  }

  handleInput(input, game) {
    // Horizontal movement - A=left, D=right
    const leftPressed = input.isKeyDown(KEYS.LEFT);  // A, Left Arrow
    const rightPressed = input.isKeyDown(KEYS.RIGHT); // D, Right Arrow

    if (leftPressed) {
      this.velocity.x = -this.moveSpeed; // Use class-specific speed
      this.facingRight = false;
    } else if (rightPressed) {
      this.velocity.x = this.moveSpeed; // Use class-specific speed
      this.facingRight = true;
    } else {
      this.velocity.x = 0;
    }

    // Jump - W, Space, Up Arrow
    // Only allow jump if: grounded, can jump (cooldown finished), and key was just pressed
    const jumpPressed = input.wasKeyPressed(KEYS.JUMP);

    if (jumpPressed && this.isGrounded && this.canJump) {
      // Apply jump force (class-specific)
      this.velocity.y = this.jumpPower;
      this.isGrounded = false;

      // Set jump cooldown to prevent immediate re-jump
      this.canJump = false;
      this.jumpCooldown = 0.2; // 200ms cooldown for better control

      // Play jump sound
      if (game.audioSystem) {
        game.audioSystem.playSFX('jump');
      }
    }

    // Variable jump height - release jump key early for shorter jump
    if (!input.isKeyDown(KEYS.JUMP) && this.velocity.y < -100) {
      this.velocity.y *= 0.5; // Cut jump short if key released
    }

    // Primary ability - X key
    if (input.wasKeyPressed(KEYS.PRIMARY_ATTACK)) {
      this.usePrimaryAbility(game);
    }

    // Secondary ability - Z key
    if (input.wasKeyPressed(KEYS.SECONDARY_ATTACK)) {
      this.useSecondaryAbility(game);
    }

    // Summon - E (keep for backwards compatibility)
    if (input.wasKeyPressed(KEYS.SUMMON)) {
      if (this.necromancyPower) {
        this.necromancyPower.summonMinion(game);
      }
    }
  }

  usePrimaryAbility(game) {
    if (!this.playerClass || this.primaryCooldown > 0) return;

    const ability = this.playerClass.getAbility('primary');
    if (!ability) return;

    // Check mana cost
    if (ability.manaCost > 0 && !this.consumeMana(ability.manaCost)) {
      return;
    }

    // Use ability based on type
    if (ability.type === 'melee') {
      // Melee attack (Graver)
      this.performMeleeAttack(game, ability);
    } else {
      // Ranged projectile
      this.fireProjectile(game, ability);
    }

    this.primaryCooldown = ability.cooldown;

    // Play sound
    if (game.audioSystem) {
      game.audioSystem.playSFX('attack');
    }
  }

  useSecondaryAbility(game) {
    if (!this.playerClass || this.secondaryCooldown > 0) return;

    const ability = this.playerClass.getAbility('secondary');
    if (!ability) {
      // Fallback to necromancy for backwards compatibility
      if (this.necromancyPower) {
        const attacked = this.necromancyPower.basicAttack(game);
        if (attacked && game.audioSystem) {
          game.audioSystem.playSFX('attack');
        }
      }
      return;
    }

    // Check mana cost
    if (ability.manaCost > 0 && !this.consumeMana(ability.manaCost)) {
      return;
    }

    // Fire projectile or use ability
    this.fireProjectile(game, ability);
    this.secondaryCooldown = ability.cooldown;

    // Play sound
    if (game.audioSystem) {
      game.audioSystem.playSFX('attack');
    }
  }

  performMeleeAttack(game, ability) {
    // Trigger visual slash effect
    this.showMeleeSlash = true;

    // Find enemies in melee range
    const meleeRange = ability.range || 60;
    const direction = this.facingRight ? 1 : -1;

    for (const entity of game.entities) {
      if (entity.type === 'enemy' && entity.active) {
        const dx = entity.position.x - this.position.x;
        const distance = Math.abs(dx);

        // Check if in range and in front of player
        if (distance < meleeRange && Math.sign(dx) === direction) {
          if (entity.takeDamage) {
            entity.takeDamage(ability.damage, game);

            // Show damage number
            if (game.renderSystem && game.renderSystem.createTextElement) {
              game.renderSystem.createTextElement(
                `-${ability.damage}`,
                entity.position.x + entity.size.width / 2,
                entity.position.y,
                'damage-number'
              );
            }
          }
        }
      }
    }
  }

  fireProjectile(game, ability) {
    // Import Projectile dynamically
    import('./Projectile.js').then(({ Projectile }) => {
      const direction = this.facingRight ? 1 : -1;
      const startX = this.position.x + (this.facingRight ? this.size.width : 0);
      const startY = this.position.y + this.size.height / 2;

      const projectile = new Projectile(
        startX,
        startY,
        direction * ability.projectileSpeed,
        0,
        ability.damage,
        this
      );

      // Set projectile color if specified
      if (ability.projectileColor) {
        projectile.color = ability.projectileColor;
      }

      game.addEntity(projectile);
    });
  }

  attemptSpare(game) {
    // Find nearby enemies that can be spared
    const spareRange = 60; // Range to spare enemies

    for (const entity of game.entities) {
      if (entity.type === 'enemy' && entity.active && !entity.isFriendly) {
        const distance = Math.abs(entity.position.x - this.position.x);

        if (distance < spareRange && entity.isVulnerable && entity.isVulnerable()) {
          console.log('✨ Spared enemy!', entity.constructor.name);

          // Award morality points
          if (game.stateManager && game.stateManager.moralityTracker) {
            game.stateManager.moralityTracker.spareEnemy();
          }

          // Show spare message
          if (game.renderSystem) {
            game.renderSystem.createTextElement('SPARED', entity.position.x, entity.position.y - 20, 'spare-text');
          }

          // Convert enemy to friendly instead of destroying
          entity.makeFriendly(this);

          return; // Only spare one enemy at a time
        }
      }
    }

    console.log('❌ No vulnerable enemies nearby to spare');
  }

  consumeMana(amount) {
    if (this.mana >= amount) {
      this.mana -= amount;
      return true;
    }
    return false;
  }

  regenerateMana(deltaTime) {
    if (this.mana < this.maxMana) {
      this.mana += GAME_CONFIG.PLAYER.MANA_REGEN * deltaTime;
      this.mana = Math.min(this.mana, this.maxMana);
    }
  }

  regenerateHealth(deltaTime) {
    // Track time since last damage
    this.timeSinceLastDamage += deltaTime;

    // Start healing after 5 seconds of not taking damage
    if (this.timeSinceLastDamage >= 5.0 && this.health < this.maxHealth) {
      const healRate = 5; // HP per second
      this.health += healRate * deltaTime;
      this.health = Math.min(this.health, this.maxHealth);
    }
  }

  updateInvulnerability(deltaTime) {
    if (this.isInvincible) {
      this.invincibilityTimer -= deltaTime;
      if (this.invincibilityTimer <= 0) {
        this.isInvincible = false;
      }
    }
  }

  takeDamage(amount) {
    if (this.isInvincible) return false;

    const actualDamage = amount * GAME_CONFIG.PLAYER.DAMAGE_MULTIPLIER;
    this.health = Math.max(0, this.health - actualDamage);

    // Reset healing timer when taking damage
    this.timeSinceLastDamage = 0;

    this.isInvincible = true;
    this.invincibilityTimer = GAME_CONFIG.COMBAT.INVINCIBILITY_TIME;

    if (this.health <= 0) {
      this.die();
    }

    return true;
  }

  heal(amount) {
    this.health = Math.min(this.health + amount, this.maxHealth);
  }

  addXP(amount) {
    this.xp += amount;

    // Check for level up (could be multiple levels at once)
    while (this.xp >= this.xpToNextLevel) {
      this.xp -= this.xpToNextLevel;
      this.levelUp();
    }
  }

  levelUp() {
    this.level++;
    this.xpToNextLevel = GAME_CONFIG.XP.BASE_XP_TO_LEVEL * this.level;

    // Stat increases
    this.maxHealth += GAME_CONFIG.XP.HEALTH_PER_LEVEL;
    this.health = this.maxHealth; // Full heal on level up
    this.maxMana += GAME_CONFIG.XP.MANA_PER_LEVEL;
    this.mana = this.maxMana; // Full mana restore on level up
    this.levelMultiplier += GAME_CONFIG.XP.DAMAGE_MULTIPLIER_PER_LEVEL;

    // Flag for HUD/renderer to pick up
    this.justLeveledUp = true;
    this.levelUpDisplayTimer = 2.0; // Show for 2 seconds

    console.log(`🎉 Level Up! Now level ${this.level}`);
  }

  die() {
    console.log('💀 Player died!');
    this.health = 0;

    // Trigger game over after a short delay
    setTimeout(() => {
      if (window.game) {
        window.game.onPlayerDeath();
      }
    }, 1000);
  }

  getEntityClasses() {
    const classes = ['entity', 'player', this.animationState];

    if (this.isInvincible) {
      classes.push('invulnerable');
    }

    if (!this.facingRight) {
      classes.push('flipped');
    }

    return classes.join(' ');
  }
}
