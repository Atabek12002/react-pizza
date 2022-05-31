import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCategoryId, setSort } from '../../store/filter/filterSlice';

import './categories.scss';

import { arrow } from '../../assets';

const Categories = () => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const [showSort, setShowSort] = React.useState(false);
  const refSort = React.useRef();

  const dispatch = useDispatch();
  const { categoryId, sort, sortItems } = useSelector((state) => state.filter);

  const handleClick = (obj) => {
    dispatch(setSort(obj));
    setShowSort(false);
  };
  const handleCategoryIndex = (index) => {
    dispatch(setCategoryId(index));
  };

  React.useEffect(() => {
    document.addEventListener('click', (e) => {
      if (!e.path.includes(refSort.current)) {
        setShowSort(false);
      }
    });
  }, []);
  return (
    <div className="categories pt-40">
      <div className="categories__inner d-flex align-center justify-between flex-wrap">
        <ul className="d-flex flex-wrap">
          {categories.map((item, index) => (
            <li
              key={index}
              onClick={() => handleCategoryIndex(index)}
              className={categoryId === index ? 'categories__btn act' : 'categories__btn'}>
              {item}
            </li>
          ))}
        </ul>
        <div className="categories__sort" ref={refSort}>
          <div onClick={() => setShowSort((prev) => !prev)} className="d-flex align-center cu-p">
            <img
              className={showSort ? 'categories__arrow act' : 'categories__arrow'}
              src={arrow}
              alt="arrow"
            />
            <h4>Сортировка&nbsp;по:</h4>
            <p>{sort.name}</p>
          </div>
          <ul className={showSort ? 'categories__sort-items act' : 'categories__sort-items'}>
            {sortItems &&
              sortItems.map((obj, index) => (
                <li
                  className={obj.name === sort.name ? 'sort_li act' : 'sort_li'}
                  key={index}
                  onClick={() => handleClick(obj)}>
                  {obj.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Categories;
