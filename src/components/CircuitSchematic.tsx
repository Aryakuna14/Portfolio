import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';

export default function CircuitSchematic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Current stage label
  const [stageText, setStageText] = useState('');
  useMotionValueEvent(scrollYProgress, "change", (v: number) => {
    if (v < 0.01) setStageText('');
    else if (v < 0.06) setStageText('LOADING MCU');
    else if (v < 0.14) setStageText('POWER RAILS');
    else if (v < 0.21) setStageText('INPUT SENSORS');
    else if (v < 0.275) setStageText('OUTPUT DEVICES');
    else if (v < 0.34) setStageText('SYSTEMS ACTIVE');
    else setStageText('FIRMWARE COMPILED ✓');
  });

  // Progress bar width
  const progressWidth = useTransform(scrollYProgress, [0, 0.375], ['0%', '100%']);

  // ═══════════════════════════════════════════
  // STAGE 1: ESP32 Chip (scroll 0.0 → 0.12)
  // ═══════════════════════════════════════════
  const chipOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);

  // ═══════════════════════════════════════════
  // STAGE 2: Power Rails (scroll 0.10 → 0.28)
  // ═══════════════════════════════════════════
  const batteryOpacity = useTransform(scrollYProgress, [0.05, 0.075], [0, 1]);
  const batteryUpWire = useTransform(scrollYProgress, [0.06, 0.09], [0, 1]);
  const batteryDownWire = useTransform(scrollYProgress, [0.065, 0.095], [0, 1]);
  const vccRailLength = useTransform(scrollYProgress, [0.08, 0.12], [0, 1]);
  const gndRailLength = useTransform(scrollYProgress, [0.09, 0.13], [0, 1]);
  const vccDropLength = useTransform(scrollYProgress, [0.11, 0.135], [0, 1]);
  const gndRiseLength = useTransform(scrollYProgress, [0.12, 0.14], [0, 1]);

  // ═══════════════════════════════════════════
  // STAGE 3: Input Sensors (scroll 0.28 → 0.42)
  // ═══════════════════════════════════════════
  const sensor1Opacity = useTransform(scrollYProgress, [0.14, 0.16], [0, 1]);
  const inputWire1Length = useTransform(scrollYProgress, [0.15, 0.185], [0, 1]);
  const sensor2Opacity = useTransform(scrollYProgress, [0.17, 0.19], [0, 1]);
  const inputWire2Length = useTransform(scrollYProgress, [0.18, 0.21], [0, 1]);

  // ═══════════════════════════════════════════
  // STAGE 4: Output Devices (scroll 0.42 → 0.55)
  // ═══════════════════════════════════════════
  const outputWire1Length = useTransform(scrollYProgress, [0.21, 0.24], [0, 1]);
  const ledOpacity = useTransform(scrollYProgress, [0.22, 0.24], [0, 1]);
  const outputWire2Length = useTransform(scrollYProgress, [0.235, 0.265], [0, 1]);
  const buzzerOpacity = useTransform(scrollYProgress, [0.245, 0.265], [0, 1]);

  // ═══════════════════════════════════════════
  // STAGE 5: Glow Effects (scroll 0.55 → 0.68)
  // ═══════════════════════════════════════════
  const glowOpacity = useTransform(scrollYProgress, [0.275, 0.325], [0, 1]);

  // ═══════════════════════════════════════════
  // STAGE 6: Terminal Log (scroll 0.65 → 0.78)
  // ═══════════════════════════════════════════
  const terminalOpacity = useTransform(scrollYProgress, [0.325, 0.375], [0, 1]);
  const terminalY = useTransform(scrollYProgress, [0.325, 0.375], [12, 0]);

  // ── Colors ──
  const ghost = 'rgba(126, 200, 200, 0.05)';
  const active = '#7ec8c8';
  const dimLabel = 'rgba(126, 200, 200, 0.35)';
  const chipFill = '#0e1114';
  const chipStroke = 'rgba(126, 200, 200, 0.12)';

  // ── Wire path data ──
  const wirePaths = {
    batteryUp: 'M 49,195 L 49,50',
    batteryDown: 'M 49,212 L 49,370',
    vccRail: 'M 49,50 L 750,50',
    gndRail: 'M 49,370 L 750,370',
    vccDrop: 'M 400,50 L 400,108',
    gndRise: 'M 400,292 L 400,370',
    input1: 'M 96,170 L 150,170 L 155,160 L 165,180 L 175,160 L 185,180 L 190,170 L 288,170',
    input2: 'M 97,240 L 150,240 L 155,230 L 165,250 L 175,230 L 185,250 L 190,240 L 288,240',
    output1: 'M 512,170 L 580,170 L 585,160 L 595,180 L 605,160 L 615,180 L 620,170 L 695,170',
    output2: 'M 512,240 L 688,240',
  };

  // ── Pin stubs ──
  const pinStubs = [
    'M 288,170 L 300,170',
    'M 288,240 L 300,240',
    'M 500,170 L 512,170',
    'M 500,240 L 512,240',
    'M 400,108 L 400,120',
    'M 400,280 L 400,292',
  ];

  // ── Glow junctions ──
  const junctions: [number, number][] = [
    [400, 50], [400, 370], [288, 170], [288, 240],
    [512, 170], [512, 240], [695, 170], [688, 240],
  ];

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <div className="sticky top-24 md:top-32 w-full flex flex-col items-center gap-3 py-6 opacity-30 md:opacity-40 select-none">
        {/* ── Header bar with progress ── */}
        <div className="w-full max-w-3xl flex items-center justify-between px-1">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-on-surface-variant/40">
            Background Assembly
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-primary/60 min-w-[140px] text-right">
            {stageText}
          </span>
        </div>

        {/* ── Progress bar ── */}
        <div className="w-full max-w-3xl h-[2px] bg-outline-variant/8 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary/60 rounded-full"
            style={{ width: progressWidth }}
          />
        </div>

        {/* ── SVG Schematic Card ── */}
        <div className="w-full max-w-4xl relative">

        <svg
          viewBox="0 0 800 400"
          className="w-full h-auto"
          style={{ overflow: 'visible' }}
        >
          {/* ─── DEFINITIONS ─── */}
          <defs>
            

            <filter id="ledGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feColorMatrix
                in="blur" type="matrix"
                values="0 0 0 0 0.49  0 0 0 0 0.78  0 0 0 0 0.78  0 0 0 2 0"
              />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="rgba(126,200,200,0.025)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>

          {/* Background grid */}
          <rect width="800" height="400" fill="url(#grid)" />

          {/* ─── GHOST WIRES (always visible, ultra-dim) ─── */}
          {Object.values(wirePaths).map((d, i) => (
            <path key={`g-${i}`} d={d} fill="none" stroke={ghost} strokeWidth={1.5} />
          ))}
          {pinStubs.map((d, i) => (
            <path key={`gp-${i}`} d={d} fill="none" stroke={ghost} strokeWidth={1.5} />
          ))}
          {/* Ghost chip outline */}
          <rect
            x="300" y="120" width="200" height="160" rx="4"
            fill="none" stroke={ghost} strokeWidth={1}
          />

          {/* ═══ STAGE 1: ESP32 Chip ═══ */}
          <motion.g style={{ opacity: chipOpacity }}>
            {/* IC Body */}
            <rect
              x="300" y="120" width="200" height="160" rx="4"
              fill={chipFill} stroke={chipStroke} strokeWidth="1.5"
            />
            {/* Internal label area dashed outline */}
            <rect
              x="345" y="172" width="110" height="44" rx="2"
              fill="none" stroke="rgba(126,200,200,0.06)"
              strokeWidth="0.5" strokeDasharray="4 3"
            />

            {/* Labels */}
            <text
              x="400" y="192" textAnchor="middle" fill={active}
              fontSize="14" fontWeight="700" fontFamily="monospace" letterSpacing="2"
            >
              ESP32
            </text>
            <text
              x="400" y="208" textAnchor="middle"
              fill="rgba(126,200,200,0.3)" fontSize="7" fontFamily="monospace"
            >
              WROOM-32
            </text>

            {/* Pin stubs */}
            {pinStubs.map((d, i) => (
              <path key={`ps-${i}`} d={d} fill="none" stroke={active} strokeWidth="1.5" />
            ))}

            {/* Pin dots */}
            {([[288,170],[288,240],[512,170],[512,240],[400,108],[400,292]] as [number,number][]).map(
              ([cx, cy], i) => (
                <circle key={`pd-${i}`} cx={cx} cy={cy} r="2" fill={active} />
              )
            )}

            {/* Pin labels */}
            <text x="282" y="174" textAnchor="end" fill={dimLabel} fontSize="7" fontFamily="monospace">GPIO4</text>
            <text x="282" y="244" textAnchor="end" fill={dimLabel} fontSize="7" fontFamily="monospace">GPIO5</text>
            <text x="518" y="174" textAnchor="start" fill={dimLabel} fontSize="7" fontFamily="monospace">GPIO21</text>
            <text x="518" y="244" textAnchor="start" fill={dimLabel} fontSize="7" fontFamily="monospace">GPIO22</text>
            <text x="415" y="106" textAnchor="start" fill={dimLabel} fontSize="7" fontFamily="monospace">3V3</text>
            <text x="415" y="298" textAnchor="start" fill={dimLabel} fontSize="7" fontFamily="monospace">GND</text>

            {/* IC alignment notch */}
            <circle cx="400" cy="120" r="5" fill={chipFill} stroke={chipStroke} strokeWidth="1" />
          </motion.g>

          {/* ═══ STAGE 2: Power Rails ═══ */}

          {/* Battery symbol */}
          <motion.g style={{ opacity: batteryOpacity }}>
            {/* Positive plate (long) */}
            <line x1="30" y1="195" x2="68" y2="195" stroke={active} strokeWidth="3" />
            {/* Negative plate (short) */}
            <line x1="36" y1="212" x2="62" y2="212" stroke={active} strokeWidth="1.5" />
            <text x="49" y="187" textAnchor="middle" fill={active} fontSize="11" fontWeight="bold">+</text>
            <text x="49" y="226" textAnchor="middle" fill="rgba(126,200,200,0.4)" fontSize="11">−</text>
            <text x="49" y="248" textAnchor="middle" fill={dimLabel} fontSize="7" fontFamily="monospace">3.7V</text>
          </motion.g>

          {/* Animated power wires */}
          <motion.path d={wirePaths.batteryUp} fill="none" stroke={active} strokeWidth="1.5"
            style={{ pathLength: batteryUpWire }} />
          <motion.path d={wirePaths.batteryDown} fill="none" stroke={active} strokeWidth="1.5"
            style={{ pathLength: batteryDownWire }} />
          <motion.path d={wirePaths.vccRail} fill="none" stroke={active} strokeWidth="1.5"
            style={{ pathLength: vccRailLength }} />
          <motion.path d={wirePaths.gndRail} fill="none" stroke={active} strokeWidth="1.5"
            style={{ pathLength: gndRailLength }} />
          <motion.path d={wirePaths.vccDrop} fill="none" stroke={active} strokeWidth="1.5"
            style={{ pathLength: vccDropLength }} />
          <motion.path d={wirePaths.gndRise} fill="none" stroke={active} strokeWidth="1.5"
            style={{ pathLength: gndRiseLength }} />

          {/* Rail labels */}
          <motion.g style={{ opacity: vccRailLength }}>
            <text
              x="758" y="54" textAnchor="start"
              fill="rgba(255,120,120,0.5)" fontSize="8" fontFamily="monospace" fontWeight="600"
            >
              VCC
            </text>
          </motion.g>
          <motion.g style={{ opacity: gndRailLength }}>
            <text
              x="758" y="374" textAnchor="start"
              fill="rgba(100,160,255,0.5)" fontSize="8" fontFamily="monospace" fontWeight="600"
            >
              GND
            </text>
          </motion.g>

          {/* ═══ STAGE 3: Input Sensors ═══ */}

          {/* Temperature sensor */}
          <motion.g style={{ opacity: sensor1Opacity }}>
            <rect
              x="68" y="155" width="28" height="30" rx="3"
              fill={chipFill} stroke={active} strokeWidth="1"
            />
            <text x="82" y="174" textAnchor="middle" fill={active} fontSize="10" fontFamily="monospace">
              °C
            </text>
            <text x="82" y="200" textAnchor="middle" fill={dimLabel} fontSize="7" fontFamily="monospace">
              TEMP
            </text>
          </motion.g>

          {/* LDR (Light Dependent Resistor) */}
          <motion.g style={{ opacity: sensor2Opacity }}>
            <circle cx="82" cy="240" r="15" fill={chipFill} stroke={active} strokeWidth="1" />
            <text x="82" y="244" textAnchor="middle" fill={active} fontSize="9" fontFamily="monospace">
              λ
            </text>
            {/* Light indicator arrows */}
            <line x1="60" y1="228" x2="67" y2="234" stroke={active} strokeWidth="0.8" />
            <line x1="58" y1="235" x2="65" y2="241" stroke={active} strokeWidth="0.8" />
            <text x="82" y="268" textAnchor="middle" fill={dimLabel} fontSize="7" fontFamily="monospace">
              LDR
            </text>
          </motion.g>

          {/* Input wires (with inline resistor zigzags) */}
          <motion.path d={wirePaths.input1} fill="none" stroke={active} strokeWidth="1.5"
            style={{ pathLength: inputWire1Length }} />
          <motion.path d={wirePaths.input2} fill="none" stroke={active} strokeWidth="1.5"
            style={{ pathLength: inputWire2Length }} />

          {/* ═══ STAGE 4: Output Devices ═══ */}

          {/* Output wires */}
          <motion.path d={wirePaths.output1} fill="none" stroke={active} strokeWidth="1.5"
            style={{ pathLength: outputWire1Length }} />
          <motion.path d={wirePaths.output2} fill="none" stroke={active} strokeWidth="1.5"
            style={{ pathLength: outputWire2Length }} />

          {/* LED symbol */}
          <motion.g style={{ opacity: ledOpacity }}>
            {/* Triangle */}
            <polygon points="695,155 720,170 695,185" fill="none" stroke={active} strokeWidth="1.2" />
            {/* Cathode bar */}
            <line x1="720" y1="155" x2="720" y2="185" stroke={active} strokeWidth="1.2" />
            {/* Emission arrows */}
            <line x1="727" y1="157" x2="735" y2="149" stroke={active} strokeWidth="0.8" />
            <line x1="729" y1="163" x2="737" y2="155" stroke={active} strokeWidth="0.8" />
            <polygon points="735,149 731,151 733,147" fill={active} />
            <polygon points="737,155 733,157 735,153" fill={active} />
            <text x="712" y="200" textAnchor="middle" fill={dimLabel} fontSize="7" fontFamily="monospace">
              LED
            </text>
          </motion.g>

          {/* Buzzer symbol */}
          <motion.g style={{ opacity: buzzerOpacity }}>
            <circle cx="708" cy="240" r="18" fill={chipFill} stroke={active} strokeWidth="1.2" />
            <text x="708" y="246" textAnchor="middle" fill={active} fontSize="14" fontFamily="monospace">
              ~
            </text>
            <text x="708" y="272" textAnchor="middle" fill={dimLabel} fontSize="7" fontFamily="monospace">
              BUZZER
            </text>
          </motion.g>

          {/* ═══ STAGE 5: Glow Effects ═══ */}
          <motion.g style={{ opacity: glowOpacity }}>
            {/* Junction glow dots */}
            {junctions.map(([cx, cy], i) => (
              <circle
                key={`glow-${i}`}
                cx={cx} cy={cy} r="4"
                fill={active}
                className="circuit-node-pulse"
                
              />
            ))}

            {/* LED active glow halo */}
            <circle
              cx="710" cy="170" r="22"
              fill="rgba(126,200,200,0.12)"
              className="circuit-led-active"
              
            />
            {/* LED filled triangle (glowing version) */}
            <polygon
              points="695,155 720,170 695,185"
              fill="rgba(126,200,200,0.25)"
              stroke={active} strokeWidth="1.5"
              
            />
          </motion.g>

          {/* Revision label */}
          <text
            x="793" y="394" textAnchor="end"
            fill="rgba(126,200,200,0.1)" fontSize="6" fontFamily="monospace"
          >
            REV 1.0 — ARYA EMBEDDED SYSTEMS
          </text>
        </svg>
      </div>
      </div>
    </div>
  );
}
