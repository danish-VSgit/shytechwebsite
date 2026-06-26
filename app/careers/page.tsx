import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, Briefcase, Users, Zap, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the QueueCap team. We're looking for talented event managers, cinematographers, editors, and digital strategists to create extraordinary experiences.",
  alternates: { canonical: "/careers" },
};

const openings = [
  {
    title: "Senior Event Manager",
    department: "Event Management",
    location: "Mumbai, India",
    type: "Full-time",
    description:
      "Lead end-to-end management of large-scale corporate events and conferences. 5+ years of experience required.",
  },
  {
    title: "Lead Cinematographer",
    department: "Media Production",
    location: "Mumbai / Remote",
    type: "Full-time",
    description:
      "Create cinematic event films and branded content. Experience with high-end cameras, lighting, and storytelling essential.",
  },
  {
    title: "AI Video Production Specialist",
    department: "Post Production",
    location: "Remote",
    type: "Full-time / Contract",
    description:
      "Master of AI video generation tools (Sora, Runway, Kling). Help us push the boundaries of what's possible in digital content.",
  },
  {
    title: "Digital Marketing Manager",
    department: "Brand & Digital",
    location: "Mumbai, India",
    type: "Full-time",
    description:
      "Drive our clients' social media presence and brand campaigns. Strong knowledge of Meta, YouTube, and content strategy.",
  },
  {
    title: "Event Production Coordinator",
    department: "Event Management",
    location: "Mumbai / Pan-India",
    type: "Full-time",
    description:
      "Coordinate large-scale conferences and summits with meticulous attention to detail. Hindi and English fluency required.",
  },
  {
    title: "Video Editor (Reels & Social)",
    department: "Post Production",
    location: "Remote",
    type: "Part-time / Contract",
    description:
      "Create engaging short-form content for Instagram, YouTube Shorts, and TikTok. Fast turnaround and creative eye essential.",
  },
];

const perks = [
  { icon: Zap, title: "Work on Marquee Events", desc: "From global tech summits to high-profile award shows — no two days are the same." },
  { icon: Users, title: "Collaborative Culture", desc: "A team that challenges and supports each other. No politics, no hierarchies." },
  { icon: Heart, title: "Competitive Compensation", desc: "Industry-leading salaries with performance bonuses on key projects." },
  { icon: Briefcase, title: "Skill Development", desc: "Access to premium tools, training programs, and industry conferences." },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-36 pb-20 bg-gradient-to-b from-[#f8fafc] to-white">
        <div className="container-width">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2563EB]/20 bg-[#eff6ff] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#2563EB]">Join the Team</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-[#0f172a] mb-6 max-w-3xl" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Build a Career That <span className="accent-text">Means Something</span>
          </h1>
          <p className="text-xl text-[#475569] max-w-2xl leading-relaxed">
            At QueueCap, you don&apos;t just manage events — you create memories that will be talked about for years. Join a team that sets the standard.
          </p>
        </div>
      </section>

      {/* Perks */}
      <section className="pb-20 border-b border-[#E2E8F0] bg-white">
        <div className="container-width">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {perks.map((perk) => {
              const Icon = perk.icon;
              return (
                <div
                  key={perk.title}
                  className="group p-6 rounded-2xl border border-[#E2E8F0] bg-white hover:border-[#2563EB]/30 hover:shadow-[0_8px_24px_rgba(37,99,235,0.08)] transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#eff6ff] flex items-center justify-center mb-4 group-hover:bg-[#2563EB] transition-colors duration-300">
                    <Icon className="w-5 h-5 text-[#2563EB] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#0f172a] mb-2">{perk.title}</h3>
                  <p className="text-sm text-[#64748b] leading-relaxed">{perk.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-padding bg-[#f8fafc]">
        <div className="container-width">
          <div className="mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#2563EB] mb-3 block">Open Positions</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              {openings.length} Roles Currently Open
            </h2>
          </div>

          <div className="space-y-4">
            {openings.map((role) => (
              <div
                key={role.title}
                className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl border border-[#E2E8F0] bg-white hover:border-[#2563EB]/30 hover:shadow-[0_8px_24px_rgba(37,99,235,0.08)] transition-all duration-300"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-base font-semibold text-[#0f172a] group-hover:text-[#2563EB] transition-colors">
                      {role.title}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#eff6ff] text-[#2563EB] border border-[#2563EB]/20 uppercase tracking-wider">
                      {role.type}
                    </span>
                  </div>
                  <p className="text-sm text-[#64748b] leading-relaxed mb-3 max-w-xl">
                    {role.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs text-[#94a3b8]">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-[#2563EB]" />
                      {role.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#2563EB]" />
                      {role.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#2563EB]" />
                      {role.type}
                    </span>
                  </div>
                </div>
                <Link
                  href={`mailto:enquiry@queuecap.com?subject=Application: ${role.title}`}
                  className="shrink-0 btn-primary text-sm flex items-center gap-2"
                >
                  Apply Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Application */}
      <section className="py-20 border-t border-[#E2E8F0] bg-white">
        <div className="container-width text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-5" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Don&apos;t see your role? <span className="accent-text">Reach out anyway.</span>
          </h2>
          <p className="text-[#475569] mb-8 max-w-xl mx-auto">
            We&apos;re always looking for exceptional talent. Send us your portfolio and tell us why you belong at QueueCap.
          </p>
          <a
            href="mailto:enquiry@queuecap.com?subject=Open Application - QueueCap"
            className="btn-primary inline-flex items-center gap-2"
          >
            Send Open Application <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
