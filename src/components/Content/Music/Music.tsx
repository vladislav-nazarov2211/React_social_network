import styles from './Music.module.css'
import cd from './../../../img/unnamed.jpg'
import pause from './../../../img/pause-button_icon-icons.com_53931.svg'
import play from './../../../img/play-button_icon-icons.com_53922.svg'
import random from './../../../img/gui_random_icon_157602.svg'
import next from './../../../img/nexttrackbutton_113555.svg'
import prev from './../../../img/previous-track_icon-icons.com_72620.svg'
import back from './../../../img/back-backwards-repeat-previous_80453.svg'
import { useEffect } from 'react'
import { useRef } from 'react'
import {setTrack, playTrack, updateProgress, formatTime, repeat} from './player'
import { musicPage } from './MusicContainer'

// Все стили css описаны в index.css

type propsType = {
    musicPage: musicPage
    setRandomTrack: () => void
    setPrevTrack: (currentTrack: string | null) => void
    setNextTrack: (currentTrack: string | null) => void
    setPlayOrPause: (value: boolean) => void
    setDuration: (duration: number) => void
    setCurrentTime: (time: number) => void
    setProgressPercent: (value: number) => void
}

const Music: React.FC<propsType> = (props) => {
    useEffect(() => {
        props.setRandomTrack()
    }, [])

    let newRef = useRef<any>()  
    let audio = newRef.current
    
    let progressRef = useRef<any>()
    let progress = progressRef.current
            
    return (
        <div className={styles.wrapper}>
            
            <div className="player">
                <div className="header">    
                    <p>Сейчас играет:</p>    
                </div>
                    <img src={cd} alt="album art" className="art" />
                <div className="info">
                    <h1>{props.musicPage.currentTrack}</h1>
                    <p>Vladislav Nazarov</p>
                </div>
                    <audio onTimeUpdate={(e) => {updateProgress(e, progress, {...props})}} ref={newRef} src={setTrack(props.musicPage.currentTrack)}></audio>
                <div className="prog">
                    <div className="prog-time">
                        <p className="left">{props.musicPage.currentTime ? formatTime(props.musicPage.currentTime) : ''}</p>
                        <p className="right">{props.musicPage.duration ? formatTime(props.musicPage.duration) : ''}</p>
                    </div>
                    <div className="prog-bar">
                        <div ref={progressRef} className="prog-bar-inner"></div>
                    </div>
                </div>
                <ul className="buttonS">
                    <button onClick={() => {props.setRandomTrack()}} className="buttonPlayer button-sm">
                        <img className='music-img' src={random} />
                    </button>
                    <button onClick={() => {props.setPrevTrack(props.musicPage.currentTrack)}} className="buttonPlayer button-md">
                        <img className='music-img' src={prev} />
                    </button>
                    <button onClick={() => {playTrack(audio, {...props})}} className="buttonPlayer button-lg">
                        <img className='music-img' src={props.musicPage.btnPlayOrPause ? play : pause} />
                    </button>
                    <button onClick={() => {props.setNextTrack(props.musicPage.currentTrack)}} className="buttonPlayer button-md">
                        <img className='music-img' src={next} />
                    </button>
                    <button onClick={() => {repeat(audio, {...props})}} className="buttonPlayer button-sm">
                        <img className='music-img' src={back} />
                    </button>
                </ul>
                <div className="bar"></div>
            </div>            
        </div>
    )
}

export default Music


