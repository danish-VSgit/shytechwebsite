export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  review: string;
  eventType: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Mehta",
    role: "Founder & CEO",
    company: "Luminary Ventures",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5,
    review:
      "QueueCap transformed our annual summit into an unforgettable experience. Every detail — from the stage setup to live streaming — was executed flawlessly. Our global audience couldn't stop raving about the production quality. Absolute world-class team.",
    eventType: "Corporate Summit",
  },
  {
    id: "2",
    name: "Arjun Sharma",
    role: "Head of Events",
    company: "Apex Leadership Group",
    image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=200&q=80",
    rating: 5,
    review:
      "Our annual conference film made the entire leadership team proud every single time we watch it. QueueCap understood our vision better than we did. The cinematic storytelling, the drone shots, the editing — it felt like a Hollywood production. Worth every rupee and more.",
    eventType: "Annual Conference",
  },
  {
    id: "3",
    name: "Rahul Khanna",
    role: "Marketing Director",
    company: "FinEdge Technologies",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    rating: 5,
    review:
      "The AI video campaign QueueCap created for our product launch drove 2 million views organically in the first 48 hours. These aren't just videographers — they're strategic storytellers who understand what converts. Our best marketing investment ever.",
    eventType: "Product Launch Campaign",
  },
  {
    id: "4",
    name: "Ananya Singh",
    role: "Event Head",
    company: "Prestige Hospitality Group",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 5,
    review:
      "We've worked with many agencies, but QueueCap operates on a completely different level. Their attention to detail, proactive communication, and ability to handle last-minute changes with a smile is unmatched. They made our 500-person gala look like it cost 10x more.",
    eventType: "Corporate Gala",
  },
  {
    id: "5",
    name: "Dev Malhotra",
    role: "Co-founder",
    company: "BoldBrand Agency",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    rating: 5,
    review:
      "I hired QueueCap for a brand activation event and they delivered 300% beyond expectations. Guest management was seamless, the photography was stunning, and their social media content went viral the same day. Genuinely rare talent.",
    eventType: "Brand Activation",
  },
  {
    id: "6",
    name: "Sneha Kapoor",
    role: "Managing Director",
    company: "Elite Fashion House",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    rating: 5,
    review:
      "Fashion week is chaotic by nature. QueueCap brought structure, creativity, and calm professionalism. Their real-time social content creation was extraordinary — posts going live while models were still on the ramp. Partners for life.",
    eventType: "Fashion Week",
  },
];
