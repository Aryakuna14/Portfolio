import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Terminal, Radio, ShieldAlert, Award, Activity, Sun, Zap, CheckCircle2, Sliders, Users, ExternalLink } from 'lucide-react';
import { projects } from '../data';

export default function ProjectsView() {
  const [activeCategory, setActiveCategory] = useState<'technical' | 'non-technical'>('technical');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>('posture-bot');

  // posture bot state variables
  const [neckInclination, setNeckInclination] = useState<number>(15);
  const [aiModelSelected, setAiModelSelected] = useState<'CNN' | 'SVM'>('CNN');

  // Robomanthan state variables
  const [bpmRate, setBpmRate] = useState<number>(14);
  const [pulseRate, setPulseRate] = useState<number>(72);
  const [isEyesClosed, setIsEyesClosed] = useState<boolean>(false);

  // Solar Radio custom state variables
  const [freq, setFreq] = useState<number>(93.5);
  const [isSolarPowered, setIsSolarPowered] = useState<boolean>(true);

  // Filtering projects list
  const filteredProjects = projects.filter((p) => {
    if (activeCategory === 'technical') {
      return p.category === 'technical';
    } else {
      return p.category === 'non-technical';
    }
  });

  const currentProject = projects.find((p) => p.id === selectedProjectId) || (filteredProjects.length > 0 ? filteredProjects[0] : projects[0]);

  // Helper station decoder for Radio Simulator
  const getRadioFeedback = (f: number) => {
    if (Math.abs(f - 91.1) < 0.4) {
      return { station: '91.1 MHz - Radio City', track: 'Playing smooth acoustic jazz and relaxed classical melodies.' };
    }
    if (Math.abs(f - 93.5) < 0.4) {
      return { station: '93.5 MHz - Red FM', track: 'Super-hit high-tempo electronic remixes & Bollywood indie streams.' };
    }
    if (Math.abs(f - 104.0) < 0.4) {
      return { station: '104.0 MHz - Fever FM', track: 'Podcasts & E-Summit entrepreneur talks from campus records.' };
    }
    return { station: 'Static Noise (Tuning...)', track: 'White noise hum - adjust the capacitor frequency dial.' };
  };

  const getPostureBotStatus = () => {
    const isBadPosture = neckInclination > 25;
    const cnnConfidence = isBadPosture ? (85 + (neckInclination - 25)) : (90 + (25 - neckInclination));
    const svmConfidence = isBadPosture ? (75 + (neckInclination - 25) * 0.8) : (82 + (25 - neckInclination) * 0.5);
    
    if (isBadPosture) {
      if (aiModelSelected === 'CNN') {
        return { level: 'danger', message: `⚠️ BAD POSTURE: CNN Confidence ${Math.min(cnnConfidence, 99.8).toFixed(1)}%`, color: 'text-red-400 bg-red-955/40 border-red-900/50' };
      } else {
        return { level: 'danger', message: `⚠️ BAD POSTURE: SVM Confidence ${Math.min(svmConfidence, 99.8).toFixed(1)}%`, color: 'text-orange-400 bg-orange-955/40 border-orange-900/50' };
      }
    }
    
    if (aiModelSelected === 'CNN') {
      return { level: 'safe', message: `🟢 OPTIMAL ALIGNMENT: CNN Conf ${Math.min(cnnConfidence, 99.8).toFixed(1)}%`, color: 'text-green-400 bg-green-955/40 border-green-900/50' };
    } else {
      return { level: 'safe', message: `🟢 OPTIMAL ALIGNMENT: SVM Conf ${Math.min(svmConfidence, 99.8).toFixed(1)}%`, color: 'text-emerald-400 bg-emerald-955/40 border-emerald-900/50' };
    }
  };

  const getRobomanthanStatus = () => {
    if (isEyesClosed) {
      return { alert: true, message: '⚡ FIRMWARE INSTALL: Flashing ESP32 payload via OTA Wi-Fi...', color: 'bg-yellow-955/50 border-yellow-900 text-yellow-400' };
    }
    const driftActive = pulseRate < 55 || pulseRate > 110;
    if (driftActive) {
      return { alert: true, message: '⚠️ STEERING ALERT: Extreme gyroscopic drift angle detected!', color: 'bg-red-955/50 border-red-900 text-red-400' };
    }
    return { alert: false, message: '🟢 RC VEHICLE ONLINE: Wi-Fi telemetry streams active (OpenCV 24 FPS).', color: 'bg-green-955/50 border-green-900 text-green-400' };
  };

  const radioSession = getRadioFeedback(freq);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-0">
      <div className="text-center mb-10">
        <span className="font-mono text-xs uppercase tracking-widest text-[#f8fafc] font-semibold border border-white/15 px-4 py-1.5 rounded-full bg-black/45 backdrop-blur-md shadow-md inline-block">
          Prototyping Labs
        </span>
        <h1 className="font-serif text-[42px] md:text-[54px] text-on-surface font-semibold mt-4 tracking-tight">
          Engineering Portfolio
        </h1>
        <p className="font-sans text-[15px] md:text-[17px] text-on-surface-variant max-w-xl mx-auto mt-2">
          From analog energy harvesting circuits to hardware simulators and multi-delegate operations schedules.
        </p>
      </div>

      {/* Interactive Main Category Clickables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-10 select-none">
        {/* Technical Clickable Card */}
        <button
          onClick={() => {
            setActiveCategory('technical');
            setSelectedProjectId('posture-bot');
          }}
          className={`flex items-start gap-4 p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden group ${
            activeCategory === 'technical'
              ? 'bg-[#1e2732] border-primary text-[#f8fafc] shadow-lg scale-[1.01]'
              : 'bg-black/25 border-white/5 text-on-surface hover:bg-black/45 hover:border-primary/40'
          }`}
        >
          <div className={`p-3 rounded-xl shrink-0 ${
            activeCategory === 'technical' ? 'bg-primary/20 text-[#f8fafc]' : 'bg-primary/10 text-primary'
          }`}>
            <Cpu className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-serif text-[17px] font-bold leading-normal flex items-center gap-2">
              Technical Projects
              <span className={`text-[10px] font-mono border rounded-full px-2.5 py-0.5 leading-none ${
                activeCategory === 'technical' ? 'border-primary/45 bg-primary/10 text-primary' : 'border-outline-variant/30 text-primary'
              }`}>
                {projects.filter(p => p.category === 'technical').length} Built
              </span>
            </h2>
            <p className={`font-sans text-[13px] leading-relaxed mt-1.5 ${
              activeCategory === 'technical' ? 'text-[#cbd5e1]' : 'text-on-surface-variant'
            }`}>
              Explore interactive hardware prototypes, firmware assistants, and AM solar-radio designs.
            </p>
          </div>
        </button>

        {/* Non-Technical Clickable Card */}
        <button
          onClick={() => {
            setActiveCategory('non-technical');
            setSelectedProjectId('no-parking-ops');
          }}
          className={`flex items-start gap-4 p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden group ${
            activeCategory === 'non-technical'
              ? 'bg-[#1e2732] border-primary text-[#f8fafc] shadow-lg scale-[1.01]'
              : 'bg-black/25 border-white/5 text-on-surface hover:bg-black/45 hover:border-primary/40'
          }`}
        >
          <div className={`p-3 rounded-xl shrink-0 ${
            activeCategory === 'non-technical' ? 'bg-primary/20 text-[#f8fafc]' : 'bg-primary/10 text-primary'
          }`}>
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-serif text-[17px] font-bold leading-normal flex items-center gap-2">
              Non-Technical Projects
              <span className={`text-[10px] font-mono border rounded-full px-2.5 py-0.5 leading-none ${
                activeCategory === 'non-technical' ? 'border-primary/45 bg-primary/10 text-primary' : 'border-[#1e2022] text-primary'
              }`}>
                {projects.filter(p => p.category === 'non-technical').length} Active
              </span>
            </h2>
            <p className={`font-sans text-[13px] leading-relaxed mt-1.5 ${
              activeCategory === 'non-technical' ? 'text-[#cbd5e1]' : 'text-on-surface-variant'
            }`}>
              Explore large-scale community operations, campus E-Summits, and international conference logistics.
            </p>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column - filtered list of project selection cards (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {filteredProjects.map((p) => {
            const isSelected = selectedProjectId === p.id;
            const isHardware = p.category === 'hardware';
            return (
              <button
                key={p.id}
                onClick={() => setSelectedProjectId(p.id)}
                className={`text-left p-6 rounded-xl glass-card transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col gap-3 group border-l-4 ${
                  isSelected
                    ? 'border-l-primary bg-primary-container/10'
                    : 'border-l-transparent'
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <span className="font-serif text-[18px] md:text-[20px] font-bold text-on-surface group-hover:text-primary transition-colors leading-tight">
                    {p.title}
                  </span>
                  
                  {isHardware ? (
                    <Cpu className="h-5.5 w-5.5 text-primary shrink-0 opacity-80" />
                  ) : (
                    <Award className="h-5.5 w-5.5 text-secondary shrink-0 opacity-80" />
                  )}
                </div>

                <p className="font-sans text-[13px] text-on-surface-variant leading-relaxed">
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-1 mt-1">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono border border-outline-variant/20 rounded px-2 py-0.5 text-outline-variant group-hover:text-on-surface group-hover:border-outline-variant/50 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right column - active project descriptive card & interactive panel (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-2xl p-6 md:p-8 flex flex-col gap-6 text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full blur-2xl" />

              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-primary font-medium">
                  Project Overviews
                </span>
                <h2 className="font-serif text-[28px] md:text-[34px] font-bold text-on-surface tracking-tight mt-1 leading-tight">
                  {currentProject.title}
                </h2>
                <div className="flex gap-2 flex-wrap items-center mt-3">
                  {currentProject.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono border border-primary/25 rounded px-2.5 py-1 bg-primary/5 text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-outline-variant/20 pt-6">
                <h3 className="font-serif text-sm uppercase tracking-widest text-on-surface-variant mb-1 font-bold">
                  Socio-Technic Objective
                </h3>
                <p className="font-sans text-[15px] text-on-surface-variant leading-relaxed mb-4">
                  {currentProject.longDescription}
                </p>
                {currentProject.link && (
                  <div className="pt-2">
                    <a
                      href={currentProject.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-[11px] uppercase tracking-wider font-semibold bg-primary hover:bg-primary/95 text-black hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer shadow-md"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>{currentProject.link.includes('github.com') ? 'View GitHub Repository' : 'View LinkedIn Live Post'}</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Interactive simulator panel (Only shown if "simulatable" is true and hardware filter allows) */}
              {currentProject.simulatable && (
                <div className="border-t border-outline-variant/25 pt-6 flex flex-col gap-4 mt-2">
                  <h3 className="font-serif text-[17px] text-primary font-semibold flex items-center gap-2">
                    <Sliders className="h-4.5 w-4.5" /> Core Simulated Sandbox Lab Tests
                  </h3>

                  {/* POSTURE BOT SANDBOX */}
                  {currentProject.id === 'posture-bot' && (
                    <div className="bg-[#0c0e10]/90 border border-outline-variant/30 rounded-xl p-5 flex flex-col gap-4">
                      <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
                        <span className="font-mono text-xs uppercase tracking-widest text-primary">MediaPipe Pipeline v2.0</span>
                        <span className="text-[10px] font-mono text-on-surface-variant">Live Inference</span>
                      </div>

                      {/* Controls sliders */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between font-mono text-xs mb-1">
                            <span className="text-on-surface-variant">Active Model</span>
                            <span className="text-primary font-bold">{aiModelSelected}</span>
                          </div>
                          <div className="flex rounded-md overflow-hidden border border-outline-variant/30">
                            <button
                              onClick={() => setAiModelSelected('CNN')}
                              className={`flex-1 py-1 text-[11px] font-mono ${aiModelSelected === 'CNN' ? 'bg-primary/20 text-primary font-bold' : 'bg-black/40 text-on-surface-variant hover:bg-black/60'}`}
                            >
                              CNN (Faster)
                            </button>
                            <button
                              onClick={() => setAiModelSelected('SVM')}
                              className={`flex-1 py-1 text-[11px] font-mono ${aiModelSelected === 'SVM' ? 'bg-primary/20 text-primary font-bold' : 'bg-black/40 text-on-surface-variant hover:bg-black/60'}`}
                            >
                              SVM (Baseline)
                            </button>
                          </div>
                          <span className="text-[10px] text-outline-variant/80 font-mono mt-1">(Compare accuracy difference)</span>
                        </div>

                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between font-mono text-xs">
                            <span className="text-on-surface-variant">Neck Inclination (MediaPipe)</span>
                            <span className="text-primary font-bold">{neckInclination}°</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="60"
                            value={neckInclination}
                            onChange={(e) => setNeckInclination(Number(e.target.value))}
                            className="accent-primary w-full cursor-pointer h-1 rounded flex-1 mt-1.5 mb-1.5"
                          />
                          <span className="text-[10px] text-outline-variant/80 font-mono">(Warning &gt; 25°)</span>
                        </div>
                      </div>

                      {/* Display Alert Output */}
                      <div className={`border p-3.5 rounded-lg text-center font-sans text-sm font-semibold transition-all duration-300 ${getPostureBotStatus().color}`}>
                        {getPostureBotStatus().message}
                      </div>
                    </div>
                  )}

                  {/* ROBOMANTHAN SANDBOX */}
                  {currentProject.id === 'robomanthan' && (
                    <div className="bg-[#0c0e10]/90 border border-outline-variant/30 rounded-xl p-5 flex flex-col gap-4">
                      <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
                        <span className="font-mono text-xs uppercase tracking-widest text-primary">Robomanthan Controller</span>
                        <span className="text-[10px] font-mono text-on-surface-variant font-medium">Wi-Fi / ESP32 Telemetry</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* OTA trigger button */}
                        <div className="flex flex-col gap-2">
                          <span className="font-mono text-[11px] text-on-surface-variant">OTA cloud updates</span>
                          <button
                            onMouseDown={() => setIsEyesClosed(true)}
                            onMouseUp={() => setIsEyesClosed(false)}
                            onTouchStart={() => setIsEyesClosed(true)}
                            onTouchEnd={() => setIsEyesClosed(false)}
                            className={`p-3.5 rounded-lg font-mono text-xs uppercase tracking-widest font-semibold cursor-pointer transition-all ${
                              isEyesClosed
                                ? 'bg-yellow-500 text-black shadow-lg scale-95'
                                : 'bg-[#1e2022] border border-outline-variant/30 text-on-surface hover:border-yellow-500/50'
                            }`}
                          >
                            {isEyesClosed ? '⚡ Installing Firmware Payload...' : '🔘 Hold to Simulate OTA Flash'}
                          </button>
                        </div>

                        {/* Image processor frame rate slider */}
                        <div className="flex flex-col gap-1 justify-center">
                          <div className="flex justify-between font-mono text-xs">
                            <span className="text-on-surface-variant">OpenCV Processing</span>
                            <span className="text-secondary font-bold">{bpmRate} FPS</span>
                          </div>
                          <input
                            type="range"
                            min="4"
                            max="30"
                            value={bpmRate}
                            onChange={(e) => setBpmRate(Number(e.target.value))}
                            className="accent-secondary w-full cursor-pointer h-1 rounded"
                          />
                          <span className="text-[10px] text-outline-variant/80 font-mono">(Video drop alerts flag at &lt; 8 FPS)</span>
                        </div>
                      </div>

                      <div className="flex gap-4 items-center">
                        <div className="w-1/2 flex flex-col gap-1">
                          <div className="flex justify-between font-mono text-xs">
                            <span className="text-on-surface-variant">Gyroscopic Drift Yaw</span>
                            <span className="text-primary font-bold">{pulseRate - 80}°</span>
                          </div>
                          <input
                            type="range"
                            min="40"
                            max="130"
                            value={pulseRate}
                            onChange={(e) => setPulseRate(Number(e.target.value))}
                            className="accent-primary w-full cursor-pointer h-1 rounded"
                          />
                        </div>
                        <div className="w-1/2 flex items-center gap-2 justify-center bg-surface-container-low border border-outline-variant/10 rounded-lg py-2">
                          <Activity className={`h-5 w-5 ${pulseRate < 55 || pulseRate > 110 ? 'text-red-400 animate-bounce' : 'text-green-400 animate-pulse'}`} />
                          <span className="font-mono text-sm">{pulseRate - 80}° Yaw</span>
                        </div>
                      </div>

                      {/* Display warning badge */}
                      <div className={`p-3.5 rounded-lg border text-center font-mono text-xs font-semibold ${getRobomanthanStatus().color}`}>
                        {getRobomanthanStatus().message}
                      </div>
                    </div>
                  )}

                  {/* SOLAR FM RADIO SANDBOX */}
                  {currentProject.id === 'solar-radio' && (
                    <div className="bg-[#0c0e10]/90 border border-outline-variant/30 rounded-xl p-5 flex flex-col gap-4">
                      <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
                        <span className="font-mono text-xs uppercase tracking-widest text-primary">Solar Analog Receiver v2</span>
                        <div className="flex gap-2 items-center">
                          <span className="text-[10px] font-mono text-on-surface-variant">Energy Source:</span>
                          <button
                            onClick={() => setIsSolarPowered(!isSolarPowered)}
                            className={`px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider rounded border cursor-pointer ${
                              isSolarPowered
                                ? 'bg-yellow-950/40 text-yellow-500 border-yellow-700/50'
                                : 'bg-[#1e2022] text-on-surface border-outline-variant/30'
                            }`}
                          >
                            {issolarPowerLabel(isSolarPowered)}
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between font-mono text-xs">
                          <span className="text-on-surface-variant">Capacitor Tuning Dial</span>
                          <span className="text-primary font-bold">{freq.toFixed(1)} MHz</span>
                        </div>
                        <input
                          type="range"
                          min="88"
                          max="108"
                          step="0.1"
                          value={freq}
                          onChange={(e) => setFreq(Number(e.target.value))}
                          className="accent-primary w-full cursor-pointer h-1.5 rounded"
                        />
                        <div className="flex justify-between text-[9px] font-mono text-outline-variant/70 mt-0.5">
                          <span>88 MHz</span>
                          <span className={`${Math.abs(freq - 91.1) < 0.8 ? 'text-primary' : ''}`}>91.1</span>
                          <span className={`${Math.abs(freq - 93.5) < 0.8 ? 'text-primary' : ''}`}>93.5</span>
                          <span className={`${Math.abs(freq - 104) < 0.8 ? 'text-primary' : ''}`}>104.0</span>
                          <span>108 MHz</span>
                        </div>
                      </div>

                      <div className="bg-[#1e2022]/80 border border-outline-variant/35 rounded-lg p-3.5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <Radio className={`h-6 w-6 text-primary shrink-0 ${radioSession.station.includes('Static') ? 'opacity-40 animate-none' : 'opacity-100 animate-pulse'}`} />
                          <div>
                            <span className="font-mono text-xs block text-primary font-semibold">{radioSession.station}</span>
                            <span className="font-sans text-[12px] text-on-surface-variant leading-relaxed block mt-0.5">
                              {radioSession.track}
                            </span>
                          </div>
                        </div>

                        {/* Decorative Sun Battery Gauge */}
                        <div className="flex flex-col items-center gap-0.5 shrink-0">
                          <Sun className={`h-5 w-5 ${isSolarPowered ? 'text-yellow-400 animate-spin' : 'text-outline-variant'}`} style={{ animationDuration: '6s' }} />
                          <span className="font-mono text-[9px] tracking-wide text-on-surface-variant">
                            {isSolarPowered ? '70mA / Sun' : '15mA / Grid'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

// Visual label helpers
function issolarPowerLabel(isSolar: boolean) {
  return isSolar ? '☀️ PV Active' : '🔌 Battery Backup';
}
