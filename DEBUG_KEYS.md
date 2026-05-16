# EMERGENCY MOVEMENT DEBUG

## Step 1: Open the game
Go to http://localhost:5173

## Step 2: Open Console (F12)

## Step 3: Type this command to test if player exists:
```javascript
window.game.player
```
Should show player object.

## Step 4: Type this to move player manually:
```javascript
window.game.player.position.x += 100
```
If character moves, rendering works but input doesn't.
If character doesn't move, rendering is broken.

## Step 5: Check if game loop is running:
```javascript
window.game.gameLoop.running
```
Should be `true` after clicking START GAME.

## Step 6: Test input directly:
```javascript
window.game.inputManager.keys
```
Press A or D, then run this again. Should show the key in the Set.

## Step 7: Force movement:
```javascript
window.game.player.velocity.x = 320
```
Wait 1 second. Character should move right.

## If nothing works:
The game might not be starting properly after clicking START GAME button.
Check for errors in console (red text).
