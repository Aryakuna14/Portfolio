import { Mail, Phone, Linkedin, Github, Instagram, ExternalLink } from 'lucide-react';

interface FooterProps {
  onSectionChange?: (sectionId: string) => void;
}

export default function Footer({ onSectionChange }: FooterProps) {
  return (
    <footer className="w-full bg-[#05070a] border-t border-white/5 py-16 px-6 mt-16 md:mt-24 text-center relative z-20">
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-7">
        
        {/* Brand/Name Header */}
        <button
          onClick={() => onSectionChange?.('home')}
          className="font-sans text-[15px] md:text-[18px] font-bold text-[#8fa0b1] hover:text-white uppercase tracking-[0.35em] transition-all duration-300 cursor-pointer"
        >
          ARYA SHARAN
        </button>

        {/* Tagline & Copyright */}
        <p className="font-sans text-[14px] md:text-[15px] text-[#94a3b8] font-normal flex flex-wrap items-center justify-center gap-2 select-none">
          <span>© Arya Sharan</span>
          <span className="text-white/20 select-none mx-1 text-xs">▪</span>
          <span className="text-white font-normal">Let's Build or Let's Party</span>
        </p>

        {/* Horizontal Navigation & Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mt-2 text-[14px] md:text-[15px] font-sans text-white/90">
          <a
            href="mailto:aryasharan47@gmail.com"
            className="hover:text-[#8fa0b1] transition-colors font-normal"
          >
            aryasharan47@gmail.com
          </a>
          
          <a
            href="tel:+919110648489"
            className="hover:text-[#8fa0b1] transition-colors font-normal whitespace-nowrap"
          >
            +91 91106 48489
          </a>

          <a
            href="https://www.linkedin.com/in/arya-sharan-516319200/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#8fa0b1] transition-colors font-normal"
          >
            LinkedIn
          </a>

          <a
            href="https://github.com/Aryakuna14"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#8fa0b1] transition-colors font-normal"
          >
            GitHub
          </a>

          <a
            href="https://www.instagram.com/axya1_7"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#8fa0b1] transition-colors font-normal"
          >
            Instagram
          </a>

          <a
            href="https://www.instagram.com/lowwkey.shop/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#8fa0b1] border border-white/10 rounded px-2.5 py-0.5 text-white/60 hover:border-[#8fa0b1] transition-all flex items-center gap-1 font-mono text-[11px]"
            title="Lowwkey Streetwear"
          >
            Lowwkey
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        
      </div>
    </footer>
  );
}
