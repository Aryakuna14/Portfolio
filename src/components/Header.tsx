import { Home, GraduationCap, Briefcase, FileText, Terminal, Zap, PartyPopper, Mail } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export default function Header({ activeSection, onSectionChange }: HeaderProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'projects', label: 'Projects', icon: Terminal },
    { id: 'skills', label: 'Skills', icon: Zap },
    { id: 'interests', label: 'Interests', icon: PartyPopper },
  ];

  return (
    <>
      {/* Sticky Top Navigation Bar (Desktop) */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 w-full z-50 bg-[#0c0e10]/80 backdrop-blur-2xl border-b border-sans border-outline-variant/20 justify-between items-center px-12 py-4 shadow-sm">
        <button
          onClick={() => onSectionChange('home')}
          className="font-serif text-[24px] uppercase tracking-tighter text-primary hover:text-white transition-colors duration-300 font-bold cursor-pointer"
        >
          ARYA SHARAN
        </button>

        <div className="flex gap-8 items-center">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`font-mono text-[12px] uppercase tracking-widest px-3 py-1 rounded transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'text-primary border-b border-primary font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/40'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onSectionChange('contact')}
          className="font-mono text-[12px] uppercase tracking-widest glass-card px-6 py-2 rounded text-primary hover:text-black hover:bg-primary transition-all duration-300 relative overflow-hidden group cursor-pointer"
        >
          <span className="relative z-10">Contact</span>
          <div className="absolute bottom-0 left-0 w-full h-[2px] cyber-streak opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      </nav>

      {/* Floating Bottom Navigator (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 w-full z-50 bg-[#0c0e10]/95 backdrop-blur-2xl border-t border-outline-variant/20 flex justify-around items-center py-3 px-4 shadow-xl">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 ease-out cursor-pointer ${
                isActive
                  ? 'bg-primary-container text-primary scale-110 font-bold'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/20'
              }`}
            >
              <IconComponent className="h-5 w-5 mb-1" />
              <span className="font-mono text-[9px] uppercase tracking-wider">{item.label}</span>
            </button>
          );
        })}
        <button
          onClick={() => onSectionChange('contact')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 ease-out cursor-pointer ${
            activeSection === 'contact'
              ? 'bg-primary-container text-primary scale-110 font-bold'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/20'
          }`}
        >
          <Mail className="h-5 w-5 mb-1" />
          <span className="font-mono text-[9px] uppercase tracking-wider">Contact</span>
        </button>
      </nav>
    </>
  );
}
