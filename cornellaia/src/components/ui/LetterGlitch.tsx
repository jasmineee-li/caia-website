"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type Rgb = { r: number; g: number; b: number };

type LetterState = {
  char: string;
  color: Rgb;
  targetColor: Rgb;
  baseColor: Rgb;
  glitchUntil: number;
};

interface LetterGlitchProps {
  glitchColors?: string[];
  glitchSpeed?: number;
  centerVignette?: boolean;
  outerVignette?: boolean;
  smooth?: boolean;
  characters?: string;
  imageSrc?: string;
  imageFit?: "cover" | "contain";
  quantizationLevels?: number;
  className?: string;
}

const FONT_SIZE = 16;
const CHAR_WIDTH = 10;
const CHAR_HEIGHT = 20;
const LETTER_GLITCH_IMAGE_CACHE = new Map<string, HTMLImageElement>();

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const colorDistance = (a: Rgb, b: Rgb) =>
  Math.abs(a.r - b.r) + Math.abs(a.g - b.g) + Math.abs(a.b - b.b);

const parseColorToRgb = (color: string): Rgb | null => {
  const normalized = color.trim();
  const shorthand = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const expanded = normalized.replace(shorthand, (_m, r, g, b) => `${r}${r}${g}${g}${b}${b}`);
  const hexMatch = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(expanded);
  if (hexMatch) {
    return {
      r: parseInt(hexMatch[1], 16),
      g: parseInt(hexMatch[2], 16),
      b: parseInt(hexMatch[3], 16),
    };
  }

  const rgbMatch =
    /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i.exec(normalized);
  if (!rgbMatch) return null;
  return {
    r: clamp(parseInt(rgbMatch[1], 10), 0, 255),
    g: clamp(parseInt(rgbMatch[2], 10), 0, 255),
    b: clamp(parseInt(rgbMatch[3], 10), 0, 255),
  };
};

const quantizeChannel = (value: number, levels: number) => {
  const safeLevels = Math.max(2, Math.round(levels));
  const step = 255 / (safeLevels - 1);
  return Math.round(clamp(value, 0, 255) / step) * step;
};

const quantizeColor = (rgb: Rgb, levels: number): Rgb => ({
  r: quantizeChannel(rgb.r, levels),
  g: quantizeChannel(rgb.g, levels),
  b: quantizeChannel(rgb.b, levels),
});

const lerp = (start: number, end: number, amount: number) => start + (end - start) * amount;

