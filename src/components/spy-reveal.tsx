"use client";

import { motion } from "framer-motion";
import { Target, Eye, Sparkles } from "lucide-react";
import { getPlayerColor, IMPOSTER_WORD } from "@/lib/game-engine";

interface SpyRevealProps {
  spyIndices: number[];
  roles: string[];
  secretWord: string;
  clueWord: string;
  onPlayAgain: () => void;
}

export function SpyReveal({
  spyIndices,
  roles,
  secretWord,
  clueWord,
  onPlayAgain,
}: SpyRevealProps) {
  const isPlural = spyIndices.length > 1;

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
          <span className="text-gradient-gold">The Imposter Is...</span>
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
            {isPlural ? "The imposters had no secret word" : "The imposter had no secret word"}
          </div>

          {spyIndices.map((idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl shadow-xl mb-4"
              style={{
                background: `linear-gradient(135deg, ${getPlayerColor(idx)})`,
              }}
            >
              <p className="text-3xl sm:text-4xl font-black mb-1">
                {roles.length > 0 ? `Player ${idx + 1}` : "Player"}
              </p>
              <p className="text-sm text-white/80">
                was the imposter with the word{" "}
                <span className="font-bold text-[#f6d365]">
                  &quot;{IMPOSTER_WORD}&quot;
                </span>
              </p>
            </div>
          ))}

          {secretWord && (
            <div className="mt-2 pt-4 border-t border-white/10">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Round words
              </div>
              <p className="text-sm text-white/60">
                Secret word:{" "}
                <span className="font-bold text-white">&quot;{secretWord}&quot;</span>
              </p>
              {clueWord && (
                <p className="text-sm text-white/60 mt-1">
                  Clue word:{" "}
                  <span className="font-bold text-[#f6d365]">&quot;{clueWord}&quot;</span>
                </p>
              )}
            </div>
          )}
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