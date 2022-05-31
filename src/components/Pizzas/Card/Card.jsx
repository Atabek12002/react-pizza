import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { handleVisible } from '../../../store/modal/modalSlice';

import styles from './card.module.scss';

import { plusWhite } from '../../../assets';

const Card = ({ product }) => {
  const dispatch = useDispatch();
  const { id, imageUrl, name, price, desc } = product;
  const { show } = useSelector((state) => state.modal);

  const handleClick = (id) => {
    dispatch(handleVisible(id));
  };

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [show]);

  return (
    <div className={styles.pizza}>
      <img className={styles.pizza__img} width={250} height={250} src={imageUrl} alt="pizza-img" />
      <h3>{name}</h3>
      <p className={styles.pizza__desc}>{desc}</p>
      <div className={styles.pizza__bottom}>
        <h2>от&nbsp;{price}&nbsp;₽</h2>
        <div className="d-flex align-center cu-p" onClick={() => handleClick(id)}>
          <img src={plusWhite} alt="" />
          <span>Выбрать</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
