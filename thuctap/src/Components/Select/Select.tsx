import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formControl: {
			margin: theme.spacing(0),
			minWidth: 120,
			width: '100%',
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},
	})
);

interface Value {
	value?: string;
	title?: string;
}

interface Props {
	labelId?: string;
	id?: string;
	menuList?: Value[];
	helperText?: string;
	label?: string;
	receiValue?: (value: any) => void;
	defaultState?: string;
	className?: any;
	variant?: 'filled' | 'outlined' | 'standard';
}

export function SimpleSelect({
	labelId,
	id,
	menuList,
	helperText,
	label,
	receiValue,
	defaultState,
	className,
	variant,
}: Props) {
	const classes = useStyles();
	const [value, setValue] = React.useState(defaultState || '');

	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setValue(event.target.value as string);
		receiValue?.(event.target.value);
	};

	return (
		<div>
			<FormControl className={classes.formControl}>
				<InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
				<Select labelId={labelId} id={id} value={value} onChange={handleChange} variant={variant}>
					{menuList?.map((item) => (
						<MenuItem key={item.title} value={item?.value}>
							{item?.title}
						</MenuItem>
					))}
				</Select>
				<FormHelperText>{helperText}</FormHelperText>
			</FormControl>
		</div>
	);
}
