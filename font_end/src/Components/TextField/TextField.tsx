import { TextField as TextFieldComponent } from '@material-ui/core';
import React from 'react';
interface TextFieldProps {
	label?: string;
	select?: boolean;
	variant?: 'filled' | 'outlined';
	disabled?: boolean;
	required?: boolean;
	defaultValue?: string | number;
	type?: 'password' | 'text' | 'number' | 'datetime-local' | 'date' | 'time' | 'hidden';
	helperText?: string;
	error?: boolean;
	id?: string;
	multiline?: boolean;
	rows?: number;
	placeholder?: string | undefined;
	fullWidth?: true | false;
	value?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	inputRef?: React.Ref<any>;
	name?: string;
	inputProps?: any;
	InputProps?: any;
}
const TextField: React.FC<TextFieldProps> = (props) => {
	return (
		<TextFieldComponent
			inputRef={props.inputRef}
			label={props.label}
			select={props.select || false}
			variant={props.variant}
			disabled={props.disabled}
			required={props.required}
			defaultValue={props.defaultValue}
			type={props.type}
			helperText={props.helperText}
			error={props.error}
			id={props.id}
			multiline={props.multiline}
			rows={props.rows}
			placeholder={props.placeholder}
			fullWidth={props.fullWidth || false}
			value={props.value}
			onChange={props.onChange}
			InputProps={props.InputProps}
			name={props.name}
			inputProps={props.inputProps}
		/>
	);
};
export default TextField;
