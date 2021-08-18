import Box from '@material-ui/core/Box';
import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import ButtonComponent from '../../Components/Button/ButtonComponent';
import TextField from '../../Components/TextField/TextField';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LinearProgress } from '@material-ui/core';
import { RegisterInTenant } from '../../api/TenantApi';
import { toast, ToastContainer } from 'react-toastify';

const Copyright = () => {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
};

const useStyles = makeStyles((theme) => ({
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		paddingTop: theme.spacing(2),
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

	progress: {
		marginTop: theme.spacing(4),
	},
}));
interface CreateUserProps {
	closeDialog?: () => void;
	titleDialog: string;
	create?: (result: boolean) => void;
}
const CreateUser: React.FC<CreateUserProps> = (props) => {
	const classes = useStyles();
	const [tr] = useTranslation();
	const closeDialog = props.closeDialog;
	if (closeDialog) {
		closeDialog();
	}
	const onSubmit = async (data: any) => {
		const response = await RegisterInTenant({
			name: data.name,
			loginName: data.loginName,
			password: data.password,
		});
		if (response?.errorCode === null) {
			props?.create?.(true);
		} else {
			toast.error(tr('tenant.create_tenant'));
		}
	};
	const schema = yup.object().shape({
		name: yup.string().required(tr('tenant.the_name_field_is_required')),
		loginName: yup.string().required(tr('tenant.the_loginName_field_is_required')),
		password: yup
			.string()
			.required(tr('tenant.password_err_null'))
			.min(6, tr('tenant.password_err')),
		retypePassword: yup
			.string()
			.required(tr('tenant.re_password_err_null'))
			.oneOf([yup.ref('password')], tr('tenant.password_err')),
	});
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />

			<div className={classes.paper}>
				<form onSubmit={handleSubmit(onSubmit)}>
					{isSubmitting && <LinearProgress className={classes.progress} />}
					<Typography component="h1" variant="h5">
						{tr('createUser.' + props.titleDialog)}
					</Typography>
					<Grid xs={12} className={classes.form}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									{...register('name')}
									variant="outlined"
									fullWidth
									id="name"
									label={tr('createUser.name') + '*'}
									error={errors.name ? true : false}
									helperText={errors.name?.message}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									{...register('loginName')}
									variant="outlined"
									fullWidth
									id="loginName"
									label={tr('createUser.login_name') + '*'}
									error={errors.loginName ? true : false}
									helperText={errors.loginName?.message}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									{...register('password')}
									variant="outlined"
									fullWidth
									id="password"
									type="password"
									label={tr('createUser.password') + '*'}
									error={errors.password ? true : false}
									helperText={errors.password?.message}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									{...register('retypePassword')}
									variant="outlined"
									fullWidth
									id="retypePassword"
									type="password"
									label={tr('createUser.retype_password') + '*'}
									error={errors.retypePassword ? true : false}
									helperText={errors.retypePassword?.message}
								/>
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
							{tr('createUser.' + props.titleDialog)}
						</ButtonComponent>
					</Grid>
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
				</form>
			</div>

			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
};
export default CreateUser;
