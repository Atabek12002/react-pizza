import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api';

export const getSortThunk = createAsyncThunk(
  'filter/getSortThunk',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/sort');
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    sortItems: [],
    loading: false,
    error: null,
    categoryId: 0,
    pageCount: 1,
    sort: {
      name: 'популярности (DESC)',
      type: 'rating',
      order: 'desc',
    },
  },
  reducers: {
    setCategoryId(state, { payload }) {
      state.categoryId = payload;
    },
    setSort(state, { payload }) {
      state.sort = payload;
    },
    setPageCount(state, { payload }) {
      state.pageCount = payload;
    },
  },
  extraReducers: {
    [getSortThunk.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getSortThunk.fulfilled]: (state, { payload }) => {
      state.sortItems = payload;
      state.loading = false;
      state.error = null;
    },
    [getSortThunk.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
export const { setCategoryId, setSort, setPageCount } = filterSlice.actions;
export default filterSlice.reducer;
