export interface Player {
  name: string;
  score: number;
}

export interface Vote {
  voterIndex: number;
  targetIndex: number;
}

export interface GameState {
  playerCount: number;
  players: Player[];
  category: string | null;
  roles: string[];
  spyIndex: number;
  currentPlayer: number;
  phase: GamePhase;
  starterIndex: number;
  turnDirection: "clockwise" | "counterclockwise";
  turnOrder: number[];
  currentTurn: number;
  votes: Vote[];
  gamePlayPhase: "discussion" | "voting" | "review";
}

export type GamePhase =
  | "category"
  | "reveal"
  | "randomizer"
  | "playing"
  | "results";
