# 🎮 BONE WORKZ - RECENT CHANGES

## Title Screen Updates

### Visual Changes:
1. **New Background**: Graveyard/scrapyard theme with rust falling from the sky
   - Dark graveyard atmosphere
   - Animated rust particles falling continuously
   - Brown and purple color scheme

2. **Title Styling**:
   - Changed skeleton emojis from 💀 to ☠️
   - Added 🦴 bone emojis to subtitle
   - **New colors**: Brown (#a67c52) and purple (#6b4a8e) gradient
   - Glowing brown/purple shadow effects
   - Rusty, weathered appearance

3. **Hero Art**:
   - Skeleton warrior in armor (⚔️ symbol)
   - Standing on dragon body (🐉 symbol)
   - Shadow sword raised to the sky
   - Epic background silhouette

## Gameplay Changes

### Enemy Balancing:
**REDUCED DAMAGE AND HP** - Enemies are now easier to defeat:

| Enemy Type | Old HP | New HP | Old Damage | New Damage |
|------------|--------|--------|------------|------------|
| Goblin     | 30     | **15** | 8          | **4**      |
| Slime      | 40     | **20** | 10         | **5**      |

### Level 1 Updates:

1. **More Enemies**: Increased from 5 to **12 total enemies**
   - 6 Goblins
   - 6 Slimes
   - Spread across ground and platforms

2. **Fixed First Enemy Spawn**:
   - First goblin moved from x=200 to x=350
   - No longer spawns right on top of player
   - Player spawns at x=100, first goblin now at x=350 (250px away)

3. **Removed the Hole**:
   - Ground is now **continuous** from start to finish
   - No gaps to fall through
   - Full 1200px solid platform

### New Spare System:

Press **X** to spare vulnerable enemies!

**How it works:**
1. Attack an enemy to reduce their health
2. When enemy health drops below 25%, they **flash green** (vulnerable state)
3. Stand near them (within 60 pixels)
4. Press **X** to spare them
5. Enemy disappears peacefully with "SPARED" text
6. Earns morality points (good ending path)

**Visual Indicators:**
- Vulnerable enemies glow with **bright green pulses**
- Filter brightness increases
- Drop shadow with cyan/green color
- "SPARED" text appears in glowing cyan when successful

**Controls:**
- **X** key to spare
- Must be close to enemy (60 pixel range)
- Enemy must be vulnerable (≤25% health)
- Only one enemy at a time

## Technical Changes

### Files Modified:

1. **style.css**:
   - `.menu-overlay`: New graveyard/rust background with animation
   - `.menu-container`: Brown/purple theme, hero silhouettes
   - `.game-title h1`: Brown-to-purple gradient text
   - `.entity.enemy.vulnerable`: Green flash animation
   - `.floating-text.spare-text`: Cyan glow effect

2. **src/ui/MenuSystem.js**:
   - Changed title emojis: 💀 → ☠️
   - Added bone emojis: 🦴
   - Updated controls footer to show X for spare

3. **src/utils/Constants.js**:
   - Reduced Goblin HP: 30 → 15
   - Reduced Goblin damage: 8 → 4
   - Reduced Slime HP: 40 → 20
   - Reduced Slime damage: 10 → 5
   - Added GOBLIN config to ENEMIES section
   - Changed SPARE key: 'm'/'M' → 'x'/'X'

4. **src/entities/Player.js**:
   - Added `attemptSpare()` method
   - Handles X key press
   - Checks for vulnerable enemies in range
   - Awards morality points
   - Shows "SPARED" text effect

5. **src/entities/enemies/Goblin.js**:
   - Updated stats to match new HP/damage
   - Enhanced `getEntityClasses()` to add 'vulnerable' class

6. **src/entities/enemies/ZombieSlime.js**:
   - Enhanced `getEntityClasses()` to add 'vulnerable' class

7. **src/levels/Level1.js**:
   - Increased enemies from 5 to 12
   - Moved first goblin spawn from x=200 to x=350
   - Changed ground platforms: removed gap, made continuous floor
   - Added enemies to all platforms (ground, mid, upper)

## What You'll See

### Title Screen:
- ☠️ BONE WORKZ ☠️ in brown-purple gradient
- 🦴 A Skeletal Adventure 🦴 subtitle
- Rust particles falling in background
- Dark graveyard atmosphere
- Faint sword (⚔️) and dragon (🐉) silhouettes

### In-Game:
- 12 enemies total (previously 5)
- Continuous ground (no holes)
- Enemies flash bright green when low on health
- Press X near green-flashing enemies to spare them
- "SPARED" appears in glowing cyan text
- Enemies are weaker (easier to defeat)
- First enemy doesn't spawn on you anymore

## Balance Notes

The game should now be:
- ✅ **Easier** - Enemies deal less damage and have less HP
- ✅ **More forgiving** - No holes to fall into
- ✅ **More challenging** - 12 enemies instead of 5
- ✅ **More strategic** - Choice to spare or kill affects morality
- ✅ **Fairer** - First enemy doesn't ambush you at spawn

## Controls Reference

| Key | Action |
|-----|--------|
| A / ← | Move Left |
| D / → | Move Right |
| W / Space / ↑ | Jump |
| Q | Attack (Bone) |
| E | Summon |
| **X** | **Spare Enemy** ⭐ NEW |

---

**All changes are live!** Refresh your browser at http://localhost:5173/ to see the updates.
