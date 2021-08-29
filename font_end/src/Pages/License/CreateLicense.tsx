import Box from '@material-ui/core/Box';
import React from 'react';
import Container from '@material-ui/core/Container';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import ButtonComponent from '../../Components/Button/ButtonComponent';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import { LicenseDTO } from '../../DTO/LicenseDTO/LicenseDTO';
// import { LicensePost } from '../../api/LicenseAPI';
import { toast, ToastContainer } from 'react-toastify';
import { Button, InputAdornment } from '@material-ui/core';
import TextField from '../../Components/TextField/TextField';
import { LinearProgress } from '@material-ui/core';
import { LicenseGETId, LicensePost } from '../../Api/License';
import Message from '../../Notifi/Message';

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
interface NumberFormatCustomProps {
	inputRef: (instance: NumberFormat | null) => void;
	onChange: (event: { target: { name: string; value: string } }) => void;
	name: string;
	prefix: any;
}
function NumberFormatCustom(props: NumberFormatCustomProps) {
	const { inputRef, onChange, prefix, ...other } = props;

	return (
		<NumberFormat
			{...other}
			getInputRef={inputRef}
			onValueChange={(values) => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				});
			}}
			thousandSeparator
			isNumericString
			prefix={prefix}
		/>
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
	image: {
		width: 140,
		height: 40,
		margin: theme.spacing(3),
	},
}));
interface CreateLicenseProps {
	closeDialog?: () => void;
	create?: (result: boolean, id: number) => void;
	valueEdit?: any;
}
const CreateLicense: React.FC<CreateLicenseProps> = (props) => {
	const classes = useStyles();
	const [tr] = useTranslation();
	const closeDialog = props.closeDialog;
	if (closeDialog) {
		closeDialog();
	}
	const schema = yup.object().shape({
		name: yup.string().required(tr('createLicense.the_name_field_is_required')),
		// noDay: yup
		// 	.number()
		// 	.typeError(tr('createLicense.day_must_specify_a_number'))
		// 	.min(0, tr('createLicense.day_must_be_greater_than_or_equal_to_0'))
		// 	.integer(tr('createLicense.day_must_be_an_integer')),
		noMonth: yup
			.number()
			.typeError(tr('createLicense.month_must_specify_a_number'))
			.min(0, tr('createLicense.month_must_be_greater_than_or_equal_to_0'))
			.integer(tr('createLicense.month_must_be_an_integer')),
		// noYear: yup
		// 	.number()
		// 	.typeError(tr('createLicense.year_must_specify_a_number'))
		// 	.min(0, tr('createLicense.year_must_be_greater_than_or_equal_to_0'))
		// 	.integer(tr('createLicense.year_must_be_an_integer')),
		storageSize: yup
			.number()
			.typeError(tr('createLicense.storage_size_must_specify_a_number'))
			.min(0, tr('createLicense.storage_size_must_be_greater_than_or_equal_to_0')),

		price: yup
			.number()
			.typeError('Price must specify a number')
			.min(0, tr('createLicense.price_must_be_greater_than_or_equal_to_0')),
	});
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = async (data: any) => {
		// const response = await LicensePost(data);
		// if (response?.errorCode === null) {
		// 	props?.create?.(true, props.valueEdit.id);
		// } else {
		// 	toast.error(tr('createLicense.license_error'));
		// }

		const response = await LicensePost(data);
		if (response.errorCode === null) {
			if (data.id === 0) {
				toast.info(tr('tenant.created_successfully'));
			} else {
				toast.info(tr('tenant.updated_successfully'));
			}
			props?.create?.(true, props.valueEdit.id);
		}
	};
	return (
		<Container component="main" maxWidth="xs">
			<Message />
			<form onSubmit={handleSubmit(onSubmit)}>
				{/* {isSubmitting && <LinearProgress className={classes.progress} />} */}

				<Grid xs={12}>
					<Grid container spacing={2}>
						<Controller
							control={control}
							name="id"
							defaultValue={props.valueEdit.id}
							render={() => <TextField name="id" defaultValue={props.valueEdit.id} type="hidden" />}
						/>

						<Grid item xs={12}>
							<Controller
								control={control}
								name="name"
								defaultValue={props.valueEdit.name}
								render={({ field: { onChange } }) => (
									<TextField
										variant="outlined"
										fullWidth
										name="name"
										defaultValue={props.valueEdit.name}
										id="name"
										label={tr('createLicense.name') + ' *'}
										placeholder={tr('createLicense.name') + ' *'}
										error={errors.name ? true : false}
										helperText={errors.name?.message}
										onChange={(e) => onChange(e.target.value)}
									/>
								)}
							/>
						</Grid>

						{/* <Grid item xs={12}>
								<Controller
									control={control}
									name="noDay"
									defaultValue={props.valueEdit.noDay}
									render={({ field: { onChange } }) => (
										<TextField
											variant="outlined"
											fullWidth
											name="noDay"
											defaultValue={props.valueEdit.noDay}
											id="noDay"
											label={tr('createLicense.day')}
											placeholder={tr('createLicense.day')}
											error={errors.noDay ? true : false}
											helperText={errors.noDay?.message}
											onChange={(e) => onChange(e.target.value)}
										/>
									)}
								/>
							</Grid> */}
						<Grid item xs={12}>
							<Controller
								control={control}
								name="noMonth"
								defaultValue={props.valueEdit.noMonth}
								render={({ field: { onChange } }) => (
									<TextField
										variant="outlined"
										fullWidth
										name="noMonth"
										defaultValue={props.valueEdit.noMonth}
										id="noMonth"
										label={tr('createLicense.month')}
										placeholder={tr('createLicense.month')}
										error={errors.noMonth ? true : false}
										helperText={errors.noMonth?.message}
										onChange={(e) => onChange(e.target.value)}
									/>
								)}
							/>
						</Grid>
						{/* <Grid item xs={12}>
								<Controller
									control={control}
									name="noYear"
									defaultValue={props.valueEdit.noYear}
									render={({ field: { onChange } }) => (
										<TextField
											variant="outlined"
											fullWidth
											name="noYear"
											defaultValue={props.valueEdit.noYear}
											id="noYear"
											label={tr('createLicense.year')}
											placeholder={tr('createLicense.year')}
											error={errors.noYear ? true : false}
											helperText={errors.noYear?.message}
											onChange={(e) => onChange(e.target.value)}
										/>
									)}
								/>
							</Grid> */}
						<Grid item xs={12}>
							<Controller
								control={control}
								name="storageSize"
								defaultValue={props.valueEdit.storageSize}
								render={({ field: { onChange } }) => (
									<TextField
										variant="outlined"
										fullWidth
										name="storageSize"
										defaultValue={props.valueEdit.storageSize}
										id="storageSize"
										InputProps={{
											inputComponent: NumberFormatCustom,
											startAdornment: <InputAdornment position="start">MB</InputAdornment>,
										}}
										label={tr('createLicense.storage_size')}
										placeholder={tr('createLicense.storage_size')}
										error={errors.storageSize ? true : false}
										helperText={errors.storageSize?.message}
										onChange={(e) => onChange(e.target.value)}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Controller
								control={control}
								name="price"
								defaultValue={props.valueEdit.price}
								render={({ field: { onChange } }) => (
									<TextField
										variant="outlined"
										fullWidth
										name="price"
										defaultValue={props.valueEdit.price}
										id="price"
										InputProps={{
											inputComponent: NumberFormatCustom,
											startAdornment: <InputAdornment position="start">$</InputAdornment>,
										}}
										label={tr('createLicense.price')}
										placeholder={tr('createLicense.price')}
										error={errors.price ? true : false}
										helperText={errors.price?.message}
										onChange={(e) => onChange(e.target.value)}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button
								variant="contained"
								color="primary"
								type="submit"
								//className={classes.button}
								startIcon={<SaveIcon />}
							>
								Save
							</Button>
						</Grid>
					</Grid>
				</Grid>

				<Box mt={5}>
					<Copyright />
				</Box>
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
		</Container>
	);
};
export default CreateLicense;
