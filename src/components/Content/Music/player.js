import Abyss from './../../../audio/Abyss.mp3'
import BloomyDreams from './../../../audio/BloomyDreams.mp3'
import Feliсity from './../../../audio/Feliсity.mp3'
import MysticalWorld from './../../../audio/MysticalWorld.mp3'
import Solitude from './../../../audio/Solitude.mp3'

export function setTrack (currentTrack) {
    switch(currentTrack) {
        case 'Abyss': {
            return Abyss
        }

        case 'Bloomy Dreams': {
            return BloomyDreams
        }

        case 'Feliсity': {
            return Feliсity
        }

        case 'Mystical World': {
            return MysticalWorld
        }

        case 'Solitude': {
            return Solitude
        }
        
        default: {
            return MysticalWorld   
        } 
    }
}

export function playTrack (audio, {...props}) {
    props.setPlayOrPause(!props.musicPage.btnPlayOrPause)
    props.musicPage.btnPlayOrPause ? audio.play() : audio.pause()   
}

export function updateProgress(e, progress, {...props}) {
    props.setDuration(e.target.duration) 
    props.setCurrentTime(e.target.currentTime) 
    props.setProgressPercent((props.musicPage.currentTime / props.musicPage.duration) * 100)
    progress.style.width = `${props.musicPage.progressPercent}%`
}

export function repeat(audio, {...props}) {
    audio.currentTime = 0
    props.setProgressPercent(0)
}

export function formatTime(time) {
    const seconds = time.toFixed()
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
        .filter(a => a)
        .join(':')
}



