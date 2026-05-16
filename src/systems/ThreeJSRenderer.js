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

    // ===== SCRAP CLOTHING =====

    // Tattered hooded cloak
    const hoodGeometry = new THREE.ConeGeometry(0.48, 0.6, 8);
    const hood = new THREE.Mesh(hoodGeometry, scrapClothMaterial);
    hood.position.set(0, 2.25, -0.1);
    hood.rotation.x = 0.15;
    hood.castShadow = true;
    group.add(hood);

    // Ragged shoulder cloth (left)
    const leftShoulderGeometry = new THREE.BoxGeometry(0.25, 0.45, 0.04);
    const leftShoulderCloth = new THREE.Mesh(leftShoulderGeometry, brownClothMaterial);
    leftShoulderCloth.position.set(-0.42, 1.3, 0.02);
    leftShoulderCloth.rotation.z = 0.4;
    leftShoulderCloth.castShadow = true;
    group.add(leftShoulderCloth);

    // Ragged shoulder cloth (right)
    const rightShoulderGeometry = new THREE.BoxGeometry(0.25, 0.45, 0.04);
    const rightShoulderCloth = new THREE.Mesh(rightShoulderGeometry, brownClothMaterial);
    rightShoulderCloth.position.set(0.42, 1.3, 0.02);
    rightShoulderCloth.rotation.z = -0.4;
    rightShoulderCloth.castShadow = true;
    group.add(rightShoulderCloth);

    // Torn waist cloth / kilt
    const waistClothGeometry = new THREE.CylinderGeometry(0.4, 0.45, 0.5, 8, 1, true);
    const waistCloth = new THREE.Mesh(waistClothGeometry, scrapClothMaterial);
    waistCloth.position.y = 0.55;
    waistCloth.castShadow = true;
    group.add(waistCloth);

    // Tattered cloth strips hanging from waist
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

    // Wrapped cloth around forearms
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

    // Leg wraps / bindings
    const legWrapGeometry = new THREE.CylinderGeometry(0.055, 0.055, 0.25, 8);
    const leftLegWrap = new THREE.Mesh(legWrapGeometry, brownClothMaterial);
    leftLegWrap.position.set(-0.18, -0.65, 0);
    leftLegWrap.castShadow = true;
    group.add(leftLegWrap);

    const rightLegWrap = new THREE.Mesh(legWrapGeometry, brownClothMaterial);
    rightLegWrap.position.set(0.18, -0.65, 0);
    rightLegWrap.castShadow = true;
    group.add(rightLegWrap);

    // Rusty metal belt buckle
    const buckleGeometry = new THREE.BoxGeometry(0.12, 0.12, 0.06);
    const buckleMaterial = new THREE.MeshStandardMaterial({
      color: 0x6a4a3a, // Rusty metal
      roughness: 0.8,
      metalness: 0.6
    });
    const buckle = new THREE.Mesh(buckleGeometry, buckleMaterial);
    buckle.position.set(0, 0.72, 0.38);
    buckle.castShadow = true;
    group.add(buckle);

    return group;
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

    // Glowing magical projectile
    const geometry = new THREE.SphereGeometry(0.3, 8, 8);
    const material = new THREE.MeshStandardMaterial({
      color: 0x00ffaa,
      emissive: 0x00ffaa,
      emissiveIntensity: 2,
      transparent: true,
      opacity: 0.9
    });
    const sphere = new THREE.Mesh(geometry, material);
    group.add(sphere);

    // Glow effect
    const light = new THREE.PointLight(0x00ffaa, 1, 5);
    group.add(light);

    // Trail particles
    const trailGeometry = new THREE.SphereGeometry(0.4, 6, 6);
    const trailMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffaa,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });
    const trail = new THREE.Mesh(trailGeometry, trailMaterial);
    group.add(trail);

    return group;
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
