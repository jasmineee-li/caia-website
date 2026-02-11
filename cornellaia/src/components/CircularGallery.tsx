"use client";

import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import { useEffect, useRef } from "react";

type GL = Renderer["gl"];

interface GalleryItem {
  image: string;
  title: string;
  badge?: string;
  href?: string;
}

const CARD_WIDTH = 1200;
const CARD_HEIGHT = 1830;
const CARD_PADDING = 36;
const CARD_IMAGE_HEIGHT = 1340;
const CARD_PLANE_BASE_HEIGHT = 1020;
const CARD_PLANE_BASE_WIDTH = Math.round((CARD_WIDTH / CARD_HEIGHT) * CARD_PLANE_BASE_HEIGHT);
const CLICK_DRAG_THRESHOLD = 8;
const MOBILE_BREAKPOINT = 640;
const GESTURE_LOCK_THRESHOLD = 12;
const GALLERY_IMAGE_CACHE = new Map<string, HTMLImageElement>();

function debounce<F extends (...args: unknown[]) => void>(func: F, wait: number) {
  let timeout: number | undefined;

  return function debounced(this: unknown, ...args: Parameters<F>) {
    if (timeout) {
      window.clearTimeout(timeout);
    }

    timeout = window.setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

function getFontSize(font: string): number {
  const match = font.match(/(\d+)px/);
  return match ? Number.parseInt(match[1], 10) : 22;
}

function getFontFamily(font: string): string {
  const split = font.split("px");
  return split.length > 1 ? split[1].trim() : "Inter, Arial, sans-serif";
}

function wrapTextLines(context: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return ["Untitled"];
  }

  const lines: string[] = [];
  let currentLine = "";

  words.forEach((word) => {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    const width = context.measureText(candidate).width;

    if (width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
      return;
    }

    currentLine = candidate;
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

function ellipsizeLine(context: CanvasRenderingContext2D, line: string, maxWidth: number): string {
  if (context.measureText(line).width <= maxWidth) {
    return line;
  }

  let trimmed = line;
  while (trimmed.length > 0 && context.measureText(`${trimmed}...`).width > maxWidth) {
    trimmed = trimmed.slice(0, -1);
  }

  return `${trimmed.trimEnd()}...`;
}

function drawRoundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.min(radius, width / 2, height / 2);

  context.beginPath();
  context.moveTo(x + r, y);
  context.lineTo(x + width - r, y);
  context.quadraticCurveTo(x + width, y, x + width, y + r);
  context.lineTo(x + width, y + height - r);
  context.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  context.lineTo(x + r, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - r);
  context.lineTo(x, y + r);
  context.quadraticCurveTo(x, y, x + r, y);
  context.closePath();
}

function drawImageContain(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const targetRatio = width / height;

  let drawWidth = width;
  let drawHeight = height;

  if (imageRatio > targetRatio) {
    drawHeight = width / imageRatio;
  } else {
    drawWidth = height * imageRatio;
  }

  const drawX = x + (width - drawWidth) / 2;
  const drawY = y + (height - drawHeight) / 2;

  context.fillStyle = "#f8fafc";
  context.fillRect(x, y, width, height);
  context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
}

interface CardCanvasOptions {
  image?: HTMLImageElement;
  title: string;
  badge?: string;
  textColor: string;
  font: string;
}

function createCardCanvas({ image, title, badge, textColor, font }: CardCanvasOptions): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Unable to create canvas context");
  }

  const family = getFontFamily(font);
  const baseFontSize = Math.max(18, getFontSize(font));

  const imageX = CARD_PADDING;
  const imageY = CARD_PADDING;
  const imageWidth = CARD_WIDTH - CARD_PADDING * 2;
  const imageHeight = CARD_IMAGE_HEIGHT;
  const imageRadius = 18;

  context.clearRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  context.strokeStyle = "#e2e8f0";
  context.lineWidth = 2;
  context.strokeRect(1, 1, CARD_WIDTH - 2, CARD_HEIGHT - 2);

  drawRoundedRect(context, imageX, imageY, imageWidth, imageHeight, imageRadius);
  context.save();
  context.clip();

  if (image) {
    drawImageContain(context, image, imageX, imageY, imageWidth, imageHeight);
  } else {
    context.fillStyle = "#e2e8f0";
    context.fillRect(imageX, imageY, imageWidth, imageHeight);

    context.fillStyle = "#475569";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = `600 ${Math.round(baseFontSize * 1.5)}px ${family}`;
    context.fillText("Loading...", imageX + imageWidth / 2, imageY + imageHeight / 2);
  }

  context.restore();

  const dividerY = imageY + imageHeight + 10;
  context.beginPath();
  context.moveTo(CARD_PADDING, dividerY);
  context.lineTo(CARD_WIDTH - CARD_PADDING, dividerY);
  context.strokeStyle = "#e2e8f0";
  context.lineWidth = 2;
  context.stroke();

  const titleSize = Math.round(baseFontSize * 1.58);
  const titleLineHeight = Math.round(titleSize * 1.15);
  const titleTop = dividerY + 30;
  const titleMaxWidth = imageWidth;
  const titleMaxLinesDefault = 3;

  const safeBadge = badge?.trim();
  const badgeFontSize = Math.max(56, Math.round(titleSize * 0.74));
  const badgeFont = `700 ${badgeFontSize}px Inter, Arial, sans-serif`;
  const badgeHeight = badgeFontSize + 30;
  const badgeGap = safeBadge ? 16 : 0;
  const badgeBlockHeight = safeBadge ? badgeHeight + badgeGap : 0;
  const titleBottomLimit = CARD_HEIGHT - CARD_PADDING - badgeBlockHeight;
  const titleMaxLinesBySpace = Math.max(
    1,
    Math.floor((titleBottomLimit - titleTop + 6) / titleLineHeight),
  );
  const titleMaxLines = Math.min(titleMaxLinesDefault, titleMaxLinesBySpace);

  context.textAlign = "left";
  context.textBaseline = "top";
  context.fillStyle = textColor;
  context.font = `600 ${titleSize}px ${family}`;

  const rawLines = wrapTextLines(context, title.trim() || "Untitled", titleMaxWidth);
  const lines = rawLines.slice(0, titleMaxLines);

  if (rawLines.length > titleMaxLines && lines.length > 0) {
    const lastIndex = lines.length - 1;
    lines[lastIndex] = ellipsizeLine(context, lines[lastIndex], titleMaxWidth);
  }

  lines.forEach((line, index) => {
    context.fillText(line, CARD_PADDING, titleTop + index * titleLineHeight);
  });

  if (safeBadge) {
    context.font = badgeFont;
    const badgeTextWidth = context.measureText(safeBadge).width;
    const badgePaddingX = 34;
    const badgeWidth = Math.min(imageWidth, Math.ceil(badgeTextWidth + badgePaddingX * 2));
    const badgeX = CARD_PADDING;
    const badgeY = CARD_HEIGHT - CARD_PADDING - badgeHeight;

    drawRoundedRect(context, badgeX, badgeY, badgeWidth, badgeHeight, badgeHeight / 2);
    context.fillStyle = "#f8fafc";
    context.fill();

    context.strokeStyle = "#cbd5e1";
    context.lineWidth = 2;
    context.stroke();

    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "#0f172a";
    context.font = badgeFont;
    context.fillText(safeBadge, badgeX + badgeWidth / 2, badgeY + badgeHeight / 2 + 2);
  }

  return canvas;
}

interface ScreenSize {
  width: number;
  height: number;
}

interface Viewport {
  width: number;
  height: number;
}

interface MediaProps {
  geometry: Plane;
  gl: GL;
  image: string;
  index: number;
  length: number;
  scene: Transform;
  screen: ScreenSize;
  title: string;
  badge?: string;
  href?: string;
  viewport: Viewport;
  bend: number;
  textColor: string;
  borderRadius?: number;
  font?: string;
}

class Media {
  extra = 0;

  private geometry: Plane;
  private gl: GL;
  private image: string;
  private index: number;
  private length: number;
  private scene: Transform;
  private screen: ScreenSize;
  private title: string;
  private badge?: string;
  private href?: string;
  private viewport: Viewport;
  private bend: number;
  private textColor: string;
  private borderRadius: number;
  private font: string;

  private program!: Program;
  private texture!: Texture;

  plane!: Mesh;

  private scale!: number;
  private padding!: number;
  width!: number;
  private widthTotal!: number;
  private x!: number;

  private speed = 0;
  private isBefore = false;
  private isAfter = false;

  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    scene,
    screen,
    title,
    badge,
    href,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font,
  }: MediaProps) {
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.scene = scene;
    this.screen = screen;
    this.title = title;
    this.badge = badge;
    this.href = href;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font || "700 48px Young Serif, Times New Roman, serif";

    this.createShader();
    this.createMesh();
    this.onResize();
  }

  private createShader() {
    this.texture = new Texture(this.gl, {
      generateMipmaps: false,
    });

    this.texture.image = createCardCanvas({
      title: this.title,
      badge: this.badge,
      textColor: this.textColor,
      font: this.font,
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
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;

        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }

        void main() {
          vec4 color = texture2D(tMap, vUv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float edgeSmooth = 0.002;
          float alpha = (1.0 - smoothstep(-edgeSmooth, edgeSmooth, d)) * color.a;
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: this.texture },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    });

    this.populateTexture();
  }

  private populateTexture() {
    const applyImageTexture = (image: HTMLImageElement) => {
      this.texture.image = createCardCanvas({
        image,
        title: this.title,
        badge: this.badge,
        textColor: this.textColor,
        font: this.font,
      });
    };

    const cached = GALLERY_IMAGE_CACHE.get(this.image);
    if (cached && cached.complete && cached.naturalWidth > 0) {
      applyImageTexture(cached);
      return;
    }

    const image = cached ?? new Image();
    if (!cached) {
      image.crossOrigin = "anonymous";
      image.decoding = "async";
      GALLERY_IMAGE_CACHE.set(this.image, image);
      image.src = this.image;
    }

    if (image.complete && image.naturalWidth > 0) {
      applyImageTexture(image);
      return;
    }

    image.addEventListener(
      "load",
      () => {
        applyImageTexture(image);
      },
      { once: true },
    );

    image.addEventListener(
      "error",
      () => {
        GALLERY_IMAGE_CACHE.delete(this.image);
      },
      { once: true },
    );
  }

  private createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.plane.setParent(this.scene);
  }

  getHref() {
    return this.href;
  }

  update(scroll: { current: number; last: number }, direction: "right" | "left") {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const halfViewport = this.viewport.width / 2;
    const effectiveBend = this.screen.width < MOBILE_BREAKPOINT ? this.bend * 0.45 : this.bend;

    if (effectiveBend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const bendAbs = Math.abs(effectiveBend);
      const radius = (halfViewport * halfViewport + bendAbs * bendAbs) / (2 * bendAbs);
      const effectiveX = Math.min(Math.abs(x), halfViewport);
      const arc = radius - Math.sqrt(radius * radius - effectiveX * effectiveX);

      if (effectiveBend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / radius);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / radius);
      }
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;

    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;

    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = false;
      this.isAfter = false;
    }

    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = false;
      this.isAfter = false;
    }
  }

  onResize({ screen, viewport }: { screen?: ScreenSize; viewport?: Viewport } = {}) {
    if (screen) {
      this.screen = screen;
    }

    if (viewport) {
      this.viewport = viewport;
    }

    this.scale = this.screen.height / 1500;
    const mobileScaleFactor = this.screen.width < MOBILE_BREAKPOINT ? 0.88 : 1;
    const planeBaseHeight = CARD_PLANE_BASE_HEIGHT * mobileScaleFactor;
    const planeBaseWidth = CARD_PLANE_BASE_WIDTH * mobileScaleFactor;
    this.plane.scale.y = (this.viewport.height * (planeBaseHeight * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (planeBaseWidth * this.scale)) / this.screen.width;

    this.padding = 2;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

interface AppConfig {
  items?: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
}

class App {
  private container: HTMLElement;
  private scrollSpeed: number;
  private scroll: {
    ease: number;
    current: number;
    target: number;
    last: number;
    position: number;
  };

  private onCheckDebounce: () => void;

  private renderer!: Renderer;
  private gl!: GL;
  private camera!: Camera;
  private scene!: Transform;
  private planeGeometry!: Plane;

  private medias: Media[] = [];
  private mediasImages: GalleryItem[] = [];

  private screen!: { width: number; height: number };
  private viewport!: { width: number; height: number };

  private raf = 0;

  private boundOnResize!: () => void;
  private boundOnWheel!: (event: Event) => void;
  private boundOnTouchDown!: (event: MouseEvent | TouchEvent) => void;
  private boundOnTouchMove!: (event: MouseEvent | TouchEvent) => void;
  private boundOnTouchUp!: (event: MouseEvent | TouchEvent) => void;

  private isDown = false;
  private start = 0;
  private startY = 0;
  private hasMoved = false;
  private isHorizontalGesture = false;
  private isVerticalGesture = false;
  private lastDeltaX = 0;

  constructor(
    container: HTMLElement,
    {
      items,
      bend = 1,
      textColor = "#0f172a",
      borderRadius = 0.03,
      font = "700 48px Young Serif, Times New Roman, serif",
      scrollSpeed = 0.5,
      scrollEase = 0.05,
    }: AppConfig,
  ) {
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0, position: 0 };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font);
    this.update();
    this.addEventListeners();
  }

  private createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });

    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);

    this.container.appendChild(this.renderer.gl.canvas as HTMLCanvasElement);
  }

  private createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  private createScene() {
    this.scene = new Transform();
  }

  private createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100,
    });
  }

  private createMedias(
    items: GalleryItem[] | undefined,
    bend: number,
    textColor: string,
    borderRadius: number,
    font: string,
  ) {
    const defaultItems: GalleryItem[] = [
      { image: "https://picsum.photos/seed/1/800/600?grayscale", title: "Bridge", badge: "Photo" },
      { image: "https://picsum.photos/seed/2/800/600?grayscale", title: "Desk Setup", badge: "Photo" },
      { image: "https://picsum.photos/seed/3/800/600?grayscale", title: "Waterfall", badge: "Photo" },
      { image: "https://picsum.photos/seed/4/800/600?grayscale", title: "Strawberries", badge: "Photo" },
      { image: "https://picsum.photos/seed/5/800/600?grayscale", title: "Deep Diving", badge: "Photo" },
      { image: "https://picsum.photos/seed/16/800/600?grayscale", title: "Train Track", badge: "Photo" },
      { image: "https://picsum.photos/seed/17/800/600?grayscale", title: "Santorini", badge: "Photo" },
      { image: "https://picsum.photos/seed/8/800/600?grayscale", title: "Blurry Lights", badge: "Photo" },
      { image: "https://picsum.photos/seed/9/800/600?grayscale", title: "New York", badge: "Photo" },
      { image: "https://picsum.photos/seed/10/800/600?grayscale", title: "Good Boy", badge: "Photo" },
      { image: "https://picsum.photos/seed/21/800/600?grayscale", title: "Coastline", badge: "Photo" },
      { image: "https://picsum.photos/seed/12/800/600?grayscale", title: "Palm Trees", badge: "Photo" },
    ];

    const galleryItems = items && items.length > 0 ? items : defaultItems;
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
        title: data.title,
        badge: data.badge,
        href: data.href,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font,
      });
    });
  }

  private onTouchDown(event: MouseEvent | TouchEvent) {
    if ("button" in event && event.button !== 0) {
      return;
    }

    this.isDown = true;
    this.hasMoved = false;
    this.isHorizontalGesture = false;
    this.isVerticalGesture = false;
    this.lastDeltaX = 0;
    this.scroll.position = this.scroll.current;
    const point = "touches" in event ? event.touches[0] : event;
    this.start = point.clientX;
    this.startY = point.clientY;
  }

  private onTouchMove(event: MouseEvent | TouchEvent) {
    if (!this.isDown) {
      return;
    }

    const point = "touches" in event ? event.touches[0] : event;
    const currentX = point.clientX;
    const currentY = point.clientY;
    const deltaX = currentX - this.start;
    const deltaY = currentY - this.startY;
    this.lastDeltaX = deltaX;

    if (!this.isHorizontalGesture && !this.isVerticalGesture) {
      if (Math.abs(deltaX) > GESTURE_LOCK_THRESHOLD || Math.abs(deltaY) > GESTURE_LOCK_THRESHOLD) {
        if (Math.abs(deltaX) > Math.abs(deltaY) * 1.1) {
          this.isHorizontalGesture = true;
        } else if (Math.abs(deltaY) > Math.abs(deltaX) * 1.1) {
          this.isVerticalGesture = true;
        }
      }
    }

    if (this.isVerticalGesture) {
      return;
    }

    if ("touches" in event && event.cancelable && this.isHorizontalGesture) {
      event.preventDefault();
    }

    const movedDistance = Math.hypot(currentX - this.start, currentY - this.startY);
    if (movedDistance > CLICK_DRAG_THRESHOLD) {
      this.hasMoved = true;
    }

    const isMobile = this.screen.width < MOBILE_BREAKPOINT;
    const dragScale = isMobile ? 0.15 : 0.04;
    const distance = (this.start - currentX) * (this.scrollSpeed * dragScale);
    this.scroll.target = this.scroll.position + distance;
  }

  private getPointer(event: MouseEvent | TouchEvent) {
    if ("changedTouches" in event && event.changedTouches.length > 0) {
      return event.changedTouches[0];
    }
    return event as MouseEvent;
  }

  private getFocusedHref(clientX: number, clientY: number) {
    if (this.medias.length === 0) {
      return undefined;
    }

    const rect = this.container.getBoundingClientRect();
    const xRatio = (clientX - rect.left) / rect.width;
    const yRatio = (clientY - rect.top) / rect.height;
    const worldX = (xRatio * 2 - 1) * (this.viewport.width / 2);
    const worldY = (1 - yRatio * 2) * (this.viewport.height / 2);

    let bestMatch: { href?: string; score: number } | undefined;

    this.medias.forEach((media) => {
      const halfW = media.plane.scale.x / 2;
      const halfH = media.plane.scale.y / 2;
      const dx = Math.abs(worldX - media.plane.position.x) / halfW;
      const dy = Math.abs(worldY - media.plane.position.y) / halfH;
      const inside = dx <= 1.05 && dy <= 1.05;

      if (inside) {
        const score = dx + dy;
        if (!bestMatch || score < bestMatch.score) {
          bestMatch = { href: media.getHref(), score };
        }
      }
    });

    return bestMatch?.href;
  }

  private onTouchUp(event: MouseEvent | TouchEvent) {
    const shouldOpen = !this.hasMoved && this.isDown;
    const pointer = this.getPointer(event);
    const horizontalGesture = this.isHorizontalGesture;

    this.isDown = false;
    this.hasMoved = false;
    this.isHorizontalGesture = false;
    this.isVerticalGesture = false;
    this.lastDeltaX = 0;
    this.onCheck();

    if (horizontalGesture) {
      return;
    }

    if (!shouldOpen) {
      return;
    }

    const href = this.getFocusedHref(pointer.clientX, pointer.clientY);
    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  }

  private onWheel(event: Event) {
    const wheelEvent = event as WheelEvent;
    const delta = wheelEvent.deltaY;

    if (delta === 0) {
      return;
    }

    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  }

  private onCheck() {
    if (!this.medias[0]) {
      return;
    }

    const itemWidth = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / itemWidth);
    const item = itemWidth * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  private onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };

    this.renderer.setSize(this.screen.width, this.screen.height);

    this.camera.perspective({
      aspect: this.screen.width / this.screen.height,
    });

    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };

    this.medias.forEach((media) => {
      media.onResize({ screen: this.screen, viewport: this.viewport });
    });
  }

  private update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? "right" : "left";

    this.medias.forEach((media) => {
      media.update(this.scroll, direction);
    });

    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  private addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);

    window.addEventListener("resize", this.boundOnResize);
    window.addEventListener("wheel", this.boundOnWheel);

    this.container.addEventListener("mousedown", this.boundOnTouchDown);
    window.addEventListener("mousemove", this.boundOnTouchMove);
    window.addEventListener("mouseup", this.boundOnTouchUp);

    this.container.addEventListener("touchstart", this.boundOnTouchDown);
    window.addEventListener("touchmove", this.boundOnTouchMove, { passive: false });
    window.addEventListener("touchend", this.boundOnTouchUp);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);

    window.removeEventListener("resize", this.boundOnResize);
    window.removeEventListener("wheel", this.boundOnWheel);

    this.container.removeEventListener("mousedown", this.boundOnTouchDown);
    window.removeEventListener("mousemove", this.boundOnTouchMove);
    window.removeEventListener("mouseup", this.boundOnTouchUp);

    this.container.removeEventListener("touchstart", this.boundOnTouchDown);
    window.removeEventListener("touchmove", this.boundOnTouchMove);
    window.removeEventListener("touchend", this.boundOnTouchUp);

    const canvas = this.renderer.gl.canvas as HTMLCanvasElement;
    if (canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
  }
}

interface CircularGalleryProps {
  items?: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = "#0f172a",
  borderRadius = 0.03,
  font = "700 48px Young Serif, Times New Roman, serif",
  scrollSpeed = 0.5,
  scrollEase = 0.05,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const app = new App(containerRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      font,
      scrollSpeed,
      scrollEase,
    });

    return () => {
      app.destroy();
    };
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full cursor-grab overflow-hidden active:cursor-grabbing"
      style={{ touchAction: "pan-y" }}
      aria-label="Circular student research gallery"
    />
  );
}
