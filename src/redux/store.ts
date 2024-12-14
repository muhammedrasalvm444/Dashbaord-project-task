import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import playerReducer from "./playersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    players: playerReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
