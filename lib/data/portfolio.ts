export type PortfolioCategory = "all" | "events" | "corporate" | "video" | "commercial";

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  tags: string[];
  description: string;
  image: string;
  year: string;
  client: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "Grand Gala Evening 2024",
    category: "events",
    tags: ["Event Management", "Photography", "Lighting"],
    description: "A spectacular 500-guest gala evening with celebrity performers, custom stage design, and full media coverage.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    year: "2024",
    client: "Prestige Group",
  },
  {
    id: "2",
    title: "Leadership Summit Mumbai",
    category: "corporate",
    tags: ["Conference Management", "Stage Production", "Live Streaming"],
    description: "A two-day leadership summit for 800 attendees, featuring keynote production, breakout stages, and global livestream coverage.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    year: "2024",
    client: "Apex Leadership Group",
  },
  {
    id: "3",
    title: "TechVision Annual Summit",
    category: "corporate",
    tags: ["Conference Management", "Live Streaming", "AV Setup"],
    description: "3-day technology summit with 1,200 attendees, 40 speakers, and global live stream reaching 50,000+ viewers.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
    year: "2024",
    client: "TechVision Corp",
  },
  {
    id: "4",
    title: "LuxePerfume Brand Launch",
    category: "commercial",
    tags: ["Product Launch", "AI Video", "Social Media"],
    description: "Cinematic product launch film with AI-enhanced visuals, generating 2M+ organic reach in 48 hours.",
    image: "https://images.unsplash.com/photo-1596783047821-e8e4e0e79a60?w=800&q=80",
    year: "2023",
    client: "LuxePerfume Co.",
  },
  {
    id: "5",
    title: "Brand Campaign Reel",
    category: "video",
    tags: ["Videography", "Video Editing", "Drone"],
    description: "Award-winning 90-second cinematic brand campaign film with drone footage, crafted for a premium product launch.",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80",
    year: "2024",
    client: "LuxePerfume Co.",
  },
  {
    id: "6",
    title: "Startup Awards Night",
    category: "corporate",
    tags: ["Awards Ceremony", "Photography", "Stage Setup"],
    description: "Prestigious awards night for India's top 100 startups with custom stage, red carpet, and media press wall.",
    image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&q=80",
    year: "2023",
    client: "StartupIndia Foundation",
  },
  {
    id: "7",
    title: "Influencer Brand Activation",
    category: "events",
    tags: ["Experiential Marketing", "Entertainment", "Photography"],
    description: "A 400-guest influencer brand activation with immersive LED installations, live performances, and real-time content creation.",
    image: "https://images.unsplash.com/photo-1532117182044-031e7cd916ee?w=800&q=80",
    year: "2024",
    client: "BoldBrand Agency",
  },
  {
    id: "8",
    title: "Fashion Week Backstage",
    category: "events",
    tags: ["Event Management", "Photography", "Social Media"],
    description: "Official production partner for a high-fashion week — backstage access, ramp coverage, and real-time social content.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    year: "2023",
    client: "Elite Fashion House",
  },
  {
    id: "9",
    title: "AI Commercial Campaign",
    category: "commercial",
    tags: ["AI Video Generation", "Motion Graphics", "Brand"],
    description: "Futuristic AI-generated commercial for a fintech brand, with photorealistic environments and CGI-grade visuals.",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    year: "2024",
    client: "FinEdge Technologies",
  },
];

export const portfolioCategories = [
  { id: "all", label: "All Work" },
  { id: "events", label: "Events" },
  { id: "corporate", label: "Corporate" },
  { id: "video", label: "Video Editing" },
  { id: "commercial", label: "Commercial" },
];
