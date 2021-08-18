import { FormControlLabel as FormControlLabelComponent} from "@material-ui/core";
import React from "react";
interface FormControlLabelProps {
    control: React.ReactElement<any, any>;
    value?:string;
    label?:string;
    disabled?:boolean;
    labelPlacement?: "top" | "start" | "bottom" | "end" 
}
const FormControlLabel: React.FC <FormControlLabelProps>=(props)=>{
    return (
        <FormControlLabelComponent
            control={props.control}
            value={props.value}
            label={props.label}
            disabled={props.disabled}
            labelPlacement={props.labelPlacement}
        />

        
    )
}
export default FormControlLabel