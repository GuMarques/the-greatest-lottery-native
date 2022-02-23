import IToken from "../IToken";

interface IUser {
  id: number | undefined;
  email: string;
  is_admin: number;
  name: string;
  token: null;
  token_created_at: null;
  created_at: Date | undefined;
  updated_at: Date | undefined;
  picture: null;
}

export default interface ILoginResponse {
  user: IUser;
  token: IToken;
}
