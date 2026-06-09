export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  isPopular: boolean;
  features: PricingFeature[];
  cta: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Perfect for intimate events",
    price: "₹50,000",
    priceNote: "Starting from",
    isPopular: false,
    features: [
      { text: "Event planning consultation", included: true },
      { text: "Up to 100 guests", included: true },
      { text: "Basic décor & setup", included: true },
      { text: "4-hour event coverage", included: true },
      { text: "Photography (200 edited photos)", included: true },
      { text: "Highlight video reel (3 min)", included: true },
      { text: "Guest invitation management", included: true },
      { text: "1 dedicated coordinator", included: true },
      { text: "Drone footage", included: false },
      { text: "Live streaming", included: false },
      { text: "Celebrity coordination", included: false },
      { text: "Full post-production suite", included: false },
    ],
    cta: "Get Started",
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "The most popular choice",
    price: "₹1,50,000",
    priceNote: "Starting from",
    isPopular: true,
    features: [
      { text: "Full event planning & management", included: true },
      { text: "Up to 300 guests", included: true },
      { text: "Premium décor & stage setup", included: true },
      { text: "Full-day event coverage", included: true },
      { text: "Photography (500 edited photos)", included: true },
      { text: "Cinematic film (8-10 min)", included: true },
      { text: "Guest & RSVP management", included: true },
      { text: "2 dedicated coordinators", included: true },
      { text: "Drone footage", included: true },
      { text: "Live streaming (up to 2 hours)", included: true },
      { text: "Social media content package", included: true },
      { text: "Celebrity coordination", included: false },
    ],
    cta: "Get Consultation",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For marquee events & productions",
    price: "Custom",
    priceNote: "Tailored pricing",
    isPopular: false,
    features: [
      { text: "Complete end-to-end management", included: true },
      { text: "Unlimited guests", included: true },
      { text: "Luxury décor & custom staging", included: true },
      { text: "Multi-day event coverage", included: true },
      { text: "Full photography package", included: true },
      { text: "Documentary-style film", included: true },
      { text: "VIP guest management", included: true },
      { text: "Dedicated project manager + team", included: true },
      { text: "Multi-camera drone coverage", included: true },
      { text: "Multi-platform live streaming", included: true },
      { text: "Full social media campaign", included: true },
      { text: "Celebrity & speaker coordination", included: true },
    ],
    cta: "Talk to Us",
  },
];
