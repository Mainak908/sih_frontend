import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) || [];

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    remove: (state, action) => {
      state = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { add, remove } = CartSlice.actions;
export default CartSlice.reducer;
