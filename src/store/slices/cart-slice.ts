import { createSlice } from "@reduxjs/toolkit";

export interface bet {
  numbers: [number];
  type: string;
  color: string;
  price: number;
  game_id: number;
  created_at: string;
}

const initialCartState = {
  opened: false,
  total: 0,
  bets: new Array<bet>(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    toggleCart(state) {
      state.opened = !state.opened;
    },
    addItemToCart(state, { payload }) {
      state.bets.push(payload.bet);
      state.total += payload.bet.price;
    },
    removeItemFromCart(state, { payload }) {
      state.bets.splice(payload.index, 1);
      state.total -= payload.price;
    },
    clearCart(_) {
      return initialCartState;
    },
  },
});

export const cartActions = cartSlice.actions;
