# 🤝 SPARE SYSTEM - HOW IT WORKS

## Overview

The spare system allows you to convert enemies into friendly allies instead of killing them. This is a core morality mechanic that affects your ending.

## How to Spare Enemies

### Step 1: Lower Their Health
- Attack the enemy until their health drops **below 25%**
- They will start **flashing bright green** when vulnerable
- You'll see a pulsing green glow around them

### Step 2: Get Close
- Stand within **60 pixels** of the vulnerable enemy
- You need to be close for the spare to work

### Step 3: Press X
- Press the **X** key while standing near a vulnerable enemy
- "SPARED" text will appear in glowing cyan
- The enemy will be converted to friendly

## What Happens When You Spare

### Enemy Becomes Friendly:
1. **Visual Changes**:
   - 💚 Green heart appears above their head
   - Color shifts to lighter/friendlier tones (hue rotation)
   - Glowing light green aura
   - Heart floats up and down gently

2. **Behavior Changes**:
   - **Won't attack you anymore**
   - **Follows you around** at a distance (70-80 pixels)
   - Moves slower when following (60-70% of normal speed)
   - Stays near you like a companion

3. **Stats Restored**:
   - Health fully restored to maximum
   - Attack ability disabled (canAttack = false)

4. **Morality Points**:
   - Awards morality points (affects ending)
   - Sparing is the "good" path

## Requirements for Sparing

✅ Enemy must be **vulnerable** (health ≤ 25%)
✅ You must be **within 60 pixels** of the enemy
✅ Enemy must **NOT already be friendly**
✅ Must press **X** key

❌ Cannot spare healthy enemies (above 25% HP)
❌ Cannot spare if too far away
❌ Cannot re-spare already friendly enemies

## Health Regeneration System

After you spare enemies and avoid combat, you'll start healing:

### How It Works:
1. Every time you take damage, a **5-second timer** starts
2. After **5 seconds** of not taking damage, you begin healing
3. Heals at **5 HP per second** until full health

### Example:
- You have 60/100 HP
- You avoid enemies for 5 seconds
- Healing starts: 60 → 65 → 70 → 75... → 100
- Takes 8 seconds to fully heal from 60 HP

### Timer Resets:
- Taking damage **resets** the 5-second timer
- You need 5 continuous seconds of safety to heal

## Strategy Tips

### Best Approach:
1. **Attack enemy** until they flash green (≤25% HP)
2. **Back away** to avoid taking damage
3. **Approach carefully** when they're vulnerable
4. **Press X** to spare
5. **Wait 5 seconds** for healing to start
6. **Collect friendly allies** as you progress

### Managing Friendly Enemies:
- Friendly enemies follow at 70-80 pixel distance
- They won't get in your way
- They create a "safe zone" by their presence
- Can have multiple friendly followers

### Combat vs Sparing:
**Kill Enemies**:
- ✅ Faster (no need to wait for vulnerable state)
- ✅ Less risk (don't need to get close)
- ❌ Evil morality points
- ❌ No healing companions
- ❌ Bad ending path

**Spare Enemies**:
- ✅ Good morality points (better ending)
- ✅ Gain friendly followers
- ✅ Encourages defensive play (enables healing)
- ❌ Takes longer (must lower to 25% HP)
- ❌ More risky (must get close)

## Visual Indicators

### Enemy States:

**Normal Enemy**:
- Regular colors (green goblin, brown slime)
- Hostile, attacks on contact
- No special effects

**Vulnerable Enemy**:
- **Bright green flashing aura**
- Health ≤ 25%
- Can be spared with X

**Friendly Enemy**:
- **💚 Green heart above head**
- **Light green glow**
- **Lighter color tones**
- Follows player peacefully

## Controls

| Key | Action |
|-----|--------|
| Z | Magic Attack (to lower enemy health) |
| X | **Spare** (when enemy is vulnerable) |
| A/D | Move (to get close/away from enemies) |

## Technical Details

### Enemy Types:

**Goblin**:
- Max HP: 15
- Vulnerable at: ≤3.75 HP (25%)
- Follow distance: 80 pixels
- Follow speed: 98 (70% of 140)

**Slime**:
- Max HP: 20
- Vulnerable at: ≤5 HP (25%)
- Follow distance: 70 pixels
- Follow speed: 60 (60% of 100)

### Player Stats:
- Max HP: 100
- Heal rate: 5 HP/second
- Heal delay: 5 seconds after last damage
- Spare range: 60 pixels

## Examples

### Example 1: Sparing a Goblin
1. Goblin has 15 HP
2. Hit with magic (20 damage) → Goblin at 0 HP (dies)
3. **Instead**: Hit once, wait for cooldown, enemy flees... multiple hits
4. Goblin reaches 3 HP (below 25%) → **flashes green**
5. Walk close (within 60 pixels)
6. Press X
7. **SPARED** appears, goblin becomes friendly with 💚 heart
8. Goblin now follows you peacefully

### Example 2: Healing Strategy
1. Fight 3 enemies, HP drops to 40/100
2. Spare 2 enemies when vulnerable
3. Back away from remaining enemies
4. Wait 5 seconds (don't get hit)
5. **Healing starts**: 40 → 45 → 50 → 55...
6. After 12 seconds: back to 100 HP
7. Re-engage with full health + 2 friendly followers

### Example 3: Building an Army
1. Spare first goblin → follows you
2. Spare first slime → follows you
3. Now you have 2 friendly followers
4. Continue sparing enemies
5. Build up to 5-6 friendly companions
6. They create a "guard" formation around you
7. Good ending path + strategic advantage

## Summary

The spare system rewards:
- **Skill**: Getting enemies to exactly vulnerable state
- **Strategy**: Managing risk of getting close
- **Patience**: Waiting for healing
- **Morality**: Good ending path

**Key to success**: Lower enemy health carefully, spare at the right moment, use healing to recover!
