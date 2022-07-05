import React, {ChangeEvent} from 'react';
import {FilterValuesType} from '../App';
import Input from './Input';
import EditableSpan from './EditableSpan';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    editTask: (todolistID: string, taskID: string, title: string) => void
    editTodolistTitle: (todolistID: string, title: string) => void
}

export function Todolist(props: PropsType) {


    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);


    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }


    /*const setNewTitleGlobal = (title: string, taskID: string) => {
        props.editTask(props.id, taskID, title)
    }*/


    const editTodolistTitle = (title: string) => {
        props.editTodolistTitle(props.id, title)
    }

    return <div>
        <h3>
            {/*{props.title}*/}
            <EditableSpan callback={editTodolistTitle} title={props.title}/>
            <button onClick={removeTodolist}>x</button>
        </h3>
        <Input callback={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }

                    const setNewTitle = (title: string) => {
                        props.editTask(props.id, t.id, title)
                        // setNewTitleGlobal(title, t.id)
                    }

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan callback={setNewTitle} title={t.title}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}


