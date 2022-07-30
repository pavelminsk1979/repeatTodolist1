import {StateTaskType, StateTodolistType} from "../App";
import {addedTodolistAC, todolistReduser} from "./TodolistReduser";
import {taskReduser} from "./TaskReduser";

test('id should be equals',()=>{
    const startTaskState:StateTaskType={}
    const startTodolistState:Array<StateTodolistType>=[]
    const action=addedTodolistAC('New todolist')
    const endTaskState=taskReduser(startTaskState,action)
    const endTodolistState=todolistReduser(startTodolistState,action)

    const keys=Object.keys(endTaskState)
    const idFromTasks=keys[0]
    const idFromTodolists=endTodolistState[0].id

    expect(idFromTasks).toBe(action.idNewTodolist)
    expect(idFromTodolists).toBe(action.idNewTodolist)
})