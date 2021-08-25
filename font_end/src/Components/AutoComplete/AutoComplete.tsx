import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export interface optionAutoComplete {
	id: any;
	name: string;
}
interface AutoCompleteComponentProps {
	data: any[];
	variant?: 'filled' | 'outlined' | 'standard';
	label: string;
	color?: 'primary' | 'secondary';
	fullWidth?: boolean;
	onChange?: (value?: number) => void;

	value?: any;
	name?: string;
}
const AutoCompleteComponent: React.FC<AutoCompleteComponentProps> = (props) => {
	const onChange = (event: React.ChangeEvent<{}>, selected: any | null) => {
		props.onChange && props.onChange(selected?.id);
	};
	return (
		<Autocomplete
			renderInput={(params) => (
				<TextField
					{...params}
					label={props.label}
					variant={props.variant || 'outlined'}
					color={props.color || 'primary'}
					fullWidth={props.fullWidth}
				/>
			)}
			value={props.data.find((item) => item.id === props.value) ?? null}
			onChange={onChange}
			options={props.data}
			getOptionLabel={(option) => option.name}
			getOptionSelected={(option, value) => option.name === value.name}
		/>
	);
};

export default AutoCompleteComponent;
