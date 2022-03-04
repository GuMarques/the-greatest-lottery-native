import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ILoginResponse, IToken } from "@interfaces";

const instance = axios.create({
  baseURL: "http://10.0.2.2:3333",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use(
  async (config) => {
    const storage = await AsyncStorage.getItem("userData");
    if (storage) {
      const { token }: ILoginResponse = JSON.parse(storage);
      if (token) {
        config.headers!.Authorization = "Bearer " + token.token;
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async (response) => {
    if (response.data) {
      return response.data;
    }
  },
  function (error) {
    if (error.response) {
      const handlerError = error.response;
      return Promise.reject(handlerError);
    }
    return Promise.reject(error);
  }
);

export default instance;
