import React, {useState} from 'react';
import './App.css';
import {FilterType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

function App() {
    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'JS', isDone: true}
    ])

    const changeTaskIsDone = (idTask: string,isDone:boolean) => {
        setTasks(tasks.map(el=>el.id===idTask
        ?{...el,isDone}:el))
    }

    const addedTask = (text:string) => {
        setTasks([{id: v1(), title:text, isDone: false},...tasks])
    }

    const removeTask = (idTask: string) => {
        setTasks(tasks.filter(el => el.id !== idTask))
    }

    const[filter,setFilter]=useState<FilterType>('all')
    const filterTasks = (valueFilter:FilterType) => {
        setFilter(valueFilter)
    }
    let editTasks=tasks
    if(filter==='compl'){editTasks=tasks.filter(el=>el.isDone)}
    if(filter==='undone'){editTasks=tasks.filter(el=>!el.isDone)}

    return (
        <div className="App">
            <Todolist
                filter={filter}
                changeTaskIsDone={changeTaskIsDone}
                addedTask={addedTask}
                filterTasks={filterTasks}
                removeTask={removeTask}
                tasks={editTasks}
                title={'What to learn'}
            />

        </div>
    );
}

export default App;


