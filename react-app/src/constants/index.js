export const navLinks = [
  {
    id: 1,
    name: 'Home',
    href: '#home',
  },
  {
    id: 2,
    name: 'About',
    href: '#about',
  },
  {
    id: 3,
    name: 'Experience',
    href: '#experience',
  },
  {
    id: 4,
    name: 'Projects',
    href: '#projects',
  },
  {
    id: 5,
    name: 'Awards',
    href: '#awards',
  },
  {
    id: 6,
    name: 'Skills',
    href: '#skills',
  },
  {
    id: 7,
    name: 'Leadership',
    href: '#leadership',
  },
  {
    id: 8,
    name: 'Contact',
    href: '#contact',
  },
];

export const myProjects = [
  {
    title: 'DockyAI',
    competition: 'MaritimeONE Case Summit 2025',
    badge: 'CHAMPIONS 🏆',
    desc: 'DockyAI is an AI platform that optimizes port operations with anchorage recommendations, A* routing, and reinforcement learning.',
    subdesc: 'Champion project at the MaritimeONE Case Summit 2025.',
    href: 'https://github.com/pushkalv/dockyai',
    live: 'https://dockyai.vercel.app',
    texture: '/assets/dockyai-demo.jpg',
    logo: '/assets/project-logo1.png',
    logoStyle: {
      backgroundColor: '#2A1816',
      border: '0.2px solid #36201D',
      boxShadow: '0px 0px 60px 0px #AA3C304D',
    },
    spotlight: '/assets/spotlight1.png',
    tags: [
      { id: 1, name: 'Machine Learning', path: '/assets/react.svg' },
      { id: 2, name: 'A* Routing', path: '/assets/tailwindcss.png' },
      { id: 3, name: 'Reinforcement Learning', path: '/assets/typescript.png' },
      { id: 4, name: 'Real-time Analytics', path: '/assets/react.svg' },
      { id: 5, name: 'Python', path: '/assets/react.svg' },
    ],
    details: {
      challenge: 'A severe bottleneck in anchorage synchronization was causing massive delays and huge costs for port authorities. Our team identified that the current manual scheduling systems were inefficient, leading to idle ships and wasted resources. We needed a solution that would be both technically robust and policy-compliant.',
      solution: 'We built DockyAI, an intelligent platform that revolutionizes port operations. By leveraging advanced machine learning models and reinforcement learning, DockyAI optimizes ship routing and allocation in real-time. The system features an AI-powered recommendation engine that suggests the optimal anchorage spots based on vessel size, cargo type, and duration of stay, significantly reducing congestion.',
      keyResults: [
        { label: 'Reduction in Idle Ships', value: '60%' },
        { label: 'Faster Completion Time', value: '33%' },
      ],
    },
  },
  {
    title: 'SGResolve',
    competition: 'National AI Student Challenge 2025',
    badge: 'SILVER MEDALIST 🥈',
    desc: 'SGResolve auto-classifies citizen reports, extracts information, and routes them to relevant agencies using NLP and Computer Vision.',
    subdesc: 'Silver Medalist at the National AI Student Challenge 2025.',
    href: 'https://github.com/pushkalv/sgresolve',
    live: 'https://sgresolve.vercel.app',
    texture: '/assets/sgresolve-demo.png',
    logo: '/assets/project-logo2.png',
    logoStyle: {
      backgroundColor: '#13202F',
      border: '0.2px solid #17293E',
      boxShadow: '0px 0px 60px 0px #2F6DB54D',
    },
    spotlight: '/assets/spotlight2.png',
    tags: [
      { id: 1, name: 'Flask', path: '/assets/react.svg' },
      { id: 2, name: 'Gemini API', path: '/assets/tailwindcss.png' },
      { id: 3, name: 'NLP', path: '/assets/typescript.png' },
      { id: 4, name: 'Computer Vision', path: '/assets/react.svg' },
      { id: 5, name: 'Python', path: '/assets/react.svg' },
    ],
    details: {
      challenge: 'Civic issue reporting is often slow, manual, and prone to misclassification. Citizens struggle to identify the correct agency for their complaints, and agencies are overwhelmed by unsorted, unstructured data. A smarter, automated link between the public and government agencies was needed.',
      solution: 'SGResolve is an AI-powered civic issue platform that streamlines the reporting process. It uses Natural Language Processing (NLP) to understand user reports and Computer Vision to analyze attached images. The system automatically classifies issues (e.g., "Pothole", "Littering", "Broken Streetlight"), extracts key information like location and severity, and intelligently routes the report to the appropriate agency (e.g., LTA, NEA).',
      keyFeatures: [
        'Automated Issue Classification',
        'Smart Agency Routing',
        'Image Analysis for Context',
        'Real-time Status Updates',
      ],
    },
  },
  {
    title: 'AuraSentinel',
    competition: 'HacX 2025 (AI & Cyber Track)',
    badge: 'TOP 5 FINALIST 🏅',
    desc: 'AuraSentinel detects anomalies in system logs and generates incident reports using Azure and GPT-4o-mini.',
    subdesc: 'Top 5 Finalist at HacX 2025 (AI & Cyber Track).',
    href: 'https://github.com/pushkalv/aurasentinel',
    live: 'https://aurasentinel.vercel.app',
    texture: '/assets/aurasentinel-demo.jpg',
    logo: '/assets/project-logo3.png',
    logoStyle: {
      backgroundColor: '#60f5a1',
      background:
        'linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)',
      border: '0.2px solid rgba(208, 213, 221, 1)',
      boxShadow: '0px 0px 60px 0px rgba(35, 131, 96, 0.3)',
    },
    spotlight: '/assets/spotlight3.png',
    tags: [
      { id: 1, name: 'Azure', path: '/assets/react.svg' },
      { id: 2, name: 'Isolation Forest', path: '/assets/tailwindcss.png' },
      { id: 3, name: 'GPT-4o-mini', path: '/assets/typescript.png' },
      { id: 4, name: 'CI/CD', path: '/assets/react.svg' },
      { id: 5, name: 'Python', path: '/assets/react.svg' },
    ],
    details: {
      challenge: 'Cybersecurity threats are evolving faster than traditional defense mechanisms. Security Operations Centers (SOCs) are flooded with logs, making it difficult to detect subtle anomalies that indicate a breach. Manual analysis is slow and prone to fatigue-induced errors.',
      solution: 'AuraSentinel is an advanced AI Incident Response Platform designed to augment SOC capabilities. It utilizes anomaly detection algorithms to monitor system logs in real-time. When an anomaly is detected, the system uses GPT-4o-mini to analyze the context and generate a comprehensive incident report, significantly reducing the Mean Time to Detect (MTTD) and Respond (MTTR).',
      keyFeatures: [
        'Real-time Log Monitoring',
        'Unsupervised Anomaly Detection (Isolation Forest)',
        'Automated Incident Reporting with GenAI',
        'Integrated Dashboard',
      ],
    },
  },
  {
    title: 'AI Learning System',
    competition: 'EdTech Innovation',
    badge: 'DEPLOYED SYSTEM 🚀',
    desc: 'A platform that helps students master Networking with features like "Explain Like I\'m 5", instant AI grading, and community questions.',
    subdesc: 'Built with Firebase and Gemini API for an interactive learning experience.',
    href: 'https://github.com/pushkalv/ai-learning-system',
    live: 'https://ai-learning.vercel.app',
    texture: '/assets/network-tech-notes-demo.png',
    logo: '/assets/project-logo4.png',
    logoStyle: {
      backgroundColor: '#0E1F38',
      border: '0.2px solid #0E2D58',
      boxShadow: '0px 0px 60px 0px #2F67B54D',
    },
    spotlight: '/assets/spotlight4.png',
    tags: [
      { id: 1, name: 'Firebase', path: '/assets/react.svg' },
      { id: 2, name: 'Gemini API', path: '/assets/tailwindcss.png' },
      { id: 3, name: 'Automation', path: '/assets/typescript.png' },
      { id: 4, name: 'React', path: '/assets/react.svg' },
    ],
    details: {
      challenge: 'Technical subjects like Computer Networking can be dry and difficult to grasp for beginners. Traditional learning methods often lack personalization and instant feedback, leaving students stuck or unmotivated. There was a need for a more interactive and adaptive learning experience.',
      solution: 'We developed a comprehensive AI Learning System tailored for mastering networking concepts. The platform integrates Generative AI to provide personalized explanations, such as the popular "Explain Like I\'m 5" feature. It also features an intelligent auto-grading system that gives instant feedback on open-ended questions, and a community Q&A section driven by AI to ensure every query gets a helpful answer.',
      keyFeatures: [
        '"Explain Like I\'m 5" (ELI5) AI Mode',
        'Instant AI Auto-Grading & Feedback',
        'Community Question Platform',
        'Progress Tracking',
      ],
    },
  },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
    deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
  };
};

