import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type TamplateForEditTitleType = {
    title: string
    callback: (editTitle: string) => void
}

export function TamplateForEditTitle(props: TamplateForEditTitleType) {
    const [toggleSpanInput, setToggleSpanInput] = useState(false)
    const [updateText, setUpdateText] = useState(props.title)

    const changeTitleHandler = () => {
        props.callback(updateText)
        setToggleSpanInput(false)
    }

    const toggleSpanInputHandler = () => {
        setToggleSpanInput(true)
    }

    const editTextHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setUpdateText(event.currentTarget.value)
    }
    return (
        toggleSpanInput
            ? <TextField
            size={'small'}
                autoFocus
                onBlur={changeTitleHandler}
                value={updateText}
                onChange={editTextHandler}
                variant="filled"/>

            : <span onDoubleClick={toggleSpanInputHandler}>{props.title}</span>
    )
}