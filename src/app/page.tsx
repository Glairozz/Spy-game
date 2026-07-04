"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { LandingPage } from "@/components/landing-page";
import { PlayerCountSelector } from "@/components/player-count-selector";
import { CategorySelector } from "@/components/category-selector";
import { WordReveal } from "@/components/word-reveal";
import { TurnRandomizer } from "@/components/turn-randomizer";
import { GamePlay } from "@/components/game-play";
import { VotingResults } from "@/components/voting-results";
import {
  createInitialState,
  startGame,
  nextRevealPlayer,
  startPlaying,
  nextTurn,
  endRound,
  getPlayerWord,
  getPlayerColor,
  getTurnPlayer,
  getVoteResults,
  getMostVotedPlayer,
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

  const handleNextTurn = useCallback(
    (voteTarget: number) => {
      setGame((prev) => {
        if (!prev) return prev;
        return nextTurn(prev, voteTarget);
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

  // Landing page
  if (page === "landing" && !game) {
    return (
      <AnimatePresence mode="wait">
        <LandingPage key="landing" onStart={handleStart} />
      </AnimatePresence>
    );
  }

  // Player count selection
  if (page === "players" && !game) {
    return (
      <AnimatePresence mode="wait">
        <PlayerCountSelector key="players" onSelect={handlePlayerSelect} />
      </AnimatePresence>
    );
  }

  // Game flow
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
          votes={game.votes}
          gamePlayPhase={game.gamePlayPhase}
          onNextTurn={handleNextTurn}
          onEndRound={handleEndRound}
        />
      )}

      {game.phase === "results" && (
        <VotingResults
          key="results"
          spyIndex={game.spyIndex}
          mostVotedIndex={getMostVotedPlayer(game)}
          voteResults={getVoteResults(game)}
          playerCount={game.playerCount}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </AnimatePresence>
  );
}
