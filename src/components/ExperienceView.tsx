import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Briefcase, Zap, Flame, Target, TrendingUp, Info } from 'lucide-react';
import { experiences } from '../data';
import ExperienceSkylineBackground from './ExperienceSkylineBackground';
import { Reveal } from './Reveal';

export default function ExperienceView() {
  const [activeTab, setActiveTab] = useState<string>('under-25-dsce');
  const detailRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    // Smooth-scroll the detail panel into view with some top offset
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  // Interactive visual simulations representing current tasks
  const renderVisualMetric = (id: string) => {
    switch (id) {
      case 'under-25-dsce':
        return (
          <div className="bg-surface-container/50 border border-outline-variant/20 rounded-xl p-5 mt-4 text-left">
            <span className="font-mono text-[10px] text-primary uppercase tracking-widest block mb-1">Marketing Analytics (Live Sandbox)</span>
            <span className="font-serif text-[16px] text-on-surface font-semibold block mb-3">Under 25 Campaign Outreach Planner</span>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-surface-container/80 rounded-lg p-3 border border-outline-variant/10">
                <span className="font-mono text-[9px] text-on-surface-variant block uppercase">Summit Guest Registry</span>
                <span className="font-mono text-sm text-primary font-bold">1200+ Confirmed</span>
                <div className="w-full bg-outline-variant/10 h-1 rounded mt-1.5 overflow-hidden">
                  <div className="bg-primary h-full w-[85%]" />
                </div>
              </div>
              <div className="bg-surface-container/80 rounded-lg p-3 border border-outline-variant/10">
                <span className="font-mono text-[9px] text-on-surface-variant block uppercase">Engagement Ratio</span>
                <span className="font-mono text-sm text-secondary font-bold">18.4% / peak</span>
                <div className="w-full bg-outline-variant/10 h-1 rounded mt-1.5 overflow-hidden">
                  <div className="bg-secondary h-full w-[90%]" />
                </div>
              </div>
            </div>

            <div className="bg-surface-lowest/80 p-3 rounded-lg border border-outline-variant/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-ping shrink-0" />
                <span className="font-mono text-on-surface text-[11px]">System: Celebrity Logistics Active</span>
              </div>
              <span className="font-mono text-primary text-[10px]">DSCE Lead Hub</span>
            </div>
          </div>
        );
      case 'nunam-technologies':
        return (
          <div className="bg-surface-container/50 border border-outline-variant/20 rounded-xl p-5 mt-4 text-left">
            <span className="font-mono text-[10px] text-primary uppercase tracking-widest block mb-1">R&D Lab Bench (Live Sandbox)</span>
            <span className="font-serif text-[16px] text-on-surface font-semibold block mb-3">Lithium second-life cell balancer</span>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-surface-container/80 rounded-lg p-3 border border-outline-variant/10">
                <span className="font-mono text-[9px] text-on-surface-variant block uppercase">Array temperature</span>
                <span className="font-mono text-sm text-primary font-bold">29.4 °C</span>
                <div className="w-full bg-outline-variant/10 h-1 rounded mt-1.5 overflow-hidden">
                  <div className="bg-primary h-full w-[45%]" />
                </div>
              </div>
              <div className="bg-surface-container/80 rounded-lg p-3 border border-outline-variant/10">
                <span className="font-mono text-[9px] text-on-surface-variant block uppercase">Repurposed SOH</span>
                <span className="font-mono text-sm text-secondary font-bold">84.2 %</span>
                <div className="w-full bg-outline-variant/10 h-1 rounded mt-1.5 overflow-hidden">
                  <div className="bg-secondary h-full w-[84%]" />
                </div>
              </div>
            </div>

            <div className="bg-surface-lowest/80 rounded-lg p-3 border border-outline-variant/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-ping shrink-0" />
                <span className="font-mono text-on-surface text-[11px]">BMS: Safe testing metrics active</span>
              </div>
              <span className="font-mono text-primary text-[10px]">C-Rating: 0.8C</span>
            </div>
          </div>
        );
      case 'desi-power':
        return (
          <div className="bg-surface-container/50 border border-outline-variant/20 rounded-xl p-5 mt-4 text-left">
            <span className="font-mono text-[10px] text-primary uppercase tracking-widest block mb-1">Microgrid Field Logs</span>
            <span className="font-serif text-[16px] text-on-surface font-semibold block mb-3">Decentralized Power Load Analyzer</span>
            
            <div className="space-y-2 mb-4">
              <div>
                <div className="flex justify-between text-[11px] font-mono mb-1">
                  <span className="text-on-surface-variant">Solar PV Yield (Decentralized Array)</span>
                  <span className="text-primary">4.2 kW / Peak</span>
                </div>
                <div className="w-full bg-outline-variant/10 h-1.5 rounded overflow-hidden">
                  <div className="bg-primary h-full w-[70%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] font-mono mb-1">
                  <span className="text-on-surface-variant">Biomass Gasifier Output</span>
                  <span className="text-secondary">2.8 kW / Stable</span>
                </div>
                <div className="w-full bg-outline-variant/10 h-1.5 rounded overflow-hidden">
                  <div className="bg-secondary h-full w-[45%]" />
                </div>
              </div>
            </div>

            <div className="bg-surface-lowest/80 p-2 rounded border border-outline-variant/20 text-[11px] text-on-surface-variant leading-normal flex gap-1.5 items-start">
              <Info className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
              <span>Studied 20+ hours of microgrid electrical load profiles to balance rural rural-household demands.</span>
            </div>
          </div>
        );
      case 'lowwkey-streetwear':
        return (
          <div className="bg-surface-container/50 border border-outline-variant/20 rounded-xl p-5 mt-4 text-left">
            <span className="font-mono text-[10px] text-primary uppercase tracking-widest block mb-1">Ad Campaigns (Meta Dashboard)</span>
            <span className="font-serif text-[16px] text-on-surface font-semibold block mb-3">Streetwear Brand Ads Optimization</span>
            
            <div className="grid grid-cols-3 gap-2 text-center mb-4">
              <div className="bg-surface-lowest/80 p-2.5 rounded-lg border border-outline-variant/20">
                <span className="font-mono text-[9px] text-on-surface-variant uppercase block">Efficient CPM</span>
                <span className="font-serif text-sm md:text-md text-primary font-bold">₹50</span>
              </div>
              <div className="bg-surface-lowest/80 p-2.5 rounded-lg border border-outline-variant/20">
                <span className="font-mono text-[9px] text-on-surface-variant uppercase block">Target CTR</span>
                <span className="font-serif text-sm md:text-md text-secondary font-bold">4.8%</span>
              </div>
              <div className="bg-surface-lowest/80 p-2.5 rounded-lg border border-outline-variant/20">
                <span className="font-mono text-[9px] text-on-surface-variant uppercase block">ROAS Range</span>
                <span className="font-serif text-sm md:text-md text-on-surface font-bold">4.2x</span>
              </div>
            </div>

            <div className="flex gap-2 items-center text-xs bg-surface-lowest/80 p-2.5 rounded border border-outline-variant/20">
              <TrendingUp className="h-4 w-4 text-green-400 shrink-0" />
              <span className="font-sans text-on-surface-variant leading-tight">Optimized clothing drops with precise target profiling filters.</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const currentExp = experiences.find(e => e.id === activeTab) || experiences[0];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-0 relative z-0">
      
      {/* Scroll-Triggered NY Skyline Background Animation */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none md:opacity-40 -mt-10">
        <ExperienceSkylineBackground />
      </div>

      <Reveal className="text-center mb-12 relative z-10">
        <p className="font-sans text-[15px] md:text-[16px] text-on-surface-variant/70 max-w-2xl mx-auto">
          Investigating electric power structures, prototyping with real cells, and operating consumer apparel projects.
        </p>
        <h1 className="mt-4">
          <span className="section-number text-[32px] md:text-[42px]">02.</span>{' '}
          <span className="font-serif text-[32px] md:text-[42px] text-on-surface font-semibold tracking-tight">Experience</span>
        </h1>
        <div className="section-divider mt-4" />
      </Reveal>

      <div className="flex flex-col md:flex-row gap-8 items-stretch relative z-10">
        
        {/* Left Side Tab Selectors */}
        <Reveal
          className="md:w-1/3 grid grid-cols-2 md:grid-cols-1 gap-2.5 shrink-0 select-none pb-2 md:pb-0 border-b md:border-b-0 md:border-r border-outline-variant/20 pr-0 md:pr-6"
          delay={0.1}
        >
          {experiences.map((exp) => {
            const isActive = activeTab === exp.id;
            return (
              <button
                key={exp.id}
                onClick={() => handleTabClick(exp.id)}
                className={`w-full text-left p-3 md:p-4 rounded-xl border transition-all duration-300 text-sm flex flex-col gap-1 cursor-pointer ${
                  isActive
                    ? 'bg-primary-container/80 border-primary/30 shadow-md text-on-surface font-semibold'
                    : 'bg-surface-container/40 border-outline-variant/15 text-on-surface-variant hover:text-on-surface hover:border-outline-variant/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Briefcase className={`h-4 w-4 shrink-0 ${isActive ? 'text-primary' : 'text-on-surface-variant'}`} />
                  <span className="font-serif text-[13px] md:text-[15px] font-semibold tracking-tight leading-tight">{exp.company}</span>
                </div>
                <span className="font-mono text-[10px] block opacity-80 mt-0.5 md:ml-6 line-clamp-1">{exp.role}</span>
              </button>
            );
          })}
        </Reveal>

        {/* Right Side Experience Detail Display Panel */}
        <Reveal className="md:w-2/3 flex flex-col" delay={0.25}>
          <div ref={detailRef} className="flex flex-col scroll-mt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentExp.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-2xl p-5 md:p-7 lg:p-9 flex flex-col gap-6 text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full blur-2xl" />

              <div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <h2 className="font-serif text-[24px] md:text-[28px] text-primary font-bold tracking-tight">
                    {currentExp.role}
                  </h2>
                  <span className="font-mono text-xs text-secondary bg-surface-container/50 border border-outline-variant/20 px-3 py-1 rounded inline-self-start md:self-center">
                    {currentExp.period}
                  </span>
                </div>
                <p className="font-sans text-[15px] text-on-surface-variant font-medium mt-1">
                  {currentExp.company} — <span className="text-on-surface-variant/60">{currentExp.location}</span>
                </p>
              </div>

              {/* Accomplishment list */}
              <div className="border-t border-outline-variant/25 pt-6">
                <h3 className="font-serif text-[16px] text-on-surface font-semibold mb-3 flex items-center gap-1.5">
                  <Target className="h-4.5 w-4.5 text-primary" /> Key Responsibilities & Work Scope
                </h3>
                <ul className="space-y-3">
                  {currentExp.bullets.map((bullet, idx) => (
                    <li key={idx} className="font-sans text-[14px] text-on-surface-variant leading-relaxed flex items-start gap-2.5">
                      <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags / skills used */}
              <div className="border-t border-outline-variant/25 pt-4 flex flex-col gap-2">
                <span className="font-mono text-[10px] text-on-surface-variant/60 uppercase block">Expertise Deployed</span>
                <div className="flex flex-wrap gap-1.5">
                  {currentExp.skillsUsed.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono border border-outline-variant/20 rounded-md px-2.5 py-1 bg-surface-container/30 text-on-surface-variant/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Live Sandbox Interactive Metric */}
              <div className="border-t border-outline-variant/25 pt-4 mt-2">
                {renderVisualMetric(currentExp.id)}
              </div>

            </motion.div>
          </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
