import { configureStore } from "@reduxjs/toolkit";
import Authenticate from "./slices/authenticate";
import cartReducer from "./slices/cartitem";

export const store = configureStore({
  reducer: {
    auth: Authenticate,
    cart: cartReducer,
  },
});
