import st from "./Todolist.module.css";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddCircle} from "@material-ui/icons";


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
            <TextField
                size={'small'}
                className={error ? st.error : ''}
                onKeyPress={onKeyPressEnterHandler}
                value={text}
                onChange={setTextHandler}

                variant="outlined" />

            <IconButton onClick={addedTaskHandler} color="primary">
<AddCircle/>
            </IconButton>

            {error && <div className={st.errorMessage}>{error}</div>}
        </div>
    )
}