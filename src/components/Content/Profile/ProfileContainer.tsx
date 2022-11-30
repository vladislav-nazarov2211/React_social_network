import Profile from './Profile'
import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import { getProfile, getUserStatus, updateMyStatus, saveProfilePhoto, saveProfile } from '../../../redux/actions'
import WithRouter from '../../Common/Hok/WithRouter'
import { compose } from 'redux'
import { RootState } from './../../../redux/redux-store'
import { profileType, authDataType, editProfileType } from '../../../redux/type'
import { getProfileSelector, getStatusSelector, getAuthDataSelector, getProfilePreloaderSelector } from './../../../redux/selectors'


export type mapStateToPropsType = {
    profile: null | profileType 
    auth: authDataType 
    status: string
    isFetching: boolean
}

type mapDispatchToPropsType = {
    getProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateMyStatus: (status: string) => void
    saveProfilePhoto: (photo: any) => void
    saveProfile: (values: editProfileType, userId: number | null) => void
}

type withRouter = {
    router: any
}

type propsType = mapDispatchToPropsType & mapStateToPropsType & withRouter

const ProfileContainer: React.FC<propsType> = (props) => {
    let id = props.router.params
    let userId: number | null = parseInt(Object.values(id).join(''))
    
    if (!userId) {
        userId = props.auth.id
    }
    
    useEffect(() => {  
        if (userId) {
            props.getProfile(userId)  
            props.getUserStatus(userId) 
        } 
    }, [props.auth.id, userId])  // (в пропсах пользователя не приходили новые данные, поэтому подвязал их на изменение id)
    
    return (
        <Profile profile={props.profile} saveProfile={props.saveProfile} saveProfilePhoto={props.saveProfilePhoto} status={props.status} updateMyStatus={props.updateMyStatus} userId={userId} auth={props.auth} isFetching={props.isFetching} />
    )
        
}

let mapStateToProps = (state: RootState): mapStateToPropsType => {
    return {
        profile: getProfileSelector(state),
        status: getStatusSelector(state),
        auth: getAuthDataSelector(state),
        isFetching: getProfilePreloaderSelector(state)
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getProfile, getUserStatus, updateMyStatus, saveProfilePhoto, saveProfile}),
    WithRouter,
) (ProfileContainer)


// const WithRouterComponent = WithRouter(ProfileContainer)

// export default connect(mapStateToProps, {getProfile}) (WithRouterComponent)

