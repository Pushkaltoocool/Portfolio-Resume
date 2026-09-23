export const navLinks = [
  {
    id: 1,
    name: 'Home',
    href: '/#home',
  },
  {
    id: 2,
    name: 'About',
    href: '/#about',
  },
  {
    id: 3,
    name: 'Experience',
    href: '/#experience',
  },
  {
    id: 4,
    name: 'Projects',
    href: '/#projects',
  },
  {
    id: 5,
    name: 'Awards',
    href: '/#awards',
  },
  {
    id: 6,
    name: 'Education',
    href: '/#education',
  },
  {
    id: 7,
    name: 'Skills',
    href: '/#skills',
  },
  {
    id: 8,
    name: 'Blog',
    href: '/blog',
  },
  {
    id: 9,
    name: 'Contact',
    href: '/#contact',
  },
];

// Image paths under /assets/placeholders/ are generated stand-ins.
// See PLACEHOLDERS.md at the repo root for the real images still needed.
export const myProjects = [
  {
    title: 'NeoPulse',
    slug: 'neopulse',
    period: 'Feb – May 2026',
    sortKey: '2026-05',
    tier: 'won',
    featured: true,
    step: 'first multi-agent architecture, first cloud migration',
    competition: 'National AI Student Developer Conference 2026, Huawei Track',
    badge: '1ST PLACE 🏆',
    desc: 'NeoPulse is a multi-agent predictive maintenance platform that moves industrial teams from reacting to breakdowns to preventing them, using four specialised AI agents feeding one combined recommendation.',
    subdesc: '1st Place at the National AI Student Developer Conference 2026, Huawei Track. Youngest team in the competition.',
    // PLACEHOLDER: repo and live demo links not confirmed yet.
    href: '',
    live: '',
    texture: '/assets/neopulse-demo.webp',
    logo: '/assets/placeholders/logo-neopulse.png', // PLACEHOLDER
    logoStyle: {
      backgroundColor: '#161B2E',
      border: '0.2px solid #1E2540',
      boxShadow: '0px 0px 60px 0px #4257B24D',
    },
    spotlight: '/assets/spotlight5.png',
    flipVertical: false,
    tags: [
      { id: 1, name: 'Python', iconClass: 'fa-brands fa-python' },
      { id: 2, name: 'Multi-Agent AI', iconClass: 'fa-solid fa-robot' },
      { id: 3, name: 'Flask', iconClass: 'fa-solid fa-code' },
      { id: 4, name: 'Docker', iconClass: 'fa-brands fa-docker' },
      { id: 5, name: 'Huawei Cloud', iconClass: 'fa-solid fa-cloud' },
      { id: 6, name: 'Firestore', iconClass: 'fa-solid fa-database' },
    ],
    details: {
      challenge:
        'Industrial maintenance teams usually find out a machine is failing when it has already stopped. The signals are in the data, but they sit across separate systems and nobody has time to read them. Reacting after a breakdown costs far more than preventing one, so the problem is not detection alone: it is turning a detection into a decision somebody can act on.',
      solution:
        'NeoPulse splits the decision pipeline across four specialised AI agents, each owning one part of the problem, then merges their output into a single recommendation. As team lead I built the Detection agent, which identifies abnormal equipment behaviour in the data, and the Planning agent, which turns those findings into concrete maintenance recommendations, using OpenAI, OpenRouter and Vertex AI models. I designed the backend and cloud architecture on Flask, Docker, Firestore and CI/CD, then migrated the full deployment from Google Cloud to Huawei Cloud.',
      keyResults: [
        { label: 'Industrial Records Validated', value: '10,000+' },
        { label: 'Specialised Agents Unified', value: '4' },
      ],
      keyFeatures: [
        'Detection agent for anomaly identification',
        'Planning agent for maintenance recommendations',
        'Unified four-model recommendation pipeline',
        'Full deployment migration to Huawei Cloud',
      ],
    },
  },
  {
    title: 'DockyAI',
    slug: 'dockyai',
    period: 'Aug – Nov 2025',
    sortKey: '2025-11',
    tier: 'won',
    featured: true,
    step: 'first reinforcement learning system',
    competition: 'MaritimeONE Case Summit 2025',
    badge: 'CHAMPIONS 🏆',
    desc: 'DockyAI is an AI platform that optimizes port operations with anchorage recommendations, A* routing, and reinforcement learning.',
    subdesc: 'Champion project at the MaritimeONE Case Summit 2025, and the youngest champions in the competition’s history.',
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
    slug: 'sgresolve',
    period: 'Feb – May 2025',
    sortKey: '2025-05',
    tier: 'placed',
    featured: true,
    step: 'first time leading a team, starting from zero JavaScript',
    competition: 'National AI Student Challenge 2025',
    badge: 'SILVER MEDALIST 🥈',
    desc: 'SGResolve auto-classifies citizen reports, extracts information, and routes them to relevant agencies using NLP and Computer Vision.',
    subdesc: 'The project that started it all. 1st Runner-Up at the National AI Student Challenge 2025, built as the youngest finalist team against university competition.',
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
      solution: 'SGResolve is an AI-powered civic issue platform that streamlines the reporting process. It uses Natural Language Processing (NLP) to understand user reports and Computer Vision to analyze attached images. The system automatically classifies issues (e.g., "Pothole", "Littering", "Broken Streetlight"), extracts key information like location and severity, and intelligently routes the report to the appropriate agency (e.g., LTA, NEA). I led the team as lead developer and started this with zero JavaScript experience, integrating four AI models across NLP, computer vision and the Gemini API into a deployed Flask application.',
      keyFeatures: [
        'Automated Issue Classification',
        'Smart Agency Routing',
        'Image Analysis for Context',
        'Real-time Status Updates',
      ],
    },
  },
  {
    title: 'FactorIQ',
    slug: 'factoriq',
    period: 'Apr – Aug 2026',
    sortKey: '2026-08',
    tier: 'shipped',
    featured: false,
    step: 'first build for a real client',
    competition: 'Full Stack Application Development module, Distinction',
    badge: 'IN COMMERCIAL DISCUSSIONS',
    desc: 'FactorIQ is a factory operations platform covering logistics, bay allocation and delivery management, with a mobile-accessible digital twin of the physical factory.',
    subdesc: 'Built for the Full Stack Application Development module and awarded a Distinction. Currently in active discussions with the original client for a commercial deal.',
    // PLACEHOLDER: repo and live demo links not confirmed yet.
    href: '',
    live: '',
    texture: '/assets/factoriq-demo.webp',
    logo: '/assets/placeholders/logo-factoriq.png', // PLACEHOLDER
    logoStyle: {
      backgroundColor: '#1F1A10',
      border: '0.2px solid #2E2616',
      boxShadow: '0px 0px 60px 0px #B4892F4D',
    },
    spotlight: '/assets/spotlight3.png',
    flipVertical: false,
    tags: [
      { id: 1, name: 'Python', iconClass: 'fa-brands fa-python' },
      { id: 2, name: 'Socket.IO / WebRTC', iconClass: 'fa-solid fa-tower-broadcast' },
      { id: 3, name: 'Google Cloud Run', iconClass: 'fa-brands fa-google' },
      { id: 4, name: 'Agentic AI', iconClass: 'fa-solid fa-robot' },
      { id: 5, name: 'Mobile Digital Twin', iconClass: 'fa-solid fa-mobile-screen' },
    ],
    details: {
      challenge:
        'Factory logistics run on whiteboards, phone calls and paper gate passes. Drivers arrive without vetting, bays are allocated by whoever picks up the radio first, and nobody on the floor has a shared view of what is arriving next. The result is congestion at the gate and idle bays at the same time.',
      solution:
        'FactorIQ gives the factory a mobile-accessible digital twin plus an end-to-end Logistics and Bay Operations module. I built driver vetting, delivery scheduling and rescheduling, QR gate access, licence-plate verification, bay allocation and full delivery lifecycle management, with real-time communication over Socket.IO and WebRTC. Drivers schedule through an AI agent named Lumi, and I led the Google Cloud Run deployment.',
      keyFeatures: [
        'Mobile digital twin navigation of the factory floor',
        'Driver vetting, QR gate access and licence-plate verification',
        'Bay allocation and delivery lifecycle management',
        'Agentic driver-side scheduling via the "Lumi" AI agent',
      ],
    },
  },
  {
    title: 'CareSwap',
    slug: 'careswap',
    period: 'Oct 2025 – Feb 2026',
    sortKey: '2026-02',
    tier: 'placed',
    featured: false,
    step: 'first voice-controlled RAG assistant',
    competition: 'Dell Innovate Dash 2026',
    badge: 'RUNNER-UP 🥈',
    desc: 'CareSwap is a community care platform that connects people through shared resources and support, with a voice-controlled RAG assistant that understands what is on screen.',
    subdesc: 'Runner-Up at Dell Innovate Dash 2026. Originated as a Web Development module project that earned a Distinction.',
    // PLACEHOLDER: repo and live demo links not confirmed yet.
    href: '',
    live: '',
    texture: '/assets/careswap-demo.webp',
    logo: '/assets/placeholders/logo-careswap.png', // PLACEHOLDER
    logoStyle: {
      backgroundColor: '#102520',
      border: '0.2px solid #163329',
      boxShadow: '0px 0px 60px 0px #2FB4814D',
    },
    spotlight: '/assets/spotlight4.png',
    flipVertical: false,
    tags: [
      { id: 1, name: 'Gemini', iconClass: 'fa-solid fa-brain' },
      { id: 2, name: 'Vertex AI RAG', iconClass: 'fa-brands fa-google' },
      { id: 3, name: 'Flask', iconClass: 'fa-solid fa-code' },
      { id: 4, name: 'Firestore & Firebase Auth', iconClass: 'fa-solid fa-fire' },
      { id: 5, name: 'Azure Translator', iconClass: 'fa-brands fa-microsoft' },
    ],
    details: {
      challenge:
        'Community care depends on people finding each other, but the people who most need help are often the least able to navigate an app: older users, users who do not read the interface language, users who cannot type comfortably. A conventional form-driven platform quietly excludes the people it is built for.',
      solution:
        'CareSwap is a community care platform built by a team of five. I built CarePedia, SkillSwap and the primary UI, and co-developed CarePal: a multilingual, voice-controlled RAG assistant with screen-context awareness, so it understands what is currently on screen while responding to voice commands. Users navigate, message, compose articles and create posts entirely by voice, backed by Gemini, Vertex AI RAG, Flask, Firestore, Firebase Authentication and Azure Translator.',
      keyFeatures: [
        'CarePal: multilingual voice-controlled RAG assistant',
        'Screen-context awareness during voice commands',
        'Voice-driven navigation, messaging and post creation',
        'CarePedia knowledge base and SkillSwap exchange',
      ],
    },
  },
  {
    title: 'AuraSentinel',
    // TODO(confirm): exact dates not recorded in the repo. sortKey inferred from the
    // HacX LinkedIn post being later than the MaritimeONE one; period shows only the year.
    slug: 'aurasentinel',
    period: '2025',
    sortKey: '2025-12',
    tier: 'placed',
    featured: false,
    step: 'first end-to-end cloud delivery I owned alone',
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
    // TODO(confirm): exact dates not recorded anywhere in the repo.
    slug: 'ai-learning-system',
    period: '',
    sortKey: '',
    tier: 'shipped',
    featured: false,
    step: 'first product I shipped for other students to use',
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
    name: 'ArchAIve',
    pos: 'Chief Technology Officer',
    duration: 'Jul 2026 – Present',
    title:
      'Architected a multi-tenant AI heritage platform on React/Vite, Python services, PostgreSQL with pgvector, Redis, Celery and Docker, deployed across Google Cloud and Alibaba Cloud with each tenant isolated on shared infrastructure. I lead modular AI pipelines spanning OCR, translation, NER, summarisation, computer vision, RAG, speech-to-text and text-to-speech, and extended archival document processing to Tamil and Malay.',
    icon: '/assets/archaive-logo.jpg',
    animation: 'victory',
  },
  {
    id: 2,
    name: 'AMZTech.ai',
    pos: 'AI Developer Intern',
    duration: 'Dec 2025 – Present',
    title:
      'Built and deployed HireAI, an LLM-powered bulk resume extraction pipeline processing up to 10 resumes per batch on Groq, PostgreSQL and AWS, shipped into production for real internal client workflows. Configured AWS networking and IP allowlisting for internal test environments, delivered an applied AI and LLM workshop to roughly 90 participants, and now lead a new iOS and Android mobile application initiative as project lead.',
    icon: '/assets/amztech-logo.png',
    animation: 'clapping',
  },
  {
    id: 3,
    name: 'Digital & Intelligence Service (DIS)',
    pos: 'Sentinel Programme Apprentice',
    duration: 'Jun 2025 – Sep 2026',
    title:
      'Built Python solutions with a focus on cybersecurity and secure coding. Practiced structured problem-solving in high-assurance contexts, and served as a key communication liaison for programme updates and class coordination.',
    icon: '/assets/digital_and_intelligence_service_logo.jpg',
    animation: 'salute',
  },
  {
    id: 4,
    name: 'epitex',
    pos: 'Retail Associate',
    duration: 'Dec 2024 – Jan 2025',
    title:
      'Handled high-footfall retail shifts while maintaining service quality. Managed POS, inventory checks, and customer queries under time pressure.',
    icon: '/assets/placeholders/logo-epitex.png', // PLACEHOLDER
    animation: 'idle',
  },
];

