"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { getCategories } from "@/lib/game-engine";

interface CategorySelectorProps {
  onSelect: (category: string) => void;
}

export function CategorySelector({ onSelect }: CategorySelectorProps) {
  const categories = getCategories();

  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-center p-6 overflow-hidden">
      <motion.div
        className="absolute -top-32 -right-32 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #f093fb, transparent)" }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative z-10 text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f093fb]/20 to-[#667eea]/20 border border-white/10 mb-4">
          <BookOpen className="w-6 h-6 text-[#f093fb]" />
        </div>
        <h2 className="text-3xl md:text-4xl font-black mb-2">
          <span className="text-gradient">Choose a Category</span>
        </h2>
        <p className="text-white/80 text-sm">Pick a topic for this round</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 w-full max-w-[640px]"
      >
        {categories.map((cat, i) => (
          <motion.button
            key={cat}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15 + i * 0.04,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(cat)}
            className="p-4 sm:p-5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white font-semibold text-sm hover:bg-white/[0.12] hover:border-white/25 hover:shadow-lg hover:shadow-[#667eea]/10 transition-all duration-300"
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