export const workExperiences = [
  {
    id: 1,
    name: 'AMZTech.ai',
    pos: 'AI Developer Intern',
    duration: 'Dec 2025 — Present',
    title: "Delivered production-minded ML workflows and data pipelines. Integrated cloud services to ship features reliably.",
    icon: '/assets/framer.svg',
    animation: 'victory',
  },
  {
    id: 2,
    name: 'Digital & Intelligence Service (DIS)',
    pos: 'Sentinel Programme Apprentice',
    duration: 'Jun 2025 — Present',
    title: "Built Python solutions with a focus on cybersecurity and secure coding. Practiced structured problem-solving in high-assurance contexts.",
    icon: '/assets/figma.svg',
    animation: 'clapping',
  },
  {
    id: 3,
    name: 'epitex',
    pos: 'Retail Associate',
    duration: 'Dec 2024 — Jan 2025',
    title: "Handled high-footfall retail shifts while maintaining service quality. Managed POS, inventory checks, and customer queries under time pressure.",
    icon: '/assets/notion.svg',
    animation: 'salute',
  },
];

export const awards = [
  {
    id: 1,
    title: 'MaritimeONE Case Summit',
    organization: 'Maritime & Port Authority of Singapore',
    description: 'Youngest champions in summit history. Developed an AI platform for port optimization.',
    icon: '/assets/mcs-comp.jpg',
    year: '2025',
    badge: 'Champion',
    link: 'https://www.linkedin.com/posts/pushkal-vashist_maritimeone-champion-activity-7291000000000000000-xxxx',
  },
  {
    id: 2,
    title: 'National AI Student Challenge',
    organization: 'National AI Student Challenge',
    description: '1st Runner-Up | Silver Medal for SGResolve, an AI-powered civic issue platform.',
    icon: '/assets/national-ai-student-challenge-comp.jpg',
    year: '2025',
    badge: 'Silver',
    link: 'https://www.linkedin.com/posts/pushkal-vashist_national-ai-student-challenge-activity-7291000000000000000-xxxx',
  },
  {
    id: 3,
    title: 'HacX (AI & Cyber Track)',
    organization: 'HacX 2025',
    description: 'Top 5 finalist in cybersecurity & AI for AuraSentinel, an incident response platform.',
    icon: '/assets/hacx-comp.jpg',
    year: '2025',
    badge: 'Top 5',
    link: 'https://www.linkedin.com/posts/pushkal-vashist_hacx-top5-activity-7291000000000000000-xxxx',
  },
  {
    id: 4,
    title: 'Additional Highlights',
    organization: 'Other Competitions',
    description: '',
    icon: null,
    year: '2024–2025',
    badge: 'Other Competitions',
    highlights: [
      { name: "SCDF–Dell Lifesavers' Challenge", rank: 'Top 11' },
      { name: 'Huawei Tech4City', rank: 'Semi-Finalist' },
    ],
  },
];

export const skills = [
  {
    title: 'AI & Machine Learning',
    items: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'NLP', 'Computer Vision', 'Reinforcement Learning'],
  },
  {
    title: 'Full-Stack Engineering',
    items: ['Python', 'C++', 'Flask', 'JavaScript', 'HTML/CSS', 'Firebase', 'Selenium'],
  },
  {
    title: 'Cloud & DevOps',
    items: ['AWS', 'Azure', 'Snowflake', 'CI/CD', 'Docker'],
  },
  {
    title: 'Data & BI Systems',
    items: ['SQL', 'MySQL', 'Oracle APEX', 'Power BI'],
  },
];

export const leadership = [
  {
    id: 1,
    title: 'NYP AI & Cloud Subcommittee',
    description: 'Led workshops on Web Hosting Fundamentals (AWS EC2 + NGINX). Volunteered at NYP Open House.',
  },
  {
    id: 2,
    title: 'VIA Chairperson (2023)',
    description: 'Worked with St. Andrew’s Autism School. Hosted National Day visits and built meaningful connections.',
  },
];
