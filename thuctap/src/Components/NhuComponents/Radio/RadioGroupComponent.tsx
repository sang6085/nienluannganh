import React from 'react';
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
interface RadioGroupComponentProps {
	color?: 'primary' | 'secondary';
	id: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const RadioGroupComponent: React.FC<RadioGroupComponentProps> = (props) => {
	const [value, setValue] = React.useState('female');

	const handleClick = (e: any) => {
		setValue(e.target.value);
	};
	return (
		<RadioGroup
			aria-label="gender"
			name="gender1"
			value={value}
			onChange={props.onChange}
			onClick={handleClick}
			id={props.id}
		>
			<FormControlLabel
				value="male"
				control={<Radio color={props.color || 'primary'} />}
				label="Nam"
			/>
			<FormControlLabel
				value="female"
				control={<Radio color={props.color || 'primary'} />}
				label="Nữ"
			/>
		</RadioGroup>
	);
};

export default RadioGroupComponent;
