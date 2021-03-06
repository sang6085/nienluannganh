import {
	Avatar,
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	Fade,
	Grid,
	ListItemAvatar,
	Menu,
	MenuItem,
} from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupIcon from '@mui/icons-material/Group';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { NavLink, Redirect } from 'react-router-dom';
import { AppURL } from '../utils/const';
import logo from '../public/images/logo1.png';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { titleHeader, updateTitleHeader } from '../features/Header/HeaderSlice';
import icon from '../public/images/english.svg';
import iconvn from '../public/images/vietnamese.svg';
import { useTranslation } from 'react-i18next';
import { ProfileGet } from '../Api/ProfileAPI';
import jwt_decode from 'jwt-decode';
import jwtDecode from 'jwt-decode';
import { Close } from '@material-ui/icons';
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: `calc(100% - ${73}px)`,
			backgroundColor: '#fff',
			color: 'black',
		},
		appBarShift: {
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
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
			whiteSpace: 'nowrap',
		},
		drawerOpen: {
			width: drawerWidth,
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		closeButton: {
			position: 'absolute',
			top: theme.spacing(1),
			right: theme.spacing(1),
			color: theme.palette.grey[500],
			zIndex: 1,
		},
		drawerClose: {
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			overflowX: 'hidden',
			width: theme.spacing(7) + 1,
			[theme.breakpoints.up('sm')]: {
				width: theme.spacing(9) + 1,
			},
		},
		link: {
			color: '#1bb55c !important',
			textDecoration: 'none',
			background: '#e3f2fd',
		},
		selected: {
			background: '#e3f2fd !important',
		},
		activeColor: { color: '#1bb55c' },
		toolbar: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			padding: theme.spacing(0, 1),
			// necessary for content to be below app bar
			...theme.mixins.toolbar,
		},
		button: {},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
		},
	})
);
const MainLayout: React.FC = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(true);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	const [selectedItem, setSelectedItem] = React.useState<number>(-1);
	const { t, i18n } = useTranslation();
	const items = [
		{ text: 'dashboard', icon: <DashboardIcon />, url: AppURL.DASHBOARD },
		{ text: 'document', icon: <AssignmentIcon />, url: '/document/0' },
		{ text: 'share', icon: <GroupIcon />, url: '/share/document/0' },
	];
	const [item, setItem] = React.useState(icon);
	const [valueI18n, setValueI18n] = React.useState('en');
	const [profile, setProfile] = React.useState<any | undefined>('user name');
	React.useEffect(() => {
		const i18nLng = window.localStorage.getItem('i18nextLng') || 'en';
		if (i18nLng === 'en') {
			setItem(icon);
			setValueI18n(i18nLng);
		} else {
			setItem(iconvn);
			setValueI18n(i18nLng);
		}
		const getDataProfile = async () => {
			const response = await ProfileGet();
			if (response?.errorCode === null) {
				setProfile(response.data);
			}
		};
		getDataProfile();
	}, [setValueI18n]);

	const title = useAppSelector(titleHeader);
	const dispatch = useAppDispatch();
	const handleClick = (index: number, text: string) => {
		setSelectedItem(index);
		dispatch(updateTitleHeader(text));
	};
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [anchorElProfile, setAnchorElProfile] = React.useState<null | HTMLElement>(null);
	const open1 = Boolean(anchorEl);

	const handleClickLng = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClickProfile = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElProfile(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleCloseProfile = () => {
		setAnchorElProfile(null);
	};

	const handleLanguage = (value: string) => {
		i18n.changeLanguage(value);
		setAnchorEl(null);
		if (value === 'en') {
			setItem(icon);
			setValueI18n(value);
		} else {
			setItem(iconvn);
			setValueI18n(value);
		}
	};
	const handleLogout = () => {
		window.localStorage.getItem('token') && window.localStorage.removeItem('token');
		setAnchorElProfile(null);
	};
	const token: any = window.localStorage.getItem('token');
	const date = Date.now();
	const handleCheckToken = (element: any) => {
		if (token) {
			const checkToken: any = jwtDecode(token);
			if (checkToken.exp < date / 1000) {
				localStorage.removeItem('token');
				return <Redirect to={AppURL.LOGIN} />;
			} else if (checkToken.isAdmin) {
				return <Redirect to="404" />;
			} else {
				return element;
			}
		} else {
			localStorage.removeItem('token');
			return <Redirect to={AppURL.LOGIN} />;
		}
	};
	const [openDialog, setOpenDialog] = React.useState(false);
	const handleCloseDialog = () => {
		setOpenDialog(false);
	};
	const handleOpenDialog = () => {
		setOpenDialog(true);
		setAnchorElProfile(null);
	};
	return (
		<Box>
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open,
					})}
				>
					<Toolbar>
						<Grid container>
							<Grid item xs={6} style={{ alignItems: 'center', display: 'flex' }}>
								<IconButton>
									{open ? (
										<MenuIcon onClick={handleDrawerClose} />
									) : (
										<ChevronRightIcon onClick={handleDrawerOpen} />
									)}
								</IconButton>
								<Typography variant="h6" noWrap>
									{t('header.' + title)}
								</Typography>
							</Grid>
							<Grid
								item
								xs={4}
								style={{
									textAlign: 'end',
									paddingRight: '5vh',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'flex-end',
								}}
							>
								<Button onClick={handleClickLng}>
									<img src={item} />
									&nbsp;
									<i className="fa fa-angle-down"></i>
								</Button>
								<Menu
									id="fade-menu"
									anchorEl={anchorEl}
									keepMounted
									open={open1}
									onClose={handleClose}
									TransitionComponent={Fade}
								>
									<MenuItem onClick={() => handleLanguage('en')}>
										<img src={icon} />
										&nbsp;English&nbsp;
										{valueI18n === 'en' && <i className="fa fa-check" aria-hidden="true"></i>}
									</MenuItem>
									<MenuItem onClick={() => handleLanguage('vi')}>
										<img src={iconvn} />
										&nbsp;Vietnamese&nbsp;
										{valueI18n === 'vi' && <i className="fa fa-check" aria-hidden="true"></i>}
									</MenuItem>
								</Menu>
							</Grid>
							<Grid
								item
								xs={2}
								style={{ alignItems: 'center', display: 'flex', paddingRight: '5vh' }}
							>
								<ListItem
									button
									style={{
										paddingBottom: 0,
										paddingTop: 0,
									}}
									onClick={handleClickProfile}
								>
									<ListItemAvatar>
										<Avatar>{profile.name?.charAt(0)}</Avatar>
									</ListItemAvatar>
									<div
										style={{
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
										}}
									>
										<div>{t('header.hello')}</div>
										<div>
											<Typography variant="body2" noWrap>
												{profile.name}
											</Typography>
										</div>
									</div>
								</ListItem>
								<Menu
									id="simple-menu"
									anchorEl={anchorElProfile}
									keepMounted
									open={Boolean(anchorElProfile)}
									onClose={handleCloseProfile}
								>
									<MenuItem onClick={handleOpenDialog}>{t('tenant.profile')}</MenuItem>
									<MenuItem onClick={handleLogout}>{t('tenant.log_out')}</MenuItem>
								</Menu>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
				<Drawer
					variant="permanent"
					className={clsx(classes.drawer, {
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					})}
					classes={{
						paper: clsx({
							[classes.drawerOpen]: open,
							[classes.drawerClose]: !open,
						}),
					}}
				>
					<div className={classes.toolbar}>
						<img src={logo} style={{ width: '-webkit-fill-available' }} />
					</div>
					<Divider />
					<List>
						{items.map((item, index) => (
							<NavLink
								onClick={() => handleClick(index, item.text)}
								to={{ pathname: item.url }}
								activeClassName={classes.link}
								style={{ textDecoration: 'none', color: theme.palette.common.black }}
								key={index}
							>
								<ListItem
									button
									className={clsx(classes.button, {
										[classes.selected]: selectedItem === index,
									})}
								>
									<ListItemIcon
										className={clsx(classes.button, {
											[classes.activeColor]: selectedItem === index,
										})}
									>
										{item.icon}
									</ListItemIcon>
									<ListItemText>{t('header.' + item.text)}</ListItemText>
								</ListItem>
							</NavLink>
						))}
					</List>
				</Drawer>
				<main className={classes.content}>
					<div className={classes.toolbar} />

					{handleCheckToken(props.children)}
				</main>
			</div>
			<Dialog
				//disableBackdropClick
				//disableEscapeKeyDown
				open={openDialog}
				onClose={handleCloseDialog}
				aria-labelledby="form-dialog-title"
				fullWidth
			>
				<DialogTitle id="form-dialog-title">{t('tenant.profile')}</DialogTitle>
				<IconButton className={classes.closeButton} onClick={handleCloseDialog}>
					<Close />
				</IconButton>
				<DialogContent>
					<Typography variant="body1">- T??n ????ng nh???p: {profile.name}</Typography>
					<Typography variant="body1">- T??n ????ng nh???p: {profile.loginName}</Typography>
					<Typography variant="body1">- T??n license: {profile.licenseName}</Typography>
					<Typography variant="body1">- Ng??y mua: {profile.boughtDate}</Typography>
					<Typography variant="body1">- Ng??y h???t h???n: {profile.expiredDate}</Typography>
				</DialogContent>
			</Dialog>
		</Box>
	);
};
export default MainLayout;
