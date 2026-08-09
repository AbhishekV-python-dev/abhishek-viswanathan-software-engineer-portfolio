import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Github,
  Check,
  Copy,
  Clock,
  MessageSquare,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RESUME_DATA } from '../data/resumeData';
import { Card3D } from './Card3D';
import { soundFX } from '../utils/audio';

interface ContactProps {
  activeTheme: 'emerald' | 'cyan' | 'violet' | 'amber';
}

export const ContactSection: React.FC<ContactProps> = ({ activeTheme }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Recruitment / Software Opportunity',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    soundFX.playSuccess();

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#10B981', '#06B6D4', '#8B5CF6']
    });

    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundFX.playClick();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      soundFX.playSuccess();

      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10B981', '#06B6D4', '#3B82F6']
      });

      setFormData({ name: '', email: '', subject: 'Recruitment / Software Opportunity', message: '' });
    }, 800);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-2 flex items-center gap-2"
        >
          <Mail className="h-3.5 w-3.5" />
          <span>Get In Touch</span>
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
          Let’s Connect & <span className="italic font-serif">Build</span>
        </h2>
        <p className="mt-3 text-white/60 text-xs sm:text-sm max-w-2xl font-mono">
          Seeking software engineering, backend development, or application support opportunities in Dubai, UAE & globally.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Direct Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          
          <Card3D depth={20} className="bg-[#111111] border-white/10 p-6">
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider mb-4 flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-white/60" />
              <span>Location & Timezone</span>
            </h3>

            <div className="space-y-3 font-mono text-xs text-white/70">
              <div className="bg-[#050505] p-3.5 rounded-lg border border-white/10">
                <span className="text-white/40 block mb-1 text-[10px] uppercase tracking-wider">Primary Base:</span>
                <strong className="text-white text-sm">Dubai, United Arab Emirates</strong>
                <p className="text-white/60 text-[11px] mt-1">Gulf Standard Time (GST • UTC+4)</p>
              </div>

              <div className="bg-[#050505] p-3.5 rounded-lg border border-white/10">
                <span className="text-white/40 block mb-1 text-[10px] uppercase tracking-wider">Role Availability:</span>
                <strong className="text-white">Full-Time / On-Site UAE / Remote</strong>
              </div>
            </div>
          </Card3D>

          {/* Quick Contact Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Phone & WhatsApp */}
            <button
              onClick={() => handleCopy(RESUME_DATA.personalInfo.phone, 'phone')}
              className="text-left bg-[#111111] hover:bg-[#161616] p-4 rounded-xl border border-white/10 hover:border-white/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <Phone className="h-4 w-4 text-white/60" />
                {copiedField === 'phone' ? (
                  <Check className="h-3.5 w-3.5 text-white" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-white/30 group-hover:text-white/60" />
                )}
              </div>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Phone / WhatsApp</span>
              <p className="text-xs font-mono font-bold text-white mt-0.5 truncate">
                {RESUME_DATA.personalInfo.phone}
              </p>
            </button>

            {/* Email */}
            <button
              onClick={() => handleCopy(RESUME_DATA.personalInfo.email, 'email')}
              className="text-left bg-[#111111] hover:bg-[#161616] p-4 rounded-xl border border-white/10 hover:border-white/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <Mail className="h-4 w-4 text-white/60" />
                {copiedField === 'email' ? (
                  <Check className="h-3.5 w-3.5 text-white" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-white/30 group-hover:text-white/60" />
                )}
              </div>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Direct Email</span>
              <p className="text-xs font-mono font-bold text-white mt-0.5 truncate">
                {RESUME_DATA.personalInfo.email}
              </p>
            </button>

          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            <a
              href={RESUME_DATA.personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#111111] hover:bg-[#161616] p-3.5 rounded-xl border border-white/10 text-center text-xs font-mono text-white font-bold flex items-center justify-center space-x-2 transition-all uppercase tracking-wider"
            >
              <Linkedin className="h-4 w-4 text-white/60" />
              <span>LinkedIn Profile</span>
            </a>

            <a
              href={RESUME_DATA.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#111111] hover:bg-[#161616] p-3.5 rounded-xl border border-white/10 text-center text-xs font-mono text-white font-bold flex items-center justify-center space-x-2 transition-all uppercase tracking-wider"
            >
              <Github className="h-4 w-4 text-white/60" />
              <span>GitHub Repos</span>
            </a>
          </div>

        </div>

        {/* Right Column: Interactive Message Form */}
        <div className="lg:col-span-7">
          <Card3D depth={15} className="bg-[#111111] border-white/10 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white font-mono uppercase tracking-wider mb-2 flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-white/60" />
              <span>Send Direct Message</span>
            </h3>
            <p className="text-xs text-white/50 font-mono mb-6">
              Messages route directly to Abhishek's inbox ({RESUME_DATA.personalInfo.email}).
            </p>

            {isSent ? (
              <div className="bg-[#050505] border border-white/20 rounded-xl p-6 text-center space-y-3 font-mono">
                <div className="p-3 bg-white text-black rounded-full w-fit mx-auto">
                  <Check className="h-5 w-5" />
                </div>
                <h4 className="text-base font-bold text-white uppercase tracking-wider">Message Transmitted!</h4>
                <p className="text-xs text-white/70">
                  Thank you for reaching out. Abhishek will review your message and reply promptly.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-2 text-xs text-white/40 underline hover:text-white uppercase tracking-wider"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-white/50 mb-1 tracking-wider">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full bg-[#050505] border border-white/10 rounded-lg p-3 text-xs font-mono text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-white/50 mb-1 tracking-wider">Your Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. sarah@company.com"
                      className="w-full bg-[#050505] border border-white/10 rounded-lg p-3 text-xs font-mono text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-white/50 mb-1 tracking-wider">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#050505] border border-white/10 rounded-lg p-3 text-xs font-mono text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-white/50 mb-1 tracking-wider">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, engineering role, or inquiry..."
                    className="w-full bg-[#050505] border border-white/10 rounded-lg p-3 text-xs font-mono text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 rounded-lg bg-white hover:bg-white/90 text-black font-bold py-3.5 text-xs font-mono transition-all shadow-lg active:scale-95 disabled:opacity-50 uppercase tracking-widest"
                >
                  <Send className="h-4 w-4" />
                  <span>{isSubmitting ? 'Transmitting Message...' : 'Send Message Now'}</span>
                </button>
              </form>
            )}
          </Card3D>
        </div>

      </div>

    </section>
  );
};
