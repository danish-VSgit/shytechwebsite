"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar, Building2, Heart, Mic, Rocket,
  Camera, Video, Radio, Film, Cpu, Share2, Zap,
  Mail, Crown, Star, Layers, Megaphone, BarChart2,
  Globe, FileText, Users, TrendingUp, ArrowRight,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { serviceCategories as hardcodedServiceCategories } from "@/lib/data/services";

type ServiceCategoryProp = {
  id: string;
  title: string;
  description: string;
  icon: string;
  services: Array<{ title: string; description: string; icon: string }>;
};

interface Props {
  serviceCategories?: ServiceCategoryProp[];
}

const iconMap: Record<string, React.ElementType> = {
  Calendar, Building2, Heart, Mic, Rocket, Camera, Video, Radio, Film,
  Cpu, Share2, Zap, Mail, Crown, Star, Layers, Megaphone, BarChart2,
  Globe, FileText, Users, TrendingUp,
  Plane: Layers,
};

function ServiceCard({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: string;
  index: number;
}) {
  const Icon = iconMap[icon] || Calendar;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#2563EB]/30 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] cursor-default"
    >
      <div className="mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#eff6ff] border border-[#bfdbfe] flex items-center justify-center group-hover:bg-[#2563EB]/10 group-hover:border-[#2563EB]/30 transition-colors">
          <Icon className="w-6 h-6 text-[#2563EB]" />
        </div>
      </div>
      <h3 className="text-base font-semibold text-[#0f172a] mb-2">{title}</h3>
      <p className="text-sm text-[#64748b] leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default function ServicesSection({ serviceCategories = hardcodedServiceCategories }: Props) {
  return (
    <section className="section-padding bg-[#f8fafc]">
      <div className="container-width">
        <SectionHeader
          badge="What We Do"
          title="Comprehensive Services"
          titleHighlight="Under One Roof"
          subtitle="From the first consultation to final delivery, we handle every dimension of your event and media production needs."
        />

        <div className="space-y-20">
          {serviceCategories.map((category, catIdx) => {
            const CatIcon = iconMap[category.icon] || Calendar;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: catIdx * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-11 h-11 rounded-xl bg-[#2563EB] shadow-[0_4px_14px_rgba(37,99,235,0.3)] flex items-center justify-center">
                    <CatIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0f172a]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>{category.title}</h3>
                    <p className="text-sm text-[#64748b]">{category.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.services.map((service, idx) => (
                    <ServiceCard
                      key={service.title}
                      {...service}
                      index={idx}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-14"
        >
          <Link href="/services" className="btn-primary inline-flex items-center gap-2">
            Explore All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
