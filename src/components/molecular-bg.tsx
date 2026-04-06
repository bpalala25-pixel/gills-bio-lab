"use client";
import { useEffect, useRef } from "react";

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  hue: "teal" | "orchid";
  pulse: number;
  pulseSpeed: number;
}

export default function MolecularBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const nodes: Node[] = [];
    const NODE_COUNT = 72;
    const MAX_DIST   = 155;

    function resize() {
      if (!canvas) return;
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function initNodes() {
      if (!canvas) return;
      nodes.length = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x:  Math.random() * canvas.width,
          y:  Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r:  Math.random() * 2.2 + 0.8,
          hue: Math.random() > 0.6 ? "orchid" : "teal",
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.012 + Math.random() * 0.018,
        });
      }
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        n.pulse += n.pulseSpeed;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      }

      // connections — blend color when different hues connect
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const a = (1 - d / MAX_DIST) * 0.16;
            const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            const c1 = nodes[i].hue === "teal" ? `rgba(1,105,111,${a})` : `rgba(139,92,246,${a})`;
            const c2 = nodes[j].hue === "teal" ? `rgba(1,105,111,${a})` : `rgba(139,92,246,${a})`;
            grad.addColorStop(0, c1);
            grad.addColorStop(1, c2);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // nodes with pulse glow
      for (const n of nodes) {
        const scale = 1 + Math.sin(n.pulse) * 0.25;
        const alpha = 0.25 + Math.sin(n.pulse) * 0.12;
        const color = n.hue === "teal" ? `1,105,111` : `139,92,246`;

        // outer glow
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4 * scale);
        grd.addColorStop(0, `rgba(${color},${alpha})`);
        grd.addColorStop(1, `rgba(${color},0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4 * scale, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${alpha + 0.25})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    resize(); initNodes(); draw();

    const ro = new ResizeObserver(() => { resize(); initNodes(); });
    ro.observe(canvas);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.65 }}
    />
  );
}