export const education = [
  {
    id: 1,
    school: 'Nanyang Polytechnic',
    location: 'Singapore',
    qualification: 'Diploma in Applied AI & Analytics',
    duration: 'Apr 2025 – Apr 2028',
    status: 'Year 2',
    logo: '/assets/nyp-logo.png',
    stats: [
      { label: 'GPA', value: '4.00 / 4.00' },
      { label: 'Cohort rank', value: 'Top student' },
    ],
    highlights: [
      'NYP Scholar, O-Level Pathway',
      'Best Performing Year 1 Student',
      'Director’s List for 3 consecutive semesters',
      'Distinctions in 12 of 15 modules',
    ],
    modules: [
      'Data Structures & Algorithms',
      'Full Stack Application Development',
      'Predictive Analytics & Forecasting',
      'Responsible AI for Sustainability',
    ],
  },
  {
    id: 2,
    school: 'Woosong University',
    location: 'South Korea',
    qualification: 'Overseas Student Exchange',
    duration: 'Aug 2026 – Dec 2026',
    status: 'In progress',
    logo: '/assets/placeholders/logo-woosong.png', // PLACEHOLDER
    stats: [],
    highlights: [],
    modules: [
      'Advanced Big Data Tools',
      'Machine Learning',
      'Generative AI',
      'Operating Systems',
      'Computer Networks',
    ],
  },
];