export default function LetterGlitch({
  glitchColors = ["#2b4539", "#61dca3", "#61b3dc"],
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789",
  imageSrc,
  imageFit = "cover",
  quantizationLevels = 6,
  className,
}: LetterGlitchProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const lettersAndSymbols = Array.from(characters);
    const fallbackColors =
      glitchColors.map(parseColorToRgb).filter((color): color is Rgb => color !== null) ||
      [];
    const sampleCanvas = document.createElement("canvas");
    const sampleCtx = sampleCanvas.getContext("2d");

    let letters: LetterState[] = [];
    let grid = { columns: 0, rows: 0 };
    let rafId = 0;
    let lastGlitchTime = Date.now();
    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
    let sourceImage: HTMLImageElement | null = null;
    let imageLoaded = false;
    let isDestroyed = false;

    const getRandomChar = () =>
      lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)] ?? "A";

    const getRandomFallbackColor = (): Rgb => {
      if (fallbackColors.length === 0) return { r: 97, g: 179, b: 220 };
      return fallbackColors[Math.floor(Math.random() * fallbackColors.length)];
    };

    const getImageColors = (columns: number, rows: number): Rgb[] => {
      if (!sampleCtx || !sourceImage || !imageLoaded) {
        return Array.from({ length: columns * rows }, getRandomFallbackColor);
      }

      const sampleWidth = columns * CHAR_WIDTH;
      const sampleHeight = rows * CHAR_HEIGHT;

      sampleCanvas.width = sampleWidth;
      sampleCanvas.height = sampleHeight;
      sampleCtx.clearRect(0, 0, sampleWidth, sampleHeight);

      sampleCtx.fillStyle = "rgb(0, 0, 0)";
      sampleCtx.fillRect(0, 0, sampleWidth, sampleHeight);

      const scaleBase =
        imageFit === "contain"
          ? Math.min(sampleWidth / sourceImage.naturalWidth, sampleHeight / sourceImage.naturalHeight)
          : Math.max(sampleWidth / sourceImage.naturalWidth, sampleHeight / sourceImage.naturalHeight);
      const scale = Math.max(scaleBase, 0.0001);
      const drawWidth = sourceImage.naturalWidth * scale;
      const drawHeight = sourceImage.naturalHeight * scale;
      const drawX = (sampleWidth - drawWidth) / 2;
      const drawY = (sampleHeight - drawHeight) / 2;

      sampleCtx.drawImage(sourceImage, drawX, drawY, drawWidth, drawHeight);
      const imageData = sampleCtx.getImageData(0, 0, sampleWidth, sampleHeight).data;

      return Array.from({ length: columns * rows }, (_, index) => {
        const col = index % columns;
        const row = Math.floor(index / columns);
        const sampleX = clamp(Math.floor(col * CHAR_WIDTH + CHAR_WIDTH / 2), 0, sampleWidth - 1);
        const sampleY = clamp(Math.floor(row * CHAR_HEIGHT + CHAR_HEIGHT / 2), 0, sampleHeight - 1);
        const offset = (sampleY * sampleWidth + sampleX) * 4;
        return quantizeColor(
          {
            r: imageData[offset],
            g: imageData[offset + 1],
            b: imageData[offset + 2],
          },
          quantizationLevels,
        );
      });
    };

    const initializeLetters = (columns: number, rows: number) => {
      grid = { columns, rows };
      const baseColors = getImageColors(columns, rows);

      letters = Array.from({ length: columns * rows }, (_, index) => {
        const baseColor = baseColors[index] ?? getRandomFallbackColor();
        return {
          char: getRandomChar(),
          color: { ...baseColor },
          targetColor: { ...baseColor },
          baseColor: { ...baseColor },
          glitchUntil: 0,
        };
      });
    };

    const drawLetters = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.font = `${FONT_SIZE}px monospace`;
      ctx.textBaseline = "top";

      letters.forEach((letter, index) => {
        const x = (index % grid.columns) * CHAR_WIDTH;
        const y = Math.floor(index / grid.columns) * CHAR_HEIGHT;
        ctx.fillStyle = `rgb(${Math.round(letter.color.r)}, ${Math.round(letter.color.g)}, ${Math.round(letter.color.b)})`;
        ctx.fillText(letter.char, x, y);
      });
    };

    const createGlitchColor = (baseColor: Rgb): Rgb => {
      const jitter = 36;
      const nextColor = {
        r: baseColor.r + (Math.random() * 2 - 1) * jitter,
        g: baseColor.g + (Math.random() * 2 - 1) * jitter,
        b: baseColor.b + (Math.random() * 2 - 1) * jitter,
      };
      return quantizeColor(nextColor, quantizationLevels);
    };

    const updateLetters = (now: number) => {
      const updateCount = Math.max(1, Math.floor(letters.length * 0.05));
      for (let i = 0; i < updateCount; i += 1) {
        const index = Math.floor(Math.random() * letters.length);
        const letter = letters[index];
        if (!letter) continue;

        letter.char = getRandomChar();
        letter.targetColor = createGlitchColor(letter.baseColor);
        letter.glitchUntil = now + glitchSpeed * 3;

        if (!smooth) {
          letter.color = { ...letter.targetColor };
        }
      }
    };

    const transitionColors = (now: number) => {
      let changed = false;

      letters.forEach((letter) => {
        const target = now < letter.glitchUntil ? letter.targetColor : letter.baseColor;

        if (!smooth) {
          if (colorDistance(letter.color, target) > 0) {
            letter.color = { ...target };
            changed = true;
          }
          return;
        }

        const next = {
          r: lerp(letter.color.r, target.r, 0.18),
          g: lerp(letter.color.g, target.g, 0.18),
          b: lerp(letter.color.b, target.b, 0.18),
        };

        if (colorDistance(letter.color, next) > 0.45) {
          changed = true;
        }
        letter.color = next;
      });

      return changed;
    };

    const calculateGrid = (width: number, height: number) => ({
      columns: Math.max(1, Math.ceil(width / CHAR_WIDTH)),
      rows: Math.max(1, Math.ceil(height / CHAR_HEIGHT)),
    });

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const { columns, rows } = calculateGrid(rect.width, rect.height);
      initializeLetters(columns, rows);
      drawLetters();
    };

    const animate = () => {
      const now = Date.now();
      let shouldDraw = false;

      if (now - lastGlitchTime >= glitchSpeed) {
        updateLetters(now);
        lastGlitchTime = now;
        shouldDraw = true;
      }

      if (transitionColors(now)) {
        shouldDraw = true;
      }

      if (shouldDraw) {
        drawLetters();
      }

      rafId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (rafId) cancelAnimationFrame(rafId);
        resizeCanvas();
        animate();
      }, 100);
    };

    if (imageSrc) {
      const handleImageLoad = (image: HTMLImageElement) => {
        if (isDestroyed) return;
        sourceImage = image;
        imageLoaded = true;
        resizeCanvas();
      };

      const handleImageError = () => {
        if (isDestroyed) return;
        imageLoaded = false;
        sourceImage = null;
        LETTER_GLITCH_IMAGE_CACHE.delete(imageSrc);
        resizeCanvas();
      };

      const cachedImage = LETTER_GLITCH_IMAGE_CACHE.get(imageSrc);
      const image = cachedImage ?? new Image();

      if (!cachedImage) {
        image.decoding = "async";
        image.fetchPriority = "high";
        LETTER_GLITCH_IMAGE_CACHE.set(imageSrc, image);
        image.src = imageSrc;
      }

      if (image.complete && image.naturalWidth > 0) {
        handleImageLoad(image);
      } else {
        image.addEventListener("load", () => handleImageLoad(image), { once: true });
        image.addEventListener("error", handleImageError, { once: true });
      }
    }

    resizeCanvas();
    animate();
    window.addEventListener("resize", handleResize);

    return () => {
      isDestroyed = true;
      if (resizeTimeout) clearTimeout(resizeTimeout);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, [characters, glitchColors, glitchSpeed, imageFit, imageSrc, quantizationLevels, smooth]);

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-black", className)}>
      <canvas ref={canvasRef} className="block h-full w-full" />
      {outerVignette && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,0,0)_55%,_rgba(0,0,0,0.95)_100%)]" />
      )}
      {centerVignette && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,0,0.55)_0%,_rgba(0,0,0,0)_62%)]" />
      )}
    </div>
  );
}
