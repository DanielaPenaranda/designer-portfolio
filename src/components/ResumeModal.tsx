import { motion } from 'motion/react';
import { X, Printer, BookOpen, Layers, Award } from 'lucide-react';
import { useState } from 'react';

interface ResumeModalProps {
  onClose: () => void;
}

export default function ResumeModal({ onClose }: ResumeModalProps) {
  // Simple states so the reviewer can interactively edit the fields and print
  const [name, setName] = useState('Daniela Penaranda');
  const [title, setTitle] = useState('Staff Product Designer');
  const [about, setAbout] = useState(
    'I build high-performance digital ecosystems bridging raw technical depth with pristine user intuition. Specialized in SaaS, interactive dashboards, and design systems.'
  );

  const [experiences, setExperiences] = useState([
    {
      role: 'Lead UX Designer',
      company: 'Securities Depot SaaS',
      period: '2023 - Present',
      desc: 'Transformed tabular analytical data logs into clean eastern-blue timeseries graphics, increasing performance speed metrics by 40%.'
    },
    {
      role: 'Senior Product Designer',
      company: 'Velo Finance Labs',
      period: '2021 - 2023',
      desc: 'Architected micro-interaction token libraries and automated Figma-to-React pipelines for 14 cross-regional investment streams.'
    },
    {
      role: 'UX Architect',
      company: 'Quantum Digital Solutions',
      period: '2019 - 2021',
      desc: 'Formulated systematic low-latency design systems and custom WebGL telemetry controls for smart industrial applications.'
    }
  ]);

  const handlePrint = () => {
    window.print();
  };

  const handleExpChange = (index: number, field: string, value: string) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    setExperiences(updated);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/95 prints:relative prints:p-0 prints:bg-white" id="resume-modal">
      {/* Backdrop */}
      <div className="absolute inset-0 cursor-pointer prints:hidden" onClick={onClose} />

      {/* Frame */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-white text-zinc-900 w-full max-w-4xl p-8 md:p-12 shadow-2xl z-10 border border-zinc-200 uppercase-no-radius prints:shadow-none prints:border-none prints:p-0"
      >
        {/* Header toolbar */}
        <div className="flex justify-between items-center border-b border-zinc-200 pb-6 mb-8 prints:hidden">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-zinc-500" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 font-mono">Interactive Curriculum Workspace</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white font-display text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer"
            >
              <Printer size={12} />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-2.5 bg-zinc-100 text-zinc-800 hover:bg-zinc-200 transition-colors cursor-pointer"
              aria-label="Close resume workspace"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Printable/Editable Workspace Sheet */}
        <div className="space-y-8 prints:space-y-6 text-left">
          {/* Main profile details */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-8 border-b border-zinc-200">
            <div className="md:col-span-8 space-y-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="font-display text-4xl font-extrabold tracking-tight text-zinc-900 w-full bg-transparent border-none p-0 focus:ring-0 focus:bg-zinc-50 hover:bg-zinc-50/50 transition-colors font-sans focus:outline-none"
                placeholder="Name"
                title="Click to edit name"
              />
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="font-display text-sm font-bold uppercase tracking-widest text-zinc-500 w-full bg-transparent border-none p-0 focus:ring-0 focus:bg-zinc-50 hover:bg-zinc-50/50 transition-colors font-sans focus:outline-none mt-1"
                placeholder="Title"
                title="Click to edit title"
              />
            </div>
            <div className="md:col-span-4 text-xs text-zinc-500 font-mono space-y-1 md:text-right">
              <p>EMAIL: hello@designer.portfolio</p>
              <p>WEB: designer.portfolio</p>
              <p>LOCATION: London / Hybrid</p>
            </div>
          </div>

          {/* Core Introduction */}
          <div className="space-y-2 pb-6 border-b border-zinc-100">
            <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 font-bold">1 // INTENT DEEPRANGE</span>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={2}
              className="w-full bg-transparent border-none p-0 text-sm text-zinc-650 leading-relaxed font-sans resize-none focus:ring-0 focus:bg-zinc-50 hover:bg-zinc-50/50 transition-colors focus:outline-none"
              placeholder="Introduce your profile..."
              title="Click to edit bio"
            />
          </div>

          {/* Interactive Experience Fields */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 font-bold block">2 // SELECTED MILESTONES</span>
            
            <div className="space-y-6">
              {experiences.map((exp, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-2 p-3 bg-zinc-50/50 border-l-2 border-zinc-900 group relative">
                  <div className="md:col-span-4 space-y-1">
                    <input
                      value={exp.role}
                      onChange={(e) => handleExpChange(idx, 'role', e.target.value)}
                      className="font-display text-sm font-bold text-zinc-900 bg-transparent border-none p-0 focus:ring-0 focus:outline-none w-full"
                      placeholder="Role"
                    />
                    <div className="flex gap-2 items-center text-[10px] text-zinc-500 font-mono">
                      <input
                        value={exp.company}
                        onChange={(e) => handleExpChange(idx, 'company', e.target.value)}
                        className="bg-transparent border-none p-0 focus:outline-none w-28"
                        placeholder="Company"
                      />
                      <span>•</span>
                      <input
                        value={exp.period}
                        onChange={(e) => handleExpChange(idx, 'period', e.target.value)}
                        className="bg-transparent border-none p-0 focus:outline-none w-20"
                        placeholder="Period"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <textarea
                      value={exp.desc}
                      onChange={(e) => handleExpChange(idx, 'desc', e.target.value)}
                      rows={2}
                      className="w-full bg-transparent border-none p-0 text-xs text-zinc-650 font-sans leading-relaxed resize-none focus:outline-none"
                      placeholder="Role description details..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights & Accents info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-zinc-200">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 font-bold block mb-3">3 // EDUCATION MATRIX</span>
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-bold text-zinc-900">BSc Product Design & Innovation</p>
                  <p className="text-[10px] text-zinc-500 font-mono">London Design Institute • Class of 2018</p>
                </div>
              </div>
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 font-bold block mb-3">4 // TOOLKIT SCORECARD</span>
              <div className="flex flex-wrap gap-1.5">
                {['Figma', 'React', 'Tailwind', 'Design Systems', 'Systems Thinking', 'Technical Writing'].map((tool) => (
                  <span key={tool} className="text-[10px] px-2.5 py-1 bg-zinc-900 text-white font-mono uppercase tracking-wider font-bold">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hints */}
        <p className="text-[10px] text-zinc-400 text-center uppercase tracking-widest mt-12 mb-0 border-t border-zinc-100 pt-6 prints:hidden font-mono">
          Interactive sheet: Click any text line to live edit your resume profile before printing.
        </p>
      </motion.div>
    </div>
  );
}
