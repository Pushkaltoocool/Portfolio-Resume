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
    href: 'https://github.com/Pushkaltoocool/DockyAI-Case-Summit',
    live: 'https://dockyai.netlify.app/',
    texture: '/assets/dockyai-demo.jpg',
    logo: '/assets/project-logo1.png',
    logoStyle: {
      backgroundColor: '#2A1816',
      border: '0.2px solid #36201D',
      boxShadow: '0px 0px 60px 0px #AA3C304D',
    },
    spotlight: '/assets/spotlight1.png',
    tags: [
      { id: 1, name: 'Python', iconClass: 'fa-brands fa-python' },
      { id: 2, name: 'Web Development', iconClass: 'fa-solid fa-code' },
      { id: 3, name: 'Firebase / Firestore', iconClass: 'fa-solid fa-database' },
      { id: 4, name: 'Machine Learning / AI', iconClass: 'fa-solid fa-brain' },
      { id: 5, name: 'Optimization / Routing', iconClass: 'fa-solid fa-route' },
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
    href: 'https://github.com/sgresolve/AuraGang-Tech4City',
    live: 'https://sgresolve.netlify.app/',
    texture: '/assets/sgresolve-demo.png',
    logo: '/assets/project-logo2.png',
    logoStyle: {
      backgroundColor: '#13202F',
      border: '0.2px solid #17293E',
      boxShadow: '0px 0px 60px 0px #2F6DB54D',
    },
    spotlight: '/assets/spotlight2.png',
    flipVertical: false,
    tags: [
      { id: 1, name: 'Python', iconClass: 'fa-brands fa-python' },
      { id: 2, name: 'Firebase / Firestore', iconClass: 'fa-solid fa-database' },
      { id: 3, name: 'Telegram API Integration', iconClass: 'fa-brands fa-telegram' },
      { id: 4, name: 'Web Development (HTML/CSS/JS)', iconClass: 'fa-solid fa-code' },
      { id: 5, name: 'AI / Machine Learning', iconClass: 'fa-solid fa-brain' },
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
    href: 'https://github.com/Pushkaltoocool/HacX-Aura-Gang/',
    live: 'https://aurasentinel.netlify.app/',
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
    flipVertical: false,
    tags: [
      { id: 1, name: 'Microsoft Azure', iconClass: 'fa-brands fa-microsoft' },
      { id: 2, name: 'Cybersecurity', iconClass: 'fa-solid fa-shield-halved' },
      { id: 3, name: 'Scikit-learn / ML', iconClass: 'fa-solid fa-brain' },
      { id: 4, name: 'Cloud Infrastructure', iconClass: 'fa-solid fa-cloud' },
      { id: 5, name: 'CI/CD & Deployment', iconClass: 'fa-solid fa-code-branch' },
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
    href: 'https://github.com/Pushkaltoocool/Network-Technology-Notes-And-Practice',
    live: 'https://network-tech-aa2501.netlify.app/',
    texture: '/assets/network-tech-notes-demo.png',
    logo: '/assets/project-logo4.png',
    logoStyle: {
      backgroundColor: '#0E1F38',
      border: '0.2px solid #0E2D58',
      boxShadow: '0px 0px 60px 0px #2F67B54D',
    },
    spotlight: '/assets/spotlight4.png',
    flipVertical: false,
    tags: [
      { id: 1, name: 'Python', iconClass: 'fa-brands fa-python' },
      { id: 2, name: 'HTML', iconClass: 'fa-brands fa-html5' },
      { id: 3, name: 'CSS', iconClass: 'fa-brands fa-css3-alt' },
      { id: 4, name: 'JavaScript', iconClass: 'fa-brands fa-js' },
      { id: 5, name: 'Firebase', iconClass: 'fa-solid fa-fire' },
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
    icon: 'https://media.licdn.com/dms/image/v2/D560BAQGCICpF4Ezbig/company-logo_100_100/B56ZuhvPZMKwAQ-/0/1767945075372/amztech_ai_logo?e=1772064000&v=beta&t=bHrw6qRiVsLNUgf44AGCYBDDF6nGKt2Z-6FVMXorL9w',
    animation: 'victory',
  },
  {
    id: 2,
    name: 'Digital & Intelligence Service (DIS)',
    pos: 'Sentinel Programme Apprentice',
    duration: 'Jun 2025 — Present',
    title: "Built Python solutions with a focus on cybersecurity and secure coding. Practiced structured problem-solving in high-assurance contexts.",
    icon: 'https://media.licdn.com/dms/image/v2/D560BAQHMDjOWwIuaCA/company-logo_200_200/company-logo_200_200/0/1693918682336/digital_and_intelligence_service_logo?e=1772064000&v=beta&t=Plak7rvSRm7CYi_HlIql_nS-56hsEFwzJvxbi-8XCcM',
    animation: 'clapping',
  },
  {
    id: 3,
    name: 'epitex',
    pos: 'Retail Associate',
    duration: 'Dec 2024 — Jan 2025',
    title: "Handled high-footfall retail shifts while maintaining service quality. Managed POS, inventory checks, and customer queries under time pressure.",
    icon: 'https://media.licdn.com/dms/image/v2/C4E0BAQEP5rbbG6htPQ/company-logo_100_100/company-logo_100_100/0/1630616142044/epitexinternational_logo?e=1772064000&v=beta&t=o8sk9e6KbYihfK8rqEcovxfNSxBz3sKnyPnd39WgefE',
    animation: 'salute',
  },
];

export const awards = [
  {
    id: 1,
    title: 'MaritimeONE Case Summit',
    organization: 'Maritime & Port Authority of Singapore',
    description:
      'Champions as Team Imagine Winning—built DockyAI with AI-powered anchorage routing, A*-based “Google Maps for ships,” real-time KPIs, and RL-driven berth/ETA predictions. Cut simulated idle ships by 60% and completion time by 33%; delivered a live demo from zero maritime background in three months with MPA-compliant rules.',
    icon: '/assets/mcs-comp.jpg',
    year: '2025',
    badge: 'Champion',
    link: 'https://www.linkedin.com/posts/pushkal-vashist-b63224363_maritimeone-mpa-smf-activity-7395118630314745858-jWen?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFpEi3sBy1zRdKu7mfOZtcj0CR8vMgQQTOU',
  },
  {
    id: 2,
    title: 'National AI Student Challenge',
    organization: 'National AI Student Challenge',
    description:
      '1st Runner-Up 🥈 for SGResolve—an AI civic-issue platform that classifies and routes citizen reports. Led the team from zero JS to a full Flask + JS app with four AI models (NLP, CV, Gemini API), built in sleepless sprints. Youngest finalists against university teams; learned leadership, resilience, and shipping fast. Project link: https://lnkd.in/enzJHjgq',
    icon: '/assets/national-ai-student-challenge-comp.jpg',
    year: '2025',
    badge: 'Silver',
    link: 'https://www.linkedin.com/posts/pushkal-vashist-b63224363_ai-machinelearning-nlp-activity-7333822188346650624-MSjC?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFpEi3sBy1zRdKu7mfOZtcj0CR8vMgQQTOU',
  },
  {
    id: 3,
    title: 'HacX (AI & Cyber Track)',
    organization: 'HacX 2025',
    description:
      'Top 5 finalist for AuraSentinel—AI-powered incident response on Azure. I owned Azure integration (Blob pipelines, Functions triggers, CI/CD, Isolation Forest + GPT-4o-mini), pushing end-to-end cloud delivery beyond my comfort zone. Built executive-friendly summaries, anomaly detection, and instant AI report generation; grateful to teammates and mentors for the grind.',
    icon: '/assets/hacx-comp.jpg',
    year: '2025',
    badge: 'Top 5',
    link: 'https://www.linkedin.com/posts/pushkal-vashist-b63224363_top-5-in-the-ai-cybersecurity-challenge-activity-7396037934002642945-AWDN?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFpEi3sBy1zRdKu7mfOZtcj0CR8vMgQQTOU',
  },
  {
    id: 4,
    title: 'AWS GenAI CloudQuest Tournament',
    organization: 'NYP Cloud Computing X NYP AI',
    description:
      'Proud to share that our team won the AWS GenAI CloudQuest Tournament 🏆. I also co-organized and taught the 4-day accelerated workshop—balancing teaching and competing reinforced that AI and cloud are strongest with fundamentals, security, and teamwork.',
    icon: '/assets/aws-cloud-quest-champion.jpeg',
    year: '2026',
    badge: 'Champion',
    link: 'https://www.linkedin.com/posts/pushkal-vashist-b63224363_ai-machinelearning-cloudcomputing-activity-7418171419160891392-1nRS?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFpEi3sBy1zRdKu7mfOZtcj0CR8vMgQQTOU',
    linkLabel: 'View LinkedIn Post',
    highlightsTitle: 'Workshop Sessions',
    highlights: [
      {
        name: 'Day 1: AI & Machine Learning fundamentals',
        rank: 'Core concepts, ML lifecycle, applied AI',
      },
      {
        name: 'Day 3: Cloud security & AI governance',
        rank: 'Shared responsibility, AI risks, secure deployment',
      },
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
    title: 'President | NYP Cloud Computing',
    description: 'Lead a student committee to plan and execute Cloud and AI engineering workshops. I coordinate speakers and logistics to align events with industry topics like MLOps and cloud security.',
    icon: '/assets/nyp_cloud_logo.jpg',
  },
  {
    id: 2,
    title: 'Student Leader | Sentinel Programme (DIS)',
    description: 'Selected for a structured apprenticeship by the Digital and Intelligence Service. I lead peer coordination during technical challenges, assigning roles and ensuring timely delivery of team outputs.',
    icon: '/assets/digital_and_intelligence_service_logo.jpg',
  },
  {
    id: 3,
    title: 'Subcommittee Member | NYP AI Club',
    description: 'Co-organized technical events and supported workshop delivery on AI/ML fundamentals. I guide peers through hands-on exercises in accelerated training programs.',
    icon: '/assets/nyp_ai_logo.jpg',
  },
];