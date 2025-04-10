import { configureStore } from "@reduxjs/toolkit";
import orebiReducer from "../redux/orebiSlice.js";
export const store = configureStore({
  reducer: {
    orebi: orebiReducer,
  },
});
