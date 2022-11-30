import { useState } from 'react'
import styles from '../MyPosts/MyPosts.module.css'
import Post from './Post/Post'
import { postsType, photosType } from '../../../../redux/type'

type PropsType = {
    posts: Array<postsType>
    photos: photosType | undefined 
    addPost: (value: string) => void
    deletePost: (postID: number) => void
}

const MyPosts: React.FC<PropsType> = (props) => {
    const [inputValue, setInputValue] = useState<string>('')
    
    function toAddPost() {
        let correctValue = inputValue.trim()
        if (correctValue !== '' ) {
            props.addPost(correctValue)
            setInputValue('')
        }
    }

    return (
        <div className={styles.posts_wrapper}>
            <form>
                <div>
                    <textarea value={inputValue} onChange={(e) => {setInputValue(e.target.value)}} placeholder='Введите текст поста:' className={styles.posts_area} />
                </div>
                <div>
                    <button type="button" onClick={toAddPost} className={styles.posts_btn}>Добавить пост</button>
                </div>
            </form>
            <div className={styles.posts}>
                {props.posts.map((item) => {
                    return <Post key={item.id} item={item} deletePost={props.deletePost} photos={props.photos} />
                })}
            </div>
        </div>
    )
        
}


export default MyPosts