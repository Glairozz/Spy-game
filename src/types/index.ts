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
}

export type GamePhase =
  | "players"
  | "category"
  | "reveal"
  | "summary"
  | "starter";

export interface CategoryData {
  [category: string]: string[];
}
