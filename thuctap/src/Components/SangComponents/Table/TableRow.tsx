import React from "react";
import { TableRow as TableRowComponent } from "@material-ui/core";
interface TableRowProps {
    key?: React.Key | null
}
const TableRow: React.FC <TableRowProps>=(props)=>{
    return (
        <TableRowComponent
            key={props.key}
        >
            {props.children}

        </TableRowComponent>
    )
}
export default TableRow