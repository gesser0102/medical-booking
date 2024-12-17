import { createSelector } from '@reduxjs/toolkit';

export const selectAppointmentsForDay = createSelector(
  [(state) => state.schedule.appointments, (state) => state.schedule.selectedDate],
  (appointments, selectedDate) =>
    appointments.filter((appointment) => appointment.date === selectedDate)
);