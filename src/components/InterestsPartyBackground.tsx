import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from 'motion/react';

export default function InterestsPartyBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  const [stageText, setStageText] = useState('');

  useMotionValueEvent(smoothProgress, "change", (v: number) => {
    if (v < 0.1) setStageText('ROUTINE INITIALIZED');
    else if (v < 0.25) setStageText('DOPAMINE SURGE');
    else if (v < 0.4) {
      setStageText('FREQUENCY ALIGNED');
    }
    else {
      setStageText('CELEBRATION PROTOCOL ✓');
    }
  });

  // ── Colors ──
  const primary = '#7ec8c8'; // Theme teal
  const accent = '#c9a96e';  // Theme gold
  const dimLabel = 'rgba(126, 200, 200, 0.35)';
  const grid = 'rgba(201, 169, 110, 0.03)'; // Gold grid

  // ── Animations ──
  const drawOutline = useTransform(smoothProgress, [0, 0.2], [0, 1]);
  const fillLiquid = useTransform(smoothProgress, [0.1, 0.3], [0, 1]);
  
  // Clinking motion
  const glassLeftRotate = useTransform(smoothProgress, [0.15, 0.3], [-10, 15]);
  const glassRightRotate = useTransform(smoothProgress, [0.15, 0.3], [10, -15]);
  
  const glassLeftX = useTransform(smoothProgress, [0.15, 0.3], [-40, 0]);
  const glassRightX = useTransform(smoothProgress, [0.15, 0.3], [40, 0]);

  // Bubbles rising
  const bubbleY1 = useTransform(smoothProgress, [0.2, 0.5], [0, -150]);
  const bubbleY2 = useTransform(smoothProgress, [0.25, 0.5], [0, -120]);
  const bubbleY3 = useTransform(smoothProgress, [0.3, 0.5], [0, -180]);
  const bubbleOpacity = useTransform(smoothProgress, [0.25, 0.4], [0, 1]);

  return (
    <div ref={containerRef} className="w-full h-full relative pointer-events-none">
      <div className="sticky top-24 md:top-32 w-full flex flex-col items-center gap-3 py-6 opacity-60 md:opacity-90 select-none">
        
        {/* Header bar */}
        <div className="w-full max-w-4xl flex items-center justify-between px-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-amber-500/50">
            Social & Personal
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-amber-500/80 min-w-[140px] text-right">
            {stageText}
          </span>
        </div>

        {/* SVG Container */}
        <div className="w-full max-w-5xl relative mt-4">
          <svg viewBox="0 0 800 400" className="w-full h-auto">
            <defs>
              
              <pattern id="partyGrid" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke={grid} strokeWidth="1" />
              </pattern>
            </defs>

            {/* Background Grid */}
            <rect width="800" height="400" fill="url(#partyGrid)" />

            {/* ═══ CHAMPAGNE BOTTLE (Background) ═══ */}
            <motion.g transform="translate(400, 160)" style={{ opacity: 0.3 }}>
              {/* Bottle body */}
              <motion.path 
                d="M -40,140 L -40,20 Q -40,-20 -15,-40 L -15,-100 L 15,-100 L 15,-40 Q 40,-20 40,20 L 40,140 Z" 
                fill="none" 
                stroke={dimLabel} 
                strokeWidth="2" 
                style={{ pathLength: drawOutline }} 
              />
              {/* Bottle neck details */}
              <motion.path 
                d="M -18,-90 L 18,-90 M -15,-70 L 15,-70 M -30,0 L 30,0" 
                fill="none" 
                stroke={accent} 
                strokeWidth="1.5" 
                strokeDasharray="4 4"
                style={{ pathLength: drawOutline }} 
              />
              {/* Label */}
              <motion.rect 
                x="-25" y="40" width="50" height="60" rx="4"
                fill="none" stroke={accent} strokeWidth="1"
                style={{ pathLength: drawOutline }}
              />
              <text x="0" y="75" textAnchor="middle" fill={accent} fontSize="8" fontFamily="serif" opacity="0.6">BRUT</text>
            </motion.g>

            {/* ═══ CLINKING GLASSES ═══ */}
            
            {/* Left Glass */}
            <motion.g style={{ x: glassLeftX, rotate: glassLeftRotate, transformOrigin: '320px 240px' }}>
              {/* Glass Outline */}
              <motion.path 
                d="M 320,240 Q 290,240 290,140 L 350,140 Q 350,240 320,240 Z M 320,240 L 320,320 M 295,320 L 345,320" 
                fill="none" 
                stroke={primary} 
                strokeWidth="2" 
                style={{ pathLength: drawOutline }} 
              />
              {/* Liquid Fill */}
              <motion.path 
                d="M 320,235 Q 295,235 295,160 L 345,160 Q 345,235 320,235 Z" 
                fill={accent} 
                opacity="0.15"
                style={{ scaleY: fillLiquid, transformOrigin: '320px 235px' }} 
              />
              <motion.path 
                d="M 295,160 Q 320,165 345,160" 
                fill="none" stroke={accent} strokeWidth="1"
                style={{ opacity: fillLiquid }}
              />
            </motion.g>

            {/* Right Glass */}
            <motion.g style={{ x: glassRightX, rotate: glassRightRotate, transformOrigin: '480px 240px' }}>
              {/* Glass Outline */}
              <motion.path 
                d="M 480,240 Q 450,240 450,140 L 510,140 Q 510,240 480,240 Z M 480,240 L 480,320 M 455,320 L 505,320" 
                fill="none" 
                stroke={primary} 
                strokeWidth="2" 
                style={{ pathLength: drawOutline }} 
              />
              {/* Liquid Fill */}
              <motion.path 
                d="M 480,235 Q 455,235 455,160 L 505,160 Q 505,235 480,235 Z" 
                fill={accent} 
                opacity="0.15"
                style={{ scaleY: fillLiquid, transformOrigin: '480px 235px' }} 
              />
              <motion.path 
                d="M 455,160 Q 480,165 505,160" 
                fill="none" stroke={accent} strokeWidth="1"
                style={{ opacity: fillLiquid }}
              />
            </motion.g>

            {/* ═══ BUBBLES & SPARKLES ═══ */}
            <motion.g style={{ opacity: bubbleOpacity }}>
              {/* Rising Bubbles Left */}
              <motion.g style={{ y: bubbleY1 }}>
                <circle cx="310" cy="150" r="3" fill="none" stroke={accent} strokeWidth="1" />
                <circle cx="325" cy="130" r="2" fill={accent} opacity="0.6" />
                <circle cx="315" cy="110" r="4" fill="none" stroke={accent} strokeWidth="0.5" />
                <circle cx="330" cy="90" r="2" fill={accent} opacity="0.4" />
              </motion.g>
              
              {/* Rising Bubbles Right */}
              <motion.g style={{ y: bubbleY2 }}>
                <circle cx="490" cy="150" r="3" fill="none" stroke={accent} strokeWidth="1" />
                <circle cx="475" cy="130" r="2" fill={accent} opacity="0.6" />
                <circle cx="485" cy="110" r="4" fill="none" stroke={accent} strokeWidth="0.5" />
                <circle cx="470" cy="90" r="2" fill={accent} opacity="0.4" />
              </motion.g>

              {/* Center Clink Sparkles */}
              <motion.g style={{ y: bubbleY3 }}>
                <path d="M 400,110 L 400,90 M 390,100 L 410,100" stroke={accent} strokeWidth="1.5" opacity="0.8"  />
                <path d="M 393,93 L 407,107 M 393,107 L 407,93" stroke={primary} strokeWidth="1" opacity="0.6"  />
                
                <circle cx="400" cy="80" r="2" fill={accent}  />
                <circle cx="380" cy="110" r="1.5" fill={primary}  />
                <circle cx="420" cy="105" r="2.5" fill={accent}  />
                <circle cx="405" cy="120" r="1" fill={primary} />
              </motion.g>
            </motion.g>

          </svg>
        </div>
      </div>
    </div>
  );
}
