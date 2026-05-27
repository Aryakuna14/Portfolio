import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
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
import DynamicBackground from './components/DynamicBackground';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');

  // Automatically reset window scroll coordinate to top upon active section updates
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeSection]);

  const renderActiveView = () => {
    switch (activeSection) {
      case 'home':
        return <Hero onSectionSelect={(sec) => setActiveSection(sec)} />;
      case 'education':
        return <EducationView />;
      case 'experience':
        return <ExperienceView />;
      case 'resume':
        return <ResumeView />;
      case 'projects':
        return <ProjectsView />;
      case 'skills':
        return <SkillsView />;
      case 'interests':
        return <InterestsView />;
      case 'contact':
        return <ContactView />;
      default:
        return <Hero onSectionSelect={(sec) => setActiveSection(sec)} />;
    }
  };

  return (
    <div className="text-on-surface antialiased min-h-screen flex flex-col relative overflow-x-hidden bg-surface-container-lowest pb-16 md:pb-0">
      
      {/* Nice animated dynamic background for all views */}
      <DynamicBackground />
      
      {/* Background Ambience decoration gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none z-0" />

      {/* Primary header overlay panel */}
      <Header activeSection={activeSection} onSectionChange={(sec) => setActiveSection(sec)} />

      {/* Main Container Stage */}
      <main className="flex-grow flex flex-col items-center w-full px-4 md:px-[64px] pt-[80px] md:pt-[130px]">
        
        {/* Floating Return Home Breadcrumb for Inner-screens */}
        {activeSection !== 'home' && (
          <div className="w-full max-w-5xl self-center mb-6 z-20 text-left">
            <button
              onClick={() => setActiveSection('home')}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#f8fafc] font-semibold bg-black/45 hover:bg-black/60 border border-white/15 px-4 py-2.5 rounded-xl backdrop-blur-md transition-all duration-200 cursor-pointer group shadow-lg hover:scale-[1.03] active:scale-[0.97]"
            >
              <ArrowLeft className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:-translate-x-1 text-[#f8fafc]" />
              <span>Back to home</span>
            </button>
          </div>
        )}

        {/* Animation view wrapper with Framer Motion triggers */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full z-10"
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>

      </main>

      {/* Layout footer panel */}
      <Footer onSectionChange={(sec) => setActiveSection(sec)} />
    </div>
  );
}
