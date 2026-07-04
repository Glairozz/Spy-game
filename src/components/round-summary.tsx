"use client";

import { motion } from "framer-motion";
import { CircleHelp, Clock, Trophy, ArrowRight, Home } from "lucide-react";

interface RoundSummaryProps {
  spyPlayer: string;
  spyWord: string;
  spyColor: string;
  onNextRound: () => void;
  onEndGame: () => void;
}

export function RoundSummary({
  spyPlayer,
  spyWord,
  spyColor,
  onNextRound,
  onEndGame,
}: RoundSummaryProps) {
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
          <CircleHelp className="w-6 h-6 text-[#f6d365]" />
        </div>
        <h2 className="text-3xl md:text-4xl font-black">
          <span className="text-gradient-gold">Round Summary</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
        className="relative z-10 w-full max-w-[420px] space-y-4"
      >
        <div className="glass-strong rounded-2xl p-6 sm:p-8 text-center">
          <p className="text-sm font-bold text-[#f6d365] mb-4 tracking-wide uppercase">
            The Spy Revealed
          </p>
          <div
            className="p-6 rounded-xl shadow-xl mb-4"
            style={{
              background: `linear-gradient(135deg, ${spyColor})`,
            }}
          >
            <p className="text-2xl font-black mb-1">{spyPlayer}</p>
            <p className="text-sm text-white/90">
              had the word{" "}
              <span className="font-bold text-[#f6d365]">&quot;{spyWord}&quot;</span>
            </p>
          </div>
        </div>

        <div className="glass-strong rounded-2xl p-5">
          <div className="flex justify-around">
            <div className="text-center">
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center mx-auto mb-2">
                <Clock className="w-5 h-5 text-[#f6d365]" />
              </div>
              <p className="text-xs text-white/70 mb-0.5">Time</p>
              <p className="text-lg font-bold text-[#f6d365]">0:00</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-5 h-5 text-[#1dd1a1]" />
              </div>
              <p className="text-xs text-white/70 mb-0.5">Points</p>
              <p className="text-lg font-bold text-[#1dd1a1]">100</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 flex flex-col sm:flex-row gap-3 mt-8 w-full max-w-[420px]"
      >
        <button
          onClick={onNextRound}
          className="flex-1 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#1dd1a1] to-[#10ac84] text-white font-bold shadow-lg shadow-[#1dd1a1]/25 hover:shadow-xl hover:shadow-[#1dd1a1]/40 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 flex items-center justify-center gap-2 border-none cursor-pointer"
        >
          Next Round
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={onEndGame}
          className="flex-1 px-6 py-3.5 rounded-xl bg-white/[0.08] border border-white/[0.15] text-white font-bold hover:bg-white/[0.14] hover:border-white/25 active:scale-[0.97] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Home className="w-4 h-4" />
          End Game
        </button>
      </motion.div>
    </div>
  );
}
