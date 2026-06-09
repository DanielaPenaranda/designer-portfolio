export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  challenge: string;
  solution: string;
  deliverables: string[];
  prototypeNotes?: string;
  prototypeControlLabel?: string;
  prototypeType?: 'finance' | 'charts' | 'smarthome';
}

export interface SkillDetail {
  name: string;
  level: string;
  description: string;
  years: number;
  highlight: string;
}

export interface Inquiry {
  id: string;
  name: string;
  subject: string;
  email: string;
  message: string;
  scope: string;
  budget: string;
  createdAt: string;
}
