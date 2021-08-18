import { yupResolver } from '@hookform/resolvers/yup';
import { LinearProgress } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { CategoryPost } from '../../api/CategoryApi';
import ButtonComponent from '../../Components/Button/ButtonComponent';
import TextField from '../../Components/TextField/TextField';
import { CategoryResponsePost } from '../../DTO/response/Category';

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
		marginTop: theme.spacing(4),
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
interface CreateCategoryProps {
	closeDialog?: () => void;
	titleDialog: string;
	flag?: (result: boolean) => void;
	update?: any;
}
const CreateCategory: React.FC<CreateCategoryProps> = (props) => {
	const classes = useStyles();
	const [tr] = useTranslation();
	const closeDialog = props.closeDialog;
	//const createID = React.useRef<HTMLInputElement>(null);
	const createNameCategory = React.useRef<HTMLInputElement>(null);
	//const createDescriptionCategory = React.useRef<HTMLInputElement>(null);

	if (closeDialog) {
		closeDialog();
	}

	const createCategory = async (data: CategoryResponsePost) => {
		const post = await CategoryPost(data);
		if (post?.errorCode === null) {
			props?.flag?.(true);
		} else {
		}
	};

	const schema = yup.object().shape({
		name: yup.string().required('Please enter category name'),
	});

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<form onSubmit={handleSubmit(createCategory)}>
					{isSubmitting && <LinearProgress className={classes.progress} />}
					<Typography component="h1" variant="h5">
						{tr('createCategory.' + props.titleDialog)}
					</Typography>
					<Grid xs={12} className={classes.form}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Controller
									control={control}
									name="id"
									defaultValue={props.update.id}
									render={({ field: { onChange } }) => (
										<TextField
											onChange={(e) => onChange(e.target.value)}
											name="id"
											id="id"
											defaultValue={props.update.id}
											type="hidden"
										/>
									)}
								/>
								<Controller
									control={control}
									name="name"
									defaultValue={props.update.name}
									render={({ field: { onChange } }) => (
										<TextField
											onChange={(e) => onChange(e.target.value)}
											variant="outlined"
											fullWidth
											name="name"
											id="name"
											defaultValue={props.update.name}
											label={tr('createCategory.name')}
											inputRef={createNameCategory}
											error={errors.name ? true : false}
											helperText={errors.name?.message}
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
							{tr('createCategory.' + props.titleDialog)}
						</ButtonComponent>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
};
export default CreateCategory;
