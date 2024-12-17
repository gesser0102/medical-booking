import { configureStore } from '@reduxjs/toolkit';
import statsReducer from './statsSlice';
import notificationsReducer from './notificationsSlice';
import scheduleReducer from './scheduleSlice';

export const store = configureStore({
  reducer: {
    stats: statsReducer,
    notifications: notificationsReducer,
    schedule: scheduleReducer,
  },
});