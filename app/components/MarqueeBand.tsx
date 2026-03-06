'use client';

import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useAnimationFrame,
} from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

interface MarqueeBandProps {
  textKey?: 'marquee1' | 'marquee2';
  text?: string;
  reverse?: boolean;
  className?: string;
}

/**
 * Diamond ornament separator — a ◆ character flanked by rose-gold hair-lines
 * that fade from the diamond outward to transparent.
 */
function DiamondSeparator() {
  return (
    <span
      className="inline-flex items-center mx-10 align-middle"
      aria-hidden="true"
      style={{ verticalAlign: 'middle', lineHeight: 0 }}
    >
      {/* Left hair-line — fades from transparent to rose-gold */}
      <span
        style={{
          display: 'inline-block',
          width: '40px',
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(197,149,107,0.55) 100%)',
          verticalAlign: 'middle',
        }}
      />

      {/* Diamond glyph */}
      <span
        style={{
          display: 'inline-block',
          fontSize: '0.65em',
          lineHeight: 1,
          color: '#C5956B',
          textShadow:
            '0 0 8px rgba(197,149,107,0.9), 0 0 20px rgba(197,149,107,0.45)',
          margin: '0 8px',
          verticalAlign: 'middle',
          position: 'relative',
          top: '-0.05em',
        }}
      >
        ◆
      </span>

      {/* Right hair-line — fades from rose-gold to transparent */}
      <span
        style={{
          display: 'inline-block',
          width: '40px',
          height: '1px',
          background:
            'linear-gradient(90deg, rgba(197,149,107,0.55) 0%, transparent 100%)',
          verticalAlign: 'middle',
        }}
      />
    </span>
  );
}

/**
 * A single pass of the marquee content.
 * Even indices render as a very subtle filled ghost; odd indices as a near-
 * invisible outline — together they create an ethereal background texture.
 */
function MarqueeSegment({
  text,
  index,
}: {
  text: string;
  index: number;
}) {
  const isOutline = index % 2 === 1;
  return (
    <>
      <span
        className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-[8rem] font-light tracking-[0.05em]"
        style={
          isOutline
            ? {
                WebkitTextStroke: '0.5px rgba(197,149,107,0.15)',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }
            : {
                color: 'rgba(197,149,107,0.12)',
              }
        }
      >
        {text}
      </span>
      <DiamondSeparator />
    </>
  );
}

export function MarqueeBand({
  textKey,
  text: textProp,
  reverse = false,
  className = '',
}: MarqueeBandProps) {
  const bandRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLSpanElement>(null);
  const { t } = useLanguage();

  // --- Scroll-driven parallax — reduced range for calmer movement ---
  const { scrollY, scrollYProgress } = useScroll({
    target: bandRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? ['-6px', '6px'] : ['6px', '-6px']
  );

  // --- Velocity-reactive speed — softened multiplier ---
  const rawVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(rawVelocity, {
    stiffness: 50,
    damping: 20,
  });

  const [paused, setPaused] = useState(false);

  /**
   * Drive CSS animation duration directly via a DOM ref — no React re-renders
   * on every frame. Base 80s; scroll velocity gently compresses toward 35s.
   * Multiplier 0.006 vs the original 0.016 keeps the effect subtle.
   */
  useAnimationFrame(() => {
    const el = trackRef.current;
    if (!el || paused) return;

    const absVel = Math.abs(smoothVelocity.get());
    const duration = Math.max(35, 80 - absVel * 0.006);
    el.style.animationDuration = `${duration}s`;

    // Direction: reverse prop + scroll direction flip
    const goingDown = smoothVelocity.get() > 0;
    const shouldReverse = reverse ? !goingDown : goingDown;
    el.style.animationDirection = shouldReverse ? 'reverse' : 'normal';
  });

  const handleMouseEnter = useCallback(() => setPaused(true), []);
  const handleMouseLeave = useCallback(() => setPaused(false), []);

  const displayText = textKey ? t[textKey] : (textProp ?? '');

  // 8 repeats — seam always off-screen at any viewport width
  const REPEAT_COUNT = 8;

  return (
    <motion.div
      ref={bandRef}
      style={{ y: parallaxY }}
      className={`overflow-hidden py-6 md:py-10 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Fade masks — wider on desktop for a more gradual disappear */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 lg:w-48 z-10"
          style={{
            background: 'linear-gradient(90deg, #080E1A 0%, transparent 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 lg:w-48 z-10"
          style={{
            background:
              'linear-gradient(270deg, #080E1A 0%, transparent 100%)',
          }}
        />

        <div className="whitespace-nowrap">
          {/*
           * The track holds 2× the content so the CSS translateX(-50%)
           * animation produces a seamless loop matching the globals.css keyframe.
           */}
          <span
            ref={trackRef}
            className="marquee-track inline-block"
            style={{
              animationPlayState: paused ? 'paused' : 'running',
            }}
          >
            {/* First half */}
            {Array.from({ length: REPEAT_COUNT }, (_, i) => (
              <MarqueeSegment key={`a-${i}`} text={displayText} index={i} />
            ))}
            {/* Second half — exact mirror so -50% translateX loops cleanly */}
            {Array.from({ length: REPEAT_COUNT }, (_, i) => (
              <MarqueeSegment key={`b-${i}`} text={displayText} index={i} />
            ))}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
