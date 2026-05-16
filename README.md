# 💀 BONE WORKZ ☠️

A skeletal adventure where your choices matter!

## 🎮 Quick Start

```bash
npm run dev
```

Then open: `http://localhost:5173/`

## 🌟 Features

### Core Gameplay
- **Smooth platforming** with physics and collisions
- **Magic combat system** (Z key to attack)
- **Spare mechanic** - convert enemies to friends (X key)
- **Health regeneration** - heal after 5 seconds of safety
- **12 enemies** in first level (6 Goblins, 6 Slimes)

### RPG Systems
- **💰 Gold economy** - enemies drop gold when defeated
- **🛒 Shop system** - buy potions, upgrades, and spells
- **📜 Quest system** - side quests, boss hunts, and missions
- **🤝 Trust system** - NPCs gradually warm up to you
- **👤 Player naming** - NPCs remember and use your name

### NPCs & Village
- **🏘️ Village Hub** - safe zone with 7 NPCs
- **🕷️ The Scavenger** - mysterious 6-armed trader
- **⚒️ Blacksmith** - weapon upgrades and armor repair
- **🧙 Magic Teacher** - learn new spells
- **🛡️ Guild Master** - quest board and contracts
- **👴 Village Elder** - grows from hostile to friendly

### Story & Morality
- **🎬 Cutscenes** - story sequences with narrator
- **😇 Morality system** - your actions affect the ending
- **3 endings** - Undead King, Unlikely Hero, or Grave Rot
- **Dynamic dialogue** - changes based on trust and choices

## 🎯 Controls

| Key | Action |
|-----|--------|
| A / ← | Move Left |
| D / → | Move Right |
| W / Space / ↑ | Jump |
| Z | Magic Attack |
| X | Spare Enemy |
| I | Interact with NPC |
| E | Summon |
| Esc / P | Pause |

## 📖 Documentation

- **[ALL_DONE.md](ALL_DONE.md)** - Summary of all features
- **[COMPLETE_FEATURES.md](COMPLETE_FEATURES.md)** - Full feature documentation
- **[HOW_TO_PLAY.md](HOW_TO_PLAY.md)** - Gameplay guide
- **[SPARE_SYSTEM.md](SPARE_SYSTEM.md)** - How to spare enemies
- **[BALANCE_CHANGES.md](BALANCE_CHANGES.md)** - Recent balance updates

## 🏗️ Project Structure

```
project/
├── index.html              # HTML shell
├── main.js                 # Bootstrap
├── style.css               # All styling
├── src/
│   ├── core/              # Game loop, input, state
│   ├── systems/           # Physics, collision, combat, quests
│   ├── entities/          # Player, enemies, NPCs, gold drops
│   ├── levels/            # Level1, VillageHub
│   ├── ui/                # HUD, menus, dialogue, naming
│   ├── powers/            # Magic abilities
│   └── utils/             # Constants, math helpers
```

## 🎨 Tech Stack

- **Vanilla JavaScript** (ES6 modules)
- **DOM-based rendering** (no Canvas)
- **CSS animations** for all visuals
- **Vite** for dev server and building
- **localStorage** for saves

## 🌟 Highlights

### Visual Design
- **Brown & purple theme** with graveyard aesthetics
- **Rust falling** from sky on title screen
- **Glowing effects** for gold, magic, NPCs
- **Skeleton warrior + dragon** silhouette
- **Detailed enemy designs** (goblins, slimes)
- **Animated UI** for dialogue and shops

### Game Design
- **No holes in ground** - continuous floor
- **Balanced combat** - enemies deal less damage, attack slower
- **Strategic sparing** - gain allies and heal
- **Gold economy** - meaningful rewards
- **Trust progression** - NPCs evolve over time

## 🚀 Development

```bash
# Install dependencies
npm install

# Start dev server (0.0.0.0 for remote access)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎮 How to Play

1. **Start new game** → enter your name
2. **Play Level 1** → defeat or spare enemies
3. **Collect gold** → dropped from enemies
4. **Visit Village Hub** → meet NPCs and shop
5. **Accept quests** → earn rewards
6. **Build trust** → unlock better dialogue
7. **Make choices** → affect your ending

## 🕷️ Meet The Scavenger

The mysterious 6-armed trader offers:
- **Health Potions** (20 gold) - restore 30 HP
- **Mana Potions** (15 gold) - restore 40 mana
- **Bone Charm** (50 gold) - +5 damage
- **Soul Gem** (100 gold) - +20 max mana
- **Ancient Scroll** (150 gold) - learn Fireball

Talk to him to increase trust and unlock lore!

## 📜 Quest Examples

**Goblin Hunt** (Guild Master)
- Defeat 5 goblins → 50 gold + 100 exp

**The Peaceful Path** (The Scavenger)
- Spare 3 enemies → 100 gold + 150 exp

**Slime Problem** (Village Elder)
- Clear 8 slimes → 40 gold + 80 exp + Elder trust

## 🤝 Trust System

NPCs start distrustful but warm up based on your actions:
- **😠 Hostile** (0-20): Won't help
- **😐 Wary** (20-40): Cautious
- **🙂 Neutral** (40-60): Normal service
- **😊 Friendly** (60-80): Better deals
- **🤗 Trusted** (80-100): Best dialogue & offers

## 💫 Morality Endings

Your choices determine the ending:
- **Kill everyone** → **UNDEAD_KING** (evil ending)
- **Spare everyone** → **UNLIKELY_HERO** (good ending)
- **Mixed approach** → **GRAVE_ROT** (neutral ending)

## 🎬 Cutscenes

Experience the story through cinematic sequences:
- **Intro** - Your awakening
- **Village Arrival** - First encounter with humans
- **Boss Battles** - Epic confrontations
- **Endings** - Based on your morality

## 🏆 Credits

Built with ❤️ for skeleton adventurers everywhere!

**Features:**
- Complete RPG systems
- Dynamic NPC interactions
- Moral choice consequences
- Engaging combat and sparing
- Beautiful CSS visuals

---

**Made with Claude Code** 🤖

**Enjoy your skeletal adventure!** 💀✨
