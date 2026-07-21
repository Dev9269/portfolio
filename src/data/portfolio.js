export const profile = {
  name: 'Jainam H. Maru',
  eyebrow: 'B.Tech Cybersecurity · Ethical Hacker · AI Builder · OS Creator',
  tagline: 'Building secure systems, intelligent software, and ambitious ideas.',
  location: 'India',
  status: 'Online',
  resume: '/resume.html',
  email: 'Jainammaru567000@gmail.com',
  github: 'https://github.com/Dev9269',
  linkedin: 'https://www.linkedin.com/in/jainam-maru-007803386',
  instagram: 'https://www.instagram.com/jainammaru_/',
  roles: [
    { title: 'Cybersecurity Engineer', icon: 'Shield' },
    { title: 'Ethical Hacker', icon: 'Skull' },
    { title: 'AI Builder', icon: 'Brain' },
    { title: 'OS Creator', icon: 'Monitor' },
  ],
  focus: ['Cybersecurity', 'AI Systems', 'Pentesting'],
  university: 'Parul University',
  degree: 'B.Tech in Cybersecurity',
};

export const stats = [
  { label: 'CTF Competitions', value: 5, suffix: '+' },
  { label: 'Hackathons', value: 3, suffix: '' },
  { label: 'Projects Built', value: 7, suffix: '' },
  { label: 'Security Tools', value: 16, suffix: '' },
  { label: 'GitHub Contributions', value: 200, suffix: '+' },
  { label: 'CTF Score (Best)', value: 2713, suffix: '' },
];

export const about = {
  story:
    'A B.Tech Cybersecurity student at Parul University who believes the best way to learn security is to build, break, and defend. Jainam approaches cybersecurity not as a spectator but as a builder — crafting everything from educational operating systems to fraud detection engines.',
  detail:
    'From securing CTF flags to architecting Debian-based OS distributions, the work spans the full spectrum of modern security engineering. Every project is an experiment, every competition is a lesson, and every tool mastered is a new capability in the arsenal.',
};

export const journey = [
  { year: '2022', title: 'Started Programming', description: 'Began with Python and C/C++. Built first CLI tools and automation scripts.' },
  { year: '2023', title: 'Entered Cybersecurity', description: 'Joined B.Tech Cybersecurity at Parul University. Started CTF training.' },
  { year: '2023', title: 'First CTF Victory', description: 'Participated in first CTF competitions. Team Caffeine and Code formed.' },
  { year: '2024', title: 'E-Rakshak CTF', description: 'Secured 39th place among 157 teams with 2713 points. Major milestone.' },
  { year: '2024', title: 'NHAI Hackathon', description: 'Built Smart Toilet Monitoring Platform at national-level innovation hackathon.' },
  { year: '2025', title: 'Built Educational OS', description: 'Debian-based OS with labs, exams, and developer tools.' },
  { year: '2025', title: 'AI Fraud Detection', description: 'Built ML-powered insider threat detection for banking environments.' },
  { year: '2026', title: 'Future Startup Vision', description: 'Entrepreneurial path toward innovative security and education solutions.' },
];

export const competitions = [
  {
    name: 'E-Rakshak CTF',
    team: 'Caffeine and Code',
    rank: '39th Place',
    outOf: '157 Teams',
    score: 2713,
    badge: 'Top 25%',
    description: 'National-level cybersecurity competition testing penetration testing, cryptography, web exploitation, and forensics skills.',
    gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
  },
  {
    name: 'NHAI Innovation Hackathon',
    team: 'Solo / Team',
    rank: 'National Participant',
    outOf: '',
    score: null,
    badge: 'Participant',
    description: 'Built a Smart Toilet Maintenance and Monitoring Platform for national highway infrastructure under NHAI.',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
  },
  {
    name: 'Multiple CTF Events',
    team: 'Various',
    rank: 'Active Competitor',
    outOf: '',
    score: null,
    badge: 'Ongoing',
    description: 'Regular participant in CTF challenges covering reverse engineering, binary exploitation, and web security.',
    gradient: 'from-purple-500/20 via-violet-500/10 to-transparent',
  },
];

