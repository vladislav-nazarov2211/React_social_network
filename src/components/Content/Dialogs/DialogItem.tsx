import styles from './Dialogs.module.css'
import { NavLink } from 'react-router-dom'

type PropsType = {
    id: number
    img: string
    name: string    
}

const DialogItem: React.FC<PropsType> = (props) => {
    let path = 'dialogs/' + props.id

    return (
        <div className={styles.dialog}>
            <div className={styles.avatar_wrapper}>
                <img className={styles.avatar_wrapper__img} src={props.img}></img>
            </div>
            <NavLink className={styles.dialog__item} to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem