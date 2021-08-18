import React from "react";
import { Typography as TypographyComponent } from "@material-ui/core";
interface TypographyProps {
    id?: string;
    gutterBottom?: boolean;
    color?: "inherit" | "initial" | "primary" | "secondary" | "textPrimary" | "textSecondary" | "error";
    
}
const Typography: React.FC <TypographyProps> =(props)=>{
    return (
        <TypographyComponent
            id={props.id}
            color={props.color}
            gutterBottom={props.gutterBottom}
            
        >
            {props.children}
        </TypographyComponent>
    )
}
export default Typography