import {v1} from "uuid";
import {StateTodolistType} from "../App";
import {
    addedTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    todolistReduser
} from "./TodolistReduser";
import {FilterType} from "../Todolist";


test('correct todolist should be removed',()=>{
    const todolist1 = v1()
    const todolist2 = v1()
    const startState:Array<StateTodolistType>=[
        {id: todolist1, title: 'What to learn', filter: 'all'},
        {id: todolist2, title: 'What to buy', filter: 'all'}
    ]
    const endState=todolistReduser(startState,removeTodolistAC(todolist1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolist2)
    expect(endState[0].title).toBe('What to buy')

})

test('correct todolist should be added',()=>{
    const todolist1 = v1()
    const todolist2 = v1()
    const newTodolistTitle="I'm new todolist"
    const startState:Array<StateTodolistType>=[
        {id: todolist1, title: 'What to learn', filter: 'all'},
        {id: todolist2, title: 'What to buy', filter: 'all'}
    ]
    const endState=todolistReduser(
        startState,addedTodolistAC(newTodolistTitle))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe("I'm new todolist")
    expect(endState[1].title).toBe('What to learn')

})

test('correct todolist should change its name',()=>{
    const todolist1 = v1()
    const todolist2 = v1()
    const newTodolistTitle="I'm new todolist"
    const startState:Array<StateTodolistType>=[
        {id: todolist1, title: 'What to learn', filter: 'all'},
        {id: todolist2, title: 'What to buy', filter: 'all'}
    ]
    const endState=todolistReduser(
        startState,changeTitleTodolistAC(todolist1,newTodolistTitle))
    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe("I'm new todolist")
    expect(endState[1].title).toBe('What to buy')

})
test('correct filter of todolist should be change',()=>{
    const todolist1 = v1()
    const todolist2 = v1()
    const newFilter:FilterType='compl'
    const startState:Array<StateTodolistType>=[
        {id: todolist1, title: 'What to learn', filter: 'all'},
        {id: todolist2, title: 'What to buy', filter: 'all'}
    ]
    const endState=todolistReduser(
        startState,changeFilterTodolistAC(todolist1,newFilter))

    expect(endState[0].filter).toBe('compl')
    expect(endState[1].filter).toBe('all')

})

