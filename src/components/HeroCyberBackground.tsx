import { motion } from 'motion/react';

export default function HeroCyberBackground() {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-[0.25] md:opacity-40 select-none">
      <div className="relative w-[600px] h-[600px] md:w-[800px] md:h-[800px] flex items-center justify-center">
        
        {/* Core Glow */}
        <div className="absolute w-[300px] h-[300px] bg-primary/20 rounded-full blur-[80px]" />

        {/* Outer Ring - Slow Counter-Clockwise */}
        <motion.svg 
          viewBox="0 0 800 800" 
          className="absolute w-full h-full text-primary/40"
          animate={{ rotate: -360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="400" cy="400" r="380" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 12" />
          <circle cx="400" cy="400" r="360" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="100 40 20 40" />
          <path d="M 400 20 L 400 40 M 400 760 L 400 780 M 20 400 L 40 400 M 760 400 L 780 400" stroke="currentColor" strokeWidth="4" />
        </motion.svg>

        {/* Middle Ring - Faster Clockwise */}
        <motion.svg 
          viewBox="0 0 800 800" 
          className="absolute w-[80%] h-[80%] text-secondary/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="400" cy="400" r="300" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="400" cy="400" r="280" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="1 15" />
          {/* Hexagonal trim */}
          <polygon points="400,120 642,260 642,540 400,680 158,540 158,260" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        </motion.svg>

        {/* Inner Ring - Tech Elements */}
        <motion.svg 
          viewBox="0 0 800 800" 
          className="absolute w-[50%] h-[50%] text-primary/50"
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="400" cy="400" r="180" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="30 10 5 10" />
          <circle cx="400" cy="400" r="160" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          
          {/* Inner crosshairs */}
          <line x1="200" y1="400" x2="240" y2="400" stroke="currentColor" strokeWidth="2" />
          <line x1="560" y1="400" x2="600" y2="400" stroke="currentColor" strokeWidth="2" />
          <line x1="400" y1="200" x2="400" y2="240" stroke="currentColor" strokeWidth="2" />
          <line x1="400" y1="560" x2="400" y2="600" stroke="currentColor" strokeWidth="2" />
        </motion.svg>

        {/* Static Central Data */}
        <div className="absolute flex flex-col items-center text-primary/40 font-mono text-[9px] tracking-widest mt-40">
          <span>SYS_CORE_ACTIVE</span>
          <span className="opacity-60">{'{'} 0x7E, 0xC8, 0xC8 {'}'}</span>
        </div>

      </div>
    </div>
  );
}
