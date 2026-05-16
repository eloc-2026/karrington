# 🆕 LATEST UPDATES - Friendly Enemies & Health Regen

## ✅ New Feature: Friendly Enemies

### What Changed:
**Before**: Sparing enemies removed them from the game
**After**: Sparing enemies converts them to friendly allies!

### How It Works:

1. **Lower enemy health to 25% or below** (they flash green)
2. **Get close** (within 60 pixels)
3. **Press X** to spare
4. Enemy becomes **friendly** with these changes:
   - 💚 **Green heart** appears above their head
   - Color shifts to **lighter/friendlier tones**
   - **Glowing light green aura**
   - **Follows you around** like a companion!
   - **Won't attack** anymore
   - Health **fully restored**

### Following Behavior:

**Goblins**:
- Follow at 80 pixel distance
- Move at 70% normal speed when following
- Stop when close enough

**Slimes**:
- Follow at 70 pixel distance  
- Move at 60% normal speed when following
- Stop when close enough

### Visual Effects:

**Friendly Enemy Appearance**:
- 💚 Heart floats above head (bobs up and down)
- Light green glow/aura around them
- Hue-rotated colors (friendlier appearance)
- Pulsing glow animation

## ✅ New Feature: Health Regeneration

### Passive Healing System:

**When you avoid damage for 5 seconds, you start healing!**

**How It Works**:
1. Every time you take damage → timer resets to 0
2. Timer counts up while you're safe
3. After **5 seconds** without damage → healing begins
4. Heal at **5 HP per second** until full

**Example**:
- You have 50/100 HP
- Avoid enemies for 5 seconds
- Healing starts: 50 → 55 → 60 → 65...
- Takes 10 seconds to reach 100 HP
- **Total: 15 seconds** (5s wait + 10s healing)

**Strategic Implications**:
- Rewards defensive play
- Encourages sparing enemies (creates safe zones)
- No need to die from chip damage
- Can recover between fights

## 🎮 Gameplay Changes

### Enemy Requirements for Sparing:

✅ **Must be vulnerable** (health ≤ 25%)
- Goblin: 15 HP → vulnerable at ≤3.75 HP
- Slime: 20 HP → vulnerable at ≤5 HP

✅ **Must be in range** (within 60 pixels)

✅ **Must not already be friendly**

### Combat System Update:

**Friendly enemies are excluded from combat**:
- Won't damage player even if touching
- Player projectiles can still hit them (be careful!)
- Create safe zones by their presence

## 🎨 Visual Updates

### New CSS Classes:

**`.entity.enemy.friendly`**:
- Hue rotation (90deg) for color shift
- Brightness increase (1.2)
- Glowing drop shadow (light green)
- Pulsing animation

**Friendly heart indicator**:
- 💚 emoji positioned above enemy
- Floats up and down (5px motion)
- 2-second animation loop

### Animation Details:

```
friendly-glow animation:
- 2 second loop
- Pulses between 1.2x and 1.3x brightness
- Light green drop shadow (10-20px)

heart-float animation:
- 2 second loop  
- Moves 5px up and down
- Smooth easing
```

## 📊 Balance Impact

### Sparing vs Killing:

**Kill Enemy**:
- Fast and efficient
- Less risky
- ❌ No allies
- ❌ Evil morality
- ❌ No healing time

**Spare Enemy**:  
- Takes more time (must lower to 25%)
- More risky (get close)
- ✅ Friendly follower
- ✅ Good morality
- ✅ Enables healing strategy

### Healing Enables New Strategies:

**Hit & Run**:
1. Attack enemies
2. Take some damage
3. Spare one enemy  
4. Retreat with friendly ally
5. Wait 5 seconds
6. Heal back to full
7. Re-engage

**Peaceful Route**:
1. Spare all enemies one by one
2. Build army of 12 friendly followers
3. Heal between each spare
4. Complete level without killing anyone
5. Best ending!

## 🔧 Technical Implementation

### Files Modified:

1. **src/entities/Player.js**:
   - Added `timeSinceLastDamage` tracking
   - Added `regenerateHealth()` method
   - Modified `takeDamage()` to reset timer
   - Changed `attemptSpare()` to call `makeFriendly()` instead of destroying

2. **src/entities/enemies/Goblin.js**:
   - Added `isFriendly` flag
   - Added `followTarget` reference
   - Added `makeFriendly()` method
   - Added `followPlayer()` AI behavior
   - Updated `update()` to check friendly state
   - Modified `getEntityClasses()` to add 'friendly' class

3. **src/entities/enemies/ZombieSlime.js**:
   - Same changes as Goblin (friendly system)

4. **src/systems/CombatSystem.js**:
   - Added check: skip damage if enemy is friendly
   - Friendly enemies don't trigger combat

5. **style.css**:
   - Added `.entity.enemy.friendly` styles
   - Added `friendly-glow` animation
   - Added `heart-float` animation
   - Heart emoji (💚) positioned above friendly enemies

### Constants Added:

**Player Healing**:
- Heal delay: 5 seconds
- Heal rate: 5 HP/second

**Enemy Following**:
- Spare range: 60 pixels
- Goblin follow distance: 80 pixels
- Slime follow distance: 70 pixels
- Follow speed multiplier: 0.6-0.7x

## 🎯 Testing Checklist

### Test Sparing:
1. ✅ Attack goblin until vulnerable (green flash)
2. ✅ Walk close and press X
3. ✅ "SPARED" text appears
4. ✅ Goblin shows 💚 heart
5. ✅ Goblin follows player
6. ✅ Goblin doesn't attack
7. ✅ Goblin has light green glow

### Test Healing:
1. ✅ Take damage (e.g., 50 HP remaining)
2. ✅ Avoid all enemies for 5 seconds
3. ✅ Health bar starts increasing
4. ✅ Heals 5 HP per second
5. ✅ Stops at max health (100 HP)
6. ✅ Taking damage resets timer

### Test Following:
1. ✅ Spare enemy
2. ✅ Walk left → enemy follows
3. ✅ Walk right → enemy follows
4. ✅ Enemy maintains distance (70-80px)
5. ✅ Enemy stops when close enough
6. ✅ Multiple friendly enemies all follow

## 🚀 How to Play

### Recommended Strategy:

**Level 1 (12 Enemies)**:

**Aggressive Route** (Kill All):
- Fast but risky
- No healing support
- Evil ending

**Balanced Route** (Spare Some):
- Kill tough enemies
- Spare weak/convenient ones
- Some healing + some allies
- Neutral ending

**Pacifist Route** (Spare All):
- Spare all 12 enemies
- Build army of followers
- Heal between each spare
- Best ending!

### Pro Tips:

1. **Don't over-damage**: Stop attacking at ~25% HP
2. **Use spare range**: Get close but not too close
3. **Heal strategically**: Spare → retreat → wait 5s → heal
4. **Build safe zones**: Friendly enemies create buffer zones
5. **Be patient**: Healing takes time but it's worth it

## 📝 Summary

**Two major new systems**:

1. **Friendly Enemies**:
   - Spare converts enemies to allies
   - They follow you with 💚 hearts
   - Won't attack, create safe zones
   - Visual: light green glow + floating heart

2. **Health Regeneration**:
   - Wait 5 seconds → heal 5 HP/second
   - Rewards defensive/strategic play
   - Enables pacifist route
   - Reduces frustration from chip damage

**Result**: More strategic depth, multiple playstyles, better morality system!

---

**Test it now**: http://localhost:5173/

Spare an enemy and watch them follow you with a heart! 💚
