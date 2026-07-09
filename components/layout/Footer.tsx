import Link from "next/link";
import { Mail, Phone, ArrowRight } from "lucide-react";
import Logo from "@/components/shared/Logo";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Guests", href: "/guests" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

const services = [
  { label: "Corporate Events", href: "/services#event-management" },
  { label: "Conferences & Summits", href: "/services#event-management" },
  { label: "Award Shows", href: "/services#event-management" },
  { label: "Video Production", href: "/services#media-production" },
  { label: "AI Video Generation", href: "/services#post-production" },
  { label: "Live Streaming", href: "/services#media-production" },
  { label: "Brand Activations", href: "/services#brand-digital" },
  { label: "Digital Marketing", href: "/services#brand-digital" },
];

export default function Footer() {
  return (
    <footer className="bg-[#f8fafc] border-t border-[#E2E8F0]">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-[#2563EB] via-[#1d4ed8] to-[#06B6D4]">
        <div className="container-width py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              Ready to create something{" "}
              <span className="text-white/90 underline decoration-white/40 decoration-2 underline-offset-4">extraordinary?</span>
            </h3>
            <p className="text-white/80 mt-2">
              Let&apos;s talk about your next event or production project.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="https://wa.me/918595827471"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#2563EB] font-semibold text-sm hover:bg-[#f8fafc] transition-all shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] hover:-translate-y-0.5"
            >
              WhatsApp Us <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/15 text-white font-semibold text-sm border border-white/30 hover:bg-white/25 transition-all hover:-translate-y-0.5"
            >
              Inquiry Form
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-width py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link href="/" className="flex items-center gap-2.5 mb-4">
            <Logo size={40} />
            <span className="text-xl font-bold tracking-widest text-[#0f172a]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>QueueCap</span>
          </Link>
          <p className="text-[#475569] text-sm leading-relaxed">
            Premium event management and media production company creating
            experiences that people never forget.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold tracking-widest uppercase text-[#2563EB] mb-5">
            Quick Links
          </h4>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-[#475569] hover:text-[#2563EB] transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]/0 group-hover:bg-[#2563EB] transition-all" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-sm font-semibold tracking-widest uppercase text-[#2563EB] mb-5">
            Services
          </h4>
          <ul className="space-y-2">
            {services.map((service) => (
              <li key={service.label}>
                <Link
                  href={service.href}
                  className="text-sm text-[#475569] hover:text-[#2563EB] transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]/0 group-hover:bg-[#2563EB] transition-all" />
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold tracking-widest uppercase text-[#2563EB] mb-5">
            Get In Touch
          </h4>
          <ul className="space-y-4">
            <li>
              <a
                href="tel:+918595827471"
                className="flex items-start gap-3 text-[#475569] hover:text-[#0f172a] transition-colors group"
              >
                <Phone className="w-4 h-4 mt-0.5 text-[#2563EB] shrink-0" />
                <span className="text-sm">+91 85958 27471</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:queuecap@gmail.com"
                className="flex items-start gap-3 text-[#475569] hover:text-[#0f172a] transition-colors"
              >
                <Mail className="w-4 h-4 mt-0.5 text-[#2563EB] shrink-0" />
                <span className="text-sm">queuecap@gmail.com</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#E2E8F0]">
        <div className="container-width py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#94a3b8] text-xs">
            © {new Date().getFullYear()} QueueCap. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/sitemap.xml" className="text-xs text-[#94a3b8] hover:text-[#475569] transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
