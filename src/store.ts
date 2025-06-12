import { configureStore } from '@reduxjs/toolkit';

// Example slice (replace with your own slices)
import communityReducer from './slices/communitySlice';

export const store = configureStore({
  reducer: {
    community: communityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
