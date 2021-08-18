import React from "react";
import { TableCell as TableCellComponent } from "@material-ui/core";
interface TableCellProps {
    align?: "left" | "center" | "right" | "justify" | "inherit";
    component?: any;
    scope?: any
}
const TableCell: React.FC <TableCellProps>=(props)=>{
    return (
        <TableCellComponent
            align={props.align}
            component={props.component}
            scope={props.scope}
        >

            {props.children}
        </TableCellComponent>
    )
}
export default TableCell