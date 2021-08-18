import {RadioGroup as RadioGroupComponent} from "@material-ui/core";
import React from "react";

interface RadioGroupProps {
    name?: string;
    value?: any;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string)=>void;
    row?:boolean;
    
}
const RadioGroup: React.FC <RadioGroupProps> = (props)=>{
    return (
        <RadioGroupComponent 
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            row={props.row}
        >
            {props.children}
        </RadioGroupComponent>
    )
}
export default RadioGroup