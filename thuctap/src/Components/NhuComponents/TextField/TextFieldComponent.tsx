import React from "react";
import { TextField } from '@material-ui/core'
interface TextFieldComponentProps {
    lable: string
    color?: 'primary'
    | 'secondary'
    fullWidth?: true | false
    margin?: 'dense'
    | 'none'
    | 'normal'
    size?: 'medium'
    | 'small'
    variant?: 'filled'
    | 'outlined'
    | 'standard'
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const TextFieldComponent: React.FC<TextFieldComponentProps> = (props) => {
    return (
        <TextField
            label={props.lable}
            color={props.color || 'primary'}
            fullWidth={props.fullWidth || false}
            margin={props.margin || 'none'}
            size={props.size || 'medium'}
            variant={props.variant || 'outlined'}
            onChange={props.onChange} />
    )
}
export default TextFieldComponent;