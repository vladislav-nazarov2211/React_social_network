import { tracksType } from './type'
import { ActionsMusicType } from './actions'

let initialState = {
    tracks: [
        {id: 1, name: 'Abyss'},
        {id: 2, name: 'Bloomy Dreams'},
        {id: 3, name: 'Feliсity'},
        {id: 4, name: 'Mystical World'},
        {id: 4, name: 'Solitude'}
    ] as Array<tracksType>,
    currentTrack: null as null | string,
    duration: 0 as number,
    currentTime: 0 as number,
    progressPercent: 0 as number,
    btnPlayOrPause: true as boolean
} 

type initialStateType = typeof initialState

const musicReducer = (state = initialState, action: ActionsMusicType): initialStateType => {

    function changeTrack(endIndex: number, number: number, track: string | null) { // endIndex  -  граничные значения первого и последнего трека, number - это значение + и - 1 для следующего или предыдущего трека
        let index = state.tracks.findIndex(item => item.name === track)
            if (index === endIndex) {
                return {...state, currentTrack: state.tracks[endIndex].name, btnPlayOrPause: true, progressPercent: 0}              // Здесь мы определяем предыдущий и следующий трек
            } else {
                return {...state, currentTrack: state.tracks[index + number].name, btnPlayOrPause: true, progressPercent: 0}           // btnPlayOrPause переключаем на тру, чтобы при смене вперед/назад по клику сразу воспроизводился трек
            }
    }

    switch(action.type) {
        case 'SET_RANDOM_TRACK': {
            let arr = Object.keys(state.tracks)
            let n = Math.floor(Math.random() * state.tracks.length);
            let currentAudio = state.tracks[n].name 
            if (currentAudio === state.currentTrack) {
                let newRandomArr = arr.filter(item => parseInt(item) != n)  // Массив arr содержит id но в string формате
                currentAudio = state.tracks[parseInt(newRandomArr[0])].name
                return {...state, currentTrack: currentAudio, btnPlayOrPause: true, progressPercent: 0}             // Здесь мы избегаем повторяющегося следующего трека при рандоме
            } else {
                return {...state, currentTrack: currentAudio, btnPlayOrPause: true, progressPercent: 0}
            }    
        }

        case 'SET_PREV_TRACK': {
            return changeTrack(0, - 1, action.currentTrack)  
        }

        case 'SET_NEXT_TRACK': {
            return changeTrack((state.tracks.length - 1), 1, action.currentTrack)     
        }

        case 'SET_PLAY_OR_PAUSE': {
            return {...state, btnPlayOrPause: action.value}
        }

        case 'SET_DURATION': {
            return {...state, duration: action.duration}
        }

        case 'SET_CURRENT_TIME': {
            return {...state, currentTime: action.time}
        }

        case 'SET_PROGRESS_PERCENT': {
            return {...state, progressPercent: action.value}
        }
 
        default: {
            return state    
        } 
    }
}

export default musicReducer


