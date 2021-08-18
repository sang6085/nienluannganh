import { TextField } from "@material-ui/core";
import React from "react"
interface DateTimePickerComponentProps {
    id: string,
    lable: string,
    defaultValue?: string,
    color?: 'primary'
    | 'secondary',
    variant?: 'outlined'
    | 'standard'
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const DateTimePickerComponent: React.FC<DateTimePickerComponentProps> = (props) => {
    return (
        <TextField
            id={props.id}
            label={props.lable}
            type='datetime-local'
            defaultValue={props.defaultValue || '2017-05-24T10:30'}
            color={props.color || 'primary'}
            variant={props.variant || 'outlined'} />
    )
}

export default DateTimePickerComponent;