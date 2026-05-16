# Gravity System Fix - Complete Documentation

## Problem
The character was floating up instead of staying grounded, making the game unplayable.

## Root Causes Identified

### 1. **Incorrect Collision Resolution**
- The collision system was checking `entity.position.y < platform.position.y` without considering velocity
- This caused entities to be pushed in the wrong direction during collision resolution

### 2. **Poor Initial Positioning**
- Player was spawning at y=400, which is 150 pixels above the ground (y=550)
- This caused immediate falling which could interact badly with collision

### 3. **Excessive Debug Logging**
- Hundreds of console.log statements per second were slowing down the physics calculations
- This created timing issues that made physics appear broken

### 4. **Update Order Issues**
- Physics and collision systems had the right order, but needed cleaner separation

## Solutions Applied

### 1. **Fixed Collision Resolution** (CollisionSystem.js)
**Before**: Collision based only on position comparison
```javascript
if (entity.position.y < platform.position.y) {
  // Hit from top
}
```

**After**: Collision based on velocity direction (proper physics)
```javascript
if (entity.velocity && entity.velocity.y >= 0) {
  // Entity is falling or on ground - land on top
  entity.position.y = platform.position.y - entity.size.height;
  entity.velocity.y = 0;
  entity.isGrounded = true;
}
```

### 2. **Fixed Initial Player Position** (Level1.js)
**Before**: Player spawned floating in air
```javascript
const player = new Player(100, 400); // 150px above ground
```

**After**: Player spawns ON the ground
```javascript
const player = new Player(100, 502); // On ground (550 - 48 = 502)
```

### 3. **Removed Debug Logging**
Removed all excessive logging from:
- `CollisionSystem.js` - Removed all console.log in update loops
- `PhysicsSystem.js` - Removed position tracking logs
- `Player.js` - Removed movement and jump logs
- `main.js` - Removed global keyboard listener
- `NecromancyPower.js` - Removed projectile creation logs
- `Game.js` - Removed critical zone logging

### 4. **Improved Player Initialization** (Player.js)
**Added**:
```javascript
this.isGrounded = true; // Start grounded
this.velocity.x = 0;    // Ensure zero velocity
this.velocity.y = 0;
```

### 5. **Fixed Respawn Position** (Game.js)
Updated respawn to place player on ground with zero velocity and grounded state.

## How the Gravity System Now Works

### Correct Order of Operations (each frame):
1. **Entity Update** - Player handles input, sets velocity
2. **Physics Update** - Gravity applied, position updated based on velocity
3. **Collision Detection** - Check for platform intersections
4. **Collision Resolution** - Fix positions, set grounded state, zero velocity
5. **Combat Update** - Process damage, etc.
6. **Cleanup** - Remove inactive entities

### Physics Constants (Constants.js):
```javascript
GRAVITY: 980,              // Pulls down (positive Y direction)
TERMINAL_VELOCITY: 600,    // Max falling speed
JUMP_POWER: -480,          // Negative = upward
```

### Coordinate System:
- Y=0 is at TOP of screen
- Y increases DOWNWARD
- Gravity is POSITIVE (pulls down)
- Jump velocity is NEGATIVE (pushes up)

## Prevention Checklist

To prevent gravity/physics issues in the future:

### ✅ Always check:
1. **Collision resolution uses velocity direction**, not just position
2. **Entities spawn with correct grounded state** if on a platform
3. **Velocity is zeroed** when appropriate (landing, hitting walls)
4. **Bounds are updated** after any position change
5. **Debug logging is minimal** in update loops
6. **Update order is consistent**: Entity → Physics → Collision → Combat

### ❌ Never:
1. Set position without updating bounds
2. Resolve collisions based only on position (ignore velocity)
3. Add console.log in per-frame update loops
4. Spawn entities floating in mid-air (unless intentional)
5. Apply physics after collision (wrong order)
6. Modify velocity without considering grounded state

## Testing the Fix

### Expected Behavior:
1. ✅ Player spawns standing on ground
2. ✅ Player stays on ground until jump key pressed
3. ✅ Jumping applies upward velocity
4. ✅ Gravity pulls player back down
5. ✅ Landing sets isGrounded=true and velocity.y=0
6. ✅ Movement is smooth with no floating
7. ✅ Enemies also respect gravity properly

### If Problems Recur:
1. Check `entity.velocity.y` - should be 0 when grounded
2. Check `entity.isGrounded` - should be true when on platform
3. Check collision resolution is using velocity direction
4. Verify no rogue code is modifying position directly
5. Ensure bounds are updated after position changes

## Files Modified
- `src/systems/CollisionSystem.js` - Fixed collision resolution
- `src/systems/PhysicsSystem.js` - Removed debug logging
- `src/levels/Level1.js` - Fixed spawn position
- `src/entities/Player.js` - Fixed initialization and reduced logging
- `src/core/Game.js` - Fixed respawn and cleaned update logic
- `src/powers/NecromancyPower.js` - Removed logging
- `main.js` - Removed global keyboard listener

---

**Status**: ✅ FIXED - Gravity system now works correctly. Character starts grounded and stays grounded until jumping.
