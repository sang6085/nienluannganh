import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { AppBar, Grid } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

interface DrawerComponentProps {
	anchor?: 'bottom' | 'left' | 'right' | 'top';
	onClose?: (event: any) => void;
	open?: true | false;
	variant?: 'permanent' | 'persistent' | 'temporary';
	contentHeader: string;
	size: 'small' | 'medium' | 'full';
	avatar?: any;
}

const DrawerComponent: React.FC<DrawerComponentProps> = (props) => {
	const getSize = () => {
		if (props.size === 'full') {
			return `calc(100%)`;
		}
		if (props.size === 'medium') {
			return `calc(50%)`;
		}
		if (props.size === 'small') {
			return `calc(20%)`;
		}
	};
	const drawerWidth = getSize;

	const useStyles = makeStyles((theme: Theme) =>
		createStyles({
			root: {
				display: 'flex',
			},
			appBar: {
				transition: theme.transitions.create(['margin', 'width'], {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.leavingScreen,
				}),
			},
			appBarShift: {
				width: `calc(100% - ${drawerWidth}px)`,
				marginLeft: drawerWidth,
				transition: theme.transitions.create(['margin', 'width'], {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen,
				}),
			},
			menuButton: {
				marginRight: theme.spacing(2),
			},
			hide: {
				display: 'none',
			},
			drawer: {
				width: drawerWidth,
				flexShrink: 0,
			},
			drawerPaper: {
				width: drawerWidth,
			},
			drawerHeader: {
				display: 'flex',
				alignItems: 'center',
				padding: theme.spacing(0, 1),
				// necessary for content to be below app bar
				...theme.mixins.toolbar,
				justifyContent: 'flex-end',
			},
			content: {
				flexGrow: 1,
				padding: theme.spacing(3),
				transition: theme.transitions.create('margin', {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.leavingScreen,
				}),
				marginLeft: -drawerWidth,
			},
			contentShift: {
				transition: theme.transitions.create('margin', {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen,
				}),
				marginLeft: 0,
			},
		})
	);
	const [open, setOpen] = React.useState(false);
	const classes = useStyles();
	const theme = useTheme();
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<AppBar
				position="absolute"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					<Grid container justify="space-between" alignItems="center">
						<Grid item xs={8}>
							<Grid container justify="flex-start" alignItems="center">
								<Grid item xs={1}>
									<IconButton
										color="inherit"
										aria-label="open drawer"
										onClick={handleDrawerOpen}
										edge="start"
										className={clsx(classes.menuButton, open && classes.hide)}
									>
										<MenuIcon />
									</IconButton>
								</Grid>
								<Grid item xs={11}>
									<Typography variant="h6">{props.contentHeader}</Typography>
								</Grid>
							</Grid>
						</Grid>

						<Grid item xs={4}>
							<Typography>{props.avatar}</Typography>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				classes={{
					paper: classes.drawerPaper,
				}}
				open={open || false}
				anchor={props.anchor || 'left'}
				variant={props.variant || 'temporary'}
				onClose={props.onClose}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</div>
				{props.children}
			</Drawer>
		</div>
	);
};

export default DrawerComponent;
