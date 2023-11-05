import { Link } from 'react-router-dom'
import styles from './categories-grid.module.css'
import { useMemo } from 'react';
import { TGood } from '../../types/types';
import { goodsPATH } from '../../utils/constants';

type TCategoriesGrid = {
  data: TGood[]
}

const CategoriesGrid = ({ data }:TCategoriesGrid):JSX.Element => {

  const photoLifeStleCategory = useMemo(() => {
    try {
      return data[1].photos[0].white[0]
    } catch (error) {
      
    }
    
  }, [data])

  const photoFemaleCategory = useMemo(() => {
    try {
      return data[0].photos[0].pink[3]
    } catch (error) {
      
    }
  }, [data])

  const photoMaleCategory = useMemo(() => {
    try {

      return data[1].photos[0].white[1]

    } catch (error) {
      
    }
  }, [data])

  if (!data) {
    return <p>no data</p>;
  } else {
  }

  return (
      <section className={styles.main_container}>
        <ul className={styles.grid_container}>
           <li className={`${styles.grid_item} ${styles.grid_item__high}`} style={{backgroundImage:`url(${photoLifeStleCategory})`}}>
              <h3 className={styles.title}>Lifestyle</h3>
              <Link to={`${goodsPATH}?type=lifestyle`} className={styles.link}>Explore</Link>
           </li>
           <li  className={`${styles.grid_item} ${styles.grid_item__right_top}`} style={{backgroundImage:`url(${photoMaleCategory})`}}>
             <h3 className={styles.title}>Male</h3>
             <Link to={`${goodsPATH}?sex=man`} className={styles.link}>Explore</Link>
           </li>
           <li className={`${styles.grid_item} ${styles.grid_item__right_bottom}`} style={{backgroundImage:`url(${photoFemaleCategory})`}}>
             <Link to={`${goodsPATH}?sex=female`} className={styles.link}>Explore</Link>
             <h3 className={styles.title}>Female</h3>
           </li>
        </ul>
      </section>
    
  )
}

export default CategoriesGrid