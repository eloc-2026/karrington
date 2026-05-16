# 🔍 DEBUG TEST - What to Check

## Run This Test

1. **Open**: http://localhost:5173/
2. **Hard Refresh**: Ctrl + Shift + R
3. **Open Console**: Press F12, go to Console tab
4. **Click Start Game**

---

## ✅ What You Should See in Console

### When Game Loads:
```
🎮 Bone Workz - Loading...
✅ Goblin created at 350 518 hasGravity: true hasCollision: true
✅ ZombieSlime created at 450 526 hasGravity: true hasCollision: true
(many more enemy creation logs...)
```

**CHECK**: Do enemies have `hasGravity: true` and `hasCollision: true`?

---

### Every Few Seconds:
```
🔧 Collision: 61 entities checked, 59 grounded, 33 platforms
```

**CHECK**: Are enemies being grounded? (number > 0)

---

### When Enemies Move:
```
🚶 Goblin patrolling at x=350, vel=140, grounded=true
🚶 Slime patrolling at x=450, vel=100, grounded=true
🔄 Goblin reversing at left patrol boundary
```

**CHECK**: 
- Is velocity (vel) NOT zero?
- Are enemies grounded=true?
- Do they reverse at boundaries?

---

### When You Attack (Press Q or Z):
```
⚔️ Attack!
🔫 Projectile created at 148 526 velocity: 500
```

**CHECK**: Does projectile get created?

---

### When Projectile Hits Enemy:
```
💥 PROJECTILE HIT DETECTED! Goblin
💥 Projectile hit Goblin for 15 damage!
💀 Goblin died
```

**CHECK**: Do hits get detected?

---

## 🐛 If Enemies Don't Move

### Symptom: Enemies stand still, don't patrol

**Possible Causes**:
1. **Physics system not updating them**
   - Check console for "Goblin patrolling" logs
   - If missing → physics isn't calling enemy update()

2. **Velocity not being applied**
   - Check if "vel=0" in patrol logs
   - Should be "vel=140" for goblins, "vel=100" for slimes

3. **Enemies not on ground**
   - Check "grounded=false" in logs
   - If true → collision system broken

### Fix:
- Check `/home/student/project/src/core/Game.js` line ~340
- Should call `entity.update(deltaTime, this)` for ALL entities
- Should call `physicsSystem.update(entity, deltaTime)` for entities with gravity

---

## 🐛 If Enemies Don't Take Damage

### Symptom: Hit enemies, they don't die

**Possible Causes**:
1. **Projectiles not created**
   - Check for "🔫 Projectile created" log when you press Q/Z
   - If missing → attack system broken

2. **Projectiles don't hit**
   - Check for "💥 PROJECTILE HIT DETECTED!" log
   - If missing → collision detection broken

3. **Enemies don't die**
   - See hit log but no "💀 Goblin died"
   - Check `takeDamage()` method in enemy files

### Fix:
- Projectiles need to move: check Projectile.js update() method
- Projectiles need collision: check `checkEnemyCollisions(game)`
- Enemies need `takeDamage()`: check Goblin.js and ZombieSlime.js

---

## 🐛 If Enemies Float in Air

### Symptom: Enemies hover above ground

**Possible Causes**:
1. **hasCollision = false**
   - Check enemy creation logs
   - Should show `hasCollision: true`

2. **Collision system not checking enemies**
   - Check "🔧 Collision" logs
   - "0 entities checked" → system broken
   - "0 grounded" → collision not working

3. **No platforms**
   - Should see "33 platforms" in collision log
   - If less → level not loading correctly

### Fix:
- Enemy constructors MUST set `this.hasCollision = true`
- Game.js MUST call `collisionSystem.update(this.entities, platforms)`
- NOT `collisionSystem.checkPlayerCollisions(player)` (old broken code)

---

## 🐛 If Enemies Damage From Far Away

### Symptom: Take damage without touching enemy

**This should be FIXED now**

**Old Problem**: CombatSystem was dealing damage on collision
**New Fix**: Enemies handle their own damage through `attack()` method

### Verify Fix:
1. Stand far from enemy (>40px away)
2. Should NOT take damage
3. Walk close to enemy (<40px)
4. Should take damage

**Check**: Look for "⚔️ Player-Enemy collision" logs
- Should only appear when touching enemy

---

## 📊 Expected Game Behavior

### Enemies:
- ✅ Walk back and forth in patrol zones
- ✅ Reverse direction at boundaries
- ✅ Stand on ground (not float)
- ✅ Only attack when player is close (<40px)
- ✅ Take damage from projectiles
- ✅ Die and drop gold when HP = 0

### Player:
- ✅ Move with A/D keys
- ✅ Jump with W/Space
- ✅ Attack with Q or Z
- ✅ See glowing projectiles
- ✅ Stand on ground
- ✅ Take damage only when touching enemy

### Combat:
- ✅ Projectiles fly across screen
- ✅ Projectiles hit enemies
- ✅ Enemies lose HP and die
- ✅ Gold drops appear
- ✅ Player takes damage from close enemies

---

## 🔧 Files That Control This

### Enemy Movement:
- `/home/student/project/src/entities/enemies/Goblin.js` - patrol() method
- `/home/student/project/src/entities/enemies/ZombieSlime.js` - patrol() method
- `/home/student/project/src/systems/PhysicsSystem.js` - applies velocity

### Grounding:
- `/home/student/project/src/systems/CollisionSystem.js` - update() method
- `/home/student/project/src/core/Game.js` - calls collision system

### Combat:
- `/home/student/project/src/entities/Projectile.js` - movement and hit detection
- `/home/student/project/src/systems/CombatSystem.js` - knockback only
- Enemies' `attack()` and `takeDamage()` methods

---

## 🚨 CRITICAL CHECKS

Run these in console to debug:

```javascript
// Check if enemies exist
game.entities.filter(e => e.type === 'enemy').length
// Should return: 59

// Check if enemies have collision
game.entities.filter(e => e.type === 'enemy')[0].hasCollision
// Should return: true

// Check if enemies are moving
let enemy = game.entities.filter(e => e.type === 'enemy')[0];
console.log('Velocity:', enemy.velocity.x, enemy.velocity.y);
// velocity.x should be 100-140, not 0

// Check enemy position over time
let pos1 = enemy.position.x;
setTimeout(() => {
  let pos2 = enemy.position.x;
  console.log('Enemy moved:', pos2 - pos1, 'pixels');
}, 1000);
// Should move ~100-140 pixels in 1 second

// Force create projectile
game.player.necromancyPower.basicAttack(game);
// Should see projectile appear

// Check collision system
game.collisionSystem
// Should exist and have methods
```

---

**Run these tests and report what you see in console!**
