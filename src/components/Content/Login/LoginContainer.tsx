import { connect } from 'react-redux'
import Login from './Login'
import { login } from '../../../redux/actions'
import { RootState } from './../../../redux/redux-store'
import { InitialStateType } from '../../../redux/auth-reducer'
import { getAuthSelector, getAuthPreloaderSelector, getCaptchaSelector } from './../../../redux/selectors'


export type mapStateToPropsType = {
    authData: InitialStateType
    isFetchingPreloader: boolean
    captcha: null | string
}

type mapDispatchToPropsType = {
    login: (email: string, password: string, captchaText: string) => void
}

type LoginContainerPropsType = mapStateToPropsType & mapDispatchToPropsType

const LoginContainer: React.FC<LoginContainerPropsType> = (props) => {
    return (
        <Login authData={props.authData} login={props.login} captcha={props.captcha} isFetchingPreloader={props.isFetchingPreloader} />
    )
}

const mapStateToProps = (state: RootState): mapStateToPropsType => {
    return {
        authData: getAuthSelector(state),
        isFetchingPreloader: getAuthPreloaderSelector(state),
        captcha: getCaptchaSelector(state)   
    }
}

export default connect(mapStateToProps, { login }) (LoginContainer)
