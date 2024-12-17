import { createSelector } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

export const selectTodayAppointments = createSelector(
  (state) => state.schedule.appointments,
  (appointments) => {
    const today = dayjs().format('YYYY-MM-DD');
    return appointments.filter((appointment) => appointment.date === today);
  }
);