import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from 'motion/react';
import { Globe, Crosshair } from 'lucide-react';

export default function GlobalPulseMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [stageText, setStageText] = useState('');
  useMotionValueEvent(smoothProgress, "change", (v: number) => {
    if (v < 0.05) setStageText('AWAITING UPLINK');
    else if (v < 0.15) setStageText('SATELLITE SYNCED');
    else if (v < 0.3) setStageText('NODE NETWORK MAPPED');
    else if (v < 0.4) setStageText('OPERATIONS ACTIVE');
    else setStageText('GLOBAL COMMAND SECURED ✓');
  });

  const progressWidth = useTransform(smoothProgress, [0, 0.4], ['0%', '100%']);

  // Animations
  const node1Opacity = useTransform(smoothProgress, [0.05, 0.15], [0, 1]);
  const node2Opacity = useTransform(smoothProgress, [0.15, 0.25], [0, 1]);
  const node3Opacity = useTransform(smoothProgress, [0.25, 0.35], [0, 1]);
  const ringOpacity = useTransform(smoothProgress, [0, 0.1], [0, 1]);
  const ringScale = useTransform(smoothProgress, [0, 0.4], [0.8, 1.1]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      
      {/* Hidden SVG to define our neon glow filter so we can apply it to DOM nodes */}
      <svg width="0" height="0" className="absolute">
        <defs>
          
        </defs>
      </svg>

      <div className="sticky top-24 md:top-32 w-full flex flex-col items-center gap-3 py-6 opacity-60 md:opacity-90 select-none z-10">
        
        {/* Header bar */}
        <div className="w-full max-w-4xl flex items-center justify-between px-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/50">
            Global Operations
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-secondary/80 min-w-[140px] text-right">
            {stageText}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-4xl h-[2px] bg-outline-variant/10 rounded-full overflow-hidden mx-4">
          <motion.div
            className="h-full bg-secondary/70 rounded-full"
            style={{ width: progressWidth }}
          />
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50 z-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-[1200px] max-h-[1200px] flex items-center justify-center">
          
          {/* Massive rotating wireframe globe element */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 200, repeat: Infinity, ease: 'linear' }}
            style={{ opacity: ringOpacity, scale: ringScale }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] relative">
              <Globe strokeWidth={0.5} className="w-full h-full text-primary/10" />
              
              {/* Orbital rings */}
              <div className="absolute inset-[10%] rounded-full border border-primary/10 border-dashed" />
              <div className="absolute inset-[30%] rounded-full border border-primary/5" />
              <div className="absolute inset-[45%] rounded-full border border-primary/10 border-dotted" />
            </div>
          </motion.div>

          {/* Static pulse nodes simulating global operations */}
          <div className="absolute inset-0 flex items-center justify-center">
            
            <motion.div style={{ opacity: node1Opacity }} className="absolute top-[25%] left-[20%]">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" style={{ animationDuration: '3s' }}></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" ></span>
              </span>
              <div className="mt-2 font-mono text-[10px] text-primary/80 tracking-widest uppercase" >HQ_NODE</div>
            </motion.div>

            <motion.div style={{ opacity: node2Opacity }} className="absolute bottom-[35%] right-[25%]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-60" style={{ animationDuration: '4s' }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" ></span>
              </span>
              <div className="mt-2 font-mono text-[10px] text-secondary/80 tracking-widest uppercase">OP_SEC</div>
            </motion.div>
            
            <motion.div style={{ opacity: node3Opacity }} className="absolute top-[35%] right-[20%]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" style={{ animationDuration: '2.5s' }}></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary/80" ></span>
              </span>
              <div className="mt-2 font-mono text-[10px] text-primary/80 tracking-widest uppercase" >E_SUMMIT</div>
            </motion.div>

          </div>
        </div>
        
        {/* Central Crosshair Overlay for technical radar feel */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
          <Crosshair className="w-[80vw] h-[80vh] md:w-[100vw] md:h-[100vh] text-primary" strokeWidth={0.1} />
        </div>

        {/* Fade edges to blend smoothly into the dark background */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-surface-container-lowest z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-transparent to-surface-container-lowest z-10" />
      </div>
    </div>
  );
}
