import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useMemo, useRef } from 'react';

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== 'constructor' && typeof instance[key] === 'function') {
      instance[key] = instance[key].bind(instance);
    }
  });
}

const DEFAULT_FONT = 'bold 30px Figtree';
const DEFAULT_FONT_URL = 'https://fonts.googleapis.com/css2?family=Figtree:wght@400;700&display=swap';

const GENRE_ITEMS = [
  { text: 'Action & Adventure', image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Biography', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Business', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Business & Economics', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Children', image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80' },
  { text: "Children's", image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80' },
  { text: "Children's Fiction", image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Classic / Sci-Fi', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Economics', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Fantasy', image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Fiction', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Fiction / Non-Fiction', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Games', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Health & Fitness', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Historical Fiction', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=80' },
  { text: 'History', image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Humor', image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Mystery', image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Mystery & Thriller', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Non-Fiction', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Novel', image: 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f7?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Poem', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Poetry', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Religion & Spirituality', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Romance', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Science', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Science & Technology', image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Science Fiction', image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Self-Help', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Short Stories', image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Spirituality', image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Story', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Thriller & Suspense', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80' },
  { text: 'Travel', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80' },
  { text: 'True Crime', image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1200&q=80' }
];

function createGenreItems() {
  return GENRE_ITEMS.map((item) => ({ ...item }));
}

function deriveFontFamilyFromUrl(url) {
  const fileName = (url.split('/').pop() || 'custom-font').split('?')[0];
  const base = fileName.replace(/\.(woff2?|ttf|otf|eot)$/i, '');
  return base.replace(/[^a-zA-Z0-9-_ ]/g, '').trim() || 'CircularGalleryFont';
}

async function loadFontFromStylesheet(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch font stylesheet (${response.status})`);
  const cssText = await response.text();
  const faceBlocks = cssText.match(/@font-face\s*{[^}]*}/g) || [];
  let family = null;
  const fontFaces = [];
  for (const block of faceBlocks) {
    const familyMatch = block.match(/font-family:\s*([^;]+);/i);
    const urlMatch = block.match(/url\(([^)]+)\)/i);
    if (!familyMatch || !urlMatch) continue;
    family = familyMatch[1].trim().replace(/^['"]|['"]$/g, '');
    const descriptors = {};
    const weightMatch = block.match(/font-weight:\s*([^;]+);/i);
    const styleMatch = block.match(/font-style:\s*([^;]+);/i);
    const rangeMatch = block.match(/unicode-range:\s*([^;]+);/i);
    if (weightMatch) descriptors.weight = weightMatch[1].trim();
    if (styleMatch) descriptors.style = styleMatch[1].trim();
    if (rangeMatch) descriptors.unicodeRange = rangeMatch[1].trim();
    fontFaces.push(new FontFace(family, `url(${urlMatch[1]})`, descriptors));
  }
  if (!family) throw new Error('No @font-face rule found in the stylesheet');
  await Promise.allSettled(
    fontFaces.map(async (face) => {
      await face.load();
      document.fonts.add(face);
    })
  );
  return family;
}

async function loadFontFromFile(url) {
  const family = deriveFontFamilyFromUrl(url);
  const fontFace = new FontFace(family, `url(${url})`);
  await fontFace.load();
  document.fonts.add(fontFace);
  return family;
}

async function loadCustomFont(fontUrl) {
  const isStylesheet = fontUrl.includes('fonts.googleapis.com') || /\.css(\?.*)?$/i.test(fontUrl);
  return isStylesheet ? loadFontFromStylesheet(fontUrl) : loadFontFromFile(fontUrl);
}

async function resolveFont(font, fontUrl) {
  const effectiveUrl = fontUrl || (font === DEFAULT_FONT ? DEFAULT_FONT_URL : null);
  if (!effectiveUrl) {
    if (document.fonts && document.fonts.load) {
      try {
        await document.fonts.load(font);
        await document.fonts.ready;
      } catch {
        // Ignore and fall back to the browser default.
      }
    }
    return font;
  }
  try {
    const family = await loadCustomFont(effectiveUrl);
    const sizeMatch = font.match(/^\s*(.*?\d+px)/);
    const prefix = sizeMatch ? sizeMatch[1].trim() : 'bold 30px';
    const resolved = `${prefix} "${family}"`;
    if (document.fonts && document.fonts.load) {
      try {
        await document.fonts.load(resolved);
      } catch {
        // Ignore and render with the requested font.
      }
    }
    return resolved;
  } catch (error) {
    console.error('CircularGallery: unable to load font from', fontUrl, error);
    return font;
  }
}

function getFontSize(font) {
  const match = font.match(/(\d+)px/);
  return match ? parseInt(match[1], 10) : 30;
}

function createTextTexture(gl, text, font = 'bold 30px monospace', color = 'black') {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return { texture: null, width: 0, height: 0 };

  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const textHeight = Math.ceil(getFontSize(font) * 1.18);
  canvas.width = textWidth + 24;
  canvas.height = textHeight + 24;
  context.font = font;
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.lineJoin = 'round';
  context.strokeStyle = 'rgba(255, 255, 255, 0.92)';
  context.lineWidth = 3;
  context.strokeText(text, canvas.width / 2, canvas.height / 2);
  context.fillStyle = color;
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

class Title {
  constructor({ gl, plane, text, textColor = '#1b1b1b', font = '30px sans-serif' }) {
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.createMesh();
  }

  createMesh() {
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);
    if (!texture) return;

    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true
    });
    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    const textHeight = this.plane.scale.y * 0.17;
    const textWidth = textHeight * aspect;
    this.mesh.scale.set(textWidth, textHeight, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.48 - textHeight * 0.5 - 0.07;
    this.mesh.setParent(this.plane);
  }
}

class Media {
  constructor({ geometry, gl, image, index, length, scene, screen, text, viewport, bend, textColor, borderRadius = 0, font }) {
    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, {
      generateMipmaps: true
    });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.08 + uSpeed * 0.35);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;

        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }

        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);

          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);

          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius }
      },
      transparent: true
    });

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });
    this.plane.setParent(this.scene);
  }

  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      text: this.text,
      textColor: this.textColor,
      font: this.font
    });
  }

  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.03;
    this.program.uniforms.uSpeed.value = this.speed;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
    }
    this.scale = this.screen.height / 1500;
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width;
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.padding = 2;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

class App {
  constructor(
    container,
    {
      items,
      bend,
      textColor = '#1b1b1b',
      borderRadius = 0,
      font = 'bold 24px Figtree',
      scrollSpeed = 0.3,
      scrollEase = 0.018,
      isActive = true,
      onSelect,
      initialIndex = 0
    } = {}
  ) {
    document.documentElement.classList.remove('no-js');
    this.container = container;
    this.items = items || [];
    this.isActive = isActive;
    this.onSelect = onSelect;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.autoplaySpeed = scrollSpeed * 4.2;
    this.interactionBias = 0;
    this.isDragging = false;
    this.dragAnchor = 0;
    this.dragOffset = 0;
    this.pointerStartX = 0;
    this.lastFrameTime = 0;
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font);
    this.goToIndex(initialIndex, true);
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2)
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100
    });
  }

  createMedias(items, bend = 1, textColor, borderRadius, font) {
    const galleryItems = createGenreItems();
    this.galleryItems = galleryItems;
    this.mediasImages = galleryItems.concat(galleryItems);
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font
      });
    });
  }

  onPointerDown(event) {
    if (!this.isActive || !this.container) return;
    this.isDragging = true;
    this.pointerStartX = event.clientX;
    this.dragAnchor = this.scroll.current;
    this.dragOffset = 0;
    this.container.style.cursor = 'grabbing';
    event.preventDefault();
  }

  onPointerMove(event) {
    if (!this.isActive || !this.container) return;

    if (this.isDragging) {
      const distance = (this.pointerStartX - event.clientX) * (0.45 + this.scrollSpeed * 0.75);
      this.dragOffset = distance;
      this.scroll.target = this.dragAnchor + this.dragOffset;
      this.interactionBias = Math.sign(distance) * Math.min(4.5, Math.abs(distance) * 0.13);
      event.preventDefault();
      return;
    }

    const delta = event.clientX - (this.pointerLastX ?? event.clientX);
    if (Math.abs(delta) > 1) {
      const direction = delta > 0 ? 1 : -1;
      this.interactionBias = Math.max(-4.5, Math.min(4.5, this.interactionBias + direction * 0.6));
      this.pointerLastX = event.clientX;
    }
  }

  onPointerUp(event) {
    if (!this.isActive) return;
    this.isDragging = false;
    this.container.style.cursor = 'grab';
    if (event) event.preventDefault();
  }

  onPointerLeave() {
    this.isDragging = false;
    this.pointerLastX = null;
    this.container.style.cursor = 'grab';
  }

  onKeyDown(event) {
    if (!this.isActive) return;
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        this.interactionBias += this.scrollSpeed * 6;
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.interactionBias -= this.scrollSpeed * 6;
        break;
      default:
        break;
    }
  }

  onClick(event) {
    if (!this.isActive || !this.medias?.[0]) return;
    const rect = this.container.getBoundingClientRect();
    const relativeX = event.clientX - rect.left;
    const itemWidth = this.medias[0].width;
    const normalizedOffset = relativeX - rect.width / 2;
    const rawIndex = Math.round((normalizedOffset / Math.max(itemWidth, 1)) + this.scroll.current / Math.max(itemWidth, 1));
    const index = Math.max(0, Math.min(this.galleryItems.length - 1, rawIndex));
    this.goToIndex(index);
    this.onSelect?.(index);
  }

  goToIndex(index, immediate = false) {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const clampedIndex = Math.max(0, Math.min(this.galleryItems.length - 1, index));
    this.focusIndex = clampedIndex;
    this.scroll.target = clampedIndex * width;
    if (immediate) {
      this.scroll.current = this.scroll.target;
      this.scroll.last = this.scroll.current;
    }
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach((media) => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }
  }

  update(now = performance.now()) {
    const delta = this.lastFrameTime ? Math.min(0.032, (now - this.lastFrameTime) / 1000) : 1 / 60;
    this.lastFrameTime = now;

    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';

    if (!this.isDragging && Math.abs(this.interactionBias) > 0.001) {
      this.scroll.target += this.interactionBias * delta * 60;
      this.interactionBias *= Math.exp(-delta * 4.6);
    }

    this.scroll.target += this.autoplaySpeed * delta;

    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction));
    }

    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnPointerDown = this.onPointerDown.bind(this);
    this.boundOnPointerMove = this.onPointerMove.bind(this);
    this.boundOnPointerUp = this.onPointerUp.bind(this);
    this.boundOnPointerLeave = this.onPointerLeave.bind(this);
    this.boundOnKeyDown = this.onKeyDown.bind(this);
    this.boundOnClick = this.onClick.bind(this);
    window.addEventListener('resize', this.boundOnResize);
    this.container?.addEventListener('pointerdown', this.boundOnPointerDown);
    this.container?.addEventListener('pointermove', this.boundOnPointerMove);
    this.container?.addEventListener('pointerup', this.boundOnPointerUp);
    this.container?.addEventListener('pointerleave', this.boundOnPointerLeave);
    this.container?.addEventListener('keydown', this.boundOnKeyDown);
    this.container?.addEventListener('click', this.boundOnClick);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.boundOnResize);
    this.container?.removeEventListener('pointerdown', this.boundOnPointerDown);
    this.container?.removeEventListener('pointermove', this.boundOnPointerMove);
    this.container?.removeEventListener('pointerup', this.boundOnPointerUp);
    this.container?.removeEventListener('pointerleave', this.boundOnPointerLeave);
    this.container?.removeEventListener('keydown', this.boundOnKeyDown);
    this.container?.removeEventListener('click', this.boundOnClick);
    this.renderer?.gl?.canvas?.remove();
    this.renderer?.gl?.getExtension?.('WEBGL_lose_context')?.loseContext();
    this.renderer?.destroy?.();
  }
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = '#111111',
  borderRadius = 0.05,
  font = 'bold 24px Figtree',
  fontUrl,
  scrollSpeed = 0.3,
  scrollEase = 0.018,
  isActive = true,
  onSelect,
  initialIndex = 0
}) {
  const containerRef = useRef(null);
  const appRef = useRef(null);
  const galleryItems = useMemo(() => (Array.isArray(items) && items.length >= 35 ? items : createGenreItems()), [items]);

  useEffect(() => {
    if (!containerRef.current) return;
    let isMounted = true;
    resolveFont(font, fontUrl).then((resolvedFont) => {
      if (!isMounted || !containerRef.current) return;
      if (appRef.current) {
        appRef.current.destroy();
      }
      appRef.current = new App(containerRef.current, {
        items: galleryItems,
        bend,
        textColor,
        borderRadius,
        font: resolvedFont,
        scrollSpeed,
        scrollEase,
        isActive,
        onSelect,
        initialIndex
      });
      appRef.current.goToIndex(initialIndex, true);
    });

    return () => {
      isMounted = false;
      if (appRef.current) {
        appRef.current.destroy();
        appRef.current = null;
      }
    };
  }, [galleryItems, bend, textColor, borderRadius, font, fontUrl, scrollSpeed, scrollEase, initialIndex, isActive, onSelect]);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.style.pointerEvents = isActive ? 'auto' : 'none';
    if (appRef.current) {
      appRef.current.goToIndex(initialIndex, true);
    }
  }, [initialIndex, isActive]);

  return (
    <div
      className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
      tabIndex={0}
      role="region"
      aria-label="Circular image gallery. Use Left and Right Arrow keys to navigate."
      ref={containerRef}
      style={{ touchAction: 'none', userSelect: 'none' }}
    />
  );
}
