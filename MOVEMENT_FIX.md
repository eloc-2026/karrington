# MOVEMENT DEBUG GUIDE

## To test movement:

1. Open browser to http://localhost:5174/
2. Click "START GAME" button on title screen
3. Open browser console (F12)
4. Press A, D, or arrow keys

## What you should see in console:

When you press A or D:
- `🎹 Key pressed: a` or `🎹 Key pressed: d`
- `⬅️ Moving LEFT, velX: -320` or `➡️ Moving RIGHT, velX: 320`
- `🚶 Player moved: from X to Y`

## If you see the key pressed but no movement:
- Game loop might not be running
- Physics might not be updating
- Rendering might not be working

## If you don't see key pressed:
- Input system not initialized
- Event listeners not attached
- Browser focus issue

## Manual Test:
In the console, type:
```javascript
game.player.position.x += 100
```

If the character moves, it's an input/physics issue.
If the character doesn't move, it's a rendering issue.
