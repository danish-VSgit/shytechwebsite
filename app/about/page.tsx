import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Globe, Users, Zap } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import AnimatedCounter from "@/components/shared/AnimatedCounter";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn the story behind SHYTECH — a premium event management and media production company built on passion, precision, and world-class execution.",
};

const values = [
  {
    icon: Award,
    title: "Excellence Without Compromise",
    description:
      "Every project is treated as a marquee event regardless of size. We set internal standards higher than client expectations.",
  },
  {
    icon: Globe,
    title: "Creative Vision",
    description:
      "We approach each event as a unique story waiting to be told. Our team brings fresh perspectives to every project.",
  },
  {
    icon: Users,
    title: "Client Partnership",
    description:
      "We don't work for clients — we work with them. True partnership means transparent communication at every step.",
  },
  {
    icon: Zap,
    title: "Innovation First",
    description:
      "From AI video generation to live multi-platform streaming, we stay at the forefront of event technology.",
  },
];

const team = [
  {
    name: "Aryan Shah",
    role: "Founder & Creative Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio: "10+ years of experience producing marquee events across Asia. Former production head at a leading Bollywood production house.",
  },
  {
    name: "Priya Verma",
    role: "Head of Event Management",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    bio: "Certified event planner with expertise in large-scale conferences and high-profile corporate events for Fortune 500 companies.",
  },
  {
    name: "Karan Mehta",
    role: "Lead Cinematographer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    bio: "Award-winning cinematographer with credits in documentary films, brand commercials, and corporate brand films.",
  },
  {
    name: "Sneha Kapoor",
    role: "Digital Strategy Director",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    bio: "Former VP of Marketing at a leading tech unicorn. Expert in brand building, viral campaigns, and digital performance.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-[#f8fafc] to-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=80')] bg-cover bg-center opacity-[0.04]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc]/90 via-white/60 to-white" />
        <div className="container-width relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2563EB]/20 bg-[#eff6ff] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#2563EB]">Our Story</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-[#0f172a] mb-6 leading-tight" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            More Than an Agency.<br />
            <span className="accent-text">We&apos;re Storytellers.</span>
          </h1>
          <p className="text-xl text-[#475569] max-w-2xl leading-relaxed">
            SHYTECH was born from a simple belief: every event deserves to be experienced — not just attended. That belief has driven 500+ projects, 100+ satisfied clients, and 5+ years of relentless excellence.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-[#E2E8F0] bg-[#f8fafc]">
        <div className="container-width grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: 500, suffix: "+", label: "Events Delivered" },
            { value: 100, suffix: "+", label: "Clients Served" },
            { value: 5, suffix: "+", label: "Years of Excellence" },
            { value: 98, suffix: "%", label: "Client Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold accent-text mb-2" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-[#64748b]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-white">
        <div className="container-width grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader
              badge="Our Mission"
              title="Creating Experiences"
              titleHighlight="That Last a Lifetime"
              centered={false}
            />
            <p className="text-[#475569] leading-relaxed mb-6">
              We started SHYTECH because we saw a gap in the market: agencies that either had the creative vision but lacked execution, or the logistics but lacked artistry. We built a team that excels at both.
            </p>
            <p className="text-[#475569] leading-relaxed mb-8">
              Today, we manage everything from intimate 50-person gatherings to 5,000-attendee conferences — with the same obsessive attention to detail that has earned us a reputation as the premium choice for discerning clients.
            </p>
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
              Work With Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.1)]">
              <Image
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"
                alt="SHYTECH event management in action"
                width={800}
                height={600}
                className="object-cover w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/30 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-[0_8px_30px_rgba(15,23,42,0.1)]">
              <div className="text-3xl font-bold accent-text" style={{ fontFamily: "var(--font-plus-jakarta)" }}>5+</div>
              <div className="text-sm text-[#475569]">Years of Creating</div>
              <div className="text-sm text-[#475569]">Unforgettable Moments</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-[#f8fafc]">
        <div className="container-width">
          <SectionHeader
            badge="Core Values"
            title="The Principles"
            titleHighlight="We Live By"
            subtitle="These aren't just words on a wall — they're the standards we hold ourselves to on every project."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="group p-6 rounded-2xl border border-[#E2E8F0] bg-white hover:border-[#2563EB]/30 hover:shadow-[0_8px_24px_rgba(37,99,235,0.08)] transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#eff6ff] flex items-center justify-center mb-4 group-hover:bg-[#2563EB] transition-colors duration-300">
                    <Icon className="w-6 h-6 text-[#2563EB] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-base font-semibold text-[#0f172a] mb-2">{value.title}</h3>
                  <p className="text-sm text-[#64748b] leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <SectionHeader
            badge="The Team"
            title="The People Behind"
            titleHighlight="Every Success"
            subtitle="A curated team of industry veterans who have elevated SHYTECH into a category of its own."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="group relative rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)] hover:-translate-y-1.5 transition-all duration-400"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/50 via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-[#0f172a]">{member.name}</h3>
                  <p className="text-sm text-[#2563EB] font-medium mb-3">{member.role}</p>
                  <p className="text-xs text-[#64748b] leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-[#E2E8F0] bg-[#f8fafc]">
        <div className="container-width text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-5" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Ready to work with <span className="accent-text">the best?</span>
          </h2>
          <p className="text-[#475569] mb-8 max-w-xl mx-auto">
            Let&apos;s discuss your next event and how SHYTECH can make it extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
              Get Free Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/portfolio" className="btn-secondary">
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
