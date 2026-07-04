"use client";

import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";
import { getPlayerColor, getSpyWord } from "@/lib/game-engine";

interface SpyRevealProps {
  spyIndex: number;
  roles: string[];
  onPlayAgain: () => void;
}

export function SpyReveal({ spyIndex, roles, onPlayAgain }: SpyRevealProps) {
  const spyColor = getPlayerColor(spyIndex);
  const spyWord = roles[spyIndex] ?? "";

  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-center p-6 overflow-hidden">
      <motion.div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-[0.05] blur-3xl"
        style={{ background: "radial-gradient(circle, #f6d365, transparent)" }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f6d365]/20 to-[#fda085]/20 border border-white/10 mb-4">
          <Target className="w-6 h-6 text-[#f6d365]" />
        </div>
        <h2 className="text-3xl md:text-4xl font-black">
          <span className="text-gradient-gold">The Spy Revealed</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
        className="relative z-10 w-full max-w-[400px]"
      >
        <div className="glass-strong rounded-2xl p-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs text-white/60 mb-6">
            <Eye className="w-3.5 h-3.5" />
            The spy had a different word
          </div>

          <div
            className="p-8 rounded-2xl shadow-xl mb-6"
            style={{ background: `linear-gradient(135deg, ${spyColor})` }}
          >
            <p className="text-3xl sm:text-4xl font-black mb-2">
              Player {spyIndex + 1}
            </p>
            <p className="text-sm text-white/80">
              was the spy with the word:{" "}
              <span className="font-bold text-[#f6d365]">&quot;{spyWord}&quot;</span>
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 mt-8"
      >
        <button
          onClick={onPlayAgain}
          className="px-10 py-4 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold text-base shadow-lg shadow-[#667eea]/25 hover:shadow-xl hover:shadow-[#667eea]/40 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 border-none cursor-pointer"
        >
          Play Again
        </button>
      </motion.div>
    </div>
  );
}
