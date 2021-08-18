import { TableContainer as TableContainerComponent } from "@material-ui/core";
import React from "react";
interface TableContainerProps {
    component?: any
}
const TableContainer: React.FC <TableContainerProps>=(props)=>{
    return (
        <TableContainerComponent 
            component={props.component}
        
        >

            {props.children}
        </TableContainerComponent>
    )
}
export default TableContainer