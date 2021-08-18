import React from 'react';
import { KeyboardDatePicker as KeyboardDatePickerComponent } from '@material-ui/pickers';
interface KeyboardDatePickerProps {
	onChange: (date: any, value?: string | null) => void;
	value: any;
	label?: string;
	name?: string;
	id?: string;
	margin?: any;
	disableToolbar?: boolean;
	variant?: 'inline';
	format?: 'MM/dd/yyyy' | 'MM/dd/yyyy';
	fullWidth?: boolean;
}
const KeyboardDatePicker: React.FC<KeyboardDatePickerProps> = (props) => {
	return (
		<KeyboardDatePickerComponent
			onChange={props.onChange}
			value={props.value}
			margin={props.margin}
			variant={props.variant}
			id={props.id}
			name={props.name}
			format={props.format}
			disableToolbar={props.disableToolbar}
			label={props.label}
			fullWidth={props.fullWidth}
		/>
	);
};
export default KeyboardDatePicker;
