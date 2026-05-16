/**
 * Audio System - Handles background music and sound effects
 */
export class AudioSystem {
  constructor() {
    this.musicVolume = 0.7;
    this.sfxVolume = 0.8;
    this.currentMusic = null;
    this.musicContext = null;

    // Web Audio API for music generation
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio API not supported');
    }
  }

  init() {
    console.log('🔊 Audio System initialized');
  }

  /**
   * Play procedurally generated background music for a level
   */
  playLevelMusic(levelNumber) {
    if (!this.audioContext) return;

    this.stopMusic();

    // Level-specific music themes
    const themes = {
      1: { tempo: 120, key: 'Am', mood: 'dark' },    // Dark crypt theme
      2: { tempo: 140, key: 'Dm', mood: 'tense' },   // Battle theme
      3: { tempo: 100, key: 'Em', mood: 'eerie' }    // Boss theme
    };

    const theme = themes[levelNumber] || themes[1];
    console.log(`🎵 Playing Level ${levelNumber} music (${theme.mood})`);

    // Create a simple procedural music loop
    this.generateBackgroundMusic(theme);
  }

  /**
   * Play a named music track
   */
  playMusic(trackName) {
    if (!this.audioContext) return;

    this.stopMusic();

    const tracks = {
      intro: { tempo: 80, key: 'Am', mood: 'eerie' },
      boss: { tempo: 150, key: 'Dm', mood: 'tense' },
      village: { tempo: 90, key: 'C', mood: 'calm' }
    };

    const theme = tracks[trackName] || tracks.intro;
    console.log(`🎵 Playing track: ${trackName} (${theme.mood})`);

    this.generateBackgroundMusic(theme);
  }

  /**
   * Generate procedural background music
   */
  generateBackgroundMusic(theme) {
    if (!this.audioContext) return;

    const ctx = this.audioContext;
    const now = ctx.currentTime;

    // Bass notes
    const playBass = (frequency, startTime, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.value = frequency;

      gain.gain.setValueAtTime(0.15 * this.musicVolume, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    // Ambient pad
    const playPad = (frequency, startTime, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.value = frequency;

      gain.gain.setValueAtTime(0.08 * this.musicVolume, startTime);
      gain.gain.linearRampToValueAtTime(0.12 * this.musicVolume, startTime + duration * 0.5);
      gain.gain.linearRampToValueAtTime(0.08 * this.musicVolume, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    // Simple dark ambient loop
    const bassNotes = [110, 82.5, 110, 98]; // A, E, A, G
    const padNotes = [220, 165, 220, 196];   // An octave higher

    const beatDuration = 0.5;

    for (let i = 0; i < 8; i++) {
      const noteIndex = i % bassNotes.length;
      const startTime = now + (i * beatDuration);

      playBass(bassNotes[noteIndex], startTime, beatDuration * 0.9);
      playPad(padNotes[noteIndex], startTime, beatDuration * 1.8);
    }

    // Loop the music
    this.musicLoopTimeout = setTimeout(() => {
      this.generateBackgroundMusic(theme);
    }, 4000);
  }

  /**
   * Play sound effect
   */
  playSFX(type) {
    if (!this.audioContext) return;

    const ctx = this.audioContext;
    const now = ctx.currentTime;

    switch (type) {
      case 'jump':
        this.playJumpSound(now);
        break;
      case 'attack':
        this.playAttackSound(now);
        break;
      case 'hit':
        this.playHitSound(now);
        break;
      case 'death':
        this.playDeathSound(now);
        break;
      case 'powerup':
        this.playPowerupSound(now);
        break;
      case 'coin':
        this.playCoinSound(now);
        break;
      case 'laugh':
        this.playLaughSound(now);
        break;
    }
  }

  playJumpSound(startTime) {
    const ctx = this.audioContext;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, startTime);
    osc.frequency.exponentialRampToValueAtTime(400, startTime + 0.1);

    gain.gain.setValueAtTime(0.3 * this.sfxVolume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.15);
  }

  playAttackSound(startTime) {
    const ctx = this.audioContext;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, startTime);
    osc.frequency.exponentialRampToValueAtTime(50, startTime + 0.1);

    gain.gain.setValueAtTime(0.25 * this.sfxVolume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.1);
  }

  playHitSound(startTime) {
    const ctx = this.audioContext;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.value = 100;

    gain.gain.setValueAtTime(0.4 * this.sfxVolume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.08);
  }

  playDeathSound(startTime) {
    const ctx = this.audioContext;

    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200 - i * 50, startTime + i * 0.1);
      osc.frequency.exponentialRampToValueAtTime(50, startTime + i * 0.1 + 0.3);

      gain.gain.setValueAtTime(0.2 * this.sfxVolume, startTime + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + i * 0.1 + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime + i * 0.1);
      osc.stop(startTime + i * 0.1 + 0.3);
    }
  }

  playPowerupSound(startTime) {
    const ctx = this.audioContext;
    const notes = [440, 550, 660, 880]; // A major arpeggio

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;

      gain.gain.setValueAtTime(0.2 * this.sfxVolume, startTime + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + i * 0.05 + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime + i * 0.05);
      osc.stop(startTime + i * 0.05 + 0.2);
    });
  }

  playCoinSound(startTime) {
    const ctx = this.audioContext;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, startTime);
    osc.frequency.exponentialRampToValueAtTime(1200, startTime + 0.1);

    gain.gain.setValueAtTime(0.25 * this.sfxVolume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.15);
  }

  playLaughSound(startTime) {
    const ctx = this.audioContext;
    const freqs = [300, 250, 200];

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime + i * 0.12);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.7, startTime + i * 0.12 + 0.15);

      gain.gain.setValueAtTime(0.2 * this.sfxVolume, startTime + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + i * 0.12 + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime + i * 0.12);
      osc.stop(startTime + i * 0.12 + 0.15);
    });
  }

  stopMusic() {
    if (this.musicLoopTimeout) {
      clearTimeout(this.musicLoopTimeout);
      this.musicLoopTimeout = null;
    }
  }

  setMusicVolume(volume) {
    this.musicVolume = Math.max(0, Math.min(1, volume));
  }

  setSFXVolume(volume) {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
  }

  destroy() {
    this.stopMusic();
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}
