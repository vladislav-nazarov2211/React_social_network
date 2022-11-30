import styles from './Profile.module.css'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import Preloader from './../../Common/Preloader/Preloader'
import { useState } from 'react'
import EditProfile from './EditProfile'
import { profileType, authDataType, editProfileType } from '../../../redux/type'

type PropsProfileType = {
    profile: null | profileType 
    isFetching: boolean
    userId: number | null
    status: string
    auth: authDataType 
    saveProfilePhoto: (photo: any) => void
    saveProfile: (values: editProfileType, userId: number | null) => void
    updateMyStatus: (status: string) => void
}

const Profile: React.FC<PropsProfileType> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false)

    return (
        <>    
            {editMode ?
                <EditProfile profile={props.profile} saveProfile={props.saveProfile} userId={props.userId} editMode={editMode} setEditMode={setEditMode}/>
            :    
                <div className={styles.wrapper}>
                    {!props.profile || props.isFetching ? 
                    <div className={styles.preloaderPosition_1}>
                        <Preloader />
                    </div> 
                        :   
                    <div>
                        <ProfileInfo editMode={editMode} setEditMode={setEditMode} isFetching={props.isFetching} userId={props.userId} saveProfilePhoto={props.saveProfilePhoto} profile={props.profile} status={props.status} updateMyStatus={props.updateMyStatus} auth={props.auth} />
                        {props.auth.id == props.userId ? <MyPostsContainer /> : null}
                    </div>}
                </div>
            }
        </>    
    )
}

export default Profile