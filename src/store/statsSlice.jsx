import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stats: {
    appointments: 25,
    patients: 30,
    revenue: 10000,
  }
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setStats(state, action) {
      state.stats = action.payload;
    },
  },
});

export const { setStats} =
  statsSlice.actions;

export default statsSlice.reducer;
