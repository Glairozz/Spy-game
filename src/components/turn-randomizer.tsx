"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Shuffle, ArrowRight, ArrowLeft } from "lucide-react";

interface TurnRandomizerProps {
  playerCount: number;
  onStart: () => void;
}

export function TurnRandomizer({ playerCount, onStart }: TurnRandomizerProps) {
  const starter = useMemo(() => Math.floor(Math.random() * playerCount) + 1, [playerCount]);
  const direction = useMemo(() => Math.random() < 0.5 ? "clockwise" : "counterclockwise", []);

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
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f6d365]/20 to-[#fda085]/20 border border-white/10 mb-4"
        >
          <Shuffle className="w-6 h-6 text-[#f6d365]" />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-black mb-2">
          <span className="text-gradient-gold">Round Setup</span>
        </h2>
        <p className="text-white/80 text-sm">The game is ready to begin</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.2 }}
        className="relative z-10 w-full max-w-[340px] space-y-4"
      >
        {/* Starter card */}
        <div className="glass-strong rounded-2xl p-6 text-center">
          <p className="text-xs font-bold text-white/50 tracking-widest uppercase mb-3">
            Goes First
          </p>
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#f6d365] via-[#fda085] to-[#f093fb] flex items-center justify-center mx-auto mb-2 shadow-lg shadow-[#f6d365]/30">
            <span className="text-3xl font-black text-white">{starter}</span>
          </div>
          <p className="text-lg font-bold text-white">Player {starter}</p>
        </div>

        {/* Direction card */}
        <div className="glass-strong rounded-2xl p-6 text-center">
          <p className="text-xs font-bold text-white/50 tracking-widest uppercase mb-3">
            Turn Order
          </p>
          <div className="inline-flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/60">from</span>
              <span className="font-bold text-white">P{starter}</span>
            </div>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {direction === "clockwise" ? (
                <ArrowRight className="w-5 h-5 text-[#f6d365]" />
              ) : (
                <ArrowLeft className="w-5 h-5 text-[#f6d365]" />
              )}
            </motion.div>
            <span className="text-sm font-bold text-[#f6d365] tracking-wide uppercase">
              {direction}
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative z-10 mt-8"
      >
        <button
          onClick={onStart}
          className="px-10 py-4 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold text-base shadow-lg shadow-[#667eea]/25 hover:shadow-xl hover:shadow-[#667eea]/40 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 border-none cursor-pointer"
        >
          Start Round
        </button>
      </motion.div>
    </div>
  );
}
