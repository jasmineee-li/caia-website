"use client";

import { useEffect, useRef } from "react";

type CanvasStrokeStyle = string | CanvasGradient | CanvasPattern;

interface GridOffset {
  x: number;
  y: number;
}

interface SquaresProps {
  direction?: "diagonal" | "up" | "right" | "down" | "left";
  speed?: number;
  borderColor?: CanvasStrokeStyle;
  squareSize?: number;
  size?: number;
  hoverFillColor?: CanvasStrokeStyle;
  hoverColor?: CanvasStrokeStyle;
  fadeOverlayColor?: string;
  className?: string;
}

export default function Squares({
  direction = "right",
  speed = 1,
  borderColor = "rgba(15, 23, 42, 0.12)",
  squareSize,
  size,
  hoverFillColor,
  hoverColor,
  fadeOverlayColor = "rgba(255, 255, 255, 0.78)",
  className,
}: SquaresProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const gridOffset = useRef<GridOffset>({ x: 0, y: 0 });
  const hoveredSquareRef = useRef<GridOffset | null>(null);
  const resolvedSquareSize = squareSize ?? size ?? 40;
  const resolvedHoverFill = hoverFillColor ?? hoverColor ?? "rgba(15, 23, 42, 0.2)";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cssWidth = 0;
    let cssHeight = 0;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      cssWidth = Math.max(1, Math.floor(rect.width));
      cssHeight = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawGrid = () => {
      ctx.clearRect(0, 0, cssWidth, cssHeight);

      const step = resolvedSquareSize;
      const startX = Math.floor(gridOffset.current.x / step) * step;
      const startY = Math.floor(gridOffset.current.y / step) * step;

      for (let x = startX; x < cssWidth + step; x += step) {
        for (let y = startY; y < cssHeight + step; y += step) {
          const squareX = x - (gridOffset.current.x % step);
          const squareY = y - (gridOffset.current.y % step);

          if (
            hoveredSquareRef.current &&
            Math.floor((x - startX) / step) === hoveredSquareRef.current.x &&
            Math.floor((y - startY) / step) === hoveredSquareRef.current.y
          ) {
            ctx.fillStyle = resolvedHoverFill;
            ctx.fillRect(squareX, squareY, step, step);
          }

          ctx.strokeStyle = borderColor;
          ctx.strokeRect(squareX, squareY, step, step);
        }
      }

      if (fadeOverlayColor !== "transparent") {
        const gradient = ctx.createRadialGradient(
          cssWidth / 2,
          cssHeight / 2,
          0,
          cssWidth / 2,
          cssHeight / 2,
          Math.sqrt(cssWidth ** 2 + cssHeight ** 2) / 2,
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(1, fadeOverlayColor);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, cssWidth, cssHeight);
      }
    };

    const updateAnimation = () => {
      const effectiveSpeed = Number.isFinite(speed) ? Math.max(speed, 0) : 0;
      switch (direction) {
        case "right":
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + resolvedSquareSize) % resolvedSquareSize;
          break;
        case "left":
          gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + resolvedSquareSize) % resolvedSquareSize;
          break;
        case "up":
          gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + resolvedSquareSize) % resolvedSquareSize;
          break;
        case "down":
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + resolvedSquareSize) % resolvedSquareSize;
          break;
        case "diagonal":
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + resolvedSquareSize) % resolvedSquareSize;
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + resolvedSquareSize) % resolvedSquareSize;
          break;
        default:
          break;
      }

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const startX = Math.floor(gridOffset.current.x / resolvedSquareSize) * resolvedSquareSize;
      const startY = Math.floor(gridOffset.current.y / resolvedSquareSize) * resolvedSquareSize;

      const hoveredSquareX = Math.floor((mouseX + gridOffset.current.x - startX) / resolvedSquareSize);
      const hoveredSquareY = Math.floor((mouseY + gridOffset.current.y - startY) / resolvedSquareSize);

      hoveredSquareRef.current = { x: hoveredSquareX, y: hoveredSquareY };
    };

    const handleMouseLeave = () => {
      hoveredSquareRef.current = null;
    };

    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    resizeCanvas();
    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [borderColor, direction, fadeOverlayColor, resolvedHoverFill, resolvedSquareSize, speed]);

  return <canvas ref={canvasRef} className={`block h-full w-full ${className ?? ""}`} />;
}
