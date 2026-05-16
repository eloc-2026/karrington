/**
 * Integration Tests for Game Playability
 *
 * These tests verify core gameplay mechanics work correctly:
 * - Player spawns grounded
 * - Gravity works properly
 * - Jumping works
 * - Movement works
 * - Collision detection works
 * - Player doesn't fall through platforms
 */

import { Player } from '../src/entities/Player.js';
import { Platform } from '../src/entities/Platform.js';
import { GroundPlane } from '../src/entities/GroundPlane.js';
import { ImprovedPhysicsSystem } from '../src/systems/ImprovedPhysicsSystem.js';
import { ImprovedCollisionSystem } from '../src/systems/ImprovedCollisionSystem.js';
import { GAME_CONFIG } from '../src/utils/Constants.js';
import { AudioSystem } from '../src/systems/AudioSystem.js';

// Test helper functions
function createTestPlayer(x = 100, y = 502) {
  return new Player(x, y);
}

function createTestPlatform(x = 0, y = 550, width = 200, height = 50) {
  return new Platform(x, y, width, height);
}

function simulateFrames(physics, collision, entities, platforms, frames = 60) {
  const deltaTime = 1/60; // 60 FPS

  for (let i = 0; i < frames; i++) {
    // Update physics
    for (const entity of entities) {
      if (entity.hasGravity && entity.active) {
        physics.update(entity, deltaTime);
      }
    }

    // Update collisions
    collision.update(entities, platforms);
  }
}

// ============================================
// TEST 1: Player Spawns Grounded
// ============================================
console.log('🧪 TEST 1: Player Spawns Grounded');
{
  const player = createTestPlayer(100, 502);
  const platform = createTestPlatform(0, 550, 400, 50);
  const physics = new ImprovedPhysicsSystem();
  const collision = new ImprovedCollisionSystem();

  // Initial state
  console.log('  Initial: Y =', player.position.y, 'Grounded =', player.isGrounded);

  // Run collision check
  collision.update([player], [platform]);

  console.log('  After collision: Y =', player.position.y, 'Grounded =', player.isGrounded);

  if (player.isGrounded && player.position.y === 502) {
    console.log('  ✅ PASS: Player spawned grounded');
  } else {
    console.error('  ❌ FAIL: Player not grounded at spawn!');
    console.error('     Expected: Y=502, Grounded=true');
    console.error('     Got: Y=' + player.position.y + ', Grounded=' + player.isGrounded);
  }
}

// ============================================
// TEST 2: Player Stays Grounded (No Gravity Drift)
// ============================================
console.log('\n🧪 TEST 2: Player Stays Grounded');
{
  const player = createTestPlayer(100, 502);
  const platform = createTestPlatform(0, 550, 400, 50);
  const physics = new ImprovedPhysicsSystem();
  const collision = new ImprovedCollisionSystem();

  // Set grounded
  collision.update([player], [platform]);

  const initialY = player.position.y;

  // Simulate 60 frames (1 second)
  simulateFrames(physics, collision, [player], [platform], 60);

  console.log('  Initial Y:', initialY);
  console.log('  After 60 frames: Y =', player.position.y, 'Grounded =', player.isGrounded);

  if (player.position.y === initialY && player.isGrounded) {
    console.log('  ✅ PASS: Player stayed grounded, no drift');
  } else {
    console.error('  ❌ FAIL: Player drifted!');
    console.error('     Expected: Y=' + initialY);
    console.error('     Got: Y=' + player.position.y);
  }
}

// ============================================
// TEST 3: Jumping Works
// ============================================
console.log('\n🧪 TEST 3: Jumping Works');
{
  const player = createTestPlayer(100, 502);
  const platform = createTestPlatform(0, 550, 400, 50);
  const physics = new ImprovedPhysicsSystem();
  const collision = new ImprovedCollisionSystem();

  // Ground the player
  collision.update([player], [platform]);

  console.log('  Before jump: Y =', player.position.y, 'VelY =', player.velocity.y);

  // Simulate jump
  player.velocity.y = GAME_CONFIG.PLAYER.JUMP_POWER;
  player.isGrounded = false;

  console.log('  Jump initiated: Y =', player.position.y, 'VelY =', player.velocity.y);

  // Simulate 10 frames
  simulateFrames(physics, collision, [player], [platform], 10);

  console.log('  After 10 frames: Y =', player.position.y, 'VelY =', player.velocity.y);

  if (player.position.y < 502) {
    console.log('  ✅ PASS: Player jumped upward');
  } else {
    console.error('  ❌ FAIL: Player did not jump!');
  }
}

