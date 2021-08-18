import React from "react";
import { Switch as SwitchComponent } from "@material-ui/core";
interface SwitchProps {
    checked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void
    name?: string;
    color?: "primary" | "secondary" | "default";
    disabled ?: boolean;
    defaultChecked?: boolean
}
const Switch: React.FC <SwitchProps>=(props)=>{
    return (
        <SwitchComponent
            checked={props.checked}
            onChange={props.onChange}
            name={props.name}
            color={props.color}
            disabled={props.disabled}
            defaultChecked={props.defaultChecked}
            
        />

    )
}
export default Switch