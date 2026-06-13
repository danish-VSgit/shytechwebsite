"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white rounded-2xl p-5 w-72 shadow-[0_20px_60px_rgba(15,23,42,0.15)] border border-[#E2E8F0]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0f172a]">SHYTECH</p>
                <p className="text-xs text-[#10B981] font-medium">● Online now</p>
              </div>
            </div>
            <p className="text-sm text-[#475569] mb-4 leading-relaxed">
              Hi there! 👋 Ready to create something extraordinary? Chat with us
              on WhatsApp for a quick response.
            </p>
            <a
              href="https://wa.me/918595827471?text=Hi%20SHYTECH!%20I%27d%20like%20to%20discuss%20my%20event%20requirements."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-primary text-center flex items-center justify-center gap-2 text-xs"
            >
              <MessageCircle className="w-4 h-4" />
              Start Conversation
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.4)] flex items-center justify-center hover:scale-110 hover:shadow-[0_6px_24px_rgba(37,211,102,0.5)] transition-all"
        aria-label="Contact us on WhatsApp"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center shadow-sm">
          <span className="text-[9px] font-bold text-white">1</span>
        </span>
      </button>
    </div>
  );
}
