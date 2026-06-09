import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const services = [
  { label: "Event Management", href: "/services#event-management" },
  { label: "Wedding Planning", href: "/services#event-management" },
  { label: "Corporate Events", href: "/services#event-management" },
  { label: "Videography", href: "/services#media-production" },
  { label: "AI Video Generation", href: "/services#post-production" },
  { label: "Live Streaming", href: "/services#media-production" },
  { label: "Brand Promotions", href: "/services#brand-digital" },
  { label: "Digital Marketing", href: "/services#brand-digital" },
];

const socialLinks = [
  {
    href: "#",
    label: "Instagram",
    svg: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "YouTube",
    svg: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "LinkedIn",
    svg: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "X (Twitter)",
    svg: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 5.895zM17.083 20.004h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "Facebook",
    svg: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
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
              href="https://wa.me/911234567890"
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center shadow-[0_4px_12px_rgba(37,99,235,0.3)]">
              <span className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-plus-jakarta)" }}>S</span>
            </div>
            <span className="text-xl font-bold tracking-widest text-[#0f172a]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>SHYTECH</span>
          </Link>
          <p className="text-[#475569] text-sm leading-relaxed mb-6">
            Premium event management and media production company creating
            experiences that people never forget.
          </p>
          <div className="flex gap-3">
            {socialLinks.map(({ href, label, svg }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#64748b] hover:text-[#2563EB] hover:border-[#2563EB]/40 hover:shadow-[0_4px_12px_rgba(37,99,235,0.12)] transition-all"
              >
                {svg}
              </a>
            ))}
          </div>
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
                href="tel:+911234567890"
                className="flex items-start gap-3 text-[#475569] hover:text-[#0f172a] transition-colors group"
              >
                <Phone className="w-4 h-4 mt-0.5 text-[#2563EB] shrink-0" />
                <span className="text-sm">+91 12345 67890</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:hello@shytech.agency"
                className="flex items-start gap-3 text-[#475569] hover:text-[#0f172a] transition-colors"
              >
                <Mail className="w-4 h-4 mt-0.5 text-[#2563EB] shrink-0" />
                <span className="text-sm">hello@shytech.agency</span>
              </a>
            </li>
            <li>
              <div className="flex items-start gap-3 text-[#475569]">
                <MapPin className="w-4 h-4 mt-0.5 text-[#2563EB] shrink-0" />
                <span className="text-sm">
                  123 Premium Tower, Business District,
                  <br /> Mumbai, Maharashtra 400001
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#E2E8F0]">
        <div className="container-width py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#94a3b8] text-xs">
            © {new Date().getFullYear()} SHYTECH. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-[#94a3b8] hover:text-[#475569] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-[#94a3b8] hover:text-[#475569] transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap.xml" className="text-xs text-[#94a3b8] hover:text-[#475569] transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
