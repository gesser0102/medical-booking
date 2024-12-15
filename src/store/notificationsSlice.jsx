import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [
    'Lembrete 1',
    'Lembrete 2',
    'Lembrete 3',
  ],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications(state, action) {
      state.notifications = action.payload;
    },
    removeNotification(state, action) {
      state.notifications = state.notifications.filter(
        (_, index) => index !== action.payload
      );
    },
  },
});

export const { setNotifications, removeNotification } =
notificationsSlice.actions;

export default notificationsSlice.reducer;
