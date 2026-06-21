import { ExperienceItem, EducationItem, ProjectItem, SkillCategory, LinkedInUpdate } from './types';

export const experiences: ExperienceItem[] = [
  {
    id: 'under-25-dsce',
    role: 'Team Lead, DSCE',
    company: 'Under 25 DSCE (Massive youth media network fostering campus communities)',
    location: 'Bangalore',
    period: '09/2025 – Present',
    bullets: [
      'Led a marketing team to drive student engagement and brand visibility for the Under25 Summit through high-impact social media campaigns. Managed celebrity outreach and on-ground logistics, ensuring professional coordination and seamless event execution for all guest appearances.'
    ],
    skillsUsed: ['Marketing Strategy', 'Celebrity Outreach', 'On-ground Logistics', 'Event Engagement', 'Team Leadership'],
    category: 'community'
  },
  {
    id: 'nunam-technologies',
    role: 'Student Intern',
    company: 'Nunam Technologies (Climate-tech startup repurposing second-life EV batteries)',
    location: 'Bengaluru',
    period: '01/2026 – 02/2026',
    bullets: [
      'Contributed to the research and development of a Portable Charging Station prototype utilizing repurposed second-life lithium-ion batteries.',
      'Conducted hands-on cell testing, battery integration, and circuit evaluation to support sustainable energy storage solutions.',
      'Applied theoretical electrical engineering concepts to practical hardware testing, bridging the gap between academic coursework and real-world hardware deployment.'
    ],
    skillsUsed: ['Repurposed Batteries', 'Cell Testing', 'Battery Integration', 'Circuit Evaluation', 'Hardware Testing'],
    category: 'hardware'
  },
  {
    id: 'desi-power',
    role: 'Technical Intern',
    company: 'DESI Power (Independent rural power producer building decentralized renewable energy plants)',
    location: 'Bihar',
    period: '09/2025 – 10/2025',
    bullets: [
      'Gained technical insights into the operation and deployment of Solar PV, Biomass Gasifiers, Biochar units, and irrigation pumps.',
      'Analyzed documentation over 20 hours to understand ground-level challenges of rural electrification and decentralized power generation.'
    ],
    skillsUsed: ['Solar PV', 'Biomass Gasifiers', 'Biochar Units', 'Rural Electrification', 'Decentralized Power'],
    category: 'solar'
  },
  {
    id: 'lowwkey-streetwear',
    role: 'Co-Owner & Marketing Head',
    company: 'Lowwkey (Youth-focused, print-on-demand streetwear brand)',
    location: 'Bangalore & Mumbai',
    period: '09/2024 – 05/2025',
    bullets: [
      'Co-founded and launched a niche, print-on-demand clothing brand, overseeing all aspects of brand strategy, e-commerce supply chain, and business growth.',
      'Designed and executed targeted digital marketing campaigns, achieving an efficient Cost Per Mille (CPM) of ₹50.'
    ],
    skillsUsed: ['Brand Strategy', 'E-commerce Supply Chain', 'Digital Marketing', 'CPM Optimization', 'Business Growth'],
    category: 'entrepreneurship'
  }
];

export const educationList: EducationItem[] = [
  {
    institution: 'Dayananda Sagar College of Engineering (DSCE)',
    degree: 'Bachelor of Engineering (B.E.) in Electrical and Electronics Engineering',
    period: '2024 - 2028',
    grade: 'CGPA: 8.0 / 10',
    focus: ['VLSI', 'AI / ML', 'Semiconductors', 'Data Structures & Algorithms', 'Embedded Systems', 'Microcontroller Programming', 'Sensor Integration'],
    details: [
      'Currently maintaining an 8.0/10 CGPA over the 5th Semester.',
      'Active undergraduate student specializing in bridging embedded firmware with structural semiconductor devices.',
      'Participated in the research and design of automotive battery packs & EV charging units.'
    ]
  },
  {
    institution: 'DY Patil International School',
    degree: 'Senior Secondary School (Class 12), Mathematics & Computer Science',
    period: '04/2023',
    grade: 'Score: 76%',
    focus: ['Mathematics', 'Computer Science', 'Physics', 'Chemistry'],
    details: [
      'Acquired a solid academic foundation in advanced math, electromagnetism, and algorithmic logic.',
      'Completed practical files simulating radio receivers and sequential logic circuits.'
    ]
  },
  {
    institution: "Bishop Cotton Boys' School",
    degree: 'Class 10',
    period: '04/2021',
    grade: 'Score: 92%',
    focus: ['General Science', 'Computer Applications', 'Advanced Mathematics'],
    details: [
      'Built custom physics and computer applications projects involving basic algorithmic workflows.'
    ]
  }
];

