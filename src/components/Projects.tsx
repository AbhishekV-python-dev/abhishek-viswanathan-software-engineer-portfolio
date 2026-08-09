import React from 'react';
import { motion } from 'motion/react';
import {
  Code2,
  CheckCircle2,
  Clock,
  Terminal,
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { Card3D } from './Card3D';

interface ProjectsProps {
  activeTheme: 'emerald' | 'cyan' | 'violet' | 'amber';
}

export const Projects: React.FC<ProjectsProps> = () => {
  return (
    <section id="projects" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-2 flex items-center gap-2"
        >
          <Code2 className="h-3.5 w-3.5" />
          <span>Featured Technical Projects</span>
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
          Software Architecture & <span className="italic font-serif">Systems</span>
        </h2>
        <p className="mt-3 text-white/60 text-xs sm:text-sm max-w-2xl font-mono">
          Full-stack web applications, RESTful services, ORM database schemas, and Python backends.
        </p>
      </div>

      {/* Projects Showcase Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {RESUME_DATA.projects.map((project, idx) => {
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <Card3D
                depth={20}
                className="bg-[#111111] border border-white/10 hover:border-white/20 p-6 sm:p-8 h-full flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono uppercase bg-white/5 text-white border border-white/20 px-3 py-1 rounded-full tracking-wider">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-white/40 flex items-center gap-1">
                      <Clock className="h-3 w-3 text-white/30" />
                      {project.period}
                    </span>
                  </div>

                  <h3 className="text-xl font-light text-white font-mono mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs text-white/70 leading-relaxed font-sans mb-4">
                    {project.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {project.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start space-x-2 text-xs text-white/80">
                        <CheckCircle2 className="h-3.5 w-3.5 text-white flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono uppercase bg-[#050505] text-white/60 border border-white/10 px-2.5 py-1 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 flex items-center justify-between text-xs font-mono">
                    <span className="text-white/60 flex items-center gap-1.5 font-semibold text-[11px] uppercase tracking-wider">
                      <Terminal className="h-3.5 w-3.5 text-white/40" />
                      {project.apiEndpoints?.length || 0} Key Endpoints Architected
                    </span>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                      Production Architecture
                    </span>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
};

