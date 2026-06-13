import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Camera, Film, Users, TrendingUp, Building2, Trophy, Mic, Mic2, Rocket, Video, Radio, Cpu, Share2, Zap, Mail, Crown, Star, Layers, Megaphone, BarChart2, Globe, FileText } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { serviceCategories } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore SHYTECH's full range of premium services — from corporate event management and conference production to AI video generation, live streaming, and digital marketing.",
};

const iconMap: Record<string, React.ElementType> = {
  Calendar, Building2, Trophy, Mic, Mic2, Rocket, Camera, Video, Radio, Film,
  Cpu, Share2, Zap, Mail, Crown, Star, Layers, Megaphone, BarChart2,
  Globe, FileText, Users, TrendingUp, Plane: Layers,
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-gradient-to-b from-[#f8fafc] to-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/5 via-transparent to-transparent" />
        <div className="container-width relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2563EB]/20 bg-[#eff6ff] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#2563EB]">What We Offer</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-[#0f172a] mb-6" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            All Your Event &{" "}
            <span className="accent-text">Media Needs</span>
          </h1>
          <p className="text-xl text-[#475569] max-w-2xl mx-auto leading-relaxed">
            Sixteen specialized services. One seamless team. Zero compromise. Everything you need to create experiences that leave a lasting impression.
          </p>
        </div>
      </section>

      {/* Services by category */}
      {serviceCategories.map((category, catIdx) => {
        const CatIcon = iconMap[category.icon] || Calendar;
        return (
          <section
            key={category.id}
            id={category.id}
            className="section-padding border-t border-[#E2E8F0]"
            style={{ background: catIdx % 2 === 0 ? "#ffffff" : "#f8fafc" }}
          >
            <div className="container-width">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-[#2563EB] shadow-[0_4px_14px_rgba(37,99,235,0.3)] flex items-center justify-center">
                      <CatIcon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs font-semibold tracking-widest uppercase text-[#2563EB]">
                      Category 0{catIdx + 1}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>{category.title}</h2>
                  <p className="text-[#475569] mt-2 max-w-xl">{category.description}</p>
                </div>
                <Link
                  href="/contact"
                  className="btn-primary shrink-0 inline-flex items-center gap-2 text-sm"
                >
                  Get Quote <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {category.services.map((service) => {
                  const ServiceIcon = iconMap[service.icon] || Calendar;
                  return (
                    <div
                      key={service.title}
                      className="group p-6 rounded-2xl border border-[#E2E8F0] bg-white hover:border-[#2563EB]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(37,99,235,0.08)]"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#eff6ff] flex items-center justify-center mb-4 group-hover:bg-[#2563EB] transition-colors duration-300">
                        <ServiceIcon className="w-6 h-6 text-[#2563EB] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-base font-semibold text-[#0f172a] mb-2 group-hover:text-[#2563EB] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-[#64748b] leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-20 border-t border-[#E2E8F0] bg-[#f8fafc]">
        <div className="container-width text-center">
          <h2 className="text-4xl font-bold text-[#0f172a] mb-5" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Not sure which service you need?
          </h2>
          <p className="text-[#475569] mb-8 max-w-xl mx-auto">
            Let&apos;s have a conversation. We&apos;ll help you figure out exactly what will create the best outcome for your event.
          </p>
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
            Schedule a Free Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
