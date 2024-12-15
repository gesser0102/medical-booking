import { configureStore } from '@reduxjs/toolkit';
import statsReducer from './statsSlice';
import agendaReducer from './agendaSlice';
import notificationsReducer from './notificationsSlice';

export const store = configureStore({
  reducer: {
    stats: statsReducer,
    agenda: agendaReducer,
    notifications: notificationsReducer
  },
});