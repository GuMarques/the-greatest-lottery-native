import {
  ICreateUserRequest,
  ILoginResponse,
  IUpdateMyUserRequest,
  IUpdateMyUserResponse,
} from "@interfaces";
import instance from "@services/axios.config";

const User = () => {
  async function createUser(body: ICreateUserRequest): Promise<ILoginResponse> {
    return instance.post("/user/create", body);
  }
  async function updateMyUser(
    body: IUpdateMyUserRequest
  ): Promise<IUpdateMyUserResponse> {
    return instance.put("/user/update", body);
  }
  return { createUser, updateMyUser };
};

export default User;
