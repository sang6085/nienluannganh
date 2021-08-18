import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ENlogo from '../../public/images/ENlogo.jpg';
import VNlogo from '../../public/images/VNlogo.jpg';
import { createStyles, makeStyles } from '@material-ui/core';
interface Value {
	value?: string;
	title?: string;
	icon?: any;
}

interface MenuComponentProps {
	menuList?: Value[];
	receiValue?: (value: any) => void;
	defaultState?: string;
	className?: any;
	variant?: 'filled' | 'outlined' | 'standard';
}
const useStyles = makeStyles(() =>
	createStyles({
		image: {
			width: 40,
			height: 30,
			borderRadius: 3,
		},
	})
);

const MenuComponent: React.FC<MenuComponentProps> = (props) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [item, setItem] = React.useState<any>(ENlogo);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	useEffect(() => {
		const i18nLng = window.localStorage.getItem('i18nextLng') || 'en';
		if (i18nLng === 'en') {
			setItem(ENlogo);
		} else {
			setItem(VNlogo);
		}
	}, []);
	const handleClose = (name: any) => () => {
		setAnchorEl(null);
		if (name === 'en') {
			setItem(ENlogo);
		} else {
			setItem(VNlogo);
		}
		props.receiValue?.(name);
	};

	return (
		<div>
			<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
				<img alt="en" src={item} className={classes.image} />
			</Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{props.menuList?.map((item) => (
					<MenuItem key={item.title} value={item?.value} onClick={handleClose(item?.value)}>
						{item?.icon} {item?.title}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
};
export default MenuComponent;
