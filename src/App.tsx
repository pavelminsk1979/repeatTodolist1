import React, {useState} from 'react';
import './App.css';
import {FilterType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {TemplateForTodolist} from "./TemplateForTodolist";
import TemplateAppBar from "./AppBar";
import {Container, Grid, Paper} from "@material-ui/core";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type StateTodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type StateTaskType = {
    [key: string]: Array<TasksType>
}


function App() {
    const todolist1 = v1()
    const todolist2 = v1()
    const [todolist, setTodolist] = useState<Array<StateTodolistType>>([
        {id: todolist1, title: 'What to learn', filter: 'all'},
        {id: todolist2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<StateTaskType>({
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
    const changeTitleTodolist = (idTodolist: string,editTitle:string) => {
        setTodolist(todolist.map(el=>el.id===idTodolist?{...el,title:editTitle}:el))
    }

    const creatTodolist = (text:string) => {
        const newTodolistId = v1()
        setTodolist([
            {id: newTodolistId, title: text, filter: 'all'}, ...todolist])
        setTasks({...tasks,[newTodolistId]:[]})
    }

    const removeTodolist = (idTodolist: string) => {
        setTodolist(todolist.filter(el => el.id !== idTodolist))
        delete tasks[idTodolist]
    }

    const changeFilter = (idTodolist: string, valueFilter: FilterType) => {
        setTodolist(todolist.map(el => el.id === idTodolist
            ? {...el, filter: valueFilter} : el))
    }

    const changeTitleTask = (idTodolist: string,idTask: string,editTitle:string) => {
        setTasks({...tasks,[idTodolist]:tasks[idTodolist].map(
                el=>el.id===idTask?{...el,title:editTitle}:el
            )})
    }

    const changeTaskIsDone = (idTodolist: string, idTask: string, isDone: boolean) => {
        setTasks({
            ...tasks, [idTodolist]: tasks[idTodolist].map(
                el => el.id === idTask ? {...el, isDone} : el)
        })
    }

    const addedTask = (idTodolist: string, text: string) => {
        setTasks({
            ...tasks, [idTodolist]: [
                {id: v1(), title: text, isDone: true}, ...tasks[idTodolist]]
        })
    }

    const removeTask = (idTodolist: string, idTask: string) => {
        setTasks({
            ...tasks, [idTodolist]: tasks[idTodolist].filter(
                el => el.id !== idTask)
        })
    }


    return (
        <div>
            <TemplateAppBar/>
            <Container fixed>
                <Grid container style={{padding:'20px'}}>
                    <TemplateForTodolist callback={creatTodolist}/>
                </Grid>
                <Grid container spacing={3}>
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
                                <Grid item key={el.id}>
                                    <Paper >
                                <Todolist
                                    changeTitleTodolist={changeTitleTodolist}
                                    changeTitleTask={changeTitleTask}
                                    removeTodolist={removeTodolist}
                                    idTodolist={el.id}
                                    filter={el.filter}
                                    changeTaskIsDone={changeTaskIsDone}
                                    addedTask={addedTask}
                                    changeFilter={changeFilter}
                                    removeTask={removeTask}
                                    tasks={editTasks}
                                    title={el.title}
                                />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>


            </Container>


        </div>
    );
}

export default App;


