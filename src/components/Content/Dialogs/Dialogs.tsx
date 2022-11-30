import styles from './Dialogs.module.css'
import DialogItem from './DialogItem'
import MessagesItem from './MessagesItem'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { dialogsType, messagesType } from './../../../redux/type'

type PropsType = {
    numberDialog: number
    dialogs: Array<dialogsType>
    messages: Array<messagesType>
    sendNewMessage: (userId: number, message: string) => void
}

const Dialogs: React.FC<PropsType> = (props) => {

    const [value, setValue] = useState<string>('')

    function sendMessage() {
        let correctValue = value.trim()
        if(correctValue !== '') {
        props.sendNewMessage(props.numberDialog, correctValue) 
        setValue('')
       }
    }

    let messages = React.createRef<HTMLDivElement>()
    
    useEffect(() => {
        let scrollDown = messages.current;
        if (!scrollDown) {
            return
        } else {
            scrollDown.scrollTop = scrollDown.scrollHeight;   // расположение скролла внизу
        }
    }, [props.numberDialog])

    let dialogsElements = props.dialogs.map(item =>  
        <DialogItem name={item.name} key={item.id} id={item.id} img={item.img} />
    ) 
    
    let currentDialog = props.messages[props.numberDialog - 1].message
        
    let messageElements = currentDialog.map(item => 
        <MessagesItem message={item.message} key={item.id} />
    ) 

    return (
        <div className={styles.wrapper}>
            <div className={styles.dialogs__items}>
                { dialogsElements }
            </div>
            <div ref={messages} className={styles.messages}>
                { messageElements }         
            </div>
            <textarea onChange={(e) => {setValue(e.target.value)}} value={value} placeholder='Введите сообщение' className={styles.dialogs_area}></textarea>
            <div className={styles.btnToSend}>
                <button onClick={() => {sendMessage()}}>Отправить</button>
            </div>
        </div>
    )
}

export default Dialogs