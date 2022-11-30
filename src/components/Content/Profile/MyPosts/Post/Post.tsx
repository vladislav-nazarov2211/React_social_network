import styles from './Post.module.css'
import userPhoto from '../../../../../img/user.png'
import { postsType, photosType } from '../../../../../redux/type'

type PropsType = {
    photos: photosType | undefined 
    deletePost: (postID: number) => void
    item: postsType
}

const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={styles.item}>
            <div className={styles.img_wrapper}>
                <img className={styles.img} src={props.photos?.large || userPhoto}></img>
            </div>
            <div className={styles.date}>
                {props.item.date}    
            </div>
            <div className={styles.btn}>
                <button onClick={() => {props.deletePost(props.item.id)}}>Удалить пост</button>
            </div>
            <div className={styles.postText}>
                {props.item.post}
            </div>                
        </div>      
    )
}

export default Post