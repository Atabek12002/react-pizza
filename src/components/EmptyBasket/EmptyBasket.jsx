import React from 'react';
import { Link } from 'react-router-dom';

import { smile, emptyCart } from '../../assets';

import './empty_basket.scss';

const EmptyBasket = () => {
  return (
    <div className="empty-card text-center">
      <h1 className="pb-10">
        Корзина пустая
        <img className="ml-10" src={smile} alt="" />
      </h1>
      <p className="pb-45">
        Вероятней всего, вы не заказывали ещё пиццу. <br /> Для того, чтобы заказать пиццу, перейди
        на главную страницу.
      </p>
      <img className="mb-40" width={300} height={255} src={emptyCart} alt="emptyCart" />
      <br />
      <Link to="/">
        <button className="mt-20">Вернуться назад</button>
      </Link>
    </div>
  );
};

export default EmptyBasket;
