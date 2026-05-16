# 🎮 BONE WORKZ - COMPLETE FEATURE LIST

## ✅ ALL FEATURES IMPLEMENTED!

Everything you requested has been added to the game! Here's the complete list:

---

## 💰 Gold System

### Gold Drops
- **Enemies drop gold when killed**:
  - Goblins: 3-7 gold
  - Slimes: 5-11 gold
- **Visual**: Spinning gold coins with glowing effects
- **Auto-pickup**: Walk over gold to collect it
- **Notifications**: "+X gold" text appears when collected
- **Display**: Gold shown in HUD (top-left, below mana bar)

### Gold Mechanics
- Gold persists between levels
- Used for buying items from NPCs
- Required for upgrades and services
- Quest rewards grant gold

---

## 🕷️ The Scavenger - Trader NPC

### Character Details
- **6-armed mysterious trader** (represented with 🕷️ icon)
- **Appearance**: White cloak, black face, cyan glowing eyes
- **Location**: Village Hub, left side
- **Starting trust**: 50 (neutral)

### Dialogue System
- **Three options**:
  1. **🛒 Buy Items** - Opens shop
  2. **💰 Sell Items** - Sell your finds
  3. **💬 Talk** - Learn lore, increase trust

### Shop Inventory
| Item | Price | Effect |
|------|-------|--------|
| Health Potion | 20 gold | Restore 30 HP |
| Mana Potion | 15 gold | Restore 40 Mana |
| Bone Charm | 50 gold | +5 Damage |
| Soul Gem | 100 gold | +20 Max Mana |
| Ancient Scroll | 150 gold | Learn Fireball |

### Trust System
- Dialogue changes based on trust level:
  - **<30**: Suspicious, hostile
  - **30-60**: Wary, neutral
  - **>60**: Friendly, helpful
- Buying items increases trust (+5)
- Talking increases trust (+2)
- Higher trust unlocks better dialogue

---

## 👤 Player Naming System

### How It Works
1. **When you start a new game**, naming screen appears
2. **Enter your name** (up to 20 characters)
3. **Press Enter or click** "Begin Your Journey"
4. **Default name**: "Skeleton" if left blank

### Impact on Gameplay
- **NPCs use your name** in all dialogue
- **Trust changes** based on your actions
- **Quest givers** remember who you are
- **Personalized experience** throughout the game

---

## 🏘️ Village Hub - Safe Zone

### Location Layout
- **Main ground**: Continuous floor, no enemies
- **Blacksmith** (left side, platform at y=450)
- **Magic School** (center, platform at y=420)
- **Guild Hall** (right side, platform at y=450)
- **7 NPCs** total, each with unique dialogue

### NPCs in Village

#### 1. The Scavenger (🕷️)
- Main trader
- Buy/sell items
- Lore master

#### 2. Guild Master (🛡️)
- Quest giver
- View quest board
- Hunt contracts

#### 3. Blacksmith (⚒️)
- **Upgrade Weapon**: 50 gold (+damage)
- **Repair Armor**: 30 gold (restore HP)
- Trust: Starts at 50

#### 4. Magic Teacher (🧙)
- **Learn Spells**: 100 gold
- **Study Magic**: Increases trust
- Trust: Starts at 40

#### 5. Village Elder (👴)
- **Most distrustful** (starts at 20 trust)
- Gives "Slime Problem" quest
- **Trust grows slowly** with good actions
- Final acceptance is very rewarding

#### 6-7. Wandering NPCs
- **Traveler** (🎒)
- **Merchant** (💼)
- Random dialogue
- Small trust increases

---

## 📜 Quest System

### Quest Types
1. **Kill Quests**: Defeat X enemies
2. **Spare Quests**: Spare X enemies
3. **Collection Quests**: Gather X gold
4. **Boss Hunts**: Defeat powerful enemies

### Available Quests

#### Goblin Hunt
- **Giver**: Guild Master
- **Objective**: Defeat 5 goblins
- **Reward**: 50 gold, 100 exp

#### Slime Problem
- **Giver**: Village Elder
- **Objective**: Clear 8 slimes
- **Reward**: 40 gold, 80 exp

#### The Peaceful Path
- **Giver**: The Scavenger
- **Objective**: Spare 3 vulnerable enemies
- **Reward**: 100 gold, 150 exp

#### Gold Collector
- **Giver**: Merchant
- **Objective**: Collect 100 gold
- **Reward**: 50 gold, 50 exp

### Quest Tracking
- **Active quests** show in notifications
- **Progress updates** as you play
- **Completion notifications** when done
- **Automatic rewards** granted

---

## 🤝 NPC Trust System

### How Trust Works
- **All NPCs start** with different trust levels (20-60)
- **Actions affect trust**:
  - Buying from them: +3 to +5
  - Talking/helping: +2 to +5
  - Completing quests: +5 to +10
  - Killing friendly enemies: -20
  - Aggressive behavior: -10

### Trust Levels
| Level | Emoji | Behavior |
|-------|-------|----------|
| 0-20 | 😠 Hostile | Won't help, rude dialogue |
| 20-40 | 😐 Wary | Cautious, basic services |
| 40-60 | 🙂 Neutral | Normal dialogue, standard prices |
| 60-80 | 😊 Friendly | Better dialogue, small discounts |
| 80-100 | 🤗 Trusted | Best dialogue, special offers |

