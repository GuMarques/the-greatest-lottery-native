import instance from "../axios.config";
import { INewBetRequest, INewBetResponse, IBet } from "@interfaces";

const Bets = () => {
  async function listBet(query: string[]): Promise<IBet[]> {
    return instance.get("/bet/all-bets", { params: { type: query } });
  }
  async function newBet(body: INewBetRequest): Promise<INewBetResponse> {
    return instance.post("/bet/new-bet", body);
  }
  return { listBet, newBet };
};

export default Bets;
