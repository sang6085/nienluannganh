import {
	Box,
	Checkbox,
	Container,
	FormControlLabel,
	Grid,
	Link as MuiLink,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import * as yup from 'yup';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ButtonComponent from '../../Components/Button/ButtonComponent';
import TextField from '../../Components/TextField/TextField';
import Logo from '../../public/images/logo.png';
import { Link, useHistory } from 'react-router-dom';
import { LoginPost } from '../../api/LoginAPi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppURL } from '../../utils/const';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { LinearProgress } from '@material-ui/core';
import { useAppDispatch } from '../../app/hooks';
import { updateTitleHeader } from '../../layout/SideBarLayout/SideBarSlice';

const Copyright = () => {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<MuiLink color="inherit" href="https://material-ui.com/">
				Your Website
			</MuiLink>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
};

const useStyles = makeStyles((theme) => ({
	item: {
		marginTop: theme.spacing(3),
	},
	icon: {
		marginTop: theme.spacing(-1),
	},
	image: {
		width: 140,
		height: 40,
		margin: theme.spacing(3),
	},
	linkStyle: {
		textDecoration: 'none',
		color: theme.palette.primary.main,
		'&:hover': {
			textDecoration: 'underline',
		},
	},
	progress: {
		// position: 'absolute',
		top: theme.spacing(1),
		// left: 0,
		// right: 0,
	},
}));
const LoginPage: React.FC = () => {
	const classes = useStyles();
	const [t] = useTranslation();
	const history = useHistory();
	const dispatch = useAppDispatch();
	const onSubmit = async (data: any) => {
		const response = await LoginPost({
			loginName: data.email,
			password: data.password,
		});
		if (response?.errorCode === null) {
			window.localStorage.setItem('token', response.data?.accessToken || '');
			dispatch(updateTitleHeader('dashboard'));
			history.push('/dashboard');
		} else {
			toast.error(response?.errorMessage, {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	const schema = yup.object().shape({
		email: yup
			.string()
			.email(t('login.please_enter_a_valid_email_address'))
			.required(t('login.the_email_field_is_required')),
		password: yup.string().required(t('login.the_password_field_is_required')),
	});
	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});

	return (
		<Container maxWidth="xs">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container alignItems="center">
					<Grid item xs={12}>
						{isSubmitting && <LinearProgress className={classes.progress} />}
						<Grid container justify="center">
							<img src={Logo} alt="signin" className={classes.image} />
						</Grid>
						<Grid container justify="center">
							<Typography component="h1" variant="h5">
								{t('login.sign_in')}
							</Typography>
						</Grid>

						<Grid container justify="center" spacing={2}>
							<Grid item xs={12} className={classes.item}>
								<TextField
									{...register('email')}
									variant="outlined"
									disabled={false}
									label={t('login.email_address') + ' *'}
									type="text"
									id="email"
									name="email"
									placeholder={t('login.email_address') + ' *'}
									fullWidth={true}
									error={errors.email ? true : false}
									helperText={errors.email?.message}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									{...register('password')}
									variant="outlined"
									disabled={false}
									label={t('login.password') + ' *'}
									type="password"
									name="password"
									id="password"
									placeholder={t('login.password') + ' *'}
									fullWidth={true}
									error={errors.password ? true : false}
									helperText={errors.password?.message}
								/>
							</Grid>

							<Grid item xs={12}>
								<Grid container justify="flex-start">
									<FormControlLabel
										control={
											<Controller
												control={control}
												name="remember"
												defaultValue="false"
												render={({ field: { onChange } }) => (
													<Checkbox
														color="primary"
														name="remember"
														onChange={(e) => onChange(e.target.checked)}
													/>
												)}
											/>
										}
										label={t('login.remember_me')}
									/>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<ButtonComponent
									fullWidth={true}
									color="primary"
									type="submit"
									disabled={isSubmitting}
								>
									{t('login.sign_in')}
								</ButtonComponent>
							</Grid>
							{/* <Grid item xs={12}>
								<ButtonComponent fullWidth={true} color="secondary">
									<Icon aria-hidden={true} className={classes.icon}>
										Google
									</Icon>
									<Typography>{t('login.sign_in_with_google+')}</Typography>
								</ButtonComponent>
							</Grid> */}
						</Grid>

						<Grid container justify="center" className={classes.item}>
							<Grid item xs={6}></Grid>
							<Grid item xs={6}>
								<Link className={classes.linkStyle} to={AppURL.REGISTER}>
									{t("login.don't_have_an_account?") + ' ' + t('signup.sign_up')}
								</Link>
							</Grid>
						</Grid>
						<Grid container justify="center" className={classes.item}>
							<Box mt={8}>{Copyright}</Box>
						</Grid>
					</Grid>
				</Grid>
			</form>

			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>

			<ToastContainer />
		</Container>
	);
};

export default LoginPage;
