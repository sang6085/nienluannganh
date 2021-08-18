import { FormControl as FormControlComponent} from "@material-ui/core";
import React from "react";
interface FormControlProps {
    classNamne?:string;
}
const FormControl: React.FC <FormControlProps> = (props) =>{
    return (
        <FormControlComponent
            className={props.classNamne}
        >
            {props.children}
        </FormControlComponent>
    )
}
export default FormControl