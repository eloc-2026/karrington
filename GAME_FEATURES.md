# Elemental Platformer - Game Features

## 🎮 Current Features

### Visual Environment
- **Dark Night Sky** - Deep purple gradient atmosphere
- **Twinkling Stars** - Animated starfield background
- **Glowing Moon** - Yellow moon with realistic shadows in the top-right
- **Spooky Trees** - Dark silhouette trees in the background for depth

### Player Character
- **Skeleton Sprite** 💀
  - Skull emoji head with glowing effect
  - Visible ribcage and spine details
  - Skeletal body structure
  - Idle floating animation
  - Flashing effect when taking damage

### Heads-Up Display (HUD)
- **Health Bar** (Starts at 100 HP)
  - Green when healthy (>50%)
  - Yellow when injured (25-50%)
  - Red when critical (<25%)
  - Shows current/max HP numbers
  
- **Mana Bar** (Starts at 100 Mana)
  - Blue gradient bar
  - Regenerates over time
  - Shows current/max Mana numbers
  - Used for casting spells

### Enemies
- **Zombie Slime** 👾
  - Brown slime with red glowing eyes
  - Wobbling animation
  - Patrols back and forth
  - Attacks on contact
  - 40 HP each
  - 3 slimes placed in Level 1

### Combat System
- **Necromancy Magic** (Q Key)
  - Fire spinning bone projectiles
  - 20 damage per hit
  - 10 mana cost
  - 0.4 second cooldown
  - Floating damage numbers
  
- **Player Combat**
  - 100 HP starting health
  - Takes 1.2x damage (skeleton is fragile)
  - Invincibility frames after hit
  - Knockback when damaged
  - Life steal: heals 20% of damage dealt

### Physics & Movement
- **Realistic Gravity** - 980 units/s²
- **Smooth Jumping** - Press W/Space/Up Arrow
- **Platform Collisions** - Walk and jump on platforms
- **Camera Following** - Smooth camera tracks player

### Level Design
- **The Crypt Awakening** (Level 1)
  - Multiple platform heights
  - Starting floor with enemy
  - Jump challenges
  - Exit area guarded by slimes
  - 1200px wide × 600px tall

## 🎯 Controls

| Key | Action |
|-----|--------|
| A / Left Arrow | Move Left |
| D / Right Arrow | Move Right |
| W / Space / Up | Jump |
| Q | Fire Bone Attack |
| E | Summon Minion (placeholder) |

## 📊 Stats

### Player Stats
- HP: 100 / 100
- Mana: 100 / 100
- Move Speed: 320
- Jump Power: 480
- Mana Regen: 10/second

### Enemy Stats (Zombie Slime)
- HP: 40
- Damage: 10
- Speed: 100
- Patrol Range: Variable per enemy

## 🎨 Visual Features
- CSS-based 2D graphics
- Smooth animations
- Particle effects (damage numbers)
- Layered environment rendering
- Dynamic lighting effects
- Skeletal character design

## 🚀 How to Play

1. Start the dev server: `npm run dev`
2. Open browser to displayed URL (usually http://localhost:5174)
3. Use A/D to move, Space to jump
4. Press Q to shoot bones at enemies
5. Avoid touching enemies or you'll take damage
6. Watch your HP bar in the top-left!

## 📝 Notes

- Health regeneration is not implemented (only life steal)
- Enemies respawn when killed (coming soon: permanent death)
- Morality system hooks are in place but not active yet
- Additional powers (Soul, Explosion) coming soon
