import { dialogsType, messagesType, messageItemsType } from './type' 
import { ActionsDialogsType } from './actions'
import arina from './../img/arina.jpg'
import michail from './../img/michail.jpg'
import petr from './../img/petr.jpg'
import kate from './../img/kate.jpg'
import sasha from './../img/sasha.jpg'
import anton from './../img/anton.jpg'

let initialState = {
    dialogs: [
        { id: 1, name: 'Arina', img: arina },
        { id: 2, name: 'Michail', img: michail },
        { id: 3, name: 'Petr', img: petr },
        { id: 4, name: 'Kate', img: kate },
        { id: 5, name: 'Sasha', img: sasha },
        { id: 6, name: 'Anton', img: anton }
    ] as Array<dialogsType>,

    messages: [
        { id: 1, message: [{ id: 1, message: 'Привет, как твои дела?' },
                           { id: 2, message: 'Good!' },
                           { id: 3, message: 'Yo!' },
                           { id: 4, message: 'Погнали завтра гулять?' },
                           { id: 5, message: 'Погнали;)!' },
                           { id: 6, message: 'Че делаешь?' },
                           { id: 7, message: 'Слушаю музыку' },
                           { id: 8, message: 'Какую любишь музыку слушать?' },
                           { id: 9, message: 'Мне нравится ENIGMA' },
                           { id: 10, message: 'Мне тоже нравится' },
                           { id: 11, message: 'Альбом MCMXC AD самый лучший' },
                           { id: 12, message: 'скинь название треков' },  
                           { id: 13, message: 'The Voice of Enigma' },
                           { id: 14, message: 'Principles of Lust' },
                           { id: 15, message: 'Sadeness' },
                           { id: 16, message: 'Find Love' },
                           { id: 17, message: 'Sadeness (reprise)' },
                           { id: 18, message: 'Callas Went Away' },
                           { id: 19, message: 'Mea Culpa' },   
                           { id: 20, message: 'The Voice & The Snake' },
                           { id: 21, message: 'Knocking on Forbidden Doors' },
                           { id: 22, message: 'Back to the Rivers of Belief' },
                           { id: 23, message: 'Way to Eternity' }                 
                        ] as Array<messageItemsType>
        },
        { id: 2, message: [{ id: 1, message: 'Че делаешь?' },
                           { id: 2, message: 'Уроки!' },
                           { id: 3, message: 'Понятно!' }] as Array<messageItemsType>
        },
        { id: 3, message: [{ id: 1, message: 'Привет?' },
                           { id: 2, message: 'Привет и тебе!' },
                           { id: 3, message: 'Пока!' }] as Array<messageItemsType>
        },
        { id: 4, message: [{ id: 1, message: 'Пойдешь завтра в Универ?' },
                           { id: 2, message: 'Неа!' },
                           { id: 3, message: 'Почему?' },
                           { id: 4, message: 'Заболел' },
                           { id: 5, message: 'Выздоравливай;)!' }] as Array<messageItemsType>
        },
        { id: 5, message: [{ id: 1, message: 'С днем рождения тебя!' },
                           { id: 2, message: 'Спасибо!' }] as Array<messageItemsType>
        },
        { id: 6, message: [{ id: 1, message: 'Во сколько встречаемся?!' },
                           { id: 2, message: 'В 14:00!' },
                           { id: 3, message: 'ок' }] as Array<messageItemsType>
        },
    ] as Array<messagesType>,

    currentDialog: 1 as number
}

type InitialStateType = typeof initialState

const dialogsReduser = (state = initialState, action: ActionsDialogsType): InitialStateType => {  

    switch(action.type) {
        case 'SET_CURRENT_DIALOG': {
            return {...state, currentDialog: action.numberId}
        }

        case 'SEND_NEW_MESSAGE': {
            const newId = state.messages[action.userId - 1].message.length + 1
            return {...state, messages: state.messages.map((item) => {
                if (item.id === action.userId) {
                    return {...item, message: item.message.concat({id: newId, message: action.message})} 
                } else  {
                    return item
                }      
            })}
        }
            
        default: {
            return state    
        } 
    }
} 

export default dialogsReduser

  