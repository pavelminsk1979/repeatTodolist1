import {StateTaskType} from "../App";
import {
    addedTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    taskReduser
} from "./TaskReduser";
import {addedTodolistAC, removeTodolistAC} from "./TodolistReduser";


test('correct task should be deleted from correct array', () => {
    const startState: StateTaskType = {
        'todolist1': [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'CSS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'JS', isDone: true}
        ],
        'todolist2': [
            {id: '1', title: 'CAR', isDone: true},
            {id: '2', title: 'PAPIROS', isDone: true},
            {id: '3', title: 'DOLLARS', isDone: false}
        ]
    }
    const endState = taskReduser(startState, removeTaskAC('todolist1', '3'))
    expect(endState).toEqual({
        'todolist1': [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'CSS', isDone: true},
            {id: '4', title: 'JS', isDone: true}
        ],
        'todolist2': [
            {id: '1', title: 'CAR', isDone: true},
            {id: '2', title: 'PAPIROS', isDone: true},
            {id: '3', title: 'DOLLARS', isDone: false}
        ]
    })
})

test('correct task should be added to correct array', () => {
    const startState: StateTaskType = {
        'todolist1': [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'CSS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'JS', isDone: true}
        ],
        'todolist2': [
            {id: '1', title: 'CAR', isDone: true},
            {id: '2', title: 'PAPIROS', isDone: true},
            {id: '3', title: 'DOLLARS', isDone: false}
        ]
    }

    const endState = taskReduser(startState, addedTaskAC(
        'todolist2', 'GAN'))

    expect(endState['todolist1'].length).toBe(4)
    expect(endState['todolist2'].length).toBe(4)
    expect(endState['todolist2'][0].id).toBeDefined()
    expect(endState['todolist2'][0].title).toBe('GAN')
    expect(endState['todolist2'][0].isDone).toBe(false)

})

test('status of specified task should be changed', () => {
    const startState: StateTaskType = {
        'todolist1': [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'CSS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'JS', isDone: true}
        ],
        'todolist2': [
            {id: '1', title: 'CAR', isDone: true},
            {id: '2', title: 'PAPIROS', isDone: true},
            {id: '3', title: 'DOLLARS', isDone: false}
        ]
    }

    const endState = taskReduser(startState, changeTaskStatusAC(
        'todolist2', '1', false))


    expect(endState['todolist1'][0].isDone).toBe(true)
    expect(endState['todolist2'][0].isDone).toBe(false)


})

test('correct task should change name', () => {
    const startState: StateTaskType = {
        'todolist1': [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'CSS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'JS', isDone: true}
        ],
        'todolist2': [
            {id: '1', title: 'CAR', isDone: true},
            {id: '2', title: 'PAPIROS', isDone: true},
            {id: '3', title: 'DOLLARS', isDone: false}
        ]
    }

    const endState = taskReduser(startState, changeTaskTitleAC(
        'todolist1', '3', 'REDAX'))


    expect(endState['todolist1'].length).toBe(4)
    expect(endState['todolist1'][2].title).toBe('REDAX')


})

test('new array should be added when new todolist added', () => {
    const startState: StateTaskType = {
        'todolist1': [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'CSS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'JS', isDone: true}
        ],
        'todolist2': [
            {id: '1', title: 'CAR', isDone: true},
            {id: '2', title: 'PAPIROS', isDone: true},
            {id: '3', title: 'DOLLARS', isDone: false}
        ]
    }

    const endState = taskReduser(startState, addedTodolistAC(
        "I'm new todolist"))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolist1' && k != 'todolist2')
    if (!newKey) {
        throw Error('new key should be added')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])


})

test('property with todolist should be delete', () => {
    const startState: StateTaskType = {
        'todolist1': [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'CSS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'JS', isDone: true}
        ],
        'todolist2': [
            {id: '1', title: 'CAR', isDone: true},
            {id: '2', title: 'PAPIROS', isDone: true},
            {id: '3', title: 'DOLLARS', isDone: false}
        ]
    }

    const endState = taskReduser(startState, removeTodolistAC('todolist1'))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolist1']).not.toBeDefined()


})