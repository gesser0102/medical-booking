import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  agenda: ["Agenda 1", "Agenda 2", "Agenda 3"],
};

const agendaSlice = createSlice({
  name: 'agenda',
  initialState,
  reducers: {
    setAgenda(state, action) {
      state.agenda = action.payload;
    }
  },
});

export const { setAgenda } =
  agendaSlice.actions;

export default agendaSlice.reducer;
