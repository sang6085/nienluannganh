import { createStyles, Grid, Theme } from '@material-ui/core';
import React, { useEffect } from 'react';
import SideBarLayout from './SideBarLayout/SideBarLayout';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HeaderLayout from './HeaderLayout/HeaderLayout';
import { makeStyles } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { AppURL } from '../utils/const';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Redirect } from 'react-router-dom';
import PolicyIcon from '@material-ui/icons/Policy';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { userProfile } from './HeaderLayout/UserSlice';
import jwtDecode from 'jwt-decode';
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		toolbar: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-end',
			padding: theme.spacing(0, 1),
			// necessary for content to be below app bar
			...theme.mixins.toolbar,
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(2),
		},
	})
);

const MainLayout: React.FC = (props) => {
	const [open, setOpen] = React.useState(true);
	const handleClick = () => {
		setOpen(!open);
	};
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(userProfile());
	}, [dispatch]);
	const content = useAppSelector((state) => state.SideBar.title);
	const profile = useAppSelector((state) => state.User.name);
	const classes = useStyles();
	const token: any = localStorage.getItem('token');
	const date = Date.now();
	const handleCheckToken = (element: any) => {
		if (token) {
			const checkToken: any = jwtDecode(token);
			if (checkToken.exp < date / 1000) {
				localStorage.removeItem('token');
				return <Redirect to={AppURL.LOGIN} />;
			} else {
				return element;
			}
		} else {
			localStorage.removeItem('token');
			return <Redirect to={AppURL.LOGIN} />;
		}
	};
	return (
		<Box>
			<HeaderLayout
				open={open}
				contentHeader={content}
				onClick={handleClick}
				user={profile}
				detailuser="test avatar"
			></HeaderLayout>
			<Grid container justify="flex-start">
				<Grid item>
					<SideBarLayout
						open={open}
						list={[
							{
								text: 'dashboard',
								icon: <DashboardIcon />,
								url: AppURL.DASHBOARD,
							},
							{
								text: 'document',
								icon: <AssignmentIcon />,
								url: AppURL.DOCUMENTLIST,
							},
							{
								text: 'category',
								icon: <ListAltIcon />,
								url: AppURL.CATEGORYLIST,
							},
							{
								text: 'license',
								icon: <PolicyIcon />,
								url: AppURL.LICENSE,
							},
							{
								text: 'tenant',
								icon: <PeopleAltIcon />,
								url: AppURL.TENANT,
							},
						]}
					></SideBarLayout>
				</Grid>

				<Grid item className={classes.content} xs>
					<div className={classes.toolbar} />
					{handleCheckToken(props.children)}
				</Grid>
			</Grid>
		</Box>
	);
};
export default MainLayout;
