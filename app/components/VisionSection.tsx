'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const words = 'Building legacies that transcend generations'.split(' ');

export function VisionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'start 0.2'],
  });

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48">
      <div className="max-w-6xl mx-auto px-6">
        {/* Scroll-revealed heading */}
        <div className="mb-8">
          <span className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.5em] uppercase text-rose-gold/40 block mb-8">
            Our Philosophy
          </span>
        </div>

        <h2 className="flex flex-wrap gap-x-4 md:gap-x-6 font-[family-name:var(--font-display)] text-4xl md:text-6xl lg:text-8xl font-light leading-[1.15] mb-6">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;

            return (
              <ScrollWord
                key={i}
                word={word}
                range={[start, end]}
                progress={scrollYProgress}
                isAccent={word === 'transcend'}
              />
            );
          })}
        </h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="gold-line w-24 origin-left mt-10 mb-20"
        />

        {/* Philosophy body */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="font-[family-name:var(--font-serif)] text-xl md:text-2xl text-cream/50 leading-relaxed"
          >
            Rink Group operates at the intersection of Nordic innovation and time-tested principles.
            We don&apos;t chase trends — we build structures that compound value across decades,
            jurisdictions, and generations.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-[family-name:var(--font-serif)] text-xl md:text-2xl text-cream/50 leading-relaxed"
          >
            From the ancient taiga forests of Finland to the trading floors of Amsterdam,
            our portfolio reflects a singular conviction: that the greatest returns flow
            from patience, integrity, and the courage to think in centuries.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function ScrollWord({
  word,
  range,
  progress,
  isAccent,
}: {
  word: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  isAccent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.08, 1]);
  const y = useTransform(progress, range, [30, 0]);
  const blur = useTransform(progress, range, [8, 0]);

  return (
    <motion.span
      style={{ opacity, y, filter: blur.get() > 0.5 ? `blur(${blur}px)` : undefined }}
      className={isAccent ? 'text-rose-gradient italic' : 'text-cream'}
    >
      {word}
    </motion.span>
  );
}
