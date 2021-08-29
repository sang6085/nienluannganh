import {
	Box,
	Checkbox,
	Container,
	FormControlLabel,
	FormHelperText,
	Grid,
	Link as MuiLink,
	Theme,
	Typography,
} from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import TextField from '../../Components/TextField/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ButtonComponent from '../../Components/Button/ButtonComponent';
import { AppURL } from '../../utils/const';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RegisterPost } from '../../Api/RegisterAPI';
import Message from '../../Notifi/Message';

function Copyright() {
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
}
const useStyles = makeStyles((theme: Theme) => ({
	mt3: {
		marginTop: theme.spacing(1),
	},
	mb: {
		marginBottom: theme.spacing(3),
	},
	textCenter: {
		textAlign: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	paper: {
		marginTop: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	bgBox: {
		backgroundColor: theme.palette.secondary.contrastText,
	},
}));
const Register: React.FC = () => {
	const classes = useStyles();
	const schema = yup.object().shape({
		name: yup.string().required('name la bat buoc'),
		loginName: yup.string().required('lastName la bat buoc'),
		password: yup.string().required('password la bat buoc'),
		retypePassword: yup
			.string()
			.required('password la bat buoc')
			.oneOf([yup.ref('password')], 'password ko giong nhau'),
		accept: yup.bool().oneOf([true], 'chua chap nhan'),
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
			name: data.name,
			loginName: data.loginName,
			password: data.password,
		};
		const response = await RegisterPost(user);
		if (response?.data) {
			history.push(`${AppURL.LOGIN}`);
		} else if (response?.errorCode === 2) {
			toast.error('Ten tai khoan da ton tai');
		}
	};

	return (
		<Container maxWidth="xs" className={classes.bgBox}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container className={classes.paper}>
					<Grid item xs={12}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
					</Grid>
				</Grid>
				<Grid container className={classes.mb}>
					<Grid item xs={12} justify="center">
						<Typography component="h1" variant="h5" gutterBottom align="center">
							Sign up
						</Typography>
					</Grid>
				</Grid>

				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							{...register('name')}
							variant="outlined"
							disabled={false}
							label="Name"
							type="text"
							id="name"
							name="name"
							placeholder="Name"
							fullWidth={true}
							error={errors.name ? true : false}
							helperText={errors.name?.message}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							{...register('loginName')}
							variant="outlined"
							disabled={false}
							label="Login Name"
							type="text"
							id="loginName"
							name="loginName"
							placeholder="Login Name"
							fullWidth={true}
							error={errors.loginName ? true : false}
							helperText={errors.loginName?.message}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							{...register('password')}
							variant="outlined"
							disabled={false}
							label="Password"
							type="password"
							id="password"
							name="password"
							placeholder="Password"
							fullWidth={true}
							error={errors.password ? true : false}
							helperText={errors.password?.message}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							{...register('retypePassword')}
							variant="outlined"
							disabled={false}
							label="Retype Password"
							type="password"
							id="retypePassword"
							name="retypePassword"
							placeholder="Retype Password"
							fullWidth={true}
							error={errors.retypePassword ? true : false}
							helperText={errors.retypePassword?.message}
						/>
					</Grid>
				</Grid>
				<Grid container justify="flex-start">
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
							label="I accept the Terms use Of & privacy Policy"
						/>
						{errors.accept ? <FormHelperText error>You can display an error</FormHelperText> : ''}
					</Grid>
				</Grid>
				<Grid container justify="center">
					<Grid item xs={12} className={classes.mt3}>
						<ButtonComponent fullWidth={true} color="primary" type="submit">
							Sign up
						</ButtonComponent>
					</Grid>
				</Grid>
				<Grid container style={{ textAlign: 'end' }}>
					<Grid item xs={12} className={classes.mt3}>
						<Link style={{ cursor: 'pointer' }} to={AppURL.LOGIN}>
							Alright have an account? Sign in
						</Link>
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={12}>
						<Box mt={8}>
							<Copyright />
						</Box>
					</Grid>
				</Grid>
			</form>
			<Message />
		</Container>
	);
};
export default Register;
