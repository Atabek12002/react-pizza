import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from 'react-icons/ai';

import { deleteProductThunk, putCartProduct, handleIdCart } from '../../../store/cart/cartSlice';

import styles from './basketItem.module.scss';

const BasketItem = ({ item }) => {
  const { id, name, size, price, count, type, image } = item;
  const dispatch = useDispatch();
  const { cartLoading, idCart } = useSelector((state) => state.carts);

  const handlePlus = () => {
    dispatch(handleIdCart(id));
    dispatch(putCartProduct({ ...item, count: count + 1 }));
  };
  const handleMinus = () => {
    dispatch(handleIdCart(id));
    dispatch(putCartProduct({ ...item, count: count === 1 ? 1 : count - 1 }));
  };

  const handleDeleteCart = () => {
    dispatch(deleteProductThunk(id));
  };

  return (
    <div className={styles.basket__item}>
      <div className={styles.basket__inf}>
        <img
          className={idCart === id && cartLoading ? styles.dodo_img : ''}
          width={80}
          height={80}
          src={image}
          alt="dodopizza"
        />
        <div>
          <h3 className="pb-5">{name}</h3>
          <p>
            {type} тесто, {size} см.
          </p>
        </div>
      </div>
      <div className={styles.card_num}>
        <AiOutlineMinus className={styles.btn_card} fontSize={32} onClick={handleMinus} />
        <h2>{count}</h2>
        <AiOutlinePlus className={styles.btn_card} fontSize={32} onClick={handlePlus} />
      </div>
      <h2>{price * count} ₽ </h2>
      <button onClick={handleDeleteCart}>
        <AiOutlineClose className={styles.btn_remove} fontSize={32} color="#D7D7D7" />
      </button>
    </div>
  );
};

export default BasketItem;
