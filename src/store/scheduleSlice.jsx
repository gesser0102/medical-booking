import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
  doctors: [
    {
      "id": 1,
      "name": "Dr. João",
      "price": 200.0,
      "schedule": [
        {"date": "2024-12-17", "time": "08:00", "available": true},
        {"date": "2024-12-17", "time": "09:00", "available": false},
        {"date": "2024-12-19", "time": "11:00", "available": true},
        {"date": "2024-12-20", "time": "09:00", "available": false},
        {"date": "2024-12-21", "time": "08:00", "available": true},
        {"date": "2024-12-22", "time": "11:00", "available": false},
        {"date": "2024-12-24", "time": "09:00", "available": true},
        {"date": "2024-12-25", "time": "08:00", "available": false},
        {"date": "2024-12-30", "time": "10:00", "available": true}
      ]
    },
    {
      "id": 2,
      "name": "Dra. Maria",
      "price": 250.0,
      "schedule": [
        {"date": "2024-12-17", "time": "09:00", "available": true},
        {"date": "2024-12-18", "time": "10:00", "available": false},
        {"date": "2024-12-19", "time": "11:00", "available": true},
        {"date": "2024-12-20", "time": "08:00", "available": false},
        {"date": "2024-12-21", "time": "09:00", "available": true},
        {"date": "2024-12-23", "time": "11:00", "available": false},
        {"date": "2024-12-26", "time": "08:00", "available": true},
        {"date": "2024-12-27", "time": "09:00", "available": false},
        {"date": "2024-12-29", "time": "10:00", "available": true},
        {"date": "2024-12-31", "time": "11:00", "available": true}
      ]
    },
    {
      "id": 3,
      "name": "Dra. Julia",
      "price": 350.0,
      "schedule": [
        {"date": "2024-12-17", "time": "08:00", "available": false},
        {"date": "2024-12-18", "time": "09:00", "available": true},
        {"date": "2024-12-19", "time": "10:00", "available": true},
        {"date": "2024-12-21", "time": "08:00", "available": false},
        {"date": "2024-12-22", "time": "09:00", "available": true},
        {"date": "2024-12-23", "time": "10:00", "available": false},
        {"date": "2024-12-25", "time": "09:00", "available": true},
        {"date": "2024-12-27", "time": "08:00", "available": true},
        {"date": "2024-12-28", "time": "10:00", "available": true},
        {"date": "2024-12-30", "time": "11:00", "available": false}
      ]
    },
    {
      "id": 4,
      "name": "Dr. Paulo",
      "price": 280.0,
      "schedule": [
        {"date": "2024-12-17", "time": "09:00", "available": true},
        {"date": "2024-12-18", "time": "08:00", "available": false},
        {"date": "2024-12-19", "time": "10:00", "available": true},
        {"date": "2024-12-21", "time": "09:00", "available": true},
        {"date": "2024-12-23", "time": "11:00", "available": false},
        {"date": "2024-12-25", "time": "08:00", "available": true},
        {"date": "2024-12-26", "time": "09:00", "available": true},
        {"date": "2024-12-28", "time": "11:00", "available": true},
        {"date": "2024-12-29", "time": "08:00", "available": false},
        {"date": "2024-12-31", "time": "10:00", "available": true}
      ]
    }
  ],
  appointments: [],
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
      const newAppointment = {
        ...action.payload,
        status: action.payload.status || 'Pendente',
      };
    
      state.appointments.push(newAppointment);
    },
    updateAppointment(state, action) {
      const { id, updatedData } = action.payload;
      const appointmentIndex = state.appointments.findIndex((a) => a.id === id);
      if (appointmentIndex > -1) {
        state.appointments[appointmentIndex] = {
          ...state.appointments[appointmentIndex],
          ...updatedData,
        };
      }
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
  updateAppointment,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
