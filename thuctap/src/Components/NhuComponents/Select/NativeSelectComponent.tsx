import { Select, FormControl, InputLabel } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from "react";

export interface OptionDto {
    value: string
    label: string
}

interface NativeSelectComponentPropps {
    variant?: 'filled'
    | 'outlined'
    | 'standard',
    options: OptionDto[],
    label: string
    onChange?: (e: any) => void
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 300,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);
const NativeSelectComponent: React.FC<NativeSelectComponentPropps> = (props) => {
    const classes = useStyles();

    return (


        <FormControl variant={props.variant || 'outlined'} className={classes.formControl}>
            <InputLabel htmlFor={props.label}>{props.label}</InputLabel>
            <Select
                native
                label={props.label}
                onChange={props.onChange}
            >
                {props.options.map((option) =>
                    <option key={option.value} value={option.label}>{option.label}</option>)}
            </Select>
        </FormControl>



    )
}

export default NativeSelectComponent;