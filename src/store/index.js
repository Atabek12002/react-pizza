import { configureStore } from '@reduxjs/toolkit';

import products from './products/productsSLice';
import modal from './modal/modalSlice';
import carts from './cart/cartSlice';
import filter from './filter/filterSlice';
import search from './search/searchSlice';

export const store = configureStore({
  reducer: {
    products,
    modal,
    carts,
    filter,
    search,
  },
});
