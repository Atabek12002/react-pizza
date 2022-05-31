import React from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../../hook/useCart';

import { cart_a, pizzaLogo } from '../../assets';
import styles from './header.module.scss';
import { Search } from '../../components';

const Header = () => {
  const { sumCart, countCart } = useCart();

  return (
    <header className={styles.header}>
      <Link to="/">
        <div className="d-flex align-center cu-p">
          <img className="mr-15" width={38} height={38} src={pizzaLogo} alt="logo" />
          <div>
            <h2 className="mb-5">REACT PIZZA</h2>
            <p>самая вкусная пицца во вселенной</p>
          </div>
        </div>
      </Link>
      <Search />
      <Link to="/basket">
        <div className={styles.cart}>
          <h3>{sumCart} ₽</h3>
          <div></div>
          <h3 className="d-flex align-center">
            <span className="mr-10">
              <img src={cart_a} alt="" />
            </span>
            <span>{countCart}</span>
          </h3>
        </div>
      </Link>
    </header>
  );
};

export default Header;
