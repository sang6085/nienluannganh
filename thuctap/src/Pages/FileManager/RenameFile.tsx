import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import ButtonComponent from '../../Components/Button/ButtonComponent';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContainer } from 'react-toastify';
import TextField from '../../Components/TextField/TextField';
import { LinearProgress } from '@material-ui/core';
import { RenamePost } from '../../api/FileAPI';
import { RenameFileDTO } from '../../DTO/File/RenameFileDTO';

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
interface RenameFileProps {
	closeDialog?: () => void;
	titleDialog: string;
	create?: (result: boolean) => void;
	valueEdit?: any;
}
const RenameFile: React.FC<RenameFileProps> = (props) => {
	const classes = useStyles();
	const [tr] = useTranslation();
	const closeDialog = props.closeDialog;
	if (closeDialog) {
		closeDialog();
	}
	const schema = yup.object().shape({
		newName: yup.string().required(tr('renameFile.the_name_field_is_required')),
	});
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = async (data: RenameFileDTO) => {
		const response = await RenamePost(data);
		if (response?.errorCode === null) {
			props?.create?.(true);
		} else {
			toast.error(tr('createLicense.license_error'));
		}
	};
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<form onSubmit={handleSubmit(onSubmit)}>
				{isSubmitting && <LinearProgress className={classes.progress} />}

				<div className={classes.paper}>
					<Typography component="h1" variant="h5">
						{tr('renameFile.' + props.titleDialog)}
					</Typography>
					<Grid xs={12} className={classes.form}>
						<Grid item xs={12}>
							<Grid item xs={12}>
								<Controller
									control={control}
									name="id"
									defaultValue={props.valueEdit.id}
									render={() => (
										<TextField name="id" defaultValue={props.valueEdit.id} type="hidden" />
									)}
								/>
								<Controller
									control={control}
									name="newName"
									defaultValue={props.valueEdit.name}
									render={({ field: { onChange } }) => (
										<TextField
											variant="outlined"
											fullWidth
											name="newName"
											defaultValue={props.valueEdit.name}
											id="newName"
											label={tr('renameFile.name') + ' *'}
											placeholder={tr('renameFile.name') + ' *'}
											error={errors.newName ? true : false}
											helperText={errors.newName?.message}
											onChange={(e) => onChange(e.target.value)}
										/>
									)}
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
							{tr('renameFile.save')}
						</ButtonComponent>
					</Grid>
				</div>
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
export default RenameFile;
