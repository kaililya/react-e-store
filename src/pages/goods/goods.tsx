import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import styles from './goods.module.css';
import { fetchGoods, useItems } from '../../services/thunks/ActionCreators';
import GoodFilter from '../../ui/good-filter/good-filter';
import GoodItem from '../../components/good-item/good-item';
import GoodDisplay from '../../ui/good-display/good-display';
import { Link, useSearchParams } from 'react-router-dom';
import Select from '../../components3/Select';
import SearchBar from '../../components3/SearchBar';



function GoodsPage() {
  
  // const [typeName, setTypeName] = useState(null);
  // const [sortType, setSortType] = useState(null);

  const [goodDisplayState, setGoodDisplayState] = useState('default');

  const dispath = useAppDispatch();

  const [search, setSearch] = useSearchParams();

  // useEffect(()=> {
  //   return () => {
  //     setSearch('')
  //   }
  // },[])

  useEffect(() => {
    dispath(fetchGoods())

  },[dispath, search])

  const data = useAppSelector(store => store.goodsReducer.goods);
  
 

  if (data.length === 0) {
    return null
  } else {

  };

  return (
    <section className={styles.main_container}>
      <div className={styles.filter_container}>
        <h3 className={styles.filter_title}>Filter</h3>
        <div className={styles.style_container}>
        <Select
          onChange={(e) => {
            search.set('sortBy', e.target.value)
            setSearch(search, {
              replace: true,
            });
          }}
          label="Sort by"
          name="sortBy"
          options={[
            {
              label: 'Name',
              value: 'name',
            },
            {
              label: 'Name Reverse',
              value: 'name&order=desc',
            },
            {
              label: 'Price Low',
              value: 'price',
            },
            {
              label: 'Price High',
              value: 'price&order=desc',
            },
          ]}
         />
         <Select
          onChange={(e) => {
            search.set('sex', e.target.value);
            setSearch(search, {
              replace: true,
            });
          }}
          label="Sex"
          name="sex"
          options={[
            {
              label: 'Male',
              value: 'man',
            },
            {
              label: 'Female',
              value: 'female',
            },

          ]}
          />
          <Select
          onChange={(e) => {
            search.set('type', e.target.value);
            setSearch(search, {
              replace: true,
            });
          }}
          label="Type"
          name="type"
          options={[
            {
              label: 'Lifestyle',
              value: 'lifestyle',
            },
            {
              label: 'Basketball',
              value: 'basketball',
            },
            {
              label: 'Football',
              value: 'football',
            },
            {
              label: 'Running',
              value: 'running',
            },
          ]}
        />
        </div>
      </div>
      <div className={styles.goods_container}>
        <div className={styles.goods_container_first_row}>
          <p className={styles.count_goods}>{data.length} products</p>
          <GoodDisplay setGoodDisplayState={setGoodDisplayState} goodDisplayState={goodDisplayState} />
        </div>
        <ul className={styles.goods_container_second_row}>
          {data.map((good:any,  id) => (
          <Link className={styles.link} to={`/goods/${good.name}`} key={id}>
            <GoodItem data={good} key={good.id} goodDisplayState={goodDisplayState}/>
          </Link>)
          )}
        </ul>
      </div>
    </section>
  )
}

export default GoodsPage