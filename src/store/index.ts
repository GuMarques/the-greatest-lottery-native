import { configureStore } from "@reduxjs/toolkit";
import { gamesSlice } from "./slices/games-slice";
import { userSlice } from "./slices/user-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    games: gamesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
