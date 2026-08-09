import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  Languages as LanguagesIcon,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Layers
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { Card3D } from './Card3D';
import { soundFX } from '../utils/audio';

interface EduCertProps {
  activeTheme: 'emerald' | 'cyan' | 'violet' | 'amber';
}

export const EducationCertifications: React.FC<EduCertProps> = ({ activeTheme }) => {
  const [expandedCert, setExpandedCert] = useState<string | null>('python-100days');

  const edu = RESUME_DATA.education;

  return (
    <section id="education" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-2 flex items-center gap-2"
        >
          <GraduationCap className="h-3.5 w-3.5" />
          <span>Academic & Continuous Learning</span>
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
          Education & <span className="italic font-serif">Certifications</span>
        </h2>
        <p className="mt-3 text-white/60 text-xs sm:text-sm max-w-2xl font-mono">
          Degree background in Computer Science Engineering, specialized Udemy professional bootcamps, and multilingual proficiency.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Education Degree Card */}
        <div className="lg:col-span-5 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card3D depth={20} className="bg-[#111111] border-white/10 p-6 sm:p-8 h-full">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2.5 rounded-xl bg-white/5 text-white border border-white/10">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase bg-white/5 border border-white/20 text-white px-2.5 py-0.5 rounded-full tracking-wider">
                    Bachelor Degree
                  </span>
                  <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider mt-1">
                    {edu.degree}
                  </h3>
                </div>
              </div>

              <div className="space-y-2 font-mono text-xs text-white/70 border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/40">Institution:</span>
                  <strong className="text-white">{edu.institution}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40">Duration:</span>
                  <span className="text-white font-bold">{edu.period}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40">Academic CGPA:</span>
                  <strong className="text-white font-extrabold text-sm">{edu.cgpa}</strong>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-[10px] font-mono font-bold uppercase text-white/40 tracking-widest">Key Achievements:</h4>
                {edu.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-white/80">
                    <CheckCircle2 className="h-3.5 w-3.5 text-white flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </Card3D>
          </motion.div>

          {/* Languages Fluency Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card3D depth={15} className="bg-[#111111] border-white/10 p-6">
              <div className="flex items-center space-x-2.5 mb-4">
                <LanguagesIcon className="h-4 w-4 text-white/60" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Language Proficiency</h3>
              </div>

              <div className="space-y-3 font-mono">
                {RESUME_DATA.languages.map((lang) => (
                  <div key={lang.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white font-bold">{lang.name}</span>
                      <span className="text-white/50">{lang.proficiency}</span>
                    </div>
                    <div className="w-full bg-[#050505] h-1.5 rounded-full overflow-hidden border border-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white h-full rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card3D>
          </motion.div>
        </div>

        {/* Right Column: Certifications Accordion List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center space-x-2 text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest mb-2">
            <Award className="h-3.5 w-3.5 text-white/60" />
            <span>Professional Certifications ({RESUME_DATA.certifications.length})</span>
          </div>

          {RESUME_DATA.certifications.map((cert, idx) => {
            const isExpanded = expandedCert === cert.id;

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                  isExpanded ? 'bg-[#161616] border-white/40 shadow-xl' : 'bg-[#111111] border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => {
                    soundFX.playClick();
                    setExpandedCert(isExpanded ? null : cert.id);
                  }}
                  className="w-full p-5 text-left flex items-start justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-[#050505] text-white border border-white/10 mt-0.5">
                      <Award className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 text-[10px] font-mono text-white/50 mb-1 uppercase tracking-wider">
                        <span>{cert.provider}</span>
                        <span>•</span>
                        <span>{cert.date}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white font-mono leading-snug uppercase tracking-wide">
                        {cert.title}
                      </h4>
                    </div>
                  </div>

                  <ChevronDown className={`h-4 w-4 text-white/40 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-white' : ''}`} />
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-5 pb-5 pt-0 border-t border-white/10 font-sans"
                    >
                      <p className="text-xs text-white/70 leading-relaxed mt-3 mb-4">
                        {cert.description}
                      </p>

                      <div className="space-y-1.5">
                        <span className="block text-[10px] font-mono uppercase text-white/40 font-bold mb-1 tracking-widest">
                          Curriculum & Mastery Topics:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {cert.topics.map((topic, tIdx) => (
                            <div key={tIdx} className="flex items-center space-x-2 text-xs font-mono text-white/80 bg-[#050505] p-2 rounded-lg border border-white/10">
                              <CheckCircle2 className="h-3.5 w-3.5 text-white flex-shrink-0" />
                              <span>{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>

    </section>
  );
};
