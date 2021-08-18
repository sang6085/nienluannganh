import React from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Switch } from "@material-ui/core";

interface SwitchFromControlLabelProps {
    color?: 'default' | 'primary' | 'secondary'
    label: string
    labelPlacement?: 'bottom' | 'end' | 'start' | 'top'
    checked: true | false
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const SwitchFromControlLabel: React.FC<SwitchFromControlLabelProps> = (props) => {
    const [checked, setChecked] = React.useState<boolean>(props.checked)
    const handleClick = (e: any) => {
        setChecked(e.target.checked)
    }
    return (
        <FormControlLabel
            control={<Switch color={props.color || 'primary'} checked={checked} onChange={props.onChange} onClick={handleClick} />}
            label={props.label}
            labelPlacement={props.labelPlacement || 'end'} />
    )
}

export default SwitchFromControlLabel;