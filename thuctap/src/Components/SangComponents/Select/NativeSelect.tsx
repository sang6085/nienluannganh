import React from "react";
import { NativeSelect as NativeSelectComponent} from "@material-ui/core";
interface NativeSelectProps {
    value?: string;
    onChange?: (event: React.ChangeEvent<{ name?: string; value: unknown }>)=>void;
    name?: string;
    className?: string;
}
const NativeSelect: React.FC <NativeSelectProps>= (props)=>{
    return (
        <NativeSelectComponent
            value={props.value}
            onChange={props.onChange}
            name={props.name}
            className={props.className}
        >            
            {props.children}
        </NativeSelectComponent>
    )
}
export default NativeSelect