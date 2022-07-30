import {StateTaskType} from "../App";
import {v1} from "uuid";
import {addedTodolistACType, removeTodolistACType} from "./TodolistReduser";

export function taskReduser(state: StateTaskType, action: ActionTaskType): StateTaskType {
    switch (action.type) {
        case'REMOVE-TASK': {
            return {
                ...state, [action.idTod]: state[action.idTod].filter(
                    el => el.id !== action.idTask)
            }
        }
        case "ADDED-TASK": {
            return {
                ...state, [action.idTod]: [
                    {id: v1(), title: action.title, isDone: false}, ...state[action.idTod]]
            }
        }
        case "CHANGE-STATUS-TASK": {
            return {
                ...state, [action.idTod]: state[action.idTod].map(
                    el => el.id === action.idTask ? {...el, isDone: action.isDone} : el
                )
            }
        }
        case "CHANGE-TITLE-TASK": {
            return {
                ...state, [action.idTod]: state[action.idTod].map(
                    el => el.id === action.idTask ? {...el, title: action.title} : el
                )
            }
        }
        case "ADDED-TODOLIST": {
            return {[action.idNewTodolist]: [], ...state}
        }
        case "REMOVE-TODOLIST":{
            let copyState={...state}
            delete copyState[action.idTod]
            return copyState
        }
        default:
            return state
    }
}


type ActionTaskType = removeTaskACType
    | addedTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | addedTodolistACType
    | removeTodolistACType


type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (idTod: string, idTask: string) => {
    return {
        type: 'REMOVE-TASK',
        idTod,
        idTask
    } as const
}


type addedTaskACType = ReturnType<typeof addedTaskAC>
export const addedTaskAC = (idTod: string, title: string) => {
    return {
        type: 'ADDED-TASK',
        idTod,
        title
    } as const
}


type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (idTod: string, idTask: string, isDone: boolean) => {
    return {
        type: 'CHANGE-STATUS-TASK',
        idTod,
        idTask,
        isDone

    } as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (idTod: string, idTask: string, title: string) => {
    return {
        type: 'CHANGE-TITLE-TASK',
        idTod,
        idTask,
        title
    } as const
}




