import { IconButton, Menu, MenuItem, Theme } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { AppBar } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import { ChevronRight } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import './../../utils/locales/i18n';
import AvatarComponent from '../../Components/AvatarComponent/AvatarComponent';
import VNlogo from '../../public/images/VNlogo.jpg';
import ENlogo from '../../public/images/ENlogo.jpg';
import MenuComponent from '../../Components/Menu/MenuComponent';
import { useHistory } from 'react-router-dom';
interface HeaderLayoutProps {
	contentHeader: string;
	onClick?: () => void;
	open: any;
	user: string;
	detailuser: string;
}
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			backgroundColor: '#fff',
			color: '#000',
			zIndex: theme.zIndex.drawer + 1,
			width: `calc(100% - 74px)`,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
		},
		appBarShift: {
			backgroundColor: '#fff',
			color: '#000',
			marginLeft: drawerWidth,
			width: `calc(100% - ${drawerWidth}px)`,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		menuButton: {
			marginRight: 36,
		},
		hide: {
			display: 'none',
		},
		image: {
			width: 30,
			height: 20,
			marginRight: 4,
			borderRadius: 3,
		},
	})
);
const HeaderLayout: React.FC<HeaderLayoutProps> = (props) => {
	const history = useHistory();
	const classes = useStyles();
	const { t, i18n } = useTranslation();
	const receiValue: (value: any) => void = (value) => {
		i18n.changeLanguage(value);
	};
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleLogout = () => {
		window.localStorage.removeItem('token');
		history.push('/login');
		setAnchorEl(null);
	};

	return (
		<AppBar
			position="fixed"
			className={clsx(classes.appBar, {
				[classes.appBarShift]: props.open,
			})}
		>
			<Toolbar>
				<Grid container justify="space-between" alignItems="center">
					<Grid item xs={6}>
						<Grid container justify="flex-start" alignItems="center">
							<Grid item xs={1}>
								<IconButton
									color="inherit"
									aria-label="open drawer"
									onClick={props.onClick}
									edge="start"
									className={clsx(classes.menuButton)}
								>
									{props.open ? <MenuIcon /> : <ChevronRight />}
								</IconButton>
							</Grid>
							<Grid item xs={11}>
								<Typography variant="h6">{t('header.' + props.contentHeader)}</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={3}></Grid>
					<Grid item xs={3}>
						<Grid container justify="flex-end" spacing={2}>
							<Grid item xs={1} lg={4} xl={6}>
								<Grid container justify="flex-end">
									<MenuComponent
										receiValue={receiValue}
										defaultState="en"
										menuList={[
											{
												value: 'en',
												title: t('translation.english'),
												icon: <img alt="en" src={ENlogo} className={classes.image} />,
											},
											{
												value: 'vi',
												title: t('translation.vietnamese'),
												icon: <img alt="en" src={VNlogo} className={classes.image} />,
											},
										]}
									></MenuComponent>
								</Grid>
							</Grid>
							<Grid item xs={11} lg={8} xl={6}>
								<Grid container spacing={2}>
									<Grid item xs={3}>
										<Grid container justify="flex-start">
											<Grid item>
												<AvatarComponent
													alt={props.user}
													src="#"
													onClick={handleClick}
												></AvatarComponent>
												<Menu
													id="simple-menu"
													anchorEl={anchorEl}
													keepMounted
													open={Boolean(anchorEl)}
													onClose={handleClose}
												>
													<MenuItem onClick={handleClose}>Profile</MenuItem>
													<MenuItem onClick={handleClose}>My account</MenuItem>
													<MenuItem onClick={handleLogout}>Logout</MenuItem>
												</Menu>
											</Grid>
										</Grid>
									</Grid>
									<Grid item xs={9}>
										<Grid container justify="flex-start">
											<Grid item xs={12}>
												<Grid item>
													<Typography>{props.user}</Typography>
												</Grid>
											</Grid>
											<Grid item xs={12}>
												<Typography>{props.detailuser}</Typography>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
};
export default HeaderLayout;
