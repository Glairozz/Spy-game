"use client";

import { motion } from "framer-motion";
import { getCategories } from "@/lib/game-engine";

interface CategorySelectorProps {
  onSelect: (category: string) => void;
}

export function CategorySelector({ onSelect }: CategorySelectorProps) {
  const categories = getCategories();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-6"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-black mb-8 text-gradient text-center"
      >
        Choose a Category
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 w-full max-w-[800px]"
      >
        {categories.map((cat, i) => (
          <motion.button
            key={cat}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, ease: [0.34, 1.56, 0.64, 1] }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(cat)}
            className="p-5 rounded-2xl bg-gradient-to-br from-[#22265a] to-[#181c44] text-white font-bold text-sm border border-white/5 shadow-lg hover:shadow-xl hover:shadow-[#667eea]/20 hover:from-[#2a2f6a] hover:to-[#1f2344] transition-all duration-300"
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}