### Dialogue Changes
**Example - Village Elder**:
- **Trust <30**: "A skeleton... in our village? This is unsettling."
- **Trust 30-60**: "Perhaps I judged you too harshly. You've proven yourself."
- **Trust >60**: "My friend! The village is safer with you here."

---

## 🎬 Cutscene System

### When Cutscenes Play
- **Intro**: Game start (skeleton's awakening)
- **Village Arrival**: First time entering village hub
- **Boss Intro**: Before major boss fights
- **Endings**: Based on morality choices

### Cutscene Features
- **Story sequences** with narrator
- **Character dialogue**
- **Background icons** for atmosphere
- **Continue/Skip** options
- **Pauses gameplay** automatically

### Example Cutscenes

**Intro Cutscene**:
```
🌑 "Long ago, a terrible curse fell upon this land..."
💀 "The dead rose from their graves, twisted by dark magic."
✨ "But one skeleton... was different."
```

**Village Arrival**:
```
🏘️ "You stumble upon a small village..."
😨 "The villagers look at you with fear and suspicion."
❓ "Can you prove you're different from the other monsters?"
```

---

## 🎮 Complete Controls

| Key | Action |
|-----|--------|
| **A** / **←** | Move Left |
| **D** / **→** | Move Right |
| **W** / **Space** / **↑** | Jump |
| **Z** | Magic Attack |
| **E** | Summon Minion |
| **X** | Spare Enemy (when vulnerable) |
| **I** | Interact with NPC |
| **Esc** / **P** | Pause |

---

## 🗺️ Level System

### Level 1: The Crypt Awakening
- **12 enemies** (6 Goblins, 6 Slimes)
- **Combat tutorial** level
- **Continuous ground** (no holes)
- **Multiple platforms** for exploration

### Village Hub: Safe Zone
- **No enemies**
- **7 NPCs** to interact with
- **Shops and services**
- **Quest board**
- **Rest and resupply**

### Future Levels
- System ready for expansion
- Easy to add new levels
- NPC and quest integration

---

## 💎 Morality & Endings

### Morality Actions
- **Kill enemies**: +1 evil
- **Spare enemies**: +2 good
- **Help NPCs**: +8 good
- **Kill NPCs**: +10 evil

### Three Endings
1. **UNDEAD_KING** (Evil ≥80): Rule through fear
2. **UNLIKELY_HERO** (Good ≥60): Save the realm
3. **GRAVE_ROT** (Neutral): Wander forever

---

## 🎨 Visual Features

### Enhanced Graphics
- **Brown & purple title screen**
- **Graveyard/scrapyard background** with rust falling
- **Skeleton warrior + dragon** silhouette
- **Glowing gold coins**
- **NPC character designs**
- **Dialogue boxes** with speaker icons
- **Shop UI** with item cards
- **Quest notifications**
- **Cutscene backgrounds**

### Animations
- Gold coins spinning
- NPC glow effects (Scavenger)
- Friendly enemy hearts
- Dialogue slide-ins
- Quest notifications
- Health regeneration glow

---

## 🔄 All Game Systems

### Working Systems
✅ Movement & Physics
✅ Combat & Damage
✅ Spare & Friendly system
✅ Health Regeneration (5s delay)
✅ Gold drops & economy
✅ Dialogue system
✅ Shop system
✅ Quest system
✅ Trust/Relationship system
✅ Player naming
✅ NPC interactions
✅ Cutscenes
✅ Save/Load
✅ Settings menu
✅ Auto-save
✅ Death screen
✅ Title screen
✅ HUD with HP/Mana/Gold
✅ Procedural music
✅ Sound effects
✅ Morality tracking
✅ Multiple endings

---

## 🚀 How to Access New Content

### Start New Game
1. Click "START GAME"
2. **Enter your name**
3. Play through Level 1
4. **Collect gold** from defeated enemies
5. **Find the exit** or portal to Village Hub

### Village Hub Access
- **Beat Level 1** OR
- **Use dev command**: `window.game.loadLevel(new VillageHub())` in console
  - Need to import: Add this to console first:
  ```javascript
  import('/src/levels/VillageHub.js').then(({VillageHub}) => {
    window.game.loadLevel(new VillageHub());
  });
  ```

### Interact with NPCs
1. Walk close to NPC (within 80 pixels)
2. Press **I** key
3. **Choose dialogue option**
4. Buy items, accept quests, or just talk

### Complete Quests
1. Accept quest from NPC
2. Complete objective (visible in notifications)
3. **Auto-rewards** granted on completion
4. Return to NPC for new quests

---

## 📝 Summary

**Everything you requested is now in the game!**

✅ Gold drops from enemies
✅ The Scavenger trader (6 arms, white cloak, cyan eyes)
✅ Buy/Sell/Talk dialogue options
✅ Player naming system (affects NPC dialogue)
✅ Village hub with multiple NPCs
✅ Blacksmith, Magic School, Guild
✅ Quest system (side quests, boss hunts)
✅ NPC trust system (gradually warm up)
✅ Cutscenes
✅ Everything balanced and working!

---

**Play now at**: `http://localhost:5173/`

**Have fun building your skeleton's legacy!** 💀✨
