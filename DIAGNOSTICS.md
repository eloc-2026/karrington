# 🔍 BONE WORKZ DIAGNOSTICS

Use this guide to diagnose why movement might not be working.

## Step 1: Open the Game

1. Open your browser to `http://localhost:5173/`
2. Open the console (F12, then click "Console" tab)
3. You should see these logs:
```
🎮 Bone Workz - Loading...
🎮 Game initializing...
🎮 Binding input events...
✅ Input system ready. Press any key to test.
✅ Game initialized - showing title screen
```

## Step 2: Test Input BEFORE Starting Game

1. Press the 'A' key on your keyboard
2. You should see in console: `🎹 GLOBAL key down: a`
3. If you DON'T see this, your browser is not receiving key events
4. **Solution**: Click anywhere on the page to give it focus, then try again

## Step 3: Start the Game

1. Click the "START GAME" button
2. You should see these logs:
```
🎮 Starting new game...
🎮 Loading level...
👤 Player created at: Vector2 {x: 100, y: 502}
✅ Player created with velocity: Vector2 {x: 0, y: 0}
✨ Created DOM element: {type: 'player', ...}
📊 Setting game state to PLAYING
▶️ Starting game loop...
✅ New game started!
```

## Step 4: Test Movement

1. Press the 'A' key (move left)
2. You should see:
```
🎹 GLOBAL key down: a
🎹 Key pressed: a
⬅️ Moving LEFT, vel.x: -320
⚙️ Physics moved player: {x: ..., y: ..., velX: -320, velY: ...}
```

3. Press the 'D' key (move right)
4. You should see:
```
🎹 GLOBAL key down: d
🎹 Key pressed: d
➡️ Moving RIGHT, vel.x: 320
⚙️ Physics moved player: {x: ..., y: ..., velX: 320, velY: ...}
```

## Step 5: Check Debug Panel

Look at the bottom-left debug panel. It should show:

- **State**: `playing` (not `menu`)
- **Loop**: `▶️ Running` (not `⏸️ Stopped`)
- **Entities**: Should be 11 or more
- **Player Pos**: Should change when you press A/D (the X value should increase/decrease)
- **Player Vel**: Should show velocity when pressing keys
- **Grounded**: Should be `true`

## Common Issues & Solutions

### Issue: No console logs at all
**Problem**: JavaScript not loading
**Solution**: Hard refresh (Ctrl+Shift+R) or check for errors in console

### Issue: "GLOBAL key down" appears but no "Key pressed" log
**Problem**: InputManager not capturing keys
**Solution**: Make sure you clicked START GAME first - keys only work when game is running

### Issue: "Moving LEFT/RIGHT" logs appear but player doesn't move on screen
**Problem**: Rendering issue
**Solution**: 
1. Click the "Test Move Right" button in debug panel
2. If player moves, then input is the issue
3. If player still doesn't move, rendering is broken

### Issue: Player position changes in debug panel but not visible on screen
**Problem**: CSS or rendering issue
**Solution**: 
1. Check if player DOM element exists: Open Elements tab, search for `class="entity player"`
2. If it exists, check its transform style - should be `translate3d(...)`
3. If transform is updating, check CSS in style.css for `.player` class

### Issue: Game state stuck on "menu"
**Problem**: START GAME button not working
**Solution**:
1. Check console for errors when clicking START GAME
2. Try refreshing the page and clicking again
3. Check if MenuSystem is hiding properly

### Issue: Loop shows "⏸️ Stopped"
**Problem**: Game loop not starting
**Solution**:
1. You must click START GAME to start the loop
2. If you clicked and it's still stopped, check console for errors
3. Try: `window.game.gameLoop.start()` in console

## Manual Testing Commands

Open console and type these commands to test manually:

### Check if game exists:
```javascript
window.game
```
Should return the Game object, not undefined.

### Check game state:
```javascript
window.game.stateManager.state
```
Should be `"playing"` when game is running.

### Check if player exists:
```javascript
window.game.player
```
Should return Player object with position, velocity, etc.

### Manually move player:
```javascript
window.game.player.position.x = 400
```
Player should jump to X position 400 immediately.

### Check input system keys:
```javascript
window.game.inputManager.keys
```
Press 'A', then run this again - should show 'a' in the Set.

### Force player velocity:
```javascript
window.game.player.velocity.x = 320
```
Player should start moving right continuously.

### Reset player velocity:
```javascript
window.game.player.velocity.x = 0
window.game.player.velocity.y = 0
```
Player should stop moving.

## If Everything Above Works But Movement Still Doesn't

This means the issue is with the input handling logic. Check:

1. **Keys being checked correctly**: 
```javascript
window.game.inputManager.isKeyDown(['a', 'A'])
```
Press 'A' and run this - should return `true`.

2. **Update loop running**:
```javascript
window.game.gameLoop.running
```
Should be `true`.

3. **Player handleInput being called**:
Add this to Player.handleInput (line 54 in Player.js):
```javascript
console.log('🎮 handleInput called, keys:', input.keys);
```

If you've gone through all these steps and movement still doesn't work, there may be a more complex issue. Let me know what you see in the console and I can help further.
