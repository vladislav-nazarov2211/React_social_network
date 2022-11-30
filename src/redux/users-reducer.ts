import { usersType } from './type'
import { ActionsUsersType } from './actions'

let friendsArray = (localStorage.getItem("friends"))
let initialCurrentPage = (localStorage.getItem("navi"))
let initialSearch = (localStorage.getItem("navi"))

let initialState = {
    users: [] as Array<usersType>,
    friends: (friendsArray === null ? [] : JSON.parse(localStorage.getItem("friends") || '')) as Array<usersType>,
    isFetching: false as boolean,
    currentPage: (initialCurrentPage === null ? 1 : (JSON.parse(localStorage.getItem("navi") || '')).currentPage) as number,   
    totalUsersCount: null as number | null,
    pageSize: 5 as number,
    isBtnsDisabled: [] as Array<number>,
    search: (initialSearch === null ? '' : (JSON.parse(localStorage.getItem("navi") || '')).search) as string
}

export type InitialStateType = typeof initialState

const usersReduser = (state = initialState, action: ActionsUsersType): InitialStateType => {

    const followAndUnfollow = (value: boolean, userId: number) => {
        return state.users.map((item) => {
            if (item.id === userId) {
                return {...item, followed: value}
            }
                return item
            })
    }

    switch(action.type) {
        case 'FOLLOW': {
            return {...state, users: followAndUnfollow(true, action.userId)}
        }

        case 'UNFOLLOW': {
            return {...state, users: followAndUnfollow(false, action.userId),

                friends: state.friends.filter((item: usersType) => {
                    if (item.id != action.userId) {
                        return item
                    }
                }) 
            }
        }

        case 'SET_USERS': {
            return {...state, users: [...action.users]}
        }

        case 'TOGGLE_PRELOADER': {
            return {...state, isFetching: action.isFetching}
        }

        case 'SET_FRIENDS': {
            
            const arr = [...state.friends].concat((state.users.filter((item) => {
                return item.followed === true 
            })))
            const ids = arr.map(item => item.id)
            const filtered = arr.filter(({id}, index) => !ids.includes(id, index + 1))

            localStorage.setItem("friends", JSON.stringify(filtered))

            return {...state, friends: filtered}
        }

        // создается массив с объединением старых и новых друзей, после чего удаляются дубликаты(в unFollow проверяется массив друзей на наличие отписок)

        case 'SET_TOTAL_USERS_COUNT': {
            return {...state, totalUsersCount: action.totalUsersCount}
        }

        case 'SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }

        case 'TO_DISABLED_BTNS': {
            return (action.BooleanValue ? {...state, isBtnsDisabled: [...state.isBtnsDisabled].concat(action.userId)} : 
                {...state, isBtnsDisabled: state.isBtnsDisabled.filter((item) => {return item != action.userId})}
            )
        }

        case 'SET_SEARCH': {
            return {...state, search: action.value}
        }
        
        default: {
            return state    
        }    
    }
}

export default usersReduser