export const projects = [
  {
    title: 'SSH Honeypot',
    tag: 'Security Research',
    description:
      'A production-ready SSH honeypot in Python using Paramiko. Captures attack patterns, logs credential attempts, and simulates a legitimate OpenSSH server — all without granting real access.',
    stack: ['Python', 'Paramiko', 'Threading', 'JSON Logging', 'Network Security'],
    impact: 'Attack intelligence',
    gradient: 'from-rose-500/20 via-red-500/10 to-transparent',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
    initial: 'S',
    liveUrl: 'https://github.com/Dev9269/ssh-honeypot',
    githubUrl: 'https://github.com/Dev9269/ssh-honeypot',
    highlights: [
      'Realistic OpenSSH banner simulation',
      'Multi-threaded concurrent connection handling',
      'JSON + log file structured attack recording',
      'Configurable whitelist/blacklist IP filtering',
    ],
  },
  {
    title: 'Password Cracker Toolkit',
    tag: 'Security Tool',
    description:
      'A modular password security toolkit for ethical research and CTF competitions. Supports mask, combinator, dictionary, brute-force, hybrid, and rule-based attacks with session persistence, multiprocessing, wordlist utilities, and GPU acceleration via Hashcat.',
    stack: ['Python', 'Hashcat', 'Multiprocessing', 'CLI', 'Pytest'],
    impact: 'Password security analysis',
    gradient: 'from-orange-500/20 via-amber-500/10 to-transparent',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800',
    initial: 'P',
    liveUrl: 'https://github.com/Dev9269/password-cracker-toolkit',
    githubUrl: 'https://github.com/Dev9269/password-cracker-toolkit',
    highlights: [
      '50+ hash algorithms with auto-detection and salt support',
      '6 attack modes + hashcat-compatible rule engine',
      '127 unit tests with 100% pass rate',
      'Session persistence, multiprocessing, JSON/CSV reporting',
    ],
  },
  {
    title: 'CyberLab Pro',
    tag: 'CTF Platform',
    description:
      'A professional-grade CTF learning environment with interactive challenges, real-time leaderboards, scoring, and progressive cybersecurity lessons. Built with React, Node.js, and a cyberpunk aesthetic.',
    stack: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'Full-Stack'],
    impact: 'Cybersecurity training',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    initial: 'C',
    liveUrl: 'https://github.com/Dev9269/CyberLab-Pro',
    githubUrl: 'https://github.com/Dev9269/CyberLab-Pro',
    highlights: [
      '4 interactive CTF challenges with scoring',
      '5 progressive cybersecurity learning modules',
      'Global leaderboard with ranking badges',
      'Full responsive cyberpunk UI design',
    ],
  },
  {
    title: 'AI Chatbot',
    tag: 'Full-Stack App',
    description:
      'A smart AI chatbot powered by Groq AI (Llama 3.3 70B) with Unsplash image search, dark/light mode, chat history persistence, and a clean responsive UI — JS frontend + Python backend.',
    stack: ['JavaScript', 'Python', 'Groq AI', 'Unsplash API', 'HTML/CSS'],
    impact: 'AI + web integration',
    gradient: 'from-violet-500/25 via-purple-500/10 to-transparent',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    initial: 'A',
    liveUrl: 'https://github.com/Dev9269/ai-chatbot',
    githubUrl: 'https://github.com/Dev9269/ai-chatbot',
    highlights: [
      'Groq Llama 3.3 70B AI integration',
      'Relevant image search for every reply',
      'Light/dark mode with persistent chat history',
      'Python FastAPI backend + JS frontend',
    ],
  },
  {
    title: 'NHAI Monitoring Platform',
    tag: 'Hackathon Project',
    description:
      'Smart Toilet Maintenance and Monitoring Platform built for the NHAI Innovation Hackathon. Provides infrastructure visibility, IoT-ready reporting, and operational decision support for highway rest stops.',
    stack: ['Web App', 'IoT Concepts', 'Dashboards', 'Data Visualization'],
    impact: 'Civic infrastructure',
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    initial: 'N',
    liveUrl: '/contact',
    githubUrl: '/contact',
    highlights: [
      'Real-time infrastructure monitoring',
      'Maintenance alert system',
      'Data-driven decision dashboards',
    ],
  },
];

