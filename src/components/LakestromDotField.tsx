import { useEffect, useRef } from "react";

type Dot = {
  x: number;
  y: number;
  r: number;
  a: number;
  tw: number;
  tws: number;
};

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  c: string;
};

type LakestromDotFieldProps = {
  className?: string;
};

const VIOLET = "124, 92, 255";
const CYAN = "79, 214, 224";

export function LakestromDotField({ className = "" }: LakestromDotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let dots: Dot[] = [];
    let nodes: Node[] = [];

    const seedField = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const dotCount = Math.max(34, Math.floor((width * height) / 14000));
      dots = Array.from({ length: dotCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.6,
        a: Math.random() * 0.5 + 0.2,
        tw: Math.random() * Math.PI * 2,
        tws: Math.random() * 0.01 + 0.003
      }));

      const baseNodeCount = Math.max(3, Math.floor(width / 520));
      const movingNodeCount = Math.ceil(baseNodeCount * 1.3);

      nodes = Array.from({ length: movingNodeCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        c: Math.random() > 0.7 ? CYAN : VIOLET
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      for (const dot of dots) {
        if (!reducedMotion) {
          dot.tw += dot.tws;
        }
        const opacity = dot.a * (0.6 + 0.4 * Math.sin(dot.tw));
        context.beginPath();
        context.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        context.fillStyle = `rgba(${VIOLET}, ${opacity})`;
        context.fill();
      }

      for (const node of nodes) {
        if (!reducedMotion) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < -40) node.x = width + 40;
          if (node.x > width + 40) node.x = -40;
          if (node.y < -40) node.y = height + 40;
          if (node.y > height + 40) node.y = -40;
        }

        for (const dot of dots) {
          const dx = dot.x - node.x;
          const dy = dot.y - node.y;
          const distance = dx * dx + dy * dy;
          if (distance < 22500) {
            const strength = 1 - Math.sqrt(distance) / 150;
            context.beginPath();
            context.moveTo(node.x, node.y);
            context.lineTo(dot.x, dot.y);
            context.strokeStyle = `rgba(${node.c}, ${strength * 0.28})`;
            context.lineWidth = 0.85;
            context.stroke();
          }
        }

        context.beginPath();
        context.arc(node.x, node.y, 2.9, 0, Math.PI * 2);
        context.fillStyle = `rgba(${node.c}, 0.95)`;
        context.shadowColor = `rgba(${node.c}, 0.85)`;
        context.shadowBlur = 15;
        context.fill();
        context.shadowBlur = 0;
      }

      if (!reducedMotion) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    seedField();
    draw();

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        seedField();
        if (reducedMotion) {
          draw();
        }
      }, 150);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.cancelAnimationFrame(animationRef.current);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
