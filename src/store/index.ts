import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./slices/cart-slice";
import { gamesSlice } from "./slices/games-slice";
import { userSlice } from "./slices/user-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    games: gamesSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
