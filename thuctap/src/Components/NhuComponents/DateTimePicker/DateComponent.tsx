import { TextField } from "@material-ui/core";
import React from "react"
interface DateComponentProps {
    id: string,
    lable: string,
    defaultValue?: string,
    color?: 'primary'
    | 'secondary',
    variant?: 'filled' | 'outlined'
    | 'standard'

    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const DateComponent: React.FC<DateComponentProps> = (props) => {
    const d = new Date()
    var month: string = '' + (d.getMonth() + 1).toString()
    var day: string = '' + d.getDate().toString()
    var year: string = d.getFullYear().toString()

    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
    const defaultDate = [year, month, day].join('-');

    return (
        <TextField
            id={props.id}
            label={props.lable}
            type='date'
            defaultValue={props.defaultValue || defaultDate}
            color={props.color || 'primary'}
            variant={props.variant || 'outlined'}
            onChange={props.onChange}
        />
    )
}

export default DateComponent;