import styles from './ProfileInfo.module.css'
import userPhoto from '../../../../img/user.png'
import Status from './Status'
import Preloader from '../../../Common/Preloader/Preloader'
import { profileType, authDataType } from '../../../../redux/type'
import React from 'react'

type propsType = {
    profile: profileType 
    isFetching: boolean
    userId: number | null
    status: string
    auth: authDataType 
    saveProfilePhoto: (photo: any) => void
    updateMyStatus: (status: string) => void
    editMode: boolean
    setEditMode: (editMode: boolean) => void
}

const ProfileInfo: React.FC<propsType> = (props) => {
    const isOwner = (props.auth.id == props.userId)  
    
    function setPhotoUser (e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return
        } else {
            const photo = e.target.files[0]
            props.saveProfilePhoto(photo)
        }
    }
          
    return (
        <div className={styles.description_block}>
            <div className={styles.avatar}>
                {props.isFetching ? 
                    <div className={styles.preloaderPosition_1}>
                        <Preloader />
                    </div>     
                :
                <img src={props.profile.photos?.large || userPhoto}></img>
                }    
            </div>

            {isOwner && 
            <div className={styles.loadPhoto}>
                <label htmlFor='file'>Изменить аватарку</label>
                <input onChange={(e) => {setPhotoUser(e)}} id='file' type='file' />
            </div>                
            }
            <div className={styles.description_block__info}>
                {isOwner && <button onClick={() => {props.setEditMode(!props.editMode)}} className={styles.btn}>Редактировать описание</button>}
                <div>Имя: <span>{props.profile.fullName}</span></div>
                <div>Ищу с описанием работы: <span>{props.profile.lookingForAJobDescription}</span></div>
                <div>Обо мне: <span>{props.profile.aboutMe}</span></div>
                <Status userId={props.userId} status={props.status} updateMyStatus={props.updateMyStatus} auth={props.auth} />
            </div>
        </div>
    )
}


export default ProfileInfo


