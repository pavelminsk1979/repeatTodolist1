import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TasksType} from "./App";
import st from './Todolist.module.css'

type TodolistType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (idTask: string) => void
    filterTasks: (valueFilter: FilterType) => void
    addedTask: (text: string) => void
    changeTaskIsDone: (idTask: string, isDone: boolean) => void
    filter:FilterType
}
export type FilterType = 'all' | 'compl' | 'undone'


export function Todolist(
    {title, tasks, removeTask, filterTasks, addedTask, changeTaskIsDone,filter}: TodolistType) {
    const [text, setText] = useState('')
    const [error, setError] = useState<string|null>(null)


    const removeTaskHandler = (idTask: string) => {
        removeTask(idTask)
    }

    const filterTasksHandler = (valueFilter: FilterType) => {
        filterTasks(valueFilter)
    }

    const addedTaskHandler = () => {
        if (text.trim() !== '') {
            addedTask(text.trim())
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
        changeTaskIsDone(idTask, isDone)
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
                    onClick={() => filterTasksHandler('all')}>ALL</button>
                <button className={filter==='compl'?st.activeButtonFiltr:''}
                    onClick={() => filterTasksHandler('compl')}>Complited</button>
                <button className={filter==='undone'?st.activeButtonFiltr:''}
                    onClick={() => filterTasksHandler('undone')}>Undone</button>
            </div>
        </div>
    )
}