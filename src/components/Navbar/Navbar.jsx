import styles from './Navbar.module.css'
import { NavLink } from 'react-router-dom'

function Navbar () {
    return (
        <div className={styles.wrapper}>
            <div className={styles.item}>
                <NavLink to='/mainApp/profile' className={({ isActive }) => (isActive ? styles.active : styles.item)}>Мой профиль</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to='/mainApp/users' className={({ isActive }) => (isActive ? styles.active : styles.item)}>Пользователи</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to='/mainApp/friends' className={({ isActive }) => (isActive ? styles.active : styles.item)}>Мои Друзья</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to='/mainApp/dialogs' className={({ isActive }) => (isActive ? styles.active : styles.item)}>Сообщения</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to='/mainApp/music' className={({ isActive }) => (isActive ? styles.active : styles.item)}>Музыка</NavLink>
            </div>
        </div>
    )
}

export default Navbar

