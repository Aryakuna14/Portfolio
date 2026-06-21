import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, ExternalLink } from 'lucide-react';
import { projects } from '../data';
import GlobalPulseMap from './GlobalPulseMap';
import { Reveal, RevealGroup } from './Reveal';

export default function ActivitiesView() {
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>('no-parking-ops');
  const detailRef = useRef<HTMLDivElement>(null);

  const scrollToDetail = () => {
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  // Filtering activities list
  const filteredActivities = projects.filter((p) => p.category === 'non-technical');
  const currentActivity = projects.find((p) => p.id === selectedActivityId) || (filteredActivities.length > 0 ? filteredActivities[0] : projects[0]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-0 relative z-0">
      
      {/* Global Map Background for Activities */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none md:opacity-40">
        <GlobalPulseMap />
      </div>

      {/* Section Header */}
      <Reveal className="text-center mb-12 relative z-10">
        <p className="font-sans text-[15px] md:text-[17px] text-on-surface-variant max-w-xl mx-auto mb-5 leading-relaxed">
          Leadership, event operations, and community engagement initiatives shaping my organizational experience beyond code.
        </p>
        <div className="flex items-center justify-center gap-3">
          <span className="section-number text-[32px] md:text-[42px]">04.</span>
          <span className="font-serif text-[32px] md:text-[42px] text-on-surface font-semibold tracking-tight">Activities</span>
        </div>
        <div className="section-divider mt-4" />
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Left column - filtered list of activity selection cards (5 cols) */}
        <RevealGroup className="lg:col-span-5 flex flex-col gap-4" stagger={0.1} delay={0.05}>
          {filteredActivities.map((act) => {
            const isSelected = selectedActivityId === act.id;
            return (
              <button
                key={act.id}
                onClick={() => { setSelectedActivityId(act.id); scrollToDetail(); }}
                className={`text-left p-6 rounded-xl glass-card transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col gap-3 group border-l-2 ${
                  isSelected
                    ? 'border-l-primary bg-primary/5'
                    : 'border-l-transparent'
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <span className="font-serif text-[18px] md:text-[20px] font-bold text-on-surface group-hover:text-primary transition-colors leading-tight">
                    {act.title}
                  </span>
                  
                  <Compass className="h-5.5 w-5.5 text-secondary shrink-0 opacity-80" />
                </div>

                <p className="font-sans text-[13px] text-on-surface-variant leading-relaxed">
                  {act.description}
                </p>

                <div className="flex flex-wrap gap-1 mt-1">
                  {act.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-mono border border-outline-variant/15 rounded-md px-2 py-0.5 text-on-surface-variant/60 group-hover:text-on-surface-variant group-hover:border-outline-variant/30 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </RevealGroup>

        {/* Right column - active activity descriptive card (7 cols) */}
        <Reveal className="lg:col-span-7 flex flex-col gap-6 scroll-mt-20" delay={0.15}>
          <div ref={detailRef} className="flex flex-col gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentActivity.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-2xl p-5 md:p-7 lg:p-9 flex flex-col gap-6 text-left relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full blur-2xl" />

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-medium">
                    Activity Overview
                  </span>
                  <h2 className="font-serif text-[22px] sm:text-[28px] md:text-[34px] font-bold text-on-surface tracking-tight mt-1 leading-tight">
                    {currentActivity.title}
                  </h2>
                  <div className="flex gap-2 flex-wrap items-center mt-3">
                    {currentActivity.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono border border-primary/20 rounded-md px-2.5 py-1 bg-primary/5 text-primary/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-outline-variant/15 pt-6">
                  <h3 className="font-serif text-sm uppercase tracking-widest text-on-surface-variant/70 mb-1.5 font-semibold">
                    Core Objective
                  </h3>
                  <p className="font-sans text-[15px] text-on-surface-variant leading-relaxed mb-4">
                    {currentActivity.longDescription}
                  </p>
                  {currentActivity.link && (
                    <div className="pt-2">
                      <a
                        href={currentActivity.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-[11px] uppercase tracking-wider font-semibold bg-primary hover:bg-primary/90 text-[#0a0d10] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer shadow-md"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>View Details</span>
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

      </div>
    </div>
  );
}
