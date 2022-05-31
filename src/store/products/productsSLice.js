import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../api';

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (data, { rejectWithValue }) => {
    const categoryId = data.categoryId > 0 ? `category=${data.categoryId}` : ``;
    const search = data.searchValue ? `search=${data.searchValue}` : ``;
    try {
      const res = await api.get(
        `/pizzas?page=${data.pageCount}&limit=4&${categoryId}&sortBy=${data.sort.type}&order=${data.sort.order}&${search}`,
        // `/pizzas?_page=${data.pageCount}&_limit=4&${categoryId}&_sort=${data.sort.type}&_order=${data.sort.order}&${search}`
      );
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getProducts.fulfilled]: (state, { payload }) => {
      state.products = payload;
      state.loading = false;
      state.error = null;
    },
    [getProducts.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default productsSlice.reducer;
