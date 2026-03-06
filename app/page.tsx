'use client';

import dynamic from 'next/dynamic';
import { LanguageProvider } from './i18n/LanguageContext';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { MarqueeBand } from './components/MarqueeBand';
import { SmoothScroll } from './components/SmoothScroll';
import { ScrollProgress } from './components/ScrollProgress';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { AmbientOrbs } from './components/AmbientOrbs';
import { MotionProvider } from './components/MotionProvider';

const VisionSection = dynamic(
  () => import('./components/VisionSection').then(m => ({ default: m.VisionSection })),
  { ssr: false }
);

const PillarsSection = dynamic(
  () => import('./components/PillarsSection').then(m => ({ default: m.PillarsSection })),
  { ssr: false }
);

const HeritageSection = dynamic(
  () => import('./components/HeritageSection').then(m => ({ default: m.HeritageSection })),
  { ssr: false }
);

const PhilanthropySection = dynamic(
  () => import('./components/PhilanthropySection').then(m => ({ default: m.PhilanthropySection })),
  { ssr: false }
);

const ContactSection = dynamic(
  () => import('./components/ContactSection').then(m => ({ default: m.ContactSection })),
  { ssr: false }
);

const Footer = dynamic(
  () => import('./components/Footer').then(m => ({ default: m.Footer })),
  { ssr: false }
);

const AetherBot = dynamic(
  () => import('./components/AetherBot').then(m => ({ default: m.AetherBot })),
  { ssr: false }
);

const SectionDivider = dynamic(
  () => import('./components/SectionDivider').then(m => ({ default: m.SectionDivider })),
  { ssr: false }
);

export default function Home() {
  return (
    <LanguageProvider>
      <MotionProvider>
        <LoadingScreen />
        <AmbientOrbs />
        <SmoothScroll />
        <ScrollProgress />
        <CustomCursor />
        <Navigation />
        <main>
          <HeroSection />
          <MarqueeBand
            textKey="marquee1"
            className="text-rose-gold/[0.04] border-y border-rose-gold/[0.04]"
          />
          <VisionSection />
          <SectionDivider variant="diamond" />
          <MarqueeBand
            textKey="marquee2"
            reverse
            className="text-cream/[0.03]"
          />
          <PillarsSection />
          <SectionDivider variant="lines" />
          <HeritageSection />
          <SectionDivider variant="particles" />
          <PhilanthropySection />
          <SectionDivider variant="diamond" />
          <ContactSection />
        </main>
        <Footer />
        <AetherBot />
      </MotionProvider>
    </LanguageProvider>
  );
}
