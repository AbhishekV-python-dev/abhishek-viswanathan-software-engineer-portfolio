import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  Phone,
  Mail,
  Linkedin,
  Github,
  MapPin,
  Check,
  Copy,
  ChevronDown,
  Sparkles,
  Terminal,
  Code2,
  Database,
  Briefcase,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Card3D } from './Card3D';
import { RESUME_DATA } from '../data/resumeData';
import { soundFX } from '../utils/audio';

interface HeroProps {
  onOpenResumeModal: () => void;
  onToggleTerminal: () => void;
  onOpenChatBot: () => void;
  activeTheme: 'emerald' | 'cyan' | 'violet' | 'amber';
}

export const Hero: React.FC<HeroProps> = ({
  onOpenResumeModal,
  onToggleTerminal,
  onOpenChatBot,
  activeTheme
}) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [dubaiTime, setDubaiTime] = useState('');

  // Role switching animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % RESUME_DATA.personalInfo.titles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Dubai GMT+4 live clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Dubai',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setDubaiTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    soundFX.playSuccess();

    // Trigger confetti burst
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#10B981', '#06B6D4', '#8B5CF6', '#F59E0B']
    });

    setTimeout(() => {
      setCopiedField(null);
    }, 2500);
  };

  const getThemeGradient = () => {
    switch (activeTheme) {
      case 'cyan': return 'from-cyan-400 via-teal-300 to-blue-500';
      case 'violet': return 'from-violet-400 via-purple-300 to-indigo-500';
      case 'amber': return 'from-amber-400 via-yellow-300 to-orange-500';
      default: return 'from-emerald-400 via-teal-300 to-cyan-500';
    }
  };

  const getThemeGlow = () => {
    switch (activeTheme) {
      case 'cyan': return 'shadow-[0_0_30px_rgba(6,182,212,0.3)] border-cyan-500/40';
      case 'violet': return 'shadow-[0_0_30px_rgba(139,92,246,0.3)] border-violet-500/40';
      case 'amber': return 'shadow-[0_0_30px_rgba(245,158,11,0.3)] border-amber-500/40';
      default: return 'shadow-[0_0_30px_rgba(16,185,129,0.3)] border-emerald-500/40';
    }
  };

  return (
    <section id="summary" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Top Status & Time Pill */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap items-center justify-between gap-3 mb-10 border-b border-white/10 pb-4"
      >
        <div className="flex items-center space-x-3 text-[10px] uppercase tracking-[0.2em] font-mono text-white/50">
          <span className="inline-flex items-center gap-1.5 border border-white/20 px-3 py-1 rounded-full text-white/80 font-medium bg-white/5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
            </span>
            Available for Engineering Roles
          </span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span className="hidden sm:inline text-white/60">Dubai, UAE</span>
        </div>

        <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-white/50 bg-white/5 px-3.5 py-1 rounded-full border border-white/10">
          <MapPin className="h-3 w-3 text-white/60" />
          <span>Dubai (GST): <strong className="text-white font-normal">{dubaiTime || '17:42 GST'}</strong></span>
        </div>
      </motion.div>

      {/* Hero Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Name & Role */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="text-[10px] uppercase tracking-[0.3em] font-mono text-white/40 mb-3">
              Portfolio 2026 — Abhishek Viswanathan
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-light leading-[1.1] text-white tracking-tight">
              Engineering with <span className="italic font-serif font-normal text-white/90">dimension</span>.
            </h1>
          </motion.div>

          {/* Animated Dynamic Role Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-10 flex items-center"
          >
            <span className="text-sm font-mono text-white/40 uppercase tracking-widest mr-3">Specializing in:</span>
            <motion.span
              key={roleIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-base sm:text-lg font-mono font-medium text-white border-b border-white/40 pb-0.5"
            >
              {RESUME_DATA.personalInfo.titles[roleIndex]}
            </motion.span>
          </motion.div>

          {/* Bio Brief */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/60 text-sm leading-relaxed max-w-xl font-normal"
          >
            Bridging the gap between software engineering, scalable backend architecture, and production support in Dubai. Expert in Python, Flask, REST APIs, PostgreSQL, Supabase, and Role-Based Access Control (RBAC).
          </motion.p>

          {/* Left-Accent Minimalist Status Blocks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="space-y-4 pt-2"
          >
            <div className="border-l-2 border-white/20 pl-4">
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-0.5 font-mono">Current Role</p>
              <p className="text-xs font-semibold text-white">Freelance Software Engineer @ Prime Rides Cars Trading LLC</p>
              <p className="text-[11px] text-white/50">Architecting automotive CRM APIs, inventory, and EMI financial modules in Dubai.</p>
            </div>

            <div className="border-l-2 border-white/20 pl-4">
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-0.5 font-mono">Core Technologies</p>
              <div className="flex flex-wrap gap-2 mt-1.5">
                <span className="text-[9px] bg-white/5 px-2.5 py-1 border border-white/10 rounded font-mono uppercase text-white/80">PYTHON</span>
                <span className="text-[9px] bg-white/5 px-2.5 py-1 border border-white/10 rounded font-mono uppercase text-white/80">FLASK</span>
                <span className="text-[9px] bg-white/5 px-2.5 py-1 border border-white/10 rounded font-mono uppercase text-white/80">POSTGRESQL</span>
                <span className="text-[9px] bg-white/5 px-2.5 py-1 border border-white/10 rounded font-mono uppercase text-white/80">SUPABASE</span>
                <span className="text-[9px] bg-white/5 px-2.5 py-1 border border-white/10 rounded font-mono uppercase text-white/80">RBAC AUTH</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Contact & Copy Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-3 pt-2"
          >
            {/* Copy Email */}
            <button
              onClick={() => handleCopy(RESUME_DATA.personalInfo.email, 'email')}
              className="flex items-center space-x-2 rounded-full border border-white/10 bg-white/5 hover:border-white/30 px-3.5 py-1.5 text-xs font-mono text-white/70 hover:text-white transition-all"
            >
              <Mail className="h-3.5 w-3.5 text-white/50" />
              <span>{RESUME_DATA.personalInfo.email}</span>
              {copiedField === 'email' ? <Check className="h-3.5 w-3.5 text-white" /> : <Copy className="h-3.5 w-3.5 text-white/30" />}
            </button>

            {/* Copy Phone */}
            <button
              onClick={() => handleCopy(RESUME_DATA.personalInfo.phone, 'phone')}
              className="flex items-center space-x-2 rounded-full border border-white/10 bg-white/5 hover:border-white/30 px-3.5 py-1.5 text-xs font-mono text-white/70 hover:text-white transition-all"
            >
              <Phone className="h-3.5 w-3.5 text-white/50" />
              <span>{RESUME_DATA.personalInfo.phone}</span>
              {copiedField === 'phone' ? <Check className="h-3.5 w-3.5 text-white" /> : <Copy className="h-3.5 w-3.5 text-white/30" />}
            </button>

            {/* Social Links */}
            <a
              href={RESUME_DATA.personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 rounded-full border border-white/10 bg-white/5 hover:border-white/30 px-3.5 py-1.5 text-xs font-mono text-white/70 hover:text-white transition-all"
            >
              <Linkedin className="h-3.5 w-3.5 text-white/50" />
              <span>LinkedIn</span>
            </a>

            <a
              href={RESUME_DATA.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 rounded-full border border-white/10 bg-white/5 hover:border-white/30 px-3.5 py-1.5 text-xs font-mono text-white/70 hover:text-white transition-all"
            >
              <Github className="h-3.5 w-3.5 text-white/50" />
              <span>GitHub</span>
            </a>
          </motion.div>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-3 pt-4"
          >
            <button
              onClick={() => {
                soundFX.playClick();
                onOpenChatBot();
              }}
              className="px-6 py-3 border border-emerald-500/40 rounded-full text-[10px] uppercase tracking-widest bg-emerald-500/10 text-white hover:bg-white hover:text-black transition-all font-mono flex items-center gap-2 shadow-lg"
            >
              <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
              <span>Ask AI Assistant</span>
            </button>

            <button
              onClick={() => {
                soundFX.playClick();
                onOpenResumeModal();
              }}
              className="px-6 py-3 border border-white/30 rounded-full text-[10px] uppercase tracking-widest bg-white text-black font-semibold hover:bg-white/90 transition-colors shadow-lg"
            >
              Download CV
            </button>

            <button
              onClick={() => {
                soundFX.playClick();
                onToggleTerminal();
              }}
              className="px-6 py-3 border border-white/20 rounded-full text-[10px] uppercase tracking-widest text-white/80 hover:bg-white hover:text-black transition-colors font-mono flex items-center gap-2"
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>Recruiter CLI</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: 3D Interactive Highlight Cards */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Card 1: Experience */}
          <Card3D depth={25} className="bg-[#111111] border-white/10">
            <div className="flex items-start justify-between">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white">
                <Briefcase className="h-4 w-4" />
              </div>
              <span className="text-[9px] font-mono uppercase tracking-wider text-white/40 border border-white/10 px-2 py-0.5 rounded">
                Dubai, UAE
              </span>
            </div>
            <h3 className="mt-4 text-xs font-mono font-bold text-white uppercase tracking-wider">
              Freelance Engineer
            </h3>
            <p className="text-[11px] text-white/50 font-mono mt-0.5">
              Prime Rides Cars Trading
            </p>
            <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/40 font-mono">
              <span>May 2026 – Present</span>
              <span className="text-white/80 font-medium">CRM & EMI</span>
            </div>
          </Card3D>

          {/* Card 2: Core Engineering */}
          <Card3D depth={25} className="bg-[#111111] border-white/10">
            <div className="flex items-start justify-between">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white">
                <Code2 className="h-4 w-4" />
              </div>
              <span className="text-[9px] font-mono uppercase tracking-wider text-white/40 border border-white/10 px-2 py-0.5 rounded">
                Stack
              </span>
            </div>
            <h3 className="mt-4 text-xs font-mono font-bold text-white uppercase tracking-wider">
              Python & Backend
            </h3>
            <p className="text-[11px] text-white/50 font-mono mt-0.5">
              Flask, REST, Supabase
            </p>
            <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/40 font-mono">
              <span>PostgreSQL / SQL</span>
              <span className="text-white/80 font-medium">RBAC Auth</span>
            </div>
          </Card3D>

          {/* Card 3: Education */}
          <Card3D depth={25} className="bg-[#111111] border-white/10">
            <div className="flex items-start justify-between">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white">
                <Database className="h-4 w-4" />
              </div>
              <span className="text-[9px] font-mono uppercase tracking-wider text-white/40 border border-white/10 px-2 py-0.5 rounded">
                Degree
              </span>
            </div>
            <h3 className="mt-4 text-xs font-mono font-bold text-white uppercase tracking-wider">
              B.E. Comp Science
            </h3>
            <p className="text-[11px] text-white/50 font-mono mt-0.5">
              Nehru Inst. Tech
            </p>
            <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/40 font-mono">
              <span>2020 – 2024</span>
              <span className="text-white/80 font-medium">CGPA: 7.8</span>
            </div>
          </Card3D>

          {/* Card 4: Certifications */}
          <Card3D depth={25} className="bg-[#111111] border-white/10">
            <div className="flex items-start justify-between">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-[9px] font-mono uppercase tracking-wider text-white/40 border border-white/10 px-2 py-0.5 rounded">
                Certs
              </span>
            </div>
            <h3 className="mt-4 text-xs font-mono font-bold text-white uppercase tracking-wider">
              3 Professional Certs
            </h3>
            <p className="text-[11px] text-white/50 font-mono mt-0.5">
              GenAI, Python Pro, DSA
            </p>
            <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/40 font-mono">
              <span>100+ Projects</span>
              <span className="text-white/80 font-medium">RAG & LLM</span>
            </div>
          </Card3D>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mt-16 flex flex-col items-center justify-center text-slate-500 text-xs font-mono"
      >
        <span>Scroll down to explore experience & live APIs</span>
        <ChevronDown className="h-4 w-4 mt-1 text-emerald-400" />
      </motion.div>
    </section>
  );
};
