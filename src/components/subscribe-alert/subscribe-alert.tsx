import styles from './subscribe-alert.module.css'
import {MdDone} from 'react-icons/md';


const SubscribeAlert = ():JSX.Element => {
  return (
    <div className={styles.main_container}>
      <MdDone color='#20C997' size='42px'/>
      <p className={styles.title}>
        You have successfully subscribed to the news of our store!
      </p>
    </div>
  )
}

export default SubscribeAlert