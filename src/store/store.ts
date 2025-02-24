import { configureStore } from "@reduxjs/toolkit";
import gridReducer from "./slices/gridSlice";
import colorReducer from "./slices/colorSlice";

export const store = configureStore({
  reducer: {
    grid: gridReducer,
    color: colorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
