import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import cn from 'classnames';
import './modal_comp.scss';

import { postProductThunk, putProductThunk } from '../../store/cart/cartSlice';
import { handleVisible } from '../../store/modal/modalSlice';
import { useCart } from '../../hook/useCart';
import { api } from '../../api';

const ModalComp = () => {
  const dispatch = useDispatch();
  const { id, show } = useSelector((state) => state.modal);

  const [pizza, setPizza] = React.useState(null);
  const [indexSize, setIndexSize] = React.useState(1);
  const [indexType, setIndexType] = React.useState(0);

  const { cart } = useCart();

  const newGetProduct = () => {
    let newProduct = {
      name: pizza.name,
      size: pizza.sizes[indexSize].size,
      price: pizza.sizes[indexSize].price,
      type: pizza.sizes[indexSize].type[indexType].typeName,
      image: pizza.imageUrl,
      count: 1,
    };

    const cartItem = cart.find(
      (prev) =>
        prev.size === newProduct.size &&
        prev.type === newProduct.type &&
        prev.name === newProduct.name,
    );
    if (cartItem) {
      newProduct = { ...newProduct, id: cartItem.id, count: cartItem.count + 1 };
      dispatch(putProductThunk(newProduct));
    } else {
      dispatch(postProductThunk(newProduct));
    }
    dispatch(handleVisible());
  };

  React.useEffect(() => {
    if (id) {
      (async () => {
        try {
          const res = await api.get(`/pizzas/${id}`);
          if (res.status === 200) {
            setPizza(res.data);
          }
        } catch (error) {
          console.log(error.message);
        }
      })();
    }
    return () => {
      setPizza(null);
      setIndexSize(1);
      setIndexType(0);
    };
  }, [id]);

  return (
    pizza && (
      <div
        className={show ? 'modal-comp act' : 'modal-comp'}
        onClick={() => dispatch(handleVisible())}>
        <div
          className={show ? 'modal-comp__inner act' : 'modal-comp__inner'}
          onClick={(e) => e.stopPropagation()}>
          <div className="modal_comp-img_inner">
            <img
              width={350}
              height={350}
              className={cn({
                modal_img: true,
                'modal_img-5': pizza.sizes[indexSize].size === 25,
                'modal_img-7': pizza.sizes[indexSize].size === 30,
              })}
              src={pizza.imageUrl}
              alt="not-pizza"
            />
          </div>
          <div className="d-flex flex-column">
            <h2 className="pb-15">{pizza.name}</h2>
            <p className="pb-20">
              {pizza.sizes[indexSize].size} см, {pizza.sizes[indexSize].type[indexType].typeName}{' '}
              тесто, {pizza.sizes[indexSize].weight} г
            </p>
            <div className="flex">
              <div className="pizza__category">
                <div>
                  {pizza.sizes[indexSize].type.map((item, i) =>
                    item.isShow ? (
                      <span
                        key={item.id}
                        onClick={() => setIndexType(i)}
                        className={indexType === i ? 'pizza__item act' : 'pizza__item'}>
                        {item.typeName}
                      </span>
                    ) : (
                      <span key={item.id} className="pizza__item">
                        {item.typeName}
                      </span>
                    ),
                  )}
                </div>
                <div>
                  {pizza.sizes.map((item, i) => (
                    <span
                      key={item.id}
                      onClick={() => setIndexSize(i) & setIndexType(0)}
                      className={indexSize === i ? 'pizza__item act' : 'pizza__item'}>
                      {item.size}&nbsp;см.
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={newGetProduct}>
              Добавить в корзину за {pizza.sizes[indexSize].price} сум
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalComp;
