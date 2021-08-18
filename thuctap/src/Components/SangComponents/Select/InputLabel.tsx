import React from "react";
import { InputLabel as InputLabelComonent } from "@material-ui/core";
interface InputLabelProps {
    id:string
}
const InputLabel: React.FC <InputLabelProps> =(props) =>{
    return (
        <InputLabelComonent 
            id={props.id}
        >
            {props.children}
        </InputLabelComonent>
    )
}
export default InputLabel
