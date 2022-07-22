import React, {useState} from 'react';
import './App.css';
import {FilterType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
type StateTodolistType = {
    id: string
    title: string
    filter: FilterType
}

function App() {
    const todolist1 = v1()
    const todolist2 = v1()
    const [todolist, setTodolist] = useState<Array<StateTodolistType>>([
        {id: todolist1, title: 'What to learn', filter: 'all'},
        {id: todolist2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState({
        [todolist1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'JS', isDone: true}
        ],
        [todolist2]: [
            {id: v1(), title: 'CAR', isDone: true},
            {id: v1(), title: 'PAPIROS', isDone: true},
            {id: v1(), title: 'DOLLARS', isDone: false}
        ]
    })
    const changeTaskIsDone = (idTodolist: string,idTask: string, isDone: boolean) => {
        setTasks({...tasks,[idTodolist]:tasks[idTodolist].map(
            el=>el.id===idTask?{...el,isDone}:el)})
    }

    const addedTask = (idTodolist: string, text: string) => {
        setTasks({
            ...tasks, [idTodolist]: [
                {id: v1(), title: text, isDone: true}, ...tasks[idTodolist]]
        })
    }

    const filterTasks = (idTodolist: string, valueFilter: FilterType) => {
        setTodolist(todolist.map(el => el.id === idTodolist
            ? {...el, filter: valueFilter} : el))
    }

    const removeTask = (idTodolist: string, idTask: string) => {
        setTasks({
            ...tasks, [idTodolist]: tasks[idTodolist].filter(
                el => el.id !== idTask)
        })
    }


    return (
        <div className="App">
            {
                todolist.map(el => {
                    let editTasks = tasks[el.id]
                    if (el.filter === 'compl') {
                        editTasks = tasks[el.id].filter(el => el.isDone)
                    }
                    if (el.filter === 'undone') {
                        editTasks = tasks[el.id].filter(el => !el.isDone)
                    }
                    return (
                        <Todolist
                            key={el.id}
                            idTodolist={el.id}
                            filter={el.filter}
                            changeTaskIsDone={changeTaskIsDone}
                            addedTask={addedTask}
                            filterTasks={filterTasks}
                            removeTask={removeTask}
                            tasks={editTasks}
                            title={el.title}
                        />
                    )
                })
            }


        </div>
    );
}

export default App;