export const certifications = [
  {
    id: 1,
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    badge: '/assets/placeholders/cert-aws-ccp.png', // PLACEHOLDER
  },
  {
    id: 2,
    name: 'SnowPro Associate: Platform Certification',
    issuer: 'Snowflake',
    badge: '/assets/placeholders/cert-snowpro.png', // PLACEHOLDER
  },
];

export const awards = [
  {
    id: 5,
    title: 'National AI Student Developer Conference',
    organization: 'Huawei Track',
    description:
      '1st Place for NeoPulse, a multi-agent predictive maintenance platform. As team lead I built the Detection and Planning agents, designed the Flask, Docker and Firestore backend, and migrated the full deployment from Google Cloud to Huawei Cloud. Validated over 10,000 industrial records, and we were the youngest team in the competition.',
    icon: '/assets/naisc-2026-comp.jpg',
    year: '2026',
    badge: 'Champion',
    link: 'https://lnkd.in/p/g883yn6x',
  },
  {
    id: 1,
    title: 'MaritimeONE Case Summit',
    organization: 'Maritime & Port Authority of Singapore',
    description:
      'Champions as Team Imagine Winning. Built DockyAI with AI-powered anchorage routing, A*-based “Google Maps for ships,” real-time KPIs, and RL-driven berth/ETA predictions. Cut simulated idle ships by 60% and completion time by 33%; delivered a live demo from zero maritime background in three months with MPA-compliant rules.',
    icon: '/assets/mcs-comp.jpg',
    year: '2025',
    badge: 'Champion',
    link: 'https://www.linkedin.com/posts/pushkal-vashist-b63224363_maritimeone-mpa-smf-activity-7395118630314745858-jWen?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFpEi3sBy1zRdKu7mfOZtcj0CR8vMgQQTOU',
  },
  {
    id: 2,
    title: 'National AI Student Challenge',
    organization: 'AI Singapore, supported by Huawei',
    description:
      '1st Runner-Up for SGResolve, an AI civic-issue platform that classifies and routes citizen reports. Led the team from zero JS to a full Flask + JS app with four AI models (NLP, CV, Gemini API), built in sleepless sprints. Youngest finalists against university teams, and the project that started everything.',
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
      'Top 5 finalist for AuraSentinel, AI-powered incident response on Azure. I owned Azure integration (Blob pipelines, Functions triggers, CI/CD, Isolation Forest + GPT-4o-mini), pushing end-to-end cloud delivery beyond my comfort zone. Built executive-friendly summaries, anomaly detection, and instant AI report generation; grateful to teammates and mentors for the grind.',
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
      'Our team won the AWS GenAI CloudQuest Tournament. I also co-organized and taught the 4-day accelerated workshop, and balancing teaching and competing reinforced that AI and cloud are strongest with fundamentals, security, and teamwork.',
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
  {
    id: 6,
    title: 'Dell Innovate Dash',
    organization: 'Dell Technologies',
    description:
      'Runner-Up for CareSwap, a community care platform built by a team of five. I built CarePedia, SkillSwap and the primary UI, and co-developed CarePal, a multilingual voice-controlled RAG assistant with screen-context awareness, built on Gemini, Vertex AI RAG, Firestore and Azure Translator.',
    icon: '/assets/dell-innovate-dash-comp.webp',
    year: '2026',
    badge: 'Runner-Up',
    link: 'https://lnkd.in/p/gMzgh_-p',
  },
  {
    id: 7,
    title: 'Alibaba Cloud Apsara Conference',
    organization: 'Alibaba Cloud, Hangzhou',
    description:
      'Invited to present at Alibaba Cloud’s flagship Apsara Conference in Hangzhou, China. The invitation and feature followed a presentation I delivered to Alibaba Cloud representatives on the ArchAIve platform, a rare industry recognition for a student-led startup.',
    icon: '/assets/placeholders/award-apsara.png', // PLACEHOLDER
    year: '2026',
    badge: 'Invited',
    // PLACEHOLDER: announcement or coverage link not confirmed yet.
    link: '',
  },
];

export const skills = [
  {
    title: 'AI & Machine Learning',
    items: [
      'LLMs',
      'RAG',
      'Multi-Agent Systems',
      'NLP',
      'Computer Vision',
      'OCR',
      'ASR / TTS',
      'Vertex AI',
      'Gemini',
      'OpenAI',
      'Groq',
      'Qwen',
      'OpenRouter',
      'TensorFlow.js',
    ],
  },
  {
    title: 'Cloud & DevOps',
    items: [
      'AWS',
      'Google Cloud',
      'Alibaba Cloud',
      'Huawei Cloud',
      'Azure',
      'Firebase',
      'Docker',
      'Cloudflare',
      'Netlify',
      'CI/CD',
      'Linux',
    ],
  },
  {
    title: 'Backend & Data',
    items: [
      'Flask',
      'PostgreSQL',
      'pgvector',
      'DynamoDB',
      'Firestore',
      'Redis',
      'Celery',
      'PgBouncer',
      'nginx',
      'Snowflake',
    ],
  },
  {
    title: 'Languages',
    items: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'Kotlin', 'C++', 'HTML/CSS'],
  },
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'Vite', 'Tailwind CSS'],
  },
];

