import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Chip, LinearProgress, TextField } from '@material-ui/core';
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
import { FolderPost, ShareDeletePost, ShareFolderPost } from '../../Api/FolderAPI';
import { RenameFilePost } from '../../Api/FileAPI';
import Message from '../../Notifi/Message';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Stack } from '@mui/material';

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
	closeDialog?: (result: boolean) => void;
	flag?: (result: boolean) => void;
	value?: any;
	flagRenameFile?: boolean;
}
const ShareFolder: React.FC<CreateDocumentProps> = (props) => {
	const classes = useStyles();
	const [tr] = useTranslation();
	const closeDialog = props.closeDialog;
	//const createID = React.useRef<HTMLInputElement>(null);
	const createNameCategory = React.useRef<HTMLInputElement>(null);
	//const createDescriptionCategory = React.useRef<HTMLInputElement>(null);

	const onSubmit = async (data: any) => {
		const response = await ShareFolderPost({
			idFolder: data.id,
			name: data.name,
			folderName: props.value.folderName,
		});
		if (response) {
			if (response.errorCode === null) {
				Swal.fire({
					icon: 'success',
					title: `Bạn đã chia sẻ thành công đến ${data.name}`,
				});
				props.flag?.(true);
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Có lỗi xảy ra',
				});
			}
		}
	};

	const schema = yup.object().shape({
		name: yup.string().required('Please enter category name'),
	});

	const {
		control,
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const handleDelete = async (item: any) => {
		const response = await ShareDeletePost({ idFolder: item.idFolder, name: item.shareTo });
		if (response) {
			if (response.errorCode === null) {
				Swal.fire({
					icon: 'success',
					title: 'Xoa thanh cong',
				});
				props.flag?.(true);
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Có lỗi xảy ra',
				});
			}
		}
	};
	return (
		<Container component="main" maxWidth="xs">
			<Message />
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
						<TextField
							{...register('name')}
							variant="outlined"
							disabled={false}
							label="Nhap ten nguoi chia se"
							type="text"
							id="name"
							name="name"
							placeholder="Nhap ten nguoi chia se"
							fullWidth={true}
							error={errors.name ? true : false}
							helperText={errors.name?.message}
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
							{tr('document.save')}
						</Button>
						&nbsp;&nbsp;&nbsp;
						<Button
							variant="contained"
							color="secondary"
							onClick={() => props.closeDialog?.(true)}
							//className={classes.button}
							startIcon={<CancelIcon />}
						>
							{tr('document.cancel')}
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Stack direction="row" spacing={1}>
							{props.value.name &&
								props?.value?.name?.map((item: any) => {
									return (
										<Chip
											label={item.shareTo}
											variant="outlined"
											onDelete={() => handleDelete(item)}
										/>
									);
								})}
						</Stack>
					</Grid>
				</Grid>
			</form>

			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
};
export default ShareFolder;
