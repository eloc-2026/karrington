# Class System Implementation - Complete

## Overview
Added a complete class selection system with creepy intro sequence, three unique classes (Mage, Tech, Graver), creator name input, and special dialogue for matching names.

---

## 🎭 NEW FEATURES

### 1. Intro Sequence ("are you there? are we connected?")
**File:** `src/ui/IntroSequence.js`

**What Happens:**
1. **Black screen** fades in after hitting start
2. **White glowing eyes** appear slowly (with blinking animation)
3. **Red flickering text** appears:
   - "are you there? are we connected?"
   - Short pause...
   - "yes good, good.... now tell me who were you?"
4. Fades to class selection

**Features:**
- Typewriter effect for text
- Glowing eyes with blink animation
- Red text with flicker effect
- Atmospheric build-up

---

### 2. Class Selection System
**File:** `src/ui/ClassSelection.js`

**Three Classes:**

#### 🔮 MAGE - Wielder of Arcane Fire
- **Primary (X Key)**: Blue Flame Magic
  - Costs 2 mana per shot
  - Fires blue flame projectiles
  - Medium damage (25)
  - Fast cooldown (0.3s)
- **Secondary (Z Key)**: Necromancy
  - Standard necromancy power
  - 10 mana cost
  - 20 damage
- **Stats:**
  - Health: 80 (lower)
  - Mana: 150 (highest!)
  - Move Speed: 300
  - Jump: -480
