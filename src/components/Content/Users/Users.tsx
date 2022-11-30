import styles from './Users.module.css'
import UserFollow from './UserFollow'
import { follow, unfollow, getUsers, actionsUsers, } from '../../../redux/actions'
import Preloader from '../../Common/Preloader/Preloader'
import Paginator from '../../Common/Paginator/Paginator'
import SearchForm from './SearchForm'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getUsersPageSelector } from '../../../redux/selectors'
import { ThunkDispatch } from "redux-thunk"
import { AnyAction } from "redux";
import { RootState } from '../../../redux/redux-store'
import { useNavigate } from 'react-router-dom'

type State = RootState;
type AppDispatch = ThunkDispatch<State, any, AnyAction>

const Users = () => {
    
    const usersPage = useSelector(getUsersPageSelector)
    let users = usersPage.users
    const dispatch: AppDispatch = useDispatch()
        
    useEffect(() => {
        dispatch(getUsers(usersPage.currentPage, usersPage.pageSize, usersPage.search)) 
    }, [])
    
    useEffect(() => {
        dispatch(actionsUsers.setFriends(usersPage.users))     
    }, [usersPage.users]) 

    function onPageChanged(pageNumber: number, search: string) {
        dispatch(getUsers(pageNumber, usersPage.pageSize, search))  
        dispatch(actionsUsers.setCurrentPage(pageNumber))
    }

    function followUser(userId: number) {
        dispatch(follow(userId))
    }

    function unfollowUser(userId: number) {
        dispatch(unfollow(userId))
    }

    const navigate = useNavigate()
    useEffect(() => {
        navigate('?' + 'page=' + usersPage.currentPage + '&' + 'count=' + usersPage.pageSize + (usersPage.search === '' ? '' : '&' + 'term=' + usersPage.search))
        const objNavi = {
            currentPage: usersPage.currentPage,
            search: usersPage.search
        }
        localStorage.setItem("navi", JSON.stringify(objNavi))

    }, [usersPage.search, usersPage.currentPage])
     
    return (
        <div className={styles.wrapper}>
            <div>
                <SearchForm onPageChanged={onPageChanged}/>
            </div>
            {usersPage.isFetching ? 
            <div className={styles.preloaderPosition_1}>
                <Preloader />
            </div>
             : 
            <div>
                {users.map((item) => {
                    return <UserFollow key={item.id} item={item} isBtnsDisabled={usersPage.isBtnsDisabled} follow={followUser} unfollow={unfollowUser} />
                })}
            </div>}
            <div className={styles.paginator}>
                <Paginator userPage={usersPage} currentPage={usersPage.currentPage} onPageChanged={onPageChanged} totalUsersCount={usersPage.totalUsersCount} pageSize={usersPage.pageSize} portionSize={10}/>
            </div>
        </div>
    )
}

export default Users


