import { CATEGORIES, PLAYER_COLORS } from "./game-data";
import type { GameState } from "@/types";

export function createInitialState(playerCount: number): GameState {
  return {
    playerCount,
    players: Array.from({ length: playerCount }, (_, i) => ({
      name: `Player ${i + 1}`,
      score: 0,
    })),
    category: null,
    roles: [],
    spyIndex: -1,
    currentPlayer: 0,
    phase: "category",
  };
}

export function startGame(state: GameState, category: string): GameState {
  const words = CATEGORIES[category];
  if (!words) return state;

  const sameWord = words[Math.floor(Math.random() * words.length)];
  let differentWord: string;
  do {
    differentWord = words[Math.floor(Math.random() * words.length)];
  } while (differentWord === sameWord);

  const roles = Array(state.playerCount).fill(sameWord);
  const spyIndex = Math.floor(Math.random() * state.playerCount);
  roles[spyIndex] = differentWord;

  return {
    ...state,
    category,
    roles,
    spyIndex,
    currentPlayer: 0,
    phase: "reveal",
  };
}

export function nextPlayer(state: GameState): GameState {
  const next = state.currentPlayer + 1;
  if (next >= state.playerCount) {
    return { ...state, phase: "summary" };
  }
  return { ...state, currentPlayer: next };
}

export function getPlayerColor(index: number): string {
  return PLAYER_COLORS[index % PLAYER_COLORS.length];
}

export function getPlayerWord(state: GameState): string {
  return state.roles[state.currentPlayer] ?? "";
}

export function getSpyPlayer(state: GameState): string {
  return `Player ${state.spyIndex + 1}`;
}

export function getSpyWord(state: GameState): string {
  return state.roles[state.spyIndex] ?? "";
}

export function getRandomStarter(state: GameState): number {
  return Math.floor(Math.random() * state.playerCount) + 1;
}

export function getCategories(): string[] {
  return Object.keys(CATEGORIES);
}
