export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "How far in advance should I book SHYTECH for my event?",
    answer:
      "We recommend booking at least 3–6 months in advance for large events like weddings and conferences, and 4–6 weeks for smaller corporate events. This ensures you get your preferred date and adequate time for thorough planning. For last-minute bookings, contact us and we'll do our best to accommodate.",
    category: "Booking",
  },
  {
    id: "2",
    question: "What types of events does SHYTECH manage?",
    answer:
      "SHYTECH handles the full spectrum — weddings, corporate events, product launches, conferences, award ceremonies, fashion shows, brand activations, and private celebrations. Whether it's 50 guests or 5,000, we bring the same level of premium execution to every event.",
    category: "Events",
  },
  {
    id: "3",
    question: "Do you provide both photography and videography together?",
    answer:
      "Absolutely. Most clients opt for our combined media packages for cohesive coverage. Our photographers and videographers work as a synchronized team, ensuring no moment is missed from any angle. We also offer each service independently if needed.",
    category: "Videography",
  },
  {
    id: "4",
    question: "How long does video editing and delivery take?",
    answer:
      "Highlight reels (2-3 min) are typically delivered within 5–7 working days. Full cinematic films (8-15 min) take 15–20 working days. Rush delivery is available at an additional charge. We keep you updated throughout the post-production process.",
    category: "Editing",
  },
  {
    id: "5",
    question: "What is AI Video Generation and how does it benefit my brand?",
    answer:
      "Our AI Video Generation service uses cutting-edge AI tools to create photorealistic visuals, animated sequences, and creative content that would be impossible or prohibitively expensive to shoot traditionally. It's ideal for product commercials, futuristic brand campaigns, and social media content that stands out.",
    category: "AI Production",
  },
  {
    id: "6",
    question: "How does your Guest Management system work?",
    answer:
      "We handle the entire guest journey — designing and sending invitations, managing RSVPs, sending automated reminders, creating seating arrangements, and on-site check-in management. For VIP guests and celebrities, we provide dedicated coordinators and custom hospitality protocols.",
    category: "Guest Management",
  },
  {
    id: "7",
    question: "Can you manage live streaming for our event?",
    answer:
      "Yes. We provide professional multi-camera live streaming to platforms like YouTube, LinkedIn, Instagram, and custom streaming destinations. Our setup includes professional encoding, real-time monitoring, graphics overlays, and bandwidth redundancy to ensure zero downtime.",
    category: "Live Streaming",
  },
  {
    id: "8",
    question: "Is your pricing transparent? Are there hidden charges?",
    answer:
      "100% transparent pricing. Every quote includes a detailed breakdown of all costs — no hidden charges, no surprise invoices. Any additions to the original scope are discussed and approved before proceeding. We believe long-term relationships are built on trust.",
    category: "Pricing",
  },
  {
    id: "9",
    question: "What is your cancellation and rescheduling policy?",
    answer:
      "Cancellations made 60+ days before the event receive a full refund minus the booking deposit. Within 30–60 days, 50% of the total amount is refunded. Within 30 days, the booking amount is non-refundable but we offer free rescheduling to another date within 6 months, subject to availability.",
    category: "Booking",
  },
  {
    id: "10",
    question: "Do you work outside your city / are you available for destination events?",
    answer:
      "Yes. SHYTECH operates across India and internationally for destination weddings, global conferences, and brand events. Travel and accommodation for our team are included in the project quote. We've worked in Dubai, Singapore, London, and major Indian cities.",
    category: "Events",
  },
];
