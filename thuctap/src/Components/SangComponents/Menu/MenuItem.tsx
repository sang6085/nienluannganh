import { MenuItem as MenuItemConponent } from "@material-ui/core";
import React from "react";
interface MenuItemProps {
    value?: any ;
    onClick?: ()=>void;
    disabled?: boolean;
    selected?: boolean
}
const MenuItem: React.FC <MenuItemProps> = (props) => {
    return (
        <MenuItemConponent 
            value={props.value}
            onClick={props.onClick}
            disabled={props.disabled}
            selected={props.selected}
        >
            {props.children}
        </MenuItemConponent>
    )
}
export default MenuItem