import { IconButton as IconButtonComponent } from '@material-ui/core';
import React from 'react';
interface IconButtonProps {
	color?: 'default' | 'inherit' | 'primary' | 'secondary';
	edge?: false | 'start' | 'end';
}
const IconButton: React.FC<IconButtonProps> = (props) => {
	return (
		<IconButtonComponent color={props.color} edge={props.edge}>
			{props.children}
		</IconButtonComponent>
	);
};
export default IconButton;
