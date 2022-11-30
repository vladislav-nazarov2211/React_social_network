import { useEffect } from 'react'
import { useState } from 'react'
import styles from './ProfileInfo.module.css'
import { authDataType } from '../../../../redux/type'

type PropsType = {
    status: string
    userId: number | null
    auth: authDataType 
    updateMyStatus: (status: string) => void
}

const Status: React.FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [inputValue, setinputValue] = useState(props.status)
        
    useEffect(() => {
        setinputValue(props.status)
    }, [props.status])

    function changeStatus() {
        setEditMode(!editMode)
        props.updateMyStatus(inputValue)
    }

    function funcForClickEnter(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key === 'Enter') {
            changeStatus()
        }
    }
    
    return (
        <>  
            {props.userId === props.auth.id ? 
                (editMode ?
                    <div onBlur={() => {changeStatus()}}>
                        <input onKeyDown={(e) => {funcForClickEnter(e)}} onChange={(e) => {setinputValue(e.target.value)}} value={inputValue} className={styles.inputStatus} autoFocus={true} placeholder={'Введите статус'}></input>
                    </div>
                :
                    <div className={styles.status}>
                        <div onClick={() => {changeStatus()}}>Статус: <span>{inputValue}</span></div>
                    </div>
                )
            :       // Здесь два фрагмента, один для чтения статусов других пользователей, второй для редактирования только своего
                (
                    <div>
                        <div>Статус: <span>{inputValue}</span></div>
                    </div>
                )   
            }
            
        </>   
    )     
}


export default Status