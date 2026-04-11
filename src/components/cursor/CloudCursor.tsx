import { useEffect, useRef } from "react";

interface TrailPoint {
  x: number;
  y: number;
  t: number;
}

const SWOOSH_LIFE_MS = 240;

export default function CloudCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -300, y: -300, visible: false });
  const trailRef = useRef<TrailPoint[]>([]);
  const sizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      sizeRef.current = { width, height };

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (event: MouseEvent) => {
      const now = performance.now();
      mouseRef.current = { x: event.clientX, y: event.clientY, visible: true };
      trailRef.current.push({ x: event.clientX, y: event.clientY, t: now });

      if (trailRef.current.length > 28) {
        trailRef.current = trailRef.current.slice(-28);
      }
    };

    const onLeave = () => {
      mouseRef.current.visible = false;
      trailRef.current = [];
    };

    const drawSwoosh = (points: TrailPoint[]) => {
      if (points.length < 2) return;

      const path = new Path2D();
      path.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length - 1; i += 1) {
        const cx = points[i].x;
        const cy = points[i].y;
        const nx = (points[i].x + points[i + 1].x) / 2;
        const ny = (points[i].y + points[i + 1].y) / 2;
        path.quadraticCurveTo(cx, cy, nx, ny);
      }

      const last = points[points.length - 1];
      path.lineTo(last.x, last.y);

      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.filter = "blur(7px)";
      ctx.strokeStyle = "rgba(160,84,56,0.24)";
      ctx.lineWidth = 13;
      ctx.stroke(path);

      ctx.filter = "none";
      ctx.strokeStyle = "rgba(201,123,75,0.56)";
      ctx.lineWidth = 5;
      ctx.stroke(path);

      ctx.restore();
    };

    const draw = (now: number) => {
      const { width, height } = sizeRef.current;
      ctx.clearRect(0, 0, width, height);

      trailRef.current = trailRef.current.filter((p) => now - p.t < SWOOSH_LIFE_MS);
      drawSwoosh(trailRef.current);

      if (mouseRef.current.visible) {
        const { x, y } = mouseRef.current;

        ctx.save();
        ctx.filter = "blur(5px)";
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(201,123,75,0.45)";
        ctx.fill();
        ctx.restore();

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#C97B4B";
        ctx.fill();
      }

      rafRef.current = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", resize);
    rafRef.current = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[9999]" />;
}
