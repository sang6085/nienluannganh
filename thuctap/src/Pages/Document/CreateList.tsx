import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Autocomplete } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CategoyrGet } from '../../api/CategoryApi';
import { DocumentPost } from '../../api/DocumentApi';
import ButtonComponent from '../../Components/Button/ButtonComponent';
import { SelectItemDTO } from '../../DTO/Category/SelectItemDTO';
import * as yup from 'yup';
import { LinearProgress } from '@material-ui/core';

export interface CreateListProps {
	closeDialog?: () => void;
	create?: (result: boolean, id: number) => void;
	titleDialog: string;
	update?: any;
	defVal?: string;
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
		margin: theme.spacing(2),
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
}));

const CreateList: React.FC<CreateListProps> = (props) => {
	const classes = useStyles();
	const [tr] = useTranslation();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [option, setOption] = useState<SelectItemDTO[]>([]);
	const closeDialog = props.closeDialog;
	if (closeDialog) {
		closeDialog();
	}

	useEffect(() => {
		const fetchCategory = async () => {
			const list = await CategoyrGet();
			if (list?.data?.options) {
				setOption(list.data.options);
			}
		};
		fetchCategory();
	}, []);
	const optionCategory = option.map((option) => {
		return { id: option.key, name: option.text };
	});
	const schema = yup.object().shape({
		name: yup.string().required(tr('createDocument.the_name_field_is_required')),
		categoryId: yup.string().required(tr('createDocument.please_select_a_category')),
	});
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = (data: any) => {
		setIsSubmitting(true);
		optionCategory.map(async (item) => {
			if (item.name == data.categoryId) {
				if (props.update.id != 0) {
					const response = await DocumentPost({
						id: props.update.id,
						name: data.name,
						categoryId: item.id,
					});
					if (response?.errorCode === null && props.update.id) {
						props?.create?.(true, 1);
						setIsSubmitting(false);
					} else {
						toast.error(tr('createDocument.document_error_update'));
						setIsSubmitting(false);
					}
				} else {
					const response = await DocumentPost({ name: data.name, categoryId: item.id });

					if (response?.errorCode === null) {
						setIsSubmitting(false);
						props?.create?.(true, 0);
					} else {
						toast.error(tr('createDocument.document_error'));
						setIsSubmitting(false);
					}
				}
			}
		});
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<form onSubmit={handleSubmit(onSubmit)} className={classes.paper}>
				{isSubmitting ? <LinearProgress className={classes.progress} /> : ''}
				<Typography component="h1" variant="h5">
					{tr('createDocument.' + props.titleDialog)}
				</Typography>
				<Grid xs={12} className={classes.form}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Controller
								control={control}
								name="id"
								defaultValue={props.update.id}
								render={() => <TextField name="id" defaultValue={props.update.id} type="hidden" />}
							/>
							<Controller
								control={control}
								name="name"
								defaultValue={props.update.name}
								render={({ field: { onChange } }) => (
									<TextField
										variant="outlined"
										name="name"
										fullWidth
										label={tr('createDocument.name') + ' *'}
										error={errors.name ? true : false}
										helperText={errors.name?.message}
										defaultValue={props.update.name}
										onChange={(e) => onChange(e.target.value)}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Autocomplete
								options={optionCategory}
								{...register('categoryId')}
								getOptionLabel={(option) => option.name}
								getOptionSelected={(option, value) => option.id === value.id}
								defaultValue={
									props.update.id != 0
										? {
												id: props.update.categoryId.toString(),
												name: props.defVal ? props.defVal : '',
										  }
										: { id: '', name: '' }
								}
								renderInput={(params) => (
									<TextField
										{...params}
										variant="outlined"
										name="categoryId"
										fullWidth
										label={tr('createDocument.category') + ' *'}
										error={errors.categoryId ? true : false}
										helperText={errors.categoryId?.message}
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
						{tr('createDocument.' + props.titleDialog)}
					</ButtonComponent>

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
				</Grid>
			</form>
		</Container>
	);
};
export default CreateList;
