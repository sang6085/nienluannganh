import React from 'react';
import { ListItem } from '@material-ui/core';

interface props {
	alignItems?: 'flex-start' | 'center';

	button?: boolean;
	href?: string;
	disabled?: boolean;
	divider?: boolean;
	selected?: boolean;
	classes?: object;
	component?: React.ElementType;
	children?: React.ReactNode;
	className?: string;
	onClick?: () => void;
}

const ListItemComponent: React.FC<props> = (props): React.ReactElement => {
	return (
		<ListItem
			className={props.className}
			href={props.href}
			onClick={props.onClick}
			alignItems={props.alignItems || 'center'}
			classes={props.classes}
			component={props.component || 'div' || 'li'}
			disabled={props.disabled}
			divider={props.divider || false}
			button={props.button || true}
			selected={props.selected || false}
		>
			{props.children}
		</ListItem>
	);
};

export default ListItemComponent;
