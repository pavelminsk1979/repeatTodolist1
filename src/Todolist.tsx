import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TasksType} from "./App";
import st from './Todolist.module.css'

type TodolistType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (idTodolist:string,idTask: string) => void
    filterTasks: (idTodolist:string,valueFilter: FilterType) => void
    addedTask: (idTodolist:string,text: string) => void
    changeTaskIsDone: (idTodolist: string,idTask: string, isDone: boolean) => void
    filter:FilterType
    idTodolist:string
}
export type FilterType = 'all' | 'compl' | 'undone'


export function Todolist(
    {title, tasks, removeTask, filterTasks, addedTask, changeTaskIsDone,filter,idTodolist}: TodolistType) {
    const [text, setText] = useState('')
    const [error, setError] = useState<string|null>(null)


    const removeTaskHandler = (idTask: string) => {
        removeTask(idTodolist,idTask)
    }

    const filterTasksHandler = (idTodolist:string,valueFilter: FilterType) => {
        filterTasks(idTodolist,valueFilter)
    }

    const addedTaskHandler = () => {
        if (text.trim() !== '') {
            addedTask(idTodolist,text.trim())
            setText('')
        } else {
            setError('Text is requaried!')
        }

    }
    const setTextHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value)
        setError(null)
    }
    const onKeyPressEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addedTaskHandler()
        }
    }

    const changeTaskIsDoneHandler = (idTask: string, isDone: boolean) => {
        changeTaskIsDone(idTodolist,idTask, isDone)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    className={error?st.error:''}
                    onKeyPress={onKeyPressEnterHandler}
                    value={text}
                    onChange={setTextHandler}/>
                <button onClick={addedTaskHandler}>+</button>
                {error&&<div className={st.errorMessage}>{error}</div>}
            </div>
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
                            <span>{el.title}</span>
                            <button onClick={() => removeTaskHandler(el.id)}>✖️</button>
                        </li>
                    )
                })
            }
            </ul>
            <div>
                <button className={filter==='all'?st.activeButtonFiltr:''}
                    onClick={() => filterTasksHandler(idTodolist,'all')}>ALL</button>
                <button className={filter==='compl'?st.activeButtonFiltr:''}
                    onClick={() => filterTasksHandler(idTodolist,'compl')}>Complited</button>
                <button className={filter==='undone'?st.activeButtonFiltr:''}
                    onClick={() => filterTasksHandler(idTodolist,'undone')}>Undone</button>
            </div>
        </div>
    )
}