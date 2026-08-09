import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  VolumeX,
  Palette,
  Terminal,
  FileText,
  Send,
  Menu,
  X,
  Sparkles,
  MapPin,
  MessageSquare
} from 'lucide-react';
import { soundFX } from '../utils/audio';

interface NavbarProps {
  activeTheme: 'emerald' | 'cyan' | 'violet' | 'amber';
  onSelectTheme: (theme: 'emerald' | 'cyan' | 'violet' | 'amber') => void;
  onOpenResumeModal: () => void;
  onToggleTerminal: () => void;
  onOpenChatBot: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTheme,
  onSelectTheme,
  onOpenResumeModal,
  onToggleTerminal,
  onOpenChatBot,
  activeSection
}) => {
  const [soundEnabled, setSoundEnabled] = useState(soundFX.isEnabled());
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundFX.setEnabled(nextState);
  };

  const navLinks = [
    { name: 'Summary', href: '#summary' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  const themeOptions: { id: 'emerald' | 'cyan' | 'violet' | 'amber'; label: string; colorClass: string }[] = [
    { id: 'emerald', label: 'Python Emerald', colorClass: 'bg-emerald-500' },
    { id: 'cyan', label: 'Cyber Cyan', colorClass: 'bg-cyan-500' },
    { id: 'violet', label: 'GenAI Violet', colorClass: 'bg-violet-500' },
    { id: 'amber', label: 'Support Amber', colorClass: 'bg-amber-500' }
  ];

  const getThemeTextGlow = () => {
    switch (activeTheme) {
      case 'cyan': return 'text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]';
      case 'violet': return 'text-violet-400 drop-shadow-[0_0_12px_rgba(139,92,246,0.5)]';
      case 'amber': return 'text-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]';
      default: return 'text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.5)]';
    }
  };

  const getThemeBadgeBorder = () => {
    switch (activeTheme) {
      case 'cyan': return 'border-cyan-500/40 bg-cyan-950/30 text-cyan-300';
      case 'violet': return 'border-violet-500/40 bg-violet-950/30 text-violet-300';
      case 'amber': return 'border-amber-500/40 bg-amber-950/30 text-amber-300';
      default: return 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3">
      <nav className="max-w-screen-xl mx-auto flex items-center justify-between border border-white/10 bg-[#050505]/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-2xl transition-all duration-300">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#summary"
            onClick={() => soundFX.playClick()}
            className="group flex flex-col focus:outline-none"
          >
            <span className="text-sm font-bold tracking-tight uppercase text-white group-hover:text-white/80 transition-colors leading-tight">
              ABHISHEK
            </span>
            <span className="text-sm font-bold tracking-tight uppercase text-white group-hover:text-white/80 transition-colors leading-tight">
              VISWANATHAN
            </span>
            <span className="text-[9px] text-white/40 uppercase tracking-[0.25em] mt-0.5 font-mono hidden sm:block">
              SOFTWARE ENGINEER — 2026
            </span>
          </a>

          {/* Location Badge */}
          <div className="hidden xl:flex items-center gap-1 border border-white/10 bg-white/5 rounded-full px-2.5 py-1 text-[9px] uppercase tracking-widest font-mono text-white/60">
            <span className="relative flex h-1.5 w-1.5 mr-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
            </span>
            <MapPin className="h-2.5 w-2.5 text-white/40" />
            <span>Dubai, UAE</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => soundFX.playClick()}
                onMouseEnter={() => soundFX.playHover()}
                className={`relative text-[10px] uppercase tracking-widest transition-colors duration-200 whitespace-nowrap ${
                  isActive
                    ? 'text-white font-semibold border-b border-white pb-0.5'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Action Controls & Utilities */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* AI Chat Bot Button */}
          <button
            onClick={() => {
              soundFX.playClick();
              onOpenChatBot();
            }}
            title="Ask AI Assistant about Abhishek"
            className="flex items-center gap-1 px-2.5 py-1.5 border border-white/20 rounded-full text-[9px] uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all bg-white/5 font-mono"
          >
            <MessageSquare className="h-3 w-3 text-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>

          {/* Interactive Terminal Drawer Trigger */}
          <button
            onClick={() => {
              soundFX.playClick();
              onToggleTerminal();
            }}
            title="Open Recruiter CLI Assistant"
            className="flex items-center gap-1 px-2.5 py-1.5 border border-white/20 rounded-full text-[9px] uppercase tracking-widest text-white/80 hover:bg-white hover:text-black transition-colors"
          >
            <Terminal className="h-3 w-3" />
            <span className="hidden md:inline font-mono">CLI</span>
          </button>

          {/* Theme Color Picker */}
          <div className="relative">
            <button
              onClick={() => {
                soundFX.playClick();
                setShowThemePicker(!showThemePicker);
              }}
              title="Customize Accent Theme"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 hover:bg-white hover:text-black transition-colors"
            >
              <Palette className="h-3 w-3" />
            </button>

            <AnimatePresence>
              {showThemePicker && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="absolute right-0 mt-2 w-48 rounded-xl border border-white/20 bg-[#111111]/95 backdrop-blur-xl p-2 shadow-2xl z-50"
                >
                  <div className="px-3 py-1.5 text-[10px] font-mono font-semibold uppercase tracking-widest text-white/40 border-b border-white/10 flex items-center justify-between">
                    <span>Theme Accent</span>
                    <Sparkles className="h-3 w-3 text-white/60" />
                  </div>
                  <div className="mt-1 space-y-1">
                    {themeOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          soundFX.playClick();
                          onSelectTheme(opt.id);
                          setShowThemePicker(false);
                        }}
                        className={`w-full flex items-center space-x-2.5 rounded-lg px-2.5 py-1.5 text-xs font-mono transition-colors ${
                          activeTheme === opt.id
                            ? 'bg-white/15 text-white font-semibold'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span className={`h-2 w-2 rounded-full ${opt.colorClass}`} />
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Mute Sound FX' : 'Enable Interactive Sound FX'}
            className={`flex h-7 w-7 items-center justify-center rounded-full border transition-colors ${
              soundEnabled
                ? 'border-white/40 bg-white/10 text-white'
                : 'border-white/10 bg-white/5 text-white/40 hover:text-white'
            }`}
          >
            {soundEnabled ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
          </button>

          {/* Resume Modal Trigger Button */}
          <button
            onClick={() => {
              soundFX.playClick();
              onOpenResumeModal();
            }}
            className="hidden md:inline-flex px-3 py-1.5 border border-white/20 rounded-full text-[9px] uppercase tracking-widest text-white/90 hover:bg-white hover:text-black transition-colors whitespace-nowrap"
          >
            Download CV
          </button>

          {/* Quick Contact Link Button */}
          <a
            href="#contact"
            onClick={() => soundFX.playClick()}
            className="hidden lg:inline-flex items-center gap-1 px-3 py-1.5 bg-white text-black font-semibold rounded-full text-[9px] uppercase tracking-widest hover:bg-white/90 transition-colors shadow-lg whitespace-nowrap"
          >
            <Send className="h-3 w-3" />
            <span>Contact</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              soundFX.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="flex lg:hidden h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white"
          >
            {mobileMenuOpen ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-2 rounded-2xl border border-slate-800 bg-slate-950/95 backdrop-blur-2xl p-4 shadow-2xl lg:hidden max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    soundFX.playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="rounded-xl bg-slate-900/80 border border-slate-800/80 px-3 py-2.5 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 text-center"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <button
                onClick={() => {
                  soundFX.playClick();
                  onOpenResumeModal();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 rounded-xl bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200"
              >
                <FileText className="h-3.5 w-3.5 text-emerald-400" />
                <span>View Full Resume</span>
              </button>

              <button
                onClick={() => {
                  soundFX.playClick();
                  onToggleTerminal();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-xs font-mono text-emerald-400"
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>Open Terminal</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
