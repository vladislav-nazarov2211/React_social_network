import styles from './Friends.module.css'
import Friend from './Friend'
import { usersType } from './../../../redux/type'

type propsType = {
    friends: [] | Array<usersType>
}

const Friends: React.FC<propsType> = (props) => {
    let friends = props.friends
    return (
        <>  
            <div className={styles.wrapper}>
                <div className={styles.friends}>
                    {friends.length != 0 ? 
                        <div>{friends.map((item) => {
                            return <Friend key={item.id} item={item}/>
                        })}</div>
                        :
                        <div className={styles.alert}>Список Ваших друзей пуст!</div>
                    }
                </div>    
            </div>
        </>
    )
}

export default Friends