import { configureStore } from '@reduxjs/toolkit';
import statsReducer from './statsSlice';
import agendaReducer from './agendaSlice';
import notificationsReducer from './notificationsSlice';
import scheduleReducer from './scheduleSlice';

export const store = configureStore({
  reducer: {
    stats: statsReducer,
    agenda: agendaReducer,
    notifications: notificationsReducer,
    schedule: scheduleReducer,
  },
});