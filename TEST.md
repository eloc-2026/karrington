# DEBUGGING CHECKLIST

## What to Check in Browser Console

1. **Open Browser Console** (F12 or Right-Click > Inspect > Console)

2. **Look for these logs on page load:**
   - "🎮 Elemental Platformer - Loading..."
   - "Game initializing..."
   - "📊 Level data:" with platform/enemy counts
   - "👤 Player created at:"
   - "🧱 Adding platforms..."
   - "👾 Adding enemies..."
   - "✅ Level loaded: X total entities"
   - "✨ Created DOM element:" for each entity

3. **Check the Debug Panel** (bottom-left corner):
   - Should show:
     - State: playing
     - Entities: 11+ (player + platforms + enemies)
     - Player Pos: changing numbers
     - Player Vel: should change when you press keys
     - Grounded: true/false

4. **Test Inputs:**
   - Press **A** or **Left Arrow** - Player Vel should show negative X
   - Press **D** or **Right Arrow** - Player Vel should show positive X
   - Press **Q** - Console should show "⚔️ Attack pressed!"
   - Press **Space** - Console should show "🦘 JUMP!"

5. **Check DOM Elements:**
   - In Elements tab, look for `#game-world` div
   - Should contain multiple `.entity` divs
   - Each should have inline styles with transform

## If Nothing Appears:

1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Clear cache and reload
3. Check console for errors (red text)
4. Make sure dev server is running on correct port

## Expected Behavior:

- Background with purple sky and stars
- Moon in top-right
- HP/Mana bars in top-left
- White skeleton character with green eyes
- Brown slime enemies
- Gray platforms with grass on top
- Debug panel bottom-left showing live stats
