import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Layers, 
  Brain, 
  Mic2, 
  Users, 
  Dumbbell, 
  Shirt, 
  PartyPopper, 
  Sparkles,
  ChevronRight,
  Flame,
  Music
} from 'lucide-react';

interface InterestItem {
  id: string;
  title: string;
  description: string;
  icon: any;
  accent: string;
  details?: string[];
}

export default function InterestsView() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'technical' | 'leadership' | 'personal'>('all');
  const [partyCounter, setPartyCounter] = useState<number>(0);
  const [partyActive, setPartyActive] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'All Fields' },
    { id: 'technical', label: 'Technical Pursuits' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'personal', label: 'Personal & Hobbies' }
  ];

  const technicalInterests: InterestItem[] = [
    {
      id: 'emb-systems',
      title: 'Embedded Systems & Robotics',
      description: 'Working hands-on with microcontrollers like Arduino, ESP32, and Raspberry Pi Pico 2W, and building hardware projects like WiFi-controlled RC prototypes.',
      icon: Cpu,
      accent: 'from-[#60a5fa] to-[#3b82f6]',
      details: ['ESP32 WebSockets WiFi RC', 'C/C++ Bare Metal Coding', 'Pico 2W Dual-Core RTOS']
    },
    {
      id: 'vlsi-electronics',
      title: 'VLSI & Electronics',
      description: 'A core academic and career focus, with long-term aspirations for advanced studies and specialization in this field.',
      icon: Layers,
      accent: 'from-[#c084fc] to-[#a855f7]',
      details: ['Semiconductor Physics', 'Microelectronic Circuits', 'Digital VLSI Design Design']
    },
    {
      id: 'ai-ml',
      title: 'Artificial Intelligence & Machine Learning (AI/ML)',
      description: 'Expanding technical expertise into intelligent systems and modern tech applications.',
      icon: Brain,
      accent: 'from-[#2dd4bf] to-[#0d9488]',
      details: ['Neural Network Basics', 'Intelligent Control Systems', 'Sensor Signal Processing']
    }
  ];

  const leadershipInterests: InterestItem[] = [
    {
      id: 'event-org',
      title: 'Event Organizing & Emceeing',
      description: 'Leading and coordinating large-scale college events, speaking challenges, and cultural fests.',
      icon: Mic2,
      accent: 'from-[#f43f5e] to-[#e11d48]',
      details: ['Anchor Technical Sumits', 'Dayananda Sagar College Fests', 'Inter-Collegiate Hostings']
    },
    {
      id: 'comm-leadership',
      title: 'Community Leadership',
      description: 'Taking on student lead roles, managing teams, and handling sponsor and celebrity outreach for campus chapters.',
      icon: Users,
      accent: 'from-[#fb7185] to-[#f43f5e]',
      details: ['Campus Chapter Operations', 'Sponsor Acquisition Drives', 'Vendor & VIP Protocols']
    }
  ];

  const personalInterests: InterestItem[] = [
    {
      id: 'fitness',
      title: 'Fitness & Training',
      description: 'Maintaining a highly active lifestyle with a focus on weightlifting, macro tracking, and mastering bodyweight goals like pull-ups.',
      icon: Dumbbell,
      accent: 'from-[#fb923c] to-[#f97316]',
      details: ['High Intensity Training', 'Macro & Calorimetry tracking', 'Pull-up & Dip Bodyweight milestones']
    },
    {
      id: 'streetwear',
      title: 'Alt-Streetwear Fashion',
      description: 'Exploring indie aesthetics, semi-formal streetwear, and creative styling.',
      icon: Shirt,
      accent: 'from-[#cbd5e1] to-[#64748b]',
      details: ['Boxy & Oversized curation', 'Indie & Alt visual aesthetics', 'Streetwear Merch & Co-Founding']
    },
    {
      id: 'partying',
      title: 'Partying',
      description: 'Celebrating victories, turning up at major fests, enjoying good music, and socializing with extraordinary crowds.',
      icon: PartyPopper,
      accent: 'from-[#facc15] to-[#eab308]',
      details: ['House music / Techno drops', 'Celebrating post-project runs', 'Extroverted Networking events']
    }
  ];

  const handlePartyTrigger = () => {
    setPartyCounter(prev => prev + 1);
    setPartyActive(true);
    setTimeout(() => {
      setPartyActive(false);
    }, 2000);
  };

  const getFilteredItems = () => {
    switch (activeCategory) {
      case 'technical':
        return { technical: technicalInterests, leadership: [], personal: [] };
      case 'leadership':
        return { technical: [], leadership: leadershipInterests, personal: [] };
      case 'personal':
        return { technical: [], leadership: [], personal: personalInterests };
      default:
        return { technical: technicalInterests, leadership: leadershipInterests, personal: personalInterests };
    }
  };

  const filtered = getFilteredItems();

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-0">
      
      {/* Title */}
      <div className="text-center mb-12 relative z-10">
        <span className="font-mono text-xs uppercase tracking-widest text-[#f8fafc] font-semibold border border-white/15 px-4 py-1.5 rounded-full bg-black/45 backdrop-blur-md shadow-md inline-block">
          Interests & Hobbies
        </span>
        <h1 className="font-serif text-[42px] md:text-[54px] text-on-surface font-semibold mt-4 tracking-tight">
          Lifestyle Pursuits
        </h1>
        <p className="font-sans text-[15px] md:text-[17px] text-on-surface-variant max-w-xl mx-auto mt-2">
          From embedded system design and academic VLSI study to community leadership and active visual subcultures.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12 relative z-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`font-mono text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl border transition-all duration-300 cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#1e2732] border-primary text-[#f8fafc] font-semibold shadow-md translate-y-[-1px]'
                : 'bg-black/20 border-white/5 text-on-surface-variant hover:text-on-surface hover:bg-black/45'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid Container */}
      <div className="space-y-12 relative z-10 text-left">
        
        {/* Technical Pursuits Section */}
        {filtered.technical.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-6 w-1 bg-blue-400 rounded-full" />
              <h2 className="font-serif text-[22px] font-bold text-on-surface">Technical Pursuits</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filtered.technical.map((item, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  key={item.id}
                  className="glass-card rounded-2xl p-6 flex flex-col gap-5 border border-white/5 hover:border-primary/20 hover:bg-black/40 transition-all duration-300 group min-h-[220px]"
                >
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/10">
                      <item.icon className="h-5 w-5" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#fafafa] tracking-tight group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-[13.5px] text-on-surface-variant leading-relaxed mt-2.5">
                      {item.description}
                    </p>
                  </div>

                  {item.details && (
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                      {item.details.map((tag) => (
                        <span key={tag} className="font-mono text-[9px] uppercase tracking-wider text-[#99cfe0] bg-black/35 px-2 py-0.5 rounded border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Leadership Section */}
        {filtered.leadership.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-6 w-1 bg-rose-400 rounded-full" />
              <h2 className="font-serif text-[22px] font-bold text-on-surface">Leadership & Management</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.leadership.map((item, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  key={item.id}
                  className="glass-card rounded-2xl p-6 flex flex-col gap-5 border border-white/5 hover:border-primary/20 hover:bg-black/40 transition-all duration-300 group min-h-[190px]"
                >
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/10">
                      <item.icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#fafafa] tracking-tight group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-[13.5px] text-on-surface-variant leading-relaxed mt-2.5">
                      {item.description}
                    </p>
                  </div>

                  {item.details && (
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                      {item.details.map((tag) => (
                        <span key={tag} className="font-mono text-[9px] uppercase tracking-wider text-[#fda4af] bg-black/35 px-2 py-0.5 rounded border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Personal Interests & Hobbies Section */}
        {filtered.personal.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-6 w-1 bg-amber-400 rounded-full" />
              <h2 className="font-serif text-[22px] font-bold text-on-surface">Personal Interests & Hobbies</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filtered.personal.map((item, idx) => {
                const isPartying = item.id === 'partying';
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    key={item.id}
                    onClick={isPartying ? handlePartyTrigger : undefined}
                    className={`glass-card rounded-2xl p-6 flex flex-col gap-5 border duration-300 group min-h-[225px] transition-all ${
                      isPartying 
                        ? 'border-amber-500/25 bg-black/35 hover:bg-black/50 hover:border-amber-400/60 cursor-pointer active:scale-[0.98]'
                        : 'border-white/5 hover:border-primary/20 hover:bg-black/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-xl border ${
                        isPartying 
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/15 group-hover:animate-bounce' 
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/10'
                      }`}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      
                      {isPartying && (
                        <span className="font-mono text-[10px] text-amber-400/70 uppercase tracking-widest bg-amber-500/5 border border-amber-500/15 rounded-full px-2.5 py-0.5">
                          Turn Up {partyCounter > 0 && `x${partyCounter}`}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className={`font-serif text-lg font-bold tracking-tight transition-colors ${
                        isPartying ? 'text-amber-300 group-hover:text-amber-200' : 'text-[#fafafa] group-hover:text-primary'
                      }`}>
                        {item.title}
                      </h3>
                      <p className="font-sans text-[13.5px] text-on-surface-variant leading-relaxed mt-2.5">
                        {item.description}
                      </p>
                    </div>

                    {isPartying && partyActive && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-amber-500/10 rounded-2xl border border-amber-400/30 flex flex-col items-center justify-center p-4 backdrop-blur-[2px]"
                      >
                        <Sparkles className="h-8 w-8 text-amber-300 animate-spin" />
                        <span className="font-serif text-sm font-bold text-amber-200 mt-2 tracking-widest select-none uppercase">
                          BEATS DROPPING! 🔊✨
                        </span>
                      </motion.div>
                    )}

                    {item.details && (
                      <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                        {item.details.map((tag) => (
                          <span key={tag} className="font-mono text-[9px] uppercase tracking-wider text-[#fcd34d] bg-black/35 px-2 py-0.5 rounded border border-white/5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}