export const projects: ProjectItem[] = [
  {
    id: 'court-recon',
    title: 'COURT_RECON: Full-Stack Sports Analytics',
    description: 'Data science dashboard for live basketball event logging, player statistics, and SVM-based matchup prediction.',
    tech: ['Python', 'FastAPI', 'SQLAlchemy', 'React', 'SVM'],
    category: 'technical',
    longDescription: 'COURT_RECON is a full-stack data science dashboard for local basketball clubs. It lets users add players, log live game events such as points, assists, rebounds, steals, blocks, turnovers, and fouls, then converts those raw events into player statistics, leaderboards, trend charts, and radar-based performance comparisons. The backend is built with Python, FastAPI, SQLAlchemy, and SQLite. It provides REST APIs for player management, event logging, statistics aggregation, team scoring trends, and matchup prediction. The frontend is built with React, Vite, Axios, and Recharts, giving the project an interactive dashboard experience. The machine learning part uses a Support Vector Machine classifier trained on a synthetic 1v1 basketball matchup dataset. The model compares two players using stat-difference features like points, assists, rebounds, steals, blocks, turnovers, and fouls, then predicts each player’s win probability. This project demonstrates practical skills in full-stack development, database design, data processing, sports analytics, and ML model integration.',
    simulatable: false,
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7465614181078052865/'
  },
  {
    id: 'posture-bot',
    title: 'CV Posture Analysis Bot',
    description: 'AI-based health assistant monitoring user posture using Computer Vision and MediaPipe.',
    tech: ['Computer Vision', 'MediaPipe', 'CNN', 'SVM', 'Python'],
    category: 'technical',
    longDescription: 'Engineered a vision-based monitoring system using Computer Vision and MediaPipe to track user posture in real-time, completely replacing hardware sensors. Trained and compared convolutional neural networks (CNN) and support vector machines (SVM) to evaluate the accuracy differences in postural classifications.',
    simulatable: true
  },
  {
    id: 'solar-radio',
    title: 'Solar Powered Radio',
    description: 'Prototyped a sustainable analog receiver with solar-charge circuits and battery integrations.',
    tech: ['Analog Electronics', 'Solar PV', 'Power Management Circuits', 'RF Receivers'],
    category: 'technical',
    longDescription: 'Designed and prototyped a functional solar-powered radio receiver, applying core principles of analog electronics and renewable energy. Engineered a power management circuit to efficiently charge the internal battery via solar panels, ensuring continuous operation. Conducted signal testing and circuit optimization to maximize reception clarity and power efficiency.',
    simulatable: true
  },
  {
    id: 'robomanthan',
    title: 'Robomanthan: Robotics & Embedded Systems',
    description: 'Wi-Fi-controlled dynamic RC car deploying OTA updates, real-time gyroscopes, and vision metrics.',
    tech: ['OpenCV', 'Gyroscope Drive', 'OTA Firmware Updates', 'Wi-Fi Control', 'Visual AI'],
    category: 'technical',
    longDescription: 'Engineered a Wi-Fi-controlled RC car using OTA updates and real-time gyroscope data for dynamic steering. Integrated Computer Vision via OpenCV for visual AI processing and autonomous navigation while collaborating in a fast-paced environment to prototype and deploy wireless hardware solutions.',
    simulatable: true
  },
  {
    id: 'furore-2026',
    title: 'Furore 2026 Platform',
    description: 'Designed and engineered the central web platform for DSCE’s largest annual national-level techno-cultural fest.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Vite', 'Framer Motion', 'State Persistence'],
    category: 'technical',
    longDescription: 'Collaborated in developing and engineering the core digital platform for Furore 2026, the national inter-collegiate mega fest of Dayananda Sagar College of Engineering. Built high-performance responsive web layouts, custom visual interactions, registration interfaces, and event schedule filters to streamline the experience of thousands of attending delegates.',
    simulatable: false,
    link: 'https://github.com/furore2026/Furore-2026'
  },
  {
    id: 'no-parking-ops',
    title: 'No Parking Event Operations',
    description: 'On-ground operational coordination and attendee crowd flow for peaks8 pop-culture festival.',
    tech: ['Event Logistics', 'Crowd Flow', 'Attendee Operations', 'Issue Resolution'],
    category: 'non-technical',
    longDescription: 'Acted as an on-ground volunteer for the large-scale No Parking event hosted by peaks8 at Orion Mall, managing venue logistics and crowd flow. Facilitated attendee operations and issue resolution to ensure a seamless, high-energy experience for event participants.',
    simulatable: false
  },
  {
    id: 'iedc-dsce-ops',
    title: 'IEDC Operations, DSCE',
    description: 'Executing entrepreneurship events and supporting project ideation pipelines for campus startups.',
    tech: ['Incubation Support', 'E-Summit Execution', 'Founder Outreach', 'Event Coordination'],
    category: 'non-technical',
    longDescription: 'Actively contributed to the planning and execution of innovation and entrepreneurship events on campus, including the flagship E-Summit. Supported the project ideation process for student startups, helping to foster a vibrant startup culture within the college.',
    simulatable: false
  },
  {
    id: 'pr-team-dsce',
    title: 'PR Team Member, DSCE',
    description: 'Developing promotional strategies and high-engagement campus marketing campaigns.',
    tech: ['Digital Campaigns', 'Public Relations', 'Sponsor Relationships', 'Brand Visibility'],
    category: 'non-technical',
    longDescription: 'Develop and implement promotional strategies for major college events and student-led initiatives. Create impactful marketing campaigns that enhance student engagement, fostering key collaborations with internal and external partners to amplify event reach and success.',
    simulatable: false
  },
  {
    id: 'icispes-logistics',
    title: 'ICISPES 2025 Conference Management, DSCE',
    description: 'On-ground logistics, hospitality, and scheduling for visiting international delegates.',
    tech: ['Conference Logistics', 'Delegate Hospitality', 'Keynote Coordination', 'Academic Sessions'],
    category: 'non-technical',
    longDescription: 'Managed on-ground logistics, scheduling, and hospitality for international delegates and keynote speakers at the International Conference on Intelligent Systems in Power Engineering and Sustainability. Facilitated critical interactions between academic researchers and industry experts, ensuring the seamless execution of technical sessions.',
    simulatable: false
  },
  {
    id: 'ieee-vts-events',
    title: 'IEEE VTS Industrial Networking & Events, DSCE',
    description: 'Orchestrating industrial visits, EV workshops, and fundraising corporate tech sponsorships.',
    tech: ['Corporate Sponsorship', 'Automotive Networking', 'Hackathon Logistics', 'EV & Core Seminars'],
    category: 'non-technical',
    longDescription: 'Orchestrated industrial visits, technical workshops, and expert talk series to bridge the gap between theoretical curriculum and EV/automotive industry standards. Spearheaded corporate outreach strategies and successfully negotiated sponsorships for flagship hackathons to ensure financial sustainability.',
    simulatable: false
  },
  {
    id: 'motorsports-intern',
    title: 'Motorsports Intern',
    description: 'Handling Instagram reach, brand sponsorship & collaborations, and online marketing for a motorsports team.',
    tech: ['Instagram Marketing', 'Brand Sponsorship', 'Collaborations', 'Online Marketing'],
    category: 'non-technical',
    longDescription: 'Working as a Motorsports Intern, responsible for driving Instagram reach and audience engagement, securing brand sponsorships and strategic collaborations, and executing online marketing campaigns to amplify the team\'s digital presence and grow its fan base across social media platforms.',
    simulatable: false
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Hardware & Core Engineering',
    skills: [
      { name: 'Arduino', proficiency: 90 },
      { name: 'EV Technology & Drives', proficiency: 85 },
      { name: 'Solar PV', proficiency: 80 },
      { name: 'Biomass', proficiency: 75 },
      { name: 'PCB Design', proficiency: 82 },
      { name: 'Raspberry Pi', proficiency: 88 },
      { name: 'Pico', proficiency: 86 },
      { name: 'ESP-32', proficiency: 88 },
      { name: 'STM-32', proficiency: 80 },
      { name: 'Various Sensors', proficiency: 85 }
    ]
  },
  {
    title: 'Programming & Software',
    skills: [
      { name: 'C/C++', proficiency: 88 },
      { name: 'Python', proficiency: 85 },
      { name: 'Data Structures (C++)', proficiency: 82 },
      { name: 'MATLAB', proficiency: 75 },
      { name: 'Machine Learning', proficiency: 80 },
      { name: 'SVM', proficiency: 78 },
      { name: 'CNN', proficiency: 78 },
      { name: 'OpenCV', proficiency: 82 },
      { name: 'LSTM', proficiency: 75 },
      { name: 'MediaPipe', proficiency: 80 },
      { name: 'AutoCAD', proficiency: 78 },
      { name: 'Deeds', proficiency: 80 },
      { name: 'Thonny', proficiency: 80 }
    ]
  },
  {
    title: 'Business & Interpersonal',
    skills: [
      { name: 'Hosting & Anchoring', proficiency: 90 },
      { name: 'Networking', proficiency: 88 },
      { name: 'Digital Marketing', proficiency: 90 },
      { name: 'Brand Strategy', proficiency: 88 },
      { name: 'Event Logistics', proficiency: 92 },
      { name: 'E-commerce', proficiency: 85 },
      { name: 'SEO', proficiency: 82 },
      { name: 'Sponsorship Negotiation', proficiency: 87 },
      { name: 'Celebrity Management', proficiency: 88 },
      { name: 'Fluent in English & Hindi', proficiency: 95 },
      { name: 'Basic Kannada', proficiency: 70 }
    ]
  }
];

