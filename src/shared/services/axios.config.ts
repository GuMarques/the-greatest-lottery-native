import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.0.2.2:3333",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use(
  async (config) => {
    // const isToken = localStorage.getItem("token");
    const isToken = false;
    if (isToken) {
      config.headers!.Authorization = "Bearer " + isToken;
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
