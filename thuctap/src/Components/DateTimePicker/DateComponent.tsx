import { TextField } from '@material-ui/core';
import React from 'react';
interface DateComponentProps {
	id?: string;
	lable: string;
	defaultValue?: string;
	color?: 'primary' | 'secondary';
	variant?: 'filled' | 'outlined' | 'standard';
	fullWidth?: boolean;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const DateComponent: React.FC<DateComponentProps> = (props) => {
	// const d = new Date();
	// let month: string = '' + (d.getMonth() + 1).toString();
	// let day: string = '' + d.getDate().toString();
	// const year: string = d.getFullYear().toString();

	// if (month.length < 2) {
	// 	month = '0' + month;
	// }
	// if (day.length < 2) {
	// 	day = '0' + day;
	// }
	// const defaultDate = [year, month, day].join('-');

	return (
		<TextField
			id={props.id}
			label={props.lable}
			type="date"
			// defaultValue={props.defaultValue || defaultDate}
			color={props.color || 'primary'}
			variant={props.variant || 'outlined'}
			value={props.value}
			onChange={props.onChange}
			fullWidth={props.fullWidth || false}
			InputLabelProps={{
				shrink: true,
			}}
		/>
	);
};

export default DateComponent;
