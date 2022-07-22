import React, {useState} from 'react';
import './App.css';
import {FilterType, Todolist} from "./Todolist";

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'JS', isDone: true}
    ])

    const removeTask = (idTask: number) => {
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
                filterTasks={filterTasks}
                removeTask={removeTask}
                tasks={editTasks}
                title={'What to learn'}
            />

        </div>
    );
}

export default App;


