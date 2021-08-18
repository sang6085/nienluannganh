import React, { useEffect } from 'react';
import { Box, Dialog, Grid, makeStyles } from '@material-ui/core';
import MUIDataTableComponent from '../../Components/Table/MUIDataTableComponent';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '../../Components/TextField/TextField';
import ButtonComponent from '../../Components/Button/ButtonComponent';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '../../Components/Button/IconButton';
import { Close } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import CreateLicense from './CreateLicense';
import { Controller, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { LicenseDelete, LicenseGet } from '../../api/LicenseAPI';
import { toast, ToastContainer } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
	closeButton: {
		position: 'absolute',
		top: theme.spacing(1),
		right: theme.spacing(1),
		color: theme.palette.grey[500],
		zIndex: 1,
	},
}));

const License: React.FC = () => {
	const [open, setOpen] = React.useState(false);
	const [flag, setFlag] = React.useState(false);
	const [totalPage, setTotalPage] = React.useState(0);
	const [valueEdit, setValueEdit] = React.useState({
		id: 0,
		name: '',
		number: '',
		noDay: 0,
		noMonth: 0,
		noYear: 0,
		storageSize: 0,
		price: 0,
	});
	const [t] = useTranslation();
	const [filterSearch, setFilterSearch] = React.useState<any>({
		name: '',
		description: '',
	});
	const [valueSearch, setValueSearch] = React.useState<any>({
		Search: '',
		Order: 'ASC',
		Page: 0,
		PageSize: 5,
	});
	const column = [
		{
			name: t('license.action'),
			options: {
				filter: false,
				sort: false,
				empty: true,
				customBodyRenderLite: (value: any) => {
					return (
						<React.Fragment>
							<IconButton onClick={() => handleEdit(value)}>
								<CreateIcon color="primary" />
							</IconButton>
							<IconButton onClick={() => handleDelete(value)}>
								<DeleteIcon color="secondary" />
							</IconButton>
						</React.Fragment>
					);
				},
			},
		},
		{
			name: 'number',
			label: t('license.number'),
			options: {
				sort: false,
			},
		},

		{
			name: 'name',
			label: t('license.name'),
			options: {
				sort: true,
			},
		},
		{
			name: 'noDay',
			label: t('license.day'),
			options: {
				sort: true,
			},
		},
		{
			name: 'noMonth',
			label: t('license.month'),
			options: {
				sort: true,
			},
		},
		{
			name: 'noYear',
			label: t('license.year'),
			options: {
				sort: true,
			},
		},
		{
			name: 'storageSize',
			label: t('license.storage_size'),
			options: {
				sort: true,
			},
		},
		{
			name: 'price',
			label: t('license.price'),
			options: {
				sort: true,
			},
		},
	];
	const textTable = {
		pagination: {
			rowsPerPage: t('document.rows_per_page'),
			displayRows: t('document.display_rows'),
			jumpToPage: t('document.jump_to_page'),
		},
	};
	const [titleDialog, setTitleDialog] = React.useState<string>('');
	const handleClickOpen = () => {
		setOpen(true);
		setTitleDialog('create_license');
		setValueEdit({
			id: 0,
			name: '',
			number: '',
			noDay: 0,
			noMonth: 0,
			noYear: 0,
			storageSize: 0,
			price: 0,
		});
	};

	const handleClose = () => {
		setOpen(false);
	};

	const { control, handleSubmit, reset } = useForm({
		defaultValues: filterSearch,
	});

	const handleClickClear = () => {
		reset({ name: '', description: '' });
		setFilterSearch({ name: '', description: '' });
		setValueSearch({ Search: filterSearch.name, Order: 'ASC', Page: 0, PageSize: 5 });
		setInit({ ...init, page: 0 });
	};
	const handleSubmitSearch = (data: any) => {
		setValueSearch({ ...valueSearch, Page: 0, Search: data.name });
	};

	const handleEdit = (value: any) => {
		setOpen(true);
		setTitleDialog('edit_license');
		setValueEdit(data[value]);
	};

	const handleDelete = (value: any) => {
		Swal.fire({
			title: t('confirmDelete.are_you_sure'),
			text: t('confirmDelete.you_wont_be_able_to_revert_this'),
			icon: 'warning',
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: t('confirmDelete.yes'),
			cancelButtonText: t('confirmDelete.cancel'),
			showCancelButton: true,
			reverseButtons: true,
		}).then(async (result) => {
			if (result.isConfirmed) {
				const response = await LicenseDelete(data[value].id);
				if (response?.errorCode === null) {
					Swal.fire(
						t('confirmDelete.deleted'),
						t('confirmDelete.your_file_has_been_deleted'),
						'success'
					);
					setFlag(!flag);
				}
			}
		});
	};
	const [init, setInit] = React.useState<any>({ page: 0, rowPerPage: 5 });
	const [data, setData] = React.useState<any>([]);
	useEffect(() => {
		const fetchLicense = async () => {
			const list = await LicenseGet(valueSearch);
			setData(list?.data?.listData);
			if (list?.data?.totalCount) setTotalPage(list?.data?.totalCount);
		};
		fetchLicense();
	}, [flag, valueSearch]);

	const classes = useStyles();
	const create: (result: boolean, id: number) => void = async (result, id) => {
		if (result) {
			toast.info(t(id === 0 ? 'createLicense.license_created' : 'createLicense.license_updated'));
			setOpen(false);
			setFlag(!flag);
		}
	};
	return (
		<>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Grid container justify="flex-end">
						<AddCircleIcon
							color="primary"
							fontSize="large"
							onClick={handleClickOpen}
						></AddCircleIcon>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<form onSubmit={handleSubmit(handleSubmitSearch)}>
						<Box boxShadow={3} p={3} style={{ backgroundColor: 'white' }}>
							<Grid container justify="center" spacing={3}>
								<Grid item xs={6}>
									<Controller
										control={control}
										name="name"
										defaultValue={valueSearch.Search}
										render={({ field: { onChange } }) => (
											<TextField
												label={t('license.name')}
												variant="outlined"
												fullWidth
												name="name"
												defaultValue={valueSearch.Search}
												onChange={(e) => onChange(e.target.value)}
											/>
										)}
									/>
								</Grid>
								<Grid item xs={6}>
									<Controller
										control={control}
										name="description"
										defaultValue={filterSearch.description}
										render={({ field: { onChange } }) => (
											<TextField
												label={t('license.description')}
												variant="outlined"
												fullWidth
												name="description"
												onChange={(e) => onChange(e.target.value)}
											/>
										)}
									/>
								</Grid>

								<Grid item xs={6}>
									<Grid container justify="flex-end" spacing={5}>
										<Grid item>
											<ButtonComponent type="submit">{t('license.search')}</ButtonComponent>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={6}>
									<Grid container justify="flex-start" spacing={5}>
										<Grid item>
											<ButtonComponent color="secondary" type="reset" onClick={handleClickClear}>
												{t('license.clear')}
											</ButtonComponent>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Box>
					</form>
				</Grid>
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
			<Box mt={3}>
				<MUIDataTableComponent
					columns={column}
					data={data}
					options={{
						rowsPerPageOption: [5, 10, 30],
						rowsPerPage: init.rowPerPage,
						count: totalPage,
						page: init.page,
						pagination: true,
						jumpToPage: true,
						download: false,
						filter: false,
						selectableRows: 'none',
						responsive: 'vertical',
						viewColumns: false,
						print: false,
						search: false,
						textLabels: textTable,
						onChangePage: (currentPage: number) => {
							setValueSearch({
								...valueSearch,
								Page: 0,
								PageSize: currentPage * init.rowPerPage + init.rowPerPage,
							});
							setInit({ ...init, page: currentPage });
						},
						onChangeRowsPerPage: (numberOfRows: number) => {
							setValueSearch({
								...valueSearch,
								Page: 0,
								PageSize: numberOfRows,
							});
							setInit({ page: 0, rowPerPage: numberOfRows });
						},
					}}
				></MUIDataTableComponent>
			</Box>
			<Dialog
				disableBackdropClick
				disableEscapeKeyDown
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<IconButton className={classes.closeButton} onClick={handleClose}>
					<Close />
				</IconButton>
				<DialogContent>
					<CreateLicense titleDialog={titleDialog} create={create} valueEdit={valueEdit} />
				</DialogContent>
			</Dialog>
		</>
	);
};
export default License;
