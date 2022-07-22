import React, {useState} from 'react';
import './App.css';
import {FilterType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
type StateTodolistType={
    id:string
    title:string
    filter:FilterType
}

function App() {
    const[todolist,setTodolist]=useState<Array<StateTodolistType>>([
        {id:v1(),title:'What to learn',filter:'all'},
        {id:v1(),title:'What to buy',filter:'all'}
    ])
    const filterTasks = (idTodolist:string,valueFilter:FilterType) => {
        setTodolist(todolist.map(el=>el.id===idTodolist
        ?{...el,filter:valueFilter}:el))
    }
    ////////////////////////////////////////////
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





    return (
        <div className="App">
            {
                todolist.map(el=>{
                    let editTasks=tasks
                    if(el.filter==='compl'){editTasks=tasks.filter(el=>el.isDone)}
                    if(el.filter==='undone'){editTasks=tasks.filter(el=>!el.isDone)}
                    return(
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


