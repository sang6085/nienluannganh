import { makeStyles } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import jwtDecode from 'jwt-decode';

import React from 'react';
import { Redirect } from 'react-router-dom';
import { AppURL } from '../../utils/const';
const useStyles = makeStyles((theme) => ({
	background: {
		backgroundColor: theme.palette.grey[300],
	},
	paper: {
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(1),
	},
}));
const ChoosePlanLayout: React.FC = (props) => {
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
			<Grid container className={classes.background} justify="center" alignItems="center">
				{props.children !== undefined && (
					<Grid item className={classes.paper} xs={12} md={9} lg={6} xl={3}>
						{handleCheckToken(props.children)}
					</Grid>
				)}
			</Grid>
		</Box>
	);
};
export default ChoosePlanLayout;
