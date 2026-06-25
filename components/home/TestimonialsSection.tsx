"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { testimonials as hardcodedTestimonials, type Testimonial } from "@/lib/data/testimonials";

interface Props {
  testimonials?: Testimonial[];
}

export default function TestimonialsSection({ testimonials = hardcodedTestimonials }: Props) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const testimonial = testimonials[current];

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* BG decoration */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#2563EB]/4 blur-[100px] pointer-events-none" />

      <div className="container-width relative z-10">
        <SectionHeader
          badge="Client Stories"
          title="Trusted by"
          titleHighlight="Industry Leaders"
          subtitle="Don't take our word for it. Here's what our clients say after working with QueueCap."
        />

        {/* Main testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-3xl p-8 md:p-12 border border-[#E2E8F0] shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            {/* Quote icon */}
            <div className="w-14 h-14 rounded-2xl bg-[#eff6ff] flex items-center justify-center mb-6">
              <Quote className="w-7 h-7 text-[#2563EB]" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>

                {/* Review */}
                <blockquote className="text-xl md:text-2xl text-[#0f172a] leading-relaxed font-light italic mb-8">
                  &ldquo;{testimonial.review}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#E2E8F0] shadow-md">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0f172a]">{testimonial.name}</div>
                    <div className="text-sm text-[#475569]">
                      {testimonial.role} · {testimonial.company}
                    </div>
                    <div className="text-xs text-[#2563EB] mt-0.5 font-medium">
                      {testimonial.eventType}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#f1f5f9]">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-8 h-2.5 bg-[#2563EB]"
                        : "w-2.5 h-2.5 bg-[#E2E8F0] hover:bg-[#cbd5e1]"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#64748b] hover:border-[#2563EB]/40 hover:text-[#2563EB] hover:bg-[#eff6ff] transition-all"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#64748b] hover:border-[#2563EB]/40 hover:text-[#2563EB] hover:bg-[#eff6ff] transition-all"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex justify-center gap-4 mt-8">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setCurrent(i)}
                className={`relative w-11 h-11 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                  i === current
                    ? "border-[#2563EB] scale-110 shadow-[0_4px_12px_rgba(37,99,235,0.25)]"
                    : "border-[#E2E8F0] opacity-50 hover:opacity-80"
                }`}
                aria-label={`View testimonial from ${t.name}`}
              >
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
