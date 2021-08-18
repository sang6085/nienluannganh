import { Checkbox as CheckboxComponent } from '@material-ui/core';
import React from 'react';
interface CheckboxProps {
	defaultChecked?: boolean;
	color?: 'default' | 'primary' | 'secondary';
	checked?: boolean;
	indeterminate?: boolean;
	size?: 'small' | 'medium';
	name?: string;
	icon?: React.ReactNode;
	checkedIcon?: React.ReactNode;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const Checkbox: React.FC<CheckboxProps> = (props) => {
	return (
		<CheckboxComponent
			defaultChecked={props.defaultChecked}
			color={props.color}
			checked={props.checked}
			indeterminate={props.indeterminate}
			size={props.size}
			name={props.name}
			icon={props.icon}
			checkedIcon={props.checkedIcon}
		/>
	);
};
export default Checkbox;
