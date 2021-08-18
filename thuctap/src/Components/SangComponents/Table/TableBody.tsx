import React from "react";
import { TableBody as TableBodyComponent } from "@material-ui/core";
interface TableBodyProps {
    
}
const TableBody: React.FC <TableBodyProps>=(props)=>{
    return (
        <TableBodyComponent
        
        >
            {props.children}

        </TableBodyComponent>
    )
}
export default TableBody