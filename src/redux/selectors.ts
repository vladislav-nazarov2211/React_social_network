import { RootState } from './redux-store'

// ......................................PROFILE SELECTORS...........................................................................

export const getProfileSelector = (state: RootState) => {
    return state.profilePage.profile
}

export const getStatusSelector = (state: RootState) => {
    return state.profilePage.status
}

export const getAuthDataSelector = (state: RootState) => {
    return state.auth.authData
}

export const getProfilePreloaderSelector = (state: RootState) => {
    return state.profilePage.isFetchingPreloader
}

export const getPostsSelector = (state: RootState) => {
    return state.profilePage.posts
}

export const getPhotosSelector = (state: RootState) => {
    return state.profilePage.profile?.photos
}

// ......................................USERS SELECTORS...........................................................................

export const getUsersPageSelector = (state: RootState) => {
    return state.usersPage
}

export const getSearchSelector = (state: RootState) => {
    return state.usersPage.search
}


// ......................................FRIENDS SELECTORS...........................................................................

export const getFriendsSelector = (state: RootState) => {
    return state.usersPage.friends
}

// ......................................DIALOGS SELECTORS...........................................................................

export const getDialogsSelector = (state: RootState) => {
    return state.dialogsPage.dialogs
}

export const getMessagesSelector = (state: RootState) => {
    return state.dialogsPage.messages
}

export const getCurrentDialogSelector = (state: RootState) => {
    return state.dialogsPage.currentDialog
}

// ......................................MUSIC SELECTORS...........................................................................

export const getMusicPageSelector = (state: RootState) => {
    return state.musicPage 
}

// ......................................AUTH SELECTORS...........................................................................

export const getAuthSelector = (state: RootState) => {
    return state.auth 
}

export const getAuthPreloaderSelector = (state: RootState) => {
    return state.auth.isFetchingPreloader 
}

export const getCaptchaSelector = (state: RootState) => {
    return state.auth.captcha 
}



