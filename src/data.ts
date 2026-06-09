import { Project, SkillDetail } from './types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'neo-bank',
    title: 'NEO-BANK INTERFACE',
    subtitle: 'High-Fiddle Mobile Banking Overhaul',
    description: 'Redefining personal finance for a generation that demands transparency, control and speed.',
    longDescription: 'This mobile-first experience translates complex multi-currency ledger routing into a peaceful, spatial feed. Built under extreme user-latency constraints, we replaced hierarchical navigation taps with tactile fluid scrolling cards and interactive biometric security zones.',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLtv9S9mz9_qjBC2j9UhAE_8Tm5hEA4XvnFHnMf0j2wUDcNTegNcgOpfbkXBhcqnFNZlNiq5Py2JhdeujvpK90-yUoAXAIhFNP4x4anER388VpBGEovUtxUnXp-zr_wxB_Q1SOid_ybdycHsM4pLnrPjAQl1KDZfBdRcJ_LnUbCapY96sOQJSExfvPuXORwBYEjd2WG99sDcyjhGNMoRptBipcKwOlndw1Opna1Zj8BdNWjViA0UIh89PN-7',
    tags: ['Fintech', 'UI/UX'],
    metrics: [
      { label: 'Conversion Rate Increase', value: '+42%' },
      { label: 'Average Onboarding Time', value: '45s' },
      { label: 'App Rating', value: '4.9★' }
    ],
    challenge: 'Legacy banking patterns are built around suspicion and friction. Users had to decipher loaded ledger language and navigate buried transaction details. Modern savers require instant micro-predictions and zero mental math to understand their balance velocity.',
    solution: 'We engineered a unified "liquidity timeline" combining checking, yield-bearing reserves, and automated debt amortization into a single, intuitive line graph. Every deposit instantly triggers micro-allocations directly visual to the user in high-fidelity animation.',
    deliverables: ['Custom Design System', 'High-Fidelity Framer Components', 'Interactive Biometric Flow', 'Card Packaging Blueprint'],
    prototypeType: 'finance',
    prototypeControlLabel: 'Test Automated Capital Allocation Slider',
    prototypeNotes: 'Move the allocator to see how funds are automatically routed between Instant Spending and High-Yield Savings Vault in absolute real-time.'
  },
  {
    id: 'quantum-analytics',
    title: 'QUANTUM ANALYTICS',
    subtitle: 'Real-time high-throughput market visualization dashboard',
    description: 'Enterprise-grade dashboarding for high-frequency market data visualization.',
    longDescription: 'A professional-grade live analytics station. It handles sub-millisecond charting ticks without locking the browser UI thread. Combining multi-axis canvas rendering, precise density toggle controls, and customizable grid snapping widgets.',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLunjEzUQ_sqSGTCUw_zKQc6-DnpYFveizAl2LdNcauPvLoeoMrC0-KNHnEmsFLGBoVWk4MbTzX5taHL6Erv-AAw88T0B7khwhAIpXEU90h2kPnOs5kHyWvApTmQwLpvJRxu-kv903bu_fOG8zlgW-pqxNvyJsfKvFRufh6gbzBDcBOCEdJCmedS_-L0nxvaA831bCwFo8NyOB7FkcTnBclf5Az8jePOYR7bHYZx0A7vdomhB4qYMw1yc90i',
    tags: ['SaaS'],
    metrics: [
      { label: 'Data Rendering Speed', value: '16ms' },
      { label: 'Concurrent Tickers', value: '500+' },
      { label: 'Trader Workflow Efficiency', value: '+35%' }
    ],
    challenge: 'Wall Street software is notoriously cluttered, with heavy visual noise, inconsistent color semantics, and excessive menu diving. The challenge was displaying dense high-dimensional timeseries data in a clear layout without sacrificing functional depth.',
    solution: 'Designed an eastern-blue accenting system to draw focus to anomalies, backed by standard flat card layouts, adaptive zoom rulers, and 1px borders that maximize information density while keeping aesthetic calm.',
    deliverables: ['Component library with 80+ dynamic widgets', 'Full Figma UX Audit Matrix', 'Dark/Light adaptive palette tokens', 'Canvas chart component architecture'],
    prototypeType: 'charts',
    prototypeControlLabel: 'Interactive Market Ticker Frequency Generator',
    prototypeNotes: 'Simulate high-velocity ticks. Adjust the frequency slider to see how the chart clusters incoming data packages instantly.'
  },
  {
    id: 'lumina-smart-home',
    title: 'LUMINA SMART HOME',
    subtitle: 'IoT High-End Residential Ambient Interface',
    description: 'IoT control systems for high-end residential architectural environments.',
    longDescription: 'Bridging technical physical control with structural room hierarchy. Designed for extreme visual comfort and accessibility, utilizing dark, tonal interfaces that prevent glare in dim environments while representing active appliances as subtle physical light halos.',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLuWcQ8oZFoG3hF2A4cPGuiNt0vlHM8U1-6tcpEpn8RccEU2okAQiRD_NRs6Kl5N25VKlE4Ri46pNDjsMqawIhbNb13waO7xP1Va-qPBQ7vX-LXIhdNH7EoR0df7mRgPEFHZjWySIghnKeuHJE8Afxmh7RJ59EXUbZenZ2qYnECQJlh_nWJ9PKRIGaaeJPbuoFxnPx0ucz9QVVITH7JFnleU_388oyHKJ4z7qZi-EqV0NMgVCY3Uh02hkYyw',
    tags: ['Hardware', 'UI/UX'],
    metrics: [
      { label: 'Physical System Latency', value: '25ms' },
      { label: 'Luminance Adaptation Range', value: '0-100%' },
      { label: 'User Adoption Rating', value: '4.95/5' }
    ],
    challenge: 'Smart home interfaces suffer from chaotic icon pollution and sluggish response feedback. Clients in premium residences are frustrated by complex, glowing screens that interrupt the calm of their interior architecture.',
    solution: 'Created an application utilizing a single radial knob gesture for all light and climate vectors, accompanied by spatial audio confirmation. Built a black, tactile, high-contrast HUD fitting effortlessly in architectural wall panels.',
    deliverables: ['Tactile Interface Specifications', 'Radial Control State Machine', 'Haptic Pattern Codebook', 'Wall Panel Physical Mount Mockups'],
    prototypeType: 'smarthome',
    prototypeControlLabel: 'Lumina Ambiance Dimmer Simulator',
    prototypeNotes: 'Drag the slider to preview how the screen transitions into active Ambiance mode as home lighting shifts.'
  }
];

