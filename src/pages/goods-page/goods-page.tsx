import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import styles from './goods-page.module.css';
import { fetchGoods } from '../../services/thunks/thunks';
import GoodItem from '../../components/good-item/good-item';
import GoodDisplay from '../../ui/good-display/good-display';
import { Link, useSearchParams } from 'react-router-dom';
import Select from '../../ui/select/select';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { TailSpin } from 'react-loader-spinner';



const GoodsPage = () => {

  const [ goodDisplayState, setGoodDisplayState ] = useState<'default' | 'horizontal'>('default');
  const dispath = useAppDispatch();
  const [ search, setSearch ] = useSearchParams();

  useEffect(() => {
    dispath(fetchGoods())
  },[dispath, search]);

  const data = useAppSelector(store => store.goodsReducer.goods);
  const isLoading = useAppSelector(store => store.goodsReducer.isLoading);

  const handelResetFilters = () => {
    console.log('handelResetFilters');
    search.delete('sex');
    search.delete('type');
    search.delete('sortBy');
    setSearch(search, {
      replace: true,
    });
  }

  if (data.length === 0) {
    return null
  } else {

  };

  return (
    <section className={styles.main_container_wrapper}>
      <Breadcrumbs customInlineStyle={{margin: '0 auto'}} />
      {isLoading ? (
      <TailSpin wrapperClass={styles.spinner} color='black' />
      ): (
        <div className={styles.main_container}>
        <div className={styles.filter_container}>
          <h3 className={styles.filter_title}>Filter</h3>
          <span className={styles.filter_subtitle}>Unfortunately, my backend can filter either the sex parameter or the type parameter, but not both at once</span>
          <div className={styles.style_container}>
          <Select
            onChange={(e) => {
              if (e.target.value === 'all') {
                console.log('===yes===');
                search.delete('sortBy');
                setSearch(search, {
                  replace: true,
                });
              } else {
                console.log('===no===');
                search.set('sortBy', e.target.value);
                setSearch(search, {
                  replace: true,
                });
              }
            }}
            label="Sort by"
            name="sortBy"
            options={[
              {
                label: '-',
                value: 'all',
              },
              {
                label: 'Name Rev.',
                value: 'name&order=desc',
              },
              {
                label: 'Name',
                value: 'name',
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
              if (e.target.value === 'all') {
                search.delete('type');
                setSearch(search, {
                  replace: true,
                });
              } else {
              search.set('type', e.target.value);
                setSearch(search, {
                  replace: true,
                });
              }
            }
              }
            label="Type"
            name="type"
            options={[
              {
                label: 'All',
                value: 'all',
              },
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
           <Select
            onChange={(e) => {
              if (e.target.value === 'all') {
                search.delete('sex');
                setSearch(search, {
                  replace: true,
                });
              } else {
                search.set('sex', e.target.value);
                setSearch(search, {
                  replace: true,
                });
              }

            }}
            label="Sex"
            name="sex"
            options={[
              {
                label: 'All',
                value: 'all',
              },
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
          </div>
          <button 
            onClick={handelResetFilters} 
            className={styles.button_reset}>
              Reset all
          </button>
        </div>
        <div className={styles.goods_container}>
          <div className={styles.goods_container_first_row}>
            <GoodDisplay 
              setGoodDisplayState={setGoodDisplayState}
              goodDisplayState={goodDisplayState}/>
          </div>
          <ul className={styles.goods_container_second_row}>
            {data.map((good:any,  id) => (
            <Link className={styles.link} to={`/goods/${good.name}`} key={id}>
              <GoodItem
                data={good}
                key={good.id} 
                goodDisplayState={goodDisplayState}/>
            </Link>)
            )}
          </ul>
        </div>
      </div>
      )
      }
    </section>
  )
}

export default GoodsPage