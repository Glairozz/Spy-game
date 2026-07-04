"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Play, Shuffle } from "lucide-react";
import { getRandomStarter } from "@/lib/game-engine";

interface StarterPickerProps {
  playerCount: number;
  onPlayAgain: () => void;
}

export function StarterPicker({ playerCount, onPlayAgain }: StarterPickerProps) {
  const starter = useMemo(
    () =>
      getRandomStarter({
        playerCount,
        players: [],
        category: null,
        roles: [],
        spyIndex: -1,
        currentPlayer: 0,
        phase: "starter",
      }),
    [playerCount]
  );

  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-center p-6 overflow-hidden">
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-[0.06] blur-3xl"
        style={{ background: "radial-gradient(circle, #f6d365, transparent)" }}
        animate={{ scale: [1, 1.3, 1], rotate: [0, 45, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center mb-8"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1, delay: 0.5 }}
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f6d365]/20 to-[#fda085]/20 border border-white/10 mb-4"
        >
          <Shuffle className="w-6 h-6 text-[#f6d365]" />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-black mb-2">
          <span className="text-gradient-gold">Who Goes First?</span>
        </h2>
        <p className="text-white/50 text-sm">The dice have spoken</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.3, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.2 }}
        className="relative z-10 w-[260px] sm:w-[300px] aspect-[16/9] rounded-2xl flex flex-col items-center justify-center bg-gradient-to-br from-[#f6d365] via-[#fda085] to-[#f093fb] shadow-2xl shadow-[#f6d365]/30 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          style={{ transform: "rotate(45deg)", width: "200%", height: "200%" }}
        />
        <motion.span
          className="relative text-3xl sm:text-4xl font-black text-white drop-shadow-lg"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Player {starter}
        </motion.span>
        <span className="relative text-[10px] font-bold text-white/60 mt-2 tracking-[0.2em] uppercase">
          Goes First
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 mt-10"
      >
        <button
          onClick={onPlayAgain}
          className="px-10 py-4 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold text-base shadow-lg shadow-[#667eea]/25 hover:shadow-xl hover:shadow-[#667eea]/40 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 flex items-center gap-3 border-none cursor-pointer"
        >
          <Play className="w-5 h-5 fill-current" />
          Play Again
        </button>
      </motion.div>
    </div>
  );
}