export const SKILL_DETAILS: Record<string, SkillDetail> = {
  Figma: {
    name: 'Figma',
    level: 'Expert',
    years: 8,
    description: 'Advanced design architecture, building dynamic component libraries with responsive auto-layouts, custom token pipelines, and complex micro-interaction prototypes.',
    highlight: 'Built a multi-brand global design system supporting 14 business units with automated Figma-to-Code variables.'
  },
  React: {
    name: 'React',
    level: 'Advanced',
    years: 6,
    description: 'Bridging design and production. Authoring modular, performant functional components, highly optimized state flows, and custom rendering adapters.',
    highlight: 'Reduced client-side UI latency by 40% on enterprise trading dashboard systems via optimized component trees.'
  },
  Tailwind: {
    name: 'Tailwind CSS',
    level: 'Expert',
    years: 6,
    description: 'Styling interfaces rapidly with utility-first layouts, strict responsive architectures, and strict conformance to design token systems and spacing constants.',
    highlight: 'Spearheaded conversion of highly verbose styling setups into rapid, 100% compliant Tailwind systems.'
  },
  'Three.js': {
    name: 'Three.js',
    level: 'Intermediate',
    years: 3,
    description: 'Weaving real-time 3D elements into standard layouts, from ambient particle fields to fully interactive hardware models and immersive product customization.',
    highlight: 'Integrated gorgeous real-time 3D model customizers directly on device product landing pages.'
  }
};
