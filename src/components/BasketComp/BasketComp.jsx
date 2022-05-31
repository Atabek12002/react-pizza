import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { handleRemoveCarts } from '../../store/cart/cartSlice';
import { useCart } from '../../hook/useCart';

import './basket_comp.scss';

import { cart_b, trash, arrowLeft } from '../../assets';

import BasketItem from './BasketItem/BasketItem';
import { EmptyBasket, Loading } from '../../components';
import { api } from '../../api';

const BasketComp = () => {
  const { cart, loading = false, sumCart, countCart } = useCart();
  const dispatch = useDispatch();

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const removeCarts = async () => {
    dispatch(handleRemoveCarts());
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      await api.delete('/cart/' + item.id);
      delay(1000);
    }
  };

  if (loading) return <Loading />;
  return cart.length > 0 ? (
    <div className="basket-comp pt-40">
      <div className="d-flex justify-between align-center pb-30">
        <h1 className="d-flex align-center">
          <img className="mr-15" src={cart_b} alt="cart-b" />
          Корзина
        </h1>
        <p onClick={removeCarts} className="d-flex align-center cu-p">
          <img className="mr-10" src={trash} alt="trash" />
          Очистить корзину
        </p>
      </div>
      <div className="basket-items flex pr-20">
        {cart.map((item) => (
          <BasketItem key={item.id} item={item} />
        ))}
      </div>
      <div className="basket-bill d-flex align-center justify-between pt-20">
        <p>
          Всего пицц: <b>{countCart} шт.</b>
        </p>
        <p>
          Сумма заказа: <span>{sumCart} ₽</span>
        </p>
      </div>
      <div className="basket-btns d-flex justify-between align-center pt-40">
        <Link to="/">
          <button className="d-flex align-center">
            <img className="mr-20" src={arrowLeft} alt="arrowLeft" />
            Вернуться назад
          </button>
        </Link>
        <button>Оплатить сейчас</button>
      </div>
    </div>
  ) : (
    <EmptyBasket />
  );
};

export default BasketComp;
