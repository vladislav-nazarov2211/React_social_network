import styles from './Login.module.css'
import { Navigate } from 'react-router-dom'
import Preloader from '../../Common/Preloader/Preloader'
import React from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import { InitialStateType } from '../../../redux/auth-reducer'

//@ts-ignore
const validateLoginForm = values => {
    const errors = {};
    if (!values.email) {
        //@ts-ignore
       errors.email = 'Поле "Email" не заполнено!';
    } else if (
       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test( values.email )
    ) {
        //@ts-ignore
       errors.email = 'Некорректный адрес';
    }
    return errors;
};
 
const validationSchemaLoginForm = Yup.object().shape( {
 
    password: Yup.string()
       .min( 2, "Пароль не короче 2-ух символов" )
       .max( 12, "Пароль не длинее 12-ти символов" )
       .required( 'Поле "Password" не заполнено!' )
});

type propsType = {
    authData: InitialStateType
    isFetchingPreloader: boolean
    login: (email: string, password: string, captchaText: string) => void
    captcha: null | string
}

const Login: React.FC<propsType> = (props) => {     
    return (
        <div className={styles.loginWrapper}>
            <div className={styles.center}>
                <h1>My React App</h1>
                <Formik
                    initialValues={{
                    email: "",
                    password: "",
                    captcha: ""
                    }}
                    validate={validateLoginForm}
                    validationSchema={validationSchemaLoginForm}
                    onSubmit={(values) => {
                        props.login(values.email, values.password, values.captcha)
                    }}
                >
                    {() => (   
                        <Form>
                            <div className={styles.inputbox}>
                                <Field name={'email'} type="text" required="required" />
                                <span>Email</span>
                            </div>
                                <ErrorMessage name='email' component='div' className={styles.errorEmail} />
                            <div className={styles.inputbox}>
                                <Field name={'password'} type="password" required="required"/>
                                <span>Password</span>
                            </div>
                                <ErrorMessage name='password' component='div' className={styles.errorPassword} />
                            <div className={styles.inputbox}>
                            {props.captcha && <div className={styles.captcha}><img src={props.captcha}></img></div>}  
                            {props.captcha && <Field placeholder={"Введите код с картинки:"} name={'captcha'} type="captcha" required="required" className={styles.inputCaptcha} />}  
                            {props.isFetchingPreloader ?
                                <div className={styles.preloaderPosition_2}>
                                    <Preloader /> 
                                </div>
                            :
                                <input type="submit" value="submit"/>
                            }
                            {props.authData.isAuth ? <Navigate to='/mainApp' /> : null}
                            {props.authData.errorMessage != null ? <div className={styles.error}>{props.authData.errorMessage}</div> : null}
                            </div> 
                        </Form>
                    )}     
                </Formik>
            </div>
        </div>    
    )
}

export default Login



  