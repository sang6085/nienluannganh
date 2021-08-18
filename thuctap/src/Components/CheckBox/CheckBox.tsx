import React from 'react';
import { FormControlLabel } from '@material-ui/core';
import CheckboxComponent from './CheckBoxComponent';
interface CheckboxProps {
	name: string;
	label: string;
	labelPlacement?: 'bottom' | 'end' | 'start' | 'top';
	checked?: true | false;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Checkbox: React.FC<CheckboxProps> = (props) => {
	return (
		<FormControlLabel
			control={
				<CheckboxComponent
					onChange={props.onChange}
					checked={props.checked ?? false}
				></CheckboxComponent>
			}
			label={props.label}
			labelPlacement={props.labelPlacement || 'end'}
		/>
	);
};

export default Checkbox;
