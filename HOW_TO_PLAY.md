# 🎮 BONE WORKZ - HOW TO PLAY

## 🚀 QUICK START

1. **Open your browser** to: `http://localhost:5173/`

2. **You'll see the title screen:**
   - 💀 BONE WORKZ 💀
   - Glowing green title
   - Menu buttons

3. **Click "START GAME"**
   - This loads Level 1
   - Game loop starts
   - You can now control the skeleton

4. **CONTROLS:**
   - **A** or **Left Arrow** = Move Left
   - **D** or **Right Arrow** = Move Right
   - **W** or **Space** or **Up Arrow** = Jump
   - **Z** = Fire Magic Attack (costs 10 mana)
   - **E** = Summon Minion (placeholder)
   - **X** = Spare Enemy (when enemy is vulnerable - below 25% health)
   - **I** = Interact with NPC ⭐ NEW

## 🐛 IF MOVEMENT DOESN'T WORK

### Open Console (Press F12, click "Console" tab)

You should see these logs when game starts:
```
🎮 Bone Workz - Loading...
🎮 Game initializing...
✅ Input system ready. Press any key to test.
```

### When you click START GAME, you should see:
```
🎮 Starting new game...
📊 Setting game state to PLAYING
▶️ Starting game loop
✅ New game started!
```

### When you press A or D:
```
🎹 GLOBAL key down: a
🎹 Key pressed: a
⬅️ Moving LEFT, vel.x: -320
⚙️ Physics moved player: ...
```

### Debug Commands:

Open console and type:

**Check if player exists:**
```javascript
window.game.player
```

**Check if game loop is running:**
```javascript
window.game.gameLoop.running
```
Should be `true` after clicking START GAME.

**Manually move player:**
```javascript
window.game.player.position.x += 100
```
Character should move right immediately.

**Check input system:**
```javascript
window.game.inputManager.keys
```
Press A, then run this again. Should show 'a' in the Set.

**Force player velocity:**
```javascript
window.game.player.velocity.x = 320
```
Wait 1 second - character should move right.

## 📊 DEBUG PANEL

Bottom-left corner shows:
- **State**: Should be "playing" during gameplay
- **Loop**: Should be "▶️ Running"
- **Entities**: Number of entities (should be 11+)
- **Player Pos**: X,Y coordinates (should change when moving)
- **Player Vel**: Velocity (should change when pressing keys)
- **Grounded**: true when on platform
- **"Test Move Right" button**: Click to test if rendering works

## 🎯 WHAT YOU SHOULD SEE

- **Background**: Dark purple sky with twinkling stars, glowing moon
- **Ground**: Gray stone platforms with green grass on top
- **Player**: White skeleton with glowing green eyes, skull emoji head
  - Should be STANDING ON the first platform
  - NOT floating in the air
- **Enemies**:
  - **12 total enemies** in level 1
  - **6 Goblins** (green with yellow eyes, bouncing) - 15 HP, 4 damage
  - **6 Brown Slimes** (wobbling blobs with red eyes) - 20 HP, 5 damage
  - All move back and forth in patrol patterns
  - Enemies **flash green** when vulnerable - below 25% health (can be spared)
  - **Spared enemies** become **friendly** with 💚 heart above them and follow you!
- **HUD**: Top-left shows HP: 100/100 and MANA: 100/100
- **Enemies**: Should be smoothly roaming back and forth in their patrol zones

## ⚙️ SETTINGS

Click SETTINGS on title screen:
- **Music Volume**: 0-100%
- **SFX Volume**: 0-100%
- **Difficulty**: Easy/Normal/Hard/Nightmare
- **Show FPS**: Toggle FPS display

## 💾 SAVE SYSTEM

- **Auto-saves every 30 seconds** (shows notification top-right)
- **CONTINUE button** on title screen loads your save
- **Progress saved**: Health, Mana, Position, Score, Time

## 💀 DEATH SYSTEM

When enemies kill you:
- Game over screen appears
- Shows enemies defeated and time survived
- Options:
  - **RESPAWN**: Restart at beginning with full health
  - **LOAD LAST SAVE**: Load from auto-save
  - **MAIN MENU**: Return to title

## 🎵 AUDIO

- **Background Music**: Procedural dark ambient theme
- **Sound Effects**:
  - Jump (whoosh up)
  - Attack (swoosh)
  - Hit (thud)
  - Death (descending tones)

## 🎮 CURRENT FEATURES

✅ Title screen with menu
✅ Settings system
✅ Auto-save/load
✅ Death screen
✅ Player movement (A/D, arrows)
✅ Jumping (W, Space)
✅ Attack system (Q - bone projectiles)
✅ Spare system (X - spare vulnerable enemies)
✅ 12 enemies with AI (6 Goblins, 6 Slimes)
✅ Physics and collisions
✅ Beautiful environment
✅ HUD with health/mana bars
✅ Procedural music

## ❌ TROUBLESHOOTING

### Problem: Blank screen
- **Check** console for errors
- **Hard refresh**: Ctrl+Shift+R

### Problem: Can't click START GAME
- **Check** if JavaScript is enabled
- **Try** refreshing page

### Problem: Movement keys don't work
1. Check debug panel shows "Loop: ▶️ Running"
2. Watch console for key press logs
3. Try clicking the "Test Move Right" button in debug panel
4. If that works, it's an input issue
5. Check if another program is capturing keys

### Problem: Character floating in air
- Should be fixed - player spawns at y=502
- Ground platform is at y=550
- Player is 48px tall, so bottom at 550

### Problem: No enemies visible
- Check console for "Enemy created" logs
- Check debug panel shows "Entities: 11+" 
- Try moving around - they might be off-screen

## 📝 NOTES

- Game autosaves to localStorage
- Settings persist between sessions
- All enemies have AI and will attack on contact
- Magic attacks cost 10 mana each (press Z)
- Mana regenerates at 10/second
- Player has 100 HP (increased for better balance)
- Player takes normal damage (1.0x multiplier)
- **Health regeneration**: After 5 seconds without taking damage, heal 5 HP per second
- Invincibility for 0.5s after being hit
- Enemies attack slower: Goblins every 1.2s, Slimes every 1.5s
- Friendly enemies won't attack and will follow you around
