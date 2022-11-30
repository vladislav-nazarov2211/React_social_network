import userPhoto from '../../../img/user.png'
import styles from './Users.module.css'
import { NavLink } from 'react-router-dom'
import Preloader from '../../Common/Preloader/Preloader'
import { usersType } from './../../../redux/type'

type PropsType = {
    follow: (userId: number) => void
    item: usersType
    isBtnsDisabled: Array<number>
}

const UserUnfollow: React.FC<PropsType> = (props) => {
    const isFetching = props.isBtnsDisabled.some(item => item === props.item.id)
    
    return(
        <div className={styles.itemUnfollow}>
            <div className={styles.item_avatar}>
                <NavLink to={'/mainApp/profile/' + props.item.id}>
                    <img className={styles.item_avatar__img} src={props.item.photos.small !== null ? props.item.photos.small : userPhoto}></img>
                </NavLink>
            </div>
                
            <div className={styles.item_infoUnfollow}>
                <div className={styles.item_info__name}>{props.item.name}</div>  
                <div className={styles}>Статус: {props.item.status}</div>  
                    {isFetching ?
                        <div className={styles.preloaderPosition_2}>
                            <Preloader />
                        </div> :
                        <div className={styles.item_info__btn}>
                            <button onClick={() => {props.follow(props.item.id)}}>Подписаться</button>
                        </div>
                    }                    
            </div>
        </div>
    )
}

export default UserUnfollow