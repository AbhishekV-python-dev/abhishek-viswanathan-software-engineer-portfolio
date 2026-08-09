import React from 'react';
import { ArrowUp, Code2, Heart, ShieldCheck, Terminal } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface FooterProps {
  onOpenResumeModal: () => void;
  onToggleTerminal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResumeModal, onToggleTerminal }) => {
  const scrollToTop = () => {
    soundFX.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#050505] py-10 px-4 sm:px-8 text-white/40 font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand Copyright */}
        <div className="space-y-1 text-center md:text-left">
          <p className="text-white font-medium flex items-center justify-center md:justify-start gap-2 uppercase tracking-wider">
            <span className="font-extrabold text-white">AV.</span>
            <span>Abhishek Viswanathan</span>
          </p>
          <p className="text-[11px] text-white/50">
            Software Engineer • Python Developer • Application Support Engineer
          </p>
          <p className="text-[10px] text-white/30">
            © {new Date().getFullYear()} Abhishek Viswanathan. Dubai, United Arab Emirates.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              soundFX.playClick();
              onOpenResumeModal();
            }}
            className="bg-[#111111] hover:bg-[#161616] border border-white/10 px-3 py-1.5 rounded-lg text-white/70 hover:text-white transition-colors uppercase tracking-wider text-[10px]"
          >
            Resume PDF
          </button>

          <button
            onClick={() => {
              soundFX.playClick();
              onToggleTerminal();
            }}
            className="bg-[#111111] hover:bg-[#161616] border border-white/10 px-3 py-1.5 rounded-lg text-white font-bold flex items-center gap-1.5 transition-colors uppercase tracking-wider text-[10px]"
          >
            <Terminal className="h-3.5 w-3.5 text-white/60" />
            <span>CLI</span>
          </button>

          <button
            onClick={scrollToTop}
            title="Scroll to Top"
            className="bg-[#111111] hover:bg-[#161616] border border-white/10 p-2 rounded-lg text-white/60 hover:text-white transition-colors"
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
