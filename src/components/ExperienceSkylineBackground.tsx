import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from 'motion/react';

export default function ExperienceSkylineBackground() {
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
    if (v < 0.05) setStageText('CITY GRID INITIALIZED');
    else if (v < 0.15) setStageText('ESTABLISHING INFRASTRUCTURE');
    else if (v < 0.3) setStageText('SCALING OPERATIONS');
    else if (v < 0.4) setStageText('NETWORK EXPANSION');
    else setStageText('GLOBAL REACH ACHIEVED');
  });

  // ── Colors ──
  const primary = '#7ec8c8'; // Theme teal
  const accent = '#c9a96e';  // Theme gold
  const dimLabel = 'rgba(126, 200, 200, 0.35)';
  const fill = '#0a0d10';    // Theme background
  const grid = 'rgba(126, 200, 200, 0.03)';

  // ── Animations ──
  // Background layer fades in early
  const bgOpacity = useTransform(smoothProgress, [0, 0.1], [0, 0.3]);
  // Midground path draws on scroll
  const midDraw = useTransform(smoothProgress, [0.05, 0.3], [0, 1]);
  // Foreground path draws later
  const fgDraw = useTransform(smoothProgress, [0.15, 0.45], [0, 1]);
  
  // Windows turning on
  const windowOpacity1 = useTransform(smoothProgress, [0.2, 0.25], [0, 0.8]);
  const windowOpacity2 = useTransform(smoothProgress, [0.3, 0.35], [0, 0.6]);
  const windowOpacity3 = useTransform(smoothProgress, [0.4, 0.45], [0, 0.9]);

  // ── Skyline Paths (800x400 ViewBox) ──
  // Background (Far skyline)
  const bgPath = "M 0 400 L 0 320 L 40 320 L 40 280 L 70 280 L 70 240 L 100 240 L 100 220 L 120 220 L 120 180 L 130 180 L 130 250 L 180 250 L 180 300 L 220 300 L 220 210 L 240 210 L 240 160 L 260 160 L 260 280 L 300 280 L 300 310 L 350 310 L 350 190 L 380 190 L 380 120 L 400 120 L 400 100 L 420 100 L 420 120 L 440 120 L 440 230 L 480 230 L 480 270 L 520 270 L 520 200 L 560 200 L 560 290 L 600 290 L 600 220 L 630 220 L 630 180 L 650 180 L 650 150 L 670 150 L 670 260 L 710 260 L 710 320 L 750 320 L 750 280 L 800 280 L 800 400 Z";
  
  // Midground (Main skyline, detailed)
  const midPath = "M 0 400 L 0 350 L 60 350 L 60 280 L 90 280 L 90 240 L 120 240 L 120 180 L 140 180 L 140 150 L 160 150 L 160 300 L 200 300 L 200 220 L 240 220 L 240 190 L 270 190 L 270 140 L 280 140 L 280 90 L 290 90 L 290 60 L 295 60 L 295 90 L 305 90 L 305 140 L 315 140 L 315 250 L 360 250 L 360 280 L 410 280 L 410 200 L 450 200 L 450 160 L 480 160 L 480 130 L 510 130 L 510 290 L 560 290 L 560 230 L 610 230 L 610 170 L 640 170 L 640 120 L 660 120 L 660 100 L 670 100 L 670 240 L 720 240 L 720 310 L 760 310 L 760 260 L 800 260 L 800 400 Z";

  // Foreground (Chunky buildings at bottom)
  const fgPath = "M 0 400 L 0 380 L 80 380 L 80 340 L 140 340 L 140 310 L 180 310 L 180 360 L 250 360 L 250 320 L 320 320 L 320 350 L 400 350 L 400 290 L 460 290 L 460 330 L 530 330 L 530 280 L 590 280 L 590 340 L 670 340 L 670 300 L 740 300 L 740 360 L 800 360 L 800 400 Z";

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <div className="sticky top-24 md:top-32 w-full flex flex-col items-center gap-3 py-6 opacity-60 md:opacity-90 select-none">
        
        {/* Header bar */}
        <div className="w-full max-w-4xl flex items-center justify-between px-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/50">
            NY Metro Protocol
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-secondary/80 min-w-[140px] text-right">
            {stageText}
          </span>
        </div>

        {/* SVG Container */}
        <div className="w-full max-w-5xl relative mt-4">
          <svg viewBox="0 0 800 400" className="w-full h-auto">
            <defs>
              
              <pattern id="cityGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke={grid} strokeWidth="1" />
              </pattern>
            </defs>

            {/* Background Grid */}
            <rect width="800" height="400" fill="url(#cityGrid)" />

            {/* Moon/Sun graphic */}
            <motion.circle 
              cx="650" cy="80" r="40" 
              fill="none" stroke={accent} strokeWidth="1" strokeDasharray="2 4"
              style={{ opacity: bgOpacity }} 
            />
            <motion.circle 
              cx="650" cy="80" r="30" 
              fill={accent} 
              style={{ opacity: useTransform(bgOpacity, [0, 0.15], [0, 0.05])}} 
            />

            {/* Background Skyline (Fades in) */}
            <motion.path 
              d={bgPath} 
              fill={fill} 
              stroke={dimLabel} 
              strokeWidth="1" 
              style={{ opacity: bgOpacity }} 
            />

            {/* Midground Skyline (Draws in) */}
            <motion.path 
              d={midPath} 
              fill={fill} 
              stroke={primary} 
              strokeWidth="1.5" 
              style={{ pathLength: midDraw }} 
            />

            {/* Foreground Skyline (Draws in) */}
            <motion.path 
              d={fgPath} 
              fill={fill} 
              stroke={accent} 
              strokeWidth="2" 
              style={{ pathLength: fgDraw }} 
            />

            {/* ═══ GLOWING WINDOWS ═══ */}
            {/* Building 1 Windows */}
            <motion.g style={{ opacity: windowOpacity1 }}>
              <rect x="250" y="240" width="4" height="6" fill={accent} opacity="0.8" />
              <rect x="250" y="255" width="4" height="6" fill={accent} opacity="0.4" />
              <rect x="260" y="240" width="4" height="6" fill={accent} opacity="0.6" />
              
              <rect x="420" y="220" width="4" height="8" fill={primary} opacity="0.7" />
              <rect x="420" y="235" width="4" height="8" fill={primary} opacity="0.9" />
              <rect x="435" y="220" width="4" height="8" fill={primary} opacity="0.5" />
            </motion.g>

            {/* Building 2 Windows */}
            <motion.g style={{ opacity: windowOpacity2 }}>
              <rect x="330" y="270" width="8" height="4" fill={primary} opacity="0.6" />
              <rect x="330" y="285" width="8" height="4" fill={primary} opacity="0.8" />
              
              <rect x="520" y="180" width="6" height="12" fill={accent} opacity="0.7" />
              <rect x="535" y="180" width="6" height="12" fill={accent} opacity="0.9" />
              <rect x="535" y="200" width="6" height="12" fill={accent} opacity="0.4" />
            </motion.g>

            {/* Building 3 Windows */}
            <motion.g style={{ opacity: windowOpacity3 }}>
              <rect x="130" y="200" width="4" height="4" fill={primary} opacity="0.8" />
              <rect x="130" y="215" width="4" height="4" fill={primary} opacity="0.5" />
              <rect x="130" y="230" width="4" height="4" fill={primary} opacity="0.9" />

              <rect x="650" y="190" width="6" height="6" fill={accent} opacity="0.8" />
              <rect x="650" y="205" width="6" height="6" fill={accent} opacity="0.6" />
              
              <rect x="285" y="100" width="3" height="6" fill={primary} opacity="1" />
              <rect x="285" y="115" width="3" height="6" fill={primary} opacity="0.5" />
            </motion.g>

            {/* Signal Nodes (Antennas) */}
            <motion.g style={{ opacity: windowOpacity2 }}>
              {/* Center tall building antenna glow */}
              <circle cx="290" cy="60" r="10" fill={accent} opacity="0.1" />
              <circle cx="290" cy="60" r="4" fill={accent} opacity="0.3" />
              <circle cx="290" cy="60" r="1.5" fill={accent}  />
              
              {/* Right building antenna glow */}
              <circle cx="660" cy="100" r="10" fill={primary} opacity="0.1" />
              <circle cx="660" cy="100" r="4" fill={primary} opacity="0.3" />
              <circle cx="660" cy="100" r="1.5" fill={primary}  />
            </motion.g>

            {/* Telemetry data labels flying next to buildings */}
            <motion.g style={{ opacity: windowOpacity3 }}>
              <text x="310" y="120" fill={dimLabel} fontSize="7" fontFamily="monospace">NODE_NYC_01</text>
              <line x1="295" y1="117" x2="305" y2="117" stroke={dimLabel} strokeWidth="0.5" />
              
              <text x="680" y="140" fill={dimLabel} fontSize="7" fontFamily="monospace">COMMS_LINK_ACTIVE</text>
              <line x1="665" y1="137" x2="675" y2="137" stroke={dimLabel} strokeWidth="0.5" />
            </motion.g>

          </svg>
        </div>
      </div>
    </div>
  );
}
