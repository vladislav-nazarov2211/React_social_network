import styles from './Profile.module.css'
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import { profileType, editProfileType } from '../../../redux/type'

const validationSchemaLoginForm = Yup.object().shape({
 
    fullName: Yup.string()
       .max( 20, "Не более 20-ти символов!" ),

    aboutMe: Yup.string()
       .max( 50, "Не более 50-ти символов!" ),

    lookingForAJobDescription: Yup.string()
       .max( 50, "Не более 50-ти символов!" )
});

type PropsType = {
    profile: null | profileType 
    userId: number | null
    saveProfile: (values: editProfileType, userId: number | null) => void
    editMode: boolean
    setEditMode: (editMode: boolean) => void
}

const EditProfile: React.FC<PropsType> = (props) => {
    if (!props.profile) {
        return null
    }  

    return (
        <div className={styles.wrapper}>
            <Formik
                initialValues={{
                    fullName: props.profile.fullName,   
                    lookingForAJobDescription: props.profile.lookingForAJobDescription,
                    aboutMe: props.profile.aboutMe
                }}
                validationSchema={validationSchemaLoginForm}
                onSubmit={(values) => {
                    props.saveProfile(values, props.userId)
                    props.setEditMode(!props.editMode)
                }}
            >
                {() => (   
                    <Form className={styles.description_block}>
                        <div>Имя: <Field name={'fullName'} type="text"></Field></div>
                        <ErrorMessage name='fullName' component='div' className={styles.errorEmail} />
                        <div>Ищу с описанием работы: <Field name={'lookingForAJobDescription'} type="text"></Field></div>
                        <ErrorMessage name='lookingForAJobDescription' component='div' className={styles.errorEmail} />
                        <div>Обо мне: <Field name={'aboutMe'} type="text"></Field></div>
                        <ErrorMessage name='aboutMe' component='div' className={styles.errorEmail} />
                        <button type='submit' className={styles.btn}>Сохранить изменения</button>
                    </Form>
                )}     
            </Formik>
        </div>            
    )
}

export default EditProfile



