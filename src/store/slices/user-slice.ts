import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { ILoginResponse } from "@interfaces";
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
      state.user = payload.user;
      state.token = payload.token;
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

export const loginRequest = ({ user, token }: ILoginResponse) => {
  return async (dispatch: React.Dispatch<any>) => {
    await AsyncStorage.setItem(
      "userData",
      JSON.stringify({
        user: user,
        token: token,
      })
    );
    dispatch(userActions.login({ user: user, token: token }));
  };
};

let timer: NodeJS.Timeout;

export const autoLogoutTimer = (expirationTime: number) => {
  return (dispatch: React.Dispatch<any>) => {
    timer = setTimeout(() => {
      dispatch(userActions.logout());
    }, expirationTime);
  };
};

export const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};
