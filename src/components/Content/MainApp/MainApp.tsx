import HeaderContainer from '../../Header/HeaderContainer'
import Navbar from '../../Navbar/Navbar';
import ProfileContainer  from '../Profile/ProfileContainer'; 
import FriendsContainer from '../Friends/FriendsContainer';
import MusicContainer from '../Music/MusicContainer';
import  DialogsContainer  from '../Dialogs/DialogsContainer';
import { Route, Routes } from 'react-router-dom';
import styles from './MainApp.module.css'
import { connect } from 'react-redux';
import { getAuthData } from '../../../redux/actions'
import { useEffect } from 'react';
import { WithAuthRedirect } from '../../Common/Hok/WithAuthRedirect'
import { compose } from 'redux'
import { RootState } from '../../../redux/redux-store'
import { InitialStateType } from '../../../redux/auth-reducer'
import  {getAuthSelector } from './../../../redux/selectors'
import Users from './../Users/Users';


type mapStateToPropsType = { 
    auth: InitialStateType 
}

type mapDispatchToPropsType = {
    getAuthData: () => void
}

type MainAppPropsType = mapStateToPropsType & mapDispatchToPropsType
const MainApp: React.FC<MainAppPropsType> = (props) => {
    useEffect(() => {
        props.getAuthData()
    }, [])

    return (        
        <div className={styles.container}>
            <HeaderContainer />
            <div className={styles.main}>
                <Navbar />
                <div className={styles.contenWrapper}>
                <Routes>
                    <Route path='' element={<ProfileContainer />}/>
                    <Route path='/profile/*' element={<ProfileContainer />}/>
                    <Route path='/dialogs/*' element={<DialogsContainer />}/>
                    <Route path='/users/*' element={<Users />}/>
                    <Route path='/friends' element={<FriendsContainer />}/>
                    <Route path='/music' element={<MusicContainer />}/>
                </Routes>  
                </div>
            </div>  
        </div>        
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        authData: getAuthSelector(state)
    }
} 

export default compose(
    connect(mapStateToProps, {getAuthData}),
    WithAuthRedirect
) (MainApp)


// let RedirectComponent = WithAuthRedirect(MainApp)

// export default connect(mapStateToProps, {getAuthData}) (RedirectComponent)
       
       
       
       
    