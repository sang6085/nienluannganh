import { yupResolver } from '@hookform/resolvers/yup';
import { Button, LinearProgress, TextField } from '@material-ui/core';
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
import SaveIcon from '@material-ui/icons/Save';
import * as yup from 'yup';
import CancelIcon from '@material-ui/icons/Cancel';
import { FolderPost } from '../../Api/FolderAPI';
import { RenameFilePost } from '../../Api/FileAPI';

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
		paddingTop: theme.spacing(7),
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
interface CreateDocumentProps {
	closeDialog?: () => void;
	flag?: (result: boolean) => void;
	value?: any;
	flagRenameFile?: boolean;
}
const CreateDocument: React.FC<CreateDocumentProps> = (props) => {
	const classes = useStyles();
	const [tr] = useTranslation();
	const closeDialog = props.closeDialog;
	//const createID = React.useRef<HTMLInputElement>(null);
	const createNameCategory = React.useRef<HTMLInputElement>(null);
	//const createDescriptionCategory = React.useRef<HTMLInputElement>(null);

	if (closeDialog) {
		closeDialog();
	}

	const onSubmit = async (data: any) => {
		if (props.flagRenameFile) {
			const post = await RenameFilePost(data);
			if (post?.errorCode === null) {
				props?.flag?.(true);
				console.log('thanh cong');
			} else {
				console.log('that bai');
			}
		} else {
			const post = await FolderPost(data);
			if (post?.errorCode === null) {
				props?.flag?.(true);
				console.log('thanh cong');
			} else {
				console.log('that bai');
			}
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
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Controller
							control={control}
							name="id"
							defaultValue={props.value.id}
							render={({ field: { onChange } }) => (
								<TextField
									onChange={(e) => onChange(e.target.value)}
									name="id"
									id="id"
									defaultValue={props.value.id}
									type="hidden"
								/>
							)}
						/>
						<Controller
							control={control}
							name="parentId"
							defaultValue={props.value.parentId}
							render={({ field: { onChange } }) => (
								<TextField
									onChange={(e) => onChange(e.target.value)}
									name="parentId"
									id="parentId"
									defaultValue={props.value.parentId}
									type="hidden"
								/>
							)}
						/>
						<Controller
							control={control}
							name="name"
							defaultValue={props.value.name}
							render={({ field: { onChange } }) => (
								<TextField
									onChange={(e) => onChange(e.target.value)}
									variant="outlined"
									fullWidth
									name="name"
									id="name"
									defaultValue={props.value.name}
									label={tr('createCategory.name')}
									inputRef={createNameCategory}
									error={errors.name ? true : false}
									helperText={errors.name?.message}
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
						&nbsp;&nbsp;&nbsp;
						<Button
							variant="contained"
							color="secondary"
							type="submit"
							//className={classes.button}
							startIcon={<CancelIcon />}
						>
							Cancel
						</Button>
					</Grid>
				</Grid>
			</form>

			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
};
export default CreateDocument;
