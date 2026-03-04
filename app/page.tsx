import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { MarqueeBand } from './components/MarqueeBand';
import { VisionSection } from './components/VisionSection';
import { PillarsSection } from './components/PillarsSection';
import { HeritageSection } from './components/HeritageSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SmoothScroll } from './components/SmoothScroll';
import { ScrollProgress } from './components/ScrollProgress';
import { CustomCursor } from './components/CustomCursor';

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <CustomCursor />
      <Navigation />
      <main>
        <HeroSection />
        <MarqueeBand
          text="LUMEN FELICIS"
          className="text-rose-gold/[0.04] border-y border-rose-gold/[0.04]"
        />
        <VisionSection />
        <MarqueeBand
          text="TECHNOLOGY · NATURE · MARITIME · PLATFORM"
          reverse
          className="text-cream/[0.03]"
        />
        <PillarsSection />
        <HeritageSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
