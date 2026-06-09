import { useState } from 'react';
import { Sliders, ClipboardCheck, Sparkles, Check } from 'lucide-react';

interface ProjectEstimatorProps {
  onAutoFill: (summary: string, subject: string) => void;
}

export default function ProjectEstimator({ onAutoFill }: ProjectEstimatorProps) {
  const [selectedService, setSelectedService] = useState<string>('UX/UI Redesign');
  const [timeline, setTimeline] = useState<number>(6); // weeks
  const [budgetRange, setBudgetRange] = useState<string>('€15,000 - €30,000');
  const [copied, setCopied] = useState<boolean>(false);

  const services = [
    { name: 'UX/UI Redesign', baseCost: 8000, duration: 4 },
    { name: 'Complete SaaS App', baseCost: 20000, duration: 8 },
    { name: 'Design System Set', baseCost: 12000, duration: 6 },
    { name: 'Interactive Prototype', baseCost: 5000, duration: 3 }
  ];

  // Dynamically calculate some details
  const currentServiceObj = services.find(s => s.name === selectedService) || services[0];
  const calculatedMultiplier = timeline < currentServiceObj.duration ? 1.25 : timeline > currentServiceObj.duration * 1.5 ? 0.9 : 1.0;
  
  // Custom estimated rates based on selected metrics
  const estimatedMin = Math.round(currentServiceObj.baseCost * calculatedMultiplier);
  const estimatedMax = Math.round(estimatedMin * 1.35);

  const generateBrief = () => {
    return `Hello! I would love to discuss a project.
    
Service Required: ${selectedService}
Target Timeline: Approx. ${timeline} Weeks
Estimated Budget Target: ${budgetRange} (Calculated Guide: €${estimatedMin.toLocaleString()} - €${estimatedMax.toLocaleString()})

Looking forward to designing something robust together!`;
  };

  const handleFillClick = () => {
    const briefText = generateBrief();
    const subjectText = `${selectedService} Inquiry`;
    onAutoFill(briefText, subjectText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 space-y-6 text-white text-left" id="estimator-panel">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Sliders size={18} className="text-primary" />
          <h3 className="font-display text-sm font-extrabold uppercase tracking-widest">Interactive Project Estimator</h3>
        </div>
        <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5">ESTIMATE UTILITY</span>
      </div>

      <div className="space-y-4">
        {/* Services Selectors */}
        <div>
          <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block mb-3">1. Select Target Capability</label>
          <div className="grid grid-cols-2 gap-2">
            {services.map((service) => (
              <button
                key={service.name}
                type="button"
                onClick={() => setSelectedService(service.name)}
                className={`py-3 px-3 text-xs uppercase font-bold tracking-widest border transition-all text-center ${
                  selectedService === service.name
                    ? 'bg-primary text-zinc-900 border-primary'
                    : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {service.name}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider">2. Desired Duration</label>
            <span className="text-xs font-mono text-primary font-bold">{timeline} Weeks</span>
          </div>
          <input
            type="range"
            min="2"
            max="16"
            value={timeline}
            onChange={(e) => setTimeline(Number(e.target.value))}
            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
            <span>2 Weeks (Sprint)</span>
            <span>16 Weeks (Quarter)</span>
          </div>
        </div>

        {/* Budget Tiers */}
        <div>
          <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block mb-2">3. Approximate Budget Tier</label>
          <div className="grid grid-cols-3 gap-2">
            {['< €10k', '€15k - €30k', '€30k+'].map((tier) => (
              <button
                key={tier}
                type="button"
                onClick={() => setBudgetRange(tier)}
                className={`py-2 px-2 text-[10px] uppercase font-bold tracking-widest border transition-all text-center ${
                  budgetRange === tier
                    ? 'bg-primary text-zinc-900 border-primary'
                    : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Guide Calculation Panel */}
      <div className="p-4 bg-zinc-950 border border-zinc-800 space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-zinc-400">ESTIMATED ARCHITECTURE DEPTH</span>
          <span className="font-mono text-white">{timeline < 4 ? 'Fast MVP' : timeline > 9 ? 'Full Suite' : 'Standard Agile'}</span>
        </div>
        <div className="flex justify-between items-end">
          <span className="text-xs font-bold text-zinc-500 uppercase">Interactive Estimate Guide</span>
          <span className="text-lg font-display font-black text-primary">
            €{estimatedMin.toLocaleString()} - €{estimatedMax.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Actions */}
      <button
        type="button"
        onClick={handleFillClick}
        className="w-full py-4 bg-primary text-zinc-900 font-display text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2"
      >
        {copied ? (
          <>
            <Check size={14} className="text-zinc-900" />
            Populated In Form!
          </>
        ) : (
          <>
            <ClipboardCheck size={14} className="text-zinc-900" />
            Autofill My Inquiry Form
          </>
        )}
      </button>
    </div>
  );
}
