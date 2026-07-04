"use client";

import { motion } from "framer-motion";
import { CircleHelp, Check, X, ArrowRight, Target, Users } from "lucide-react";
import { getPlayerColor } from "@/lib/game-engine";

interface VotingResultsProps {
  spyIndex: number;
  mostVotedIndex: number;
  voteResults: { targetIndex: number; count: number }[];
  playerCount: number;
  onPlayAgain: () => void;
}

export function VotingResults({
  spyIndex,
  mostVotedIndex,
  voteResults,
  playerCount,
  onPlayAgain,
}: VotingResultsProps) {
  const spyCaught = mostVotedIndex === spyIndex;
  const spyColor = getPlayerColor(spyIndex);

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
        className="relative z-10 text-center mb-6"
      >
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f6d365]/20 to-[#fda085]/20 border border-white/10 mb-4">
          <Target className="w-6 h-6 text-[#f6d365]" />
        </div>
        <h2 className="text-3xl md:text-4xl font-black">
          <span className="text-gradient-gold">Round Results</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
        className="relative z-10 w-full max-w-[420px] space-y-4"
      >
        {/* Spy reveal */}
        <div className="glass-strong rounded-2xl p-6 text-center">
          <p className="text-xs font-bold text-white/50 tracking-widest uppercase mb-4">
            The Spy
          </p>
          <div
            className="p-6 rounded-xl shadow-xl mb-4"
            style={{ background: `linear-gradient(135deg, ${spyColor})` }}
          >
            <p className="text-2xl font-black mb-1">Player {spyIndex + 1}</p>
          </div>

          {/* Verdict */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06]">
            {spyCaught ? (
              <>
                <Check className="w-4 h-4 text-[#1dd1a1]" />
                <span className="text-sm font-bold text-[#1dd1a1]">Spy was caught!</span>
              </>
            ) : (
              <>
                <X className="w-4 h-4 text-[#ff6b6b]" />
                <span className="text-sm font-bold text-[#ff6b6b]">Spy got away!</span>
              </>
            )}
          </div>
        </div>

        {/* Vote tally */}
        <div className="glass-strong rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-white/50" />
            <p className="text-xs font-bold text-white/50 tracking-widest uppercase">
              Voting Results
            </p>
          </div>
          <div className="space-y-2">
            {voteResults.length > 0 ? (
              voteResults.map((result, i) => {
                const pct = Math.round((result.count / playerCount) * 100);
                const isSpy = result.targetIndex === spyIndex;
                const isTop = i === 0;
                return (
                  <div key={result.targetIndex}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold text-white"
                          style={{
                            background: `linear-gradient(135deg, ${getPlayerColor(result.targetIndex)})`,
                          }}
                        >
                          {result.targetIndex + 1}
                        </div>
                        <span className={`text-sm font-bold ${isTop ? "text-[#f6d365]" : "text-white/70"}`}>
                          Player {result.targetIndex + 1}
                        </span>
                        {isSpy && (
                          <span className="text-[10px] font-bold text-[#ff6b6b]">(Spy)</span>
                        )}
                      </div>
                      <span className={`text-sm font-bold ${isTop ? "text-[#f6d365]" : "text-white/50"}`}>
                        {result.count}/{playerCount}
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
                        className={`h-full rounded-full ${
                          isSpy
                            ? "bg-gradient-to-r from-[#ff6b6b] to-[#ee5a5a]"
                            : isTop
                            ? "bg-gradient-to-r from-[#f6d365] to-[#fda085]"
                            : "bg-white/[0.1]"
                        }`}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-white/40 text-center py-4">No votes were cast</p>
            )}
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
          onClick={onPlayAgain}
          className="px-10 py-4 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold text-base shadow-lg shadow-[#667eea]/25 hover:shadow-xl hover:shadow-[#667eea]/40 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 border-none cursor-pointer"
        >
          Play Again
        </button>
      </motion.div>
    </div>
  );
}
