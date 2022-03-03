import {
  IChangePasswordResponse,
  ILoginRequest,
  ILoginResponse,
  IResetPasswordResponse,
} from "@interfaces";
import instance from "@services/axios.config";

const Auth = () => {
  async function login(body: ILoginRequest): Promise<ILoginResponse> {
    return instance.post("/login", body);
  }
  async function resetPassword(email: string): Promise<IResetPasswordResponse> {
    return instance.post("/reset", { email });
  }
  async function changePassword(
    token: string,
    password: string
  ): Promise<IChangePasswordResponse> {
    return instance.post("/reset/" + token, { password: password });
  }
  return { login, resetPassword, changePassword };
};

export default Auth;
