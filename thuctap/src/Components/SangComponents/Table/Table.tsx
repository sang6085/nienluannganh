import React from "react";
import { Table as TableComponent} from "@material-ui/core";
interface TableProps {
    className?: string;
    size?: "small" | "medium"
}
const Table: React.FC <TableProps>=(props)=>{
    return (
        <TableComponent 
             className={props.className}
             size={props.size}
        
        >
            {props.children}
        </TableComponent>
    )
}
export default Table