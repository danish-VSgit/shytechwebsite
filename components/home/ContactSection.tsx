"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, Phone, Mail, CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { allServices } from "@/lib/data/services";

const budgetOptions = [
  "Under ₹50,000",
  "₹50,000 – ₹1,50,000",
  "₹1,50,000 – ₹5,00,000",
  "₹5,00,000 – ₹15,00,000",
  "₹15,00,000+",
  "Let's Discuss",
];

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    budget: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-padding bg-[#f8fafc]" id="contact">
      <div className="container-width">
        <SectionHeader
          badge="Contact Us"
          title="Let's Create Something"
          titleHighlight="Unforgettable"
          subtitle="Tell us about your vision and we'll respond within 24 hours with a tailored proposal."
        />

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Left: Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
              <h3 className="text-base font-semibold text-[#0f172a] mb-4" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                Get in Touch
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: Phone,
                    label: "Call Us",
                    value: "+91 85958 27471",
                    href: "tel:+918595827471",
                  },
                  {
                    icon: Mail,
                    label: "Email Us",
                    value: "enquiry@queuecap.com",
                    href: "mailto:enquiry@queuecap.com",
                  },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#eff6ff] flex items-center justify-center shrink-0 group-hover:bg-[#2563EB] transition-colors duration-300">
                      <Icon className="w-4 h-4 text-[#2563EB] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="text-xs text-[#94a3b8] mb-0.5 font-medium uppercase tracking-wider">{label}</div>
                      <div className="text-sm text-[#334155] group-hover:text-[#2563EB] transition-colors font-medium">
                        {value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <a
              href="https://wa.me/918595827471?text=Hi%20SHYTECH!%20I%27d%20like%20to%20discuss%20my%20event."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#20bd5c] transition-all shadow-[0_4px_20px_rgba(37,211,102,0.25)] hover:shadow-[0_6px_24px_rgba(37,211,102,0.35)] hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>

            <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
              <p className="text-xs text-[#94a3b8] font-semibold uppercase tracking-wider mb-3">
                Working Hours
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#475569]">Monday – Friday</span>
                  <span className="text-[#0f172a] font-medium">9:00 AM – 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#475569]">Saturday</span>
                  <span className="text-[#0f172a] font-medium">10:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#475569]">Sunday</span>
                  <span className="text-[#2563EB] font-medium">By Appointment</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl p-10 border border-[#2563EB]/20 shadow-[0_20px_60px_rgba(37,99,235,0.08)] text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#dcfce7] flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8 text-[#10B981]" />
                </div>
                <h3 className="text-xl font-bold text-[#0f172a] mb-3" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  Inquiry Received!
                </h3>
                <p className="text-[#475569] mb-6">
                  Thank you for reaching out. Our team will review your inquiry
                  and get back to you within 24 hours with a personalized
                  response.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: "",
                      phone: "",
                      email: "",
                      eventType: "",
                      budget: "",
                      message: "",
                    });
                  }}
                  className="btn-secondary text-sm px-6 py-3"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-[0_8px_30px_rgba(15,23,42,0.06)] space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { name: "name", label: "Full Name *", type: "text", placeholder: "Your full name" },
                    { name: "phone", label: "Phone Number *", type: "tel", placeholder: "+91 98765 43210" },
                    { name: "email", label: "Email Address *", type: "email", placeholder: "you@company.com" },
                  ].map((field) => (
                    <div key={field.name} className={field.name === "email" ? "sm:col-span-2" : ""}>
                      <label className="block text-xs font-semibold text-[#475569] mb-2 uppercase tracking-wider">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required={field.label.includes("*")}
                        className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-[#E2E8F0] text-[#0f172a] placeholder-[#94a3b8] text-sm focus:outline-none focus:border-[#2563EB] focus:ring-3 focus:ring-[#2563EB]/10 focus:bg-white transition-all"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-2 uppercase tracking-wider">
                      Event Type *
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#f8fafc] text-[#0f172a] text-sm focus:outline-none focus:border-[#2563EB] focus:ring-3 focus:ring-[#2563EB]/10 focus:bg-white transition-all appearance-none"
                    >
                      <option value="">Select service...</option>
                      {allServices.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-2 uppercase tracking-wider">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#f8fafc] text-[#0f172a] text-sm focus:outline-none focus:border-[#2563EB] focus:ring-3 focus:ring-[#2563EB]/10 focus:bg-white transition-all appearance-none"
                    >
                      <option value="">Select budget...</option>
                      {budgetOptions.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#475569] mb-2 uppercase tracking-wider">
                    Tell Us About Your Event
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Share your vision, event date, expected guests, and anything that'll help us understand your needs..."
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#f8fafc] text-[#0f172a] placeholder-[#94a3b8] text-sm focus:outline-none focus:border-[#2563EB] focus:ring-3 focus:ring-[#2563EB]/10 focus:bg-white transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Inquiry
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-[#94a3b8]">
                  We respond to all inquiries within 24 hours. Your information is
                  kept strictly confidential.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
