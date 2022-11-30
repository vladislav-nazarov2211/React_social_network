import userPhoto from '../../../img/user.png'
import styles from './Users.module.css'
import UserUnfollow from './UserUnfollow'
import { NavLink } from 'react-router-dom'
import Preloader from '../../Common/Preloader/Preloader'
import { usersType } from './../../../redux/type'

type PropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    item: usersType
    isBtnsDisabled: Array<number>
}

const UserFollow: React.FC<PropsType> = (props) => {
    const isFetching = props.isBtnsDisabled.some(item => item === props.item.id)
    
    return (
        <>
            {props.item.followed ?
                <div className={styles.item}>
                    <div className={styles.item_avatar}>
                        <NavLink to={'/mainApp/profile/' + props.item.id}>
                            <img className={styles.item_avatar__img} src={props.item.photos.small !== null ? props.item.photos.small : userPhoto}></img>
                        </NavLink>
                    </div>
                
                    <div className={styles.item_info}>
                        <div className={styles.item_info__name}>{props.item.name}</div>  
                        <div className={styles}>Статус: {props.item.status}</div> 
                            {isFetching ?
                                <div className={styles.preloaderPosition_2}>
                                    <Preloader />
                                </div> :
                                <div className={styles.item_info__btn}>
                                    <button onClick={() => {props.unfollow(props.item.id)}}>Отписаться</button>
                                </div>
                            }                                                
                    </div>
                </div>  :  <UserUnfollow item={props.item} follow={props.follow} isBtnsDisabled={props.isBtnsDisabled} />}
        </>
    )
}

export default UserFollow
