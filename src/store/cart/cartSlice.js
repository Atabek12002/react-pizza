import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api';

export const getCartProduct = createAsyncThunk(
  'cart/getCartProduct',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/cart');
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const postProductThunk = createAsyncThunk(
  'cart/postProductThunk',
  async (obj, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post('/cart', obj);
      if (res.status === 201) {
        dispatch(handlePost(res.data));
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const putProductThunk = createAsyncThunk(
  'cart/putProductThunk',
  async (obj, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.put(`/cart/${obj.id}`, obj);
      if (res.status === 200) {
        dispatch(handlePut(obj));
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const putCartProduct = createAsyncThunk(
  'cart/putCartProduct',
  async (obj, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.put(`/cart/${obj.id}`, obj);
      console.log(res.data.id);
      if (res.status === 200) {
        dispatch(handlePutToCart(res.data));
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteProductThunk = createAsyncThunk(
  'cart/deleteProductThunk',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.delete(`/cart/${id}`);
      if (res.status === 200) {
        dispatch(handleDelete(id));
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const getCartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    loading: false,
    cartLoading: false,
    error: null,
    idCart: null,
  },
  reducers: {
    handlePost: (state, { payload }) => {
      state.cart.push(payload);
    },
    handlePut: (state, { payload }) => {
      state.cart = state.cart.map((prev) => (prev.id === payload.id ? { ...payload } : prev));
    },
    handlePutToCart: (state, { payload }) => {
      state.cart = state.cart.map((prev) => (prev.id === payload.id ? { ...payload } : prev));
    },
    handleDelete: (state, { payload }) => {
      state.cart = state.cart.filter((prev) => prev.id !== payload);
    },
    handleRemoveCarts: (state) => {
      state.cart = [];
    },
    handleIdCart: (state, { payload }) => {
      state.idCart = payload;
    },
  },
  extraReducers: {
    [getCartProduct.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getCartProduct.fulfilled]: (state, { payload }) => {
      state.cart = payload;
      state.loading = false;
      state.error = null;
    },
    [getCartProduct.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    [postProductThunk.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [postProductThunk.fulfilled]: (state) => {
      state.loading = false;
      state.error = null;
    },
    [postProductThunk.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    [putProductThunk.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [putProductThunk.fulfilled]: (state) => {
      state.error = null;
      state.loading = false;
    },
    [putProductThunk.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    [putCartProduct.pending]: (state) => {
      state.error = null;
      state.cartLoading = true;
    },
    [putCartProduct.fulfilled]: (state) => {
      state.error = null;
      state.cartLoading = false;
    },
    [putCartProduct.rejected]: (state, { payload }) => {
      state.error = payload;
      state.cartLoading = false;
    },

    [deleteProductThunk.pending]: (state) => {
      state.error = null;
    },
    [deleteProductThunk.fulfilled]: (state) => {
      state.error = null;
    },
    [deleteProductThunk.rejected]: (state, { payload }) => {
      state.error = payload;
    },
  },
});
export default getCartSlice.reducer;
export const {
  handlePost,
  handlePut,
  handlePutToCart,
  handleDelete,
  handleRemoveCarts,
  handleIdCart,
} = getCartSlice.actions;
