import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  CheckCircle2,
  Terminal,
  ShieldCheck,
  Database,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { Card3D } from './Card3D';
import { soundFX } from '../utils/audio';

interface SummaryProps {
  activeTheme: 'emerald' | 'cyan' | 'violet' | 'amber';
}

export const Summary: React.FC<SummaryProps> = ({ activeTheme }) => {
  const [selectedPillar, setSelectedPillar] = useState<number | null>(0);

  const pillars = [
    {
      title: "Backend & RESTful API Engineering",
      icon: Cpu,
      color: "text-emerald-400 bg-emerald-950/60 border-emerald-500/30",
      description: "Designing, building, and deploying scalable REST APIs with Python, Flask, SQLAlchemy ORM, and Postman testing workflows.",
      highlights: ["Flask CRUD APIs", "SQLAlchemy ORM", "JSON API Specifications", "Postman Endpoint Testing"]
    },
    {
      title: "Authentication & Security (RBAC)",
      icon: ShieldCheck,
      color: "text-cyan-400 bg-cyan-950/60 border-cyan-500/30",
      description: "Enforcing enterprise user authorization, Supabase Auth integrations, Flask-Login session controls, and granular role permissions.",
      highlights: ["Supabase Auth", "Role-Based Access Control", "Flask-Login", "JWT & Session Auth"]
    },
    {
      title: "Databases & Relational Design",
      icon: Database,
      color: "text-violet-400 bg-violet-950/60 border-violet-500/30",
      description: "Optimizing PostgreSQL, Supabase, and SQLite schemas to maximize query speed, data integrity, and complex relational mappings.",
      highlights: ["PostgreSQL & Supabase", "Relational Schema Design", "Complex SQL Queries", "SQLite Optimization"]
    },
    {
      title: "Production Support & Maintenance",
      icon: Terminal,
      color: "text-amber-400 bg-amber-950/60 border-amber-500/30",
      description: "Resolving production issues through thorough log analysis, root cause troubleshooting, debugging, and continuous feature updates.",
      highlights: ["Log Analysis", "Root Cause Analysis", "System Monitoring", "Client Requirements Delivery"]
    }
  ];

  return (
    <section id="summary" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-2 flex items-center gap-2"
        >
          <Layers className="h-3.5 w-3.5" />
          <span>Professional Background</span>
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
          Executive Summary & <span className="italic font-serif">Pillars</span>
        </h2>
        <p className="mt-3 text-white/60 text-xs sm:text-sm max-w-2xl font-mono">
          Detailed overview of core competencies, software engineering principles, and backend delivery track record.
        </p>
      </div>

      {/* Main Resume Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <Card3D depth={15} className="bg-[#111111] border-white/10 p-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2.5 rounded-xl bg-white/5 text-white border border-white/10">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-mono uppercase tracking-wider">
                Professional Overview
              </h3>
              <p className="text-xs text-white/40 font-mono">
                B.E. Computer Science Engineering • UAE Client Experience
              </p>
            </div>
          </div>

          <p className="text-white/80 text-sm sm:text-base leading-relaxed font-sans">
            {RESUME_DATA.summary}
          </p>

          <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
            {RESUME_DATA.keyHighlights.map((item, idx) => (
              <div key={idx} className="bg-white/5 p-3 rounded-lg border border-white/10">
                <span className="block text-[9px] font-mono uppercase text-white/40 tracking-wider">{item.label}</span>
                <span className="block text-xs font-mono font-bold text-white mt-1">{item.value}</span>
              </div>
            ))}
          </div>
        </Card3D>
      </motion.div>

      {/* Interactive 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          const isSelected = selectedPillar === index;

          return (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => {
                soundFX.playClick();
                setSelectedPillar(index);
              }}
              className={`rounded-xl border p-6 transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-[#161616] border-white/40 shadow-2xl'
                  : 'bg-[#111111] border-white/10 hover:border-white/20 hover:bg-[#141414]'
              }`}
            >
              <div className="p-2.5 rounded-lg w-fit bg-white/5 border border-white/10 text-white mb-4">
                <Icon className="h-5 w-5" />
              </div>

              <h4 className="text-sm font-bold text-white font-mono mb-2 uppercase tracking-wide">
                {pillar.title}
              </h4>

              <p className="text-xs text-white/50 leading-relaxed mb-4">
                {pillar.description}
              </p>

              <div className="space-y-1.5 pt-3 border-t border-white/10">
                {pillar.highlights.map((h, hIdx) => (
                  <div key={hIdx} className="flex items-center space-x-2 text-[10px] font-mono text-white/70">
                    <CheckCircle2 className="h-3 w-3 text-white flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