export const skillGroups = [
  {
    category: 'Programming Languages',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'JavaScript', level: 80 },
      { name: 'C/C++', level: 75 },
      { name: 'Shell/Bash', level: 70 },
    ],
  },
  {
    category: 'Cybersecurity',
    skills: [
      { name: 'Kali Linux', level: 88 },
      { name: 'Burp Suite', level: 82 },
      { name: 'Wireshark', level: 78 },
      { name: 'Nmap', level: 85 },
      { name: 'Metasploit', level: 75 },
      { name: 'OWASP Juice Shop', level: 80 },
    ],
  },
  {
    category: 'AI & Data',
    skills: [
      { name: 'Machine Learning', level: 78 },
      { name: 'FastAPI', level: 75 },
      { name: 'Streamlit', level: 82 },
      { name: 'AI Integration', level: 76 },
    ],
  },
  {
    category: 'Web & DevOps',
    skills: [
      { name: 'React / Vite', level: 82 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Git/GitHub', level: 88 },
      { name: 'Docker', level: 60 },
    ],
  },
  {
    category: 'Linux & Systems',
    skills: [
      { name: 'Linux Administration', level: 85 },
      { name: 'Debian Packaging', level: 72 },
      { name: 'System Hardening', level: 70 },
      { name: 'OS Development', level: 65 },
    ],
  },
];

export const cyberExpertise = [
  { area: 'Penetration Testing', icon: 'Target' },
  { area: 'Vulnerability Assessment', icon: 'Search' },
  { area: 'Web Application Security', icon: 'Globe' },
  { area: 'Network Security', icon: 'Network' },
  { area: 'CTF Competitions', icon: 'Flag' },
  { area: 'Security Research', icon: 'BookOpen' },
  { area: 'Linux Hardening', icon: 'Terminal' },
  { area: 'Threat Modeling', icon: 'AlertTriangle' },
];

export const interests = [
  'Penetration Testing',
  'Vulnerability Assessment',
  'Web Application Security',
  'Artificial Intelligence',
  'Machine Learning',
  'Operating System Development',
  'Cloud Technologies',
  'Open Source Software',
  'Security Research',
  'Cryptography',
  'Reverse Engineering',
  'IoT Security',
];

export const goals = {
  vision: 'To become a highly skilled cybersecurity professional, security researcher, and technology entrepreneur who develops innovative solutions that improve education, security, and digital infrastructure.',
  shortTerm: [
    'Master advanced penetration testing methodologies',
    'Contribute to open-source security tools',
    'Achieve industry-recognized security certifications',
    'Publish cybersecurity research and findings',
  ],
  longTerm: [
    'Found a cybersecurity-focused technology company',
    'Build products that secure digital infrastructure at scale',
    'Bridge the gap between education and security awareness',
    'Mentor the next generation of security researchers',
  ],
};

export const certifications = [
  {
    title: 'Cybersecurity & Ethical Hacking',
    issuer: 'Self-Paced / Hands-On Labs',
    description: 'Foundations of ethical hacking, reconnaissance, exploitation, and reporting.',
  },
  {
    title: 'Linux System Administration',
    issuer: 'Practical Experience',
    description: 'Debian-based OS management, shell scripting, user administration, and system hardening.',
  },
  {
    title: 'Penetration Testing Fundamentals',
    issuer: 'CTF / Lab Experience',
    description: 'Web exploitation, privilege escalation, network pivoting, and password cracking.',
  },
  {
    title: 'Web Application Security',
    issuer: 'OWASP / Hands-On',
    description: 'OWASP Top 10, Burp Suite workflows, XSS, SQLi, CSRF, and authentication bypass.',
  },
];

export const contact = {
  email: 'Jainammaru567000@gmail.com',
  github: 'https://github.com/Dev9269',
  linkedin: 'https://www.linkedin.com/in/jainam-maru-007803386',
  instagram: 'https://www.instagram.com/jainammaru_/',
  intro:
    'Open for cybersecurity research collaborations, CTF teamups, AI security experiments, and ambitious product conversations.',
};
