import React from 'react';
import { Switch } from '@material-ui/core';

interface Props {
	checked?: any;
	onChange?: () => void;
	name?: any;
	color?: 'primary' | 'secondary' | 'default';
}

export const ContainedSwitch = ({ checked, onChange, name, color }: Props): React.ReactElement => {
	return (
		<div>
			{/* thiếu label */}
			<Switch checked={checked} onChange={onChange} name={name} color={color} />
		</div>
	);
};
