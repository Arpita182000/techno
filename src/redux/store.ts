import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice";
import campaignStateSlice from "./features/campaignSlice";

export const store = configureStore({
  reducer: {
    appState: appStateSlice,
    campaignState: campaignStateSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;