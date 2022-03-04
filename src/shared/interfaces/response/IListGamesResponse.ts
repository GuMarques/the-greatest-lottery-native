import IGame from "../IGame";

export default interface IListGamesResponse {
  min_cart_value: number;
  types: IGame[];
}
