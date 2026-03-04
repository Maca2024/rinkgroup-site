'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const pillars = [
  {
    number: 'I',
    title: 'Technology',
    subtitle: 'AetherLink B.V.',
    body: 'AI consulting and intelligent automation. We architect the systems that transform enterprises into adaptive, self-optimizing organisms. From agent ecosystems to strategic digital transformation.',
    stat: 'EUR 225/hr',
    statLabel: 'consulting rate',
  },
  {
    number: 'II',
    title: 'Nature',
    subtitle: 'TaigaSchool',
    body: 'Regenerative eco-hospitality in the Kuusamo wilderness. Boutique cabins, Northern Lights experiences, and deep forest immersion. Where ancient taiga meets contemporary sanctuary.',
    stat: '180 ha',
    statLabel: 'pristine forest',
  },
  {
    number: 'III',
    title: 'Maritime',
    subtitle: 'Van Diemen AOS',
    body: 'Advanced ship recycling and maritime decommissioning technology. Pioneering sustainable end-of-life solutions for the global fleet with Primal AOS methodology.',
    stat: '€50K',
    statLabel: 'first contract',
  },
  {
    number: 'IV',
    title: 'Platform',
    subtitle: 'Solvari Design',
    body: 'Design system architecture and AI integration for the largest home improvement platform in the Benelux. Apple-inspired design language, agent-ready infrastructure.',
    stat: '2026',
    statLabel: 'design system',
  },
];

export function PillarsSection() {
  return (
    <section id="ventures" className="relative py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-right mb-20 md:mb-28"
        >
          <span className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.5em] uppercase text-rose-gold/40 block mb-4">
            Portfolio
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl lg:text-7xl font-light text-cream">
            Our <span className="text-rose-gradient italic">Ventures</span>
          </h2>
        </motion.div>

        {/* Pillar cards */}
        <div className="space-y-px">
          {pillars.map((p, i) => (
            <PillarCard key={p.number} pillar={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarCard({ pillar, index }: { pillar: typeof pillars[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 0.5], [index % 2 === 0 ? -30 : 30, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ x, opacity }}
      className="group relative border-t border-rose-gold/[0.08] py-12 md:py-16 hover:bg-rose-gold/[0.015] transition-colors duration-700"
    >
      <div className="grid grid-cols-12 gap-4 md:gap-6 items-start">
        {/* Number */}
        <div className="col-span-2 md:col-span-1">
          <span className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl text-rose-gold/[0.12] group-hover:text-rose-gold/30 transition-colors duration-700">
            {pillar.number}
          </span>
        </div>

        {/* Title + Subtitle */}
        <div className="col-span-10 md:col-span-3">
          <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-cream group-hover:text-rose-gold-light transition-colors duration-500">
            {pillar.title}
          </h3>
          <span className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.25em] uppercase text-rose-gold/40 mt-1 block">
            {pillar.subtitle}
          </span>
        </div>

        {/* Description */}
        <p className="col-span-12 md:col-span-5 font-[family-name:var(--font-serif)] text-base md:text-lg text-cream/35 leading-relaxed group-hover:text-cream/55 transition-colors duration-500">
          {pillar.body}
        </p>

        {/* Stat */}
        <div className="col-span-12 md:col-span-3 md:text-right">
          <span className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-rose-gold/15 group-hover:text-rose-gold/40 transition-colors duration-500">
            {pillar.stat}
          </span>
          <span className="block font-[family-name:var(--font-sans)] text-[9px] tracking-[0.25em] uppercase text-cream/15 mt-1">
            {pillar.statLabel}
          </span>
        </div>
      </div>

      {/* Hover line accent */}
      <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full shimmer transition-all duration-1000" />
    </motion.div>
  );
}
