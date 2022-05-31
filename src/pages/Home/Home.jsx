import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './home.scss';

import { Categories, Pizzas, Pagination } from '../../components';

import { getProducts } from '../../store/products/productsSLice';
import { getCartProduct } from '../../store/cart/cartSlice';
import { getSortThunk } from '../../store/filter/filterSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, pageCount } = useSelector((state) => state.filter);
  const { searchValue } = useSelector((state) => state.search);

  React.useEffect(() => {
    dispatch(getProducts({ categoryId, sort, pageCount, searchValue }));
    dispatch(getCartProduct());
    dispatch(getSortThunk());
  }, [dispatch, categoryId, sort, pageCount, searchValue]);

  return (
    <div className="home d-flex flex-column">
      <Categories />
      <Pizzas />
      <Pagination />
    </div>
  );
};

export default Home;
