import { IListGamesResponse } from "@interfaces";
import instance from "../axios.config";

const Games = () => {
  async function listGames(): Promise<IListGamesResponse> {
    return instance.get("/cart_games");
  }
  return { listGames };
};

export default Games;
