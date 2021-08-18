import React from 'react';
import { Divider } from '@material-ui/core';

interface props {
	absolute?: boolean;
	component?: React.ElementType;
	flexItem?: boolean;
	light?: boolean;
	classes?: object;
	orientation?: 'horizontal' | 'vertical';
	variant?: 'fullWidth' | 'inset' | 'middle';
	children?: React.ReactNode;
}

const DividerComponent: React.FC<props> = (props): React.ReactElement => {
	return (
		<Divider
			absolute={props.absolute || false}
			flexItem={props.flexItem || false}
			light={props.light || false}
			component={props.component || 'hr'}
			orientation={props.orientation}
			variant={props.variant}
			classes={props.classes}
		>
			{props.children}
		</Divider>
	);
};

export default DividerComponent;
