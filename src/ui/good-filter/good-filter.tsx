import React from 'react';
import styles from './good-filter.module.css'
import { useSearchParams } from 'react-router-dom';
import { debounce } from 'lodash';

type TGoodFilter = {
  setSortType: React.Dispatch<React.SetStateAction<any>>;
  setTypeName: React.Dispatch<React.SetStateAction<any>>;
  sortType: any;
  typeName: any;
};

function GoodFilter({setSortType, setTypeName}:TGoodFilter) {
  const [search, setSearch] = useSearchParams();

  const onSearchChange = debounce((e: any) => {
    const text = e.target.value;
  
    if (text.length === 0) {
      search.delete('type');
      setSearch(search, {
        replace: true,
      });
    } else {
      search.set('type', text);
      setSearch(search, {
        replace: true,
      });
    }
  }, 350);
  return (
    <div className={styles.main_container}>
      <p>Sort by</p>
      <button  onClick={()=> {setTypeName('lifestyle')}}>lifestyle</button>
      <button onClick={()=> {setTypeName('basketball')}}>basketball</button>
      <button className={styles.display_button} type="button"></button>

      {/* <button onClick={()=> {onClickType}}>Сортировка по цене</button> */}
    </div>
  )
}

export default GoodFilter