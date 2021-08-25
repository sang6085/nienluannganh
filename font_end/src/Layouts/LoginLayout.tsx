import { Box, Card, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { AppURL } from '../utils/const';
const useStyles = makeStyles((theme) => ({
	paper: {
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
	root: {
		backgroundColor: theme.palette.grey[300],
		height: '100vh',
	},
}));
const LoginLayout: React.FC = (props) => {
	const classes = useStyles();
	return (
		<Box>
			{window.localStorage.getItem('token') && <Redirect to={`${AppURL.DASHBOARD}`} />}
			<Grid container className={classes.root} justify="center" alignItems="center">
				<Grid item className={classes.paper} component={Card}>
					{props.children}
				</Grid>
			</Grid>
		</Box>
	);
};
export default LoginLayout;
