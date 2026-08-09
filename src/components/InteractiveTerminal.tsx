import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, X, Send, CornerDownLeft, Sparkles, Check } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { soundFX } from '../utils/audio';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResumeModal: () => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export const InteractiveTerminal: React.FC<TerminalProps> = ({
  isOpen,
  onClose,
  onOpenResumeModal
}) => {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: 'init-1',
      command: 'sysinfo --guide',
      output: (
        <div className="text-xs space-y-2.5 text-white/70 font-mono">
          <p className="text-white font-bold tracking-wider uppercase flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            ABHISHEK VISWANATHAN — RECRUITER CLI
          </p>
          <p className="text-white/60">
            Welcome, Recruiter! System initialized with full candidate profile data for Abhishek (Software Engineer & Python Developer based in Dubai, UAE).
          </p>
          
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-2 my-1">
            <p className="text-white font-bold text-[11px] uppercase tracking-wider">
              Recruiter Quick Command Guide:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
              <div><strong className="text-white">summary</strong> — Brief candidate profile</div>
              <div><strong className="text-white">experience</strong> — UAE Freelance engineering</div>
              <div><strong className="text-white">skills</strong> — Python, Flask, SQL, React stack</div>
              <div><strong className="text-white">projects</strong> — Full-stack web applications</div>
              <div><strong className="text-white">education</strong> — B.E. CSE Degree & Certs</div>
              <div><strong className="text-white">contact</strong> — Phone, Email & Dubai info</div>
              <div><strong className="text-white">resume</strong> — View/Download Resume PDF</div>
              <div><strong className="text-white">clear</strong> — Reset CLI console output</div>
            </div>
          </div>

          <p className="text-white/40 text-[11px]">
            Click any command pill below or type your query in the terminal input:
          </p>
        </div>
      ),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs, isOpen]);

  const executeCommandString = (cmd: string) => {
    if (!cmd.trim()) return;

    soundFX.playClick();
    const lowerCmd = cmd.trim().toLowerCase();

    let outputContent: React.ReactNode;

    if (lowerCmd === 'help') {
      outputContent = (
        <div className="text-xs font-mono space-y-1 text-white/70">
          <p className="text-white font-bold uppercase tracking-wider">Available Commands:</p>
          <p><span className="text-white font-bold">summary</span> — View professional summary statement</p>
          <p><span className="text-white font-bold">experience</span> — View Prime Rides UAE freelance experience</p>
          <p><span className="text-white font-bold">skills</span> — List technical skills & tech stack</p>
          <p><span className="text-white font-bold">projects</span> — View Cafes WiFi Finder & SHG Portal projects</p>
          <p><span className="text-white font-bold">education</span> — View B.E. CSE degree & certifications</p>
          <p><span className="text-white font-bold">contact</span> — Display phone, email & Dubai location</p>
          <p><span className="text-white font-bold">resume</span> — Open full printable resume PDF modal</p>
          <p><span className="text-white font-bold">clear</span> — Clear terminal logs</p>
        </div>
      );
    } else if (lowerCmd === 'clear') {
      setLogs([]);
      return;
    } else if (lowerCmd === 'resume') {
      onOpenResumeModal();
      outputContent = <p className="text-xs text-white font-mono uppercase tracking-wider">Opening full resume PDF modal view...</p>;
    } else if (lowerCmd === 'summary') {
      outputContent = <p className="text-xs text-white/70 font-sans leading-relaxed">{RESUME_DATA.summary}</p>;
    } else if (lowerCmd === 'experience') {
      outputContent = (
        <div className="text-xs font-mono space-y-1 text-white/70">
          <p className="text-white font-bold uppercase">{RESUME_DATA.experience[0].role} @ {RESUME_DATA.experience[0].company}</p>
          <p className="text-white/40">{RESUME_DATA.experience[0].location} ({RESUME_DATA.experience[0].period})</p>
          <ul className="list-disc pl-4 space-y-1 text-white/70 pt-1 font-sans">
            {RESUME_DATA.experience[0].bullets.map((b, idx) => (
              <li key={idx}>{b}</li>
            ))}
          </ul>
        </div>
      );
    } else if (lowerCmd === 'skills') {
      outputContent = (
        <div className="text-xs font-mono space-y-2 text-white/70">
          {RESUME_DATA.skillCategories.map((sc) => (
            <div key={sc.category}>
              <span className="text-white font-bold uppercase">{sc.category}: </span>
              <span>{sc.skills.map((s) => s.name).join(', ')}</span>
            </div>
          ))}
        </div>
      );
    } else if (lowerCmd === 'projects') {
      outputContent = (
        <div className="text-xs font-mono space-y-2 text-white/70">
          {RESUME_DATA.projects.map((p) => (
            <div key={p.id} className="border-b border-white/10 pb-2">
              <p className="text-white font-bold uppercase">{p.title} ({p.period})</p>
              <p className="text-white/60 font-sans">{p.description}</p>
              <p className="text-white/40 text-[11px]">Tech: {p.tech.join(', ')}</p>
            </div>
          ))}
        </div>
      );
    } else if (lowerCmd === 'education') {
      outputContent = (
        <div className="text-xs font-mono space-y-1 text-white/70">
          <p><strong className="text-white">Degree:</strong> {RESUME_DATA.education.degree}</p>
          <p><strong className="text-white">Institution:</strong> {RESUME_DATA.education.institution} ({RESUME_DATA.education.period})</p>
          <p><strong className="text-white">CGPA:</strong> {RESUME_DATA.education.cgpa} / 10</p>
          <p className="text-white/40 pt-1 font-bold uppercase">Certifications:</p>
          {RESUME_DATA.certifications.map((c, i) => (
            <p key={i}>• {c.title} — {c.provider} ({c.date})</p>
          ))}
        </div>
      );
    } else if (lowerCmd === 'contact') {
      outputContent = (
        <div className="text-xs font-mono space-y-1 text-white/70">
          <p><strong className="text-white/40">Name:</strong> {RESUME_DATA.personalInfo.name}</p>
          <p><strong className="text-white/40">Phone:</strong> {RESUME_DATA.personalInfo.phone}</p>
          <p><strong className="text-white/40">Email:</strong> {RESUME_DATA.personalInfo.email}</p>
          <p><strong className="text-white/40">Location:</strong> {RESUME_DATA.personalInfo.location}</p>
        </div>
      );
    } else if (lowerCmd.includes('location') || lowerCmd.includes('where') || lowerCmd.includes('dubai')) {
      outputContent = <p className="text-xs text-white/70 font-mono">Abhishek is based in <strong className="text-white">Dubai, United Arab Emirates</strong> (DOB: 08 Oct 2002) and is available for full-time software engineering roles in UAE and remotely.</p>;
    } else if (lowerCmd.includes('flask') || lowerCmd.includes('python') || lowerCmd.includes('backend')) {
      outputContent = <p className="text-xs text-white/70 font-mono">Yes! Python & Flask are Abhishek's core primary technologies. He has built REST APIs, SQLAlchemy ORM databases, RBAC authentication systems, and full-stack web portals using Python.</p>;
    } else {
      outputContent = (
        <p className="text-xs text-white/70 font-mono">
          Command or query received: "<span className="text-white">{cmd}</span>". Click any button above or type <strong className="text-white">help</strong> for options.
        </p>
      );
    }

    setLogs((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        command: cmd,
        output: outputContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const cmd = inputVal.trim();
    setInputVal('');
    executeCommandString(cmd);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[92vw] sm:w-[480px] h-[500px] rounded-2xl border border-white/10 bg-[#0A0A0A]/95 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#111111] px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-mono text-white/60">
              <TerminalIcon className="h-4 w-4 text-emerald-400" />
              <span className="font-bold text-white tracking-wider">abhishek@profile-cli:~</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Recruiter Shortcut Chips */}
          <div className="bg-[#050505] px-3 py-2 border-b border-white/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar font-mono text-[10px]">
            {['summary', 'experience', 'skills', 'projects', 'education', 'contact', 'resume', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommandString(cmd)}
                className="px-2.5 py-1 rounded-md bg-[#141414] hover:bg-white hover:text-black border border-white/10 text-white/80 font-bold uppercase transition-all whitespace-nowrap flex-shrink-0"
              >
                ${cmd}
              </button>
            ))}
          </div>

          {/* Logs Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-xs">
            {logs.map((log) => (
              <div key={log.id} className="space-y-1">
                <div className="flex items-center space-x-2 text-white/60">
                  <span>$</span>
                  <span className="font-bold text-white">{log.command}</span>
                  <span className="text-[10px] text-white/30 ml-auto">{log.timestamp}</span>
                </div>
                <div className="pl-3 border-l border-white/10 pt-0.5">
                  {log.output}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleCommand} className="p-3 bg-[#111111] border-t border-white/10 flex items-center space-x-2">
            <span className="text-white/60 font-mono text-xs font-bold pl-1">$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type command (e.g. help, skills, resume)..."
              className="flex-1 bg-transparent text-xs font-mono text-white placeholder-white/30 focus:outline-none"
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-white text-black hover:bg-white/90 font-bold transition-all"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
