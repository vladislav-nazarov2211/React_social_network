import { useState } from 'react'
import userPhoto from '../../../img/user.png'
import styles from './Friends.module.css'
import Modal from './Modal'
import { usersType } from './../../../redux/type'

type propsType = {
    item: usersType
}

const Friend: React.FC<propsType> = (props) => {

    const [activeModal, setActiveModal] = useState<boolean>(false)

    return (
        <>
            <div className={styles.item}>
                <div className={styles.item_avatar}>
                    <img className={styles.item_avatar__img} src={props.item.photos.small !== null ? props.item.photos.small : userPhoto}></img>
                </div>
            
                <div className={styles.item_info}>
                    <div className={styles.item_info__name}>{props.item.name}</div>   
                    <div className={styles.item_info__btn}>
                        <button onClick={() => {setActiveModal(true)}}>Написать сообщение</button>
                    </div>
                </div>
            </div> 
            
            {activeModal ? <Modal activeModal={activeModal} setActiveModal={setActiveModal} /> : null}
        </>    
    )
}

export default Friend


