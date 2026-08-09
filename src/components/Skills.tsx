import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  Database,
  Terminal,
  Wrench,
  Search,
  Sparkles,
  Grid,
  Globe,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { Card3D } from './Card3D';
import { soundFX } from '../utils/audio';

interface SkillsProps {
  activeTheme: 'emerald' | 'cyan' | 'violet' | 'amber';
}

export const Skills: React.FC<SkillsProps> = ({ activeTheme }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', ...RESUME_DATA.skillCategories.map((sc) => sc.category)];

  // Filter skills based on selected category and search input
  const filteredSkillCategories = RESUME_DATA.skillCategories
    .map((cat) => {
      if (selectedCategory !== 'All' && cat.category !== selectedCategory) {
        return null;
      }
      const filteredSkills = cat.skills.filter((skill) =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredSkills.length === 0) return null;
      return { ...cat, skills: filteredSkills };
    })
    .filter(Boolean);

  return (
    <section id="skills" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-2 flex items-center gap-2"
        >
          <Code2 className="h-3.5 w-3.5" />
          <span>Technical Competencies</span>
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
          Skills Matrix & <span className="italic font-serif">Toolkit</span>
        </h2>
        <p className="mt-3 text-white/60 text-xs sm:text-sm max-w-2xl font-mono">
          Comprehensive breakdown of programming languages, backend frameworks, databases, support tools, and software engineering methodologies.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-[#111111] p-4 rounded-xl border border-white/10">
        
        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFX.playClick();
                setSelectedCategory(cat);
              }}
              className={`text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-lg border transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-black font-bold border-white shadow-md'
                  : 'bg-[#050505] text-white/60 border-white/10 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40" />
          <input
            type="text"
            placeholder="Search skills (e.g. Flask, RBAC)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#050505] border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs font-mono text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
          />
        </div>
      </div>

      {/* Categorized Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkillCategories.map((catGroup) => {
          if (!catGroup) return null;

          return (
            <motion.div
              key={catGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Card3D depth={15} className="bg-[#111111] border-white/10 p-6 h-full">
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-4 pb-2 border-b border-white/10 flex items-center justify-between">
                  <span>{catGroup.category}</span>
                  <span className="text-[10px] text-white/40 font-normal">
                    {catGroup.skills.length} items
                  </span>
                </h3>

                <div className="flex flex-wrap gap-2">
                  {catGroup.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`text-xs font-mono px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all ${
                        skill.highlight
                          ? 'bg-white/10 border-white/30 text-white font-semibold'
                          : 'bg-[#050505] border-white/10 text-white/70'
                      }`}
                    >
                      {skill.highlight && <CheckCircle2 className="h-3 w-3 text-white flex-shrink-0" />}
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </Card3D>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
};
