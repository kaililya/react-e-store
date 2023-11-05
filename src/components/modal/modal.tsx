import React  from 'react';
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { useNavigate } from 'react-router-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import {AiOutlineClose} from 'react-icons/ai' 

type TModal = {
  children: JSX.Element;
};

const Modal = ({ children }:TModal):JSX.Element => {

  const navigate = useNavigate();

  React.useEffect(()=> {
    function handleKeyPressEsc(e:KeyboardEvent) {
      if (e.key === "Escape") {
        navigate(-1);
      }
    }
    document.addEventListener("keydown",  handleKeyPressEsc);

    return () => {
      document.removeEventListener("keydown", handleKeyPressEsc);
    }
  }, []);

  return ReactDOM.createPortal(
    (
      <div>
        <ModalOverlay  />
        <section className={styles.modal}>
          <AiOutlineClose 
            className={styles.svvg}
            color={'white'}
            size={'40px'}
            onClick={() => {
              navigate(-1)}}
          />
          {children}
        </section>
      </div>
    ), document.getElementById("root-modal") as HTMLElement
  )
}

export default React.memo(Modal)