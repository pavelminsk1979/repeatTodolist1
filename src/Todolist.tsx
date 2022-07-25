import React from "react";
import {TasksType} from "./App";
import st from './Todolist.module.css'
import {TemplateForTodolist} from "./TemplateForTodolist";
import {TamplateForEditTitle} from "./TamplateForEditTitle";

type TodolistType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (idTodolist: string, idTask: string) => void
    filterTasks: (idTodolist: string, valueFilter: FilterType) => void
    addedTask: (idTodolist: string, text: string) => void
    changeTaskIsDone: (idTodolist: string, idTask: string, isDone: boolean) => void
    filter: FilterType
    idTodolist: string
    removeTodolist: (idTodolist: string) => void
    changeTitleTask: (idTodolist: string, idTask: string,editTitle:string) => void
    changeTitleTodolist:(idTodolist: string,editTitle:string)=>void
}
export type FilterType = 'all' | 'compl' | 'undone'


export function Todolist(
    {title, tasks, removeTask, filterTasks, addedTask, changeTaskIsDone,
        filter, idTodolist, removeTodolist, changeTitleTask,changeTitleTodolist
    }: TodolistType) {

    const changeTitleTodolistHandler = (editTitle:string) => {
        changeTitleTodolist(idTodolist,editTitle)
    }

    const changeTitleTaskHandler = (idTask: string, editTitle: string) => {
        changeTitleTask(idTodolist, idTask, editTitle)
    }

    const removeTaskHandler = (idTask: string) => {
        removeTask(idTodolist, idTask)
    }

    const filterTasksHandler = (idTodolist: string, valueFilter: FilterType) => {
        filterTasks(idTodolist, valueFilter)
    }

    const addedTaskHandler = (text: string) => {
        addedTask(idTodolist, text)
    }

    const changeTaskIsDoneHandler = (idTask: string, isDone: boolean) => {
        changeTaskIsDone(idTodolist, idTask, isDone)
    }

    const removeTodolistHandler = () => {
        removeTodolist(idTodolist)
    }

    return (
        <div>
            <h3> <TamplateForEditTitle
                callback={changeTitleTodolistHandler}
                title={title}/>
                <button onClick={removeTodolistHandler}>DEL</button>
            </h3>
            <TemplateForTodolist callback={addedTaskHandler}/>
            <ul>{
                tasks.map(el => {
                    return (
                        <li key={el.id}>
                            <input
                                onChange={
                                    (event) => changeTaskIsDoneHandler(
                                        el.id, event.currentTarget.checked)}
                                type="checkbox"
                                checked={el.isDone}
                            />
                            <TamplateForEditTitle
                                callback={(
                                    editTitle: string) => changeTitleTaskHandler(
                                    el.id, editTitle)}
                                title={el.title}/>

                            <button onClick={() => removeTaskHandler(el.id)}>✖️</button>
                        </li>
                    )
                })
            }
            </ul>
            <div>
                <button className={filter === 'all' ? st.activeButtonFiltr : ''}
                        onClick={() => filterTasksHandler(idTodolist, 'all')}>ALL
                </button>
                <button className={filter === 'compl' ? st.activeButtonFiltr : ''}
                        onClick={() => filterTasksHandler(idTodolist, 'compl')}>Complited
                </button>
                <button className={filter === 'undone' ? st.activeButtonFiltr : ''}
                        onClick={() => filterTasksHandler(idTodolist, 'undone')}>Undone
                </button>
            </div>
        </div>
    )
}