import st from "./Todolist.module.css";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

 type TemplateForTodolistType = {callback:(text: string)=>void}

export function TemplateForTodolist(props: TemplateForTodolistType) {

    const [text, setText] = useState('')
    const [error, setError] = useState<string | null>(null)

    const setTextHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value)
        setError(null)
    }

    const onKeyPressEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addedTaskHandler()
        }
    }

    const addedTaskHandler = () => {
        if (text.trim() !== '') {
            props.callback( text.trim())
            setText('')
        } else {
            setError('Text is requaried!')
        }
    }

    return (
        <div>
            <input
                className={error ? st.error : ''}
                onKeyPress={onKeyPressEnterHandler}
                value={text}
                onChange={setTextHandler}/>
            <button onClick={addedTaskHandler}>+</button>
            {error && <div className={st.errorMessage}>{error}</div>}
        </div>
    )
}