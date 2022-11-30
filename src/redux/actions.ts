import {usersAPI, profileAPI, authAPI} from './api'
import { authDataType, profileType, photosType, editProfileType, usersType } from './type'
import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import { RootState } from './redux-store'

//...........................................USERS ACTIONS CREATOR..................................................


export type InterValuesType<T> = T extends { [key: string]: infer U} ? U : never
export type ActionsUsersType = ReturnType<InterValuesType<typeof actionsUsers>>

export const actionsUsers = {
    followAC: (userId: number) => {
        return {
            type: 'FOLLOW',
            userId: userId
        } as const
    },
    
    unfollowAC: (userId: number) => {
        return {
            type: 'UNFOLLOW',
            userId: userId
        } as const
    },
    
    toDisabledBtns: (BooleanValue: boolean, userId: number) => {
        return {
            type: 'TO_DISABLED_BTNS',
            BooleanValue: BooleanValue,
            userId: userId
        } as const
    },
    
    setUsers: (users: Array<usersType>) => {
        return {
            type: 'SET_USERS',
            users: users
        } as const
    },
    
    setFriends: (users: Array<usersType>) => {
        return {
            type: 'SET_FRIENDS',
            users: users
        } as const
    },
    
    setTotalUsersCount: (totalUsersCount: number) => {
        return {
            type: 'SET_TOTAL_USERS_COUNT',
            totalUsersCount: totalUsersCount
        } as const
    },
    
    setCurrentPage: (currentPage: number) => {
        return {
            type: 'SET_CURRENT_PAGE',
            currentPage: currentPage
        } as const
    },
    
    togglePreloader: (isFetching: boolean) => {
        return {
            type: 'TOGGLE_PRELOADER',
            isFetching: isFetching
        } as const
    },

    setSearch: (value: string) => {
        return {
            type: 'SET_SEARCH',
            value: value
        } as const
    }
}
 
export const follow = (userId: number) => {
    return (dispatch: Dispatch<ActionsUsersType>) => {
        dispatch(actionsUsers.toDisabledBtns(true, userId))
        usersAPI.follow(userId).then(data => {
            if (data.resultCode === 0) {
                dispatch(actionsUsers.followAC(userId))
            }
            dispatch(actionsUsers.toDisabledBtns(false, userId))
        })
    }
}

export const unfollow = (userId: number) => {
    return (dispatch: Dispatch<ActionsUsersType>) => {
        dispatch(actionsUsers.toDisabledBtns(true, userId))
        usersAPI.unfollow(userId).then(data => {
            if (data.resultCode === 0) {
                dispatch(actionsUsers.unfollowAC(userId))
            }
            dispatch(actionsUsers.toDisabledBtns(false, userId))
        })
    }
}

export const getUsers = (currentPage: number, pageSize: number, search: string) => {
    return (dispatch: Dispatch<ActionsUsersType>) => {
        dispatch(actionsUsers.togglePreloader(true))
        dispatch(actionsUsers.setSearch(search))
        usersAPI.getUsers(currentPage, pageSize, search).then(data => {
            dispatch(actionsUsers.togglePreloader(false))
            dispatch(actionsUsers.setTotalUsersCount(data.totalCount))
            dispatch(actionsUsers.setUsers(data.items))
            dispatch(actionsUsers.setFriends(data.items))
        })
    }
}


//.......................................PROFILE ACTIONS CREATOR.....................................................


export type ActionsProfileType = ReturnType<InterValuesType<typeof actionsProfile>>

export const actionsProfile = {
    addPost: (value: string) => {
        return {
            type: 'ADD_POST',
            value: value
        } as const
    },
    
    deletePost: (postID: number) => {
        return {
            type: 'DELETE_POST',
            postID: postID
        } as const
    },
    
    setProfile: (profile: profileType) => {
        return {
            type: 'SET_PROFILE',
            profile: profile
        } as const
    },
    
    setStatus: (status: string) => {
        return {
            type: 'SET_STATUS',
            status: status
        } as const
    },
    
    toggleProfilePreloader: (isFetching: boolean) => {
        return {
            type: 'TOGGLE_PROFILE_PRELOADER',
            isFetching: isFetching
        } as const
    },
    
    setPhoto: (photos: photosType) => {
        return {
            type: 'SET_PHOTO',
            photos: photos
        } as const
    }
} 

export const updateMyStatus = (status: string) => {
    return (dispatch: Dispatch<ActionsProfileType>) => {
        profileAPI.updateStatus(status).then(data => {
            if (data.resultCode === 0) {
                dispatch(actionsProfile.setStatus(status))
            }
        })
    }
}

export const getUserStatus = (userId: number) => {
    return (dispatch: Dispatch<ActionsProfileType>) => {
        profileAPI.getStatus(userId).then(data => {
            if (data == null) {
                dispatch(actionsProfile.setStatus('')) // консоль жаловалась на приход null, если отсутствовал статус
            } else {
                dispatch(actionsProfile.setStatus(data))
            }
        })
    }
}

export const getProfile = (userId: number) => {
    return (dispatch: Dispatch<ActionsProfileType>) => {
        dispatch(actionsProfile.toggleProfilePreloader(true))
        profileAPI.getProfile(userId).then(data => {
            dispatch(actionsProfile.setProfile(data))
            dispatch(actionsProfile.toggleProfilePreloader(false))
        })
    }
}

