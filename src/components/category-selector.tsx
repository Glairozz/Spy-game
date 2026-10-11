"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Check } from "lucide-react";
import { getCategories } from "@/lib/game-engine";

interface CategorySelectorProps {
  onSelect: (category: string) => void;
}

export function CategorySelector({ onSelect }: CategorySelectorProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const categories = getCategories();

  const handleNext = useCallback(() => {
    if (selected) onSelect(selected);
  }, [selected, onSelect]);

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
        {categories.map((cat, i) => {
          const isSelected = selected === cat;
          return (
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
              onClick={() => setSelected(cat)}
              aria-pressed={isSelected}
              className={`relative p-4 sm:p-5 rounded-xl text-white font-semibold text-sm transition-all duration-300 ${
                isSelected
                  ? "bg-gradient-to-br from-[#667eea] to-[#764ba2] border-white/30 shadow-lg shadow-[#667eea]/30 scale-[1.03]"
                  : "bg-white/[0.06] border border-white/[0.1] hover:bg-white/[0.12] hover:border-white/25 hover:shadow-lg hover:shadow-[#667eea]/10"
              }`}
            >
              <span className="relative z-10">{cat}</span>
              {isSelected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="absolute top-2 right-2 z-10 w-5 h-5 rounded-full bg-white text-[#764ba2] flex items-center justify-center"
                >
                  <Check className="w-3 h-3" strokeWidth={3} />
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 mt-8 w-full max-w-[640px]"
      >
        <button
          onClick={handleNext}
          disabled={!selected}
          className="w-full sm:w-auto sm:px-12 flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold text-base shadow-lg shadow-[#667eea]/25 hover:shadow-xl hover:shadow-[#667eea]/40 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#667eea] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0e1a] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
        >
          {selected ? "Next" : "Select a Category"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}