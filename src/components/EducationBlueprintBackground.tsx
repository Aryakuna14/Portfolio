import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from 'motion/react';

export default function EducationBlueprintBackground() {
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
    if (v < 0.1) setStageText('MATHEMATICAL AXIOMS');
    else if (v < 0.25) setStageText('COMPUTATIONAL LOGIC');
    else if (v < 0.4) setStageText('VLSI ARCHITECTURE');
    else setStageText('ENGINEERING THESIS APPROVED');
  });

  // ── Colors ──
  const primary = '#7ec8c8'; // Theme teal
  const accent = '#c9a96e';  // Theme gold
  const dimLabel = 'rgba(126, 200, 200, 0.35)';
  const grid = 'rgba(126, 200, 200, 0.04)';

  // ── Animations ──
  // Rotations
  const rotate1 = useTransform(smoothProgress, [0, 0.5], [0, 90]);
  const rotate2 = useTransform(smoothProgress, [0, 0.5], [45, -45]);
  const rotate3 = useTransform(smoothProgress, [0, 0.5], [0, 180]);
  
  // Drawing lines
  const drawLine = useTransform(smoothProgress, [0.05, 0.3], [0, 1]);
  const drawArc = useTransform(smoothProgress, [0.15, 0.4], [0, 1]);

  // Opacity
  const fade1 = useTransform(smoothProgress, [0, 0.15], [0, 0.8]);
  const fade2 = useTransform(smoothProgress, [0.2, 0.35], [0, 0.8]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <div className="sticky top-24 md:top-32 w-full flex flex-col items-center gap-3 py-6 opacity-60 md:opacity-100 select-none">
        
        {/* Header bar */}
        <div className="w-full max-w-4xl flex items-center justify-between px-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/50">
            Academic Blueprint
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-secondary/80 min-w-[140px] text-right">
            {stageText}
          </span>
        </div>

        {/* SVG Container */}
        <div className="w-full max-w-5xl relative mt-4">
          <svg viewBox="0 0 800 400" className="w-full h-auto">
            <defs>
              
              <pattern id="blueprintGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={grid} strokeWidth="1" />
                <path d="M 40 20 L 0 20" fill="none" stroke={grid} strokeWidth="0.5" strokeDasharray="2 2" />
                <path d="M 20 0 L 20 40" fill="none" stroke={grid} strokeWidth="0.5" strokeDasharray="2 2" />
              </pattern>
            </defs>

            {/* Background Grid */}
            <rect width="800" height="400" fill="url(#blueprintGrid)" />

            {/* ═══ CENTER GEOMETRY ═══ */}
            <g transform="translate(400, 200)">
              {/* Outer Ring */}
              <motion.circle 
                cx="0" cy="0" r="160" 
                fill="none" stroke={dimLabel} strokeWidth="0.5" strokeDasharray="4 8"
                style={{ rotate: rotate1 }} 
              />
              
              {/* Inner Solid Ring */}
              <motion.path
                d="M -120,0 A 120,120 0 0,1 120,0"
                fill="none" stroke={primary} strokeWidth="1.5"
                style={{ pathLength: drawArc, rotate: -90 }} 
              />
              
              {/* Rotating Hexagon */}
              <motion.polygon 
                points="0,-80 69.3,-40 69.3,40 0,80 -69.3,40 -69.3,-40"
                fill="none" stroke={accent} strokeWidth="1" 
                style={{ rotate: rotate2, opacity: fade1 }} 
              />
              
              {/* Crosshairs */}
              <motion.line x1="-180" y1="0" x2="180" y2="0" stroke={primary} strokeWidth="0.5" style={{ pathLength: drawLine }} />
              <motion.line x1="0" y1="-180" x2="0" y2="180" stroke={primary} strokeWidth="0.5" style={{ pathLength: drawLine }} />
              
              {/* Center Core Node */}
              <motion.circle cx="0" cy="0" r="6" fill={primary} style={{ opacity: fade2 }} />
              <motion.circle cx="0" cy="0" r="12" fill="none" stroke={accent} strokeWidth="1" style={{ opacity: fade2 }} />
            </g>

            {/* ═══ LEFT SIDE LOGIC GATES (VLSI) ═══ */}
            <motion.g transform="translate(100, 150)" style={{ opacity: fade2 }}>
              <text x="0" y="-20" fill={primary} fontSize="8" fontFamily="monospace">LOGIC_ARRAY_01</text>
              <line x1="0" y1="-15" x2="50" y2="-15" stroke={primary} strokeWidth="0.5" />
              
              {/* AND Gate shape */}
              <path d="M 0 0 L 20 0 Q 40 0 40 20 Q 40 40 20 40 L 0 40 Z" fill="none" stroke={dimLabel} strokeWidth="1.5" />
              <line x1="-20" y1="10" x2="0" y2="10" stroke={dimLabel} strokeWidth="1" />
              <line x1="-20" y1="30" x2="0" y2="30" stroke={dimLabel} strokeWidth="1" />
              <line x1="40" y1="20" x2="80" y2="20" stroke={accent} strokeWidth="1.5" strokeDasharray="2 4" />
              
              {/* Node values */}
              <text x="-25" y="13" fill={primary} fontSize="10" fontFamily="monospace">1</text>
              <text x="-25" y="33" fill={primary} fontSize="10" fontFamily="monospace">1</text>
              <text x="85" y="23" fill={accent} fontSize="10" fontFamily="monospace">1</text>
            </motion.g>

            {/* ═══ RIGHT SIDE MATH FORMULAS ═══ */}
            <motion.g transform="translate(600, 220)" style={{ opacity: fade1 }}>
              <text x="0" y="-10" fill={accent} fontSize="8" fontFamily="monospace">TRANSFORM_MATRIX</text>
              
              {/* Brackets */}
              <path d="M 10 10 L 0 10 L 0 50 L 10 50" fill="none" stroke={primary} strokeWidth="1" />
              <path d="M 50 10 L 60 10 L 60 50 L 50 50" fill="none" stroke={primary} strokeWidth="1" />
              
              {/* Variables */}
              <text x="15" y="25" fill={dimLabel} fontSize="12" fontFamily="serif">cos(θ)</text>
              <text x="15" y="45" fill={dimLabel} fontSize="12" fontFamily="serif">sin(θ)</text>
              
              {/* Connections to center */}
              <motion.line x1="-20" y1="30" x2="-80" y2="10" stroke={primary} strokeWidth="0.5" strokeDasharray="2 2" style={{ pathLength: drawLine }} />
            </motion.g>

            {/* Decorative Angle Measurements */}
            <motion.g transform="translate(400, 200)" style={{ opacity: fade2 }}>
              <path d="M 40 0 A 40 40 0 0 0 28.2 -28.2" fill="none" stroke={accent} strokeWidth="1" />
              <text x="45" y="-15" fill={accent} fontSize="8" fontFamily="monospace">45°</text>
            </motion.g>

          </svg>
        </div>
      </div>
    </div>
  );
}
