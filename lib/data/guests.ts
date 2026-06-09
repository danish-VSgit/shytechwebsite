export interface GuestPastEvent {
  eventName: string;
  year: string;
  role: string;
}

export interface GuestSocialLinks {
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
  website?: string;
}

export interface Guest {
  id: string;
  name: string;
  title: string;
  company?: string;
  image: string;
  bio: string;
  achievements: string[];
  socialLinks: GuestSocialLinks;
  pastEvents: GuestPastEvent[];
  verified: boolean;
  category: string;
}

export const guests: Guest[] = [
  {
    id: "sandeep-maheshwari",
    name: "Sandeep Maheshwari",
    title: "Motivational Speaker & Entrepreneur",
    company: "ImagesBazaar",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    bio: "One of India's most celebrated motivational speakers, Sandeep Maheshwari has transformed millions of lives through his powerful, no-cost seminars. Founder of ImagesBazaar — the world's largest collection of Indian images — he is a living example of turning failure into fuel.",
    achievements: [
      "Founded ImagesBazaar with 7 million+ images and 7,000+ clients worldwide",
      "Over 2 billion cumulative YouTube views on his motivational channel",
      "Recognized by Forbes India as a top entrepreneur",
      "Conducted 500+ free life-changing seminars across India and abroad",
    ],
    socialLinks: {
      instagram: "#",
      youtube: "#",
      website: "#",
    },
    pastEvents: [
      { eventName: "SHYTECH Leadership Summit", year: "2023", role: "Keynote Speaker" },
      { eventName: "Youth Entrepreneurship Conclave", year: "2022", role: "Guest of Honour" },
    ],
    verified: true,
    category: "Motivational Speaker",
  },
  {
    id: "aman-gupta",
    name: "Aman Gupta",
    title: "Co-Founder & CMO",
    company: "boAt Lifestyle",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
    bio: "Aman Gupta co-founded boAt and built it into India's #1 audio and wearables brand, reaching ₹1,500+ crore in revenue in under 7 years. A Shark Tank India judge and serial entrepreneur, Aman is known for his sharp instincts and relentless hustle.",
    achievements: [
      "Built boAt into the No. 1 earwear brand in India within 5 years",
      "Turned boAt into a ₹2,000 crore revenue company",
      "Became one of the most recognizable Sharks on Shark Tank India",
      "Featured in Fortune India's 40 Under 40 list",
    ],
    socialLinks: {
      instagram: "#",
      linkedin: "#",
      twitter: "#",
    },
    pastEvents: [
      { eventName: "SHYTECH Startup Founders Forum", year: "2023", role: "Panel Speaker" },
      { eventName: "Brand India Summit", year: "2022", role: "Keynote Speaker" },
    ],
    verified: true,
    category: "Entrepreneur",
  },
  {
    id: "priyanka-chopra",
    name: "Priyanka Chopra Jonas",
    title: "Actress, Producer & Entrepreneur",
    company: "Purple Pebble Pictures",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    bio: "A global icon who has conquered Bollywood, Hollywood, and the world stage. Priyanka Chopra Jonas is also a UNICEF Goodwill Ambassador, a successful entrepreneur, and one of the most influential personalities on the planet.",
    achievements: [
      "Won the Miss World 2000 title representing India",
      "Starred in ABC's Quantico — first South Asian lead in a US network drama",
      "UNICEF Goodwill Ambassador since 2010",
      "TIME Magazine's 100 Most Influential People multiple times",
    ],
    socialLinks: {
      instagram: "#",
      twitter: "#",
      website: "#",
    },
    pastEvents: [
      { eventName: "SHYTECH Entertainment Gala", year: "2023", role: "Brand Ambassador" },
      { eventName: "SHYTECH Luxury Awards Night", year: "2022", role: "Chief Guest" },
    ],
    verified: true,
    category: "Actress & Entrepreneur",
  },
  {
    id: "ritesh-agarwal",
    name: "Ritesh Agarwal",
    title: "Founder & CEO",
    company: "OYO Rooms",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio: "Ritesh Agarwal founded OYO at age 19 and built it into one of the world's largest hospitality companies. Backed by SoftBank and Sequoia, OYO now operates in 80+ countries and is a defining story of Indian startup ambition.",
    achievements: [
      "Founded OYO at age 19 — India's youngest unicorn founder at the time",
      "OYO valued at $9 billion at its peak",
      "First Indian to receive the Thiel Fellowship",
      "Featured in Forbes 30 Under 30 Asia",
    ],
    socialLinks: {
      instagram: "#",
      linkedin: "#",
      twitter: "#",
    },
    pastEvents: [
      { eventName: "SHYTECH Startup Founders Forum", year: "2022", role: "Keynote Speaker" },
      { eventName: "NextGen India Summit", year: "2021", role: "Guest Speaker" },
    ],
    verified: true,
    category: "Tech Founder",
  },
  {
    id: "anupam-mittal",
    name: "Anupam Mittal",
    title: "Founder & CEO",
    company: "Shaadi.com & People Group",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    bio: "Anupam Mittal is the visionary who built Shaadi.com into Asia's most trusted matchmaking platform, pioneering the concept of online matrimonial services in India. An early-stage investor and Shark Tank India judge, he has backed some of India's most exciting startups.",
    achievements: [
      "Founded Shaadi.com in 1997 — one of India's earliest internet companies",
      "People Group portfolio includes Mauj Mobile, Makaan.com, and more",
      "Invested in 100+ startups including Ola, rapido, and others",
      "One of the most prominent voices in Indian startup ecosystem",
    ],
    socialLinks: {
      instagram: "#",
      linkedin: "#",
      twitter: "#",
    },
    pastEvents: [
      { eventName: "SHYTECH Investor Connect Night", year: "2023", role: "Keynote Speaker" },
      { eventName: "Digital India Startup Conclave", year: "2022", role: "Panel Speaker" },
    ],
    verified: true,
    category: "Investor & Entrepreneur",
  },
  {
    id: "kiran-mazumdar-shaw",
    name: "Kiran Mazumdar-Shaw",
    title: "Executive Chairperson",
    company: "Biocon Limited",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
    bio: "Kiran Mazumdar-Shaw is the pioneer of India's biotech industry. She founded Biocon in a garage in 1978 and built it into a global biopharmaceutical leader. Her journey from a science student to a self-made billionaire is one of India's greatest entrepreneurial stories.",
    achievements: [
      "Founded Biocon — India's largest biopharmaceutical company",
      "Forbes World's 100 Most Powerful Women multiple times",
      "Padma Bhushan and Padma Shri awardee",
      "EY World Entrepreneur of the Year winner",
    ],
    socialLinks: {
      linkedin: "#",
      twitter: "#",
      website: "#",
    },
    pastEvents: [
      { eventName: "SHYTECH Women in Leadership Forum", year: "2023", role: "Chief Guest" },
      { eventName: "Healthcare & Innovation Summit", year: "2022", role: "Keynote Speaker" },
    ],
    verified: true,
    category: "Business Leader",
  },
  {
    id: "kunal-shah",
    name: "Kunal Shah",
    title: "Founder & CEO",
    company: "CRED",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio: "Kunal Shah is one of India's sharpest entrepreneurial minds. After selling FreeCharge to Snapdeal for $400M, he built CRED into a premium fintech platform for creditworthy Indians. Known for his deep insights on startups, consumer behavior, and wealth creation.",
    achievements: [
      "Sold FreeCharge to Snapdeal in a $400 million deal",
      "Built CRED to a $6.4 billion valuation",
      "Backed 200+ startups as an angel investor",
      "Known for the iconic 'Delta 4' startup framework",
    ],
    socialLinks: {
      instagram: "#",
      twitter: "#",
      linkedin: "#",
    },
    pastEvents: [
      { eventName: "SHYTECH Fintech & Future Summit", year: "2023", role: "Keynote Speaker" },
      { eventName: "Startup India Conclave", year: "2022", role: "Panel Moderator" },
    ],
    verified: true,
    category: "Fintech Founder",
  },
  {
    id: "deepika-padukone",
    name: "Deepika Padukone",
    title: "Actress & Mental Health Advocate",
    company: "KA Enterprises",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    bio: "Deepika Padukone is Bollywood's biggest global star and one of the world's highest-paid actresses. Beyond cinema, she founded The Live Love Laugh Foundation to destigmatize mental health in India — a cause that has touched millions of lives.",
    achievements: [
      "One of the world's highest-paid actresses (Forbes 2018 list)",
      "TIME Magazine's 100 Most Influential People (2018)",
      "Founded The Live Love Laugh Foundation for mental health awareness",
      "First brand ambassador of Swiss luxury brand Cartier in India",
    ],
    socialLinks: {
      instagram: "#",
      twitter: "#",
      website: "#",
    },
    pastEvents: [
      { eventName: "SHYTECH Mental Wellness Gala", year: "2023", role: "Brand Ambassador" },
      { eventName: "SHYTECH Entertainment Awards", year: "2021", role: "Chief Guest" },
    ],
    verified: true,
    category: "Actress",
  },
  {
    id: "virat-kohli",
    name: "Virat Kohli",
    title: "Professional Cricketer & Entrepreneur",
    company: "One8 Commune",
    image: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&q=80",
    bio: "Virat Kohli is widely regarded as the greatest batsman of his generation and one of the all-time greats. Beyond cricket, he is a serial entrepreneur with businesses spanning fitness, fashion, and hospitality — and an investor in some of India's most exciting ventures.",
    achievements: [
      "Over 70 international centuries — among the highest in cricket history",
      "ICC Cricketer of the Decade (2011–2020)",
      "Runs businesses across fitness (Chisel), fashion (Wrogn), and F&B (One8 Commune)",
      "One of the most-followed athletes on Instagram globally",
    ],
    socialLinks: {
      instagram: "#",
      twitter: "#",
      website: "#",
    },
    pastEvents: [
      { eventName: "SHYTECH Sports & Celebrity Gala", year: "2023", role: "Chief Guest" },
      { eventName: "SHYTECH Brand India Awards", year: "2022", role: "Brand Ambassador" },
    ],
    verified: true,
    category: "Cricketer & Entrepreneur",
  },
];
