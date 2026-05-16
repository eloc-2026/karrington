# 🚀 BONE WORKZ - QUICK START

## Play the Game Right Now

1. **Open Browser**: `http://localhost:5173/`
2. **Click**: "▶ START GAME" button
3. **Play**: Use A/D to move, W to jump, Q to attack

That's it! The game should work immediately.

## Controls

| Key | Action |
|-----|--------|
| **A** or **←** | Move Left |
| **D** or **→** | Move Right |
| **W** or **Space** or **↑** | Jump |
| **Q** | Attack (Bone Projectile) |
| **E** | Summon Minion |

## What You Should See

- **Character**: White skeleton with glowing green eyes standing on ground
- **Enemies**: 2 green goblins and 3 brown slimes moving around
- **Environment**: Purple sky with stars, moon, gray stone platforms
- **HUD**: Top-left shows HP and MANA bars

## Movement Not Working?

### Quick Fix Checklist:
1. ✅ Click START GAME button first
2. ✅ Click on the game area to give it focus
3. ✅ Check console (F12) for error messages
4. ✅ Try clicking "Test Move Right" button in debug panel

### Still Not Working?
Read the full troubleshooting guide: `DIAGNOSTICS.md`

## Menu Options

### Title Screen:
- **START GAME** - New game from beginning
- **CONTINUE** - Load auto-save (appears if save exists)
- **SETTINGS** - Music, SFX, difficulty, FPS toggle
- **CREDITS** - About the game
- **QUIT** - Close game

### Settings:
- Music Volume: 0-100%
- SFX Volume: 0-100%
- Difficulty: Easy / Normal / Hard / Nightmare
- Show FPS: On / Off

## Game Features

### ✅ Currently Working:
- Full character movement (walk, jump)
- Combat system (bone attacks)
- 5 enemies with AI
- Physics and collisions
- Auto-save every 30 seconds
- Death screen with respawn
- Settings menu
- Procedural background music

### 🚧 Coming Soon:
- Gold drops from enemies
- The Scavenger trader NPC
- Player naming system
- Village hub with quests
- NPC trust system
- Cutscenes

## Debug Panel

Bottom-left corner shows:
- **State**: Current game state (should be "playing")
- **Loop**: Game loop status (should be "▶️ Running")
- **Entities**: Number of game objects
- **Player Pos**: Player's X,Y coordinates
- **Player Vel**: Player's velocity
- **Grounded**: Whether player is on ground

## Getting Help

- **How to play**: Read `HOW_TO_PLAY.md`
- **Troubleshooting**: Read `DIAGNOSTICS.md`
- **Technical details**: Read `MOVEMENT_STATUS.md`

## Server Info

- **URL**: http://localhost:5173/
- **Port**: 5173
- **Host**: 0.0.0.0 (accessible from any device on network)

---

**Have fun playing! 💀**
