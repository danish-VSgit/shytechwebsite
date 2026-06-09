"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Event Management", href: "/services#event-management" },
      { label: "Media Production", href: "/services#media-production" },
      { label: "Post Production", href: "/services#post-production" },
      { label: "Guest Management", href: "/services#guest-management" },
      { label: "Brand & Digital", href: "/services#brand-digital" },
    ],
  },
  {
    label: "Work",
    href: "/portfolio",
    children: [
      { label: "Portfolio", href: "/portfolio" },
      { label: "Events", href: "/events" },
      { label: "Videos", href: "/videos" },
    ],
  },
  {
    label: "Company",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/team" },
      { label: "Careers", href: "/careers" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-[#E2E8F0] shadow-[0_4px_24px_rgba(15,23,42,0.06)]"
          : "bg-transparent"
      }`}
    >
      <nav className="container-width flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center shadow-[0_4px_12px_rgba(37,99,235,0.3)]">
              <span className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-plus-jakarta)" }}>S</span>
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#06B6D4] blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
          </div>
          <span className="text-xl font-bold tracking-widest text-[#0f172a] group-hover:text-[#2563EB] transition-colors" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            SHYTECH
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li
              key={link.label}
              className="relative"
              onMouseEnter={() => link.children && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={link.href}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-[#475569] hover:text-[#0f172a] transition-colors rounded-full hover:bg-[#f1f5f9]"
              >
                {link.label}
                {link.children && <ChevronDown className="w-3 h-3" />}
              </Link>

              {/* Dropdown */}
              {link.children && (
                <AnimatePresence>
                  {activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-3 text-sm text-[#475569] hover:text-[#2563EB] hover:bg-[#f8fafc] transition-colors border-b border-[#f1f5f9] last:border-0"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+911234567890"
            className="flex items-center gap-2 text-sm text-[#475569] hover:text-[#2563EB] transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>+91 12345 67890</span>
          </a>
          <Link href="/contact" className="btn-primary text-xs px-6 py-3">
            Free Consultation
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-[#475569] hover:text-[#0f172a]"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-[#E2E8F0] overflow-hidden shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
          >
            <div className="container-width py-6 space-y-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    className="block px-4 py-3 text-[#0f172a] hover:text-[#2563EB] hover:bg-[#f8fafc] rounded-xl transition-colors text-sm font-medium"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="pl-4 space-y-1 mt-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2 text-[#475569] hover:text-[#2563EB] text-xs transition-colors"
                          onClick={() => setIsMobileOpen(false)}
                        >
                          — {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <a
                  href="tel:+911234567890"
                  className="flex items-center gap-2 px-4 py-3 text-sm text-[#475569]"
                >
                  <Phone className="w-4 h-4 text-[#2563EB]" />
                  <span>+91 12345 67890</span>
                </a>
                <Link
                  href="/contact"
                  className="btn-primary text-center"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Free Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
