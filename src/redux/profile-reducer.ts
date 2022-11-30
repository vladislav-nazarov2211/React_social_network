import { profileType, postsType } from './type' 
import { ActionsProfileType } from './actions'

let postArray = (localStorage.getItem("posts"))

let initialState = {
    posts: (postArray === null ? [] : JSON.parse(localStorage.getItem("posts") || '')) as Array<postsType>,  // Здесь TS ожидал либо тип null, либо string
    profile: null as profileType | null,
    isFetchingPreloader: false as boolean,
    status: '' as string
}
type InitialStateType = typeof initialState

const profileReduser = (state = initialState, action: ActionsProfileType): InitialStateType => {
    switch(action.type) {
        case 'ADD_POST': {
            let newPost = {
                id: state.posts.length >= 1 ? state.posts[state.posts.length - 1].id + 1 : 1,
                post: action.value,
                date: new Date().toLocaleString()
            }
            
            localStorage.setItem("posts", JSON.stringify([...state.posts, newPost]))

            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        } 

        case 'DELETE_POST': {
            let newArr = state.posts.filter((item: postsType) => {
                return item.id != action.postID
            })

            localStorage.setItem("posts", JSON.stringify(newArr))
            
            return {...state, posts: newArr}   
        }

        case 'SET_PROFILE': {
            return {...state, profile: action.profile}
        }

        case 'SET_STATUS': {
            return {...state, status: action.status}
        }

        case 'TOGGLE_PROFILE_PRELOADER': {
            return {...state, isFetchingPreloader: action.isFetching}
        }

        case 'SET_PHOTO': {
            
            return {...state, profile: {...state.profile, photos: action.photos} as profileType}
        }
        
        default: {
            return state    
        }    
    }
}

export default profileReduser


 



