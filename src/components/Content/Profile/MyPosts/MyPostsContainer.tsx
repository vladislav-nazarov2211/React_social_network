import { connect } from 'react-redux'
import MyPosts from './MyPosts'
import { actionsProfile } from './../../../../redux/actions'
import { RootState } from './../../../../redux/redux-store'
import { postsType, photosType } from '../../../../redux/type'
import { getPostsSelector, getPhotosSelector } from './../../../../redux/selectors'


export type mapStateToPropsType = {
    posts: Array<postsType>
    photos: photosType | undefined
}

type mapDispatchToPropsType = {
    addPost: (value: string) => void
    deletePost: (postID: number) => void
}

type propsType = mapDispatchToPropsType & mapStateToPropsType
const MyPostsContainer: React.FC<propsType> = (props) => {
    return (
        <MyPosts posts={props.posts} photos={props.photos} addPost={props.addPost} deletePost={props.deletePost} />
    )
}

const mapStateToProps = (state: RootState): mapStateToPropsType => {
    return {
        posts: getPostsSelector(state),
        photos: getPhotosSelector(state)
    }
}

export default connect(mapStateToProps, { addPost: actionsProfile.addPost, deletePost: actionsProfile.deletePost }) (MyPostsContainer)

