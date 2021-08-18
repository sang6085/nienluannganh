import React from "react";
import { Radio as RadioComponent } from "@material-ui/core";
interface RadioProps {
    color?: "default" |"primary" | "secondary";
    disableRipple?:boolean
}
const Radio: React.FC <RadioProps>= (props) =>{
    return (
        <RadioComponent 
            color={props.color}
            disableFocusRipple={props.disableRipple}
        />

    )
}
export default Radio