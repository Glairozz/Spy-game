"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

const PLAYER_COUNTS = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

interface PlayerCountSelectorProps {
  onSelect: (count: number) => void;
}

export function PlayerCountSelector({ onSelect }: PlayerCountSelectorProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-center p-6 overflow-hidden">
      <motion.div
        className="absolute -top-32 -left-32 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #667eea, transparent)" }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #764ba2, transparent)" }}
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative z-10 text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#667eea]/20 to-[#764ba2]/20 border border-white/10 mb-4">
          <Users className="w-6 h-6 text-[#667eea]" />
        </div>
        <h2 className="text-3xl md:text-4xl font-black mb-2">
          <span className="text-gradient">Choose Players</span>
        </h2>
        <p className="text-white/80 text-sm">How many people are playing?</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative z-10 glass-strong rounded-3xl p-6 sm:p-8 w-full max-w-[560px]"
      >
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
          {PLAYER_COUNTS.map((count, i) => (
            <motion.button
              key={count}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.3 + i * 0.04,
                type: "spring",
                stiffness: 300,
                damping: 15,
              }}
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => {
                setSelected(count);
                setTimeout(() => onSelect(count), 150);
              }}
              className={`aspect-square rounded-xl font-black text-lg sm:text-xl transition-all duration-200 border-2 ${
                selected === count
                  ? "bg-gradient-to-br from-[#667eea] to-[#764ba2] border-white/30 shadow-lg shadow-[#667eea]/40 scale-105 text-white"
                  : "bg-white/[0.06] border-white/[0.1] hover:border-white/30 hover:bg-white/[0.12] text-white hover:text-white"
              }`}
            >
              {count}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 mt-6 text-xs text-white/50"
      >
        Choose wisely &mdash; the spy is among you
      </motion.p>
    </div>
  );
}
