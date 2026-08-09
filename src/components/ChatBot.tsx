import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  User,
  Bot,
  Trash2,
  ExternalLink,
  Mail,
  FileText,
  Briefcase,
  GraduationCap,
  Code2,
  Check,
  Copy
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { soundFX } from '../utils/audio';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  actions?: {
    label: string;
    action: () => void;
    icon?: React.ReactNode;
  }[];
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResumeModal: () => void;
}

export const ChatBot: React.FC<ChatBotProps> = ({
  isOpen,
  onClose,
  onOpenResumeModal
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `Hello! I'm Abhishek's AI Portfolio Assistant. I can answer any questions about his software engineering experience, Python/Flask expertise, education, Dubai availability, or projects. How can I assist you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actions: [
        {
          label: 'View Resume PDF',
          action: () => onOpenResumeModal(),
          icon: <FileText className="h-3 w-3" />
        }
      ]
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const quickPrompts = [
    'Tell me about Abhishek',
    'What are his core technical skills?',
    'What is his experience at Prime Rides?',
    'What degree and certifications does he hold?',
    'How can I contact him in Dubai?',
    'What projects has he built?'
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(RESUME_DATA.personalInfo.email);
    setCopiedEmail(true);
    soundFX.playSuccess();
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const generateBotResponse = (query: string): { text: string; actions?: Message['actions'] } => {
    const q = query.toLowerCase();

    // Contact / Phone / Email / Dubai location
    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('dubai') || q.includes('reach') || q.includes('location')) {
      return {
        text: `Abhishek is currently based in **Dubai, United Arab Emirates** (GST • UTC+4).\n\n• **Direct Email:** ${RESUME_DATA.personalInfo.email}\n• **Phone / WhatsApp:** ${RESUME_DATA.personalInfo.phone}\n• **LinkedIn:** ${RESUME_DATA.personalInfo.linkedin}\n• **GitHub:** ${RESUME_DATA.personalInfo.github}\n\nHe is available for full-time software engineering and backend roles on-site in UAE or remotely globally.`,
        actions: [
          {
            label: copiedEmail ? 'Email Copied!' : 'Copy Email Address',
            action: handleCopyEmail,
            icon: copiedEmail ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />
          },
          {
            label: 'View Contact Section',
            action: () => {
              onClose();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            },
            icon: <Mail className="h-3 w-3" />
          }
        ]
      };
    }

    // Skills / Tech stack
    if (q.includes('skill') || q.includes('tech') || q.includes('python') || q.includes('flask') || q.includes('stack') || q.includes('backend')) {
      return {
        text: `Abhishek specializes in **Python & Full-Stack Development**:\n\n• **Languages:** Python, JavaScript, HTML5/CSS3, SQL\n• **Frameworks & Libraries:** Flask, React, Node.js, Express, Tailwind CSS, Bootstrap\n• **Databases:** PostgreSQL, SQLite, Supabase ORM\n• **Tools & DevOps:** Git, GitHub, Postman, REST APIs, Linux CLI\n• **Core Strengths:** Role-Based Access Control (RBAC), Database Architecture, Application Support, API Engineering.`,
        actions: [
          {
            label: 'Scroll to Skills Section',
            action: () => {
              onClose();
              document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
            },
            icon: <Code2 className="h-3 w-3" />
          }
        ]
      };
    }

    // Experience / Prime Rides
    if (q.includes('experience') || q.includes('prime rides') || q.includes('work') || q.includes('job') || q.includes('freelance') || q.includes('role')) {
      const exp = RESUME_DATA.experience[0];
      return {
        text: `**${exp.role}** at **${exp.company}** (${exp.location} | ${exp.period}):\n\n${exp.bullets.map((b) => `• ${b}`).join('\n')}`,
        actions: [
          {
            label: 'View Experience Section',
            action: () => {
              onClose();
              document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
            },
            icon: <Briefcase className="h-3 w-3" />
          }
        ]
      };
    }

    // Education / Certifications / Degree / CGPA
    if (q.includes('education') || q.includes('degree') || q.includes('university') || q.includes('cgpa') || q.includes('certification') || q.includes('udemy') || q.includes('college')) {
      const edu = RESUME_DATA.education;
      return {
        text: `**Academic Degree & Continuous Learning:**\n\n• **Degree:** ${edu.degree} from ${edu.institution} (${edu.period}) with a **CGPA of ${edu.cgpa}**.\n• **Certifications:** ${RESUME_DATA.certifications.length} verified professional certifications including Python & Flask Bootcamp, Complete 2024 Web Development, SQL & PostgreSQL Mastery.\n• **Languages:** English (Professional), Tamil (Native), Hindi (Working).`,
        actions: [
          {
            label: 'View Education & Certs',
            action: () => {
              onClose();
              document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' });
            },
            icon: <GraduationCap className="h-3 w-3" />
          }
        ]
      };
    }

    // Projects / WiFi / SHG
    if (q.includes('project') || q.includes('wifi') || q.includes('cafe') || q.includes('shg') || q.includes('portal') || q.includes('built')) {
      const p1 = RESUME_DATA.projects[0];
      const p2 = RESUME_DATA.projects[1];
      return {
        text: `Abhishek has engineered key full-stack software applications:\n\n1. **${p1.title}**: ${p1.description}\n*Tech:* ${p1.tech.join(', ')}\n\n2. **${p2.title}**: ${p2.description}\n*Tech:* ${p2.tech.join(', ')}`,
        actions: [
          {
            label: 'Explore Projects Section',
            action: () => {
              onClose();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            },
            icon: <Code2 className="h-3 w-3" />
          }
        ]
      };
    }

    // Summary / Who is Abhishek
    if (q.includes('who') || q.includes('summary') || q.includes('abhishek') || q.includes('about') || q.includes('profile')) {
      return {
        text: `${RESUME_DATA.summary}\n\n**Current Status:** Based in Dubai, UAE (DOB: 08 Oct 2002), actively seeking software engineering and application support roles.`,
        actions: [
          {
            label: 'Open Full Resume PDF',
            action: () => onOpenResumeModal(),
            icon: <FileText className="h-3 w-3" />
          }
        ]
      };
    }

    // Default response
    return {
      text: `Abhishek Viswanathan is a Software Engineer & Python Developer with a B.E. in Computer Science Engineering (CGPA 8.01) based in Dubai, UAE.\n\nHe specializes in Python, Flask, REST APIs, JavaScript, PostgreSQL, and full-stack software development. Would you like to inspect his work experience, skills, projects, or contact info?`,
      actions: [
        {
          label: 'View Resume PDF',
          action: () => onOpenResumeModal(),
          icon: <FileText className="h-3 w-3" />
        }
      ]
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputVal.trim();
    if (!text) return;

    soundFX.playClick();

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateBotResponse(text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: reply.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: reply.actions
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
      soundFX.playSuccess();
    }, 600);
  };

  const handleClearHistory = () => {
    soundFX.playClick();
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'bot',
        text: `Chat log reset. How can I help you regarding Abhishek's profile?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[92vw] sm:w-[440px] h-[560px] rounded-2xl border border-white/10 bg-[#0A0A0A] backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden font-sans"
        >
          {/* Header */}
          <div className="bg-[#111111] px-4 py-3.5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-lg bg-white/10 text-white border border-white/20">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                  Abhishek AI Assistant
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </h3>
                <p className="text-[10px] text-white/50 font-mono">
                  Ask about experience, skills, education or Dubai role
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1.5">
              <button
                onClick={handleClearHistory}
                title="Clear Chat"
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompt Chips */}
          <div className="bg-[#050505] px-3 py-2 border-b border-white/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap text-[10px] font-mono bg-[#121212] hover:bg-white hover:text-black border border-white/10 text-white/70 px-2.5 py-1 rounded-full transition-all flex-shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div className={`max-w-[82%] space-y-2`}>
                  <div
                    className={`p-3.5 rounded-xl border leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-white text-black font-medium border-white/20 rounded-tr-none'
                        : 'bg-[#141414] text-white/90 border-white/10 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Message Action Buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {msg.actions.map((act, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={act.action}
                          className="flex items-center space-x-1.5 text-[10px] font-mono uppercase tracking-wider bg-[#1A1A1A] hover:bg-white hover:text-black text-white/80 border border-white/10 px-3 py-1.5 rounded-lg transition-all"
                        >
                          {act.icon}
                          <span>{act.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  <span
                    className={`block text-[9px] font-mono text-white/30 ${
                      msg.sender === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-white text-black flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start items-center">
                <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white flex-shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-[#141414] border border-white/10 px-4 py-2.5 rounded-xl text-white/50 text-xs font-mono flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#111111] border-t border-white/10 flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about Abhishek's skills, experience, projects..."
              className="flex-1 bg-[#050505] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2.5 rounded-lg bg-white text-black hover:bg-white/90 disabled:opacity-30 font-bold transition-all"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
