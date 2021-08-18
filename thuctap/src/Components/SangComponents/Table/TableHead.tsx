import { TableHead as TableHeadComponent} from "@material-ui/core";
import React from "react";
interface TableHeadProps {
    
}
const TableHead: React.FC <TableHeadProps>=(props)=>{
    return (
        <TableHeadComponent>
            {props.children}
        </TableHeadComponent>
    )
}
export default TableHead