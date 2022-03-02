import React from "react";
import Auth from "@services/auth";
import { createSlice } from "@reduxjs/toolkit";
import { ILoginRequest, ILoginResponse, IToken } from "@interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface loginState extends ILoginResponse {
  didTryAutoLogin: boolean;
}

const initialLoginState: loginState = {
  user: {
    id: undefined,
    email: "",
    is_admin: 0,
    name: "",
    token: null,
    token_created_at: null,
    created_at: undefined,
    updated_at: undefined,
    picture: null,
  },
  token: {
    type: "",
    token: "",
    expires_at: undefined,
  },
  didTryAutoLogin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialLoginState,
  reducers: {
    login(state, { payload }) {
      const actionUser = payload.user;
      const actionToken = payload.token;
      AsyncStorage.setItem(
        "userData",
        JSON.stringify({
          user: actionUser,
          token: actionToken,
        })
      );
      state.user = actionUser;
      state.token = actionToken;
    },
    authenticate(state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
    },
    logout() {
      clearLogoutTimer();
      AsyncStorage.removeItem("userData");
      return initialLoginState;
    },
    triedAutoLogin(state) {
      state.didTryAutoLogin = true;
    },
  },
});

export const userActions = userSlice.actions;

export const loginRequest = (body: ILoginRequest) => {
  return async (dispatch: React.Dispatch<any>) => {
    const { login } = Auth();
    try {
      const res = await login(body);
      dispatch(userActions.login({ user: res.user, token: res.token }));
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
};

let timer: NodeJS.Timeout;

export const autoLogoutTimer = (expirationTime: number) => {
  console.log("Hello");
  return (dispatch: React.Dispatch<any>) => {
    timer = setTimeout(() => {
      dispatch(userActions.logout());
      console.log("Timeout!");
    }, expirationTime);
  };
};

export const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};
