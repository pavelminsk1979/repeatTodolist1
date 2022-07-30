import {StateTodolistType} from "../App";
import {v1} from "uuid";
import {FilterType} from "../Todolist";

export function todolistReduser(state: Array<StateTodolistType>, action: ActionType): Array<StateTodolistType> {

    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.idTod)
        }
        case "ADDED-TODOLIST": {
            return [{
                id: action.idNewTodolist, title: action.title, filter: 'all'
            }, ...state]
        }
        case "CHANGE-TITLE-TODOLIST": {
            return state.map(el => el.id === action.idTod
                ? {...el, title: action.title} : el)
        }
        case "CHANGE-FILTER-TODOLIST":{
            return state.map(el=>el.id===action.idTod
                ?{...el,filter:action.filter}:el)
        }
        default:
            return state
    }
}

type ActionType = removeTodolistACType
    | addedTodolistACType
    | changeTitleTodolistACType
    | changeFilterTodolistACType

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (idTodolist: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        idTod: idTodolist
    } as const
}

export type addedTodolistACType = ReturnType<typeof addedTodolistAC>
export const addedTodolistAC = (title: string) => {
    return {
        type: 'ADDED-TODOLIST',
        title,
        idNewTodolist: v1()
    } as const
}

type changeTitleTodolistACType = ReturnType<typeof changeTitleTodolistAC>
export const changeTitleTodolistAC = (idTod: string, title: string) => {
    return {
        type: 'CHANGE-TITLE-TODOLIST',
        idTod,
        title
    } as const
}

type changeFilterTodolistACType = ReturnType<typeof changeFilterTodolistAC>
export const changeFilterTodolistAC = (idTod: string, filter: FilterType) => {
    return {
        type: 'CHANGE-FILTER-TODOLIST',
        idTod,
        filter
    } as const
}