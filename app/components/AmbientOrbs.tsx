'use client';

import { useEffect, useRef } from 'react';

// ─── Palette ────────────────────────────────────────────────────────────────

const P = {
  roseGold:      [197, 149, 107] as const,
  roseGoldLight: [212, 165, 116] as const,
  roseGoldPale:  [232, 205, 181] as const,
  champagne:     [215, 185, 155] as const,
  cream:         [245, 240, 232] as const,
  amber:         [190, 140, 100] as const,
  warmGold:      [220, 175, 130] as const,
  deepAmber:     [180, 130,  90] as const,
} as const;

type RGB = readonly [number, number, number];

// ─── Types ───────────────────────────────────────────────────────────────────

/** A tiny dot in the background depth layer — "distant stars" */
interface DustParticle {
  x: number;       // absolute px, regenerated on resize
  y: number;
  radius: number;  // 1-2px
  r: number; g: number; b: number;
  baseOpacity: number;  // 0.03-0.06
  phaseX: number;
  phaseY: number;
  freqX: number;
  freqY: number;
  ampX: number;
  ampY: number;
}

/** Medium star — mid layer, participates in constellation lines */
interface StarParticle {
  x: number;
  y: number;
  radius: number;  // 2-4px
  r: number; g: number; b: number;
  baseOpacity: number;  // 0.05-0.12
  phaseX: number;
  phaseY: number;
  freqX: number;
  freqY: number;
  ampX: number;
  ampY: number;
  // current computed screen pos (updated each frame, used for line distances)
  sx: number;
  sy: number;
}

/** Large soft nebula orb — foreground layer */
interface NebOrb {
  x: number;       // fraction [0,1]
  y: number;
  radius: number;  // 80-200px
  r: number; g: number; b: number;
  baseOpacity: number;  // 0.02-0.06
  phaseX: number;
  phaseY: number;
  freqX: number;
  freqY: number;
  ampX: number;
  ampY: number;
  depth: number;   // parallax weight [0.1,1]
  pushX: number;
  pushY: number;
}

/** Atmospheric nebula cloud — ultra-large, near-static */
interface NebulaCloud {
  cx: number;   // fraction
  cy: number;
  radius: number;  // 500-800px
  r: number; g: number; b: number;
  opacity: number;  // 0.008-0.015
  phase: number;
  freq: number;   // extremely slow
}

/** A single shooting star streak */
interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;   // trail length px
  life: number;     // 0-1
  decayRate: number;
  r: number; g: number; b: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const MOBILE_BREAKPOINT = 768;

// Particle counts
const DUST_DESKTOP   = 40;
const DUST_MOBILE    = 20;
const STAR_DESKTOP   = 15;
const STAR_MOBILE    = 8;
const ORB_DESKTOP    = 6;
const ORB_MOBILE     = 3;

// Connection lines
const LINE_DIST      = 180;   // max distance for constellation lines
const LINE_MAX_ALPHA = 0.06;  // base max opacity of lines
const LINE_MOUSE_BOOST = 0.15; // opacity boost near cursor

// Mouse interaction
const MOUSE_ATTRACT_RADIUS  = 250;
const MOUSE_ATTRACT_STRENGTH = 18;   // max pull in px (gentle)
const PUSH_SMOOTHING         = 0.055; // lerp factor per frame for orb push

// Parallax factors per layer (fraction of scrollY)
const PARALLAX_DUST   = 0.02;
const PARALLAX_STAR   = 0.08;
const PARALLAX_ORB    = 0.15;

// Mouse glow
const MOUSE_GLOW_RADIUS  = 400;
const MOUSE_GLOW_OPACITY = 0.02;

// Shooting stars
const SHOOT_INTERVAL_MIN = 8000;   // ms
const SHOOT_INTERVAL_MAX = 15000;

const DUST_COLORS:  RGB[] = [P.roseGold, P.roseGoldLight, P.roseGoldPale, P.champagne, P.cream];
const STAR_COLORS:  RGB[] = [P.roseGoldPale, P.cream, P.champagne, P.roseGoldLight];
const ORB_COLORS:   RGB[] = [P.roseGold, P.roseGoldLight, P.roseGoldPale, P.champagne, P.amber, P.warmGold];
const CLOUD_COLORS: RGB[] = [P.roseGold, P.warmGold, P.champagne, P.deepAmber];
const SHOOT_COLORS: RGB[] = [P.cream, P.roseGoldPale, P.champagne];

