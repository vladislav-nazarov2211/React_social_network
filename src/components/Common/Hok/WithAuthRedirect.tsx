import React from 'react'
import { Navigate } from 'react-router-dom'
import { InitialStateType } from '../../../redux/auth-reducer'

export function WithAuthRedirect<WrapperProps extends {authData: InitialStateType}>(Component: React.ComponentType<WrapperProps>) {
    function RedirectComponent(props: WrapperProps) {
        if (props.authData.isAuth === false) {
            return <Navigate to='/' /> 
        }
        return <Component {...props} a= {12} />
    }
    return RedirectComponent
}