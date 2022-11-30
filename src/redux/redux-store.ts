import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux"
import profileReduser from "./profile-reducer"
import dialogsReduser from "./dialogs-reducers"
import musicReducer from "./music-reducers"
import usersReduser from "./users-reducer"
import thunkMiddlewar from "redux-thunk"
import authReducer from "./auth-reducer"

let rootReducer = combineReducers({
    dialogsPage: dialogsReduser,
    usersPage: usersReduser,
    profilePage: profileReduser,
    musicPage: musicReducer,
    auth: authReducer
})

export type RootState = ReturnType<typeof rootReducer>;


const store = createStore(rootReducer, (applyMiddleware(thunkMiddlewar)))

//@ts-ignore
window.store = store


export default store