import { Tabs as TabsComponent } from "@material-ui/core";
import React from "react";
interface TabsProps{
    value?:any
    onChange?: (event: React.ChangeEvent<{}>, value: any) => void;
    indicatorColor?: "secondary" | "primary";
    textColor?: "secondary" | "primary" | "inherit";
    variant?: "scrollable" | "standard" | "fullWidth";
    centered?: boolean;
    scrollButtons?: "on" | "off" | "auto" | "desktop"
}
const Tabs: React.FC <TabsProps>=(props)=>{
    return (
        <TabsComponent 
            value={props.value}
            onChange={props.onChange}
            indicatorColor={props.indicatorColor}
            textColor={props.textColor}
            variant={props.variant}
            centered={props.centered}
            scrollButtons={props.scrollButtons}
        >
            {props.children}
        </TabsComponent>
    )
}
export default Tabs