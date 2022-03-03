import { ICreateUserRequest, ILoginResponse } from "@interfaces";
import instance from "@services/axios.config";

const User = () => {
  async function createUser(body: ICreateUserRequest): Promise<ILoginResponse> {
    return instance.post("/user/create", body);
  }
  return { createUser };
};

export default User;