// ============================================
// TEST 4: Player Lands After Jump
// ============================================
console.log('\n🧪 TEST 4: Player Lands After Jump');
{
  const player = createTestPlayer(100, 502);
  const platform = createTestPlatform(0, 550, 400, 50);
  const physics = new ImprovedPhysicsSystem();
  const collision = new ImprovedCollisionSystem();

  // Jump
  player.velocity.y = GAME_CONFIG.PLAYER.JUMP_POWER;
  player.isGrounded = false;

  // Simulate full jump arc (180 frames = 3 seconds)
  simulateFrames(physics, collision, [player], [platform], 180);

  console.log('  After jump arc: Y =', player.position.y, 'Grounded =', player.isGrounded);

  if (player.isGrounded && player.position.y === 502) {
    console.log('  ✅ PASS: Player landed back on platform');
  } else {
    console.error('  ❌ FAIL: Player did not land properly!');
    console.error('     Expected: Y=502, Grounded=true');
    console.error('     Got: Y=' + player.position.y + ', Grounded=' + player.isGrounded);
  }
}

// ============================================
// TEST 5: Player Doesn't Fall Through Platform
// ============================================
console.log('\n🧪 TEST 5: No Fall-Through');
{
  const player = createTestPlayer(100, 400); // Spawn ABOVE platform
  const platform = createTestPlatform(0, 550, 400, 50);
  const physics = new ImprovedPhysicsSystem();
  const collision = new ImprovedCollisionSystem();

  console.log('  Initial: Y =', player.position.y, '(above platform at 550)');

  // Let gravity pull player down
  simulateFrames(physics, collision, [player], [platform], 120);

  console.log('  After falling: Y =', player.position.y, 'Grounded =', player.isGrounded);

  if (player.position.y <= 502 && player.isGrounded) {
    console.log('  ✅ PASS: Player landed on platform, did not fall through');
  } else {
    console.error('  ❌ FAIL: Player fell through or missed platform!');
    console.error('     Expected: Y ≤ 502, Grounded=true');
    console.error('     Got: Y=' + player.position.y + ', Grounded=' + player.isGrounded);
  }
}

// ============================================
// TEST 6: Ground Plane Safety Net
// ============================================
console.log('\n🧪 TEST 6: Ground Plane Catches Falling Entities');
{
  const player = createTestPlayer(100, 400);
  const groundPlane = new GroundPlane(650, 1000);
  const physics = new ImprovedPhysicsSystem();
  const collision = new ImprovedCollisionSystem();

  console.log('  Player at Y =', player.position.y, '(falling towards ground plane at 650)');

  // Let player fall for a long time
  simulateFrames(physics, collision, [player], [groundPlane], 300);

  console.log('  After falling: Y =', player.position.y, 'Grounded =', player.isGrounded);

  if (player.position.y <= 602 && player.isGrounded) {
    console.log('  ✅ PASS: Ground plane caught falling player');
  } else {
    console.error('  ❌ FAIL: Player fell past ground plane!');
    console.error('     Expected: Y ≤ 602 (ground at 650 - player height 48)');
    console.error('     Got: Y=' + player.position.y);
  }
}

// ============================================
// TEST 7: Horizontal Movement Works
// ============================================
console.log('\n🧪 TEST 7: Horizontal Movement');
{
  const player = createTestPlayer(100, 502);
  const platform = createTestPlatform(0, 550, 400, 50);
  const physics = new ImprovedPhysicsSystem();
  const collision = new ImprovedCollisionSystem();

  // Ground player
  collision.update([player], [platform]);

  const startX = player.position.x;

  // Simulate moving right
  player.velocity.x = GAME_CONFIG.PLAYER.MOVE_SPEED;

  simulateFrames(physics, collision, [player], [platform], 30);

  console.log('  Start X:', startX);
  console.log('  After moving: X =', player.position.x);

  if (player.position.x > startX) {
    console.log('  ✅ PASS: Player moved horizontally');
  } else {
    console.error('  ❌ FAIL: Player did not move!');
  }
}

