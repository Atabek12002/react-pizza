import { useSelector, useDispatch } from 'react-redux';

export const useCart = () => {
  const { cart, loading } = useSelector((state) => state.carts);
  const dispatch = useDispatch();
  let sumCart =
    Array.isArray(cart) && cart.reduce((sum, prev) => prev && sum + prev.price * prev.count, 0);
  let countCart =
    Array.isArray(cart) && cart.reduce((count, prev) => prev && count + prev.count, 0);
  return { cart, loading, sumCart, countCart, dispatch };
};
