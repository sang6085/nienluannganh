import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export interface optionAutoComplete {
    title: string,
    year: string
}
interface AutoCompleteComponentProps {
    data: optionAutoComplete[],
    variant?: 'filled' | 'outlined' | 'standard',
    label: string
    color?: 'primary'
    | 'secondary'
    onChange?: (e: any) => void
}
const AutoCompleteComponent: React.FC<AutoCompleteComponentProps> = (props) => {
    // const [value, setValue] = React.useState<string>('')
    // const handleClick = (e: any) => {
    //     console.log(e.target.value)
    //     setValue(e.target.value)
    // }
    return (
        <Autocomplete
            renderInput={(params) => <TextField
                {...params}
                label={props.label}
                variant={props.variant || 'outlined'}
                color={props.color || 'primary'}

            // onClick={handleClick}
            />}
            onChange={props.onChange}
            options={props.data}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }} />
    )
}

export default AutoCompleteComponent;