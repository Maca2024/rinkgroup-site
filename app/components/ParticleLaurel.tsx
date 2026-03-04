'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number;
  baseX: number; baseY: number;
  vx: number; vy: number;
  size: number; alpha: number;
  phase: number; speed: number;
  type: 'ring' | 'leaf' | 'dust';
}

export function ParticleLaurel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });
  const particlesRef = useRef<Particle[]>([]);
  const starsRef = useRef<Array<{ x: number; y: number; size: number; alpha: number; speed: number; twinklePhase: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let raf: number;
    let w = 0, h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.scale(dpr, dpr);
      init();
    };

    const init = () => {
      particlesRef.current = [];
      starsRef.current = [];
      const cx = w / 2;
      const cy = h * 0.40;
      const radius = Math.min(w, h) * (w < 768 ? 0.18 : 0.13);

      // Stars
      const starCount = Math.floor((w * h) / 5000);
      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 1.2 + 0.2,
          alpha: Math.random() * 0.3 + 0.05,
          speed: Math.random() * 0.015 + 0.003,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }

      // Main ring particles — double helix wreath
      for (let i = 0; i < 300; i++) {
        const angle = (i / 300) * Math.PI * 2;
        const wave1 = Math.sin(angle * 8) * radius * 0.06;
        const wave2 = Math.cos(angle * 5) * radius * 0.04;
        const r = radius + wave1 + wave2;

        particlesRef.current.push({
          x: cx + Math.cos(angle) * r,
          y: cy + Math.sin(angle) * r,
          baseX: cx + Math.cos(angle) * r,
          baseY: cy + Math.sin(angle) * r,
          vx: 0, vy: 0,
          size: Math.random() * 2 + 0.8,
          alpha: Math.random() * 0.6 + 0.4,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.004 + 0.001,
          type: 'ring',
        });
      }

      // Leaf clusters — emanating outward like a laurel
      for (let i = 0; i < 60; i++) {
        const angle = (i / 60) * Math.PI * 2;
        const leafDir = angle + Math.PI / 2 + (Math.random() - 0.5) * 0.4;
        const leafLen = radius * (0.2 + Math.random() * 0.15);
        const baseR = radius + Math.sin(angle * 8) * radius * 0.06;
        const bx = cx + Math.cos(angle) * baseR;
        const by = cy + Math.sin(angle) * baseR;

        for (let j = 0; j < 8; j++) {
          const t = (j / 8) * leafLen;
          const spread = Math.sin((j / 8) * Math.PI) * (4 + Math.random() * 4);
          const lx = bx + Math.cos(leafDir) * t + (Math.random() - 0.5) * spread;
          const ly = by + Math.sin(leafDir) * t + (Math.random() - 0.5) * spread;

          particlesRef.current.push({
            x: lx, y: ly, baseX: lx, baseY: ly,
            vx: 0, vy: 0,
            size: Math.random() * 1.5 + 0.3,
            alpha: Math.random() * 0.4 + 0.15,
            phase: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.006 + 0.002,
            type: 'leaf',
          });
        }
      }

      // Floating dust around the wreath
      for (let i = 0; i < 80; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = radius * (0.5 + Math.random() * 1.2);
        particlesRef.current.push({
          x: cx + Math.cos(angle) * dist,
          y: cy + Math.sin(angle) * dist,
          baseX: cx + Math.cos(angle) * dist,
          baseY: cy + Math.sin(angle) * dist,
          vx: 0, vy: 0,
          size: Math.random() * 1 + 0.3,
          alpha: Math.random() * 0.15 + 0.03,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.01 + 0.005,
          type: 'dust',
        });
      }
    };

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const onTouch = (e: TouchEvent) => {
      mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, active: true };
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);

      // Stars with twinkle
      for (const s of starsRef.current) {
        const twinkle = Math.sin(time * s.speed + s.twinklePhase);
        const a = s.alpha * (0.5 + twinkle * 0.5);
        if (a < 0.01) continue;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,130,${a})`;
        ctx.fill();

        // Cross sparkle on brightest stars
        if (s.size > 1 && a > 0.15) {
          ctx.beginPath();
          ctx.moveTo(s.x - s.size * 3, s.y);
          ctx.lineTo(s.x + s.size * 3, s.y);
          ctx.moveTo(s.x, s.y - s.size * 3);
          ctx.lineTo(s.x, s.y + s.size * 3);
          ctx.strokeStyle = `rgba(212,175,130,${a * 0.3})`;
          ctx.lineWidth = 0.3;
          ctx.stroke();
        }
      }

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Particles
      for (const p of particlesRef.current) {
        // Breathing motion
        const breathAmt = p.type === 'dust' ? 8 : p.type === 'leaf' ? 4 : 2;
        const breathX = Math.sin(time * p.speed + p.phase) * breathAmt;
        const breathY = Math.cos(time * p.speed * 0.7 + p.phase + 1) * breathAmt;

        // Mouse interaction
        if (mouseRef.current.active) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const range = p.type === 'dust' ? 200 : 140;

          if (dist < range) {
            const force = ((range - dist) / range) * (p.type === 'dust' ? 0.15 : 0.06);
            p.vx -= dx * force;
            p.vy -= dy * force;
          }
        }

        // Spring back
        const springForce = p.type === 'dust' ? 0.01 : 0.04;
        p.vx += (p.baseX - p.x) * springForce;
        p.vy += (p.baseY - p.y) * springForce;
        p.vx *= 0.93;
        p.vy *= 0.93;

        p.x += p.vx + breathX * 0.05;
        p.y += p.vy + breathY * 0.05;

        const glowPulse = 0.7 + Math.sin(time * 0.002 + p.phase) * 0.3;
        const a = p.alpha * glowPulse;

        // Glow layer
        if (p.type !== 'dust' && p.size > 1) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(197,149,107,${a * 0.04})`;
          ctx.fill();
        }

        // Core particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        if (p.type === 'ring') {
          ctx.fillStyle = `rgba(212,165,116,${a})`;
        } else if (p.type === 'leaf') {
          ctx.fillStyle = `rgba(224,184,138,${a})`;
        } else {
          ctx.fillStyle = `rgba(197,149,107,${a})`;
        }
        ctx.fill();
      }

      // Connection lines for ring particles only (sparse)
      const ringParticles = particlesRef.current.filter(p => p.type === 'ring');
      for (let i = 0; i < ringParticles.length; i += 3) {
        const a = ringParticles[i];
        const next = ringParticles[(i + 3) % ringParticles.length];
        const d = Math.hypot(a.x - next.x, a.y - next.y);
        if (d < 25) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(next.x, next.y);
          ctx.strokeStyle = `rgba(197,149,107,${0.06 * (1 - d / 25)})`;
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouse);
    window.addEventListener('touchmove', onTouch, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}