export const roleTitles: string[] = [
  'Embedded Systems & Hardware Designer',
  'Electrical & Electronics Eng. Student @ DSCE',
  'VLSI & AI-ML Specialist',
  'Event Operations Specialist'
];

export const linkedinUpdates: LinkedInUpdate[] = [
  {
    id: 'li-post-1',
    author: {
      name: 'Arya Sharan',
      headline: 'Embedded Systems | EEE Student @ DSCE | Co-Founder @ Lowwkey',
      avatarUrl: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=150&auto=format&fit=crop&q=80'
    },
    timeAgo: '2 weeks ago',
    content: 'Thrilled to share that we are launching Lowwkey streetwear drops! Designing and launching a brand from scratch while keeping Meta CPM ratios at an efficient ₹50 has been an absolute blast. Looking forward to integrating tech and lifestyle wear together! 👕💻🔋',
    tags: ['entrepreneurship', 'growth', 'streetwear', 'bangalore', 'e-commerce'],
    likes: 142,
    comments: 12,
    shares: 8
  },
  {
    id: 'li-post-2',
    author: {
      name: 'Arya Sharan',
      headline: 'Embedded Systems | EEE Student @ DSCE | Co-Founder @ Lowwkey',
      avatarUrl: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=150&auto=format&fit=crop&q=80'
    },
    timeAgo: '1 month ago',
    content: 'Incredible experience as a Student Intern with Nunam Technologies. Working closely with second-life EV batteries for Portable Charging Station prototypes was extremely rewarding! Applied semiconductor and battery-balancing methodologies directly. ⚡🔋🚗',
    tags: ['batterytech', 'sustainability', 'embeddedystems', 'electronics', 'eeescholars'],
    likes: 218,
    comments: 24,
    shares: 14
  },
  {
    id: 'li-post-3',
    author: {
      name: 'Arya Sharan',
      headline: 'Embedded Systems | EEE Student @ DSCE | Co-Founder @ Lowwkey',
      avatarUrl: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=150&auto=format&fit=crop&q=80'
    },
    timeAgo: '2 months ago',
    content: 'It was a phenomenal experience welcoming key delegates, startup founders, and research mentors as part of the PR and IEDC DSCE teams for our flagship E-Summit! Bridging green power grids discussions with smart event logistics was amazing. 🎙⚡📈',
    tags: ['events', 'logistics', 'branding', 'iedc', 'startups', 'leadership'],
    likes: 189,
    comments: 18,
    shares: 9
  }
];
