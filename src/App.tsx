import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, Mail, Home } from 'lucide-react';

import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import EducationView from './components/EducationView';
import ExperienceView from './components/ExperienceView';
import ResumeView from './components/ResumeView';
import ProjectsView from './components/ProjectsView';
import SkillsView from './components/SkillsView';
import InterestsView from './components/InterestsView';
import ContactView from './components/ContactView';
import ActivitiesView from './components/ActivitiesView';
import DynamicBackground from './components/DynamicBackground';
import TerminalBootSequence from './components/TerminalBootSequence';
import CyberCursor from './components/CyberCursor';
import { SoundProvider, useSounds } from './components/SoundSystem';

// Sections that live in the scroll flow
const SCROLL_SECTIONS = ['home', 'education', 'experience', 'projects', 'activities', 'skills', 'interests'] as const;
type ScrollSection = typeof SCROLL_SECTIONS[number];
type OverlaySection = 'resume' | 'contact';

// Section entry animation variants removed in favor of granular Reveal components

function SectionWrapper({
  id,
  children,
  className = '',
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={`section-${id}`}
      className={`min-h-screen relative flex flex-col scroll-snap-start ${className}`}
    >
      {children}
    </section>
  );
}

function AppContent() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [overlay, setOverlay] = useState<OverlaySection | null>(null);
  const [hasBooted, setHasBooted] = useState(false);
  const [showPartyBoot, setShowPartyBoot] = useState(false);
  const { playClick, playBoot } = useSounds();

  // Scroll to a section or open overlay
  const handleSectionChange = useCallback(
    (id: string) => {
      playClick();
      if (id === 'resume' || id === 'contact') {
        setOverlay(id as OverlaySection);
        return;
      }
      const el = document.getElementById(`section-${id}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    [playClick]
  );

  const closeOverlay = () => {
    playClick();
    setOverlay(null);
  };

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (!hasBooted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Use the entry with the highest intersection ratio
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!best || entry.intersectionRatio > best.intersectionRatio) {
              best = entry;
            }
          }
        }
        if (best) {
          setActiveSection(best.target.id.replace('section-', ''));
        }
      },
      {
        threshold: Array.from({ length: 20 }, (_, i) => i / 20),
        rootMargin: '-20% 0px -20% 0px',
      }
    );

    SCROLL_SECTIONS.forEach((id) => {
      const el = document.getElementById(`section-${id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [hasBooted]);

  // Lock body scroll while overlay is open
  useEffect(() => {
    document.body.style.overflow = overlay ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [overlay]);

  const renderSection = (id: ScrollSection) => {
    switch (id) {
      case 'home':
        return <Hero />;
      case 'education':
        return (
          <div className="flex-grow flex flex-col items-center w-full px-4 md:px-[64px] pt-[100px] md:pt-[128px] pb-16">
            <EducationView />
          </div>
        );
      case 'experience':
        return (
          <div className="flex-grow flex flex-col items-center w-full px-4 md:px-[64px] pt-[100px] md:pt-[128px] pb-16">
            <ExperienceView />
          </div>
        );
      case 'projects':
        return (
          <div className="flex-grow flex flex-col items-center w-full px-4 md:px-[64px] pt-[100px] md:pt-[128px] pb-16">
            <ProjectsView />
          </div>
        );
      case 'activities':
        return (
          <div className="flex-grow flex flex-col items-center w-full px-4 md:px-[64px] pt-[100px] md:pt-[128px] pb-16">
            <ActivitiesView />
          </div>
        );
      case 'skills':
        return (
          <div className="flex-grow flex flex-col items-center w-full px-4 md:px-[64px] pt-[100px] md:pt-[128px] pb-16">
            <SkillsView />
          </div>
        );
      case 'interests':
        return (
          <>
            <div className="flex-grow flex flex-col items-center w-full px-4 md:px-[64px] pt-[100px] md:pt-[128px] pb-0">
              <InterestsView onPartyTrigger={() => setShowPartyBoot(true)} />
            </div>
            {/* Footer lives at the bottom of the last scroll section */}
            <Footer onSectionChange={handleSectionChange} />
          </>
        );
    }
  };

  return (
    <div className="text-on-surface antialiased relative overflow-x-clip bg-surface-container-lowest">
      {/* Custom cyber cursor */}
      <CyberCursor />

      <audio id="party-audio" src="/janice-stfu.mp3" preload="auto" />

      {/* Boot sequence */}
      <AnimatePresence>
        {!hasBooted && (
          <TerminalBootSequence
            onComplete={() => {
              playBoot();
              setHasBooted(true);
            }}
          />
        )}
        {showPartyBoot && (
          <TerminalBootSequence
            isPartyMode={true}
            onComplete={() => setShowPartyBoot(false)}
          />
        )}
      </AnimatePresence>

      {hasBooted && (
        <>
          <DynamicBackground />
          <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/3 to-transparent pointer-events-none z-0" />

          {/* Fixed header */}
          <Header activeSection={activeSection} onSectionChange={handleSectionChange} />

          {/* ── Infinite Scroll canvas ── */}
          <main className="scroll-snap-y-proximity">
            {SCROLL_SECTIONS.map((id) => (
              <SectionWrapper key={id} id={id}>
                {renderSection(id)}
              </SectionWrapper>
            ))}
          </main>

          {/* ── Overlay: Resume ── */}
          <AnimatePresence>
            {overlay === 'resume' && (
              <motion.div
                key="resume-overlay"
                className="fixed inset-0 z-[300] flex flex-col bg-surface-container-lowest overflow-y-auto"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 28 }}
              >
                {/* Overlay header bar */}
                <div className="sticky top-0 z-10 bg-[#0a0d10]/90 backdrop-blur-xl border-b border-outline-variant/15 flex items-center justify-between px-6 md:px-12 py-4">
                  <div className="flex items-center gap-3 text-primary">
                    <FileText className="h-5 w-5" />
                    <span className="font-serif italic text-[20px]">Resume</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        closeOverlay();
                        handleSectionChange('home');
                      }}
                      className="p-2 rounded-lg border border-outline-variant/20 text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all cursor-pointer flex items-center gap-2"
                      title="Go to Home"
                    >
                      <Home className="h-5 w-5" />
                      <span className="text-sm font-medium hidden sm:block">Home</span>
                    </button>
                    <button
                      onClick={closeOverlay}
                      className="p-2 rounded-lg border border-outline-variant/20 text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all cursor-pointer"
                      title="Close"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="flex-grow px-4 md:px-[64px] py-12">
                  <ResumeView />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Overlay: Contact ── */}
          <AnimatePresence>
            {overlay === 'contact' && (
              <motion.div
                key="contact-overlay"
                className="fixed inset-0 z-[300] flex flex-col bg-surface-container-lowest overflow-y-auto"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 28 }}
              >
                <div className="sticky top-0 z-10 bg-[#0a0d10]/90 backdrop-blur-xl border-b border-outline-variant/15 flex items-center justify-between px-6 md:px-12 py-4">
                  <div className="flex items-center gap-3 text-primary">
                    <Mail className="h-5 w-5" />
                    <span className="font-serif italic text-[20px]">Contact</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        closeOverlay();
                        handleSectionChange('home');
                      }}
                      className="p-2 rounded-lg border border-outline-variant/20 text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all cursor-pointer flex items-center gap-2"
                      title="Go to Home"
                    >
                      <Home className="h-5 w-5" />
                      <span className="text-sm font-medium hidden sm:block">Home</span>
                    </button>
                    <button
                      onClick={closeOverlay}
                      className="p-2 rounded-lg border border-outline-variant/20 text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all cursor-pointer"
                      title="Close"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="flex-grow px-4 md:px-[64px] py-12">
                  <ContactView />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile bottom nav spacer */}
          <div className="h-16 md:hidden" />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <SoundProvider>
      <AppContent />
    </SoundProvider>
  );
}
