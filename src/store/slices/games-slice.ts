import { IListGamesResponse } from "@interfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialGamesState: IListGamesResponse = {
  min_cart_value: 0,
  types: [],
};

export const gamesSlice = createSlice({
  name: "games",
  initialState: initialGamesState,
  reducers: {
    setGames(state, { payload }) {
      state.min_cart_value = payload.min_cart_value;
      state.types = payload.types;
    },
  },
});

export const gamesActions = gamesSlice.actions;
