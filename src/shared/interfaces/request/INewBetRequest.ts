interface Game {
  game_id: number;
  numbers: number[];
}

export default interface INewBetRequest {
  games: Game[];
}
