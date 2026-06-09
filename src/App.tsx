import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, Sparkles, Send, ArrowRight, ArrowUpRight, CheckCircle2,
  Lock, Plus, Info, Check, Monitor, Sliders, ChevronRight, Inbox, Mail, Download, ArrowUp
} from 'lucide-react';

import { Project, Inquiry } from './types';
import { PROJECTS_DATA } from './data';
import ProjectDetailsDrawer from './components/ProjectDetailsDrawer';
import ProjectEstimator from './components/ProjectEstimator';
import CapabilitiesPlayground from './components/CapabilitiesPlayground';
import InquiriesPortal from './components/InquiriesPortal';
import ResumeModal from './components/ResumeModal';

export default function App() {
  // Navigation active state
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // States for interactive workspaces
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectFilter, setProjectFilter] = useState<string>('All');
  const [listViewMode, setListViewMode] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  // Contact & Inquiries local storage simulation states
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [scope, setScope] = useState<string>('UX/UI Redesign');
  const [budget, setBudget] = useState<string>('€15k - €30k');
  
  // Initialize inbox with some realistic records so it looks fully populated and professional
  const [inquiries, setInquiries] = useState<Inquiry[]>([
    {
      id: 'mock-1',
      name: 'Sarah Chen (Director of Product)',
      email: 'sarah.c@stripe.com',
      subject: 'Core Portal Overhaul',
      message: 'Hello Daniela. Loved the Neo-Bank Interface and want to adopt a similar high-density ledger dashboard for our next-generation developers account screen.',
      scope: 'Complete SaaS App',
      budget: '€30k+',
      createdAt: 'Today, 2:15 PM'
    },
    {
      id: 'mock-2',
      name: 'Devin K. (Founder)',
      email: 'devin@layerzero.xyz',
      subject: 'Ambient IoT app system',
      message: 'Need a premium minimalist HUD for remote architectural power grid control. Clean and simple.',
      scope: 'Interactive Prototype',
      budget: '€15k - €30k',
      createdAt: 'Yesterday'
    }
  ]);
  const [showInbox, setShowInbox] = useState<boolean>(true); // Inbox panel visbility
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // System thinking simulator states
  const [complexity, setComplexity] = useState<number>(80);
  const [strictConstraints, setStrictConstraints] = useState<boolean>(true);

  // Nav detection on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'about', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle contact submission
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      name,
      email,
      subject: subject || 'General Partnership',
      message,
      scope,
      budget,
      createdAt: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }) + ', Today'
    };

    setInquiries([newInquiry, ...inquiries]);
    setSubmitSuccess(true);
    
    // Clear inputs
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');

    setTimeout(() => {
      setSubmitSuccess(false);
    }, 4000);
  };

  const handleDeleteInquiry = (id: string) => {
    setInquiries(inquiries.filter(i => i.id !== id));
  };

  // Autofill message from brief estimator
  const handleAutoFill = (briefText: string, subjectText: string) => {
    setMessage(briefText);
    setSubject(subjectText);
    // Smooth scroll straight down to the contact text area so they see it filled immediately
    const el = document.getElementById('contact-form-anchor');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter projects helper
  const filteredProjects = PROJECTS_DATA.filter(p => {
    if (projectFilter === 'All') return true;
    return p.tags.includes(projectFilter);
  });

  return (
    <div className="bg-[#FFFFFF] text-[#222222] min-h-screen flex flex-col selection:bg-primary font-sans overflow-x-hidden antialiased">
      
      {/* 1. Header & Navigation TopNavBar */}
      <nav className={`w-full sticky top-0 z-40 h-20 transition-all border-b border-zinc-100 bg-white/95 backdrop-blur-sm`}>
        <div className="max-w-[1240px] mx-auto px-6 md:px-12 flex justify-between items-center h-full">
          {/* Logo */}
          <a href="#home" className="font-display font-black text-xl tracking-tight text-zinc-900 cursor-pointer">
            DESIGNER.PORTFOLIO
          </a>

          {/* Nav items */}
          <div className="hidden md:flex items-center gap-8">
            {['PROJECTS', 'ABOUT', 'SKILLS', 'CONTACT'].map((s) => {
              const id = s.toLowerCase();
              const isActive = activeSection === id;
              return (
                <a
                  key={s}
                  href={`#${id}`}
                  className={`text-xs font-bold uppercase tracking-widest transition-colors pb-1 border-b-2 hover:text-[#222222] ${
                    isActive ? 'border-primary text-[#222222]' : 'border-transparent text-zinc-400'
                  }`}
                >
                  {s}
                </a>
              );
            })}
            
            {/* Click to open Printable Resume Modal */}
            <button
              onClick={() => setIsResumeOpen(true)}
              className="px-5 py-2.5 bg-zinc-900 text-primary font-display text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all cursor-pointer"
              id="nav-resume-btn"
            >
              Resume
            </button>
          </div>

          {/* Custom Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-900 hover:text-zinc-650 transition-colors"
            id="mobile-menu-trigger"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-zinc-200"
            id="mobile-drawer"
          >
            <div className="px-6 py-6 space-y-4 flex flex-col">
              {['PROJECTS', 'ABOUT', 'SKILLS', 'CONTACT'].map((s) => (
                <a
                  key={s}
                  href={`#${s.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-sm font-extrabold uppercase tracking-widest text-[#222222] py-2 border-b border-zinc-100"
                >
                  {s}
                </a>
              ))}
              
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsResumeOpen(true);
                }}
                className="w-full text-center py-3 bg-zinc-900 text-primary font-display text-xs font-black uppercase tracking-widest"
              >
                Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        {/* 2. Hero Section */}
        <section id="home" className="relative pt-24 pb-32 px-6 md:px-12 flex flex-col justify-center overflow-hidden">
          <div className="max-w-[1200px] mx-auto w-full text-left flex flex-col items-start gap-6">
            <span className="text-xs uppercase font-extrabold text-zinc-500 tracking-[0.25em] flex items-center gap-2">
              <span className="w-2 h-2 bg-primary inline-block"></span>
              Based in London / Available for Hire
            </span>
            
            <h1 className="font-display text-4xl sm:text-6xl md:text-8xl font-black max-w-[1000px] text-zinc-900 tracking-tighter leading-[0.9] mt-3">
              CREATING <span className="bg-primary px-3 relative inline-block text-zinc-900 select-none">UTILITY</span> THROUGH ELEGANCE.
            </h1>
            
            <p className="text-lg md:text-xl max-w-[650px] text-zinc-500 mt-6 leading-relaxed font-sans">
              I am a Senior Product Designer specializing in building accessible, high-performance digital ecosystems that bridge the gap between human intuition and technical complexity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
              <a
                href="#projects"
                className="px-8 py-4 bg-zinc-900 text-primary font-display text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:opacity-90"
              >
                VIEW SELECTED WORK
                <ArrowRight size={14} />
              </a>
              <a
                href="#contact"
                className="px-8 py-4 border-2 border-zinc-900 text-zinc-900 font-display text-xs font-black uppercase tracking-widest flex items-center justify-center transition-all hover:bg-zinc-900 hover:text-primary"
              >
                GET IN TOUCH
              </a>
            </div>
          </div>
        </section>

        {/* 3. Featured Projects Showcase */}
        <section id="projects" className="py-24 bg-zinc-950 text-white relative">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 w-full">
            
            {/* Context narrative header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8 border-b border-zinc-900 pb-10">
              <div>
                <span className="text-xs uppercase font-bold text-primary tracking-widest">SELECTED PORTFOLIO FILES // 01</span>
                <h2 className="font-display text-4xl sm:text-6xl font-black text-white leading-tight mt-2">FEATURED<br/>PROJECTS</h2>
              </div>
              <p className="text-xs font-mono text-zinc-400 tracking-wider">01 // SELECTED WORKS IN HIGH-FIDELITY</p>
            </div>

            {/* Quick interactive parameters bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 py-4 bg-zinc-900/50 px-6 border border-zinc-900 uppercase-no-radius">
              
              {/* Category Filter buttons */}
              <div className="flex flex-wrap gap-1 md:gap-2">
                {['All', 'Fintech', 'UI/UX', 'SaaS', 'Hardware'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setProjectFilter(filter)}
                    className={`px-3 py-1.5 text-[10px] uppercase font-bold tracking-widest transition-all cursor-pointer ${
                      projectFilter === filter
                        ? 'bg-primary text-zinc-900'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Grid or simple clean list view trigger */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-zinc-500 uppercase font-mono">Layout Mode:</span>
                <button
                  onClick={() => setListViewMode(false)}
                  className={`p-1.5 border hover:border-zinc-500 transition-colors cursor-pointer ${!listViewMode ? 'bg-primary text-zinc-900 border-primary' : 'border-zinc-800 text-zinc-400'}`}
                  title="Grid view"
                >
                  <Sliders size={12} />
                </button>
                <button
                  onClick={() => setListViewMode(true)}
                  className={`p-1.5 border hover:border-zinc-500 transition-colors cursor-pointer ${listViewMode ? 'bg-primary text-zinc-900 border-primary' : 'border-zinc-800 text-zinc-400'}`}
                  title="Simplified list view"
                >
                  <Monitor size={12} />
                </button>
              </div>
            </div>

            {/* High fidelity dynamic project showcase cards */}
            <div className={`grid gap-x-12 gap-y-16 ${listViewMode ? 'grid-cols-1 divide-y divide-zinc-900' : 'grid-cols-1 md:grid-cols-2'}`}>
              {filteredProjects.map((proj, i) => {
                // If not in list mode, the first project is giant and spans 2 columns
                const isGiant = !listViewMode && i === 0;
                
                return (
                  <motion.div
                    key={proj.id}
                    layoutId={`project-container-${proj.id}`}
                    onClick={() => setSelectedProject(proj)}
                    className={`group cursor-pointer product-card-hover text-left flex flex-col justify-between ${
                      isGiant ? 'md:col-span-2' : ''
                    } ${listViewMode ? 'py-8 first:pt-0' : ''}`}
                    id={`project-card-${proj.id}`}
                  >
                    <div className={`${listViewMode ? 'flex flex-col md:flex-row gap-6 items-center w-full' : ''}`}>
                      
                      {/* Image frame */}
                      <div className={`relative overflow-hidden bg-zinc-900 border border-zinc-800 transition-all duration-500 shrink-0 ${
                        listViewMode ? 'w-full md:w-1/3 aspect-video' : isGiant ? 'aspect-video md:aspect-[21/9] mb-8' : 'aspect-[4/5] mb-8'
                      }`}>
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover filter grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          {proj.tags.map(t => (
                            <span key={t} className="px-3 py-1 bg-primary text-zinc-900 text-[10px] font-black uppercase tracking-wider">
                              {t}
                            </span>
                          ))}
                        </div>
                        
                        {/* Custom hover indicators */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="px-5 py-2 w-36 text-center text-zinc-900 bg-primary font-display text-[10px] font-black uppercase tracking-widest">
                            Inspect Specs
                          </span>
                        </div>
                      </div>

                      {/* Details container */}
                      <div className={`flex-1 ${listViewMode ? 'space-y-2' : ''}`}>
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h3 className="font-display text-2xl font-black text-white mt-1 group-hover:text-primary transition-colors flex items-center gap-1">
                              {proj.title}
                              <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </h3>
                            <p className="text-zinc-400 font-sans text-sm max-w-[500px] mt-2 leading-relaxed">{proj.description}</p>
                          </div>
                          
                          {/* Deliverables quick tag count indicators */}
                          {!listViewMode && (
                            <div className="hidden lg:flex gap-1">
                              {proj.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 border border-zinc-800 text-[9px] uppercase font-mono text-zinc-500 rounded-sm">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
          </div>
        </section>

        {/* 4. BIO SECTION ("About Me") */}
        <section id="about" className="py-32 px-6 md:px-12 bg-white relative overflow-hidden">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center text-left">
              
              {/* Profile Image Column */}
              <div className="lg:col-span-5 relative">
                <div className="aspect-[3/4] bg-zinc-50 border border-zinc-200 overflow-hidden relative group">
                  <img
                    src="https://lh3.googleusercontent.com/aida/AP1WRLtf16zCuWJScJEv9NVOdrwMPHxxAr-wZr8U8z_kncXik7slE50ugW2UOvWI_0x5SVBLdvBxc9z_4ncy3p3d4tpjyCuN3FPjmY86ocZlp0Zwp4chPTDGDEAZD6LQI6vo_9cF-etw0aQN1ZQycMCis3mbGg0PfMsQbT8eMDwEBwhcwYUzC7boB7FI1Vd07CyVlmu1tb9_DpAOI0kxlDhiZYJULlXQcd-kwsLom2nVg1rm9Hjzle9vU2IOjooT"
                    alt="Daniela Penaranda"
                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  
                  {/* Design Tactile Corner Widget */}
                  <div className="absolute inset-0 border border-zinc-900/10 pointer-events-none group-hover:border-zinc-900/20 transition-all"></div>
                </div>
                {/* Tactile Offset block decoration */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 border-4 border-primary -z-10 group-hover:bg-primary/5 transition-all"></div>
              </div>

              {/* Informative Column */}
              <div className="lg:col-span-7 space-y-8 font-sans">
                <div>
                  <span className="text-xs uppercase font-extrabold text-zinc-400 tracking-widest block">PHILOSOPHY STATEMENT // 02</span>
                  <h2 className="font-display text-4xl sm:text-6xl font-black text-zinc-900 mt-2 leading-[0.9]">
                    LESS, BUT<br/>
                    <span className="text-[#FFFFFF] bg-[#222222] px-3 py-1 font-display tracking-tight inline-block mt-1">BETTER.</span>
                  </h2>
                </div>

                <p className="text-lg md:text-xl text-zinc-500 leading-relaxed max-w-[620px]">
                  My approach is rooted in the philosophy that design should be invisible yet indispensable. Over the last 8 years, I've partnered with startups and Fortune 500 companies to distill complex problems into clear digital solutions.
                </p>

                <p className="text-sm text-zinc-500 leading-relaxed font-sans max-w-[600px]">
                  I believe in the power of systematic thinking. Whether I'm building a design system from scratch or refining a single checkout flow, my goal is always to create harmony between the brand's vision and the user's needs.
                </p>

                {/* Micro-interactive parameters for active work credentials */}
                <div className="space-y-3 pt-4 border-t border-zinc-100 max-w-[500px]">
                  <div className="flex items-center gap-3 py-1 hover:translate-x-1 transition-transform">
                    <span className="p-1 bg-[#D9FF99] text-[#222222] inline-block">
                      <Check size={14} className="font-extrabold" />
                    </span>
                    <span className="text-xs uppercase tracking-widest font-bold text-zinc-800">EX-LEAD DESIGNER AT GOOGLE LONDON</span>
                  </div>
                  <div className="flex items-center gap-3 py-1 hover:translate-x-1 transition-transform">
                    <span className="p-1 bg-[#D9FF99] text-[#222222] inline-block">
                      <Check size={14} className="font-extrabold" />
                    </span>
                    <span className="text-xs uppercase tracking-widest font-bold text-zinc-800">WORKING GLOBALLY TO SCALE MVPs</span>
                  </div>
                </div>

                {/* Abstract Systems Thinking Complexity Simulator */}
                <div className="p-6 bg-zinc-50 border border-zinc-150 rounded-none space-y-4 max-w-[600px] text-left">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-black text-zinc-800 uppercase font-display flex items-center gap-1.5">
                      <Sliders size={12} className="text-zinc-500" />
                      Systems thinking simulator
                    </span>
                    <span className="text-[10px] font-mono font-bold text-zinc-400">ABSTRACT CONCEPT MODIFIER</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-zinc-500 mb-1">
                          <span>Conceptual Noise Complexity</span>
                          <span className="font-mono font-bold">{complexity}%</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={complexity}
                          onChange={(e) => setComplexity(Number(e.target.value))}
                          className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-zinc-500">Apply Design Constraint</span>
                        <button
                          onClick={() => setStrictConstraints(!strictConstraints)}
                          className={`px-3 py-1 text-[10px] uppercase font-bold tracking-widest border transition-all ${
                            strictConstraints ? 'bg-zinc-900 text-primary border-zinc-900' : 'bg-transparent text-zinc-500 border-zinc-300'
                          }`}
                        >
                          {strictConstraints ? 'Constraint ON' : 'Constraint OFF'}
                        </button>
                      </div>
                    </div>

                    {/* Result Visual block */}
                    <div className="h-28 bg-zinc-950 border border-zinc-900 flex flex-wrap gap-1 p-3 items-center justify-center content-center relative overflow-hidden">
                      <div className="absolute top-1.5 left-2 text-[9px] font-mono text-zinc-400">GRID REDUCTION</div>
                      
                      {/* Generative blocks mimicking files complexity */}
                      {Array.from({ length: 16 }).map((_, i) => {
                        // Height depends on complexity and constraints
                        const factor = strictConstraints ? 15 : 60;
                        const height = Math.min(64, Math.abs(Math.sin(i * 1.7)) * factor * (complexity / 100));
                        return (
                          <div
                            key={i}
                            className={`w-2.5 transition-all duration-300 ${
                              strictConstraints ? 'bg-primary' : 'bg-zinc-700'
                            }`}
                            style={{ height: `${Math.max(5, height)}px` }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* 5. Capabilities Section */}
        <section id="skills" className="py-24 bg-zinc-950 text-white relative">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 w-full text-left">
            
            <div className="mb-12 border-b border-zinc-900 pb-8">
              <span className="text-xs uppercase font-extrabold text-primary tracking-widest block">TECH STACK INTERACTIVE MATRIX // 03</span>
              <h2 className="font-display text-4xl sm:text-6xl font-black text-white leading-tight mt-2">
                CORE<br/>CAPABILITIES
              </h2>
            </div>

            {/* Embed the custom capabilities playground modular component */}
            <CapabilitiesPlayground />

            {/* Methodology sidebar content rendered as high contrast block below capabilities */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
              <div className="p-8 bg-primary text-[#222222] md:col-span-1 flex flex-col justify-between">
                <span className="text-xs uppercase font-bold tracking-[0.2em] block text-zinc-800">METHODOLOGY SUMMARY</span>
                <h4 className="font-display text-2xl font-black leading-tight mt-6 md:mt-0">THE AGILE ROADWAY</h4>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-8 md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: 'Design Thinking', text: 'Empathize, define, and rapidly prototype constraints.' },
                  { name: 'User Research', text: 'In-depth telemetry analytics and physical contextual inquiry.' },
                  { name: 'Product Strategy', text: 'Aligning business multipliers with user experience gains.' },
                  { name: 'Agile Workflow', text: 'Sub-weekly iteration checkpoints with transparent files feedback.' }
                ].map((item, index) => (
                  <div key={item.name} className="space-y-2">
                    <span className="text-primary font-mono text-xs font-bold block">0{index + 1} //</span>
                    <h5 className="font-bold text-xs uppercase tracking-wider text-white">{item.name}</h5>
                    <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 6. Estimator & Contact Section */}
        <section id="contact" className="py-28 bg-[#FFFFFF] relative border-t border-zinc-100">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center select-none-headers">
            
            <div className="max-w-4xl mx-auto mb-16 text-center">
              <span className="text-[10px] font-black tracking-widest text-zinc-400 uppercase bg-zinc-100 px-3 py-1.5 inline-block">INITIATE DISPATCH MATRIX</span>
              <h2 className="font-display text-4xl sm:text-6xl font-black text-zinc-900 mt-4 tracking-tighter leading-none">
                HAVE A <span className="bg-[#D9FF99] px-3 py-1 relative inline-block text-zinc-900">PROJECT</span> IN MIND?
              </h2>
              <p className="text-base text-zinc-500 font-sans mt-6 max-w-[650px] mx-auto leading-relaxed">
                I am currently accepting new select partnership opportunities for late 2024. Estimate your project scope using our simulator, or drop me a letter directly.
              </p>
            </div>

            {/* Grid connecting Estimator and Form */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left max-w-[1100px] mx-auto">
              
              {/* Left Side: Interactive Scope Estimator */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 bg-zinc-50 border border-zinc-200">
                  <h4 className="font-display font-black text-xs uppercase tracking-widest text-zinc-800 mb-3">INSTRUCTIONS FOR ESTIMATOR</h4>
                  <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">
                    Use our live capability calculator. Once configured, click the "Autofill" button to serialize the values and instantly generate a customized design brief inside the contact input screen on your right!
                  </p>
                </div>
                
                {/* Estimator module embedded */}
                <ProjectEstimator onAutoFill={handleAutoFill} />
              </div>

              {/* Right Side: Contact Form Input with autofill anchor */}
              <div className="lg:col-span-7 space-y-6" id="contact-form-anchor">
                <form onSubmit={handleContactSubmit} className="space-y-6 bg-zinc-50/50 p-6 md:p-8 border border-zinc-200 uppercase-no-radius">
                  
                  {/* Status Banner */}
                  <AnimatePresence>
                    {submitSuccess && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-zinc-900 text-white p-4 uppercase font-bold font-display text-xs tracking-widest flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="text-primary" size={16} />
                        Inquiry Received Locally! Logged In Admin Inbox.
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label className="text-[10px] font-black uppercase text-zinc-700 tracking-wider mb-2">Name / Company</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Sarah J. (Stripe)"
                        className="p-4 bg-zinc-100 border-none select-none text-xs text-zinc-900 tracking-wider font-sans focus:outline-none focus:ring-1 focus:ring-zinc-900"
                        id="contact-name-field"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[10px] font-black uppercase text-zinc-700 tracking-wider mb-2">Your Business Email</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sarah.j@stripe.com"
                        className="p-4 bg-zinc-100 border-none select-none text-xs text-zinc-900 tracking-wider font-sans focus:outline-none focus:ring-1 focus:ring-zinc-900"
                        id="contact-email-field"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Select scopes manually */}
                    <div className="flex flex-col">
                      <label className="text-[10px] font-black uppercase text-zinc-700 tracking-wider mb-2">Capacity Scope</label>
                      <select
                        value={scope}
                        onChange={(e) => setScope(e.target.value)}
                        className="p-4 bg-zinc-100 border-none select-none text-xs text-zinc-900 tracking-wider font-sans focus:outline-none focus:ring-1 focus:ring-zinc-900 appearance-none"
                      >
                        <option value="UX/UI Redesign">UX/UI Redesign</option>
                        <option value="Complete SaaS App">Complete SaaS App</option>
                        <option value="Design System Set">Design System Set</option>
                        <option value="Interactive Prototype">Interactive Prototype</option>
                      </select>
                    </div>

                    <div className="flex flex-col">
                      <label className="text-[10px] font-black uppercase text-zinc-700 tracking-wider mb-2">Budget Target</label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="p-4 bg-zinc-100 border-none select-none text-xs text-zinc-900 tracking-wider font-sans focus:outline-none focus:ring-1 focus:ring-zinc-900 appearance-none"
                      >
                        <option value="< €10,000">&lt; €10k</option>
                        <option value="€15,000 - €30,000">€15k - €30k</option>
                        <option value="€30,000+">€30k+</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[10px] font-black uppercase text-zinc-700 tracking-wider mb-2">Inquiry Headline (Subject)</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="High-Density Dashboard Overhaul"
                      className="p-4 bg-zinc-100 border-none select-none text-xs text-zinc-900 tracking-wider font-sans focus:outline-none focus:ring-1 focus:ring-zinc-900"
                      id="contact-subject-field"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[10px] font-black uppercase text-zinc-700 tracking-wider mb-2">Detailed Specifications (Message)</label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      placeholder="Define design layout constraints, scope, target goals..."
                      className="p-4 bg-zinc-100 border-none select-none text-xs text-zinc-900 leading-relaxed font-sans focus:outline-none focus:ring-1 focus:ring-zinc-900 resize-none"
                      id="contact-message-field"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4.5 bg-zinc-900 text-primary font-display text-xs font-black uppercase tracking-[0.25em] hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    Send Inquiry Ticket
                    <Send size={12} />
                  </button>
                </form>
              </div>

            </div>

            {/* Secret local storage Inbox toggler */}
            <div className="mt-20 border-t border-zinc-100 pt-12 max-w-[1100px] mx-auto text-left space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                <div className="space-y-1">
                  <h4 className="font-display font-black text-xs uppercase tracking-wider text-zinc-800 flex items-center gap-1.5">
                    <Inbox size={14} className="text-zinc-650" />
                    Simulated Persistent Database Admin Portal
                  </h4>
                  <p className="text-[11px] text-zinc-500 font-sans">
                    Monitor sent client briefs, view specifications, delete records, or send pre-drafted replies in absolute real-time.
                  </p>
                </div>
                
                <button
                  onClick={() => setShowInbox(!showInbox)}
                  className="px-4 py-2 border border-zinc-300 hover:bg-zinc-50 text-[10px] font-mono tracking-wider font-bold transition-all text-zinc-700"
                >
                  {showInbox ? 'Minimize Inbox Console' : 'Expand Inbox Console'}
                </button>
              </div>

              <AnimatePresence>
                {showInbox && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <InquiriesPortal inquiries={inquiries} onDelete={handleDeleteInquiry} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </section>
      </main>

      {/* 7. Footer */}
      <footer className="w-full mt-auto bg-zinc-950 text-white border-t border-zinc-900">
        <div className="max-w-[1240px] mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:items-start items-center">
            <span className="font-display text-lg font-black tracking-tight text-white">DESIGNER.PORTFOLIO</span>
            <p className="text-[10px] font-mono text-zinc-500 mt-2 text-center md:text-left">
              © 2026 Designer Portfolio. Built with absolute pixel precision.
            </p>
          </div>
          <div className="flex gap-8 text-[11px] font-mono">
            <a href="#" className="text-zinc-400 hover:text-primary transition-colors">LinkedIn</a>
            <a href="#" className="text-zinc-400 hover:text-primary transition-colors">Dribbble</a>
            <a href="mailto:hello@designer.portfolio" className="text-zinc-400 hover:text-primary transition-colors text-right">hello@designer.portfolio</a>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 font-display text-xs font-black uppercase tracking-widest text-primary hover:opacity-75 transition-all cursor-pointer"
          >
            Back to top
            <ArrowUp size={14} />
          </button>
        </div>
      </footer>

      {/* Slide-out Project Specifications Panel */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsDrawer
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Printable Resume Builder Workspace Modal */}
      <AnimatePresence>
        {isResumeOpen && (
          <ResumeModal onClose={() => setIsResumeOpen(false)} />
        )}
      </AnimatePresence>

    </div>
  );
}
