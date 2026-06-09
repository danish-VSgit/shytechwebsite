"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { galleryImages as hardcodedGallery, type GalleryImage } from "@/lib/data/gallery";

interface Props {
  images?: GalleryImage[];
}

export default function GallerySection({ images = hardcodedGallery }: Props) {
  const galleryImages = images;
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState<string>("");

  const openLightbox = (src: string, alt: string) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
  };

  const closeLightbox = () => setLightboxSrc(null);

  return (
    <section className="section-padding bg-[#f8fafc]">
      <div className="container-width">
        <SectionHeader
          badge="Gallery"
          title="Captured"
          titleHighlight="Moments"
          subtitle="A visual journey through some of our most memorable events and productions."
        />

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative break-inside-avoid rounded-2xl overflow-hidden cursor-pointer border border-[#E2E8F0] hover:border-[#2563EB]/25 hover:shadow-[0_8px_30px_rgba(15,23,42,0.1)] transition-all duration-500 mb-3"
              onClick={() => openLightbox(img.src, img.alt)}
            >
              <div className="relative" style={{ paddingBottom: `${(img.height / img.width) * 100}%` }}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-[#0f172a]/0 group-hover:bg-[#0f172a]/30 transition-all duration-500 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                  <ZoomIn className="w-5 h-5 text-[#2563EB]" />
                </div>
              </div>

              {/* Category badge */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#0f172a]/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[10px] font-semibold text-white tracking-widest uppercase">
                  {img.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0f172a]/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxSrc}
                alt={lightboxAlt}
                width={1200}
                height={800}
                className="object-contain max-h-[85vh] w-full rounded-2xl"
                sizes="100vw"
              />
              <p className="text-center text-sm text-white/60 mt-3">{lightboxAlt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
