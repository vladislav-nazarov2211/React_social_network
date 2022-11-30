import { authDataType } from './type' 
import { ActionsAuthType } from './actions'

let initialState = {
    authData: {
        id: null,
        login: null,
        email: null
    } as authDataType, 
    isAuth: '' as string | boolean,
    isFetchingPreloader: false as boolean,
    errorMessage: null as null | string,
    captcha: null as null | string
}
export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsAuthType): InitialStateType => {
    switch(action.type) {
        case 'SET_AUTH_DATA': {
            return {...state, isAuth: true, authData: {...action.authData}}
        }
        
        case 'TOGGLE_AUTH_PRELOADER': {
            return {...state, isFetchingPreloader: action.isFetching}
        }

        case 'DELETE_AUTH_DATA': {
            return {...state, authData: {id: null, login: null, email: null}, isAuth: false}
        }

        case 'INCORRECT_AUTH_DATA': {
            return {...state, errorMessage: action.error}
        }

        case 'SET_CAPTCHA': {
            return {...state, captcha: action.url}
        }
 
        default: {
            return state    
        } 
    }
}

export default authReducer



