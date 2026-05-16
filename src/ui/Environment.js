/**
 * Environment - renders background scenery
 */
export class Environment {
  constructor(container) {
    this.container = container;
    this.layers = {};
  }

  init() {
    // Create sky layer
    this.createSkyLayer();

    // Create stars
    this.createStarsLayer();

    // Create moon
    this.createMoon();

    // Create distant mountains
    this.createMountains();

    // Create background trees
    this.createBackgroundTrees();

    // Create ground layer with details
    this.createGroundLayer();

    // Create atmospheric fog
    this.createFog();
  }

  createSkyLayer() {
    const sky = document.createElement('div');
    sky.id = 'sky-layer';
    sky.className = 'environment-layer';
    this.container.insertBefore(sky, this.container.firstChild);
    this.layers.sky = sky;
  }

  createStarsLayer() {
    const stars = document.createElement('div');
    stars.id = 'stars-layer';
    stars.className = 'environment-layer';
    this.container.insertBefore(stars, this.container.children[1]);
    this.layers.stars = stars;
  }

  createMoon() {
    const moon = document.createElement('div');
    moon.id = 'moon';
    this.container.appendChild(moon);
    this.layers.moon = moon;
  }

  createBackgroundTrees() {
    const bgLayer = document.createElement('div');
    bgLayer.id = 'background-layer';
    bgLayer.className = 'environment-layer';

    // Create several trees at different positions
    const treePositions = [
      { left: '5%', height: 100 },
      { left: '15%', height: 120 },
      { left: '30%', height: 90 },
      { left: '70%', height: 110 },
      { left: '85%', height: 95 },
      { left: '95%', height: 115 }
    ];

    treePositions.forEach(pos => {
      const tree = this.createTree(pos.height);
      tree.style.left = pos.left;
      bgLayer.appendChild(tree);
    });

    this.container.appendChild(bgLayer);
    this.layers.background = bgLayer;
  }

  createTree(height) {
    const tree = document.createElement('div');
    tree.className = 'background-tree';
    tree.style.height = `${height}px`;

    const trunk = document.createElement('div');
    trunk.className = 'tree-trunk';

    const foliage = document.createElement('div');
    foliage.className = 'tree-foliage';

    tree.appendChild(trunk);
    tree.appendChild(foliage);

    return tree;
  }

  createMountains() {
    const mountains = document.createElement('div');
    mountains.id = 'mountains-layer';
    mountains.className = 'environment-layer';
    mountains.style.zIndex = '2';
    mountains.style.opacity = '0.4';

    mountains.innerHTML = `
      <div class="mountain" style="left: 10%; width: 200px; height: 150px;"></div>
      <div class="mountain" style="left: 40%; width: 250px; height: 180px;"></div>
      <div class="mountain" style="left: 70%; width: 180px; height: 140px;"></div>
    `;

    this.container.appendChild(mountains);
    this.layers.mountains = mountains;
  }

  createGroundLayer() {
    const ground = document.createElement('div');
    ground.id = 'ground-layer';
    ground.className = 'environment-layer';
    ground.style.zIndex = '4';

    // Add grass tufts and rocks
    const decorations = [];

    // Grass tufts
    for (let i = 0; i < 30; i++) {
      const grass = document.createElement('div');
      grass.className = 'grass-tuft';
      grass.style.left = `${Math.random() * 100}%`;
      grass.style.bottom = '48px';
      grass.style.animationDelay = `${Math.random() * 2}s`;
      decorations.push(grass);
    }

    // Rocks
    for (let i = 0; i < 15; i++) {
      const rock = document.createElement('div');
      rock.className = 'rock';
      rock.style.left = `${Math.random() * 100}%`;
      rock.style.bottom = '48px';
      rock.style.width = `${8 + Math.random() * 12}px`;
      rock.style.height = `${6 + Math.random() * 10}px`;
      decorations.push(rock);
    }

    decorations.forEach(el => ground.appendChild(el));
    this.container.appendChild(ground);
    this.layers.ground = ground;
  }

  createFog() {
    const fog = document.createElement('div');
    fog.id = 'fog-layer';
    fog.className = 'environment-layer';
    fog.style.zIndex = '99';
    fog.style.pointerEvents = 'none';

    this.container.appendChild(fog);
    this.layers.fog = fog;
  }

  destroy() {
    Object.values(this.layers).forEach(layer => {
      if (layer && layer.parentNode) {
        layer.remove();
      }
    });
    this.layers = {};
  }
}
