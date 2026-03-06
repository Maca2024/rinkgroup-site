'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Full aurora borealis + snow canvas
function AuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Snow particles
    const snowflakes: Array<{ x: number; y: number; r: number; vx: number; vy: number; opacity: number }> = [];

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Init snowflakes
      snowflakes.length = 0;
      for (let i = 0; i < 80; i++) {
        snowflakes.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: 0.5 + Math.random() * 2,
          vx: (Math.random() - 0.5) * 0.5,
          vy: 0.3 + Math.random() * 1,
          opacity: 0.1 + Math.random() * 0.4,
        });
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = (time: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const t = time * 0.001;

      ctx.clearRect(0, 0, w, h);

      // === AURORA BOREALIS ===
      // Multiple undulating curtains
      for (let curtain = 0; curtain < 3; curtain++) {
        const baseY = h * (0.1 + curtain * 0.08);
        const amplitude = 30 + curtain * 15;
        const hue = curtain === 0 ? 130 : curtain === 1 ? 170 : 280;
        const speed = 0.3 + curtain * 0.1;

        ctx.beginPath();
        ctx.moveTo(0, baseY);

        for (let x = 0; x <= w; x += 3) {
          const noise1 = Math.sin(x * 0.003 + t * speed) * amplitude;
          const noise2 = Math.sin(x * 0.007 + t * speed * 0.7 + curtain) * amplitude * 0.5;
          const noise3 = Math.sin(x * 0.001 + t * speed * 0.3) * amplitude * 0.8;
          const y = baseY + noise1 + noise2 + noise3;
          ctx.lineTo(x, y);
        }

        // Close the path to fill downward
        ctx.lineTo(w, baseY + amplitude * 3);
        ctx.lineTo(0, baseY + amplitude * 3);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, baseY - amplitude, 0, baseY + amplitude * 3);
        grad.addColorStop(0, `hsla(${hue}, 80%, 55%, ${0.05 + Math.sin(t * 0.5 + curtain) * 0.025})`);
        grad.addColorStop(0.3, `hsla(${hue}, 70%, 50%, ${0.08 + Math.sin(t * 0.3 + curtain) * 0.03})`);
        grad.addColorStop(0.6, `hsla(${hue + 20}, 60%, 45%, ${0.04 + Math.sin(t * 0.7 + curtain) * 0.02})`);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.fill();

        // Bright edge at the top of each curtain
        ctx.beginPath();
        for (let x = 0; x <= w; x += 3) {
          const noise1 = Math.sin(x * 0.003 + t * speed) * amplitude;
          const noise2 = Math.sin(x * 0.007 + t * speed * 0.7 + curtain) * amplitude * 0.5;
          const noise3 = Math.sin(x * 0.001 + t * speed * 0.3) * amplitude * 0.8;
          const y = baseY + noise1 + noise2 + noise3;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `hsla(${hue}, 90%, 65%, ${0.10 + Math.sin(t + curtain) * 0.05})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // === HELPER: sharp Finnish spruce silhouette ===
      // Draws a pointed spruce tree at (cx, baseY) with given height and width
      function drawSpruce(c: CanvasRenderingContext2D, cx: number, baseY: number, treeH: number, spread: number) {
        // Narrow pointed top, layered branches widening downward
        c.moveTo(cx, baseY - treeH); // sharp tip
        // 5 tiers of branches — each wider than the last
        const tiers = 5;
        for (let i = 1; i <= tiers; i++) {
          const frac = i / tiers;
          const tierY = baseY - treeH + treeH * frac * 0.85;
          const halfW = spread * frac * 0.55;
          // Zigzag inward then outward for each tier
          c.lineTo(cx - halfW, tierY);
          if (i < tiers) c.lineTo(cx - halfW * 0.35, tierY + 2);
        }
        // Trunk base
        c.lineTo(cx - spread * 0.06, baseY);
        c.lineTo(cx + spread * 0.06, baseY);
        // Right side — mirror
        for (let i = tiers; i >= 1; i--) {
          const frac = i / tiers;
          const tierY = baseY - treeH + treeH * frac * 0.85;
          const halfW = spread * frac * 0.55;
          if (i < tiers) c.lineTo(cx + halfW * 0.35, tierY + 2);
          c.lineTo(cx + halfW, tierY);
        }
        c.lineTo(cx, baseY - treeH); // back to tip
      }

      // === TREELINE SILHOUETTE — 3 depth layers with sharp spruces ===
      const treeLine = h * 0.7;

      // --- Back layer (distant trees, lightest, aurora bleed-through) ---
      ctx.beginPath();
      ctx.moveTo(0, h);
      ctx.lineTo(0, treeLine - 10);
      // Procedural spruces — back layer (smaller, denser)
      for (let x = 4; x < w; x += 18 + Math.sin(x * 0.07) * 6) {
        const treeH = 35 + Math.sin(x * 0.03 + 2.1) * 18 + Math.abs(Math.sin(x * 0.09)) * 25;
        const spread = 10 + Math.sin(x * 0.05) * 4;
        const baseY = treeLine - 10 + Math.sin(x * 0.015) * 12;
        drawSpruce(ctx, x, baseY, treeH, spread);
      }
      ctx.lineTo(w, treeLine - 10);
      ctx.lineTo(w, h);
      ctx.closePath();
      const backGrad = ctx.createLinearGradient(0, treeLine - 80, 0, h);
      backGrad.addColorStop(0, `rgba(16, 38, 28, ${0.75 + Math.sin(t * 0.4) * 0.05})`);
      backGrad.addColorStop(0.3, 'rgba(12, 28, 20, 0.88)');
      backGrad.addColorStop(1, 'rgba(8, 18, 14, 0.95)');
      ctx.fillStyle = backGrad;
      ctx.fill();

      // Aurora glow bleeding through the back treeline gaps
      for (let x = 0; x < w; x += 60 + Math.sin(x * 0.01) * 20) {
        const gapWidth = 8 + Math.sin(x * 0.03 + t * 0.2) * 4;
        const gapY = treeLine - 20 + Math.sin(x * 0.02) * 15;
        const auroraHue = 130 + Math.sin(t * 0.3 + x * 0.005) * 40;
        const glow = ctx.createRadialGradient(x, gapY, 0, x, gapY, gapWidth * 4);
        glow.addColorStop(0, `hsla(${auroraHue}, 70%, 50%, ${0.04 + Math.sin(t * 0.5 + x * 0.01) * 0.02})`);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.fillRect(x - gapWidth * 4, gapY - gapWidth * 4, gapWidth * 8, gapWidth * 8);
      }

      // --- Mid layer (main forest, sharp spruce spikes + snow caps) ---
      // Store tree tip positions for snow rendering
      const midTips: Array<{ x: number; y: number; treeH: number; spread: number }> = [];

      ctx.beginPath();
      ctx.moveTo(0, h);
      ctx.lineTo(0, treeLine + 5);
      for (let x = 3; x < w; x += 14 + Math.sin(x * 0.04 + 0.7) * 5) {
        const treeH = 30 + Math.sin(x * 0.025) * 15 + Math.abs(Math.sin(x * 0.065)) * 35;
        const spread = 9 + Math.sin(x * 0.04) * 3;
        const baseY = treeLine + 5 + Math.sin(x * 0.018) * 10;
        drawSpruce(ctx, x, baseY, treeH, spread);
        midTips.push({ x, y: baseY - treeH, treeH, spread });
      }
      ctx.lineTo(w, treeLine + 5);
      ctx.lineTo(w, h);
      ctx.closePath();
      const midGrad = ctx.createLinearGradient(0, treeLine - 40, 0, h);
      midGrad.addColorStop(0, '#0E2218');
      midGrad.addColorStop(0.5, '#0A1A12');
      midGrad.addColorStop(1, '#07120D');
      ctx.fillStyle = midGrad;
      ctx.fill();

      // Aurora rim-light on mid-layer tree edges
      ctx.beginPath();
      for (let x = 3; x < w; x += 14 + Math.sin(x * 0.04 + 0.7) * 5) {
        const treeH = 30 + Math.sin(x * 0.025) * 15 + Math.abs(Math.sin(x * 0.065)) * 35;
        const baseY = treeLine + 5 + Math.sin(x * 0.018) * 10;
        const tipY = baseY - treeH;
        ctx.moveTo(x, tipY);
        ctx.lineTo(x + 2, tipY + treeH * 0.15);
      }
      ctx.strokeStyle = `rgba(80, 180, 120, ${0.06 + Math.sin(t * 0.6) * 0.03})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // === SNOW CAPS on mid-layer tree tips ===
      for (const tip of midTips) {
        const snowH = 3 + Math.sin(tip.x * 0.07) * 2; // varying snow depth
        const snowW = tip.spread * 0.18 + Math.sin(tip.x * 0.1) * 1.5;

        // Snow triangle on the very tip
        ctx.beginPath();
        ctx.moveTo(tip.x, tip.y);
        ctx.lineTo(tip.x - snowW, tip.y + snowH);
        ctx.quadraticCurveTo(tip.x, tip.y + snowH + 1.5, tip.x + snowW, tip.y + snowH);
        ctx.closePath();

        const snowGrad = ctx.createLinearGradient(tip.x, tip.y, tip.x, tip.y + snowH + 2);
        snowGrad.addColorStop(0, 'rgba(220, 230, 240, 0.55)');
        snowGrad.addColorStop(0.6, 'rgba(200, 215, 230, 0.35)');
        snowGrad.addColorStop(1, 'rgba(180, 200, 220, 0.10)');
        ctx.fillStyle = snowGrad;
        ctx.fill();

        // Tiny snow on 2nd tier (occasional)
        if (Math.sin(tip.x * 0.13) > 0.3) {
          const tier2Y = tip.y + tip.treeH * 0.2;
          const tier2W = tip.spread * 0.25;
          ctx.beginPath();
          ctx.moveTo(tip.x - tier2W, tier2Y);
          ctx.quadraticCurveTo(tip.x, tier2Y - 1.5, tip.x + tier2W, tier2Y);
          ctx.quadraticCurveTo(tip.x, tier2Y + 1, tip.x - tier2W, tier2Y);
          ctx.fillStyle = 'rgba(210, 225, 235, 0.18)';
          ctx.fill();
        }
      }

      // --- Front layer (closest trees, darkest, sharp spikes) ---
      const frontTips: Array<{ x: number; y: number; treeH: number; spread: number }> = [];

      ctx.beginPath();
      ctx.moveTo(0, h);
      ctx.lineTo(0, treeLine + 25);
      for (let x = 7; x < w; x += 20 + Math.sin(x * 0.03 + 1.5) * 8) {
        const treeH = 25 + Math.sin(x * 0.02 + 0.5) * 12 + Math.abs(Math.sin(x * 0.075)) * 30;
        const spread = 11 + Math.sin(x * 0.035) * 4;
        const baseY = treeLine + 30 + Math.sin(x * 0.02) * 8;
        drawSpruce(ctx, x, baseY, treeH, spread);
        frontTips.push({ x, y: baseY - treeH, treeH, spread });
      }
      ctx.lineTo(w, treeLine + 25);
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fillStyle = '#081410';
      ctx.fill();

      // Snow caps on front layer too
      for (const tip of frontTips) {
        const snowH = 2.5 + Math.sin(tip.x * 0.05) * 1.5;
        const snowW = tip.spread * 0.2;
        ctx.beginPath();
        ctx.moveTo(tip.x, tip.y);
        ctx.lineTo(tip.x - snowW, tip.y + snowH);
        ctx.quadraticCurveTo(tip.x, tip.y + snowH + 1, tip.x + snowW, tip.y + snowH);
        ctx.closePath();
        ctx.fillStyle = 'rgba(200, 215, 230, 0.30)';
        ctx.fill();
      }

      // Ground fog
      const fogGrad = ctx.createLinearGradient(0, h * 0.85, 0, h);
      fogGrad.addColorStop(0, 'transparent');
      fogGrad.addColorStop(0.5, `rgba(12, 30, 22, ${0.06 + Math.sin(t * 0.2) * 0.03})`);
      fogGrad.addColorStop(1, `rgba(6, 10, 16, ${0.15 + Math.sin(t * 0.15) * 0.05})`);
      ctx.fillStyle = fogGrad;
      ctx.fillRect(0, h * 0.75, w, h * 0.25);

      // === FLYING RAVEN ===
      // Soaring raven that glides across the sky with slow wingbeats
      const ravenCycle = 45; // seconds for full crossing
      const ravenProgress = ((t * 0.8) % ravenCycle) / ravenCycle; // 0→1
      const ravenX = -40 + (w + 80) * ravenProgress;
      const ravenBaseY = treeLine * 0.35 + Math.sin(ravenProgress * Math.PI * 3) * 25; // gentle wave path
      const ravenY = ravenBaseY + Math.sin(t * 1.2) * 4; // subtle body bob

      // Wing flap phase — slow glide with occasional flaps
      const wingT = t * 1.8;
      const wingAngle = Math.sin(wingT) * 0.35 + Math.sin(wingT * 2.3) * 0.12; // asymmetric flap
      const wingSpan = 18;
      const bodyLen = 10;

      ctx.save();
      ctx.translate(ravenX, ravenY);

      // Body
      ctx.beginPath();
      ctx.ellipse(0, 0, bodyLen, 2.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(8, 8, 12, 0.85)';
      ctx.fill();

      // Head
      ctx.beginPath();
      ctx.arc(bodyLen * 0.7, -1, 3, 0, Math.PI * 2);
      ctx.fill();

      // Beak
      ctx.beginPath();
      ctx.moveTo(bodyLen * 0.7 + 3, -1.5);
      ctx.lineTo(bodyLen * 0.7 + 7, -0.5);
      ctx.lineTo(bodyLen * 0.7 + 3, 0);
      ctx.fillStyle = 'rgba(20, 20, 25, 0.9)';
      ctx.fill();

      // Left wing
      ctx.beginPath();
      ctx.moveTo(-2, 0);
      ctx.quadraticCurveTo(-wingSpan * 0.5, -wingSpan * wingAngle - 6, -wingSpan, -wingSpan * wingAngle * 0.7);
      ctx.quadraticCurveTo(-wingSpan * 0.6, -wingSpan * wingAngle * 0.2 + 1, -2, 1);
      ctx.fillStyle = 'rgba(10, 10, 15, 0.8)';
      ctx.fill();

      // Right wing
      ctx.beginPath();
      ctx.moveTo(-2, 0);
      ctx.quadraticCurveTo(-wingSpan * 0.5, wingSpan * wingAngle * 0.5 + 5, -wingSpan * 0.8, wingSpan * wingAngle * 0.4 + 3);
      ctx.quadraticCurveTo(-wingSpan * 0.4, wingSpan * wingAngle * 0.15 + 1, -2, 1);
      ctx.fill();

      // Tail feathers — forked
      ctx.beginPath();
      ctx.moveTo(-bodyLen + 1, -1);
      ctx.lineTo(-bodyLen - 5, -2.5);
      ctx.lineTo(-bodyLen - 3, 0);
      ctx.lineTo(-bodyLen - 5, 2);
      ctx.lineTo(-bodyLen + 1, 1);
      ctx.fillStyle = 'rgba(8, 8, 12, 0.75)';
      ctx.fill();

      ctx.restore();

      // === SNOWFLAKES ===
      for (const flake of snowflakes) {
        flake.x += flake.vx + Math.sin(t + flake.y * 0.01) * 0.3;
        flake.y += flake.vy;

        if (flake.y > h) {
          flake.y = -5;
          flake.x = Math.random() * w;
        }
        if (flake.x < 0) flake.x = w;
        if (flake.x > w) flake.x = 0;

        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 230, 240, ${flake.opacity})`;
        ctx.fill();

        // Subtle glow
        if (flake.r > 1.5) {
          const glow = ctx.createRadialGradient(flake.x, flake.y, 0, flake.x, flake.y, flake.r * 3);
          glow.addColorStop(0, `rgba(220, 230, 240, ${flake.opacity * 0.3})`);
          glow.addColorStop(1, 'transparent');
          ctx.fillStyle = glow;
          ctx.fillRect(flake.x - flake.r * 3, flake.y - flake.r * 3, flake.r * 6, flake.r * 6);
        }
      }

      // === STARS (above treeline) ===
      for (let i = 0; i < 50; i++) {
        const sx = (i * 23.7 + 11) % w;
        const sy = (i * 17.3 + 5) % (treeLine * 0.6);
        const twinkle = Math.sin(t * 2 + i * 1.7) * 0.3 + 0.4;
        const starSize = i % 7 === 0 ? 1.5 : 0.8;

        ctx.beginPath();
        ctx.arc(sx, sy, starSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 240, 232, ${twinkle * 0.5})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
    />
  );
}

const features = [
  { label: '180 ha', description: 'Ongerept Fins taigabos', icon: '🌲' },
  { label: '66°N', description: 'Arctische cirkel, Kuusamo', icon: '🧭' },
  { label: '−40°C', description: 'Winters onder het noorderlicht', icon: '❄️' },
  { label: '∞', description: 'Stilte', icon: '🔇' },
];

export function MarcoWilderness() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} className="relative py-0 overflow-hidden">
      {/* Full bleed aurora section */}
      <div className="relative min-h-screen flex flex-col justify-center">
        {/* Aurora canvas background */}
        <div className="absolute inset-0" style={{ background: '#060a10' }}>
          <AuroraCanvas />
        </div>

        <motion.div style={{ y: contentY }} className="relative z-10 max-w-5xl mx-auto px-6 py-24 md:py-40">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="mb-16 md:mb-24"
          >
            <span className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.5em] uppercase text-emerald-400/50 block mb-4">
              Het Begin van Alles
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl lg:text-8xl font-light text-cream">
              De Finse{' '}
              <span
                className="italic"
                style={{
                  background: 'linear-gradient(135deg, #22c55e 0%, #06b6d4 50%, #8b5cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Wildernis
              </span>
            </h2>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20 md:mb-28"
          >
            {features.map((feat, i) => (
              <motion.div
                key={feat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.12 }}
                className="group text-center p-6 border border-emerald-500/[0.08] hover:border-emerald-500/[0.25] transition-all duration-700 backdrop-blur-sm bg-black/20"
              >
                <span className="text-2xl block mb-2 group-hover:scale-125 transition-transform duration-500">
                  {feat.icon}
                </span>
                <span className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-emerald-400/80 block mb-2 group-hover:text-emerald-300 transition-colors duration-500">
                  {feat.label}
                </span>
                <span className="font-[family-name:var(--font-sans)] text-[9px] tracking-[0.3em] uppercase text-cream/25">
                  {feat.description}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Two origin stories */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-20 md:mb-28">
            {/* AetherLink */}
            <motion.div
              initial={{ opacity: 0, x: -60, rotateY: -5 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-8 md:p-10 border border-rose-gold/[0.06] hover:border-rose-gold/[0.2] transition-all duration-700 overflow-hidden backdrop-blur-sm bg-black/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-gold/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative">
                <motion.span
                  className="text-4xl block mb-4"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  ⚡
                </motion.span>
                <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-cream group-hover:text-rose-gold-light transition-colors duration-500 mb-4 italic">
                  AetherLink
                </h3>
                <p className="font-[family-name:var(--font-serif)] text-sm md:text-base text-cream/30 leading-relaxed group-hover:text-cream/55 transition-colors duration-500">
                  In de absolute stilte van het Finse bos — waar het enige geluid de wind door de berken is — ontstond het idee voor AetherLink. De overtuiging dat kunstmatige intelligentie niet tegenover de mens hoeft te staan, maar naast hem. Dat de kracht van AI pas echt tot zijn recht komt wanneer het wordt geleid door menselijke wijsheid, ervaring en empathie. Van consulting tot autonome systemen — AetherLink bouwt de brug tussen technologie en menselijkheid.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full shimmer transition-all duration-1000" />
            </motion.div>

            {/* TaigaSchool */}
            <motion.div
              initial={{ opacity: 0, x: 60, rotateY: 5 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-8 md:p-10 border border-emerald-500/[0.08] hover:border-emerald-500/[0.25] transition-all duration-700 overflow-hidden backdrop-blur-sm bg-black/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative">
                <motion.span
                  className="text-4xl block mb-4"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  🌲
                </motion.span>
                <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-cream group-hover:text-emerald-300 transition-colors duration-500 mb-4 italic">
                  TaigaSchool
                </h3>
                <p className="font-[family-name:var(--font-serif)] text-sm md:text-base text-cream/30 leading-relaxed group-hover:text-cream/55 transition-colors duration-500">
                  Wat als je de transformatieve kracht van de wildernis kon delen? TaigaSchool is het antwoord — een eco-hotel diep in de taiga van Kuusamo, waar gasten niet alleen de natuur bezoeken maar er deel van worden. Wandelingen door oerbos, nachten onder het noorderlicht, stilte als luxe. Van de veengronden van Drenthe tot de taiga van Finland — de cirkel is rond.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full shimmer transition-all duration-1000" />
            </motion.div>
          </div>

          {/* Closing statement */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="gold-line w-24 mx-auto mb-10" />
            <p className="font-[family-name:var(--font-serif)] text-lg md:text-xl lg:text-2xl text-cream/35 italic leading-relaxed mb-6">
              Van een arbeiderskind in de veengronden van Drenthe tot de oprichter van een holding die technologie, natuur en menselijkheid verbindt.
            </p>
            <motion.p
              className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl italic leading-tight"
              style={{
                background: 'linear-gradient(135deg, #F5F0E8 0%, #C5956B 50%, #F5F0E8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Het verhaal is nog lang niet af.
            </motion.p>
            <div className="mt-12 flex items-center justify-center gap-4">
              <span className="font-[family-name:var(--font-sans)] text-[9px] tracking-[0.4em] uppercase text-cream/15">
                Kuusamo, Finland
              </span>
              <motion.span
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-emerald-400/40"
              />
              <span className="font-[family-name:var(--font-sans)] text-[9px] tracking-[0.4em] uppercase text-cream/15">
                66°N
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
