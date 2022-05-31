import { createSlice } from '@reduxjs/toolkit';

const modalSLice = createSlice({
  name: 'modal',
  initialState: {
    id: null,
    show: false,
  },
  reducers: {
    handleVisible: (state, { payload }) => {
      state.show = !state.show;
      !state.id ? (state.id = payload) : (state.id = null);
    },
  },
});
export const { handleVisible } = modalSLice.actions;
export default modalSLice.reducer;
