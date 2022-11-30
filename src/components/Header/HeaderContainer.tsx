import Header from "./Header"
import { connect } from "react-redux"
import { logout } from '../../redux/actions'
import { RootState } from './../../redux/redux-store'
import { InitialStateType } from '../../redux/auth-reducer'
import  {getAuthSelector } from './../../redux/selectors'


type mapStateToPropsType = {
    authData: InitialStateType
}

type mapDispatchToPropsType = {
    logout: () => void
}

type HeaderContainerPropsType = mapStateToPropsType & mapDispatchToPropsType
const HeaderContainer: React.FC<HeaderContainerPropsType> = (props) => {

    return(
        <Header logout={props.logout} authData={props.authData} />
    )
}
    
let mapStateToProps = (state: RootState): mapStateToPropsType => {
    return {
        authData: getAuthSelector(state),
    }
}

export default connect(mapStateToProps, {logout}) (HeaderContainer)

