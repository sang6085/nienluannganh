import React from 'react';
import { AppBar, makeStyles, Toolbar } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import clsx from 'clsx';
import { SimpleSelect } from '../../Components/Select/Select';
interface FooterLayoutProps {
	open: any;
}
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
	appBar: {
		top: 'auto',
		bottom: theme.spacing(0),
		zIndex: theme.zIndex.drawer - 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
}));
const option = [
	{ value: 'EN', title: 'English' },
	{ value: 'VI', title: 'Tiếng Việt' },
];
const FooterLayout: React.FC<FooterLayoutProps> = (props) => {
	const classes = useStyles();
	return (
		<AppBar
			position="fixed"
			color="primary"
			className={clsx(classes.appBar, {
				[classes.appBarShift]: props.open,
			})}
		>
			<Toolbar>
				<Grid container justify="flex-end">
					<SimpleSelect menuList={option} label="Language"></SimpleSelect>
				</Grid>
			</Toolbar>
		</AppBar>
	);
};
export default FooterLayout;
