import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';
interface CheckboxComponentProps {
	color?: 'primary' | 'secondary';
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	checked: true | false;
}
const CheckboxComponent: React.FC<CheckboxComponentProps> = (props) => {
	const [checked, setChecked] = React.useState(props.checked);
	const handleClick = (e: any) => {
		setChecked(Boolean(e.target.checked));
	};
	return (
		<Checkbox
			checked={checked}
			onChange={props.onChange}
			onClick={handleClick}
			color={props.color || 'primary'}
		/>
	);
};

export default CheckboxComponent;
