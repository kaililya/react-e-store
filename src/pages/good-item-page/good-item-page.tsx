import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './good-item-page.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { fetchCurrentGood, fetchGoods } from '../../services/thunks/ActionCreators';
import cardSlice, { addGoodToCart } from '../../services/slices/card-slice';
import { values } from 'lodash';
import { useParams } from 'react-router';
import goodsSlice, { setClearUniqueGood } from '../../services/slices/goodsSlice';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';

// TODO
// 1) Если есть хотя бы 1 товар, то нужно менять надпись кнопки на UPDATE

function GoodItemPage() {
  const dispatch = useAppDispatch();
  const {name}  = useParams();
  console.log(name);
  const [sizeState, setSizeState] = useState(undefined);
  const [colorState, setColorState] = useState<any>(undefined);
  const [amountGoodsState, setAmountGoodsState] = useState(1);
  const [sizeButtonActiveSatet, setsizeButtonActiveSatet] = useState<any>('');
  const [colorButtonActiveSatet, setColorButtonActiveSatet] = useState<any>('');


  useEffect(() => {
    
    dispatch(fetchCurrentGood(name));

    return () => {
      dispatch(setClearUniqueGood());
    }
  }, [name, dispatch]);
  
  const data = useAppSelector(store => store.goodsReducer.currentGood) || [];
  console.log(data);

  useEffect(() => {
    try {
      const defaultColor = Object.keys(data[0].photos[0])[0];
      setColorState(defaultColor);

      const sizesArray = data[0].sizes || [];
      let arrKeys = ['id'];
      let massiv = [];
      for (let i = 0; i < sizesArray.length; i++) {
          let customObject = {
              [arrKeys[0]]: sizesArray[i]
          }
          massiv.push(customObject);
      }
      setsizeButtonActiveSatet({activeObject: null, objects:massiv})

      const colorsArray = data[0].colors || [];
      let arrKeysColor = ['id'];
      let massivColor = [];
      for (let i = 0; i < colorsArray.length; i++) {
          let customObject = {
              [arrKeysColor[0]]: colorsArray[i]
          }
          massivColor.push(customObject);
      }
      setColorButtonActiveSatet({activeObject: null, objects: massiv})

    } catch (error) {
      <p>я хз что тут вернуть</p>
    }
  }, [data])

  if (data.length === 0 || data === undefined  || !data ) {
    return <p>данных нет</p>
  } else {
  }



  const colorsArray = data[0].colors || [];
  const sizesArray = data[0].sizes || [];
  const photosArray = data[0].photos[0] || [];

  const handleClickColor = (e:any) => {
    const newColor = e.target.value;
    setColorState(newColor);
  }

  const handleClickSize = (e:any) => {
    const newSize = e.target.value;
    setSizeState(newSize);
  }

  const handleIncreseAmount = () => {
    setAmountGoodsState(prev => prev + 1)
  }

  const handleDecreseAmount = () => {
  if (amountGoodsState <= 1) {
    return 'nothing'
  } else {
    setAmountGoodsState(prev => prev - 1)
  }};

  const handleAddGoodToCart = () => {
    if(sizeState) {
      const good = {
        id: data[0].id,
        id_: Math.floor(Math.random() * 10000000).toString(),
        count: amountGoodsState,
        name: data[0].name,
        color: colorState,
        size: sizeState,
        price: data[0].price,
        photo: photosArray[colorState],
      }
      dispatch(addGoodToCart(good))
    }
    else {
      alert('Please, choose your size')
    }
  }

  function toggleActive(index:any) {
    setsizeButtonActiveSatet({...sizeButtonActiveSatet, activeObject:sizeButtonActiveSatet.objects[index]})
  }

  function toggleActiveStyles(index:any) {
    try {
      if (sizeButtonActiveSatet.objects[index] === sizeButtonActiveSatet.activeObject) {
        return `${styles.size_button} ${styles.size_button__active}`
      } else {
        return `${styles.size_button}`
      }
    } catch (error) {
      
    }
  }

  function toggleActiveColor(index:any) {
    setColorButtonActiveSatet({...colorButtonActiveSatet, activeObject:colorButtonActiveSatet.objects[index]})
  }

  function toggleActiveStylesColor(index:any) {

    try {
      if (colorButtonActiveSatet.objects[index] === colorButtonActiveSatet.activeObject) {
        return `${styles.color_button__active}`
      } else {
        return ``
      }
    } catch (error) {
      
    }
  }


  return (
    <>
    <Breadcrumbs customInlineStyle={{padding:16}}/>
    <section className={styles.main_container}>
      <div className={styles.main_container_wraper}>
      <h2 className={styles.good_title_media}>{data[0].name}</h2>
        <ul className={styles.second_column}>
          {photosArray[colorState]?.map((image:string) => (
          <li key={image} className={styles.image_wrapper}>
            <img className={styles.good_image} src={image} alt="" />
          </li>
        ))}
        </ul>
        <div className={styles.first_column}>
          <div className={styles.first_column_wrapper}>
            <h2 className={styles.good_title}>{data[0].name}</h2>
            <p className={styles.good_description}>{data[0].description}</p>
            <h3 className={styles.good_price}>{data[0].price}$</h3>
            <form action="">
              <div className={styles.colors_conatiner}>
                <label className={styles.colors_conatiner_label} >Colors</label>
                <div className={styles.colors_button_container} >
                {colorsArray.map((color:any,id:any) => (
                  <button onClick={(e) => {handleClickColor(e);toggleActiveColor(id)}} value={color} key={color}
                  className={color === 'white' ? styles.color_button :
                             color === 'green' ? `${styles.color_button} ${styles.color_button__green}`: 
                             color === 'black' ? `${styles.color_button} ${styles.color_button__black}`:
                             color === 'pink'  ? `${styles.color_button} ${styles.color_button__pink}`:
                             color === 'blue'  ? `${styles.color_button} ${styles.color_button__blue}`: 'no_class'
                            }
                  type="button">
                  <div 
                  className={toggleActiveStylesColor(id)}

                  ></div></button>
                ))}
                </div>
              </div>
              <label className={styles.size_conatiner_label}>Size</label>

              <ul className={styles.sizes_container}>
                {sizesArray.map((size:any,id:any) => (
                <li key={size} className={styles.sizes_container_item}>
                  <button 
                    onClick={(e)=> {
                      toggleActive(id);
                      handleClickSize(e);
                            }}                      
                     value={size}
                     className={toggleActiveStyles(id)}
                     type="button"
                  >
                  {size}
                  </button>
                </li>
                ))}
              </ul>
              <div className={styles.amoumt_container}>
               <button onClick={handleDecreseAmount} name='button decrease' className={styles.amount_button} type="button">-</button>
               <p className={styles.amount_goods}>{amountGoodsState}</p>
               <button onClick={handleIncreseAmount} name='button increase' className={styles.amount_button} type="button">+</button>
              </div>
              <button className={styles.add_button} type='button' onClick={handleAddGoodToCart}>Add to the Cart</button>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default GoodItemPage