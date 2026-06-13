import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { client, isSanityConfigured } from "@/sanity/lib/client";
import { teamQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { TeamMember } from "@/sanity/lib/types";
import { Globe, Mail, ArrowRight, ExternalLink } from "lucide-react";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Our Team | SHYTECH",
  description: "Meet the talented team behind SHYTECH — event management experts, cinematographers, and creative professionals.",
};

export default async function TeamPage() {
  let team: TeamMember[] = [];
  let teamError: string | null = null;
  let teamStatus: "fulfilled" | "rejected" | "skipped" = "skipped";

  if (isSanityConfigured) {
    try {
      team = await client.fetch<TeamMember[]>(teamQuery);
      teamStatus = "fulfilled";
    } catch (err) {
      teamStatus = "rejected";
      teamError = String(err);
      team = [];
    }
  }

  // TEMP DEBUG — remove after verifying Sanity team data flow
  console.log("Sanity client config:", client.config());
  console.log("Sanity team query:", teamQuery);
  console.log("Team fetch status:", teamStatus);
  console.log("Team error:", teamError);
  console.log("Team documents:", team);
  console.log("Team count:", team.length);

  const byDept = team.reduce<Record<string, TeamMember[]>>((acc, member) => {
    const dept = member.department ?? "Team";
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(member);
    return acc;
  }, {});

  const deptOrder = ["leadership", "event-management", "production", "creative", "technology", "sales-marketing", "operations"];
  const sortedDepts = Object.keys(byDept).sort((a, b) => {
    const ai = deptOrder.indexOf(a);
    const bi = deptOrder.indexOf(b);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  const deptLabels: Record<string, string> = {
    "leadership": "Leadership",
    "event-management": "Event Management",
    "production": "Production",
    "creative": "Creative",
    "technology": "Technology",
    "sales-marketing": "Sales & Marketing",
    "operations": "Operations",
  };

  return (
    <main className="min-h-screen bg-white">
      {/* TEMP DEBUG — remove after verifying Sanity team data flow */}
      <div style={{ background: "#111", color: "#0f0", padding: "8px 16px", fontFamily: "monospace", fontSize: "12px", wordBreak: "break-all" }}>
        DEBUG: projectId={client.config().projectId} dataset={client.config().dataset} useCdn={String(client.config().useCdn)} |
        teamStatus={teamStatus} | teamCount={team.length} | teamError={teamError ?? "none"} |
        teamDocuments={JSON.stringify(team.map((m) => ({ id: m._id, name: m.name, dept: m.department })))}
      </div>
      {/* Hero */}
      <section className="pt-36 pb-16 bg-gradient-to-b from-[#f8fafc] to-white">
        <div className="container-width text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2563EB]/20 bg-[#eff6ff] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#2563EB]">The Team</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#0f172a] mb-4" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Meet the <span className="accent-text">Experts</span>
          </h1>
          <p className="text-lg text-[#475569] max-w-2xl mx-auto">
            The passionate professionals who craft extraordinary experiences for our clients every single day.
          </p>
        </div>
      </section>

      <div className="container-width pb-20">
        {team.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">👤</div>
            <h2 className="text-xl font-semibold text-[#334155] mb-2">Team coming soon</h2>
            <p className="text-[#64748b]">Team member profiles will appear here once added via the admin panel.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {sortedDepts.map((dept) => (
              <section key={dept}>
                <h2 className="text-xl font-bold text-[#0f172a] mb-6 pb-3 border-b border-[#E2E8F0]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  {deptLabels[dept] ?? dept}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {byDept[dept].map((member) => {
                    const photoUrl = member.photo ? urlFor(member.photo).width(300).height(300).url() : null;
                    return (
                      <div key={member._id} className="group rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white hover:border-[#2563EB]/25 hover:shadow-[0_12px_40px_rgba(15,23,42,0.10)] transition-all duration-300">
                        <div className="relative h-56 bg-[#f1f5f9] overflow-hidden">
                          {photoUrl ? (
                            <Image src={photoUrl} alt={member.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="300px" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl">👤</div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="p-5">
                          <h3 className="font-bold text-[#0f172a] mb-0.5" style={{ fontFamily: "var(--font-plus-jakarta)" }}>{member.name}</h3>
                          <p className="text-sm text-[#2563EB] font-medium mb-2">{member.role}</p>
                          {member.bio && <p className="text-xs text-[#64748b] leading-relaxed mb-3 line-clamp-3">{member.bio}</p>}
                          {member.skills && member.skills.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {member.skills.slice(0, 3).map((skill) => (
                                <span key={skill} className="px-2 py-0.5 rounded text-[10px] bg-[#f1f5f9] text-[#64748b] border border-[#E2E8F0]">{skill}</span>
                              ))}
                            </div>
                          )}
                          {member.email && (
                            <a href={`mailto:${member.email}`} className="flex items-center gap-1.5 text-xs text-[#94a3b8] hover:text-[#2563EB] transition-colors mb-2">
                              <Mail className="w-3 h-3" /> {member.email}
                            </a>
                          )}
                          <div className="flex gap-2">
                            {member.socialLinks?.linkedin && <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="w-7 h-7 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#64748b] hover:text-[#0A66C2] hover:border-[#0A66C2]/40 transition-all"><ExternalLink className="w-3 h-3" /></a>}
                            {member.socialLinks?.twitter && <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" title="Twitter/X" className="w-7 h-7 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#64748b] hover:text-[#0f172a] hover:border-[#0f172a]/40 transition-all"><ExternalLink className="w-3 h-3" /></a>}
                            {member.socialLinks?.instagram && <a href={member.socialLinks.instagram} target="_blank" rel="noopener noreferrer" title="Instagram" className="w-7 h-7 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#64748b] hover:text-[#E1306C] hover:border-[#E1306C]/40 transition-all"><ExternalLink className="w-3 h-3" /></a>}
                            {member.socialLinks?.website && <a href={member.socialLinks.website} target="_blank" rel="noopener noreferrer" title="Website" className="w-7 h-7 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#64748b] hover:text-[#2563EB] hover:border-[#2563EB]/40 transition-all"><Globe className="w-3.5 h-3.5" /></a>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      {/* Join CTA */}
      <section className="container-width mb-20">
        <div className="rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-plus-jakarta)" }}>Want to join our team?</h2>
          <p className="text-white/80 mb-6">We&apos;re always looking for talented creatives and event professionals.</p>
          <Link href="/careers" className="inline-flex items-center gap-2 bg-white text-[#2563EB] font-semibold px-6 py-3 rounded-xl hover:bg-[#f8fafc] transition-colors shadow-lg">
            View Open Positions <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
