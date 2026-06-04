import * as THREE from 'three';
import { GAME_CONFIG } from '../utils/Constants.js';

/**
 * Three.js based 3D renderer for the game
 * Replaces DOM-based rendering with WebGL 3D rendering
 */
export class ThreeJSRenderer {
  constructor(containerElement) {
    this.container = containerElement;
    this.entityMeshes = new Map(); // entity -> THREE.Mesh mapping
    this.playerClass = 'default'; // Will be set to 'mage', 'tech', or 'graver'

    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0a0f); // Very dark graveyard night
    this.scene.fog = new THREE.FogExp2(0x0a0a0f, 0.012); // Dense graveyard fog

    // Create camera (perspective for 3D, but positioned for side-scroller view)
    const aspect = GAME_CONFIG.VIEWPORT_WIDTH / GAME_CONFIG.VIEWPORT_HEIGHT;
    this.camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
    this.camera.position.set(0, 5, 30); // Side view with slight elevation

    // Create renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false
    });
    this.renderer.setSize(GAME_CONFIG.VIEWPORT_WIDTH, GAME_CONFIG.VIEWPORT_HEIGHT);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Add canvas to container
    this.container.innerHTML = ''; // Clear existing content
    this.container.appendChild(this.renderer.domElement);

    // Setup lighting for magical scrapyard
    this.setupLighting();

    // Setup environment
    this.setupEnvironment();

    console.log('✅ Three.js renderer initialized');
  }

  setPlayerClass(className) {
    this.playerClass = className.toLowerCase();
    console.log('🎭 Player class set to:', this.playerClass);
  }

  setupLighting() {
    // Ambient light (very dim for graveyard atmosphere)
    const ambient = new THREE.AmbientLight(0x303040, 0.25);
    this.scene.add(ambient);

    // Main directional light (pale moonlight)
    const moonLight = new THREE.DirectionalLight(0xaabbcc, 0.5);
    moonLight.position.set(30, 40, 20);
    moonLight.castShadow = true;
    moonLight.shadow.camera.left = -50;
    moonLight.shadow.camera.right = 50;
    moonLight.shadow.camera.top = 30;
    moonLight.shadow.camera.bottom = -10;
    moonLight.shadow.camera.near = 0.1;
    moonLight.shadow.camera.far = 100;
    // Reduced shadow quality for better performance
    moonLight.shadow.mapSize.width = 1024;
    moonLight.shadow.mapSize.height = 1024;
    this.scene.add(moonLight);

    // Eerie green ground glow (necromantic energy)
    const necroLight = new THREE.PointLight(0x00ff88, 1.0, 80);
    necroLight.position.set(0, -5, 10);
    this.scene.add(necroLight);

    // Scattered grave lights (souls/spirits)
    for (let i = 0; i < 5; i++) {
      const soulLight = new THREE.PointLight(0x4488ff, 0.4, 15);
      soulLight.position.set(
        (Math.random() - 0.5) * 200,
        Math.random() * 2 - 8,
        -20 - Math.random() * 20
      );
      this.scene.add(soulLight);
    }

    // Dim purple mist light
    const mistLight = new THREE.PointLight(0x6633aa, 0.5, 100);
    mistLight.position.set(-30, -3, 15);
    this.scene.add(mistLight);
  }

  setupEnvironment() {
    // Main ground plane - dark graveyard dirt
    const groundGeometry = new THREE.PlaneGeometry(500, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2520, // Dark brownish graveyard dirt
      roughness: 1.0,
      metalness: 0.0
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -10;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Add graveyard elements
    this.addGravestones();
    this.addTombstones();
    this.addCrosses();
    this.addBrokenCoffins();
    this.addGroundTexture();

    // Add scattered scrap debris (background decorations)
    this.addScrapDebris();

    // Add scrap piles along the ground
    this.addScrapPiles();

    // Add glowing magical rifts in the ground
    this.addMagicalRifts();

    // Add particles for magical atmosphere
    this.addMagicalParticles();

    // Add distant ruins/structures
    this.addBackgroundStructures();
  }

  addGravestones() {
    // Create gravestones scattered throughout the graveyard
    const gravestoneGroup = new THREE.Group();
    const stoneMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a4a4a, // Gray stone
      roughness: 0.9,
      metalness: 0.0
    });

    for (let i = 0; i < 30; i++) {
      // Gravestone base
      const baseGeometry = new THREE.BoxGeometry(1.2, 1.8, 0.3);
      const gravestone = new THREE.Mesh(baseGeometry, stoneMaterial);

      // Rounded top
      const topGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.3, 8);
      topGeometry.rotateZ(Math.PI / 2);
      const top = new THREE.Mesh(topGeometry, stoneMaterial);
      top.position.y = 1.05;

      const graveGroup = new THREE.Group();
      graveGroup.add(gravestone);
      graveGroup.add(top);

      // Position randomly along the level
      graveGroup.position.set(
        (Math.random() - 0.5) * 300,
        -9.1,
        -20 - Math.random() * 25
      );
      graveGroup.rotation.y = (Math.random() - 0.5) * 0.3;
      graveGroup.castShadow = true;
      gravestone.castShadow = true;
      top.castShadow = true;

      gravestoneGroup.add(graveGroup);
    }

    this.scene.add(gravestoneGroup);
  }

  addTombstones() {
    // Add larger tombstone monuments
    const tombstoneGroup = new THREE.Group();
    const darkStoneMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a, // Dark weathered stone
      roughness: 0.95,
      metalness: 0.0
    });

    for (let i = 0; i < 12; i++) {
      const height = Math.random() * 2 + 2.5;
      const tombGeometry = new THREE.BoxGeometry(1.5, height, 0.4);
      const tombstone = new THREE.Mesh(tombGeometry, darkStoneMaterial);

      tombstone.position.set(
        (Math.random() - 0.5) * 280,
        -10 + height / 2,
        -25 - Math.random() * 20
      );
      tombstone.rotation.y = (Math.random() - 0.5) * 0.4;
      tombstone.castShadow = true;
      tombstone.receiveShadow = true;

      tombstoneGroup.add(tombstone);
    }

    this.scene.add(tombstoneGroup);
  }

  addCrosses() {
    // Add wooden crosses marking graves
    const crossGroup = new THREE.Group();
    const woodMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a2a1a, // Dark weathered wood
      roughness: 1.0,
      metalness: 0.0
    });

    for (let i = 0; i < 25; i++) {
      // Vertical beam
      const verticalGeometry = new THREE.BoxGeometry(0.15, 1.5, 0.15);
      const vertical = new THREE.Mesh(verticalGeometry, woodMaterial);
      vertical.position.y = 0.75;

      // Horizontal beam
      const horizontalGeometry = new THREE.BoxGeometry(0.8, 0.15, 0.15);
      const horizontal = new THREE.Mesh(horizontalGeometry, woodMaterial);
      horizontal.position.y = 1.1;

      const cross = new THREE.Group();
      cross.add(vertical);
      cross.add(horizontal);

      cross.position.set(
        (Math.random() - 0.5) * 320,
        -10,
        -18 - Math.random() * 28
      );
      cross.rotation.y = (Math.random() - 0.5) * 0.5;
      // Some crosses are tilted/fallen
      if (Math.random() > 0.7) {
        cross.rotation.z = (Math.random() - 0.5) * 0.4;
      }

      vertical.castShadow = true;
      horizontal.castShadow = true;

      crossGroup.add(cross);
    }

    this.scene.add(crossGroup);
  }

  addBrokenCoffins() {
    // Add broken/open coffins scattered around
    const coffinGroup = new THREE.Group();
    const woodMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a1a0a, // Very dark rotted wood
      roughness: 1.0,
      metalness: 0.0
    });

    for (let i = 0; i < 8; i++) {
      // Coffin base
      const baseGeometry = new THREE.BoxGeometry(1.0, 0.4, 2.2);
      const base = new THREE.Mesh(baseGeometry, woodMaterial);

      // Coffin lid (tilted/broken open)
      const lidGeometry = new THREE.BoxGeometry(1.1, 0.15, 2.3);
      const lid = new THREE.Mesh(lidGeometry, woodMaterial);
      lid.position.set(0.6, 0.5, 0);
      lid.rotation.z = 0.8 + Math.random() * 0.4;
      lid.rotation.y = (Math.random() - 0.5) * 0.3;

      const coffin = new THREE.Group();
      coffin.add(base);
      coffin.add(lid);

      coffin.position.set(
        (Math.random() - 0.5) * 260,
        -9.6,
        -22 - Math.random() * 20
      );
      coffin.rotation.y = (Math.random() - 0.5) * Math.PI;

      base.castShadow = true;
      lid.castShadow = true;
      base.receiveShadow = true;
      lid.receiveShadow = true;

      coffinGroup.add(coffin);
    }

    this.scene.add(coffinGroup);
  }

  addGroundTexture() {
    // Add patches of darker/lighter dirt for variation
    const patchCount = 30;
    for (let i = 0; i < patchCount; i++) {
      const size = Math.random() * 15 + 5;
      const geometry = new THREE.CircleGeometry(size, 8);
      const material = new THREE.MeshStandardMaterial({
        color: Math.random() > 0.5 ? 0x1a1510 : 0x3a3020, // Dark brown dirt patches
        roughness: 1.0,
        metalness: 0.0
      });
      const patch = new THREE.Mesh(geometry, material);
      patch.rotation.x = -Math.PI / 2;
      patch.position.set(
        (Math.random() - 0.5) * 400,
        -9.9,
        (Math.random() - 0.5) * 80
      );
      patch.receiveShadow = true;
      this.scene.add(patch);
    }

    // Add some grass patches (dead/dying grass)
    for (let i = 0; i < 15; i++) {
      const grassSize = Math.random() * 8 + 3;
      const grassGeometry = new THREE.CircleGeometry(grassSize, 8);
      const grassMaterial = new THREE.MeshStandardMaterial({
        color: 0x2a3a2a, // Dead greenish-brown grass
        roughness: 1.0,
        metalness: 0.0
      });
      const grass = new THREE.Mesh(grassGeometry, grassMaterial);
      grass.rotation.x = -Math.PI / 2;
      grass.position.set(
        (Math.random() - 0.5) * 400,
        -9.85,
        (Math.random() - 0.5) * 80
      );
      grass.receiveShadow = true;
      this.scene.add(grass);
    }
  }

  addScrapDebris() {
    const debrisGroup = new THREE.Group();

    // Random scrap pieces scattered around
    for (let i = 0; i < 50; i++) {
      const size = Math.random() * 2 + 0.5;
      const geometry = new THREE.BoxGeometry(size, size * 0.8, size * 0.6);

      // Rusty metal colors
      const colorOptions = [0x4a3a2a, 0x2a2a3a, 0x5a4a3a, 0x3a2a1a];
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];

      const material = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.9,
        metalness: 0.5
      });
      const debris = new THREE.Mesh(geometry, material);

      debris.position.set(
        (Math.random() - 0.5) * 250,
        Math.random() * 3 - 9,
        (Math.random() - 0.5) * 50 - 15
      );
      debris.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      debris.castShadow = true;
      debris.receiveShadow = true;
      debrisGroup.add(debris);
    }

    this.scene.add(debrisGroup);
  }

  addScrapPiles() {
    // Large scrap piles along the ground
    const pileGroup = new THREE.Group();

    for (let i = 0; i < 15; i++) {
      const pileSize = Math.random() * 4 + 2;
      const pieces = Math.floor(Math.random() * 5) + 3;

      for (let j = 0; j < pieces; j++) {
        const geometry = new THREE.BoxGeometry(
          Math.random() * 2 + 1,
          Math.random() * 3 + 1,
          Math.random() * 1.5 + 0.5
        );
        const material = new THREE.MeshStandardMaterial({
          color: 0x3a3a4a,
          roughness: 0.85,
          metalness: 0.6
        });
        const piece = new THREE.Mesh(geometry, material);

        const angle = (j / pieces) * Math.PI * 2;
        piece.position.set(
          i * 30 - 200 + Math.cos(angle) * pileSize,
          Math.random() * 2 - 8,
          (Math.random() - 0.5) * 40 - 15 + Math.sin(angle) * pileSize
        );
        piece.rotation.set(
          Math.random() * 0.5,
          Math.random() * Math.PI,
          Math.random() * 0.5
        );

        piece.castShadow = true;
        piece.receiveShadow = true;
        pileGroup.add(piece);
      }
    }

    this.scene.add(pileGroup);
  }

  addMagicalRifts() {
    // Glowing cracks in the ground with magical energy
    for (let i = 0; i < 8; i++) {
      const riftGeometry = new THREE.PlaneGeometry(
        Math.random() * 8 + 4,
        Math.random() * 1 + 0.3
      );
      const riftMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ffaa,
        emissive: 0x00ffaa,
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
      });
      const rift = new THREE.Mesh(riftGeometry, riftMaterial);
      rift.rotation.x = -Math.PI / 2;
      rift.rotation.z = Math.random() * Math.PI;
      rift.position.set(
        (Math.random() - 0.5) * 300,
        -9.8,
        (Math.random() - 0.5) * 60
      );

      this.scene.add(rift);

      // Add glow light
      const riftLight = new THREE.PointLight(0x00ffaa, 0.5, 10);
      riftLight.position.copy(rift.position);
      riftLight.position.y = -8;
      this.scene.add(riftLight);
    }
  }

  addBackgroundStructures() {
    // Distant ruined structures for depth
    const structureGroup = new THREE.Group();

    for (let i = 0; i < 6; i++) {
      const height = Math.random() * 15 + 10;
      const geometry = new THREE.BoxGeometry(
        Math.random() * 4 + 2,
        height,
        Math.random() * 3 + 2
      );
      const material = new THREE.MeshStandardMaterial({
        color: 0x1a1a25,
        roughness: 0.9,
        metalness: 0.4
      });
      const structure = new THREE.Mesh(geometry, material);
      structure.position.set(
        (Math.random() - 0.5) * 400,
        height / 2 - 10,
        -40 - Math.random() * 20
      );
      structure.rotation.y = Math.random() * 0.3 - 0.15;
      structure.castShadow = true;
      structureGroup.add(structure);
    }

    this.scene.add(structureGroup);
  }

  addMagicalParticles() {
    // Ghostly wisps and soul particles
    const particleCount = 35;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = Math.random() * 25 - 8; // Closer to ground
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      // Ghostly colors - pale blue, green, and white
      const colorType = Math.random();
      if (colorType > 0.66) {
        // Pale ghost blue
        colors[i * 3] = 0.4; // R
        colors[i * 3 + 1] = 0.6; // G
        colors[i * 3 + 2] = 1; // B
      } else if (colorType > 0.33) {
        // Eerie green (necromantic)
        colors[i * 3] = 0.1; // R
        colors[i * 3 + 1] = 1; // G
        colors[i * 3 + 2] = 0.4; // B
      } else {
        // Pale white (souls)
        colors[i * 3] = 0.9; // R
        colors[i * 3 + 1] = 0.9; // G
        colors[i * 3 + 2] = 1; // B
      }
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particles = new THREE.Points(particleGeometry, particleMaterial);
    this.scene.add(this.particles);
  }

  /**
   * Create 3D mesh for an entity
   */
  createEntity(entity) {
    if (this.entityMeshes.has(entity)) {
      return; // Already created
    }

    let mesh;

    switch (entity.type) {
      case 'player':
        mesh = this.createPlayerMesh(entity);
        break;
      case 'enemy':
        mesh = this.createEnemyMesh(entity);
        break;
      case 'platform':
        mesh = this.createPlatformMesh(entity);
        break;
      case 'projectile':
        mesh = this.createProjectileMesh(entity);
        break;
      default:
        mesh = this.createDefaultMesh(entity);
    }

    this.scene.add(mesh);
    this.entityMeshes.set(entity, mesh);
    entity.mesh = mesh; // Store reference on entity
  }

  createPlayerMesh(entity) {
    const group = new THREE.Group();

    // ===== MATERIALS =====

    // Aged bone material - yellowish white like real old bones
    const boneMaterial = new THREE.MeshStandardMaterial({
      color: 0xddd4c0, // Aged bone color (yellowish-white)
      roughness: 0.7,
      metalness: 0.0,
      flatShading: false
    });

    // Class-specific cloth materials
    let scrapClothColor = 0x1a1a1a; // Default dark
    let brownClothColor = 0x4a3a2a; // Default brown
    let clothMetalness = 0.0;

    if (this.playerClass === 'mage') {
      scrapClothColor = 0x1a1a3a; // Dark blue-ish robes
      brownClothColor = 0x2a2a5a; // Blue-tinted cloth
    } else if (this.playerClass === 'tech') {
      scrapClothColor = 0x2a2a2a; // Gray armor plating
      brownClothColor = 0x3a3a3a; // Metallic gray
      clothMetalness = 0.4; // More metallic
    } else if (this.playerClass === 'graver') {
      scrapClothColor = 0x2a1a1a; // Dark red-tinted
      brownClothColor = 0x4a2a2a; // Blood-stained cloth
    }

    // Dark scrap cloth material
    const scrapClothMaterial = new THREE.MeshStandardMaterial({
      color: scrapClothColor,
      roughness: 0.95,
      metalness: clothMetalness
    });

    // Tattered brown cloth
    const brownClothMaterial = new THREE.MeshStandardMaterial({
      color: brownClothColor,
      roughness: 0.95,
      metalness: clothMetalness
    });

    // ===== SKULL (HEAD) =====
    // Main skull - more rounded and organic
    const skullGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    const skull = new THREE.Mesh(skullGeometry, boneMaterial);
    skull.position.y = 2.0;
    skull.scale.set(1, 1.15, 0.95); // Elongate for human skull shape
    skull.castShadow = true;
    group.add(skull);

    // Eye sockets (dark holes)
    const socketMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      roughness: 1.0,
      metalness: 0.0
    });

    const socketGeometry = new THREE.SphereGeometry(0.12, 8, 8);
    const leftSocket = new THREE.Mesh(socketGeometry, socketMaterial);
    leftSocket.position.set(-0.15, 2.05, 0.32);
    leftSocket.scale.set(1.2, 1, 0.6);
    group.add(leftSocket);

    const rightSocket = new THREE.Mesh(socketGeometry, socketMaterial);
    rightSocket.position.set(0.15, 2.05, 0.32);
    rightSocket.scale.set(1.2, 1, 0.6);
    group.add(rightSocket);

    // Nasal cavity
    const noseGeometry = new THREE.ConeGeometry(0.08, 0.15, 3);
    const nose = new THREE.Mesh(noseGeometry, socketMaterial);
    nose.position.set(0, 1.92, 0.35);
    nose.rotation.x = Math.PI;
    group.add(nose);

    // Upper jaw (part of skull)
    const upperJawGeometry = new THREE.BoxGeometry(0.35, 0.12, 0.28);
    const upperJaw = new THREE.Mesh(upperJawGeometry, boneMaterial);
    upperJaw.position.set(0, 1.82, 0.12);
    upperJaw.castShadow = true;
    group.add(upperJaw);

    // Lower jaw (mandible) - slightly separated
    const jawGeometry = new THREE.BoxGeometry(0.32, 0.1, 0.25);
    const jaw = new THREE.Mesh(jawGeometry, boneMaterial);
    jaw.position.set(0, 1.68, 0.1);
    jaw.castShadow = true;
    group.add(jaw);

    // Teeth (simplified)
    const teethGeometry = new THREE.BoxGeometry(0.28, 0.06, 0.05);
    const teethMaterial = new THREE.MeshStandardMaterial({
      color: 0xf0f0e0,
      roughness: 0.3,
      metalness: 0.0
    });
    const upperTeeth = new THREE.Mesh(teethGeometry, teethMaterial);
    upperTeeth.position.set(0, 1.78, 0.26);
    group.add(upperTeeth);

    const lowerTeeth = new THREE.Mesh(teethGeometry, teethMaterial);
    lowerTeeth.position.set(0, 1.73, 0.24);
    group.add(lowerTeeth);

    // ===== GLOWING EYES (inside sockets) =====
    // Class-specific eye colors
    let eyeColor = 0x00ff88; // Default green (necromancer)
    if (this.playerClass === 'mage') {
      eyeColor = 0x4488ff; // Blue for mage
    } else if (this.playerClass === 'tech') {
      eyeColor = 0x00ffaa; // Cyan for tech
    } else if (this.playerClass === 'graver') {
      eyeColor = 0xff4444; // Red for graver
    }

    const eyeGeometry = new THREE.SphereGeometry(0.08, 8, 8);
    const eyeMaterial = new THREE.MeshStandardMaterial({
      color: eyeColor,
      emissive: eyeColor,
      emissiveIntensity: 4,
      transparent: true,
      opacity: 0.9
    });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.15, 2.05, 0.35);
    group.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.15, 2.05, 0.35);
    group.add(rightEye);

    // Eye glow light (matches eye color)
    const eyeLight = new THREE.PointLight(eyeColor, 0.7, 5);
    eyeLight.position.set(0, 2.05, 0.6);
    group.add(eyeLight);

    // ===== SPINE =====
    // Vertebrae - individual segments
    for (let i = 0; i < 8; i++) {
      const vertebraGeometry = new THREE.SphereGeometry(0.1, 8, 8);
      const vertebra = new THREE.Mesh(vertebraGeometry, boneMaterial);
      vertebra.position.set(0, 1.65 - i * 0.15, -0.12);
      vertebra.scale.set(0.8, 0.6, 1);
      vertebra.castShadow = true;
      group.add(vertebra);
    }

    // Neck vertebrae
    const neckVertebra = new THREE.SphereGeometry(0.08, 8, 8);
    const neck1 = new THREE.Mesh(neckVertebra, boneMaterial);
    neck1.position.set(0, 1.78, -0.08);
    neck1.scale.set(0.7, 0.5, 0.9);
    neck1.castShadow = true;
    group.add(neck1);

    // ===== RIBCAGE =====
    // Individual curved ribs (more organic)
    for (let i = 0; i < 6; i++) {
      const ribRadius = 0.28 + i * 0.04;
      const ribThickness = 0.025;

      // Left rib
      const leftRibGeometry = new THREE.TorusGeometry(ribRadius, ribThickness, 6, 12, Math.PI * 0.85);
      const leftRib = new THREE.Mesh(leftRibGeometry, boneMaterial);
      leftRib.position.set(0, 1.55 - i * 0.13, 0);
      leftRib.rotation.x = Math.PI / 2 + 0.1;
      leftRib.rotation.z = Math.PI;
      leftRib.rotation.y = -0.15;
      leftRib.castShadow = true;
      group.add(leftRib);

      // Right rib
      const rightRibGeometry = new THREE.TorusGeometry(ribRadius, ribThickness, 6, 12, Math.PI * 0.85);
      const rightRib = new THREE.Mesh(rightRibGeometry, boneMaterial);
      rightRib.position.set(0, 1.55 - i * 0.13, 0);
      rightRib.rotation.x = Math.PI / 2 + 0.1;
      rightRib.rotation.z = Math.PI;
      rightRib.rotation.y = 0.15;
      rightRib.castShadow = true;
      group.add(rightRib);
    }

    // Sternum (breastbone)
    const sternumGeometry = new THREE.BoxGeometry(0.08, 0.7, 0.06);
    const sternum = new THREE.Mesh(sternumGeometry, boneMaterial);
    sternum.position.set(0, 1.25, 0.28);
    sternum.castShadow = true;
    group.add(sternum);

    // ===== PELVIS (HIP BONES) =====
    const pelvisGeometry = new THREE.SphereGeometry(0.25, 8, 8);
    const pelvis = new THREE.Mesh(pelvisGeometry, boneMaterial);
    pelvis.position.y = 0.65;
    pelvis.scale.set(1.4, 0.6, 0.8);
    pelvis.castShadow = true;
    group.add(pelvis);

    // ===== CLAVICLES (COLLAR BONES) =====
    const clavicleGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.35, 6);

    const leftClavicle = new THREE.Mesh(clavicleGeometry, boneMaterial);
    leftClavicle.position.set(-0.25, 1.58, 0);
    leftClavicle.rotation.z = Math.PI / 4;
    leftClavicle.castShadow = true;
    group.add(leftClavicle);

    const rightClavicle = new THREE.Mesh(clavicleGeometry, boneMaterial);
    rightClavicle.position.set(0.25, 1.58, 0);
    rightClavicle.rotation.z = -Math.PI / 4;
    rightClavicle.castShadow = true;
    group.add(rightClavicle);

    // ===== ARMS (with joint knobs) =====
    // LEFT ARM
    // Shoulder joint
    const shoulderGeometry = new THREE.SphereGeometry(0.09, 8, 8);
    const leftShoulder = new THREE.Mesh(shoulderGeometry, boneMaterial);
    leftShoulder.position.set(-0.42, 1.5, 0);
    leftShoulder.castShadow = true;
    group.add(leftShoulder);

    // Humerus (upper arm bone) - thinner in middle, thicker at ends
    const humerusGeometry = new THREE.CylinderGeometry(0.05, 0.04, 0.6, 8);
    const leftHumerus = new THREE.Mesh(humerusGeometry, boneMaterial);
    leftHumerus.position.set(-0.48, 1.15, 0);
    leftHumerus.rotation.z = 0.2;
    leftHumerus.castShadow = true;
    group.add(leftHumerus);

    // Elbow joint
    const elbowGeometry = new THREE.SphereGeometry(0.07, 8, 8);
    const leftElbow = new THREE.Mesh(elbowGeometry, boneMaterial);
    leftElbow.position.set(-0.58, 0.85, 0);
    leftElbow.castShadow = true;
    group.add(leftElbow);

    // Radius/Ulna (forearm bones)
    const forearmGeometry = new THREE.CylinderGeometry(0.04, 0.035, 0.55, 8);
    const leftForearm = new THREE.Mesh(forearmGeometry, boneMaterial);
    leftForearm.position.set(-0.68, 0.55, 0);
    leftForearm.rotation.z = 0.15;
    leftForearm.castShadow = true;
    group.add(leftForearm);

    // Wrist joint
    const wristGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const leftWrist = new THREE.Mesh(wristGeometry, boneMaterial);
    leftWrist.position.set(-0.74, 0.28, 0);
    leftWrist.castShadow = true;
    group.add(leftWrist);

    // Hand bones (simplified)
    const handGeometry = new THREE.BoxGeometry(0.12, 0.18, 0.06);
    const leftHand = new THREE.Mesh(handGeometry, boneMaterial);
    leftHand.position.set(-0.77, 0.12, 0);
    leftHand.castShadow = true;
    group.add(leftHand);

    // RIGHT ARM (mirror of left)
    const rightShoulder = new THREE.Mesh(shoulderGeometry, boneMaterial);
    rightShoulder.position.set(0.42, 1.5, 0);
    rightShoulder.castShadow = true;
    group.add(rightShoulder);

    const rightHumerus = new THREE.Mesh(humerusGeometry, boneMaterial);
    rightHumerus.position.set(0.48, 1.15, 0);
    rightHumerus.rotation.z = -0.2;
    rightHumerus.castShadow = true;
    group.add(rightHumerus);

    const rightElbow = new THREE.Mesh(elbowGeometry, boneMaterial);
    rightElbow.position.set(0.58, 0.85, 0);
    rightElbow.castShadow = true;
    group.add(rightElbow);

    const rightForearm = new THREE.Mesh(forearmGeometry, boneMaterial);
    rightForearm.position.set(0.68, 0.55, 0);
    rightForearm.rotation.z = -0.15;
    rightForearm.castShadow = true;
    group.add(rightForearm);

    const rightWrist = new THREE.Mesh(wristGeometry, boneMaterial);
    rightWrist.position.set(0.74, 0.28, 0);
    rightWrist.castShadow = true;
    group.add(rightWrist);

    const rightHand = new THREE.Mesh(handGeometry, boneMaterial);
    rightHand.position.set(0.77, 0.12, 0);
    rightHand.castShadow = true;
    group.add(rightHand);

    // ===== LEGS (with joint knobs) =====
    // LEFT LEG
    // Hip joint
    const hipGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const leftHip = new THREE.Mesh(hipGeometry, boneMaterial);
    leftHip.position.set(-0.18, 0.5, 0);
    leftHip.castShadow = true;
    group.add(leftHip);

    // Femur (thigh bone)
    const femurGeometry = new THREE.CylinderGeometry(0.06, 0.05, 0.75, 8);
    const leftFemur = new THREE.Mesh(femurGeometry, boneMaterial);
    leftFemur.position.set(-0.18, 0.1, 0);
    leftFemur.castShadow = true;
    group.add(leftFemur);

    // Knee joint
    const kneeGeometry = new THREE.SphereGeometry(0.08, 8, 8);
    const leftKnee = new THREE.Mesh(kneeGeometry, boneMaterial);
    leftKnee.position.set(-0.18, -0.28, 0);
    leftKnee.castShadow = true;
    group.add(leftKnee);

    // Tibia/Fibula (shin bones)
    const shinGeometry = new THREE.CylinderGeometry(0.05, 0.04, 0.7, 8);
    const leftShin = new THREE.Mesh(shinGeometry, boneMaterial);
    leftShin.position.set(-0.18, -0.65, 0);
    leftShin.castShadow = true;
    group.add(leftShin);

    // Ankle joint
    const ankleGeometry = new THREE.SphereGeometry(0.06, 8, 8);
    const leftAnkle = new THREE.Mesh(ankleGeometry, boneMaterial);
    leftAnkle.position.set(-0.18, -1.0, 0);
    leftAnkle.castShadow = true;
    group.add(leftAnkle);

    // Foot bones
    const footGeometry = new THREE.BoxGeometry(0.1, 0.06, 0.28);
    const leftFoot = new THREE.Mesh(footGeometry, boneMaterial);
    leftFoot.position.set(-0.18, -1.08, 0.1);
    leftFoot.castShadow = true;
    group.add(leftFoot);

    // RIGHT LEG (mirror of left)
    const rightHip = new THREE.Mesh(hipGeometry, boneMaterial);
    rightHip.position.set(0.18, 0.5, 0);
    rightHip.castShadow = true;
    group.add(rightHip);

    const rightFemur = new THREE.Mesh(femurGeometry, boneMaterial);
    rightFemur.position.set(0.18, 0.1, 0);
    rightFemur.castShadow = true;
    group.add(rightFemur);

    const rightKnee = new THREE.Mesh(kneeGeometry, boneMaterial);
    rightKnee.position.set(0.18, -0.28, 0);
    rightKnee.castShadow = true;
    group.add(rightKnee);

    const rightShin = new THREE.Mesh(shinGeometry, boneMaterial);
    rightShin.position.set(0.18, -0.65, 0);
    rightShin.castShadow = true;
    group.add(rightShin);

    const rightAnkle = new THREE.Mesh(ankleGeometry, boneMaterial);
    rightAnkle.position.set(0.18, -1.0, 0);
    rightAnkle.castShadow = true;
    group.add(rightAnkle);

    const rightFoot = new THREE.Mesh(footGeometry, boneMaterial);
    rightFoot.position.set(0.18, -1.08, 0.1);
    rightFoot.castShadow = true;
    group.add(rightFoot);

    // ===== CLASS-SPECIFIC GEAR =====
    if (this.playerClass === 'mage') {
      this.addMageGear(group, scrapClothMaterial, brownClothMaterial);
    } else if (this.playerClass === 'tech') {
      this.addTechGear(group, scrapClothMaterial, brownClothMaterial);
    } else if (this.playerClass === 'graver') {
      this.addGraverGear(group, scrapClothMaterial, brownClothMaterial);
    } else {
      this.addDefaultGear(group, scrapClothMaterial, brownClothMaterial);
    }

    return group;
  }

  // ===== MAGE GEAR =====
  addMageGear(group, scrapClothMaterial, brownClothMaterial) {
    // Tall pointed wizard hood
    const hoodGeometry = new THREE.ConeGeometry(0.5, 1.0, 8);
    const hood = new THREE.Mesh(hoodGeometry, scrapClothMaterial);
    hood.position.set(0, 2.45, -0.1);
    hood.rotation.x = 0.1;
    hood.castShadow = true;
    group.add(hood);

    // Flowing robe mantle over shoulders
    const mantleGeometry = new THREE.ConeGeometry(0.7, 0.5, 8, 1, true);
    const mantle = new THREE.Mesh(mantleGeometry, scrapClothMaterial);
    mantle.position.set(0, 1.45, 0);
    mantle.castShadow = true;
    group.add(mantle);

    // Long flowing robe skirt (extends to ankles)
    const robeGeometry = new THREE.CylinderGeometry(0.35, 0.55, 1.4, 8, 1, true);
    const robe = new THREE.Mesh(robeGeometry, scrapClothMaterial);
    robe.position.y = 0.05;
    robe.castShadow = true;
    group.add(robe);

    // Arcane rune glow on chest
    const runeGeometry = new THREE.RingGeometry(0.06, 0.1, 6);
    const runeMaterial = new THREE.MeshStandardMaterial({
      color: 0x4488ff,
      emissive: 0x4488ff,
      emissiveIntensity: 3,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide
    });
    const rune = new THREE.Mesh(runeGeometry, runeMaterial);
    rune.position.set(0, 1.3, 0.32);
    group.add(rune);

    // Inner rune circle
    const innerRuneGeometry = new THREE.CircleGeometry(0.05, 6);
    const innerRune = new THREE.Mesh(innerRuneGeometry, runeMaterial);
    innerRune.position.set(0, 1.3, 0.33);
    group.add(innerRune);

    // Rune glow light
    const runeLight = new THREE.PointLight(0x4488ff, 0.4, 3);
    runeLight.position.set(0, 1.3, 0.5);
    group.add(runeLight);

    // Staff in right hand - shaft
    const staffShaftGeometry = new THREE.CylinderGeometry(0.03, 0.035, 2.5, 8);
    const staffMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a2a1a,
      roughness: 0.8,
      metalness: 0.1
    });
    const staffShaft = new THREE.Mesh(staffShaftGeometry, staffMaterial);
    staffShaft.position.set(0.85, 0.7, 0);
    staffShaft.castShadow = true;
    group.add(staffShaft);

    // Staff orb holder (forked top)
    const forkGeometry = new THREE.TorusGeometry(0.08, 0.02, 6, 8, Math.PI * 2);
    const forkMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a3a2a,
      roughness: 0.6,
      metalness: 0.3
    });
    const fork = new THREE.Mesh(forkGeometry, forkMaterial);
    fork.position.set(0.85, 1.95, 0);
    fork.rotation.x = Math.PI / 2;
    group.add(fork);

    // Glowing orb on top of staff
    const orbGeometry = new THREE.SphereGeometry(0.1, 12, 12);
    const orbMaterial = new THREE.MeshStandardMaterial({
      color: 0x4488ff,
      emissive: 0x4488ff,
      emissiveIntensity: 4,
      transparent: true,
      opacity: 0.9
    });
    const orb = new THREE.Mesh(orbGeometry, orbMaterial);
    orb.position.set(0.85, 1.95, 0);
    group.add(orb);

    // Staff orb glow light
    const orbLight = new THREE.PointLight(0x4488ff, 1.0, 6);
    orbLight.position.set(0.85, 1.95, 0);
    group.add(orbLight);

    // Waist sash/belt
    const sashGeometry = new THREE.CylinderGeometry(0.38, 0.38, 0.12, 8);
    const sashMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a5a,
      roughness: 0.9,
      metalness: 0.0
    });
    const sash = new THREE.Mesh(sashGeometry, sashMaterial);
    sash.position.y = 0.7;
    group.add(sash);

    // Arcane buckle
    const buckleGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.06);
    const buckleMaterial = new THREE.MeshStandardMaterial({
      color: 0x4488ff,
      emissive: 0x4488ff,
      emissiveIntensity: 1,
      roughness: 0.3,
      metalness: 0.8
    });
    const buckle = new THREE.Mesh(buckleGeometry, buckleMaterial);
    buckle.position.set(0, 0.72, 0.38);
    group.add(buckle);
  }

  // ===== TECH GEAR =====
  addTechGear(group, scrapClothMaterial, brownClothMaterial) {
    const armorMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a4a4a,
      roughness: 0.4,
      metalness: 0.8
    });

    const techGlowMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ffaa,
      emissive: 0x00ffaa,
      emissiveIntensity: 3,
      transparent: true,
      opacity: 0.9
    });

    // Helmet/headband (no hood)
    const headbandGeometry = new THREE.CylinderGeometry(0.42, 0.42, 0.1, 12);
    const headband = new THREE.Mesh(headbandGeometry, armorMaterial);
    headband.position.set(0, 2.15, 0);
    headband.castShadow = true;
    group.add(headband);

    // Tech visor over right eye
    const visorGeometry = new THREE.BoxGeometry(0.18, 0.06, 0.08);
    const visor = new THREE.Mesh(visorGeometry, techGlowMaterial);
    visor.position.set(0.15, 2.08, 0.38);
    group.add(visor);

    // Visor glow light
    const visorLight = new THREE.PointLight(0x00ffaa, 0.5, 3);
    visorLight.position.set(0.15, 2.08, 0.5);
    group.add(visorLight);

    // Chest plate (over ribcage)
    const chestGeometry = new THREE.BoxGeometry(0.55, 0.6, 0.15);
    const chest = new THREE.Mesh(chestGeometry, armorMaterial);
    chest.position.set(0, 1.3, 0.15);
    chest.castShadow = true;
    group.add(chest);

    // Chest plate tech line
    const chestLineGeometry = new THREE.BoxGeometry(0.02, 0.5, 0.02);
    const chestLine = new THREE.Mesh(chestLineGeometry, techGlowMaterial);
    chestLine.position.set(0, 1.3, 0.24);
    group.add(chestLine);

    // Left shoulder pauldron
    const pauldronGeometry = new THREE.BoxGeometry(0.3, 0.15, 0.2);
    const leftPauldron = new THREE.Mesh(pauldronGeometry, armorMaterial);
    leftPauldron.position.set(-0.45, 1.55, 0);
    leftPauldron.rotation.z = 0.3;
    leftPauldron.castShadow = true;
    group.add(leftPauldron);

    // Right shoulder pauldron
    const rightPauldron = new THREE.Mesh(pauldronGeometry, armorMaterial);
    rightPauldron.position.set(0.45, 1.55, 0);
    rightPauldron.rotation.z = -0.3;
    rightPauldron.castShadow = true;
    group.add(rightPauldron);

    // Pauldron tech accents
    const accentGeometry = new THREE.BoxGeometry(0.25, 0.02, 0.16);
    const leftAccent = new THREE.Mesh(accentGeometry, techGlowMaterial);
    leftAccent.position.set(-0.45, 1.55, 0);
    leftAccent.rotation.z = 0.3;
    group.add(leftAccent);

    const rightAccent = new THREE.Mesh(accentGeometry, techGlowMaterial);
    rightAccent.position.set(0.45, 1.55, 0);
    rightAccent.rotation.z = -0.3;
    group.add(rightAccent);

    // Gun/blaster in right hand - barrel
    const barrelGeometry = new THREE.BoxGeometry(0.06, 0.06, 0.4);
    const barrelMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a3a3a,
      roughness: 0.3,
      metalness: 0.9
    });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel.position.set(0.77, 0.12, 0.2);
    barrel.castShadow = true;
    group.add(barrel);

    // Gun grip
    const gripGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.15, 8);
    const grip = new THREE.Mesh(gripGeometry, barrelMaterial);
    grip.position.set(0.77, 0.05, 0.05);
    group.add(grip);

    // Gun muzzle glow
    const muzzleGeometry = new THREE.SphereGeometry(0.04, 6, 6);
    const muzzle = new THREE.Mesh(muzzleGeometry, techGlowMaterial);
    muzzle.position.set(0.77, 0.12, 0.42);
    group.add(muzzle);

    // Gun muzzle light
    const muzzleLight = new THREE.PointLight(0x00ffaa, 0.5, 2);
    muzzleLight.position.set(0.77, 0.12, 0.5);
    group.add(muzzleLight);

    // Circuit lines on forearms
    const circuitGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.4, 4);

    const leftCircuit = new THREE.Mesh(circuitGeometry, techGlowMaterial);
    leftCircuit.position.set(-0.68, 0.55, 0.04);
    leftCircuit.rotation.z = 0.15;
    group.add(leftCircuit);

    const rightCircuit = new THREE.Mesh(circuitGeometry, techGlowMaterial);
    rightCircuit.position.set(0.68, 0.55, 0.04);
    rightCircuit.rotation.z = -0.15;
    group.add(rightCircuit);

    // Armored waist belt
    const beltGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.15, 8);
    const belt = new THREE.Mesh(beltGeometry, armorMaterial);
    belt.position.y = 0.7;
    belt.castShadow = true;
    group.add(belt);

    // Armored leg plates
    const legPlateGeometry = new THREE.BoxGeometry(0.1, 0.35, 0.08);

    const leftLegPlate = new THREE.Mesh(legPlateGeometry, armorMaterial);
    leftLegPlate.position.set(-0.18, -0.55, 0.05);
    leftLegPlate.castShadow = true;
    group.add(leftLegPlate);

    const rightLegPlate = new THREE.Mesh(legPlateGeometry, armorMaterial);
    rightLegPlate.position.set(0.18, -0.55, 0.05);
    rightLegPlate.castShadow = true;
    group.add(rightLegPlate);

    // Leg plate tech lines
    const legLineGeometry = new THREE.BoxGeometry(0.02, 0.3, 0.02);

    const leftLegLine = new THREE.Mesh(legLineGeometry, techGlowMaterial);
    leftLegLine.position.set(-0.18, -0.55, 0.1);
    group.add(leftLegLine);

    const rightLegLine = new THREE.Mesh(legLineGeometry, techGlowMaterial);
    rightLegLine.position.set(0.18, -0.55, 0.1);
    group.add(rightLegLine);

    // Tech belt buckle
    const buckleGeometry = new THREE.BoxGeometry(0.14, 0.14, 0.06);
    const buckleMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ffaa,
      emissive: 0x00ffaa,
      emissiveIntensity: 1.5,
      roughness: 0.2,
      metalness: 0.9
    });
    const buckle = new THREE.Mesh(buckleGeometry, buckleMaterial);
    buckle.position.set(0, 0.72, 0.4);
    group.add(buckle);
  }

  // ===== GRAVER GEAR =====
  addGraverGear(group, scrapClothMaterial, brownClothMaterial) {
    const darkMetalMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a2a2a,
      roughness: 0.5,
      metalness: 0.7
    });

    const redGlowMaterial = new THREE.MeshStandardMaterial({
      color: 0xff4444,
      emissive: 0xff4444,
      emissiveIntensity: 2,
      transparent: true,
      opacity: 0.8
    });

    // Bone crown/horns on skull (no hood)
    const hornGeometry = new THREE.ConeGeometry(0.05, 0.3, 6);
    const hornMaterial = new THREE.MeshStandardMaterial({
      color: 0xddd4c0,
      roughness: 0.6,
      metalness: 0.1
    });

    // Left horn
    const leftHorn = new THREE.Mesh(hornGeometry, hornMaterial);
    leftHorn.position.set(-0.22, 2.35, 0);
    leftHorn.rotation.z = 0.4;
    leftHorn.castShadow = true;
    group.add(leftHorn);

    // Right horn
    const rightHorn = new THREE.Mesh(hornGeometry, hornMaterial);
    rightHorn.position.set(0.22, 2.35, 0);
    rightHorn.rotation.z = -0.4;
    rightHorn.castShadow = true;
    group.add(rightHorn);

    // Center horn (larger)
    const centerHornGeometry = new THREE.ConeGeometry(0.04, 0.2, 6);
    const centerHorn = new THREE.Mesh(centerHornGeometry, hornMaterial);
    centerHorn.position.set(0, 2.4, 0.1);
    centerHorn.castShadow = true;
    group.add(centerHorn);

    // Shoulder pauldrons with spikes
    const pauldronGeometry = new THREE.BoxGeometry(0.28, 0.18, 0.18);

    const leftPauldron = new THREE.Mesh(pauldronGeometry, darkMetalMaterial);
    leftPauldron.position.set(-0.48, 1.55, 0);
    leftPauldron.rotation.z = 0.25;
    leftPauldron.castShadow = true;
    group.add(leftPauldron);

    const rightPauldron = new THREE.Mesh(pauldronGeometry, darkMetalMaterial);
    rightPauldron.position.set(0.48, 1.55, 0);
    rightPauldron.rotation.z = -0.25;
    rightPauldron.castShadow = true;
    group.add(rightPauldron);

    // Pauldron spikes
    const spikeGeometry = new THREE.ConeGeometry(0.03, 0.15, 5);

    const leftSpike = new THREE.Mesh(spikeGeometry, darkMetalMaterial);
    leftSpike.position.set(-0.55, 1.68, 0);
    leftSpike.rotation.z = 0.5;
    group.add(leftSpike);

    const rightSpike = new THREE.Mesh(spikeGeometry, darkMetalMaterial);
    rightSpike.position.set(0.55, 1.68, 0);
    rightSpike.rotation.z = -0.5;
    group.add(rightSpike);

    // Battle cape (flowing behind)
    const capeGeometry = new THREE.BoxGeometry(0.6, 1.2, 0.04);
    const capeMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a1a1a,
      roughness: 0.9,
      metalness: 0.0
    });
    const cape = new THREE.Mesh(capeGeometry, capeMaterial);
    cape.position.set(0, 0.9, -0.25);
    cape.rotation.x = -0.15;
    cape.castShadow = true;
    group.add(cape);

    // Cape bottom tatter
    const capeBottomGeometry = new THREE.BoxGeometry(0.55, 0.3, 0.04);
    const capeBottom = new THREE.Mesh(capeBottomGeometry, capeMaterial);
    capeBottom.position.set(0, 0.2, -0.3);
    capeBottom.rotation.x = -0.25;
    group.add(capeBottom);

    // Tattered battle skirt (shorter, more strips)
    const skirtGeometry = new THREE.CylinderGeometry(0.38, 0.42, 0.35, 8, 1, true);
    const skirt = new THREE.Mesh(skirtGeometry, scrapClothMaterial);
    skirt.position.y = 0.55;
    skirt.castShadow = true;
    group.add(skirt);

    // Battle skirt strips
    for (let i = 0; i < 6; i++) {
      const stripGeometry = new THREE.BoxGeometry(0.08, 0.25, 0.02);
      const strip = new THREE.Mesh(stripGeometry, brownClothMaterial);
      const angle = (i / 6) * Math.PI * 2;
      strip.position.set(
        Math.sin(angle) * 0.36,
        0.28,
        Math.cos(angle) * 0.36
      );
      strip.rotation.x = 0.15;
      strip.castShadow = true;
      group.add(strip);
    }

    // Arm guards
    const guardGeometry = new THREE.BoxGeometry(0.08, 0.25, 0.06);

    const leftGuard = new THREE.Mesh(guardGeometry, darkMetalMaterial);
    leftGuard.position.set(-0.68, 0.55, 0.03);
    leftGuard.rotation.z = 0.15;
    leftGuard.castShadow = true;
    group.add(leftGuard);

    const rightGuard = new THREE.Mesh(guardGeometry, darkMetalMaterial);
    rightGuard.position.set(0.68, 0.55, 0.03);
    rightGuard.rotation.z = -0.15;
    rightGuard.castShadow = true;
    group.add(rightGuard);

    // Red accent on arm guards
    const guardAccentGeometry = new THREE.BoxGeometry(0.02, 0.2, 0.02);

    const leftAccent = new THREE.Mesh(guardAccentGeometry, redGlowMaterial);
    leftAccent.position.set(-0.68, 0.55, 0.07);
    leftAccent.rotation.z = 0.15;
    group.add(leftAccent);

    const rightAccent = new THREE.Mesh(guardAccentGeometry, redGlowMaterial);
    rightAccent.position.set(0.68, 0.55, 0.07);
    rightAccent.rotation.z = -0.15;
    group.add(rightAccent);

    // Sword in right hand - blade
    const bladeGeometry = new THREE.BoxGeometry(0.04, 1.4, 0.02);
    const bladeMaterial = new THREE.MeshStandardMaterial({
      color: 0xaaaaaa,
      roughness: 0.2,
      metalness: 0.9
    });
    const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
    blade.position.set(0.82, 0.8, 0.02);
    blade.castShadow = true;
    group.add(blade);

    // Sword blade edge glow
    const edgeGeometry = new THREE.BoxGeometry(0.01, 1.3, 0.01);
    const edge = new THREE.Mesh(edgeGeometry, redGlowMaterial);
    edge.position.set(0.84, 0.8, 0.02);
    group.add(edge);

    // Sword crossguard
    const crossguardGeometry = new THREE.BoxGeometry(0.2, 0.04, 0.04);
    const crossguard = new THREE.Mesh(crossguardGeometry, darkMetalMaterial);
    crossguard.position.set(0.82, 0.12, 0.02);
    group.add(crossguard);

    // Sword grip
    const swordGripGeometry = new THREE.CylinderGeometry(0.025, 0.025, 0.15, 6);
    const swordGripMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a2a1a,
      roughness: 0.8,
      metalness: 0.1
    });
    const swordGrip = new THREE.Mesh(swordGripGeometry, swordGripMaterial);
    swordGrip.position.set(0.82, 0.04, 0.02);
    group.add(swordGrip);

    // Sword pommel
    const pommelGeometry = new THREE.SphereGeometry(0.04, 6, 6);
    const pommel = new THREE.Mesh(pommelGeometry, darkMetalMaterial);
    pommel.position.set(0.82, -0.04, 0.02);
    group.add(pommel);

    // Warrior belt with large buckle
    const beltGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.12, 8);
    const belt = new THREE.Mesh(beltGeometry, darkMetalMaterial);
    belt.position.y = 0.7;
    belt.castShadow = true;
    group.add(belt);

    // Skull buckle
    const buckleGeometry = new THREE.SphereGeometry(0.07, 8, 8);
    const buckleMaterial = new THREE.MeshStandardMaterial({
      color: 0xddd4c0,
      roughness: 0.5,
      metalness: 0.3
    });
    const buckle = new THREE.Mesh(buckleGeometry, buckleMaterial);
    buckle.position.set(0, 0.72, 0.4);
    buckle.scale.set(1, 1.2, 0.6);
    group.add(buckle);

    // Skull buckle eyes
    const buckleEyeGeometry = new THREE.SphereGeometry(0.015, 4, 4);
    const leftBuckleEye = new THREE.Mesh(buckleEyeGeometry, redGlowMaterial);
    leftBuckleEye.position.set(-0.025, 0.74, 0.43);
    group.add(leftBuckleEye);

    const rightBuckleEye = new THREE.Mesh(buckleEyeGeometry, redGlowMaterial);
    rightBuckleEye.position.set(0.025, 0.74, 0.43);
    group.add(rightBuckleEye);
  }

  // ===== DEFAULT GEAR (fallback) =====
  addDefaultGear(group, scrapClothMaterial, brownClothMaterial) {
    // Tattered hooded cloak
    const hoodGeometry = new THREE.ConeGeometry(0.48, 0.6, 8);
    const hood = new THREE.Mesh(hoodGeometry, scrapClothMaterial);
    hood.position.set(0, 2.25, -0.1);
    hood.rotation.x = 0.15;
    hood.castShadow = true;
    group.add(hood);

    // Shoulder cloths
    const shoulderGeometry = new THREE.BoxGeometry(0.25, 0.45, 0.04);

    const leftShoulderCloth = new THREE.Mesh(shoulderGeometry, brownClothMaterial);
    leftShoulderCloth.position.set(-0.42, 1.3, 0.02);
    leftShoulderCloth.rotation.z = 0.4;
    leftShoulderCloth.castShadow = true;
    group.add(leftShoulderCloth);

    const rightShoulderCloth = new THREE.Mesh(shoulderGeometry, brownClothMaterial);
    rightShoulderCloth.position.set(0.42, 1.3, 0.02);
    rightShoulderCloth.rotation.z = -0.4;
    rightShoulderCloth.castShadow = true;
    group.add(rightShoulderCloth);

    // Waist cloth
    const waistClothGeometry = new THREE.CylinderGeometry(0.4, 0.45, 0.5, 8, 1, true);
    const waistCloth = new THREE.Mesh(waistClothGeometry, scrapClothMaterial);
    waistCloth.position.y = 0.55;
    waistCloth.castShadow = true;
    group.add(waistCloth);

    // Tattered strips
    for (let i = 0; i < 4; i++) {
      const stripGeometry = new THREE.BoxGeometry(0.1, 0.3, 0.02);
      const strip = new THREE.Mesh(stripGeometry, brownClothMaterial);
      const angle = (i / 4) * Math.PI * 2;
      strip.position.set(
        Math.sin(angle) * 0.38,
        0.2,
        Math.cos(angle) * 0.38
      );
      strip.rotation.x = 0.2;
      strip.castShadow = true;
      group.add(strip);
    }

    // Arm wraps
    const armWrapGeometry = new THREE.CylinderGeometry(0.045, 0.045, 0.2, 8);

    const leftArmWrap = new THREE.Mesh(armWrapGeometry, brownClothMaterial);
    leftArmWrap.position.set(-0.68, 0.5, 0);
    leftArmWrap.rotation.z = 0.15;
    leftArmWrap.castShadow = true;
    group.add(leftArmWrap);

    const rightArmWrap = new THREE.Mesh(armWrapGeometry, brownClothMaterial);
    rightArmWrap.position.set(0.68, 0.5, 0);
    rightArmWrap.rotation.z = -0.15;
    rightArmWrap.castShadow = true;
    group.add(rightArmWrap);

    // Leg wraps
    const legWrapGeometry = new THREE.CylinderGeometry(0.055, 0.055, 0.25, 8);

    const leftLegWrap = new THREE.Mesh(legWrapGeometry, brownClothMaterial);
    leftLegWrap.position.set(-0.18, -0.65, 0);
    leftLegWrap.castShadow = true;
    group.add(leftLegWrap);

    const rightLegWrap = new THREE.Mesh(legWrapGeometry, brownClothMaterial);
    rightLegWrap.position.set(0.18, -0.65, 0);
    rightLegWrap.castShadow = true;
    group.add(rightLegWrap);

    // Belt buckle
    const buckleGeometry = new THREE.BoxGeometry(0.12, 0.12, 0.06);
    const buckleMaterial = new THREE.MeshStandardMaterial({
      color: 0x6a4a3a,
      roughness: 0.8,
      metalness: 0.6
    });
    const buckle = new THREE.Mesh(buckleGeometry, buckleMaterial);
    buckle.position.set(0, 0.72, 0.38);
    buckle.castShadow = true;
    group.add(buckle);
  }

  createEnemyMesh(entity) {
    const group = new THREE.Group();

    // Determine enemy type from class name
    const isGoblin = entity.constructor.name === 'Goblin';
    const isSlime = entity.constructor.name === 'ZombieSlime';

    if (isGoblin) {
      // Goblin - chitinous insect-like creature
      const bodyGeometry = new THREE.SphereGeometry(0.6, 8, 8);
      const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x3a4a35,
        roughness: 0.6,
        metalness: 0.4
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.position.y = 0.6;
      body.castShadow = true;
      group.add(body);

      // Glowing eyes
      const eyeGeometry = new THREE.SphereGeometry(0.08, 6, 6);
      const eyeMaterial = new THREE.MeshStandardMaterial({
        color: 0xffee44,
        emissive: 0xffee44,
        emissiveIntensity: 1.5
      });

      const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      leftEye.position.set(-0.2, 0.7, 0.5);
      group.add(leftEye);

      const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      rightEye.position.set(0.2, 0.7, 0.5);
      group.add(rightEye);

    } else if (isSlime) {
      // Slime - glowing organic blob
      const bodyGeometry = new THREE.SphereGeometry(0.5, 8, 6);
      bodyGeometry.scale(1, 0.6, 1); // Squash it
      const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x884422,
        roughness: 0.3,
        metalness: 0.1,
        emissive: 0xff4422,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.9
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.position.y = 0.3;
      body.castShadow = true;
      group.add(body);

      // Internal glow
      const glowLight = new THREE.PointLight(0xff4422, 0.5, 2);
      glowLight.position.y = 0.3;
      group.add(glowLight);
    }

    return group;
  }

  createPlatformMesh(entity) {
    const group = new THREE.Group();

    // Convert 2D size to 3D size (scale factor)
    const scaleX = entity.size.width / 40; // 40px = 1 unit
    const scaleY = entity.size.height / 40;
    const depth = 2; // Fixed depth for platforms

    // Main platform (scrap metal)
    const platformGeometry = new THREE.BoxGeometry(scaleX, scaleY, depth);
    const platformMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a3a,
      roughness: 0.8,
      metalness: 0.7
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.castShadow = true;
    platform.receiveShadow = true;
    group.add(platform);

    // Add glowing edges for magical scrap
    const edgeGeometry = new THREE.BoxGeometry(scaleX + 0.1, scaleY + 0.1, depth + 0.1);
    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ffaa,
      emissive: 0x00ffaa,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.2,
      wireframe: true
    });
    const edge = new THREE.Mesh(edgeGeometry, edgeMaterial);
    group.add(edge);

    return group;
  }

  createProjectileMesh(entity) {
    const group = new THREE.Group();

    // Use class-specific color from entity, fall back to default green
    let projectileColor = 0x00ffaa;
    if (entity.color) {
      // Parse hex color string like '#4488ff' to number
      const colorStr = entity.color.replace('#', '');
      projectileColor = parseInt(colorStr, 16);
    }

    // Glowing magical projectile
    const geometry = new THREE.SphereGeometry(0.3, 8, 8);
    const material = new THREE.MeshStandardMaterial({
      color: projectileColor,
      emissive: projectileColor,
      emissiveIntensity: 2,
      transparent: true,
      opacity: 0.9
    });
    const sphere = new THREE.Mesh(geometry, material);
    group.add(sphere);

    // Glow effect
    const light = new THREE.PointLight(projectileColor, 1, 5);
    group.add(light);

    // Trail particles
    const trailGeometry = new THREE.SphereGeometry(0.4, 6, 6);
    const trailMaterial = new THREE.MeshBasicMaterial({
      color: projectileColor,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });
    const trail = new THREE.Mesh(trailGeometry, trailMaterial);
    group.add(trail);

    return group;
  }

  createMeleeSlashEffect(entity) {
    const group = new THREE.Group();

    // Red slash arc
    const slashGeometry = new THREE.TorusGeometry(0.8, 0.04, 4, 12, Math.PI * 0.6);
    const slashMaterial = new THREE.MeshStandardMaterial({
      color: 0xff4444,
      emissive: 0xff4444,
      emissiveIntensity: 4,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide
    });
    const slash = new THREE.Mesh(slashGeometry, slashMaterial);
    slash.rotation.z = -Math.PI / 4;
    group.add(slash);

    // Inner slash trail (wider, more transparent)
    const trailGeometry = new THREE.TorusGeometry(0.8, 0.12, 4, 12, Math.PI * 0.6);
    const trailMaterial = new THREE.MeshBasicMaterial({
      color: 0xff4444,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
    const trail = new THREE.Mesh(trailGeometry, trailMaterial);
    trail.rotation.z = -Math.PI / 4;
    group.add(trail);

    // Slash glow light
    const slashLight = new THREE.PointLight(0xff4444, 2, 6);
    group.add(slashLight);

    // Position at entity
    const posX = (entity.position.x - 400) / 40;
    const posY = -(entity.position.y - 300) / 40;
    const direction = entity.facingRight ? 1 : -1;
    group.position.set(posX + direction * 1.2, posY, 0);
    group.scale.x = direction;

    this.scene.add(group);

    // Animate fade out and remove
    let opacity = 1.0;
    const fadeInterval = setInterval(() => {
      opacity -= 0.15;
      slashMaterial.opacity = Math.max(0, opacity);
      trailMaterial.opacity = Math.max(0, opacity * 0.3);
      slashLight.intensity = Math.max(0, opacity * 2);
      if (opacity <= 0) {
        clearInterval(fadeInterval);
        this.scene.remove(group);
        slashGeometry.dispose();
        slashMaterial.dispose();
        trailGeometry.dispose();
        trailMaterial.dispose();
      }
    }, 30);
  }

  createDefaultMesh(entity) {
    const scaleX = entity.size.width / 40;
    const scaleY = entity.size.height / 40;

    const geometry = new THREE.BoxGeometry(scaleX, scaleY, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0xff00ff });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    return mesh;
  }

  /**
   * Update entity mesh position and state
   */
  updateEntity(entity) {
    if (!this.entityMeshes.has(entity)) {
      this.createEntity(entity);
    }

    const mesh = this.entityMeshes.get(entity);

    if (!entity.visible || !entity.active) {
      mesh.visible = false;
      return;
    }

    mesh.visible = true;

    // Convert 2D position to 3D position
    // Y in 2D (down) becomes Y in 3D (up), so invert
    // X in 2D (right) becomes X in 3D (right)
    mesh.position.x = (entity.position.x - 400) / 40; // Center around origin
    mesh.position.y = -(entity.position.y - 300) / 40; // Invert Y, center
    mesh.position.z = 0;

    // Facing direction (scale X to flip)
    if (entity.facingRight !== undefined) {
      mesh.scale.x = entity.facingRight ? 1 : -1;
    }

    // Melee slash effect trigger
    if (entity.showMeleeSlash) {
      entity.showMeleeSlash = false;
      this.createMeleeSlashEffect(entity);
    }
  }

  /**
   * Remove entity mesh
   */
  removeEntity(entity) {
    const mesh = this.entityMeshes.get(entity);
    if (mesh) {
      this.scene.remove(mesh);
      this.entityMeshes.delete(entity);

      // Dispose geometry and materials
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(mat => mat.dispose());
        } else {
          mesh.material.dispose();
        }
      }
    }
  }

  /**
   * Render all entities
   */
  renderEntities(entities) {
    for (const entity of entities) {
      if (!entity.active) {
        this.removeEntity(entity);
        continue;
      }

      this.updateEntity(entity);
    }
  }

  /**
   * Update camera to follow player
   */
  updateCamera(player, levelWidth, levelHeight) {
    if (!player) return;

    // Convert player 2D position to 3D
    const targetX = (player.position.x - 400) / 40;
    const targetY = -(player.position.y - 300) / 40;

    // Smooth camera follow
    this.camera.position.x += (targetX - this.camera.position.x) * 0.1;
    this.camera.position.y += ((targetY + 5) - this.camera.position.y) * 0.1;

    // Look at player
    this.camera.lookAt(targetX, targetY, 0);
  }

  /**
   * Animate particles (ghostly wisps)
   */
  animateParticles(deltaTime) {
    if (!this.particles) return;

    const positions = this.particles.geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      // Float particles up slowly (ghostly drift)
      positions[i + 1] += deltaTime * 1.2;

      // Slight horizontal drift (wind effect)
      positions[i] += Math.sin(Date.now() * 0.001 + i) * deltaTime * 0.3;

      // Reset if too high
      if (positions[i + 1] > 25) {
        positions[i + 1] = -8;
      }

      // Keep within bounds
      if (Math.abs(positions[i]) > 150) {
        positions[i] = (Math.random() - 0.5) * 200;
      }
    }

    this.particles.geometry.attributes.position.needsUpdate = true;
    // Very slow rotation for ethereal effect
    this.particles.rotation.y += deltaTime * 0.05;
  }

  /**
   * Main render function
   */
  render(deltaTime = 0) {
    this.animateParticles(deltaTime);
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Clear all entities
   */
  clear() {
    for (const [entity, mesh] of this.entityMeshes) {
      this.scene.remove(mesh);
    }
    this.entityMeshes.clear();
  }

  /**
   * Cleanup
   */
  dispose() {
    this.clear();
    this.renderer.dispose();
  }
}
