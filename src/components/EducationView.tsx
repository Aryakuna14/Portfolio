import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, GraduationCap, School, Layers, Compass, Award, ExternalLink } from 'lucide-react';
import { educationList } from '../data';

export default function EducationView() {
  const [eduIndex, setEduIndex] = useState<number>(0);
  const edu = educationList[eduIndex];
  const [selectedTopic, setSelectedTopic] = useState<string | null>('Semiconductors');

  const topicDetails: { [key: string]: { description: string; lab: string; achievement: string } } = {
    'VLSI': {
      description: 'Study of Very Large Scale Integration, focusing on semiconductor layout, CMOS design, digital logic circuits, and IC design flow.',
      lab: 'VLSI Design Lab (Using EDA tools for layout, simulation, and verification of CMOS circuits).',
      achievement: 'Designed and simulated custom CMOS operational amplifier with optimized power.'
    },
    'AI / ML': {
      description: 'Foundations of Artificial Intelligence and Machine Learning, covering neural networks, predictive modeling, data processing, and supervised learning algorithms.',
      lab: 'Machine Learning Lab (Training and deploying predictive models using modern Python frameworks).',
      achievement: 'Built an interactive data analytics model predicting system thermal failure states.'
    },
    'Semiconductors': {
      description: 'In-depth analysis of PN junctions, carrier density, metal-oxide-semiconductor structures, and transistor action. Focusing heavily on crystalline properties of silicon.',
      lab: 'Solid-State & Device Characterization Lab (Analyzing IV sweeps and temperature coefficients).',
      achievement: 'Class project modeling Schottky barrier thresholds, scored excellently in semiconductor theory.'
    },
    'Data Structures & Algorithms': {
      description: 'Comprehensive study of complex structures like Trees, Graphs, Hash Maps, sorting/searching algorithms, and space/time computational complexity indices.',
      lab: 'C++ Programming Practicum (Simulating graph traversals, shortest-path, and memory pointers).',
      achievement: 'Solved complex coding challenges; actively practicing on competitive algorithmic platforms.'
    },
    'Embedded Systems': {
      description: 'Programming microcontrollers in bare-metal assembly and Embedded C. Handling peripherals including SPI, I2C, UART, and ADCs.',
      lab: 'Embedded Microcontroller Labs (Interfacing real-world sensors and thermal arrays).',
      achievement: 'Designed custom RTOS-like scheduling routine for multi-sensor data harvesting cycles.'
    },
    'Microcontroller Programming': {
      description: 'Register-level manipulation of STM32 ARM Cortex and Atmel AVR cores to optimize real-time processing and power consumption.',
      lab: 'Microcontroller Architecture Workbench (Writing low-level hardware abstraction layers).',
      achievement: 'Built an ultra-low power bare-metal firmware suite for sensor networks.'
    },
    'Sensor Integration': {
      description: 'Acquiring, filtering, and processing data from real-world analog and digital sensors (IMUs, temperature, pressure).',
      lab: 'Hardware Prototyping Lab (Building sensor fusion algorithms and telemetry pipelines).',
      achievement: 'Successfully integrated sensor fusion pipelines for motion tracking hardware.'
    },
    'Mathematics': {
      description: 'Advanced calculus, linear algebra, and statistical probability providing the mathematical bedrock for engineering computations.',
      lab: 'Applied Mathematics (Solving complex differential equations and matrix transformations).',
      achievement: 'Secured high scores in competitive state-level mathematics Olympiads.'
    },
    'Computer Science': {
      description: 'Fundamentals of computer programming, logical routing, data representation, and object-oriented paradigms.',
      lab: 'Computer Science Practical (Developing Java and C++ programs for algorithmic problem solving).',
      achievement: 'Consistently achieved top grades in software development assignments.'
    },
    'Physics': {
      description: 'Classical mechanics, electromagnetism, optics, and introductory modern physics.',
      lab: 'Physics Workbench (Conducting experiments on optics, electrical circuits, and magnetism).',
      achievement: 'Completed extensive practical files simulating optical phenomena and sequential logic.'
    },
    'Chemistry': {
      description: 'Physical, organic, and inorganic chemistry focusing on atomic structures, chemical bonding, and reaction kinetics.',
      lab: 'Chemistry Lab (Performing titrations, salt analysis, and organic compound identifications).',
      achievement: 'Awarded top marks for accurate compound analysis and balanced chemical reactions.'
    },
    'General Science': {
      description: 'Comprehensive overview of biological, physical, and chemical sciences building a strong foundational intellect.',
      lab: 'General Science Practicals (Fundamental experiments exploring natural and physical phenomena).',
      achievement: 'Built award-winning science fair projects demonstrating fundamental physical laws.'
    },
    'Computer Applications': {
      description: 'Introduction to software utilities, internet fundamentals, and basic algorithmic workflows using high-level languages like Java.',
      lab: 'Computer Applications Lab (Creating basic GUI applications and solving computational logical puzzles).',
      achievement: 'Scored top marks demonstrating proficiency in custom application development.'
    },
    'Advanced Mathematics': {
      description: 'Foundational algebra, geometry, trigonometry, and introductory statistics used to build analytical reasoning.',
      lab: 'Mathematics Practicum (Applying theoretical formulas to real-world geometric and algebraic problems).',
      achievement: 'Recognized for outstanding analytical reasoning and fast computational arithmetic.'
    }
  };

  // Helper to extract clean CGPA/Score number
  const getGradeNumber = () => {
    if (edu.grade.includes('8.0')) {
      return 8.0;
    }
    if (edu.grade.includes('76%')) {
      return 7.6;
    }
    if (edu.grade.includes('92%')) {
      return 9.2;
    }
    return 8.5;
  };

  const getPercentageString = () => {
    return edu.grade;
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-0">
      <div className="text-center mb-10">
        <span className="font-mono text-xs uppercase tracking-widest text-[#f8fafc] font-semibold border border-white/15 px-4 py-1.5 rounded-full bg-black/45 backdrop-blur-md shadow-md inline-block">
          Academic Foundations
        </span>
        <h1 className="font-serif text-[42px] md:text-[54px] text-on-surface font-semibold mt-4 tracking-tight">
          Education Profile
        </h1>
        <p className="font-sans text-[15px] md:text-[17px] text-on-surface-variant max-w-xl mx-auto mt-2">
          Mapping core solid-state hardware dynamics alongside modular computer science.
        </p>
      </div>

      {/* Interactive Institution Tabs */}
      <div className="flex flex-col sm:flex-row justify-center items-stretch gap-3 mb-10 max-w-3xl mx-auto select-none">
        {educationList.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              setEduIndex(idx);
              if (item.focus.length > 0) {
                setSelectedTopic(item.focus[0]);
              }
            }}
            className={`font-sans text-xs uppercase tracking-wider py-4 px-5 rounded-2xl border transition-all duration-300 text-center flex flex-col justify-center gap-1.5 cursor-pointer flex-1 ${
              eduIndex === idx
                ? 'bg-[#1e2732] border-primary text-[#f8fafc] font-semibold shadow-lg scale-[1.02]'
                : 'bg-black/30 border-white/5 text-on-surface-variant hover:text-on-surface hover:bg-black/55'
            }`}
          >
            <span className="font-serif text-[15px] font-bold block leading-none">
              {idx === 0 ? 'Engineering EEE' : idx === 1 ? 'Senior Secondary (XII)' : 'High School (X)'}
            </span>
            <span className="font-mono text-[9px] tracking-widest block opacity-75">{item.period.split(' (')[0]}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Main Institution Card (Col Span 7) */}
        <div className="md:col-span-7 glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col gap-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full blur-2xl" />
          
          <div className="flex gap-4 items-start">
            <div className="p-4 bg-primary/10 rounded-2xl text-primary shrink-0 animate-pulse">
              <School className="h-8 w-8" />
            </div>
            <div>
              <p className="font-mono text-xs text-primary tracking-widest uppercase">{edu.period}</p>
              <h2 className="font-serif text-[24px] md:text-[28px] text-on-surface font-semibold leading-tight mt-1">
                {edu.institution}
              </h2>
              <p className="font-sans text-[15px] md:text-[16px] text-on-surface-variant font-medium mt-1">
                {edu.degree}
              </p>
            </div>
          </div>

          <div className="border-t border-outline-variant/30 pt-6">
            <h3 className="font-serif text-[18px] text-primary font-medium mb-3 flex items-center gap-2">
              <Compass className="h-4.5 w-4.5" /> Core Focus Areas (Click to Inspect)
            </h3>
            <div className="flex flex-wrap gap-2">
              {edu.focus.map((item) => (
                <button
                  key={item}
                  onClick={() => setSelectedTopic(topicDetails[item] ? item : null)}
                  className={`font-sans text-xs px-3.5 py-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
                    selectedTopic === item
                      ? 'bg-[#1e2732] text-[#f8fafc] border-primary font-medium shadow-md'
                      : 'bg-black/25 border-white/5 text-on-surface-variant hover:text-on-surface hover:border-primary/50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-outline-variant/30 pt-6 flex flex-col gap-3">
            <h3 className="font-serif text-[18px] text-primary font-medium flex items-center gap-2">
              <Award className="h-4.5 w-4.5" /> Academic Engagements & Honors
            </h3>
            <ul className="space-y-2">
              {edu.details.map((detail, index) => (
                <li key={index} className="font-sans text-[14px] text-on-surface-variant leading-relaxed flex items-start gap-2.5">
                  <span className="text-primary mt-1 shrink-0">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Grade Gauge & Course Inspector Drawer (Col Span 5) */}
        <div className="md:col-span-5 flex flex-col gap-6">
          {/* CGPA Counter Gauge */}
          <div className="glass-card rounded-2xl p-6 relative overflow-hidden flex items-center justify-between gap-6">
            <div className="flex flex-col gap-1 text-left">
              <span className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">Academic Rating</span>
              <p className="font-serif text-[18px] md:text-[20px] text-on-surface font-semibold leading-snug">Grading performance</p>
              <div className="mt-2 flex items-center gap-1.5 text-[12px] text-primary font-mono">
                <GraduationCap className="h-4 w-4" /> {getPercentageString()}
              </div>
            </div>
            
            <div className="relative shrink-0 flex items-center justify-center">
              {/* Circular Gauge Ring */}
              <svg className="h-24 w-24 transform -rotate-90">
                <circle cx="48" cy="48" r="40" className="stroke-outline-variant/15 fill-none" strokeWidth="8" />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  className="stroke-primary fill-none transition-all duration-1000"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * getGradeNumber()) / 10}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="font-serif text-[21px] font-bold text-primary leading-none">
                  {edu.grade.includes('CGPA') ? edu.grade.split(' ')[1] : edu.grade.split(': ')[1]}
                </span>
                <span className="font-mono text-[9px] text-on-surface-variant/85 mt-0.5">
                  {edu.grade.includes('CGPA') ? '/ 10' : 'Score'}
                </span>
              </div>
            </div>
          </div>

          {/* Core Focus Syllabus Inspector */}
          <div className="glass-card rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden min-h-[310px]">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
              <span className="font-serif text-[18px] text-on-surface font-semibold flex items-center gap-2">
                <BookOpen className="h-4.5 w-4.5 text-primary" /> Focus Inspector
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded">
                Details
              </span>
            </div>

            <AnimatePresence mode="wait">
              {selectedTopic && topicDetails[selectedTopic] ? (
                <motion.div
                  key={selectedTopic}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-4 text-left"
                >
                  <p className="font-mono text-xs text-primary uppercase tracking-widest">{selectedTopic}</p>
                  
                  <div>
                    <span className="font-mono text-[11px] text-on-surface-variant block mb-1">Theoretical Depth</span>
                    <p className="font-sans text-[14px] text-on-surface-variant leading-relaxed">
                      {topicDetails[selectedTopic].description}
                    </p>
                  </div>

                  <div className="border-t border-outline-variant/10 pt-3">
                    <span className="font-mono text-[11px] text-on-surface-variant block mb-1">Practical Lab Component</span>
                    <p className="font-sans text-[14px] text-secondary leading-relaxed font-semibold">
                      {topicDetails[selectedTopic].lab}
                    </p>
                  </div>

                  <div className="border-t border-outline-variant/10 pt-3 bg-primary/5 -mx-6 -mb-6 p-4 rounded-b-2xl mt-auto">
                    <span className="font-mono text-[11px] text-primary uppercase tracking-widest block mb-0.5">Key Achievement</span>
                    <p className="font-sans text-[13px] text-on-surface leading-normal">
                      {topicDetails[selectedTopic].achievement}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="h-48 flex flex-col items-center justify-center text-center text-on-surface-variant p-4">
                  <Layers className="h-10 w-10 text-outline-variant mb-2 animate-pulse" />
                  <p className="font-sans text-[14px]">Click any course focus topic on the left to inspect its detailed academic syllabus.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
