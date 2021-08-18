import { IconButton as IconButtonComponent } from '@material-ui/core';
import React from 'react';
interface IconButtonProps {
	color?: 'default' | 'inherit' | 'primary' | 'secondary';
	edge?: false | 'start' | 'end';
	onClick?: (e: any) => void;
	className?: any;
}
const IconButton: React.FC<IconButtonProps> = (props) => {
	return (
		<IconButtonComponent
			className={props.className}
			color={props.color}
			edge={props.edge}
			onClick={props.onClick}
		>
			{props.children}
		</IconButtonComponent>
	);
};
export default IconButton;
