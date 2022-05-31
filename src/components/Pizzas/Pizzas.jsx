import React from 'react';

import { useSelector } from 'react-redux';

import Card from './Card/Card';
import { ContentLoader, ModalComp } from '../../components';

import './pizzas.scss';

const Pizzas = () => {
  const { products, loading } = useSelector((state) => state.products);
  // const { searchValue } = useSelector((state) => state.search);

  const skeletons = [...Array(4)].map((_, index) => <ContentLoader key={index} />);
  // const search = products.filter((prev) =>
  //   prev.name.toLowerCase().includes(searchValue.toLowerCase()),
  // );
  const pizzas = products.map((item) => <Card key={item.id} product={item} />);

  return (
    <div className="pizza">
      <h1 className="mb-35">Все пиццы</h1>
      <div className="pizza__items">{loading ? skeletons : pizzas}</div>
      <ModalComp />
    </div>
  );
};

export default Pizzas;
