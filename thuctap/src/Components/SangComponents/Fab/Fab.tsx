import React from "react";
import { Fab as FabComponent} from "@material-ui/core";
interface FabProps {
    color?: "default" | "inherit" | "primary" | "secondary";
    variant?: "extended" | "round";
    disabled?: boolean;
    size?: "small" | "medium" | "large"
}
const Fab: React.FC <FabProps> =(props)=>{
    return (
        <FabComponent 
            color={props.color}
            variant={props.variant}
            disabled={props.disabled}
            size={props.size}
        >
            
        </FabComponent>
    )
}
export default Fab