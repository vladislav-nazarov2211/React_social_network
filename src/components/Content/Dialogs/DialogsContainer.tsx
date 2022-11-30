import { connect } from "react-redux"
import { compose } from 'redux'
import Dialogs from './Dialogs'
import WithRouter from '../../Common/Hok/WithRouter'
import { RootState } from './../../../redux/redux-store'
import { actionsDialogs } from '../../../redux/actions'
import { useEffect, useState } from "react"
import { dialogsType, messagesType } from './../../../redux/type' 
import { getDialogsSelector, getMessagesSelector, getCurrentDialogSelector } from './../../../redux/selectors'


export type mapStateToPropsType = {
    dialogs: Array<dialogsType>
    messages: Array<messagesType>
    currentDialog: number
}

type mapDispatchToPropsType = {
    setCurrentDialog: (userId: number) => void
    sendNewMessage: (userId: number, message: string) => void
}

type withRouter = {
    router: any
}

type propsType = mapDispatchToPropsType & mapStateToPropsType & withRouter
const DialogsContainer: React.FC<propsType> = (props) => {
    let id = props.router.params
    let userId = parseInt(Object.values(id).toString().split('/')[1]) 
    if(!userId) {
        userId = 1
    }
        
    useEffect(() => {
        props.setCurrentDialog(userId)
    }, [userId])
    
    return (
        <Dialogs numberDialog={props.currentDialog} dialogs={props.dialogs} messages={props.messages} sendNewMessage={props.sendNewMessage} />
    )
}

let mapStateToProps = (state: RootState): mapStateToPropsType => {
    return {
        dialogs: getDialogsSelector(state),
        messages: getMessagesSelector(state),
        currentDialog: getCurrentDialogSelector(state),
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {setCurrentDialog: actionsDialogs.setCurrentDialog, sendNewMessage: actionsDialogs.sendNewMessage}),
    WithRouter
) (DialogsContainer)


