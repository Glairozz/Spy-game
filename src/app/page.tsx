"use client";

"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { PlayerCountSelector } from "@/components/player-count-selector";
import { CategorySelector } from "@/components/category-selector";
import { WordReveal } from "@/components/word-reveal";
import { RoundSummary } from "@/components/round-summary";
import { StarterPicker } from "@/components/starter-picker";
import { createInitialState, startGame, nextPlayer, getPlayerWord, getSpyPlayer, getSpyWord, getPlayerColor } from "@/lib/game-engine";
import type { GameState } from "@/types";

export default function Home() {
  const [game, setGame] = useState<GameState | null>(null);

  const handlePlayerSelect = useCallback((count: number) => {
    setGame(createInitialState(count));
  }, []);

  const handleCategorySelect = useCallback((category: string) => {
    setGame((prev) => (prev ? startGame(prev, category) : prev));
  }, []);

  const handleNextPlayer = useCallback(() => {
    setGame((prev) => {
      if (!prev) return prev;
      const next = nextPlayer(prev);
      return next;
    });
  }, []);

  const handleNextRound = useCallback(() => {
    setGame(null);
  }, []);

  const handleEndGame = useCallback(() => {
    setGame((prev) => {
      if (!prev) return prev;
      return { ...prev, phase: "starter" };
    });
  }, []);

  if (!game) {
    return (
      <AnimatePresence mode="wait">
        <PlayerCountSelector key="players" onSelect={handlePlayerSelect} />
      </AnimatePresence>
    );
  }

  const word = game.phase === "reveal" ? getPlayerWord(game) : "";
  const playerColor = game.phase === "reveal" ? getPlayerColor(game.currentPlayer) : "";

  return (
    <AnimatePresence mode="wait">
      {game.phase === "category" && (
        <CategorySelector key="category" onSelect={handleCategorySelect} />
      )}

      {game.phase === "reveal" && (
        <WordReveal
          key={`reveal-${game.currentPlayer}`}
          currentPlayer={game.currentPlayer}
          playerCount={game.playerCount}
          word={word}
          color={playerColor}
          onNext={handleNextPlayer}
        />
      )}

      {game.phase === "summary" && (
        <RoundSummary
          key="summary"
          spyPlayer={getSpyPlayer(game)}
          spyWord={getSpyWord(game)}
          spyColor={getPlayerColor(game.spyIndex)}
          onNextRound={handleNextRound}
          onEndGame={handleEndGame}
        />
      )}

      {game.phase === "starter" && (
        <StarterPicker
          key="starter"
          playerCount={game.playerCount}
          onPlayAgain={handleNextRound}
        />
      )}
    </AnimatePresence>
  );
}
