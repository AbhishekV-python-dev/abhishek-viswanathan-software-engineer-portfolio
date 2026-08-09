import React from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  MapPin,
  Calendar,
  CheckCircle2,
  Building2,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { Card3D } from './Card3D';

interface ExperienceProps {
  activeTheme: 'emerald' | 'cyan' | 'violet' | 'amber';
}

export const Experience: React.FC<ExperienceProps> = () => {
  const exp = RESUME_DATA.experience[0];

  return (
    <section id="experience" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-2 flex items-center gap-2"
        >
          <Briefcase className="h-3.5 w-3.5" />
          <span>Professional Career</span>
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
          Commercial Experience & <span className="italic font-serif">Engineering</span>
        </h2>
        <p className="mt-3 text-white/60 text-xs sm:text-sm max-w-2xl font-mono">
          Freelance software engineering for UAE client commercial platforms & automotive software systems.
        </p>
      </div>

      {/* Main Experience Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Card3D depth={15} className="bg-[#111111] border-white/10 p-6 sm:p-8">
          
          {/* Company & Role Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase bg-white/5 border border-white/20 text-white px-3 py-1 rounded-full tracking-wider">
                  Commercial Freelance Role
                </span>
                <span className="text-[10px] font-mono border border-white/10 text-white/60 px-3 py-1 rounded-full uppercase tracking-wider">
                  Dubai, UAE
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-light text-white font-mono mt-2">
                {exp.role}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/60 mt-2">
                <span className="flex items-center gap-1.5 text-white font-medium">
                  <Building2 className="h-3.5 w-3.5 text-white/50" />
                  {exp.company}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-white/30" />
                  {exp.location}
                </span>
                <span className="flex items-center gap-1.5 text-white font-mono">
                  <Calendar className="h-3.5 w-3.5 text-white/50" />
                  {exp.period}
                </span>
              </div>
            </div>
          </div>

          {/* Key Deliverables Bullet Points */}
          <div className="mt-6 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase text-white/40 tracking-widest flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-white/60" />
              Core Responsibilities & Technical Contributions
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {exp.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start space-x-3 bg-white/5 p-3.5 rounded-lg border border-white/10">
                  <CheckCircle2 className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-white/80 leading-relaxed font-sans">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Technologies & Modules Tag Cloud */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <h4 className="text-[10px] font-mono font-bold uppercase text-white/40 mb-3 tracking-widest">
              Automotive System Capabilities & Domain Features:
            </h4>
            <div className="flex flex-wrap gap-2">
              {exp.crmModules?.map((mod) => (
                <span
                  key={mod}
                  className="text-[10px] font-mono bg-white/5 border border-white/10 text-white/80 px-3 py-1.5 rounded flex items-center gap-1.5 transition-all uppercase tracking-wider"
                >
                  <ChevronRight className="h-3 w-3 text-white/50" />
                  {mod}
                </span>
              ))}
            </div>
          </div>

        </Card3D>
      </motion.div>

    </section>
  );
};

