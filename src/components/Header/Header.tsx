import styles from './Header.module.css'
import logo from '../../img/logo.png'
import { Navigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Preloader from '../Common/Preloader/Preloader'
import { InitialStateType } from '../../redux/auth-reducer'

type PropsType = {
    authData: InitialStateType
    logout: () => void
}

const Header: React.FC<PropsType> = (props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.logo}>
                <img src={logo}></img>
            </div>
            <div className={styles.myApp}>
                <NavLink to='/mainApp/profile'>My - App</NavLink>
            </div>
            <div className={styles.login}> 
                {props.authData.isFetchingPreloader ?
                    <div className={styles.preloaderPosition_3}>
                        <Preloader /> 
                    </div>
                :
                    <input type="button" onClick={() => {props.logout()}} value="Logout" />
                }               
                {props.authData.isAuth === false ? <Navigate to='/' /> : null}                    
            </div>    
        </div>
    )
}

export default Header

