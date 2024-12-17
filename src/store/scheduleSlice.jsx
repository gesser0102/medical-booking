import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
  doctors: [
    {
      id: 1,
      name: 'Dr. João',
      price: 200.0,
      schedule: [
        { date: '2024-12-20', time: '08:00', available: true },
        { date: '2024-12-20', time: '09:00', available: false },
        { date: '2024-12-21', time: '10:00', available: true },
        { date: '2024-12-21', time: '09:00', available: true },
        { date: '2024-12-21', time: '10:00', available: false },
        { date: '2024-12-21', time: '09:00', available: true },
        { date: '2024-12-21', time: '10:00', available: false },
      ],
    },
    {
      id: 2,
      name: 'Dra. Maria',
      price: 250.0,
      schedule: [
        { date: '2024-12-20', time: '08:00', available: true },
        { date: '2024-12-21', time: '09:00', available: true },
        { date: '2024-12-21', time: '10:00', available: false },
        { date: '2024-12-21', time: '09:00', available: true },
        { date: '2024-12-22', time: '10:00', available: false },
        { date: '2024-12-22', time: '09:00', available: true },
        { date: '2024-12-23', time: '10:00', available: false },
      ],
    },
    {
      id: 3,
      name: 'Dra. Julia',
      price: 350.0,
      schedule: [
        { date: '2024-12-20', time: '08:00', available: true },
        { date: '2024-12-21', time: '09:00', available: true },
        { date: '2024-12-21', time: '10:00', available: false },
        { date: '2024-12-22', time: '09:00', available: true },
        { date: '2024-12-23', time: '10:00', available: false },
        { date: '2024-12-23', time: '09:00', available: true },
        { date: '2024-12-24', time: '10:00', available: false },
      ],
    },
    {
      id: 4,
      name: 'Dr. Paulo',
      price: 280.0,
      schedule: [
        { date: '2024-12-20', time: '08:00', available: true },
        { date: '2024-12-21', time: '09:00', available: true },
        { date: '2024-12-21', time: '10:00', available: false },
        { date: '2024-12-23', time: '09:00', available: true },
        { date: '2024-12-23', time: '10:00', available: false },
        { date: '2024-12-23', time: '09:00', available: true },
        { date: '2024-12-26', time: '10:00', available: false },
      ],
    },
  ],
  appointments: [
    {
      doctorId: 1,
      doctorName: 'Dr. João',
      time: '08:00',
      date: dayjs().format('YYYY-MM-DD'), // Hoje
      patient: { name: 'Ana Silva', cpf: '123.456.789-00' },
    },
    {
      doctorId: 2,
      doctorName: 'Dra. Maria',
      time: '09:00',
      date: dayjs().format('YYYY-MM-DD'), // Hoje
      patient: { name: 'Carlos Souza', cpf: '987.654.321-00' },
    },
    {
      doctorId: 4,
      doctorName: 'Dr. Paulo',
      time: '10:00',
      date: dayjs().format('YYYY-MM-DD'), // Hoje
      patient: { name: 'André Souza', cpf: '487.664.321-00' },
    },
    {
      doctorId: 3,
      doctorName: 'Dr. Julia',
      time: '11:00',
      date: dayjs().format('YYYY-MM-DD'), // Hoje
      patient: { name: 'Carlos Souza', cpf: '982.454.421-70' },
    },
  ],
  modalOpen: false,
  confirmModalOpen: false,
  selectedSlot: null,
  selectedDate: dayjs().format('YYYY-MM-DD'),
  confirmationData: null,
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    toggleModal(state, action) {
      state.modalOpen = action.payload;
    },
    toggleConfirmModal(state, action) {
      state.confirmModalOpen = action.payload;
    },
    setSelectedSlot(state, action) {
      state.selectedSlot = action.payload;
    },
    setSelectedDate(state, action) {
      state.selectedDate = action.payload;
    },
    setConfirmationData(state, action) {
      state.confirmationData = action.payload;
    },
    bookAppointment(state, action) {
      const newAppointment = action.payload;
      state.appointments.push(newAppointment);
    },
  },
});

export const {
  toggleModal,
  toggleConfirmModal,
  setSelectedSlot,
  setSelectedDate,
  setConfirmationData,
  bookAppointment,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
