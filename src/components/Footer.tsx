import { ExternalLink } from 'lucide-react';

interface FooterProps {
  onSectionChange?: (sectionId: string) => void;
}

export default function Footer({ onSectionChange }: FooterProps) {
  return (
    <footer className="w-full bg-[#05070a] border-t border-outline-variant/10 py-20 px-6 md:px-12 mt-16 md:mt-24 relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">

        {/* Top Row: Brand / Tagline+Nav / Name */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-0">

          {/* Left: Brand name */}
          <button
            onClick={() => onSectionChange?.('home')}
            className="font-serif italic text-[20px] text-primary hover:text-on-surface transition-colors duration-300 cursor-pointer text-left"
          >
            Arya Sharan
          </button>

          {/* Center: Tagline + Section Nav */}
          <div className="flex flex-col items-center gap-4">
            <p className="font-sans text-[14px] text-on-surface-variant/70 font-normal">
              Let's Build or Let's Party
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => onSectionChange?.('projects')}
                className="font-sans text-[12px] uppercase tracking-[0.15em] text-on-surface-variant/50 hover:text-primary transition-colors duration-300 cursor-pointer"
              >
                Hardware
              </button>
              <span className="text-outline-variant/30 text-[10px] select-none">◆</span>
              <button
                onClick={() => onSectionChange?.('skills')}
                className="font-sans text-[12px] uppercase tracking-[0.15em] text-on-surface-variant/50 hover:text-primary transition-colors duration-300 cursor-pointer"
              >
                Software
              </button>
              <span className="text-outline-variant/30 text-[10px] select-none">◆</span>
              <button
                onClick={() => onSectionChange?.('experience')}
                className="font-sans text-[12px] uppercase tracking-[0.15em] text-on-surface-variant/50 hover:text-primary transition-colors duration-300 cursor-pointer"
              >
                Leadership
              </button>
            </div>
          </div>

          {/* Right: Name in uppercase mono */}
          <span className="font-mono text-[12px] uppercase tracking-[0.35em] text-on-surface-variant/40 text-right hidden md:block self-center">
            ARYA SHARAN
          </span>
        </div>

        {/* Divider */}
        <div className="section-divider" />

        {/* Bottom Row: Copyright + Contact + Socials */}
        <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[13px] font-sans text-on-surface-variant/60">
          <span className="text-on-surface-variant/40">© Arya Sharan</span>
          <span className="text-outline-variant/25 hidden md:inline select-none">·</span>

          <a
            href="mailto:aryasharan47@gmail.com"
            className="hover:text-primary transition-colors duration-300"
          >
            aryasharan47@gmail.com
          </a>
          <span className="text-outline-variant/25 hidden md:inline select-none">·</span>

          <a
            href="tel:+919110648489"
            className="hover:text-primary transition-colors duration-300 whitespace-nowrap"
          >
            +91 91106 48489
          </a>
          <span className="text-outline-variant/25 hidden md:inline select-none">·</span>

          <a
            href="https://www.linkedin.com/in/arya-sharan-516319200/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors duration-300"
          >
            LinkedIn
          </a>
          <span className="text-outline-variant/25 hidden md:inline select-none">·</span>

          <a
            href="https://github.com/Aryakuna14"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors duration-300"
          >
            GitHub
          </a>
          <span className="text-outline-variant/25 hidden md:inline select-none">·</span>

          <a
            href="https://www.instagram.com/axya1_7"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors duration-300"
          >
            Instagram
          </a>
          <span className="text-outline-variant/25 hidden md:inline select-none">·</span>

          <a
            href="https://www.instagram.com/lowwkey.shop/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors duration-300 flex items-center gap-1.5 border border-outline-variant/20 rounded-md px-2.5 py-0.5 font-mono text-[11px] text-on-surface-variant/50 hover:border-primary/40 hover:text-primary"
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
