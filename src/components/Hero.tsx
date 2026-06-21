import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Mail, Phone, MapPin, Linkedin, Github, Instagram } from 'lucide-react';
import { roleTitles } from '../data';
import Hero3DScene from './Hero3DScene';
export default function Hero() {
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
        timer = setTimeout(() => setIsTyping(false), 2200);
      }
    } else {
      if (displayedRole.length > 0) {
        timer = setTimeout(() => {
          setDisplayedRole(displayedRole.slice(0, -1));
        }, 50);
      } else {
        setRoleIndex((prev) => (prev + 1) % roleTitles.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedRole, isTyping, roleIndex]);


  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero header — full viewport height */}
      <section className="min-h-screen w-full flex flex-col justify-center items-center text-center relative px-4 pt-[90px] md:pt-[100px]">
        {/* 3D particle background */}
        <Hero3DScene />

        <motion.h1
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="font-serif text-[42px] sm:text-[60px] md:text-[120px] tracking-tight leading-[0.9] font-normal mb-6 relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-white via-[#d4e4e4] to-[#7ec8c8]/60 drop-shadow-[0_4px_30px_rgba(126,200,200,0.1)] select-none"
        >
          ARYA<br />SHARAN
        </motion.h1>

        {/* Role typewriter badge */}
        <div className="min-h-12 flex items-center justify-center mb-8 relative z-10 px-4 max-w-full overflow-hidden">
          <span className="border border-primary/20 px-5 py-2.5 rounded-lg bg-[#0a0d10]/60 backdrop-blur-md inline-flex items-center gap-1 text-center leading-snug font-mono text-[11px] md:text-[13px] text-primary/80 tracking-[0.2em] uppercase">
            <span className="typing-effect text-on-surface font-medium">{displayedRole}</span>
          </span>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="font-sans text-[15px] md:text-[17px] text-on-surface-variant/80 max-w-xl mx-auto leading-[1.8] relative z-10 text-center font-normal"
        >
          5th-Semester Electrical and Electronics Engineering (EEE) student passionate about
          Semiconductors, Data Structures, Embedded Systems, VLSI and AI/ML.
        </motion.p>

        {/* Scroll hint arrow */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-on-surface-variant/30 select-none"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-6 w-6" />
          </motion.div>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em]">Scroll</span>
        </motion.div>
      </section>

      {/* Section separator */}
      <div className="section-sep w-full" />

      {/* Minimalist Contact Slogan & Links */}
      <section className="w-full max-w-4xl mx-auto py-16 md:py-24 px-4 relative z-10 flex flex-col items-center">
        <h2 className="font-serif text-[26px] sm:text-[34px] md:text-[50px] text-on-surface font-semibold tracking-tight text-center mb-12">
          Let's Build or <span className="italic text-primary">Let's Party.</span>
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-5 w-full">
          {/* Email */}
          <a href="mailto:aryasharan47@gmail.com" className="glass-card glow-hover px-5 py-4 rounded-[20px] flex items-center gap-4 group transition-all duration-300 w-full sm:w-[calc(50%-10px)] cursor-pointer">
             <div className="p-3 bg-primary/5 border border-primary/10 text-primary rounded-[14px] group-hover:bg-primary group-hover:text-black transition-colors duration-300">
               <Mail className="w-5 h-5" />
             </div>
             <div className="flex flex-col">
               <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-on-surface-variant/50 mb-0.5">Electronic Mail</span>
               <span className="font-sans text-[14px] md:text-[15px] text-on-surface-variant group-hover:text-primary transition-colors font-medium">aryasharan47@gmail.com</span>
             </div>
          </a>
          
          {/* Phone */}
          <a href="tel:+919110648489" className="glass-card glow-hover px-5 py-4 rounded-[20px] flex items-center gap-4 group transition-all duration-300 w-full sm:w-[calc(50%-10px)] cursor-pointer">
             <div className="p-3 bg-primary/5 border border-primary/10 text-primary rounded-[14px] group-hover:bg-primary group-hover:text-black transition-colors duration-300">
               <Phone className="w-5 h-5" />
             </div>
             <div className="flex flex-col">
               <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-on-surface-variant/50 mb-0.5">Mobile Number</span>
               <span className="font-sans text-[14px] md:text-[15px] text-on-surface-variant group-hover:text-primary transition-colors font-medium">+91 91106 48489</span>
             </div>
          </a>

          {/* Location */}
          <div className="glass-card px-5 py-4 rounded-[20px] flex items-center gap-4 w-full sm:w-[calc(50%-10px)]">
             <div className="p-3 bg-primary/5 border border-primary/10 text-primary rounded-[14px]">
               <MapPin className="w-5 h-5" />
             </div>
             <div className="flex flex-col">
               <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-on-surface-variant/50 mb-0.5">Physical Location</span>
               <span className="font-sans text-[14px] md:text-[15px] text-on-surface-variant font-medium">DSCE campus, Bangalore</span>
             </div>
          </div>

          {/* Socials Block */}
          <div className="glass-card px-5 py-4 rounded-[20px] flex items-center gap-4 w-full sm:w-[calc(50%-10px)] justify-center">
             <a href="https://www.linkedin.com/in/arya-sharan-516319200/" target="_blank" rel="noopener noreferrer" className="p-3 bg-[#111417] hover:bg-primary/15 text-on-surface-variant hover:text-primary rounded-[14px] border border-outline-variant/20 transition-colors duration-300 cursor-pointer" title="LinkedIn">
                <Linkedin className="w-5 h-5" />
             </a>
             <a href="https://github.com/Aryakuna14" target="_blank" rel="noopener noreferrer" className="p-3 bg-[#111417] hover:bg-primary/15 text-on-surface-variant hover:text-primary rounded-[14px] border border-outline-variant/20 transition-colors duration-300 cursor-pointer" title="GitHub">
                <Github className="w-5 h-5" />
             </a>
             <a href="https://www.instagram.com/aryakuna/" target="_blank" rel="noopener noreferrer" className="p-3 bg-[#111417] hover:bg-primary/15 text-on-surface-variant hover:text-primary rounded-[14px] border border-outline-variant/20 transition-colors duration-300 cursor-pointer" title="Instagram">
                <Instagram className="w-5 h-5" />
             </a>
          </div>

        </div>
      </section>
    </div>
  );
}
