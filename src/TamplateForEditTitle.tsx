import React from "react";

type TamplateForEditTitleType={
    title:string
}
export function TamplateForEditTitle (props:TamplateForEditTitleType) {
    return(
        <span>{props.title}</span>
    )
}