import React from "react";
import {TasksType} from "./App";

type TodolistType = {
    title: string
    tasks: Array<TasksType>
    removeTask:(idTask: number)=>void
    filterTasks:(valueFilter:FilterType)=>void
}

export type FilterType='all'|'compl'|'undone'

export function Todolist({title, tasks,removeTask,filterTasks}: TodolistType) {

    const removeTaskHandler = (idTask: number) => {
        removeTask(idTask)
    }

    const filterTasksHandler = (valueFilter:FilterType) => {
        filterTasks(valueFilter)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>{
                tasks.map(el => {
                    return (
                        <li key={el.id}>
                            <input
                                type="checkbox"
                                checked={el.isDone}
                            />
                            <span>{el.title}</span>
                            <button onClick={()=>removeTaskHandler(el.id)}>✖️</button>
                        </li>
                    )
                })
            }
            </ul>
            <div>
                <button onClick={()=>filterTasksHandler('all')}>ALL</button>
                <button onClick={()=>filterTasksHandler('compl')}>Complited</button>
                <button onClick={()=>filterTasksHandler('undone')}>Undone</button>
            </div>
        </div>
    )
}