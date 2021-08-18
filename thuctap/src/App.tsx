import React from 'react';

import './App.css';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { I18nextProvider } from 'react-i18next';
import i18n from './utils/locales/i18n';
import { LoginPage, SignupPage } from './Pages';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LoginLayout from './layout/LoginLayout/LoginLayout';
import { AppURL } from './utils/const';
import ChoosePlanPage from './Pages/ChoosePlan/ChoosePlanPage';
import ChoosePlanLayout from './layout/ChoosePlanLayout.tsx/ChoosePlanLayout';
import MainLayout from './layout/MainLayout';
import DashBoard from './Pages/DashBoard/DashBoard';
import DocumentList from './Pages/Document/DocumentList';
import FileManager from './Pages/FileManager/FileManager';
import CategoryList from './Pages/Category/CategoryList';
import License from './Pages/License/License';
import { Provider } from 'react-redux';
import { store } from './app/store';
import NotFoundPage from './Pages/NotFound/NotFoundPage';
import Tenant from './Pages/Tenant/Tenant';

function App() {
	const theme = createMuiTheme({
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
		<Provider store={store}>
			<I18nextProvider i18n={i18n}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Router>
						<Switch>
							<Route exact path="/" component={() => <Redirect to={AppURL.LOGIN} />} />
							<Route path={[AppURL.LOGIN, AppURL.REGISTER]}>
								<LoginLayout>
									<Switch>
										<Route path={AppURL.LOGIN} component={LoginPage} />
										<Route exact path={AppURL.REGISTER} component={SignupPage} />
									</Switch>
								</LoginLayout>
							</Route>
							<Route path={AppURL.CHOOSEPLAN}>
								<ChoosePlanLayout>
									<ChoosePlanPage />
								</ChoosePlanLayout>
							</Route>
							<Route
								path={[
									AppURL.DASHBOARD,
									AppURL.DOCUMENTLIST,
									AppURL.FILEMANAGER,
									AppURL.CATEGORYLIST,
									AppURL.LICENSE,
									AppURL.TENANT,
								]}
							>
								<MainLayout>
									<Switch>
										<Route exact path={AppURL.DASHBOARD} component={DashBoard} />
										<Route exact path={AppURL.DOCUMENTLIST} component={DocumentList} />
										<Route exact path={AppURL.FILEMANAGER} component={FileManager} />
										<Route exact path={AppURL.CATEGORYLIST} component={CategoryList} />
										<Route exact path={AppURL.LICENSE} component={License} />
										<Route exact path={AppURL.TENANT} component={Tenant} />
									</Switch>
								</MainLayout>
							</Route>

							<Route path="*" component={NotFoundPage} />
						</Switch>
					</Router>
				</ThemeProvider>
			</I18nextProvider>
		</Provider>
	);
}

export default App;
