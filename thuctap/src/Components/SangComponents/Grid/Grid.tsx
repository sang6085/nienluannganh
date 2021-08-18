import { Grid as GridComponent } from "@material-ui/core";
import React from "react";
interface GridProps {
    container?: boolean ;
    item?: boolean;
    spacing: any
}
const Grid : React.FC <GridProps> =(props)=>{
    return (
        <GridComponent 
            container={props.container}
            item={props.item}
            spacing={props.spacing}
        
        >
            {props.children}
        </GridComponent>
    )
}
export default Grid 