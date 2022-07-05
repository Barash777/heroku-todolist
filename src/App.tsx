import React, {useEffect, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {v1} from 'uuid';
import Input from './components/Input';

export type FilterValuesType = 'all' | 'active' | 'completed';

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

type TodoPlaceholderType = {
    userId: number
    id: number
    title: string
    completed: boolean
}

function App() {
    /*
    let todolistId1 = v1();
    let todolistId2 = v1();
    */

    const todolistIdArray: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']


    const [todos, setTodos] = useState<Array<TodoPlaceholderType>>([])
    let [todolists, setTodolists] = useState<Array<TodolistType>>(
        // [
        // {id: todolistId1, title: 'What to learn', filter: 'all'},
        // {id: todolistId2, title: 'What to buy', filter: 'all'}
        //     ]

        todolistIdArray.map((e, i) => ({id: todolistIdArray[i], title: `for user ${i + 1}`, filter: 'all'}))
    )

    const getPlaceholderAPI = async () => {
        const result = await fetch('https://jsonplaceholder.typicode.com/todos')
        const data = await result.json()
        setTodos(data)

        const newTasks: TasksStateType = {};
        for (let i = 0; i < todolistIdArray.length; i++) {
            newTasks[todolistIdArray[i]] = data.filter((e: TodoPlaceholderType) => e.userId.toString() === todolistIdArray[i])
                .map((e: TodoPlaceholderType) => ({id: e.id.toString(), title: e.title, isDone: e.completed}))
            // newTasks[todolistIdArray[i]] = newTasksReady.filter(t => t.id === todolistIdArray[i])
        }

        setTasks(newTasks)
    }

    useEffect(() => {
        getPlaceholderAPI()
    }, [])


    const initialTasks: TasksStateType = {
        [todolistIdArray[0]]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        [todolistIdArray[1]]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        [todolistIdArray[2]]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        [todolistIdArray[3]]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        [todolistIdArray[4]]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        [todolistIdArray[5]]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        [todolistIdArray[6]]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        [todolistIdArray[7]]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        [todolistIdArray[8]]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        [todolistIdArray[9]]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        [todolistIdArray[10]]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
    }
    let [tasks, setTasks] = useState<TasksStateType>(initialTasks);


    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id);
        setTasks({...tasks});
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};

        let todolistTasks = tasks[todolistId];

        tasks[todolistId] = [task, ...todolistTasks];
        setTasks({...tasks});
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId];

        let task = todolistTasks.find(t => t.id === id);

        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    function removeTodolist(id: string) {
        setTodolists(todolists.filter(tl => tl.id !== id));
        delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
        setTasks({...tasks});
    }


    function addTodolist(title: string) {
        const todolistID = v1();
        const newTodolist: TodolistType = {
            id: todolistID,
            title: title,
            filter: 'all'
        }

        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolistID]: []})
    }

    function editTask(todolistID: string, taskID: string, title: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(e => e.id === taskID ? {...e, title: title} : e)})
    }

    function editTodolistTitle(todolistID: string, title: string) {
        // setTasks({...tasks, [todolistID]: tasks[todolistID].map(e => e.id === taskID ? {...e, title: title} : e)})
        setTodolists(todolists.map(e => e.id === todolistID ? {...e, title: title} : e))
    }

    return (
        <div className="App">
            {/*{todos.map(e => <div>userID: {e.userId}, id: {e.id}, title: {e.title},*/}
            {/*    completed: {e.completed ? 'true' : 'false'}</div>)}*/}

            <Input callback={addTodolist}/>

            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

                    if (tl.filter === 'active') {
                        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        editTask={editTask}
                        editTodolistTitle={editTodolistTitle}
                    />
                })
            }

        </div>
    );
}

export default App;
