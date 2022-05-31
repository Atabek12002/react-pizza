/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useDispatch } from 'react-redux';
import { BiSearch } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
import { debounce } from 'lodash';

import { setSearchValue } from '../../store/search/searchSlice';

import styles from './search.module.scss';

const Search = () => {
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef();
  const dispatch = useDispatch();

  const updateSearch = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 1000),
    [],
  );

  const testDebounce = React.useCallback(
    debounce(() => {
      console.log('Debounce');
    }, 1000),
    [],
  );

  const onClear = () => {
    inputRef.current.focus();
    setValue('');
    dispatch(setSearchValue(''));
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearch(e.target.value);
    testDebounce();
  };

  return (
    <div className={styles.search}>
      <BiSearch className={styles.ico} />
      <input ref={inputRef} value={value} onChange={onChangeInput} type="text" />
      {value && <GrClose className={styles.ico} onClick={onClear} />}
    </div>
  );
};

export default Search;
