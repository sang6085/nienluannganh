import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import Login from './Pages/Login/Login';
import LoginLayout from './Layouts/LoginLayout';
import { AppURL } from './utils/const';
import NotFound from './Pages/NotFound/NotFound';
import Register from './Pages/Register/Register';
import MainLayout from './Layouts/MainLayout';
import DashBoard from './Pages/DashBoard/DashBoard';
import Document from './Pages/Document/Document';
import Tenant from './Pages/Tenant/Tenant';
import { I18nextProvider } from 'react-i18next';
import i18n from './utils/locales/i18n';
import ChoosePlan from './Pages/ChoosePlan/ChoosePlan';
import ChoosePlanLayout from './Layouts/ChoosePlanLayout/ChoosePlanLayout';
import User from './Pages/User/User';
import MainLayoutAdmin from './Layouts/MainLayoutAdmin';
import License from './Pages/License/License';
import DocumentShare from './Pages/Document/DocumentShare';

function App() {
	const theme = createTheme({
		overrides: {
			MuiCssBaseline: {
				'@global': {
					'*::-webkit-scrollbar': {
						width: '0.4em',
					},
					'*::-webkit-scrollbar-track': {
						'-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
					},
					'*::-webkit-scrollbar-thumb': {
						backgroundColor: 'rgba(0,0,0,.1)',
						outline: '1px solid slategrey',
					},
				},
			},
		},
	});
	return (
		<I18nextProvider i18n={i18n}>
			<ThemeProvider theme={theme}>
				<Router>
					<Switch>
						<Route exact path="/" component={() => <Redirect to={AppURL.LOGIN} />} />
						<Route path={[AppURL.LOGIN, AppURL.REGISTER]}>
							<LoginLayout>
								<Switch>
									<Route path={AppURL.LOGIN} component={Login} />
									<Route path={AppURL.REGISTER} component={Register} />
								</Switch>
							</LoginLayout>
						</Route>
						<Route path={[AppURL.DASHBOARD, AppURL.DOCUMENTLIST, AppURL.TENANT, AppURL.SHARE]}>
							<MainLayout>
								<Switch>
									<Route path={AppURL.DASHBOARD} component={DashBoard} />
									<Route path={AppURL.DOCUMENTLIST} component={Document} />
									<Route path={AppURL.TENANT} component={Tenant} />
									<Route path={AppURL.SHARE} component={DocumentShare} />
								</Switch>
							</MainLayout>
						</Route>
						<Route path={[AppURL.LICENSE, AppURL.USER]}>
							<MainLayoutAdmin>
								<Switch>
									<Route path={AppURL.USER} component={User} />
									<Route path={AppURL.LICENSE} component={License} />
								</Switch>
							</MainLayoutAdmin>
						</Route>
						<Route path={[AppURL.CHOOSEPLAN]}>
							<ChoosePlanLayout>
								<Switch>
									<Route path={AppURL.CHOOSEPLAN} component={ChoosePlan} />
								</Switch>
							</ChoosePlanLayout>
						</Route>
						<Route path="*" component={NotFound} />
					</Switch>
				</Router>
			</ThemeProvider>
		</I18nextProvider>
	);
}

export default App;
