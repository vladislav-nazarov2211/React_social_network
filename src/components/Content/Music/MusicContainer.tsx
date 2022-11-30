import { connect } from 'react-redux'
import Music from './Music'
import { RootState } from './../../../redux/redux-store'
import { tracksType } from './../../../redux/type'
import { actionsMusic } from './../../../redux/actions'
import { getMusicPageSelector } from './../../../redux/selectors'


export type mapStateToPropsType = {
    musicPage: musicPage
}

export type musicPage = {
    tracks: Array<tracksType>
    currentTrack: null | string,
    duration: number,
    currentTime: number,
    progressPercent: number,
    btnPlayOrPause: boolean
}

type mapDispatchToPropsType = {
    setRandomTrack: () => void
    setPrevTrack: (currentTrack: string | null) => void
    setNextTrack: (currentTrack: string | null) => void
    setPlayOrPause: (value: boolean) => void
    setDuration: (duration: number) => void
    setCurrentTime: (time: number) => void
    setProgressPercent: (value: number) => void
}

type MusicContainerPropsType = mapStateToPropsType & mapDispatchToPropsType
const MusicContainer: React.FC<MusicContainerPropsType> = (props) => {
    return (
        <Music musicPage={props.musicPage} setRandomTrack={props.setRandomTrack} setPrevTrack={props.setPrevTrack} setNextTrack={props.setNextTrack} setPlayOrPause={props.setPlayOrPause} setDuration={props.setDuration} setCurrentTime={props.setCurrentTime} setProgressPercent={props.setProgressPercent} />
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        musicPage: getMusicPageSelector(state)
    }
}

export default connect(mapStateToProps, {setRandomTrack: actionsMusic.setRandomTrack, setPrevTrack: actionsMusic.setPrevTrack, setNextTrack: actionsMusic.setNextTrack, setPlayOrPause: actionsMusic.setPlayOrPause, setDuration: actionsMusic.setDuration, setCurrentTime: actionsMusic.setCurrentTime, setProgressPercent: actionsMusic.setProgressPercent}) (MusicContainer)

