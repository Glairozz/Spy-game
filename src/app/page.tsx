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
  startRound,
  endRound,
  getPlayerWord,
  getPlayerColor,
  getImposterIndices,
  getSecretWord,
  IMPOSTER_WORD,
  type TurnDirection,
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

  const handleStartRound = useCallback(
    (starterIndex: number, direction: TurnDirection) => {
      setGame((prev) => {
        if (!prev) return prev;
        return startRound(prev, starterIndex, direction);
      });
    },
    []
  );

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
  const isImposter = word === IMPOSTER_WORD;
  const playerColor =
    game.phase === "reveal" ? getPlayerColor(game.currentPlayer) : "";
  const clueWord = game.clueWord ?? "";
  const spyIndices =
    game.phase === "results" ? getImposterIndices(game) : [];
  const secretWord = game.phase === "results" ? getSecretWord(game) : "";

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
          clueWord={isImposter ? clueWord : ""}
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
          key="playing"
          turnOrder={game.turnOrder}
          onEndRound={handleEndRound}
        />
      )}

      {game.phase === "results" && (
        <SpyReveal
          key="results"
          spyIndices={spyIndices}
          roles={game.roles}
          secretWord={secretWord}
          clueWord={clueWord}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </AnimatePresence>
  );
}