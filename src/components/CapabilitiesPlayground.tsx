import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SKILL_DETAILS } from '../data';
import { Sliders, Sparkles, Code, Cpu } from 'lucide-react';

export default function CapabilitiesPlayground() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  // Figma state
  const [prototypeGap, setPrototypeGap] = useState<number>(16);
  const [prototypeAlignment, setPrototypeAlignment] = useState<string>('center');

  // React state
  const [rebuildLatency, setRebuildLatency] = useState<number>(16);
  const [fpsVal, setFpsVal] = useState<number>(60);
  useEffect(() => {
    const interval = setInterval(() => {
      setFpsVal(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const target = 60 - Math.round(rebuildLatency / 8);
        return Math.max(30, Math.min(60, target + delta));
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [rebuildLatency]);

  // Tailwind CSS state
  const [paddingClass, setPaddingClass] = useState<string>('p-4');
  const [bgClass, setBgClass] = useState<string>('bg-primary/20');

  // Three.js interactive canvas render
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [particleSpeed, setParticleSpeed] = useState<number>(2);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; r: number; dx: number; dy: number }[] = [];

    // Initialize particles
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * particleSpeed,
        dy: (Math.random() - 0.5) * particleSpeed
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#222222';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      ctx.strokeStyle = 'rgba(217, 255, 153, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 50) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      ctx.fillStyle = '#D9FF99';
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        // Move
        p.x += p.dx * (particleSpeed / 2);
        p.y += p.dy * (particleSpeed / 2);

        // Constrain
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleSpeed]);

  return (
    <div className="space-y-8" id="capabilities-playground">
      {/* Interactive Tabs / Grid selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.keys(SKILL_DETAILS).map((key) => (
          <button
            key={key}
            onClick={() => setActiveSkill(activeSkill === key ? null : key)}
            className={`p-5 text-left border transition-all cursor-pointer ${
              activeSkill === key
                ? 'bg-zinc-900 border-primary text-white'
                : 'bg-white border-zinc-200 hover:border-zinc-400 text-zinc-900'
            }`}
            id={`skill-btn-${key.toLowerCase()}`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-display text-xl font-bold">{key}</span>
              <span className="text-[10px] font-mono text-zinc-500 bg-zinc-100 px-1.5 py-0.5">
                {SKILL_DETAILS[key].level}
              </span>
            </div>
            <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{SKILL_DETAILS[key].description}</p>
            <div className="mt-4 flex items-center justify-between text-[10px] font-bold tracking-wider uppercase text-zinc-400">
              <span>{SKILL_DETAILS[key].years} Years XP</span>
              <span className="text-primary font-black">Interactive Sandbox →</span>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeSkill && (
          <motion.div
            key={activeSkill}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="p-6 md:p-8 bg-zinc-900 border border-zinc-800 text-white grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
          >
            {/* Context Narrative */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5">HIGH-FIDELITY DEEP DIVE</span>
                <span className="text-xs text-zinc-400 uppercase font-bold tracking-widest">{SKILL_DETAILS[activeSkill].level} Level</span>
              </div>
              <h3 className="font-display text-2xl font-black text-white">{activeSkill} Dynamic Sandbox</h3>
              <p className="text-sm text-zinc-300 leading-relaxed font-sans">{SKILL_DETAILS[activeSkill].description}</p>
              
              <div className="pt-4 border-t border-zinc-800">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block">Select Project Highlight</span>
                <p className="text-xs text-zinc-400 font-sans italic mt-1 bg-zinc-950 p-3 border-l-2 border-primary">
                  "{SKILL_DETAILS[activeSkill].highlight}"
                </p>
              </div>
            </div>

            {/* Sandbox Visual Elements */}
            <div className="bg-zinc-950 p-6 border border-zinc-800 flex flex-col justify-between">
              {/* Figma Sandbox UI */}
              {activeSkill === 'Figma' && (
                <div className="space-y-6 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-center text-xs pb-2 border-b border-zinc-800">
                    <span className="text-zinc-400 font-bold">FIGMA AUTO-LAYOUT SIMULATOR</span>
                    <span className="font-mono text-primary">gap: {prototypeGap}px</span>
                  </div>

                  {/* UI Preview Area */}
                  <div
                    className="bg-zinc-900 p-4 border border-zinc-800 flex transition-all duration-300 min-h-[100px]"
                    style={{
                      gap: `${prototypeGap}px`,
                      justifyContent: prototypeAlignment,
                      alignItems: 'center'
                    }}
                  >
                    <div className="h-10 w-10 bg-primary/20 border border-primary/40 flex items-center justify-center text-[10px] font-mono text-primary">BOX1</div>
                    <div className="h-10 w-16 bg-primary/20 border border-primary/40 flex items-center justify-center text-[10px] font-mono text-primary">BOX2</div>
                    <div className="h-10 w-12 bg-primary/20 border border-primary/40 flex items-center justify-center text-[10px] font-mono text-primary">BOX3</div>
                  </div>

                  {/* Controls */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs text-zinc-400 mb-1">
                        <span>Layout Spacing (Gap)</span>
                        <span>{prototypeGap}px</span>
                      </div>
                      <input
                        type="range"
                        min="4"
                        max="40"
                        value={prototypeGap}
                        onChange={(e) => setPrototypeGap(Number(e.target.value))}
                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                    </div>
                    <div>
                      <span className="text-xs text-zinc-400 font-bold block mb-2">Flexbox Justification</span>
                      <div className="flex gap-2">
                        {['center', 'space-between', 'start', 'end'].map(align => (
                          <button
                            key={align}
                            onClick={() => setPrototypeAlignment(align)}
                            className={`px-3 py-1.5 text-[10px] uppercase font-bold tracking-widest border font-mono ${
                              prototypeAlignment === align
                                ? 'bg-primary text-zinc-900 border-primary'
                                : 'bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-700'
                            }`}
                          >
                            {align}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* React Sandbox UI */}
              {activeSkill === 'React' && (
                <div className="space-y-6 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-center text-xs pb-2 border-b border-zinc-800">
                    <span className="text-zinc-400 font-bold">STATE RE-RENDER LATENCY TESTING</span>
                    <span className="font-mono text-primary">Active Hooks: Optimized</span>
                  </div>

                  {/* Latency meter */}
                  <div className="py-6 flex flex-col items-center justify-center space-y-4 bg-zinc-900 border border-zinc-800">
                    <div className="text-center">
                      <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Simulated React Rendering Rate</p>
                      <p className="font-display text-4xl font-extrabold text-white mt-1">{fpsVal} <span className="text-xs text-primary">FPS</span></p>
                    </div>
                    <div className="w-full max-w-[200px] bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-primary h-full transition-all duration-300" style={{ width: `${(fpsVal / 60) * 100}%` }}></div>
                    </div>
                  </div>

                  {/* Controls */}
                  <div>
                    <div className="flex justify-between text-xs text-zinc-400 mb-1">
                      <span>Introduce Virtual DOM Load</span>
                      <span>{rebuildLatency} ms / frame</span>
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="120"
                      value={rebuildLatency}
                      onChange={(e) => setRebuildLatency(Number(e.target.value))}
                      className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-[90px] mt-1 text-zinc-500 font-mono scale-10 text-[9px]">
                      <span>Optimized (16ms)</span>
                      <span>De-optimized (120ms)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tailwind CSS Sandbox UI */}
              {activeSkill === 'Tailwind' && (
                <div className="space-y-6 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-center text-xs pb-2 border-b border-zinc-800">
                    <span className="text-zinc-400 font-bold">TAILWIND UTILITY DECORATOR</span>
                    <span className="font-mono text-primary">Class Builder</span>
                  </div>

                  {/* Live Render Card */}
                  <div className="bg-zinc-900 border border-zinc-800 p-4 transition-all duration-300 min-h-[100px] flex flex-col justify-center items-center">
                    <div className={`${paddingClass} ${bgClass} border border-primary/50 text-center transition-all duration-300`}>
                      <span className="text-xs font-mono font-bold tracking-widest text-primary uppercase">MOCK COMPONENT</span>
                    </div>
                    <code className="text-[10px] text-zinc-500 font-mono mt-4">
                      {`className="${paddingClass} ${bgClass} border border-primary/50 text-center"`}
                    </code>
                  </div>

                  {/* Interactive modifiers */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block mb-2">Padding Vector</span>
                      <div className="flex flex-wrap gap-1.5">
                        {['p-2', 'p-4', 'p-6', 'p-8'].map(p => (
                          <button
                            key={p}
                            onClick={() => setPaddingClass(p)}
                            className={`px-2 py-1 text-[10px] font-mono border ${
                              paddingClass === p ? 'bg-primary text-zinc-900 border-primary' : 'bg-transparent text-zinc-400 border-zinc-800'
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block mb-2">Background Alpha</span>
                      <div className="flex flex-wrap gap-1.5">
                        {['bg-transparent', 'bg-primary/10', 'bg-primary/20', 'bg-primary/40'].map(bg => (
                          <button
                            key={bg}
                            onClick={() => setBgClass(bg)}
                            className={`px-2 py-1 text-[10px] font-mono border ${
                              bgClass === bg ? 'bg-primary text-zinc-900 border-primary' : 'bg-transparent text-zinc-400 border-zinc-800'
                            }`}
                          >
                            {bg === 'bg-transparent' ? 'none' : bg.split('/')[1] ? `${bg.split('/')[1]}%` : bg}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Three.js Sandbox UI */}
              {activeSkill === 'Three.js' && (
                <div className="space-y-6 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-center text-xs pb-2 border-b border-zinc-800">
                    <span className="text-zinc-400 font-bold">2D SPACE CONTEXT CONNECTOR</span>
                    <span className="font-mono text-primary">Live Canvas Vector</span>
                  </div>

                  <div className="relative border border-zinc-800 bg-zinc-900">
                    <canvas
                      ref={canvasRef}
                      width={300}
                      height={130}
                      className="w-full h-[130px]"
                    />
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 px-2 py-0.5 border border-zinc-800 text-[9px] font-mono text-zinc-300">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-ping"></div>
                      <span>CANVAS ACTIVE</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div>
                    <div className="flex justify-between text-xs text-zinc-400 mb-1">
                      <span>Particle Movement Speed</span>
                      <span>{particleSpeed}x Velocity</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={particleSpeed}
                      onChange={(e) => setParticleSpeed(Number(e.target.value))}
                      className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-[90px] mt-1 text-zinc-500 font-mono scale-10 text-[9px]">
                      <span>Fluid / Calm</span>
                      <span>Dynamic Charge</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
