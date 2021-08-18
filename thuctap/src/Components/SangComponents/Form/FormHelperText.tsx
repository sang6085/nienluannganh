import { FormHelperText as FormHelperTextComponent} from "@material-ui/core";
import React from "react";
const FormHelperText: React.FC = (props)=>{
    return (
        <FormHelperTextComponent>
            {props.children}
        </FormHelperTextComponent>
    )
}
export default FormHelperText