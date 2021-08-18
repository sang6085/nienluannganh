import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { RegisterPost } from '../../api/RegisterAPI';
import ButtonComponent from '../../Components/Button/ButtonComponent';
import TextField from '../../Components/TextField/TextField';
import Logo from '../../public/images/logo.png';
import { AppURL } from '../../utils/const';
import { LinearProgress } from '@material-ui/core';
import { toast, ToastContainer } from 'react-toastify';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			Your Website {new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	progress: {
		// position: 'absolute',
		top: theme.spacing(1),
		// left: 0,
		// right: 0,
	},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		height: '100%',
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	image: {
		width: 140,
		height: 40,
		margin: theme.spacing(3),
	},
	accept: {
		color: '#f44336',
		fontSize: '13px',
	},
}));

export default function SignUp() {
	const [tr] = useTranslation();

	const schema = yup.object().shape({
		firstName: yup.string().required(tr('signup.first_name_err_null')),
		lastName: yup.string().required(tr('signup.last_name_err_null')),
		loginName: yup.string().required(tr('signup.email_err_null')).email(tr('signup.email_err')),
		password: yup
			.string()
			.required(tr('signup.password_err_null'))
			.min(6, tr('signup.password_err')),
		retypePassword: yup
			.string()
			.required(tr('signup.re_password_err_null'))
			.oneOf([yup.ref('password')], tr('signup.password_err')),
		accept: yup.bool().oneOf([true], tr('signup.accept_err')),
	});

	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const history = useHistory();
	const onSubmit = async (data: any) => {
		const user = {
			name: data.lastName + ' ' + data.firstName,
			loginName: data.loginName,
			password: data.password,
		};
		const res = await RegisterPost(user);

		if (res?.errorCode === null) {
			//toast.success(tr('signup.push_noti'));
			history.push('/login');
		} else {
			toast.error(res?.errorMessage);
		}
	};

	const classes = useStyles();
	return (
		<>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={classes.paper}>
						{isSubmitting && <LinearProgress className={classes.progress} />}
						<img src={Logo} alt="signin" className={classes.image} />
						<Typography component="h1" variant="h5">
							{tr('signup.sign_up')}
						</Typography>
						<Grid xs={12} className={classes.form}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										{...register('firstName')}
										variant="outlined"
										fullWidth
										id="firstName"
										name="firstName"
										label={tr('signup.first_name') + ' *'}
										error={errors.firstName ? true : false}
										helperText={errors.firstName?.message}
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextField
										{...register('lastName')}
										variant="outlined"
										fullWidth
										id="lastName"
										name="lastName"
										label={tr('signup.last_name') + ' *'}
										error={errors.lastName?.message ? true : false}
										helperText={errors.lastName?.message}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										{...register('loginName')}
										variant="outlined"
										fullWidth
										id="loginName"
										name="loginName"
										label={tr('signup.email_address') + ' *'}
										error={errors.loginName?.message ? true : false}
										helperText={errors.loginName?.message}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										{...register('password')}
										variant="outlined"
										fullWidth
										label={tr('signup.password') + ' *'}
										type="password"
										id="password"
										name="password"
										error={errors.password?.message ? true : false}
										helperText={errors.password?.message}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										{...register('retypePassword')}
										variant="outlined"
										fullWidth
										label={tr('signup.retype_password') + ' *'}
										type="password"
										id="retype_password"
										name="retypePassword"
										error={errors.retypePassword?.message ? true : false}
										helperText={errors.retypePassword?.message}
									/>
								</Grid>
								<Grid item xs={12}>
									<FormControlLabel
										control={
											<Controller
												control={control}
												name="accept"
												defaultValue="false"
												render={({ field: { onChange } }) => (
													<Checkbox
														color="primary"
														name="accept"
														onChange={(e) => onChange(e.target.checked)}
													/>
												)}
											/>
										}
										label={tr('signup.i_accept_the_terms_of_use_&_privacy_policy')}
									/>
									<Typography className={classes.accept}>
										{errors.accept ? ' ' + errors.accept.message + ' ' : ''}
									</Typography>
								</Grid>
							</Grid>

							<ButtonComponent
								className={classes.submit}
								fullWidth
								variant="contained"
								color="primary"
								type="submit"
								disabled={isSubmitting}
							>
								{tr('signup.sign_up')}
							</ButtonComponent>

							<Grid container justify="flex-end">
								<Grid item>
									<Link to={AppURL.LOGIN}>{tr('signup.already_have_an_account')}</Link>
								</Grid>
							</Grid>
						</Grid>
					</div>
				</form>
				<Box mt={5}>
					<Copyright />
				</Box>
			</Container>
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
		</>
	);
}