// ─── Factories ───────────────────────────────────────────────────────────────

function rnd(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function createDust(isMobile: boolean, W: number, H: number): DustParticle[] {
  const count = isMobile ? DUST_MOBILE : DUST_DESKTOP;
  return Array.from({ length: count }, () => {
    const [r, g, b] = pick(DUST_COLORS);
    return {
      x: rnd(0, W),
      y: rnd(0, H),
      radius: rnd(0.8, 2.2),
      r, g, b,
      baseOpacity: rnd(0.03, 0.07),
      phaseX: rnd(0, Math.PI * 2),
      phaseY: rnd(0, Math.PI * 2),
      freqX: rnd(0.006, 0.012) * 0.001,
      freqY: rnd(0.005, 0.010) * 0.001,
      ampX: rnd(15, 40),
      ampY: rnd(10, 30),
      sx: 0, sy: 0,
    } as DustParticle;
  });
}

function createStars(isMobile: boolean, W: number, H: number): StarParticle[] {
  const count = isMobile ? STAR_MOBILE : STAR_DESKTOP;
  return Array.from({ length: count }, () => {
    const [r, g, b] = pick(STAR_COLORS);
    return {
      x: rnd(0, W),
      y: rnd(0, H),
      radius: rnd(1.5, 3.8),
      r, g, b,
      baseOpacity: rnd(0.05, 0.13),
      phaseX: rnd(0, Math.PI * 2),
      phaseY: rnd(0, Math.PI * 2),
      freqX: rnd(0.011, 0.019) * 0.001,
      freqY: rnd(0.009, 0.016) * 0.001,
      ampX: rnd(30, 70),
      ampY: rnd(25, 55),
      sx: 0,
      sy: 0,
    };
  });
}

function createOrbs(isMobile: boolean): NebOrb[] {
  const count = isMobile ? ORB_MOBILE : ORB_DESKTOP;
  return Array.from({ length: count }, () => {
    const [r, g, b] = pick(ORB_COLORS);
    return {
      x: rnd(0.04, 0.96),
      y: rnd(0.04, 0.96),
      radius: rnd(80, 200),
      r, g, b,
      baseOpacity: rnd(0.022, 0.062),
      phaseX: rnd(0, Math.PI * 2),
      phaseY: rnd(0, Math.PI * 2),
      freqX: rnd(0.016, 0.026) * 0.001,
      freqY: rnd(0.013, 0.020) * 0.001,
      ampX: rnd(55, 100),
      ampY: rnd(45, 85),
      depth: rnd(0.15, 1.0),
      pushX: 0,
      pushY: 0,
    };
  });
}

function createNebulaeClouds(W: number, H: number): NebulaCloud[] {
  return Array.from({ length: 4 }, () => {
    const [r, g, b] = pick(CLOUD_COLORS);
    return {
      cx: rnd(0.1, 0.9),
      cy: rnd(0.1, 0.9),
      radius: rnd(500, 800),
      r, g, b,
      opacity: rnd(0.008, 0.016),
      phase: rnd(0, Math.PI * 2),
      freq: rnd(0.0008, 0.0015) * 0.001, // ~60-90s per cycle
    };
    void W; void H; // unused but keep signature flexible
  });
}

function spawnShootingStar(W: number, H: number): ShootingStar {
  // Always enter from left half of top or left edge
  const fromTop = Math.random() > 0.4;
  const x = fromTop ? rnd(0, W * 0.8) : rnd(0, W * 0.2);
  const y = fromTop ? rnd(0, H * 0.3) : rnd(0, H * 0.5);
  const angle = rnd(Math.PI * 0.08, Math.PI * 0.38); // diagonal downward-right
  const speed = rnd(6, 12);
  const [r, g, b] = pick(SHOOT_COLORS);
  return {
    x, y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    length: rnd(80, 160),
    life: 1.0,
    decayRate: rnd(0.012, 0.022),
    r, g, b,
  };
}

// ─── AmbientOrbs component ───────────────────────────────────────────────────

export function AmbientOrbs() {
  const canvasRef      = useRef<HTMLCanvasElement>(null);

  // Particle collections — all mutable refs, never useState
  const dustRef        = useRef<DustParticle[]>([]);
  const starsRef       = useRef<StarParticle[]>([]);
  const orbsRef        = useRef<NebOrb[]>([]);
  const cloudsRef      = useRef<NebulaCloud[]>([]);
  const shootRef       = useRef<ShootingStar[]>([]);

  const rafRef         = useRef<number>(0);
  const mouseRef       = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const scrollRef      = useRef<number>(0);
  const wasMobileRef   = useRef<boolean | null>(null);
  const visibleRef     = useRef<boolean>(true);

  // Shooting star scheduler
  const nextShootRef   = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── Resize ────────────────────────────────────────────────────────────────
    function resize() {
      if (!canvas || !ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const W   = window.innerWidth;
      const H   = window.innerHeight;

      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.scale(dpr, dpr);

      const isMobile = W < MOBILE_BREAKPOINT;

      // Only fully rebuild when crossing the breakpoint
      if (wasMobileRef.current !== isMobile) {
        wasMobileRef.current = isMobile;
        dustRef.current   = createDust(isMobile, W, H);
        starsRef.current  = createStars(isMobile, W, H);
        orbsRef.current   = createOrbs(isMobile);
        cloudsRef.current = createNebulaeClouds(W, H);
        shootRef.current  = [];
        scheduleNextShoot();
      }
    }

    function scheduleNextShoot() {
      nextShootRef.current = performance.now() + rnd(SHOOT_INTERVAL_MIN, SHOOT_INTERVAL_MAX);
    }

    resize();
    scheduleNextShoot();
    window.addEventListener('resize', resize, { passive: true });

    // ── Mouse tracking ────────────────────────────────────────────────────────
    function onMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // ── Scroll tracking ───────────────────────────────────────────────────────
    function onScroll() {
      scrollRef.current = window.scrollY;
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── Visibility observer ───────────────────────────────────────────────────
    const observer = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    // ── Draw loop ─────────────────────────────────────────────────────────────
    function draw(timestamp: number) {
      if (!canvas || !ctx) return;

      if (!visibleRef.current) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const W      = window.innerWidth;
      const H      = window.innerHeight;
      const mouse  = mouseRef.current;
      const scroll = scrollRef.current;
      const isMobile = (wasMobileRef.current === true);

      ctx.clearRect(0, 0, W, H);

      // ── 1. Nebula clouds (atmospheric haze — deepest layer) ────────────────
      const clouds = cloudsRef.current;
      for (let i = 0; i < clouds.length; i++) {
        const c  = clouds[i];
        const t  = timestamp;
        // Very slow breathing oscillation
        const breathe  = 1 + 0.12 * Math.sin(t * c.freq + c.phase);
        const r        = c.radius * breathe;
        const cx       = c.cx * W + 40 * Math.sin(t * c.freq * 0.7 + c.phase);
        const cy       = c.cy * H + 30 * Math.cos(t * c.freq * 0.5 + c.phase + 1);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0,    `rgba(${c.r},${c.g},${c.b},${c.opacity})`);
        grad.addColorStop(0.45, `rgba(${c.r},${c.g},${c.b},${c.opacity * 0.5})`);
        grad.addColorStop(0.75, `rgba(${c.r},${c.g},${c.b},${c.opacity * 0.15})`);
        grad.addColorStop(1,    `rgba(${c.r},${c.g},${c.b},0)`);

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // ── 2. Dust particles (background layer) ──────────────────────────────
      const dust = dustRef.current;
      for (let i = 0; i < dust.length; i++) {
        const d    = dust[i];
        const t    = timestamp;
        const driftX = Math.sin(t * d.freqX + d.phaseX) * d.ampX
                     + Math.cos(t * d.freqX * 0.6 + d.phaseY) * d.ampX * 0.3;
        const driftY = Math.cos(t * d.freqY + d.phaseY) * d.ampY
                     + Math.sin(t * d.freqY * 0.5 + d.phaseX) * d.ampY * 0.25;

        const parallaxY = scroll * PARALLAX_DUST;
        const cx = d.x + driftX;
        const cy = d.y + driftY - parallaxY;

        const breathe = 0.75 + 0.25 * Math.sin(t * 0.0004 + d.phaseX);
        const alpha   = d.baseOpacity * breathe;

        // Tiny glowing dot with soft halo
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, d.radius * 3.5);
        grad.addColorStop(0,   `rgba(${d.r},${d.g},${d.b},${alpha})`);
        grad.addColorStop(0.3, `rgba(${d.r},${d.g},${d.b},${alpha * 0.6})`);
        grad.addColorStop(1,   `rgba(${d.r},${d.g},${d.b},0)`);

        ctx.beginPath();
        ctx.arc(cx, cy, d.radius * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // ── 3. Stars + constellation lines (mid layer) ────────────────────────
      const stars = starsRef.current;

      // Update screen positions first
      for (let i = 0; i < stars.length; i++) {
        const s      = stars[i];
        const t      = timestamp;
        const driftX = Math.sin(t * s.freqX + s.phaseX) * s.ampX
                     + Math.cos(t * s.freqX * 0.75 + s.phaseY) * s.ampX * 0.35;
        const driftY = Math.cos(t * s.freqY + s.phaseY) * s.ampY
                     + Math.sin(t * s.freqY * 0.65 + s.phaseX) * s.ampY * 0.30;
        const parallaxY = scroll * PARALLAX_STAR;
        s.sx = s.x + driftX;
        s.sy = s.y + driftY - parallaxY;
      }

      // Draw constellation lines (desktop only)
      if (!isMobile) {
        const linePulse = 0.5 + 0.5 * Math.sin(timestamp * 0.0006);

        for (let i = 0; i < stars.length; i++) {
          for (let j = i + 1; j < stars.length; j++) {
            const a  = stars[i];
            const b  = stars[j];
            const dx = a.sx - b.sx;
            const dy = a.sy - b.sy;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > LINE_DIST) continue;

            // Proximity-based base opacity
            const proximityFactor = 1 - dist / LINE_DIST;
            let lineAlpha = proximityFactor * LINE_MAX_ALPHA * (0.7 + 0.3 * linePulse);

            // Boost if near mouse
            const midX = (a.sx + b.sx) * 0.5;
            const midY = (a.sy + b.sy) * 0.5;
            const mdx  = midX - mouse.x;
            const mdy  = midY - mouse.y;
            const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mouseDist < MOUSE_ATTRACT_RADIUS) {
              const boost = (1 - mouseDist / MOUSE_ATTRACT_RADIUS) * LINE_MOUSE_BOOST;
              lineAlpha = Math.min(lineAlpha + boost, 0.22);
            }

            const [rg, gg, bg] = P.roseGold;
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.strokeStyle = `rgba(${rg},${gg},${bg},${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw star dots
      for (let i = 0; i < stars.length; i++) {
        const s       = stars[i];
        const t       = timestamp;
        const breathe = 0.7 + 0.3 * Math.sin(t * 0.0009 + s.phaseX);
        const alpha   = s.baseOpacity * breathe;

        const grad = ctx.createRadialGradient(s.sx, s.sy, 0, s.sx, s.sy, s.radius * 4);
        grad.addColorStop(0,   `rgba(${s.r},${s.g},${s.b},${alpha})`);
        grad.addColorStop(0.25,`rgba(${s.r},${s.g},${s.b},${alpha * 0.75})`);
        grad.addColorStop(0.6, `rgba(${s.r},${s.g},${s.b},${alpha * 0.2})`);
        grad.addColorStop(1,   `rgba(${s.r},${s.g},${s.b},0)`);

        ctx.beginPath();
        ctx.arc(s.sx, s.sy, s.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // ── 4. Foreground nebula orbs ─────────────────────────────────────────
      const orbs = orbsRef.current;
      for (let i = 0; i < orbs.length; i++) {
        const orb    = orbs[i];
        const t      = timestamp;
        const driftX = Math.sin(t * orb.freqX + orb.phaseX) * orb.ampX
                     + Math.cos(t * orb.freqX * 0.7 + orb.phaseY) * orb.ampX * 0.4;
        const driftY = Math.cos(t * orb.freqY + orb.phaseY) * orb.ampY
                     + Math.sin(t * orb.freqY * 0.6 + orb.phaseX) * orb.ampY * 0.35;

        const parallaxY = scroll * PARALLAX_ORB * orb.depth;
        const cx = orb.x * W + driftX + orb.pushX;
        const cy = orb.y * H + driftY + orb.pushY - parallaxY;

        // Mouse attraction (gentle drift toward cursor)
        const dx   = mouse.x - cx;
        const dy   = mouse.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetPushX = 0;
        let targetPushY = 0;
        if (dist < MOUSE_ATTRACT_RADIUS && dist > 0) {
          const factor = (1 - dist / MOUSE_ATTRACT_RADIUS) ** 1.5 * MOUSE_ATTRACT_STRENGTH;
          targetPushX = (dx / dist) * factor;
          targetPushY = (dy / dist) * factor;
        }

        orb.pushX += (targetPushX - orb.pushX) * PUSH_SMOOTHING;
        orb.pushY += (targetPushY - orb.pushY) * PUSH_SMOOTHING;

        const breathe = 0.78 + 0.22 * Math.sin(t * 0.0007 + orb.phaseX);
        const alpha   = orb.baseOpacity * breathe;

        // Multi-stop radial gradient for realistic nebula falloff
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, orb.radius);
        grad.addColorStop(0,    `rgba(${orb.r},${orb.g},${orb.b},${alpha})`);
        grad.addColorStop(0.25, `rgba(${orb.r},${orb.g},${orb.b},${alpha * 0.82})`);
        grad.addColorStop(0.5,  `rgba(${orb.r},${orb.g},${orb.b},${alpha * 0.45})`);
        grad.addColorStop(0.75, `rgba(${orb.r},${orb.g},${orb.b},${alpha * 0.15})`);
        grad.addColorStop(1,    `rgba(${orb.r},${orb.g},${orb.b},0)`);

        ctx.beginPath();
        ctx.arc(cx, cy, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // ── 5. Mouse glow (desktop only) ──────────────────────────────────────
      if (!isMobile && mouse.x > -1000) {
        const [mr, mg, mb] = P.roseGoldPale;
        const mGrad = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, MOUSE_GLOW_RADIUS
        );
        mGrad.addColorStop(0,    `rgba(${mr},${mg},${mb},${MOUSE_GLOW_OPACITY})`);
        mGrad.addColorStop(0.5,  `rgba(${mr},${mg},${mb},${MOUSE_GLOW_OPACITY * 0.4})`);
        mGrad.addColorStop(1,    `rgba(${mr},${mg},${mb},0)`);

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, MOUSE_GLOW_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = mGrad;
        ctx.fill();
      }

      // ── 6. Shooting stars (desktop only) ─────────────────────────────────
      if (!isMobile) {
        // Spawn check
        if (timestamp >= nextShootRef.current) {
          shootRef.current.push(spawnShootingStar(W, H));
          scheduleNextShoot();
        }

        const shoots = shootRef.current;
        let si = shoots.length;
        while (si--) {
          const s = shoots[si];
          s.x += s.vx;
          s.y += s.vy;
          s.life -= s.decayRate;

          if (s.life <= 0 || s.x > W + 50 || s.y > H + 50) {
            shoots.splice(si, 1);
            continue;
          }

          // Tail: draw a gradient line from current position back along velocity
          const tailLen = s.length * s.life;
          const tailX   = s.x - (s.vx / Math.sqrt(s.vx * s.vx + s.vy * s.vy)) * tailLen;
          const tailY   = s.y - (s.vy / Math.sqrt(s.vx * s.vx + s.vy * s.vy)) * tailLen;

          const sGrad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
          sGrad.addColorStop(0,   `rgba(${s.r},${s.g},${s.b},${s.life * 0.9})`);
          sGrad.addColorStop(0.3, `rgba(${s.r},${s.g},${s.b},${s.life * 0.45})`);
          sGrad.addColorStop(1,   `rgba(${s.r},${s.g},${s.b},0)`);

          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(tailX, tailY);
          ctx.strokeStyle = sGrad;
          ctx.lineWidth   = 1;
          ctx.lineCap     = 'round';
          ctx.stroke();

          // Bright head dot
          const headGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 3);
          headGrad.addColorStop(0,  `rgba(${s.r},${s.g},${s.b},${s.life})`);
          headGrad.addColorStop(1,  `rgba(${s.r},${s.g},${s.b},0)`);
          ctx.beginPath();
          ctx.arc(s.x, s.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = headGrad;
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:       'fixed',
        top:            0,
        left:           0,
        width:          '100%',
        height:         '100%',
        zIndex:         0,
        pointerEvents:  'none',
        mixBlendMode:   'screen',
      }}
    />
  );
}
