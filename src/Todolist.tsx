import React from "react";
import {TasksType} from "./App";
import {TemplateForTodolist} from "./TemplateForTodolist";
import {TamplateForEditTitle} from "./TamplateForEditTitle";
import {Button, Checkbox, Icon, IconButton} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {Backspace} from "@material-ui/icons";


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
                <Button
                    size={'small'}
                    onClick={removeTodolistHandler}
                    variant="outlined"
                    color="primary"
                    startIcon={<DeleteIcon />}>
                    Delete
                </Button>
            </h3>
            <TemplateForTodolist callback={addedTaskHandler}/>
            <div>{
                tasks.map(el => {
                    return (
                        <div key={el.id}>
                            <Checkbox
                                size={'small'}
                                onChange={
                                    (event) => changeTaskIsDoneHandler(
                                        el.id, event.currentTarget.checked)}
                                checked={el.isDone}
                                defaultChecked
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                            <TamplateForEditTitle
                                callback={(
                                    editTitle: string) => changeTitleTaskHandler(
                                    el.id, editTitle)}
                                title={el.title}/>

                            <IconButton
                                size={'small'}
                                onClick={() => removeTaskHandler(el.id)} color="primary">
                                <Backspace/>
                            </IconButton>

                        </div>
                    )
                })
            }
            </div>
            <div>
                <Button color={filter === 'all'?'primary':'secondary'}
                    size={filter === 'all'?"medium":'small'}
                    variant={filter === 'all'?'contained':'outlined'}
                        onClick={() => filterTasksHandler(idTodolist, 'all')}>ALL
                </Button>
                <Button color={filter === 'compl'?'primary':'secondary'}
                    size={filter === 'compl'?"medium":'small'}
                    variant={filter === 'compl'?'contained':'outlined'}
                        onClick={() => filterTasksHandler(idTodolist, 'compl')}>Complited
                </Button>
                <Button color={filter === 'undone'?'primary':'secondary'}
                    size={filter === 'undone'?"medium":'small'}
                    variant={filter === 'undone'?'contained':'outlined'}
                        onClick={() => filterTasksHandler(idTodolist, 'undone')}>Undone
                </Button>
            </div>
        </div>
    )
}