"use client";

import { useEffect, useRef } from "react";

export default function Retatrutide3DVial() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let animId: number;

    (async () => {
      const THREE = await import("three");
      const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");

      // ── Renderer ──────────────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      // ── Scene / Camera ────────────────────────────────────────────────────
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
      camera.position.set(0, 0.5, 6);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.minDistance = 3.5;
      controls.maxDistance = 8;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1.1;

      // ── Materials ─────────────────────────────────────────────────────────
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff, transparent: true, opacity: 0.22,
        roughness: 0.08, transmission: 0.95, thickness: 0.9,
        ior: 1.45, clearcoat: 1, clearcoatRoughness: 0.06,
      });
      const silverMat = new THREE.MeshStandardMaterial({ color: 0xc7c7cc, metalness: 0.92, roughness: 0.28 });
      const purpleMat = new THREE.MeshStandardMaterial({ color: 0xb56ad8, metalness: 0.12, roughness: 0.72 });
      const labelMat  = new THREE.MeshStandardMaterial({ color: 0xf7f7fb, metalness: 0.08, roughness: 0.55 });
      const inkMat    = new THREE.MeshStandardMaterial({ color: 0x181818, metalness: 0.0,  roughness: 0.9  });

      // ── Vial geometry ─────────────────────────────────────────────────────
      const group = new THREE.Group();
      scene.add(group);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const add = (geo: any, mat: any, x=0, y=0, z=0) => {
        const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); group.add(m); return m;
      };

      add(new THREE.CylinderGeometry(0.92, 0.82, 2.9,  96), glassMat,  0, -0.10);
      add(new THREE.CylinderGeometry(0.82, 0.52, 0.55, 96), glassMat,  0,  1.55);
      add(new THREE.CylinderGeometry(0.46, 0.46, 0.55, 96), glassMat,  0,  2.05);
      add(new THREE.CylinderGeometry(0.86, 0.92, 0.18, 96), glassMat,  0, -1.58);

      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.82, 0.045, 24, 120), glassMat);
      rim.rotation.x = Math.PI / 2; rim.position.y = 1.1; group.add(rim);

      // collar (silver crimp) + cap (purple)
      add(new THREE.CylinderGeometry(0.86, 0.86, 0.72, 96), silverMat, 0, 2.52);
      add(new THREE.CylinderGeometry(1.02, 1.02, 0.26, 96), purpleMat, 0, 2.95);

      // label cylinder (open-ended)
      add(new THREE.CylinderGeometry(0.925, 0.825, 1.65, 96, 1, true), labelMat, 0, -0.02);

      // ink bands
      const addBand = (y: number, h: number) =>
        add(new THREE.CylinderGeometry(0.93, 0.83, h, 96, 1, true), inkMat, 0, y);
      addBand(0.52, 0.02);
      addBand(-0.18, 0.012);

      // ── Canvas texture label ───────────────────────────────────────────────
      const tc = document.createElement("canvas");
      tc.width = 1024; tc.height = 1024;
      const ctx = tc.getContext("2d")!;
      ctx.clearRect(0, 0, 1024, 1024);
      ctx.fillStyle = "#111";
      ctx.font = "bold 108px Arial"; ctx.fillText("RETATRUTIDE", 95, 220);
      ctx.font = "bold 88px Arial";  ctx.fillText("30 mg", 95, 330);
      ctx.lineWidth = 5;
      ctx.beginPath(); ctx.moveTo(85, 395); ctx.lineTo(935, 395);
      ctx.strokeStyle = "#111"; ctx.stroke();
      ctx.font = "64px Arial";  ctx.fillText("Sterile Lyophilized Powder", 115, 520);
      ctx.font = "60px Arial";  ctx.fillText("• Not for Human Use", 115, 640);
                                ctx.fillText("• Store at 2-8°C", 115, 740);
      ctx.beginPath(); ctx.ellipse(780, 310, 120, 72, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.font = "bold 54px Arial"; ctx.fillText("GILLS",  715, 300);
      ctx.font = "46px Arial";      ctx.fillText("BioLab", 728, 350);

      const tex = new THREE.CanvasTexture(tc);
      tex.colorSpace = THREE.SRGBColorSpace;
      const textPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(1.7, 1.95),
        new THREE.MeshBasicMaterial({ map: tex, transparent: true }),
      );
      textPlane.position.set(0, 0.02, 0.94);
      group.add(textPlane);

      group.rotation.x = -0.08;

      // ── Lights ────────────────────────────────────────────────────────────
      const key = new THREE.DirectionalLight(0xffffff, 2.3); key.position.set(3, 4, 6); scene.add(key);
      const fill = new THREE.DirectionalLight(0xe9ddff, 1.2); fill.position.set(-4, 1, 3); scene.add(fill);
      const rim2 = new THREE.DirectionalLight(0xffffff, 1.6); rim2.position.set(0, 3, -4); scene.add(rim2);
      scene.add(new THREE.AmbientLight(0xffffff, 0.9));

      // ── Floor glow disc ───────────────────────────────────────────────────
      const floor = new THREE.Mesh(
        new THREE.CircleGeometry(2.25, 64),
        new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0.12 }),
      );
      floor.rotation.x = -Math.PI / 2; floor.position.y = -1.7; scene.add(floor);

      // ── Resize handler ────────────────────────────────────────────────────
      const onResize = () => {
        const w = canvas.clientWidth, h = canvas.clientHeight;
        camera.aspect = w / h; camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      const ro = new ResizeObserver(onResize);
      ro.observe(canvas);

      // ── Animation loop ────────────────────────────────────────────────────
      renderer.setAnimationLoop(() => {
        controls.update();
        group.position.y = Math.sin(performance.now() * 0.0012) * 0.08;
        renderer.render(scene, camera);
        animId = 0; // keep TS happy; actual loop managed by renderer
      });

      // Store cleanup ref on canvas
      (canvas as any).__cleanup = () => {
        renderer.setAnimationLoop(null);
        ro.disconnect();
        renderer.dispose();
      };
    })();

    return () => {
      (canvas as any).__cleanup?.();
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
