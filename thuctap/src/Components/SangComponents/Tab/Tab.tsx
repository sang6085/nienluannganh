import React from "react";
import { Tab as TabComponent} from "@material-ui/core";
interface TabProps {
    value?: any;
    label: string;
    disabled?: boolean ;
    icon?: string | React.ReactElement<any, string | React.JSXElementConstructor<any>>
}
const Tab: React.FC <TabProps> =(props)=>{
    return (
        <TabComponent
            value={props.value}
            label={props.label}
            disabled={props.disabled}
            icon={props.icon}
        />
    )
}
export default Tab