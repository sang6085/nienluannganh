import { TextField } from "@material-ui/core";
import React from "react"
interface TimeComponentProps {
    id: string,
    lable: string,
    defaultValue?: string,
    color?: 'primary'
    | 'secondary',
    variant?: 'outlined'
    | 'standard'
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const TimeComponent: React.FC<TimeComponentProps> = (props) => {
    return (
        <TextField
            id={props.id}
            label={props.lable}
            type='time'
            defaultValue={props.defaultValue || '10:30'}
            color={props.color || 'primary'}
            variant={props.variant || 'outlined'} ></TextField >
    )
}

export default TimeComponent;