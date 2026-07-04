"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Vote, ArrowRight, Check, Users } from "lucide-react";
import { getPlayerColor } from "@/lib/game-engine";
import type { Vote as VoteType } from "@/types";

interface GamePlayProps {
  turnOrder: number[];
  currentTurn: number;
  playerCount: number;
  votes: VoteType[];
  gamePlayPhase: "discussion" | "voting" | "review";
  onNextTurn: (voteTarget: number) => void;
  onEndRound: () => void;
}

export function GamePlay({
  turnOrder,
  currentTurn,
  playerCount,
  votes,
  gamePlayPhase,
  onNextTurn,
  onEndRound,
}: GamePlayProps) {
  const [selectedTarget, setSelectedTarget] = useState<number | null>(null);
  const [localPhase, setLocalPhase] = useState<"discuss" | "vote">(
    currentTurn === 0 ? "discuss" : "vote"
  );

  const currentPlayerIndex = turnOrder[currentTurn];
  const playerLabel = `Player ${currentPlayerIndex + 1}`;
  const color = getPlayerColor(currentPlayerIndex);

  const handleDiscussDone = useCallback(() => {
    setLocalPhase("vote");
  }, []);

  const handleSubmitVote = useCallback(() => {
    if (selectedTarget === null) return;
    onNextTurn(selectedTarget);
    setSelectedTarget(null);
    setLocalPhase("discuss");
  }, [selectedTarget, onNextTurn]);

  const allVoted = votes.length >= playerCount;

  return (
    <div className="relative min-h-dvh flex flex-col p-6 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{ background: `linear-gradient(135deg, ${color})` }}
      />

      {/* Turn order bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 glass-strong rounded-2xl p-4 mb-6"
      >
        <div className="flex items-center justify-between gap-1">
          {turnOrder.map((pIdx, i) => {
            const isCurrent = i === currentTurn && gamePlayPhase === "discussion";
            const isDone = i < currentTurn;
            return (
              <div
                key={i}
                className="flex flex-col items-center gap-1 flex-1"
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300 ${
                    isCurrent
                      ? "bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white scale-110 shadow-lg shadow-[#667eea]/40"
                      : isDone
                      ? "bg-[#1dd1a1]/20 text-[#1dd1a1]"
                      : "bg-white/[0.04] text-white/40"
                  }`}
                >
                  {isDone ? <Check className="w-3.5 h-3.5" /> : pIdx + 1}
                </div>
                <span
                  className={`text-[10px] font-medium ${
                    isCurrent
                      ? "text-white"
                      : isDone
                      ? "text-[#1dd1a1]"
                      : "text-white/30"
                  }`}
                >
                  P{pIdx + 1}
                </span>
              </div>
            );
          })}
        </div>

        {gamePlayPhase === "discussion" && currentTurn < playerCount && (
          <div className="mt-3 pt-3 border-t border-white/[0.06] text-center">
            <span className="text-xs text-white/50">
              Turn order:{" "}
              <span className="font-bold text-white">
                {turnOrder.map((i) => `P${i + 1}`).join(" → ")}
              </span>
            </span>
          </div>
        )}
      </motion.div>

      {gamePlayPhase === "discussion" || gamePlayPhase === "voting" ? (
        <div className="relative z-10 flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            {localPhase === "discuss" ? (
              <motion.div
                key="discuss"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-1 flex flex-col items-center justify-center"
              >
                <div className="glass-strong rounded-2xl p-8 text-center max-w-[400px] w-full">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: `linear-gradient(135deg, ${color})` }}
                  >
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-2xl font-black mb-2">{playerLabel}</h2>
                  <p className="text-white/70 text-sm mb-6">
                    Describe your word without saying it
                  </p>
                  <button
                    onClick={handleDiscussDone}
                    className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold shadow-lg shadow-[#667eea]/25 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 border-none cursor-pointer"
                  >
                    I&apos;m Done Describing
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="vote"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-1 flex flex-col"
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs text-white/70 mb-3">
                    <Vote className="w-3.5 h-3.5" />
                    {playerLabel} votes
                  </div>
                  <h2 className="text-xl font-black">Who is the Spy?</h2>
                  <p className="text-white/60 text-xs mt-1">
                    Select the player you suspect
                  </p>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-[400px] mx-auto w-full mb-6">
                  {Array.from({ length: playerCount }, (_, i) => {
                    const isSelf = i === currentPlayerIndex;
                    const isSelected = selectedTarget === i;
                    const pColor = getPlayerColor(i);
                    return (
                      <button
                        key={i}
                        disabled={isSelf}
                        onClick={() => setSelectedTarget(i)}
                        className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 border-2 cursor-pointer ${
                          isSelf
                            ? "opacity-30 cursor-not-allowed border-transparent"
                            : isSelected
                            ? "bg-gradient-to-br from-[#f6d365] to-[#fda085] border-white/30 scale-105 shadow-lg shadow-[#f6d365]/30"
                            : "bg-white/[0.04] border-white/[0.06] hover:bg-white/[0.1] hover:border-white/20 text-white"
                        }`}
                      >
                        <div
                          className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ background: `linear-gradient(135deg, ${pColor})` }}
                        >
                          {i + 1}
                        </div>
                        <span className={`text-[11px] font-bold ${isSelected ? "text-white" : "text-white/70"}`}>
                          P{i + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={handleSubmitVote}
                  disabled={selectedTarget === null}
                  className="w-full max-w-[400px] mx-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#1dd1a1] to-[#10ac84] text-white font-bold shadow-lg shadow-[#1dd1a1]/25 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 disabled:opacity-30 disabled:hover:translate-y-0 disabled:cursor-not-allowed flex items-center justify-center gap-2 border-none cursor-pointer"
                >
                  Submit Vote
                  <Check className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* Review phase - all votes cast */
        <motion.div
          key="review"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex-1 flex flex-col items-center justify-center"
        >
          <div className="glass-strong rounded-2xl p-8 text-center max-w-[400px] w-full">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1dd1a1]/20 to-[#10ac84]/20 flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7 text-[#1dd1a1]" />
            </div>
            <h2 className="text-2xl font-black mb-2">All Votes Submitted</h2>
            <p className="text-white/60 text-sm mb-2">
              {playerCount} {playerCount === 1 ? "vote" : "votes"} cast
            </p>
            <p className="text-white/40 text-xs mb-6">
              Ready to reveal the results?
            </p>
            <button
              onClick={onEndRound}
              className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold shadow-lg shadow-[#667eea]/25 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 flex items-center justify-center gap-2 border-none cursor-pointer"
            >
              End Round
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
