import { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, RefreshCcw } from 'lucide-react';
import { skillCategories } from '../data';
import CircuitSchematic from './CircuitSchematic';
import { Reveal, RevealGroup, RevealChild } from './Reveal';

// Assembler game state structures
interface AssemblerState {
  sensor: string | null;
  controller: string | null;
  power: string | null;
  indicator: string | null;
}

export default function SkillsView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // ESP32 Circuit assembly game states
  const [circuit, setCircuit] = useState<AssemblerState>({
    sensor: null,
    controller: null,
    power: null,
    indicator: null
  });
  const [compulationLog, setCompilationLog] = useState<string[]>(['[Firmware Sandbox] Ready. Connect hardware block nodes.']);

  const runCompiler = (newCircuit: AssemblerState) => {
    const logs: string[] = ['[Compiling Firmware] Initializing target register bindings...'];
    
    if (!newCircuit.sensor || !newCircuit.controller || !newCircuit.power || !newCircuit.indicator) {
      logs.push('⚠️ COMPILATION FAILED: Circuit loop incomplete! Connect a sensor, MCU, energy cell, and output.');
      setCompilationLog(logs);
      return;
    }

    logs.push(`✔ Bound GPIO inputs to ${newCircuit.sensor}`);
    logs.push(`✔ Loaded system scheduling firmware on ${newCircuit.controller}`);
    logs.push(`✔ Power regulation calibrated for ${newCircuit.power}`);
    logs.push(`✔ Trigger interrupts mapped to ${newCircuit.indicator}`);

    // Let's analyze combinations!
    if (newCircuit.sensor === 'Webcam & MediaPipe') {
      logs.push('🎉 AI PIPELINE INITIALIZED: Computer Vision Posture Analysis model deployed!');
    } else if (newCircuit.sensor === 'Gyroscope & OpenCV' && newCircuit.indicator === 'Dashboard Emergency Chime') {
      logs.push('🎉 HARDWARE ASSEMBLED: This matches the Robomanthan Wi-Fi controlled RC vehicle telemetry!');
    } else if (newCircuit.sensor === 'Analog RF Antenna' && newCircuit.power === 'Solar PV Panel Array') {
      logs.push('🎉 HARDWARE ASSEMBLED: Excellent match. Self-sustaining Solar Radio analog circuit!');
    } else {
      logs.push('⚙ CUSTOM HARDWARE BUILT: General telemetry pipeline compiled successfully. Ready for bench test!');
    }

    logs.push('[Telemetry Status] ● ONLINE. 0 errors, 0 warnings.');
    setCompilationLog(logs);
  };

  const handleBlockSelect = (type: keyof AssemblerState, value: string) => {
    const updated = { ...circuit, [type]: value };
    setCircuit(updated);
    runCompiler(updated);
  };

  const resetGame = () => {
    const cleaned = { sensor: null, controller: null, power: null, indicator: null };
    setCircuit(cleaned);
    setCompilationLog(['[Sandbox Reset] Select nodes to assemble a circuit model.']);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-0 relative z-0">
      
      {/* Scroll-Triggered Circuit Schematic Background Animation */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none md:opacity-100">
        <CircuitSchematic />
      </div>
      
      {/* Section Header */}
      <Reveal className="text-center mb-12 relative z-10">
        <p className="font-sans text-[15px] md:text-[17px] text-on-surface-variant max-w-xl mx-auto mb-5 leading-relaxed">
          Divided across hardware layouts, data algorithms, and subculture e-commerce marketing strategy.
        </p>
        <div className="flex items-center justify-center gap-3">
          <span className="section-number text-[32px] md:text-[42px]">05.</span>
          <span className="font-serif text-[32px] md:text-[42px] text-on-surface font-semibold tracking-tight">Skills</span>
        </div>
        <div className="section-divider mt-4" />
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 relative z-10">
        
        {/* Left Side: Skills profile list (7 cols) */}
        <RevealGroup className="lg:col-span-7 flex flex-col gap-6" stagger={0.18} delay={0.05}>
          {skillCategories.map((category) => (
            <RevealChild key={category.title}>
            <div className="glass-card rounded-2xl p-5 md:p-7 lg:p-9 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full" />
              
              <h2 className="font-serif text-[19px] md:text-[21px] text-primary font-semibold mb-5 tracking-tight border-b border-outline-variant/15 pb-3">
                {category.title}
              </h2>

              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-sans text-[14px] font-medium text-on-surface">{skill.name}</span>
                      <span className="font-mono text-[11px] text-primary/80">{skill.proficiency}%</span>
                    </div>
                    {/* Linear Progress Bar */}
                    <div className="w-full h-1.5 bg-outline-variant/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </RevealChild>
          ))}
        </RevealGroup>

        {/* Right Side: ESP32 Hardware Assembler game sandbox (5 cols) */}
        <Reveal className="lg:col-span-5 flex flex-col gap-6" delay={0.25}>
          <div className="glass-card rounded-2xl p-5 md:p-7 flex flex-col gap-5 text-left relative overflow-hidden">
            <div className="flex justify-between items-center border-b border-outline-variant/15 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <Cpu className="h-4.5 w-4.5 text-primary" />
                </div>
                <span className="font-serif text-[17px] text-on-surface font-semibold">ESP32 Firmware Sandbox</span>
              </div>
              <button
                onClick={resetGame}
                className="font-mono text-[10px] text-primary bg-primary/10 px-2.5 py-1 rounded-md flex items-center gap-1 hover:bg-primary/20 cursor-pointer transition-colors"
              >
                <RefreshCcw className="h-3 w-3" /> Reset
              </button>
            </div>

            <p className="font-sans text-[13px] text-on-surface-variant leading-relaxed">
              Synthesize Arya's firmware. Pair nodes below to emulate compilation outputs and calibrate hardware interfaces!
            </p>

            {/* Grid selectors */}
            <div className="space-y-4 mt-1">
              {/* Sensors */}
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant/60 block mb-1.5">Step 1: Input Sensor</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {['Webcam & MediaPipe', 'Gyroscope & OpenCV', 'Analog RF Antenna'].map((item) => (
                    <button
                      key={item}
                      onClick={() => handleBlockSelect('sensor', item)}
                      className={`text-[10px] font-mono p-1.5 rounded-md border overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer transition-all ${
                        circuit.sensor === item
                          ? 'bg-primary/12 text-primary border-primary/40 font-semibold'
                          : 'border-outline-variant/15 text-on-surface-variant/70 hover:border-outline-variant/40'
                      }`}
                      title={item}
                    >
                      {item.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* MCUs */}
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant/60 block mb-1.5">Step 2: Processing SoC</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {['ESP32-WROOM SoC', 'STM32 Cortex-M7'].map((item) => (
                    <button
                      key={item}
                      onClick={() => handleBlockSelect('controller', item)}
                      className={`text-[10px] font-mono p-1.5 rounded-md border cursor-pointer transition-all ${
                        circuit.controller === item
                          ? 'bg-primary/12 text-primary border-primary/40 font-semibold'
                          : 'border-outline-variant/15 text-on-surface-variant/70 hover:border-outline-variant/40'
                      }`}
                    >
                      {item.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Power Cells */}
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant/60 block mb-1.5">Step 3: Power Cells</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {['Lithium Recycle cell', 'Solar PV Panel Array'].map((item) => (
                    <button
                      key={item}
                      onClick={() => handleBlockSelect('power', item)}
                      className={`text-[10px] font-mono p-1.5 rounded-md border cursor-pointer transition-all ${
                        circuit.power === item
                          ? 'bg-primary/12 text-primary border-primary/40 font-semibold'
                          : 'border-outline-variant/15 text-on-surface-variant/70 hover:border-outline-variant/40'
                      }`}
                    >
                      {item.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Outputs */}
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant/60 block mb-1.5">Step 4: Indicator Feedback</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {['OLED & Audio Buzz', 'Dashboard Emergency Chime'].map((item) => (
                    <button
                      key={item}
                      onClick={() => handleBlockSelect('indicator', item)}
                      className={`text-[10px] font-mono p-1.5 rounded-md border overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer transition-all ${
                        circuit.indicator === item
                          ? 'bg-primary/12 text-primary border-primary/40 font-semibold'
                          : 'border-outline-variant/15 text-on-surface-variant/70 hover:border-outline-variant/40'
                      }`}
                      title={item}
                    >
                      {item.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* COMPILER OUTPUT LOG LINES */}
            <div className="bg-[#060809] rounded-xl p-4 border border-outline-variant/15 font-mono text-[11px] leading-relaxed flex flex-col gap-1 max-h-48 overflow-y-auto">
              {compulationLog.map((log, idx) => {
                const isError = log.includes('⚠️');
                const isSuccess = log.includes('🎉') || log.includes('✔');
                return (
                  <span
                    key={idx}
                    className={isError ? 'text-red-400' : isSuccess ? 'text-primary font-semibold' : 'text-on-surface-variant/80'}
                  >
                    {log}
                  </span>
                );
              })}
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
}
