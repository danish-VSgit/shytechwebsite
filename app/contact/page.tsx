import type { Metadata } from "next";
import ContactSection from "@/components/home/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with QueueCap for your corporate event management, conference production, videography, or media production needs. Free consultation available.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-36 pb-12 bg-gradient-to-b from-[#f8fafc] to-white">
        <div className="container-width text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2563EB]/20 bg-[#eff6ff] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#2563EB]">Get In Touch</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-[#0f172a] mb-6" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Start the{" "}
            <span className="accent-text">Conversation</span>
          </h1>
          <p className="text-xl text-[#475569] max-w-2xl mx-auto leading-relaxed">
            Every extraordinary event begins with a conversation. Tell us your vision and we&apos;ll show you how to make it unforgettable.
          </p>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
