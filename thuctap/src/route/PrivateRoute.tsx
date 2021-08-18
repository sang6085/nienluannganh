import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import App from '../App';
import { AppURL } from '../utils/const';

interface props {
	exact?: boolean;
	path?: any;
	component?: any;
}

const PrivateRoute: React.FC<props> = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				localStorage.getItem('user') ? (
					<Component {...props} />
				) : (
					<Route
						exact
						path={AppURL.ERROR_404}
						component={() => <Redirect to={AppURL.ERROR_404} />}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
