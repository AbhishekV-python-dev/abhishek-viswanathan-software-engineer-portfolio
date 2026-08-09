import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Download, Copy, Check, FileText, Sparkles } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { soundFX } from '../utils/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    soundFX.playClick();
    window.print();
  };

  const handleCopyFullText = () => {
    soundFX.playSuccess();
    const text = `
${RESUME_DATA.personalInfo.name}
${RESUME_DATA.personalInfo.titles.join(' | ')}
${RESUME_DATA.personalInfo.location} | DOB: ${RESUME_DATA.personalInfo.dob}
Phone: ${RESUME_DATA.personalInfo.phone} | Email: ${RESUME_DATA.personalInfo.email}

PROFESSIONAL SUMMARY
${RESUME_DATA.summary}

PROFESSIONAL EXPERIENCE
${RESUME_DATA.experience[0].role} (${RESUME_DATA.experience[0].period})
${RESUME_DATA.experience[0].company} - ${RESUME_DATA.experience[0].location}
${RESUME_DATA.experience[0].bullets.map(b => `- ${b}`).join('\n')}

PROJECTS
${RESUME_DATA.projects.map(p => `${p.title} | ${p.tech.join(', ')} (${p.period})\n${p.bullets.map(b => `- ${b}`).join('\n')}`).join('\n\n')}

TECHNICAL SKILLS
${RESUME_DATA.skillCategories.map(c => `${c.category}: ${c.skills.map(s => s.name).join(', ')}`).join('\n')}

EDUCATION
${RESUME_DATA.education.degree} - ${RESUME_DATA.education.institution} (${RESUME_DATA.education.period})
CGPA: ${RESUME_DATA.education.cgpa}

CERTIFICATIONS
${RESUME_DATA.certifications.map(c => `- ${c.title} (${c.provider}, ${c.date})`).join('\n')}

LANGUAGES
${RESUME_DATA.languages.map(l => `${l.name}: ${l.proficiency}`).join(', ')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#111111] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden my-auto"
        >
          {/* Modal Top Bar */}
          <div className="px-6 py-4 bg-[#050505] border-b border-white/10 flex items-center justify-between print:hidden">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-white/60" />
              <span className="font-mono font-bold text-xs text-white uppercase tracking-wider">
                Abhishek_Viswanathan_Resume.pdf
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopyFullText}
                className="flex items-center space-x-1.5 rounded-lg bg-[#111111] hover:bg-[#181818] border border-white/10 px-3 py-1.5 text-[10px] font-mono text-white/80 uppercase tracking-wider transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-white" /> : <Copy className="h-3.5 w-3.5 text-white/40" />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center space-x-1.5 rounded-lg bg-white hover:bg-white/90 text-black font-bold px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-wider transition-colors"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print / Save PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-[#111111] hover:bg-[#181818] border border-white/10 text-white/40 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Resume Document Canvas (Printable Layout) */}
          <div className="flex-1 p-6 sm:p-12 overflow-y-auto bg-[#080808] font-sans text-white/80 leading-relaxed text-sm print:bg-white print:text-black">
            
            {/* Header / Contact */}
            <div className="text-center border-b border-white/10 pb-6 mb-6">
              <h1 className="text-3xl font-light text-white font-sans tracking-tight uppercase">
                {RESUME_DATA.personalInfo.name}
              </h1>
              <p className="text-xs text-white/60 font-mono mt-1 font-semibold uppercase tracking-wider">
                {RESUME_DATA.personalInfo.titles.join(' | ')}
              </p>
              <p className="text-xs text-white/40 font-sans mt-1">
                {RESUME_DATA.personalInfo.location} | DOB: {RESUME_DATA.personalInfo.dob}
              </p>
              <p className="text-xs font-mono text-white/60 mt-2 space-x-2">
                <span>{RESUME_DATA.personalInfo.phone}</span> •
                <span>{RESUME_DATA.personalInfo.email}</span> •
                <span>LinkedIn</span> •
                <span>GitHub</span>
              </p>
            </div>

            {/* Professional Summary */}
            <div className="mb-6">
              <h2 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/40 border-b border-white/10 pb-1 mb-2">
                Professional Summary
              </h2>
              <p className="text-xs text-white/70 font-sans leading-relaxed">
                {RESUME_DATA.summary}
              </p>
            </div>

            {/* Professional Experience */}
            <div className="mb-6">
              <h2 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/40 border-b border-white/10 pb-1 mb-3">
                Professional Experience
              </h2>
              <div className="space-y-4">
                {RESUME_DATA.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline font-mono text-xs mb-1">
                      <strong className="text-white text-sm uppercase tracking-wide">{exp.role}</strong>
                      <span className="text-white/60">{exp.period}</span>
                    </div>
                    <p className="text-xs font-mono text-white/40 mb-2">
                      {exp.company} — {exp.location}
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-white/70 font-sans">
                      {exp.bullets.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="mb-6">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 border-b border-slate-800 pb-1 mb-3">
                Projects
              </h2>
              <div className="space-y-4">
                {RESUME_DATA.projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-baseline font-mono text-xs mb-1">
                      <strong className="text-white text-sm">{proj.title}</strong>
                      <span className="text-emerald-400">{proj.period}</span>
                    </div>
                    <p className="text-xs font-mono text-cyan-400 mb-2">
                      {proj.tech.join(', ')}
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300 font-sans">
                      {proj.bullets.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Skills */}
            <div className="mb-6">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 border-b border-slate-800 pb-1 mb-3">
                Technical Skills
              </h2>
              <div className="space-y-1.5 text-xs font-mono text-slate-300">
                {RESUME_DATA.skillCategories.map((sc) => (
                  <div key={sc.category}>
                    <strong className="text-white">{sc.category}:</strong>{' '}
                    <span>{sc.skills.map((s) => s.name).join(', ')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mb-6">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 border-b border-slate-800 pb-1 mb-2">
                Education
              </h2>
              <div className="flex justify-between items-baseline font-mono text-xs">
                <div>
                  <strong className="text-white text-sm">{RESUME_DATA.education.institution}</strong>
                  <p className="text-slate-400">{RESUME_DATA.education.degree}</p>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400">{RESUME_DATA.education.period}</span>
                  <p className="text-white font-bold">CGPA: {RESUME_DATA.education.cgpa}</p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="mb-6">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 border-b border-slate-800 pb-1 mb-2">
                Certifications
              </h2>
              <div className="space-y-2 text-xs font-sans text-slate-300">
                {RESUME_DATA.certifications.map((c) => (
                  <div key={c.id}>
                    <div className="flex justify-between font-mono font-semibold text-slate-200">
                      <span>{c.title} — {c.provider}</span>
                      <span className="text-emerald-400">{c.date}</span>
                    </div>
                    <p className="text-slate-400 text-[11px] font-sans">{c.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 border-b border-slate-800 pb-1 mb-2">
                Languages
              </h2>
              <p className="text-xs font-mono text-slate-300">
                {RESUME_DATA.languages.map((l) => `${l.name} (${l.proficiency})`).join(' • ')}
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
