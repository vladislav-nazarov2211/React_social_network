
//....................................AUTH............................................

export type authDataType = {
    id: number | null
    login: string | null
    email: string | null
}


//....................................DIALOGS.........................................


export type dialogsType = {
    id: number
    name: string
    img: string
}

export type messagesType = {
    id: number
    message: Array<messageItemsType>
}

export type messageItemsType = {
    id: number
    message: string
}


//....................................PROFILE.........................................


export type postsType = {
    date: string
    id: number
    post: string
}

export type contactsType = {
    facebook: string
    github: string
    instagram: string
    mainLink: string
    twitter: string
    vk: string
    website: string
    youtube: string
}

export type photosType = {
    small: string | null
    large: string | null
}

export type profileType = {
    aboutMe: string
    contacts: contactsType
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    photos: photosType | undefined
    userId: number
}

export type editProfileType = {
    fullName: string
    lookingForAJobDescription: string
    aboutMe: string
}


//....................................USERS.........................................


export type usersType = {
    name: string
    id: number
    uniqueUrlName: string | null
    photos: photosType
    status: string | null
    followed: boolean
}


//....................................MUSIC.........................................


export type tracksType = {
    id: number
    name: string
}