- **Visual:**
  - Blue glowing eyes (#4488ff)
  - Dark blue robes
  - Mystical appearance

#### 🤖 TECH - Cyber-Enhanced Warrior
- **Primary (X Key)**: Plasma Gun
  - Costs 1 mana per shot
  - Rapid fire (0.2s cooldown)
  - Fast projectiles (600 speed)
  - 18 damage
- **Secondary (Z Key)**: EMP Blast
  - 15 mana cost
  - 30 damage
  - 1.0s cooldown
- **Stats:**
  - Health: 120 (highest!)
  - Mana: 100
  - Move Speed: 340
  - Jump: -460
  - **SPECIAL:** 30% damage reduction (0.7 multiplier)
- **Visual:**
  - Cyan glowing eyes (#00ffaa)
  - Gray armor plating
  - Metallic appearance

#### ⚔️ GRAVER - Master of the Blade
- **Primary (X Key)**: Sword Slash
  - FREE (0 mana cost!)
  - Melee attack (60 range)
  - High damage (35)
  - 0.5s cooldown
- **Secondary (Z Key)**: Magic Slash
  - Ranged projectile
  - 8 mana cost
  - 28 damage
  - Red slashing projectile
- **Stats:**
  - Health: 110
  - Mana: 90
  - Move Speed: 360 (fastest!)
  - Jump: -500 (highest!)
  - Takes 10% more damage (1.1 multiplier)
- **Visual:**
  - Red glowing eyes (#ff4444)
  - Dark red/blood-stained cloth
  - Warrior appearance

---

### 3. Vessel Naming
**After Class Selection:**

Red text appears:
> "Ah I see good, very very good... now shall we name the vessel?"

Then shows naming screen for player name (vessel name).

---

### 4. Creator Name System
**File:** `src/ui/CreatorNameScreen.js`

**After Vessel Naming:**

Red text asks:
> "I see what an amazingly horrific choice... what is the name of the creator?"

Player enters creator name.

**Special Case - Names Match:**
If creator name == vessel name:
1. **Laugh sound plays** (needs to be added to audio system)
2. Special dialogue:
   > "yes yes of course... the vessel, the puppet and the creator are one in the same..."
3. **White screen flash**
4. Game starts

**Normal Case - Names Different:**
1. Dialogue:
   > "Very well, [creator name]... Let the vessel awaken..."
2. **White screen flash**
3. Game starts

---

## 📁 NEW FILES CREATED

1. **`src/ui/IntroSequence.js`** - Black screen with eyes and dialogue
2. **`src/ui/ClassSelection.js`** - Three class cards with selection
3. **`src/ui/CreatorNameScreen.js`** - Creator name input with matching logic
4. **`src/entities/PlayerClasses.js`** - Class definitions and stats

---

## 📝 FILES MODIFIED

### 1. `src/entities/Player.js`
**Changes:**
- Added `playerClass` parameter to constructor
- Class-specific stats (health, mana, speed, jump, damage multiplier)
- `primaryCooldown` and `secondaryCooldown` tracking
- `creatorName` property
- `usePrimaryAbility()` - X key handler
- `useSecondaryAbility()` - Z key handler
- `performMeleeAttack()` - For Graver's sword
- `fireProjectile()` - For ranged attacks
- Uses class stats for movement and jump

### 2. `src/core/Game.js`
**Changes:**
- Added imports for new UI systems
- Completely rewrote `startNewGame()`:
  1. Shows IntroSequence
  2. Shows ClassSelection
  3. Shows NamingScreen
  4. Shows CreatorNameScreen
  5. Calls `initializeGame()`
- New `initializeGame()` method
- New `loadLevelWithClass()` method
- Stores `selectedClass`, `selectedVesselName`

### 3. `src/ui/NamingScreen.js`
**Changes:**
- Now accepts `onNameConfirmed` callback parameter
- Calls callback with player name instead of starting game directly
- Default name changed to "Vessel"

### 4. `src/systems/ThreeJSRenderer.js`
**Changes:**
- Added `playerClass` property
- New `setPlayerClass(className)` method
- **Class-specific eye colors:**
  - Mage: Blue (#4488ff)
  - Tech: Cyan (#00ffaa)
  - Graver: Red (#ff4444)
- **Class-specific cloth colors:**
  - Mage: Dark blue robes
  - Tech: Gray metallic armor
  - Graver: Red-tinted battle cloth
- Eye glow light matches class color

---

## 🎮 PLAYER FLOW

```
Main Menu
    ↓
[START] button clicked
    ↓
Black Screen + Intro Sequence
    - Eyes appear
    - "are you there? are we connected?"
    - "yes good, good.... now tell me who were you?"
    ↓
Class Selection Screen
    - Choose: Mage, Tech, or Graver
    ↓
Class Confirmation
    - "Ah I see good, very very good..."
    - "now shall we name the vessel?"
    ↓
Vessel Naming Screen
    - Enter player/vessel name
    ↓
Creator Name Screen
    - "I see what an amazingly horrific choice..."
    - "what is the name of the creator?"
    - Enter creator name
    ↓
IF names match:
    - Laugh sound
    - "yes yes of course... the vessel, the puppet and the creator are one in the same..."
    - White flash
ELSE:
    - "Very well, [name]... Let the vessel awaken..."
    - White flash
    ↓
GAME STARTS with selected class
```

---

## 💾 SAVE DATA

The game now stores:
- `player.name` - Vessel name
- `player.creatorName` - Creator name
- `player.playerClass` - Selected class
- Class-specific stats

---

## 🎨 VISUAL DIFFERENCES BY CLASS

| Element | Mage | Tech | Graver |
|---------|------|------|--------|
| **Eye Color** | Blue (#4488ff) | Cyan (#00ffaa) | Red (#ff4444) |
| **Eye Glow** | Blue light | Cyan light | Red light |
| **Cloak/Armor** | Dark blue robes | Gray metallic | Red-stained cloth |
| **Cloth Tone** | Blue-tinted | Metallic gray | Blood-tinted |
| **Metalness** | 0.0 (fabric) | 0.4 (armor) | 0.0 (fabric) |

---

## 🎯 COMBAT DIFFERENCES

### Mage (Ranged Caster)
- **Playstyle**: Stay at range, spam blue flames
- **Strength**: Highest mana pool, low mana cost attacks
- **Weakness**: Fragile (lowest health)
- **X Key**: Blue flame (2 mana, 25 damage, fast)
- **Z Key**: Necromancy (10 mana, 20 damage)

### Tech (Tank/Gunner)
- **Playstyle**: Frontline fighter with rapid fire
- **Strength**: Takes 30% less damage, high health
- **Weakness**: Slower movement
- **X Key**: Plasma gun (1 mana, 18 damage, FAST fire rate)
- **Z Key**: EMP blast (15 mana, 30 damage, AOE)

### Graver (Melee/Hybrid)
- **Playstyle**: Up-close sword fighter with magic support
- **Strength**: FREE melee attacks, fast movement, high jump
- **Weakness**: Must get close (risky), takes more damage
- **X Key**: Sword slash (FREE, 35 damage, melee)
- **Z Key**: Magic slash (8 mana, 28 damage, ranged)

---

## 🔊 AUDIO NEEDED

**TO ADD to AudioSystem.js:**

1. **Intro Music**: "system error are we.... connected"
   - Dark, eerie, glitchy music
   - Plays during intro sequence
   - Should be scary/atmospheric

2. **Laugh Sound Effect**
   - Creepy laugh for matching names
   - Triggered when creator name == vessel name

### How to Add:
```javascript
// In AudioSystem.js
this.music = {
  intro: 'path/to/intro_music.mp3', // Add this
  level1: 'path/to/level1.mp3',
  // ...
};

this.sounds = {
  laugh: 'path/to/laugh.mp3', // Add this
  attack: 'path/to/attack.mp3',
  // ...
};
```

---

## 🐛 TESTING CHECKLIST

### Intro Sequence
- [ ] Black screen appears
- [ ] Eyes fade in and blink
- [ ] Red text appears with typewriter effect
- [ ] Text flickers
- [ ] Proper timing between dialogue
- [ ] Fades to class selection

### Class Selection
- [ ] Three class cards appear
- [ ] Hover effects work
- [ ] Each card shows correct info
- [ ] Clicking a class shows confirmation
- [ ] "Ah I see good..." dialogue appears

### Vessel Naming
- [ ] "now shall we name the vessel?" appears
- [ ] Input field appears
- [ ] Can type name
- [ ] Enter key or button works
- [ ] Proceeds to creator name

### Creator Name
- [ ] "what is the name of the creator?" appears
- [ ] Input field appears
- [ ] Can type name
- [ ] **Test matching names** → Laugh + special dialogue
- [ ] **Test different names** → Normal dialogue
- [ ] White flash occurs
- [ ] Game starts

### In-Game Class Differences
- [ ] **Mage**: Blue eyes, blue robes, X fires blue flames
- [ ] **Tech**: Cyan eyes, gray armor, X fires rapidly
- [ ] **Graver**: Red eyes, red cloth, X does melee attack
- [ ] Each class has correct stats (check HUD)
- [ ] Movement speed feels different
- [ ] Jump height differs
- [ ] Damage taken/dealt is correct

---

## 🎮 CONTROLS

**All Classes:**
- **A/D or ← →**: Move left/right
- **W/Space/↑**: Jump
- **X**: Primary ability (class-specific)
- **Z**: Secondary ability (class-specific)
- **I**: Interact with NPCs
- **E**: Summon (if available)
- **Esc/P**: Pause

**Class-Specific X Key:**
- **Mage**: Blue flame magic (2 mana)
- **Tech**: Plasma gun shot (1 mana)
- **Graver**: Sword slash (FREE melee)

**Class-Specific Z Key:**
- **Mage**: Necromancy attack (10 mana)
- **Tech**: EMP blast (15 mana)
- **Graver**: Magic slash projectile (8 mana)

---

## 📊 STATS COMPARISON

| Stat | Mage | Tech | Graver |
|------|------|------|--------|
| Max Health | 80 | 120 | 110 |
| Max Mana | 150 | 100 | 90 |
| Move Speed | 300 | 340 | 360 |
| Jump Power | -480 | -460 | -500 |
| Damage Mult | 1.0 | 0.7 | 1.1 |
| Primary Cost | 2 mana | 1 mana | FREE |
| Primary DMG | 25 | 18 | 35 |
| Primary Type | Ranged | Ranged | Melee |

---

## 🚀 HOW TO TEST

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open the game**: http://localhost:5174/

3. **Click "New Game"** or "Start"

4. **Watch the intro**:
   - Black screen
   - Eyes appear
   - Red text dialogue

5. **Choose a class**:
   - Click Mage, Tech, or Graver
   - Read the abilities

6. **Name your vessel**:
   - Enter any name

7. **Name the creator**:
   - **To test special dialogue**: Enter the SAME name as vessel
   - **To test normal flow**: Enter a different name

8. **Play and test**:
   - Press X for primary ability
   - Press Z for secondary ability
   - Check HUD for correct stats
   - Verify visual appearance matches class

---

## ✅ COMPLETION STATUS

- ✅ Intro sequence with eyes and dialogue
- ✅ Class selection system (3 classes)
- ✅ Class definitions with unique stats
- ✅ Vessel naming
- ✅ Creator naming with matching logic
- ✅ White screen flash
- ✅ Class-specific player models (eye colors, cloth colors)
- ✅ Class-specific abilities (X and Z keys)
- ✅ Special dialogue for matching names
- ⚠️ Laugh sound effect (placeholder - needs audio file)
- ⚠️ Intro music (placeholder - needs audio file)

**Missing:** Audio files (laugh.mp3, intro_music.mp3)

---

## 🎵 MUSIC REQUEST

**Track Name**: "system error are we.... connected"

**Style Requirements:**
- Dark, eerie atmosphere
- Slightly glitchy/corrupted sound
- Minimal, atmospheric
- Hints of static or distortion
- Should feel unsettling
- ~30-60 seconds (loops during intro)

**Mood**: Creepy, mysterious, technological horror

---

**Status**: ✅ Class system fully implemented!
**Server**: Running on http://localhost:5174/
**Ready**: Play and test all three classes!
