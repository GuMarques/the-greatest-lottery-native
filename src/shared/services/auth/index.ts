import { ILoginRequest, ILoginResponse } from "@interfaces";
import instance from "@services/axios.config";

const Auth = () => {
  async function login(body: ILoginRequest): Promise<ILoginResponse> {
    return instance.post("/login", body);
  }
  return { login };
};

export default Auth;
