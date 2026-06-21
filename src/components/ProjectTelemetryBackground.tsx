import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from 'motion/react';

export default function ProjectTelemetryBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Apply spring physics to smooth out trackpad/mousewheel jitter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [stageText, setStageText] = useState('');
  useMotionValueEvent(smoothProgress, "change", (v: number) => {
    if (v < 0.025) setStageText('INITIALIZING TELEMETRY');
    else if (v < 0.125) setStageText('CHASSIS SCANNED');
    else if (v < 0.225) setStageText('AERO SENSORS ONLINE');
    else if (v < 0.325) setStageText('WIND TUNNEL ACTIVE');
    else if (v < 0.425) setStageText('POWERTRAIN SYNCED');
    else setStageText('RACE PACE OPTIMAL ✓');
  });

  const progressWidth = useTransform(smoothProgress, [0, 0.4], ['0%', '100%']);

  // ═══════════════════════════════════════════
  // ANIMATION STAGES
  // ═══════════════════════════════════════════
  const chassisOpacity = useTransform(smoothProgress, [0, 0.075], [0, 1]);
  const nodeOpacity = useTransform(smoothProgress, [0.075, 0.15], [0, 1]);
  
  // Aero wind lines
  const wind1 = useTransform(smoothProgress, [0.15, 0.25], [0, 1]);
  const wind2 = useTransform(smoothProgress, [0.175, 0.275], [0, 1]);
  const wind3 = useTransform(smoothProgress, [0.2, 0.3], [0, 1]);
  const wind4 = useTransform(smoothProgress, [0.225, 0.325], [0, 1]);

  // Telemetry Dashboard
  const dashOpacity = useTransform(smoothProgress, [0.325, 0.4], [0, 1]);

  // ── Colors ──
  const ghost = 'rgba(126, 200, 200, 0.05)';
  const active = '#7ec8c8'; // Theme primary teal
  const dimLabel = 'rgba(126, 200, 200, 0.35)';
  const carFill = '#0a0d10';
  const highlight = '#c9a96e'; // Theme accent gold

  // ── Aero Flow Paths ──
  const flowPaths = {
    top1: 'M -50,60 L 300,60 Q 400,60 450,130 Q 550,130 850,130',
    top2: 'M -50,90 L 250,90 Q 350,90 400,150 Q 500,150 850,150',
    mid:  'M -50,200 L 850,200',
    bot1: 'M -50,340 L 300,340 Q 400,340 450,270 Q 550,270 850,270',
    bot2: 'M -50,310 L 250,310 Q 350,310 400,250 Q 500,250 850,250',
  };

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <div className="sticky top-24 md:top-32 w-full flex flex-col items-center gap-3 py-6 opacity-60 md:opacity-90 select-none">
        
        {/* Header bar */}
        <div className="w-full max-w-4xl flex items-center justify-between px-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/50">
            Project Telemetry
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

        {/* SVG Container */}
        <div className="w-full max-w-5xl relative mt-4">
          <svg
            viewBox="0 0 800 400"
            className="w-full h-auto"
            style={{ overflow: 'visible' }}
          >
            <defs>
              
              <pattern id="telemetryGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(126, 200, 200, 0.03)" strokeWidth="1" />
                <circle cx="0" cy="0" r="1" fill="rgba(126, 200, 200, 0.1)" />
              </pattern>
            </defs>

            {/* Background */}
            <rect width="800" height="400" fill="url(#telemetryGrid)" />
            <line x1="400" y1="0" x2="400" y2="400" stroke={ghost} strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="200" x2="800" y2="200" stroke={ghost} strokeWidth="1" strokeDasharray="4 4" />

            {/* ═══ F1 CAR CHASSIS ═══ */}
            <motion.g style={{ opacity: chassisOpacity }}>
              {/* Rear Wing */}
              <rect x="140" y="150" width="40" height="100" fill={carFill} stroke={active} strokeWidth="2.5" />
              <line x1="150" y1="150" x2="150" y2="250" stroke={active} strokeWidth="1" />
              <line x1="160" y1="150" x2="160" y2="250" stroke={active} strokeWidth="1" />
              <line x1="170" y1="150" x2="170" y2="250" stroke={active} strokeWidth="1" />

              {/* Rear Wheels */}
              <rect x="200" y="125" width="80" height="35" rx="4" fill={carFill} stroke={active} strokeWidth="2.5" />
              <rect x="200" y="240" width="80" height="35" rx="4" fill={carFill} stroke={active} strokeWidth="2.5" />
              
              {/* Rear Suspension */}
              <line x1="240" y1="160" x2="280" y2="185" stroke={active} strokeWidth="2.5" />
              <line x1="240" y1="240" x2="280" y2="215" stroke={active} strokeWidth="2.5" />

              {/* Sidepods & Engine Cover */}
              <path d="M 180,185 L 280,160 L 480,165 L 450,200 L 480,235 L 280,240 Z" fill={carFill} stroke={active} strokeWidth="2.5" />
              
              {/* Halo & Cockpit */}
              <path d="M 320,185 L 420,185 L 440,200 L 420,215 L 320,215 Z" fill={carFill} stroke={active} strokeWidth="2.5" />
              <ellipse cx="380" cy="200" rx="15" ry="10" fill="none" stroke={active} strokeWidth="1.5" />

              {/* Nose & Front Chassis */}
              <path d="M 450,185 L 650,193 L 650,207 L 450,215 Z" fill={carFill} stroke={active} strokeWidth="2.5" />

              {/* Front Suspension */}
              <line x1="550" y1="190" x2="590" y2="155" stroke={active} strokeWidth="2.5" />
              <line x1="550" y1="210" x2="590" y2="245" stroke={active} strokeWidth="2.5" />
              <line x1="530" y1="190" x2="590" y2="145" stroke={active} strokeWidth="2.5" />
              <line x1="530" y1="210" x2="590" y2="255" stroke={active} strokeWidth="2.5" />

              {/* Front Wheels */}
              <rect x="560" y="130" width="60" height="25" rx="3" fill={carFill} stroke={active} strokeWidth="2.5" />
              <rect x="560" y="245" width="60" height="25" rx="3" fill={carFill} stroke={active} strokeWidth="2.5" />

              {/* Front Wing */}
              <path d="M 645,140 L 680,150 L 680,250 L 645,260 Z" fill={carFill} stroke={active} strokeWidth="2.5" />
              <line x1="655" y1="145" x2="655" y2="255" stroke={active} strokeWidth="1" />
              <line x1="665" y1="148" x2="665" y2="252" stroke={active} strokeWidth="1" />
            </motion.g>

            {/* ═══ SENSOR NODES ═══ */}
            <motion.g style={{ opacity: nodeOpacity }}>
              {/* Rear Wing Aero Node */}
              <circle cx="160" cy="200" r="12" fill={highlight} opacity="0.1" />
              <circle cx="160" cy="200" r="6" fill={highlight} opacity="0.3" />
              <circle cx="160" cy="200" r="3" fill={highlight}  />
              <line x1="160" y1="200" x2="160" y2="100" stroke={dimLabel} strokeWidth="1" strokeDasharray="2 2" />
              <text x="160" y="90" textAnchor="middle" fill={dimLabel} fontSize="8" fontFamily="monospace">DRS_ACTUATOR</text>

              {/* Engine/MGU Node */}
              <circle cx="280" cy="200" r="12" fill={active} opacity="0.1" />
              <circle cx="280" cy="200" r="6" fill={active} opacity="0.3" />
              <circle cx="280" cy="200" r="3" fill={active}  />
              <line x1="280" y1="200" x2="280" y2="300" stroke={dimLabel} strokeWidth="1" strokeDasharray="2 2" />
              <text x="280" y="315" textAnchor="middle" fill={dimLabel} fontSize="8" fontFamily="monospace">MGU-K SYNC</text>

              {/* Tyre Temp Node FL */}
              <circle cx="590" cy="142" r="12" fill={highlight} opacity="0.1" />
              <circle cx="590" cy="142" r="6" fill={highlight} opacity="0.3" />
              <circle cx="590" cy="142" r="3" fill={highlight}  />
              <line x1="590" y1="142" x2="590" y2="80" stroke={dimLabel} strokeWidth="1" strokeDasharray="2 2" />
              <text x="590" y="70" textAnchor="middle" fill={dimLabel} fontSize="8" fontFamily="monospace">FL_TYRE_TEMP</text>

              {/* Front Wing Aero Node */}
              <circle cx="660" cy="200" r="12" fill={active} opacity="0.1" />
              <circle cx="660" cy="200" r="6" fill={active} opacity="0.3" />
              <circle cx="660" cy="200" r="3" fill={active}  />
              <line x1="660" y1="200" x2="660" y2="300" stroke={dimLabel} strokeWidth="1" strokeDasharray="2 2" />
              <text x="660" y="315" textAnchor="middle" fill={dimLabel} fontSize="8" fontFamily="monospace">AERO_BALANCE</text>
            </motion.g>

            {/* ═══ WIND TUNNEL FLOW LINES ═══ */}
            {/* Top Flow */}
            <motion.path d={flowPaths.top1} fill="none" stroke={active} strokeWidth="3" strokeDasharray="6 10" style={{ pathLength: wind1, opacity: 0.8 }} />
            <motion.path d={flowPaths.top2} fill="none" stroke={active} strokeWidth="2" strokeDasharray="3 6" style={{ pathLength: wind2, opacity: 0.6 }} />
            
            {/* Mid Flow (Over cockpit) */}
            <motion.path d={flowPaths.mid} fill="none" stroke={highlight} strokeWidth="2.5" strokeDasharray="8 8" style={{ pathLength: wind3, opacity: 0.9 }} />
            
            {/* Bottom Flow */}
            <motion.path d={flowPaths.bot1} fill="none" stroke={active} strokeWidth="3" strokeDasharray="6 10" style={{ pathLength: wind1, opacity: 0.8 }} />
            <motion.path d={flowPaths.bot2} fill="none" stroke={active} strokeWidth="2" strokeDasharray="3 6" style={{ pathLength: wind4, opacity: 0.6 }} />

            {/* Flow Vectors */}
            <motion.g style={{ opacity: wind2 }}>
              <polygon points="450,130 440,127 440,133" fill={active} />
              <polygon points="450,270 440,267 440,273" fill={active} />
              <polygon points="600,200 590,197 590,203" fill={highlight} />
            </motion.g>

            {/* ═══ LIVE TELEMETRY CHARTS ═══ */}
            <motion.g style={{ opacity: dashOpacity }}>
              {/* Bottom Left: Speed Trace */}
              <rect x="50" y="320" width="150" height="60" fill="none" stroke={dimLabel} strokeWidth="0.5" />
              <text x="55" y="335" fill={active} fontSize="9" fontFamily="monospace">SPEED (KPH)</text>
              <path d="M 50,380 L 80,360 L 100,370 L 130,340 L 170,350 L 200,330" fill="none" stroke={active} strokeWidth="1.5" />
              <circle cx="200" cy="330" r="8" fill={active} opacity="0.1" />
              <circle cx="200" cy="330" r="4" fill={active} opacity="0.3" />
              <circle cx="200" cy="330" r="2" fill={active}  />
              <text x="175" y="345" fill={active} fontSize="12" fontFamily="monospace" fontWeight="bold">312</text>
              
              {/* Top Right: RPM Gauge */}
              <rect x="600" y="20" width="150" height="60" fill="none" stroke={dimLabel} strokeWidth="0.5" />
              <text x="605" y="35" fill={highlight} fontSize="9" fontFamily="monospace">RPM x1000</text>
              {/* RPM Bars */}
              {Array.from({ length: 15 }).map((_, i) => (
                <rect 
                  key={`rpm-${i}`} 
                  x={605 + i * 9} y="45" 
                  width="6" height={15 + (i * 1.5)} 
                  fill={i > 11 ? highlight : active} 
                  opacity={i < 13 ? 1 : 0.2}
                />
              ))}
              <text x="680" y="45" fill={highlight} fontSize="12" fontFamily="monospace" fontWeight="bold">11.8k</text>

              {/* Data Values Overlay */}
              <text x="50" y="30" fill={dimLabel} fontSize="8" fontFamily="monospace">G-FORCE: 4.2G LAT</text>
              <text x="50" y="45" fill={dimLabel} fontSize="8" fontFamily="monospace">BRAKE_BIAS: 56.4%</text>
              <text x="50" y="60" fill={dimLabel} fontSize="8" fontFamily="monospace">ERS_MODE: OVERTAKE</text>
            </motion.g>

          </svg>
        </div>
      </div>
    </div>
  );
}