export const saveProfilePhoto = (file: File) => {
    return (dispatch: Dispatch<ActionsProfileType>) => {
        dispatch(actionsProfile.toggleProfilePreloader(true))
        profileAPI.savePhoto(file).then(data => {
            if (data.resultCode === 0) {
                dispatch(actionsProfile.setPhoto(data.data.photos))
                dispatch(actionsProfile.toggleProfilePreloader(false))
            }
        })
    }
}

export const saveProfile = (values: editProfileType, userId: number): ThunkAction<void, RootState, unknown, Action> => {
    return (dispatch) => {
        profileAPI.saveCorrectProfile(values).then(data => {
            dispatch(getProfile(userId))
        })
    }
}


//..............................................AUTH ACTIONS CREATOR................................................


export type ActionsAuthType = ReturnType<InterValuesType<typeof actionsAuth>>

export const actionsAuth = {
    setAuthData: (authData: authDataType) => {
        return {
            type: 'SET_AUTH_DATA',
            authData: authData
        } as const
    },
    
    deleteAuthData: () => {
        return {
            type: 'DELETE_AUTH_DATA',
        } as const
    },
    
    toggleAuthPreloader: (isFetching: boolean) => {
        return {
            type: 'TOGGLE_AUTH_PRELOADER',
            isFetching: isFetching
        } as const
    },
    
    incorrectAuthData: (error: string | null) => {
        return {
            type: 'INCORRECT_AUTH_DATA',
            error: error
        } as const
    },
    
    setCaptcha: (url: string | null) => {
        return {
            type: 'SET_CAPTCHA',
            url: url
        } as const
    }
    
}

export const getAuthData = () => {
    return (dispatch: Dispatch<ActionsAuthType>) => {
        authAPI.authMe().then(data => {
            if (data.resultCode === 0) {
                dispatch(actionsAuth.setAuthData(data.data))
            } else {
                dispatch(actionsAuth.deleteAuthData())
            }
        })
    }
}

export const login = (email: string, password: string, captchaText: string): ThunkAction<void, RootState, unknown, Action> => {
    return (dispatch) => {
        dispatch(actionsAuth.toggleAuthPreloader(true))
        dispatch(actionsAuth.incorrectAuthData(null))
        authAPI.login(email, password, captchaText).then(data => {
            if (data.resultCode === 0) {
                dispatch(getAuthData())
                dispatch(actionsAuth.setCaptcha(null))
            } else if (data.resultCode != 0) {
                if (data.resultCode == 10) {
                    dispatch(captcha())
                } else if (data.resultCode != 10) {
                    dispatch(actionsAuth.incorrectAuthData((data.messages).join('')))
                }    
            }
            dispatch(actionsAuth.toggleAuthPreloader(false))
        })
    }
}

export const logout = () => {
    return (dispatch: Dispatch<ActionsAuthType>) => {
        dispatch(actionsAuth.toggleAuthPreloader(true))
        authAPI.logout().then(data => {
            if (data.resultCode === 0) {
                dispatch(actionsAuth.deleteAuthData())
            } 
            dispatch(actionsAuth.toggleAuthPreloader(false))
        })
    }
}

export const captcha = () => {
    return (dispatch: Dispatch<ActionsAuthType>) => {
        authAPI.getCaptcha().then(data => {
            dispatch(actionsAuth.setCaptcha(data.url))
        })
    }
}


//..............................................DIALOGS ACTIONS CREATOR.............................................


export type ActionsDialogsType = ReturnType<InterValuesType<typeof actionsDialogs>>

export const actionsDialogs = {
    
    setCurrentDialog: (numberId: number) => {
        return {
            type: 'SET_CURRENT_DIALOG',
            numberId: numberId
        } as const
    },    
    
    sendNewMessage: (userId: number, message: string) => {
        return {
            type: 'SEND_NEW_MESSAGE',
            userId: userId,
            message: message
        } as const
    }
}    


//..............................................MUSIC ACTIONS CREATOR...............................................


export type ActionsMusicType = ReturnType<InterValuesType<typeof actionsMusic>>

export const actionsMusic = {
    setRandomTrack: () => {
        return {
            type: 'SET_RANDOM_TRACK',
        } as const
    },
    
    setPrevTrack: (currentTrack: string | null) => {
        return {
            type: 'SET_PREV_TRACK',
            currentTrack: currentTrack
        } as const
    },
    
    setNextTrack: (currentTrack: string | null) => {
        return {
            type: 'SET_NEXT_TRACK',
            currentTrack: currentTrack
        } as const
    },
    
    setPlayOrPause: (value: boolean) => {
        return {
            type: 'SET_PLAY_OR_PAUSE',
            value: value
        } as const
    },
    
    setDuration: (duration: number) => {
        return {
            type: 'SET_DURATION',
            duration: duration
        } as const
    },
    
    setCurrentTime: (time: number) => {
        return {
            type: 'SET_CURRENT_TIME',
            time: time
        } as const
    },
    
    setProgressPercent: (value: number) => {
        return {
            type: 'SET_PROGRESS_PERCENT',
            value: value
        } as const
    }
}







