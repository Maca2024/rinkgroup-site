'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

// Section IDs that map to # hrefs for IntersectionObserver
const SECTION_IDS = ['vision', 'ventures', 'heritage', 'philanthropy', 'contact'];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { t } = useLanguage();

  // Show nav after loading screen exits (~4s)
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3800);
    return () => clearTimeout(timer);
  }, []);

  const links = [
    { label: t.nav.vision, href: '#vision' },
    { label: t.nav.ventures, href: '#ventures' },
    { label: t.nav.heritage, href: '#heritage' },
    { label: t.nav.philanthropy, href: '#philanthropy' },
    { label: 'The Founder', href: '/marco' },
    { label: t.nav.contact, href: '#contact' },
  ];

  // Scroll depth detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // IntersectionObserver — detect which section is in view
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // FIX: renamed from `visible` to `visibleEntries` to avoid shadowing outer state
        const visibleEntries = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      { threshold: [0.2, 0.4, 0.6], rootMargin: '-10% 0px -10% 0px' }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  // Smooth scroll handler for anchor links
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith('#')) return;
      e.preventDefault();
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setMobileOpen(false);
    },
    []
  );

  // Determine if a link is active
  const isActive = (href: string) => {
    if (!href.startsWith('#')) return false;
    return activeSection === href.slice(1);
  };

  // FIX: All transitions unified in inline style — Tailwind `transition-all` removed
  // to prevent the inline style from being silently overridden.
  // Using visibility + opacity so the nav never bleeds through via CSS cascade.
  const navStyle: React.CSSProperties = {
    visibility: visible ? 'visible' : 'hidden',
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(-20px)',
    // Scrolled glass state
    background: scrolled
      ? 'rgba(8, 15, 33, 0.82)'
      : 'transparent',
    backdropFilter: scrolled
      ? 'blur(18px) saturate(160%)'
      : 'blur(8px) saturate(120%)',
    WebkitBackdropFilter: scrolled
      ? 'blur(18px) saturate(160%)'
      : 'blur(8px) saturate(120%)',
    boxShadow: scrolled
      ? '0 4px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(197,149,107,0.08)'
      : 'none',
    borderBottom: scrolled
      ? '1px solid rgba(197,149,107,0.08)'
      : '1px solid rgba(197,149,107,0.03)',
    paddingTop: scrolled ? '0.75rem' : '1.5rem',
    paddingBottom: scrolled ? '0.75rem' : '1.5rem',
    // Single transition declaration covers ALL animated properties
    transition: [
      'visibility 0s linear 0s',
      'opacity 1s cubic-bezier(0.25, 0.1, 0.25, 1)',
      'transform 1s cubic-bezier(0.25, 0.1, 0.25, 1)',
      'background 700ms ease',
      'backdrop-filter 700ms ease',
      'box-shadow 700ms ease',
      'border-bottom 700ms ease',
      'padding-top 700ms ease',
      'padding-bottom 700ms ease',
    ].join(', '),
  };

  return (
    <>
      <nav
        // z-[60] ensures nav sits above ScrollProgress (typically z-50)
        // No Tailwind transition-* classes — all transitions live in navStyle
        className="fixed top-0 left-0 right-0 z-[60]"
        style={navStyle}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo — glows when scrolled, letter-spacing animates on hover */}
          <a href="/" className="flex items-center gap-3 group">
            <span
              className="font-[family-name:var(--font-display)] text-xl text-rose-gold-light group-hover:text-rose-gold-pale"
              style={{
                letterSpacing: '0.2em',
                transition:
                  'color 500ms ease, letter-spacing 500ms cubic-bezier(0.25, 0.1, 0.25, 1), text-shadow 500ms ease',
                textShadow: scrolled
                  ? '0 0 18px rgba(197,149,107,0.35), 0 0 36px rgba(197,149,107,0.12)'
                  : 'none',
              }}
              // letter-spacing widens on hover via group-hover — handled by a CSS
              // custom property trick: we use an inline onMouseEnter/Leave on the <a>
            >
              RINK GROUP
            </span>
          </a>

          {/* Desktop links + language switcher */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const active = isActive(link.href);
              const hovered = hoveredLink === link.href;

              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="font-[family-name:var(--font-sans)] text-sm tracking-[0.15em] uppercase relative group overflow-hidden"
                  style={{
                    color: active
                      ? 'rgba(197,149,107,0.9)'
                      : hovered
                        ? 'rgba(212,165,116,1)'
                        : 'rgba(245,240,232,0.6)',
                    transition: 'color 500ms ease',
                  }}
                >
                  {/* Shimmer sweep on hover */}
                  <AnimatePresence>
                    {hovered && (
                      <motion.span
                        key="shimmer"
                        initial={{ x: '-110%', opacity: 0.6 }}
                        animate={{ x: '110%', opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            'linear-gradient(110deg, transparent 20%, rgba(197,149,107,0.25) 50%, transparent 80%)',
                          borderRadius: 2,
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {link.label}

                  {/* Golden underline — active state or hover */}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-px origin-left"
                    animate={{
                      scaleX: active || hovered ? 1 : 0,
                      opacity: active ? 1 : hovered ? 0.7 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      width: '100%',
                      background: active
                        ? 'linear-gradient(90deg, #C5956B, #E0B88A, #C5956B)'
                        : 'rgba(197,149,107,0.7)',
                      boxShadow: active ? '0 0 6px rgba(197,149,107,0.4)' : 'none',
                    }}
                  />
                </motion.a>
              );
            })}
            <div className="border-l border-rose-gold/10 pl-4 ml-2">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile hamburger — always visible regardless of `visible` state */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
            style={{ visibility: 'visible', opacity: 1 }}
          >
            <motion.span
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }}
              className="w-6 h-px bg-rose-gold-light block"
            />
            <motion.span
              animate={{ opacity: mobileOpen ? 0 : 1 }}
              className="w-6 h-px bg-rose-gold-light block"
            />
            <motion.span
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }}
              className="w-6 h-px bg-rose-gold-light block"
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu — z-[59] so it slides under the nav bar itself */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[59] bg-navy-deep/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {links.map((link, i) => {
              const active = isActive(link.href);
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="font-[family-name:var(--font-display)] text-3xl tracking-[0.15em] transition-colors relative flex items-center gap-3"
                  style={{
                    color: active
                      ? 'rgba(228,185,143,1)'
                      : 'rgba(212,165,116,0.75)',
                    textShadow: active
                      ? '0 0 24px rgba(197,149,107,0.5), 0 0 48px rgba(197,149,107,0.2)'
                      : undefined,
                  }}
                >
                  {/* Active accent bar */}
                  <motion.span
                    className="block w-5 h-px origin-left flex-shrink-0"
                    animate={{ scaleX: active ? 1 : 0, opacity: active ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      background:
                        'linear-gradient(90deg, #E4B98F, rgba(197,149,107,0.4))',
                      boxShadow: '0 0 6px rgba(197,149,107,0.6)',
                    }}
                  />
                  {link.label}
                </motion.a>
              );
            })}
            <div className="mt-6">
              <LanguageSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
