import { Home, GraduationCap, Briefcase, FileText, Terminal, Zap, PartyPopper, Mail, Volume2, VolumeX, Compass } from 'lucide-react';
import { useSounds } from './SoundSystem';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export default function Header({ activeSection, onSectionChange }: HeaderProps) {
  const { isMuted, toggleMute, playHover, playClick } = useSounds();

  // Scroll sections shown in the nav
  const navItems = [
    { id: 'home',       label: 'Home',       icon: Home },
    { id: 'education',  label: 'Education',  icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects',   label: 'Projects',   icon: Terminal },
    { id: 'activities', label: 'Activities', icon: Compass },
    { id: 'skills',     label: 'Skills',     icon: Zap },
    { id: 'interests',  label: 'Interests',  icon: PartyPopper },
  ];

  // Resume and Contact open as overlays (not scroll sections)
  const overlayItems = [
    { id: 'resume',  label: 'Resume',  icon: FileText },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleNav = (id: string) => {
    playClick();
    onSectionChange(id);
  };

  return (
    <>
      {/* ── Desktop Top Nav ── */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 w-full z-50 bg-[#0a0d10]/85 backdrop-blur-2xl border-b border-outline-variant/15 items-center px-8 md:px-12 py-4 shadow-sm h-[72px]">
        
        {/* Left: 'A' Icon */}
        <div className="flex-1 flex justify-start">
          <button
            onClick={() => handleNav('home')}
            onMouseEnter={playHover}
            className="font-serif italic text-[24px] font-bold tracking-tight text-primary hover:text-on-surface transition-colors duration-300 cursor-pointer flex items-center justify-center w-10 h-10 border border-primary/20 rounded-xl bg-primary/5 hover:bg-primary/10"
          >
            A
          </button>
        </div>

        {/* Center: Full Name */}
        <div className="flex-1 flex justify-center">
          <button
            onClick={() => handleNav('home')}
            onMouseEnter={playHover}
            className="font-serif italic text-[22px] tracking-tight text-primary hover:text-on-surface transition-colors duration-300 cursor-pointer"
          >
            Arya Sharan
          </button>
        </div>

        {/* Right: Resume + Contact + Mute */}
        <div className="flex-1 flex justify-end items-center gap-3">
          <button
            onClick={() => handleNav('resume')}
            onMouseEnter={playHover}
            className="border border-outline-variant/25 text-on-surface-variant px-4 py-2 rounded-lg hover:border-primary/40 hover:text-primary font-sans text-[12px] uppercase tracking-[0.15em] font-medium transition-all duration-300 cursor-pointer"
          >
            Resume
          </button>
          <button
            onClick={() => handleNav('contact')}
            onMouseEnter={playHover}
            className="border border-primary/40 text-primary px-5 py-2 rounded-lg hover:bg-primary hover:text-black font-sans text-[12px] uppercase tracking-[0.15em] font-medium transition-all duration-300 cursor-pointer"
          >
            Contact
          </button>
          {/* Mute toggle */}
          <button
            onClick={toggleMute}
            title={isMuted ? 'Unmute UI sounds' : 'Mute UI sounds'}
            className="p-2 rounded-lg border border-outline-variant/20 text-on-surface-variant/60 hover:text-primary hover:border-primary/30 transition-all duration-300 cursor-pointer"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* ── Desktop Right Sidebar (Ultra-compact Icon Pill) ── */}
      <nav className="hidden md:flex fixed top-1/2 right-4 -translate-y-1/2 z-50 flex-col gap-2 glass-card bg-[#0a0d10]/40 backdrop-blur-2xl border border-outline-variant/20 py-4 px-2.5 rounded-full items-center shadow-2xl">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              onMouseEnter={playHover}
              className={`group relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/40 border border-transparent'
              }`}
            >
              <IconComponent className={`w-4 h-4 ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(var(--color-primary),0.8)]' : ''} transition-all duration-300`} />
              
              {/* Left-popping tooltip */}
              <div className="absolute right-full mr-4 px-3 py-1.5 rounded-lg bg-[#0a0d10]/90 backdrop-blur-md border border-outline-variant/20 text-on-surface text-[10px] font-mono uppercase tracking-[0.2em] opacity-0 -translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap shadow-xl">
                {item.label}
              </div>
            </button>
          );
        })}
      </nav>

      {/* ── Mobile Bottom Nav ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 w-full z-50 bg-[#0a0d10]/95 backdrop-blur-2xl border-t border-outline-variant/15 shadow-xl"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="flex justify-around items-center py-2.5 px-2 gap-0.5 overflow-x-auto scrollbar-none">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex flex-col items-center justify-center min-w-[36px] p-1 rounded-xl transition-all duration-300 ease-out cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-primary/10 text-primary scale-105 font-bold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/20'
                }`}
              >
                <IconComponent className="h-[18px] w-[18px] mb-0.5" />
                <span className="font-mono text-[7px] uppercase tracking-wider leading-tight">{item.label}</span>
              </button>
            );
          })}

          {/* Overlay buttons on mobile */}
          {overlayItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className="flex flex-col items-center justify-center min-w-[36px] p-1 rounded-xl transition-all duration-300 ease-out cursor-pointer shrink-0 text-on-surface-variant hover:text-primary hover:bg-surface-container/20"
              >
                <IconComponent className="h-[18px] w-[18px] mb-0.5" />
                <span className="font-mono text-[7px] uppercase tracking-wider leading-tight">{item.label}</span>
              </button>
            );
          })}

          {/* Mobile mute toggle */}
          <button
            onClick={toggleMute}
            className="flex flex-col items-center justify-center min-w-[36px] p-1 rounded-xl transition-all duration-300 ease-out cursor-pointer shrink-0 text-on-surface-variant hover:text-primary"
          >
            {isMuted ? <VolumeX className="h-[18px] w-[18px] mb-0.5" /> : <Volume2 className="h-[18px] w-[18px] mb-0.5" />}
            <span className="font-mono text-[7px] uppercase tracking-wider leading-tight">Sound</span>
          </button>
        </div>
      </nav>
    </>
  );
}
