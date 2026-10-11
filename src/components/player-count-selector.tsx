"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Users, Minus, Plus, ArrowRight } from "lucide-react";

const MIN_PLAYERS = 3;
const MAX_PLAYERS = 14;

interface PlayerCountSelectorProps {
  onSelect: (count: number) => void;
}

export function PlayerCountSelector({ onSelect }: PlayerCountSelectorProps) {
  const [count, setCount] = useState(4);

  const decrease = useCallback(() => {
    setCount((c) => Math.max(MIN_PLAYERS, c - 1));
  }, []);

  const increase = useCallback(() => {
    setCount((c) => Math.min(MAX_PLAYERS, c + 1));
  }, []);

  const handleNext = useCallback(() => {
    if (count >= MIN_PLAYERS && count <= MAX_PLAYERS) {
      onSelect(count);
    }
  }, [count, onSelect]);

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
        <p className="text-xs font-bold text-white/50 tracking-widest uppercase text-center mb-5">
          Players
        </p>

        <div className="flex items-center justify-center gap-6 sm:gap-8">
          <button
            onClick={decrease}
            aria-label="Decrease players"
            disabled={count <= MIN_PLAYERS}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-white/[0.06] border border-white/[0.1] text-white hover:bg-white/[0.12] hover:border-white/25 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/[0.06] disabled:hover:border-white/[0.1] transition-all duration-200 cursor-pointer"
          >
            <Minus className="w-6 h-6" />
          </button>

          <div className="text-center">
            <motion.div
              key={count}
              initial={{ scale: 0.7, opacity: 0.4 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center shadow-xl shadow-[#667eea]/30"
            >
              <span className="text-5xl sm:text-6xl font-black text-white">
                {count}
              </span>
            </motion.div>
            <p className="text-sm font-bold text-white/80 mt-3">
              {count} player{count === 1 ? "" : "s"}
            </p>
          </div>

          <button
            onClick={increase}
            aria-label="Increase players"
            disabled={count >= MAX_PLAYERS}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-white/[0.06] border border-white/[0.1] text-white hover:bg-white/[0.12] hover:border-white/25 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/[0.06] disabled:hover:border-white/[0.1] transition-all duration-200 cursor-pointer"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        <p className="text-center text-xs text-white/50 mt-5">
          {MIN_PLAYERS}–{MAX_PLAYERS} players
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 mt-8 w-full max-w-[560px]"
      >
        <button
          onClick={handleNext}
          className="w-full sm:w-auto sm:px-12 flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold text-base shadow-lg shadow-[#667eea]/25 hover:shadow-xl hover:shadow-[#667eea]/40 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#667eea] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0e1a]"
        >
          Next
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}