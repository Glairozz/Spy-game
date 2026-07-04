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
    starterIndex: 0,
    turnDirection: "clockwise",
    turnOrder: [],
    currentTurn: 0,
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

export function nextRevealPlayer(state: GameState): GameState {
  const next = state.currentPlayer + 1;
  if (next >= state.playerCount) {
    return setupTurnOrder(state);
  }
  return { ...state, currentPlayer: next };
}

function setupTurnOrder(state: GameState): GameState {
  const starterIndex = Math.floor(Math.random() * state.playerCount);
  const direction: "clockwise" | "counterclockwise" =
    Math.random() < 0.5 ? "clockwise" : "counterclockwise";

  const order: number[] = [];
  for (let i = 0; i < state.playerCount; i++) {
    const step = direction === "clockwise" ? i : -i;
    const idx = (starterIndex + step + state.playerCount) % state.playerCount;
    order.push(idx);
  }

  return {
    ...state,
    starterIndex,
    turnDirection: direction,
    turnOrder: order,
    currentTurn: 0,
    phase: "randomizer",
  };
}

export function startPlaying(state: GameState): GameState {
  return { ...state, phase: "playing" };
}

export function nextTurn(state: GameState): GameState {
  const next = state.currentTurn + 1;
  if (next >= state.playerCount) {
    return { ...state, currentTurn: next };
  }
  return { ...state, currentTurn: next };
}

export function endRound(state: GameState): GameState {
  return { ...state, phase: "results" };
}

export function getPlayerColor(index: number): string {
  return PLAYER_COLORS[index % PLAYER_COLORS.length];
}

export function getPlayerWord(state: GameState): string {
  return state.roles[state.currentPlayer] ?? "";
}

export function getSpyWord(state: GameState): string {
  return state.roles[state.spyIndex] ?? "";
}

export function getTurnPlayer(state: GameState): number {
  if (state.currentTurn >= state.turnOrder.length) return -1;
  return state.turnOrder[state.currentTurn];
}

export function getCategories(): string[] {
  return Object.keys(CATEGORIES);
}
