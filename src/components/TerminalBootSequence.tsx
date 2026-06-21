import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';

interface TerminalBootSequenceProps {
  onComplete: () => void;
  isPartyMode?: boolean;
}

const bootLines = [
  "KERNEL_INIT: Starting ARYA_OS v2.4.1",
  "Loading module: SYSTEM_CORE... OK",
  "Loading module: VLSI_ARCH... OK",
  "Loading module: EMBEDDED_SENSORS... OK",
  "Loading module: NEURAL_NETWORKS... OK",
  "Establishing hardware handshake... SUCCESS",
  "Bypassing security protocols... [AUTHORIZED]",
  "Initializing ARYA_SHARAN_PROFILE...",
];

const infinitePartyLines = [
  "Decrypting audio waveform data...",
  "Syncing rhythm to neural cortex...",
  "Bass resonance normalized...",
  "DOPAMINE_LEVELS_CRITICAL...",
  "Bypassing auditory limits...",
  "Executing turn_up.sh...",
  "Calibrating subwoofers...",
  "Isolating vocal track [JANICE_STFU]...",
  "Injecting hype algorithm...",
  "Warning: Decibel limit exceeded.",
  "Party protocol running... OK",
  "Analyzing crowd energy... PEAK",
  "Vibe check... PASSED",
  "Overclocking social processors...",
  "Connecting to global frequencies..."
];

export default function TerminalBootSequence({ onComplete, isPartyMode = false }: TerminalBootSequenceProps) {
  const [lines, setLines] = useState<{ id: string, text: string, timestamp: string }[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const [isStarted, setIsStarted] = useState(isPartyMode);
  
  // Stable reference to onComplete to prevent effect restarts
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);
  
  // Define end time based on mode
  const endTime = isPartyMode ? 105 : 81;

  useEffect(() => {
    if (!isStarted) return;

    let timeoutId: NodeJS.Timeout;
    let durationTimeout: NodeJS.Timeout;
    
    // Play audio immediately from the preloaded DOM element
    const audioEl = document.getElementById('party-audio') as HTMLAudioElement | null;
    if (audioEl) {
      audioEl.volume = 0.5;
      audioEl.currentTime = 74;
      audioEl.play().catch(e => {
        console.log("Boot audio play failed (autoplay policy)", e);
      });
      
      // We must handle stopping it too, let's just clear the onTimeUpdate if we set it here
      const handleTimeUpdate = () => {
        if (audioEl.currentTime >= endTime) {
          audioEl.pause();
          audioEl.removeEventListener('timeupdate', handleTimeUpdate);
        }
      };
      audioEl.addEventListener('timeupdate', handleTimeUpdate);
    }

    // Safety fallback: Always call onComplete after the expected duration
    // 7 seconds for normal boot (74 to 81), 31 seconds for party mode (74 to 105)
    const durationMs = isPartyMode ? 31000 : 7000;
    durationTimeout = setTimeout(() => {
      onCompleteRef.current();
    }, durationMs);
    
    const showNextLine = (index: number) => {
      const newLineId = `line-${Date.now()}-${Math.random()}`;
      const newTimestamp = ((index * 1.34) + 1.2).toFixed(4);

      if (index < bootLines.length) {
        setLines(prev => [...prev, { id: newLineId, text: bootLines[index], timestamp: newTimestamp }].slice(-14));
        const delay = Math.random() * 110 + 40;
        timeoutId = setTimeout(() => showNextLine(index + 1), delay);
      } else {
        const randomLine = infinitePartyLines[Math.floor(Math.random() * infinitePartyLines.length)];
        setLines(prev => [...prev, { id: newLineId, text: randomLine, timestamp: newTimestamp }].slice(-14));
        const delay = Math.random() * 110 + 40;
        timeoutId = setTimeout(() => showNextLine(index + 1), delay);
      }
    };

    // Start typing sequence
    timeoutId = setTimeout(() => showNextLine(0), 200);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(durationTimeout);
    };
  }, [isPartyMode, isStarted, endTime]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-[#060809] flex flex-col justify-center items-start p-8 md:p-16 overflow-hidden pointer-events-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >

      {!isStarted && (
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer z-50 bg-[#060809] pointer-events-auto"
          onClick={() => setIsStarted(true)}
        >
          <div className="text-[#4af626] font-mono text-[14px] md:text-[18px] animate-pulse">
            {'>'} SYSTEM STANDBY. CLICK TO INITIALIZE_
          </div>
        </div>
      )}

      {isStarted && (
        <div 
          className="text-[13px] md:text-[16px] leading-relaxed max-w-3xl mx-auto w-full tracking-wide pointer-events-auto"
          style={{
            fontFamily: "'Fira Code', 'Consolas', 'Menlo', 'Monaco', 'Courier New', monospace",
            color: "#4af626", // Classic terminal phosphor green
            textShadow: "0 0 8px rgba(74, 246, 38, 0.4)"
          }}
        >
          {lines.map((line) => (
            <motion.div 
              key={line.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-1.5"
            >
              <span className="opacity-70 mr-3">[{line.timestamp}]</span>
              {line.text}
            </motion.div>
          ))}
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2.5 h-4 md:h-5 bg-[#4af626] ml-2 align-middle shadow-[0_0_8px_rgba(74,246,38,0.8)]"
            />
          )}
        </div>
      )}
    </motion.div>
  );
}
