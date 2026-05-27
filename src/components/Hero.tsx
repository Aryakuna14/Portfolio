import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Briefcase, Terminal, Zap, PartyPopper } from 'lucide-react';
import { roleTitles } from '../data';

interface HeroProps {
  onSectionSelect: (sectionId: string) => void;
}

export default function Hero({ onSectionSelect }: HeroProps) {
  const [displayedRole, setDisplayedRole] = useState('Embedded Systems');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  // Typewriting role animation cycle
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = roleTitles[roleIndex];

    if (isTyping) {
      if (displayedRole.length < fullText.length) {
        timer = setTimeout(() => {
          setDisplayedRole(fullText.slice(0, displayedRole.length + 1));
        }, 110);
      } else {
        timer = setTimeout(() => setIsTyping(false), 2200); // Wait on full role name
      }
    } else {
      if (displayedRole.length > 0) {
        timer = setTimeout(() => {
          setDisplayedRole(displayedRole.slice(0, -1));
        }, 50);
      } else {
        setRoleIndex((prevIndex) => (prevIndex + 1) % roleTitles.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedRole, isTyping, roleIndex]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Header Presentation */}
      <section className="min-h-[500px] md:min-h-[620px] w-full flex flex-col justify-center items-center text-center relative mb-12 select-none px-4">
        {/* Glowing backdrop meshes */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-primary/5 rounded-full blur-[90px] md:blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-secondary/5 rounded-full blur-[90px] md:blur-[120px] pointer-events-none" />

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="font-serif text-[54px] md:text-[110px] tracking-normal leading-none mb-6 relative z-10 font-normal bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 filter drop-shadow-[0_4px_20px_rgba(255,255,255,0.08)]"
        >
          ARYA<br/>SHARAN
        </motion.h1>

        <div className="min-h-12 flex items-center justify-center mb-8 relative z-10 px-4">
          <span className="font-mono text-[10px] md:text-sm text-[#cbd5e1]/90 tracking-widest uppercase border border-white/15 px-4 md:px-5 py-2.5 rounded-full bg-black/40 backdrop-blur-md inline-flex items-center gap-1 shadow-lg text-center leading-snug">
            <span className="typing-effect text-[#f8fafc] font-semibold">{displayedRole}</span>
          </span>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="font-sans text-[15px] md:text-[18px] text-[#cbd5e1] max-w-2xl mx-auto leading-relaxed relative z-10 text-center font-medium drop-shadow-sm"
        >
          5th-Semester Electrical and Electronics Engineering (EEE) student passionate about Semiconductors, Data Structures, Embedded Systems, VLSI and AI/ML.
        </motion.p>

        {/* Labeled Scroll Down Indicator */}
        <div className="mt-12 flex flex-col items-center gap-2.5 relative z-10">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#cbd5e1]/50">Explore Portfolio</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-white/15 flex justify-center p-1 cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => {
              document.getElementById('bento-deck')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="w-1.2 h-1.2 bg-primary rounded-full" />
          </motion.div>
          <div className="w-[1px] h-10 bg-gradient-to-b from-primary/30 to-transparent" />
        </div>
      </section>

      {/* Bento Landing Navigation Deck */}
      <section id="bento-deck" className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 px-4 md:px-0">
        
        {/* Education Bento (Col Span 8) */}
        <button
          onClick={() => onSectionSelect('education')}
          className="md:col-span-8 glass-card rounded-xl p-6 md:p-8 flex flex-col justify-between group h-56 md:h-72 relative overflow-hidden transition-all duration-500 hover:scale-[1.01] text-left cursor-pointer border border-white/5"
        >
          <div className="absolute top-0 right-0 w-44 h-44 bg-primary/5 rounded-bl-full blur-2xl group-hover:bg-primary/10 transition-all duration-500" />
          <div className="flex justify-between items-start z-10">
            <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/25 transition-all duration-300">
              <GraduationCap className="text-primary h-8 w-8 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <span className="font-mono text-outline-variant/70 text-xs font-semibold tracking-wider">01</span>
          </div>
          <div className="z-10 mt-auto">
            <h2 className="font-serif text-[28px] md:text-[36px] text-on-surface font-semibold mb-1 group-hover:text-primary transition-colors">
              Education
            </h2>
            <p className="font-sans text-[14px] md:text-[16px] text-on-surface-variant group-hover:text-on-surface transition-colors duration-300">
              Academic journey, key coursework foundations, and EEE engineering specialization.
            </p>
          </div>
          {/* Bottom highlight streak */}
          <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500 ease-out" />
        </button>

        {/* Experience Bento (Col Span 4) */}
        <button
          onClick={() => onSectionSelect('experience')}
          className="md:col-span-4 glass-card rounded-xl p-6 md:p-8 flex flex-col justify-between group h-56 md:h-72 relative overflow-hidden transition-all duration-500 hover:scale-[1.01] text-left cursor-pointer border border-white/5"
        >
          <div className="absolute top-0 right-0 w-36 h-36 bg-secondary/5 rounded-bl-full blur-2xl group-hover:bg-secondary/15 transition-all duration-500" />
          <div className="flex justify-between items-start z-10">
            <div className="p-3 bg-secondary/10 rounded-xl group-hover:bg-secondary/25 transition-all duration-300">
              <Briefcase className="text-secondary h-8 w-8 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <span className="font-mono text-outline-variant/70 text-xs font-semibold tracking-wider">02</span>
          </div>
          <div className="z-10 mt-auto">
            <h2 className="font-serif text-[26px] md:text-[30px] text-on-surface font-semibold mb-1 group-hover:text-secondary transition-colors">
              Experience
            </h2>
            <p className="font-sans text-[14px] md:text-[15px] text-on-surface-variant group-hover:text-on-surface transition-colors duration-300">
              Professional roles, Electric Vehicle association labs, solar energy, and climate-tech operations.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-secondary to-tertiary group-hover:w-full transition-all duration-500 ease-out" />
        </button>

        {/* Projects Bento (Col Span 4) */}
        <button
          onClick={() => onSectionSelect('projects')}
          className="md:col-span-4 glass-card rounded-xl p-6 md:p-8 flex flex-col justify-between group h-56 md:h-72 relative overflow-hidden transition-all duration-500 hover:scale-[1.01] text-left cursor-pointer border border-white/5"
        >
          <div className="absolute top-0 right-0 w-36 h-36 bg-tertiary/5 rounded-bl-full blur-2xl group-hover:bg-tertiary/15 transition-all duration-500" />
          <div className="flex justify-between items-start z-10">
            <div className="p-3 bg-tertiary/10 rounded-xl group-hover:bg-tertiary/25 transition-all duration-300">
              <Terminal className="text-tertiary h-8 w-8 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <span className="font-mono text-outline-variant/70 text-xs font-semibold tracking-wider">03</span>
          </div>
          <div className="z-10 mt-auto">
            <h2 className="font-serif text-[26px] md:text-[30px] text-on-surface font-semibold mb-1 group-hover:text-tertiary transition-colors">
              Projects
            </h2>
            <p className="font-sans text-[14px] md:text-[15px] text-on-surface-variant group-hover:text-on-surface transition-colors duration-300">
              Hardware prototypes, firmware assistants, solar radios, and public operations.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-tertiary to-primary group-hover:w-full transition-all duration-500 ease-out" />
        </button>

        {/* Skills Bento (Col Span 4) */}
        <button
          onClick={() => onSectionSelect('skills')}
          className="md:col-span-4 glass-card rounded-xl p-6 md:p-8 flex flex-col justify-between group h-56 md:h-72 relative overflow-hidden transition-all duration-500 hover:scale-[1.01] text-left cursor-pointer border border-white/5"
        >
          <div className="absolute top-0 right-0 w-36 h-36 bg-primary/5 rounded-bl-full blur-2xl group-hover:bg-primary/10 transition-all duration-500" />
          <div className="flex justify-between items-start z-10">
            <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/25 transition-all duration-300">
              <Zap className="text-primary h-8 w-8 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <span className="font-mono text-outline-variant/70 text-xs font-semibold tracking-wider">04</span>
          </div>
          <div className="z-10 mt-auto">
            <h2 className="font-serif text-[26px] md:text-[30px] text-on-surface font-semibold mb-1 group-hover:text-primary transition-colors">
              Skills
            </h2>
            <p className="font-sans text-[14px] md:text-[15px] text-on-surface-variant group-hover:text-on-surface transition-colors duration-300">
              Technical proficiencies in semiconductors, embedded devices, algorithms, and microelectronics.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500 ease-out" />
        </button>

        {/* Interests Bento (Col Span 4) */}
        <button
          onClick={() => onSectionSelect('interests')}
          className="md:col-span-4 glass-card rounded-xl p-6 md:p-8 flex flex-col justify-between group h-56 md:h-72 relative overflow-hidden transition-all duration-500 hover:scale-[1.01] text-left cursor-pointer border border-white/5"
        >
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#cfd6df]/5 rounded-bl-full blur-2xl group-hover:bg-[#cfd6df]/15 transition-all duration-500" />
          <div className="flex justify-between items-start z-10">
            <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/25 transition-all duration-300">
              <PartyPopper className="text-primary h-8 w-8 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <span className="font-mono text-outline-variant/70 text-xs font-semibold tracking-wider">05</span>
          </div>
          <div className="z-10 mt-auto">
            <h2 className="font-serif text-[26px] md:text-[30px] text-on-surface font-semibold mb-1 group-hover:text-primary transition-colors">
              Interests
            </h2>
            <p className="font-sans text-[14px] md:text-[15px] text-on-surface-variant group-hover:text-on-surface transition-colors duration-300">
              Hands-on VLSI pursuits, emceeing, community leadership, active fitness, and party subcultures.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-secondary to-tertiary group-hover:w-full transition-all duration-500 ease-out" />
        </button>

      </section>
    </div>
  );
}

