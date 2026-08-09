import React, { useState, useEffect } from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';
import { ThreeCanvas } from './components/ThreeCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Summary } from './components/Summary';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { EducationCertifications } from './components/EducationCertifications';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ResumeModal } from './components/ResumeModal';
import { ChatBot } from './components/ChatBot';
import { soundFX } from './utils/audio';

export default function App() {
  const [activeTheme, setActiveTheme] = useState<'emerald' | 'cyan' | 'violet' | 'amber'>('emerald');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>('summary');
  const [resumeModalOpen, setResumeModalOpen] = useState<boolean>(false);
  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);
  const [chatBotOpen, setChatBotOpen] = useState<boolean>(false);

  // Track scroll depth for WebGL 3D transforms & active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
      }

      const sections = ['summary', 'experience', 'projects', 'skills', 'education', 'contact'];
      const scrollPos = window.scrollY + 300;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F0F0F0] font-sans antialiased selection:bg-white selection:text-black overflow-x-hidden">
      
      {/* Three.js Interactive 3D Scroll Canvas Background */}
      <ThreeCanvas themeAccent={activeTheme} scrollProgress={scrollProgress} />

      {/* Top Navigation Header */}
      <Navbar
        activeTheme={activeTheme}
        onSelectTheme={setActiveTheme}
        onOpenResumeModal={() => setResumeModalOpen(true)}
        onToggleTerminal={() => setTerminalOpen(!terminalOpen)}
        onOpenChatBot={() => setChatBotOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Page Scroll Container */}
      <main className="relative z-10 space-y-8">
        <Hero
          onOpenResumeModal={() => setResumeModalOpen(true)}
          onToggleTerminal={() => setTerminalOpen(true)}
          onOpenChatBot={() => setChatBotOpen(true)}
          activeTheme={activeTheme}
        />

        <Summary activeTheme={activeTheme} />

        <Experience activeTheme={activeTheme} />

        <Projects activeTheme={activeTheme} />

        <Skills activeTheme={activeTheme} />

        <EducationCertifications activeTheme={activeTheme} />

        <ContactSection activeTheme={activeTheme} />
      </main>

      {/* Footer */}
      <Footer
        onOpenResumeModal={() => setResumeModalOpen(true)}
        onToggleTerminal={() => setTerminalOpen(true)}
      />

      {/* Floating AI Assistant Persistent Launcher Button */}
      {!chatBotOpen && (
        <button
          onClick={() => {
            soundFX.playClick();
            setChatBotOpen(true);
          }}
          className="fixed bottom-6 right-6 z-40 flex items-center space-x-2 bg-white text-black hover:bg-white/90 px-4 py-3 rounded-full shadow-2xl border border-white/40 transition-all hover:scale-105 active:scale-95 group font-mono text-xs uppercase tracking-wider"
        >
          <div className="relative flex items-center justify-center">
            <MessageSquare className="h-4 w-4 text-black" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
          </div>
          <span className="font-bold">Ask AI Assistant</span>
          <Sparkles className="h-3.5 w-3.5 text-black/60 group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Interactive AI Portfolio Chat Bot */}
      <ChatBot
        isOpen={chatBotOpen}
        onClose={() => setChatBotOpen(false)}
        onOpenResumeModal={() => setResumeModalOpen(true)}
      />

      {/* Floating Recruiter CLI Assistant */}
      <InteractiveTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onOpenResumeModal={() => setResumeModalOpen(true)}
      />

      {/* Full Resume PDF Preview Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

    </div>
  );
}

