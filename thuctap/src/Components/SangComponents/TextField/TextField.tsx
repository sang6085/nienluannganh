import { TextField as TextFieldComponent  } from "@material-ui/core";
import React from "react"; 
interface TextFieldProps {
    label?: string;
    variant?: "filled" | "outlined";
    disabled?: boolean;
    required?: boolean;
    defaultValue?:string | number;
    type?: "password" | "text" | "number" |"datetime-local" | "date" |"time";
    helperText?:string;
    error?: boolean;
    id?: string;
    multiline?: boolean;
    rows?: number;
    placeholder?: string | undefined;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>)=>void;

}
const TextField: React.FC <TextFieldProps> = (props) =>{
    return(
        <TextFieldComponent 
        label={props.label}
        variant={props.variant}
        disabled={props.disabled}
        required={props.required}
        defaultValue={props.defaultValue}
        type={props.type}
        helperText={props.helperText}
        error={props.error}
        id={props.id}
        multiline={props.multiline}
        rows={props.rows}
        placeholder={props.placeholder}
        onChange={props.onChange}
        />
    )
}
export default TextField
