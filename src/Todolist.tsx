import React, {ChangeEvent, KeyboardEvent, useState} from "react";
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
}
export type FilterType = 'all' | 'compl' | 'undone'


export function Todolist(
    {
        title,
        tasks,
        removeTask,
        filterTasks,
        addedTask,
        changeTaskIsDone,
        filter,
        idTodolist,
        removeTodolist
    }: TodolistType) {

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
            <h3>{title}
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
                            <TamplateForEditTitle title={el.title}/>

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