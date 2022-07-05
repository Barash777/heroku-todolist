import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    callback: (title: string) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {

    const [editable, setEditable] = useState<boolean>(false)
    const [title, setTitle] = useState(props.title)

    const onDoubleClickHandler = () => {
        setEditable(!editable)
        changeTaskTitle()
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const changeTaskTitle = () => {
        if (title.trim() === '') {
            setTitle(props.title)
            return
        }
        props.callback(title)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onDoubleClickHandler()
        }
    }

    return (
        editable ?
            <input
                value={title}
                onBlur={onDoubleClickHandler}
                onChange={onChangeInputHandler}
                autoFocus
                onKeyDown={onKeyDownHandler}
            /> :
            <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    );
};

export default EditableSpan;