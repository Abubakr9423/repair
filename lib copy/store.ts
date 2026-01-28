import { configureStore } from "@reduxjs/toolkit";
import loginslice from "./features/log/logslice"

export const store = configureStore({
  reducer: {
    log: loginslice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
