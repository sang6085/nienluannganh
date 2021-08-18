import { makeStyles } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Grid } from '@material-ui/core';

import React from 'react';
import { Redirect } from 'react-router-dom';
import { AppURL } from '../../utils/const';
const useStyles = makeStyles((theme) => ({
	background: {
		height: '100vh',
		backgroundColor: theme.palette.grey[300],
	},
	paper: {
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
}));
const LoginLayout: React.FC = (props) => {
	const classes = useStyles();
	return (
		<Box>
			<Grid container className={classes.background} justify="center" alignItems="center">
				{props.children !== undefined && (
					<Grid item className={classes.paper} component={Card} xs={9} md={6} lg={4} xl={3}>
						{window.localStorage.getItem('token') ? (
							<Redirect to={AppURL.DASHBOARD} />
						) : (
							props.children
						)}
					</Grid>
				)}
			</Grid>
		</Box>
		//  xs={9} md={6} lg={4} xl={3}
	);
};
export default LoginLayout;
