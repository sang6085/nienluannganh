import React from "react";
import { Select as SelectComponent} from "@material-ui/core";
interface SelectProps {
    id?: string;
    labelId?: string;
    value?: any;
    displayEmpty?: boolean;
    autoWidth?: boolean;
    label?: string;
    native?: boolean;
    onChange?: (event: React.ChangeEvent<{ value: unknown }>)=>void ;
    multiple?: boolean;
}
const Select: React.FC <SelectProps> = (props) =>{
    return (
        <SelectComponent
        labelId={props.labelId}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        multiple={props.multiple}
        displayEmpty={props.displayEmpty}
        native={props.native}
        autoWidth={props.autoWidth}
      >
          {props.children}
      </SelectComponent>
    )
}
export default Select