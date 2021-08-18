import { Menu as MenuComponent} from "@material-ui/core";
import React from "react";
interface MenuProps {
    open: boolean;
    onClose?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
    keepMounted?: boolean;
    anchorEl?: Element | ((element: Element) => Element) | null;
    id?: string

}
const Menu: React.FC <MenuProps>=(props)=>{
    return (
        <MenuComponent 
            open={props.open}
            onClose={props.onClose}
            keepMounted={props.keepMounted}
            anchorEl={props.anchorEl}
            id={props.id}
        >

            {props.children}
        </MenuComponent>
    )
}
export default Menu