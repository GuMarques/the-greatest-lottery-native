interface Bet {
  choosen_numbers: string;
  user_id: number;
  game_id: number;
  price: number;
  created_at: Date;
  updated_at: Date;
  id: number;
}

export default interface INewBetResponse {
  bet: Bet[];
}
