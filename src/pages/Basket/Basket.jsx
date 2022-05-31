import React from 'react';
import { useDispatch } from 'react-redux';

import { getCartProduct } from '../../store/cart/cartSlice';

import { BasketComp } from '../../components';

import './basket.scss';

const Basket = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getCartProduct());
  }, [dispatch]);
  return <BasketComp />;
};

export default Basket;
