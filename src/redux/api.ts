import axios from 'axios'
import { editProfileType } from './type'
import { usersType, profileType, photosType } from './type'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "d6727d95-e8e7-44bc-96ef-5dd9280ebe37"
    }   
})


//..................................................USER API........................................................................


type commonType<T> = {
    data: T
    fieldsErrors: Array<any>
    messages: Array<string>
    resultCode: number
}

type commonResponseType = {
    userId: number | null
}

type getUsersType = {
    items: Array<usersType>
    error: null | string
    totalCount: number
}

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number  = 10, search: string) {
        return instance.get<getUsersType>(`users?page=${currentPage}&count=${pageSize}&term=${search}`).then(response => response.data)
    },

    unfollow(id: number) {
        return instance.delete<commonType<commonResponseType>>(`follow/` + id).then(response => response.data)
    },

    follow(id: number) {
        return instance.post<commonType<commonResponseType>>(`follow/` + id).then(response => response.data)
    },
}


//..................................................PROFILE API........................................................................


type savePhotoType = {
    photos: photosType
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<profileType>(`profile/` + userId).then(response => response.data)
    },

    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId).then(response => response.data)
    },

    updateStatus(status: string) {
        return instance.put<commonType<commonResponseType>>(`profile/status`, {status: status}).then(response => response.data)
    },

    savePhoto(photo: File) {
        let formData = new FormData()
        formData.append('image', photo)
        return instance.put<commonType<savePhotoType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data)
    },

    saveCorrectProfile(values: editProfileType) {
        return instance.put<commonType<commonResponseType>>(`profile`, values).then(response => response.data)
    }
}


//..................................................AUTH API........................................................................


type authMeType = {
    id: number, 
    login: string, 
    email: string
}

type captchaType = {
    url: string
}

export const authAPI = {
    authMe() {
        return instance.get<commonType<authMeType>>(`auth/me`).then(response => response.data)
    },

    login(email: string, password: string, captcha: string) {
        return instance.post<commonType<commonResponseType>>(`/auth/login`, {email, password, captcha}).then(response => response.data)
    },

    logout() {
        return instance.delete(`/auth/login`).then(response => response.data)
    },

    getCaptcha() {
        return instance.delete<captchaType>(`security/get-captcha-url`).then(response => response.data)
    }
}