export const leadership = [
  {
    id: 1,
    title: 'President | NYP Cloud Computing Club',
    duration: 'Feb 2026 – Present',
    description:
      'Lead a 37-member technical organisation of 7 EXCO and 30 subcommittee members. I initiated the NYP x AWS Kiro Hackathon, securing AWS speakers and judges plus 2,000 sponsored Kiro credits, and built the judging system on Firestore and JavaScript overnight. I now lead development of a Next.js and AWS club management platform spanning AWS Organizations, DynamoDB, S3, Cloudflare and Google Workspace, and personally own the club Git strategy, domain management and email configuration.',
    icon: '/assets/nyp_cloud_logo.jpg',
    metrics: [
      { label: 'Members led', value: '37' },
      { label: 'Hackathon participants', value: '124' },
      { label: 'Content views, 90 days', value: '98,241' },
      { label: 'Non-follower reach', value: '80.6%' },
    ],
  },
  {
    id: 2,
    title: 'Student Leader | Sentinel Programme (DIS)',
    duration: 'Jun 2025 – Sep 2026',
    description:
      'Selected for a structured apprenticeship by the Digital and Intelligence Service. I served as the key communication liaison for programme updates and announcements, led peer coordination during technical challenges, assigned roles, and ensured timely delivery of team outputs.',
    icon: '/assets/digital_and_intelligence_service_logo.jpg',
    metrics: [],
  },
  {
    id: 3,
    title: 'Subcommittee Member | NYP AI Club',
    duration: '2025 – Present',
    description:
      'Co-organized technical events and supported workshop delivery on AI and ML fundamentals. I guide peers through hands-on exercises in accelerated training programmes.',
    icon: '/assets/nyp_ai_logo.jpg',
    metrics: [],
  },
];