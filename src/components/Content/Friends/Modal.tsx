import styles from './Friends.module.css'

type propsType = {
    activeModal: boolean
    setActiveModal: (activeModal: boolean) => void
}

const Modal: React.FC<propsType> = (props) => {

    function closeModal(e: any) {
        if (e.target.id != ('modalWindow')) {
            return null
        } else {
            props.setActiveModal(false)
        }
    }

    return (
        <div id='modalWindow' className={styles.modal} onClick={(e) => {closeModal(e)}}>
            <div className={styles.modal__content}>
                <div>
                    <textarea placeholder='Введите сообщение:'></textarea>
                </div>
                <button onClick={() => {props.setActiveModal(false)}}>Отправить</button>
            </div>
        </div>
    )
}

export default Modal