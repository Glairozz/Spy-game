import { CATEGORIES, PLAYER_COLORS } from "./game-data";
import type { GameState } from "@/types";

export const IMPOSTER_WORD = "IMPOSTER";
export type TurnDirection = "clockwise" | "counterclockwise";

export function createInitialState(playerCount: number): GameState {
  return {
    playerCount,
    players: Array.from({ length: playerCount }, (_, i) => ({
      name: `Player ${i + 1}`,
      score: 0,
    })),
    category: null,
    roles: [],
    clueWord: "",
    spyIndex: -1,
    currentPlayer: 0,
    phase: "category",
    starterIndex: 0,
    turnDirection: "clockwise",
    turnOrder: [],
    currentTurn: 0,
  };
}

/**
 * Applies the chosen category and initializes the round data:
 * - Picks the secret word shared by all normal players.
 * - Picks a clue word assigned ONLY to the Imposter.
 * - Assigns a single Imposter role (the existing configuration).
 * - Starts the private pass-the-phone card-distribution stage.
 *
 * All assignments are stored in the round state and never regenerated
 * while navigating between stages.
 */
export function startGame(state: GameState, category: string): GameState {
  const words = CATEGORIES[category];
  if (!words || words.length === 0 || state.playerCount < 1) return state;

  const secretWord = words[Math.floor(Math.random() * words.length)];
  let clueWord: string;
  if (words.length > 1) {
    do {
      clueWord = words[Math.floor(Math.random() * words.length)];
    } while (clueWord === secretWord);
  } else {
    clueWord = secretWord;
  }

  const spyIndex = Math.floor(Math.random() * state.playerCount);
  const roles = Array<string>(state.playerCount).fill(secretWord);
  roles[spyIndex] = IMPOSTER_WORD;

  return {
    ...state,
    category,
    clueWord,
    roles,
    spyIndex,
    currentPlayer: 0,
    phase: "reveal",
  };
}

/**
 * Advances to the next player's private card. After the last player has
 * viewed their card, moves to the starting-player and rotation setup.
 */
export function nextRevealPlayer(state: GameState): GameState {
  const next = state.currentPlayer + 1;
  if (next >= state.playerCount) {
    return { ...state, phase: "randomizer" };
  }
  return { ...state, currentPlayer: next };
}

/**
 * Starts the discussion using the player-selected starting player and
 * rotation direction. Calculates the speaking order and saves both
 * settings to the round state. Does nothing until "Start Round" is
 * pressed on the setup screen.
 */
export function startRound(
  state: GameState,
  starterIndex: number,
  direction: TurnDirection
): GameState {
  const count = state.playerCount;
  if (count < 1 || starterIndex < 0 || starterIndex >= count) return state;

  const order: number[] = [];
  for (let i = 0; i < count; i++) {
    const step = direction === "clockwise" ? i : -i;
    order.push((starterIndex + step + count) % count);
  }

  return {
    ...state,
    starterIndex,
    turnDirection: direction,
    turnOrder: order,
    currentTurn: 0,
    phase: "playing",
  };
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

/** All players whose assigned role is the Imposter (derived from roles). */
export function getImposterIndices(state: GameState): number[] {
  return state.roles.reduce<number[]>((acc, role, i) => {
    if (role === IMPOSTER_WORD) acc.push(i);
    return acc;
  }, []);
}

/** The secret word shared by the normal (non-Imposter) players. */
export function getSecretWord(state: GameState): string {
  return state.roles.find((role) => role !== IMPOSTER_WORD) ?? "";
}

export function getTurnPlayer(state: GameState): number {
  if (state.currentTurn >= state.turnOrder.length) return -1;
  return state.turnOrder[state.currentTurn];
}

export function getCategories(): string[] {
  return Object.keys(CATEGORIES);
}