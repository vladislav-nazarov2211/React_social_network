import { connect } from "react-redux"
import Friends from './Friends'
import { actionsUsers } from '../../../redux/actions'
import { useEffect } from "react"
import { usersType } from './../../../redux/type'
import { RootState } from './../../../redux/redux-store'
import { getFriendsSelector } from './../../../redux/selectors'


export type mapStateToPropsType = {
    friends: [] | Array<usersType>
}

type mapDispatchToPropsType = {
    setFriends: (users: Array<usersType>) => void
}

type propsType = mapDispatchToPropsType & mapStateToPropsType
const FriendsContainer: React.FC<propsType> = (props) => {

    useEffect(() => {
        props.setFriends(props.friends)
    }, [])
    
    return (
        <Friends friends={props.friends}/>
    )
}
    
let mapStateToProps = (state: RootState): mapStateToPropsType => {
    return {
        friends: getFriendsSelector(state)
    }
}

export default connect(mapStateToProps, {setFriends: actionsUsers.setFriends}) (FriendsContainer)



