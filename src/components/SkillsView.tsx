import { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Zap, Radio, Globe, BarChart, Sliders, CheckCircle, RefreshCcw, ShieldAlert } from 'lucide-react';
import { skillCategories } from '../data';

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
    <div className="w-full max-w-5xl mx-auto px-4 md:px-0">
      
      {/* Title */}
      <div className="text-center mb-10">
        <span className="font-mono text-xs uppercase tracking-widest text-[#f8fafc] font-semibold border border-white/15 px-4 py-1.5 rounded-full bg-black/45 backdrop-blur-md shadow-md inline-block">
          Acquired Skillset
        </span>
        <h1 className="font-serif text-[42px] md:text-[54px] text-on-surface font-semibold mt-4 tracking-tight">
          Capabilities & Tools
        </h1>
        <p className="font-sans text-[15px] md:text-[17px] text-on-surface-variant max-w-xl mx-auto mt-2">
          Divided across hardware layouts, data algorithms, and subculture e-commerce marketing strategy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        
        {/* Left Side: Skills profile list (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {skillCategories.map((category) => (
            <div key={category.title} className="glass-card rounded-2xl p-6 md:p-8 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full" />
              
              <h2 className="font-serif text-[20px] md:text-[23px] text-primary font-bold mb-4 tracking-tight border-b border-outline-variant/15 pb-2">
                {category.title}
              </h2>

              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-sans font-medium text-on-surface">{skill.name}</span>
                      <span className="font-mono text-xs text-primary">{skill.proficiency}%</span>
                    </div>
                    {/* Linear Progress Bar */}
                    <div className="w-full h-2 bg-outline-variant/15 rounded-full overflow-hidden">
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
          ))}
        </div>

        {/* Right Side: ESP32 Hardware Assembler game sandbox (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-card rounded-2xl p-6 flex flex-col gap-5 text-left relative overflow-hidden">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-3">
              <div className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                <span className="font-serif text-[18px] text-on-surface font-semibold">ESP32 Firmware Sandbox</span>
              </div>
              <button
                onClick={resetGame}
                className="font-mono text-[10px] text-primary bg-primary/10 px-2 py-1 rounded flex items-center gap-1 hover:bg-primary/25 cursor-pointer transition-colors"
              >
                <RefreshCcw className="h-3 w-3" /> Reset
              </button>
            </div>

            <p className="font-sans text-[13px] text-on-surface-variant leading-relaxed">
              Synthesize Arya's firmware. Pair nodes below to emulate compilation outputs and calibrate hardware interfaces!
            </p>

            {/* Grid selectors */}
            <div className="space-y-3 mt-1">
              {/* Sensors */}
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-outline-variant block mb-1">Step 1: Input Sensor</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {['Webcam & MediaPipe', 'Gyroscope & OpenCV', 'Analog RF Antenna'].map((item) => (
                    <button
                      key={item}
                      onClick={() => handleBlockSelect('sensor', item)}
                      className={`text-[10px] font-mono p-1 rounded border overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer transition-all ${
                        circuit.sensor === item
                          ? 'bg-primary/15 text-primary border-primary font-bold'
                          : 'border-outline-variant/20 text-on-surface-variant hover:border-outline-variant/50'
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
                <span className="font-mono text-[9px] uppercase tracking-wider text-outline-variant block mb-1">Step 2: Processing SoC</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {['ESP32-WROOM SoC', 'STM32 Cortex-M7'].map((item) => (
                    <button
                      key={item}
                      onClick={() => handleBlockSelect('controller', item)}
                      className={`text-[10px] font-mono p-1 rounded border cursor-pointer transition-all ${
                        circuit.controller === item
                          ? 'bg-primary/15 text-primary border-primary font-bold'
                          : 'border-outline-variant/20 text-on-surface-variant hover:border-outline-variant/50'
                      }`}
                    >
                      {item.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Power Cells */}
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-outline-variant block mb-1">Step 3: Power Cells</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {['Lithium Recycle cell', 'Solar PV Panel Array'].map((item) => (
                    <button
                      key={item}
                      onClick={() => handleBlockSelect('power', item)}
                      className={`text-[10px] font-mono p-1.5 rounded border cursor-pointer transition-all ${
                        circuit.power === item
                          ? 'bg-primary/15 text-primary border-primary font-bold'
                          : 'border-outline-variant/20 text-on-surface-variant hover:border-outline-variant/50'
                      }`}
                    >
                      {item.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Outputs */}
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-outline-variant block mb-1">Step 4: Indicator Feedback</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {['OLED & Audio Buzz', 'Dashboard Emergency Chime'].map((item) => (
                    <button
                      key={item}
                      onClick={() => handleBlockSelect('indicator', item)}
                      className={`text-[10px] font-mono p-1 rounded border overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer transition-all ${
                        circuit.indicator === item
                          ? 'bg-primary/15 text-primary border-primary font-bold'
                          : 'border-outline-variant/20 text-on-surface-variant hover:border-outline-variant/50'
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
            <div className="bg-[#0c0e10] rounded-xl p-4 border border-outline-variant/30 font-mono text-[11px] leading-relaxed flex flex-col gap-1 max-h-48 overflow-y-auto">
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
        </div>

      </div>
    </div>
  );
}
