import { motion } from 'motion/react';
import { X, CheckCircle, Smartphone, Sliders, ChevronRight } from 'lucide-react';
import { Project } from '../types';
import { useState } from 'react';

interface ProjectDetailsDrawerProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailsDrawer({ project, onClose }: ProjectDetailsDrawerProps) {
  if (!project) return null;

  // Interactive Prototype States
  const [allocation, setAllocation] = useState<number>(65); // For Neo-Bank
  const [dataFrequency, setDataFrequency] = useState<number>(4); // For Quantum Charts
  const [lightAmbiance, setLightAmbiance] = useState<number>(80); // For Lumina

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end" id="drawer-container">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-xs cursor-pointer"
        id="drawer-backdrop"
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.4, ease: 'easeOut' }}
        className="relative w-full max-w-4xl bg-white text-zinc-900 h-full overflow-y-auto no-scrollbar shadow-2xl z-10 flex flex-col border-l border-zinc-200"
        id="drawer-body"
      >
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-8 py-6 border-b border-zinc-100 flex justify-between items-center z-20">
          <div>
            <span className="text-xs uppercase font-semibold text-zinc-500 tracking-wider">PROJECT FILE // 0{project.id === 'neo-bank' ? '1' : project.id === 'quantum-analytics' ? '02' : '03'}</span>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-zinc-900 mt-1">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-3 bg-zinc-900 text-white hover:bg-zinc-800 transition-colors cursor-pointer flex items-center justify-center"
            id="btn-close-drawer"
            aria-label="Close project panel"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-8 space-y-12 flex-1">
          {/* Main Visual Header */}
          <div className="relative aspect-video overflow-hidden bg-zinc-100 border border-zinc-200">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-primary text-zinc-900 text-xs font-bold uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics Panel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-y border-zinc-200 py-6">
            {project.metrics.map((metric, i) => (
              <div key={i} className="text-left">
                <p className="text-xs text-zinc-500 uppercase tracking-widest">{metric.label}</p>
                <p className="font-display text-3xl font-extrabold text-zinc-900 mt-1">{metric.value}</p>
              </div>
            ))}
          </div>

          {/* Detailed Narrative */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 space-y-6">
              <h3 className="font-display text-xl font-bold uppercase text-zinc-900 tracking-tight">Executive Summary</h3>
              <p className="text-zinc-600 leading-relaxed font-sans">{project.longDescription}</p>
              
              <div className="p-6 bg-zinc-50 border-l-4 border-zinc-900 space-y-3">
                <h4 className="font-bold text-sm uppercase tracking-wider text-zinc-900">The Core Design Challenge</h4>
                <p className="text-xs text-zinc-600 font-sans leading-relaxed">{project.challenge}</p>
              </div>
            </div>

            <div className="md:col-span-5 space-y-6">
              <h3 className="font-display text-xl font-bold uppercase text-zinc-900 tracking-tight">Creative Deliverables</h3>
              <ul className="space-y-3">
                {project.deliverables.map((del, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-zinc-900 mt-0.5 shrink-0" />
                    <span className="text-sm font-sans text-zinc-700">{del}</span>
                  </li>
                ))}
              </ul>

              <div className="p-6 bg-primary/10 border-l-4 border-primary space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-widest text-zinc-900">Proven Solution Method</h4>
                <p className="text-xs text-zinc-700 font-sans leading-relaxed">{project.solution}</p>
              </div>
            </div>
          </div>

          {/* High-Fidelity Prototype Sandbox */}
          {project.prototypeType && (
            <div className="p-6 md:p-8 bg-zinc-900 text-white space-y-6 border border-zinc-800">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Smartphone className="text-primary" size={20} />
                  <span className="font-display text-sm font-extrabold uppercase tracking-widest">Interactive Hifi Sandbox</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-2 py-1">SIMULATION ENGINE LIVE</span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white mb-2">{project.prototypeControlLabel}</h4>
                <p className="text-xs text-zinc-400 font-sans">{project.prototypeNotes}</p>
              </div>

              {/* Neo-Bank Simulated Sandbox */}
              {project.prototypeType === 'finance' && (
                <div className="space-y-6 bg-zinc-950 p-6 border border-zinc-800">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400">AUTOMATED ROUTING VELOCITY</span>
                    <span className="font-mono text-primary font-bold">{allocation}% / {100 - allocation}%</span>
                  </div>

                  <div className="relative">
                    <input
                      type="range"
                      min="5"
                      max="95"
                      value={allocation}
                      onChange={(e) => setAllocation(Number(e.target.value))}
                      className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="p-4 bg-zinc-900 border border-zinc-800">
                      <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Instant Spending Reserve</p>
                      <p className="font-display text-xl font-black text-white mt-1">€{(14500 * (allocation / 100)).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                      <div className="w-full bg-zinc-800 h-1.5 mt-2">
                        <div className="bg-primary h-full transition-all duration-150" style={{ width: `${allocation}%` }}></div>
                      </div>
                    </div>
                    <div className="p-4 bg-zinc-900 border border-zinc-800">
                      <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Growth Amortized Crypt</p>
                      <p className="font-display text-xl font-black text-primary mt-1">€{(14500 * ((100 - allocation) / 100)).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                      <div className="w-full bg-zinc-800 h-1.5 mt-2">
                        <div className="bg-zinc-600 h-full transition-all duration-150" style={{ width: `${100 - allocation}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quantum Analytics Simulated Sandbox */}
              {project.prototypeType === 'charts' && (
                <div className="space-y-6 bg-zinc-950 p-6 border border-zinc-800">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400">DATA TICK REFRESH SPEED</span>
                    <span className="font-mono text-primary font-bold">{dataFrequency * 12} ms (Very Fast)</span>
                  </div>

                  <div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={dataFrequency}
                      onChange={(e) => setDataFrequency(Number(e.target.value))}
                      className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Simulated Cluster Waveforms</p>
                    <div className="h-16 flex items-end gap-1 pt-4">
                      {Array.from({ length: 18 }).map((_, i) => {
                        const randomHeight = Math.abs(Math.sin((i + dataFrequency) * 1.5)) * 100;
                        return (
                          <div
                            key={i}
                            className="bg-primary flex-1 transition-all duration-200"
                            style={{ height: `${Math.max(15, randomHeight)}%` }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Lumina Smart Home Simulated Sandbox */}
              {project.prototypeType === 'smarthome' && (
                <div className="space-y-6 bg-zinc-950 p-6 border border-zinc-800 transition-colors duration-500" style={{ backgroundColor: `rgb(${Math.floor(20 * (lightAmbiance / 100))}, ${Math.floor(20 * (lightAmbiance / 100))}, ${Math.floor(20 * (lightAmbiance / 100))})` }}>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400 uppercase font-bold">Ambient Luminescence</span>
                    <span className="font-mono text-primary font-bold">{lightAmbiance}% Brightness</span>
                  </div>

                  <div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={lightAmbiance}
                      onChange={(e) => setLightAmbiance(Number(e.target.value))}
                      className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  <div className="flex flex-col items-center justify-center p-4 border border-zinc-800/50 bg-black/60">
                    <div
                      className="w-16 h-16 rounded-full border-2 transition-all duration-300 flex items-center justify-center"
                      style={{
                        borderColor: `rgba(217, 255, 153, ${lightAmbiance / 100})`,
                        boxShadow: `0 0 ${lightAmbiance * 0.4}px rgba(217, 255, 153, ${lightAmbiance / 150})`
                      }}
                    >
                      <Sliders size={20} className="text-zinc-300" style={{ opacity: Math.max(0.3, lightAmbiance / 100) }} />
                    </div>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest mt-3">Smart Lumina Dimmer Dial</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Footer */}
          <div className="bg-zinc-50 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <span className="text-xs uppercase tracking-wide text-zinc-500 font-bold">REACH OUT</span>
              <p className="text-sm font-sans text-zinc-800 mt-1">Want to integrate these patterns in your codebase?</p>
            </div>
            <a
              href="#contact"
              onClick={onClose}
              className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-display text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all"
            >
              Consult On This Project
              <ChevronRight size={14} className="text-primary" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
