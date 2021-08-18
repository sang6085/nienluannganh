import React from "react"
import { FormControlLabel } from "@material-ui/core"
import CheckboxComponent from "./CheckBoxComponent"
interface CheckboxFormControlLabelProps {
    name: string
    lable: string
    labelPlacement?: 'bottom'
    | 'end'
    | 'start'
    | 'top'
    checked: true | false
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const CheckboxFormControlLabel: React.FC<CheckboxFormControlLabelProps> = (props) => {

    return (
        <FormControlLabel
            control={<CheckboxComponent onChange={props.onChange} checked={props.checked} ></CheckboxComponent>}
            label={props.lable}
            labelPlacement={props.labelPlacement || 'end'}

        />
    )
}

export default CheckboxFormControlLabel;