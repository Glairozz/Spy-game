export interface Player {
  name: string;
  score: number;
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
}

export type GamePhase =
  | "category"
  | "reveal"
  | "randomizer"
  | "playing"
  | "results";
