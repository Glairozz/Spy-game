"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { LandingPage } from "@/components/landing-page";
import { PlayerCountSelector } from "@/components/player-count-selector";
import { CategorySelector } from "@/components/category-selector";
import { WordReveal } from "@/components/word-reveal";
import { TurnRandomizer } from "@/components/turn-randomizer";
import { GamePlay } from "@/components/game-play";
import { SpyReveal } from "@/components/spy-reveal";
import {
  createInitialState,
  startGame,
  nextRevealPlayer,
  startPlaying,
  nextTurn,
  endRound,
  getPlayerWord,
  getPlayerColor,
} from "@/lib/game-engine";
import type { GameState } from "@/types";

type Page = "landing" | "players";

export default function Home() {
  const [page, setPage] = useState<Page>("landing");
  const [game, setGame] = useState<GameState | null>(null);

  const handleStart = useCallback(() => {
    setPage("players");
  }, []);

  const handlePlayerSelect = useCallback((count: number) => {
    setGame(createInitialState(count));
  }, []);

  const handleCategorySelect = useCallback((category: string) => {
    setGame((prev) => (prev ? startGame(prev, category) : prev));
  }, []);

  const handleNextReveal = useCallback(() => {
    setGame((prev) => {
      if (!prev) return prev;
      return nextRevealPlayer(prev);
    });
  }, []);

  const handleStartRound = useCallback(() => {
    setGame((prev) => {
      if (!prev) return prev;
      return startPlaying(prev);
    });
  }, []);

  const handleNextTurn = useCallback(() => {
    setGame((prev) => {
      if (!prev) return prev;
      return nextTurn(prev);
    });
  }, []);

  const handleEndRound = useCallback(() => {
    setGame((prev) => {
      if (!prev) return prev;
      return endRound(prev);
    });
  }, []);

  const handlePlayAgain = useCallback(() => {
    setGame(null);
    setPage("landing");
  }, []);

  if (page === "landing" && !game) {
    return (
      <AnimatePresence mode="wait">
        <LandingPage key="landing" onStart={handleStart} />
      </AnimatePresence>
    );
  }

  if (page === "players" && !game) {
    return (
      <AnimatePresence mode="wait">
        <PlayerCountSelector key="players" onSelect={handlePlayerSelect} />
      </AnimatePresence>
    );
  }

  if (!game) return null;

  const word = game.phase === "reveal" ? getPlayerWord(game) : "";
  const playerColor =
    game.phase === "reveal" ? getPlayerColor(game.currentPlayer) : "";

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
          onNext={handleNextReveal}
        />
      )}

      {game.phase === "randomizer" && (
        <TurnRandomizer
          key="randomizer"
          playerCount={game.playerCount}
          onStart={handleStartRound}
        />
      )}

      {game.phase === "playing" && (
        <GamePlay
          key={`playing-${game.currentTurn}`}
          turnOrder={game.turnOrder}
          currentTurn={game.currentTurn}
          playerCount={game.playerCount}
          onNextTurn={handleNextTurn}
          onEndRound={handleEndRound}
        />
      )}

      {game.phase === "results" && (
        <SpyReveal
          key="results"
          spyIndex={game.spyIndex}
          roles={game.roles}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </AnimatePresence>
  );
}