// ============================================
// TEST 8: AudioSystem Has All Required Methods
// ============================================
console.log('\n🧪 TEST 8: AudioSystem Has All Required Methods');
{
  const audio = new AudioSystem();
  const requiredMethods = [
    'playMusic', 'playLevelMusic', 'playSFX', 'stopMusic',
    'init', 'setMusicVolume', 'setSFXVolume', 'destroy'
  ];

  const missing = requiredMethods.filter(m => typeof audio[m] !== 'function');

  if (missing.length === 0) {
    console.log('  ✅ PASS: All required methods exist');
  } else {
    console.error('  ❌ FAIL: Missing methods:', missing.join(', '));
  }
}

// ============================================
// TEST 9: AudioSystem Methods Don't Throw Without AudioContext
// ============================================
console.log('\n🧪 TEST 9: AudioSystem Methods Safe Without AudioContext');
{
  const audio = new AudioSystem();
  const calls = [
    ['init', []],
    ['playMusic', ['intro']],
    ['playLevelMusic', [1]],
    ['playSFX', ['jump']],
    ['playSFX', ['attack']],
    ['playSFX', ['hit']],
    ['playSFX', ['death']],
    ['playSFX', ['powerup']],
    ['playSFX', ['coin']],
    ['playSFX', ['laugh']],
    ['playSFX', ['nonexistent']],
    ['stopMusic', []],
    ['destroy', []]
  ];

  let failed = false;
  for (const [method, args] of calls) {
    try {
      audio[method](...args);
    } catch (e) {
      console.error(`  ❌ FAIL: ${method}(${args.join(', ')}) threw: ${e.message}`);
      failed = true;
    }
  }

  if (!failed) {
    console.log('  ✅ PASS: All methods safe without audioContext');
  }
}

// ============================================
// TEST 10: Volume Controls Clamp Correctly
// ============================================
console.log('\n🧪 TEST 10: Volume Controls Clamp Correctly');
{
  const audio = new AudioSystem();
  let pass = true;

  audio.setMusicVolume(0.5);
  if (audio.musicVolume !== 0.5) {
    console.error('  ❌ FAIL: setMusicVolume(0.5) => ' + audio.musicVolume + ', expected 0.5');
    pass = false;
  }

  audio.setSFXVolume(0.3);
  if (audio.sfxVolume !== 0.3) {
    console.error('  ❌ FAIL: setSFXVolume(0.3) => ' + audio.sfxVolume + ', expected 0.3');
    pass = false;
  }

  audio.setMusicVolume(2.0);
  if (audio.musicVolume !== 1) {
    console.error('  ❌ FAIL: setMusicVolume(2.0) => ' + audio.musicVolume + ', expected 1');
    pass = false;
  }

  audio.setMusicVolume(-1.0);
  if (audio.musicVolume !== 0) {
    console.error('  ❌ FAIL: setMusicVolume(-1.0) => ' + audio.musicVolume + ', expected 0');
    pass = false;
  }

  if (pass) {
    console.log('  ✅ PASS: Volume clamping works correctly');
  }
}

// ============================================
// TEST 11: Startup Call Chain Contract
// ============================================
console.log('\n🧪 TEST 11: Startup Call Chain Contract');
{
  const audio = new AudioSystem();
  let pass = true;

  // Game.startNewGame() calls:
  if (typeof audio.playMusic !== 'function') {
    console.error('  ❌ FAIL: playMusic missing (called at Game.js startNewGame)');
    pass = false;
  }

  // Game.loadGame() and loadLevelWithClass() call:
  if (typeof audio.playLevelMusic !== 'function') {
    console.error('  ❌ FAIL: playLevelMusic missing (called at Game.js loadGame/loadLevelWithClass)');
    pass = false;
  }

  // Game.onPlayerDeath() calls:
  if (typeof audio.playSFX !== 'function') {
    console.error('  ❌ FAIL: playSFX missing (called at Game.js onPlayerDeath)');
    pass = false;
  }

  // GoldDrop.js calls playSFX('coin'):
  audio.playSFX('coin'); // Should not throw

  // CreatorNameScreen.js calls playSFX('laugh'):
  audio.playSFX('laugh'); // Should not throw

  if (pass) {
    console.log('  ✅ PASS: All startup chain methods exist and callable');
  }
}

// ============================================
// SUMMARY
// ============================================
console.log('\n' + '='.repeat(50));
console.log('📊 TEST SUMMARY');
console.log('='.repeat(50));
console.log('All integration tests completed.');
console.log('Review results above for any failures.');
console.log('');
