import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { ILoginRequest, ILoginResponse } from "@interfaces";
import Auth from "@services/auth";

const initialLoginState: ILoginResponse = {
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
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialLoginState,
  reducers: {
    login({ user, token }, action) {
      console.log(action.payload);
      user = action.payload.user;
      token = action.payload.token;
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
