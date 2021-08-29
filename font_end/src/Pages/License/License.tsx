import React, { useState } from 'react';
import {
	Box,
	CircularProgress,
	Dialog,
	DialogTitle,
	Grid,
	makeStyles,
	Menu,
	MenuItem,
	Typography,
} from '@material-ui/core';
import MUIDataTableComponent from '../../Components/Table/MUIDataTableComponent';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TextField from '../../Components/TextField/TextField';
import ButtonComponent from '../../Components/Button/ButtonComponent';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '../../Components/Button/IconButton';
import { Close } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
//import { UserInTenantDTO } from '../../DTO/response/Tenant';
import { useEffect } from 'react';
//import { UserGet } from '../../api/TenantApi';
import { toast, ToastContainer } from 'react-toastify';
import { UserDelete, UserGet } from '../../Api/UserAPI';
import EditIcon from '@material-ui/icons/Edit';
import Swal from 'sweetalert2';
import { LicenseDelete, LicenseGet, LicenseGETId } from '../../Api/License';
import prettyBytes from 'pretty-bytes';
import CreateLicense from './CreateLicense';

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
	const [t] = useTranslation();
	const [filterSearch, setFilterSearch] = React.useState<any>({
		search: '',
		page: 0,
		// Order: 'asc',
		pageSize: 5,
	});
	const [valChange, setValChange] = React.useState<any>('');
	const [data, setData] = React.useState<any>([]);
	const [flag, setFlag] = React.useState(false);
	const [totalDoc, setTotalDoc] = useState<number>(0);
	const [pageTB, setPageTB] = useState<number>(0);
	const [rowPage, setRowPage] = useState<number>(5);
	const [styleOnClick, setStyleOnClick] = React.useState<any>(-1);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [valueEdit, setValueEdit] = React.useState({
		id: 0,
		name: '',
		//noDay: 0,
		noMonth: 0,
		//noYear: 0,
		storageSize: 0,
		price: 0,
	});
	const handleClickLicense = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
		setAnchorEl(event.currentTarget);
		setStyleOnClick(data[index].id);
	};

	const handleCloseLicense = () => {
		setAnchorEl(null);
	};
	const [titleDialog, setTitleDialog] = React.useState('');
	const handleEditLicense = async (index: number) => {
		setAnchorEl(null);
		const response = await LicenseGETId(data[index].id);
		if (response.errorCode === null) {
			setValueEdit({
				id: data[index].id,
				name: response.data.name,
				noMonth: response.data.noMonth,
				storageSize: response.data.storageSize,
				price: response.data.price,
			});
			setTitleDialog('edit');
			setOpen(true);
		}
	};
	const handleDelete = (index: number) => {
		setAnchorEl(null);
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
				const response = await LicenseDelete(data[index].id);
				if (response?.errorCode === null) {
					Swal.fire(
						t('confirmDelete.deleted'),
						t('confirmDelete.your_file_has_been_deleted'),
						'success'
					);
					setFlag(!flag);
				} else if (response.errorCode === 12) {
					Swal.fire('Khoong the xoas', '', 'error');
				} else {
					Swal.fire('Khoong the xoas', '', 'error');
				}
			}
		});
	};
	const column = [
		{
			name: 'id',
			label: t('tenant.action'),
			options: {
				filter: false,
				sort: false,
				empty: true,
				customBodyRenderLite: (index: number) => {
					return (
						<React.Fragment>
							<IconButton onClick={(e) => handleClickLicense(e, index)}>
								{/* <DeleteIcon /> */}
								<MoreVertIcon />
							</IconButton>
							<Menu
								id="simple-menu"
								anchorEl={anchorEl}
								keepMounted
								open={Boolean(styleOnClick === data[index].id ? anchorEl : null)}
								onClose={handleCloseLicense}
							>
								<MenuItem onClick={() => handleEditLicense(index)}>
									<EditIcon />
									&nbsp;&nbsp;&nbsp;<Typography variant="body2">{t('tenant.edit')}</Typography>
								</MenuItem>
								<MenuItem onClick={() => handleDelete(index)}>
									<DeleteIcon />
									&nbsp;&nbsp;&nbsp;<Typography variant="body2">{t('tenant.delete')}</Typography>
								</MenuItem>
							</Menu>
						</React.Fragment>
					);
				},
			},
		},

		{
			name: 'name',
			label: t('license.name'),
			options: {
				sort: true,
			},
		},
		// {
		// 	name: 'noDay',
		// 	label: t('license.day'),
		// 	options: {
		// 		sort: true,
		// 	},
		// },
		{
			name: 'noMonth',
			label: t('license.month'),
			options: {
				sort: true,
			},
		},
		// {
		// 	name: 'noYear',
		// 	label: t('license.year'),
		// 	options: {
		// 		sort: true,
		// 	},
		// },
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
	const [progress, setProgress] = React.useState(false);
	const textTable = {
		pagination: {
			rowsPerPage: t('document.rows_per_page'),
			displayRows: t('document.display_rows'),
			jumpToPage: t('document.jump_to_page'),
		},
		body: {
			//noMatch: t('tenant.no_match'),
			noMatch: progress ? <CircularProgress /> : t('tenant.no_match'),
		},
	};

	const handleClickOpen = () => {
		setOpen(true);
		setTitleDialog('create_new');
		setValueEdit({
			id: 0,
			name: '',
			//noDay: 0,
			noMonth: 0,
			//noYear: 0,
			storageSize: 0,
			price: 0,
		});
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValChange(e.target.value);
	};
	const handleClickClear = () => {
		setFilterSearch({
			...filterSearch,
			search: '',
		});
		setValChange('');
	};
	const handleClick = () => {
		setFilterSearch({
			...filterSearch,
			search: valChange,
		});
	};
	const classes = useStyles();

	useEffect(() => {
		const fetchLicense = async () => {
			setProgress(true);
			const result = await LicenseGet(filterSearch);
			if (result?.data?.listData) {
				const dataNew = result?.data?.listData.map((item: any) => {
					return {
						id: item.id,
						name: item.name,
						noMonth: item.noMonth,
						noDay: item.noDay,
						noYear: item.noYear,
						storageSize: prettyBytes(item.storageSize),
						price: item.price,
					};
				});
				setData(dataNew);

				setProgress(false);
				setTotalDoc(result?.data?.totalCount);
			}
		};
		fetchLicense();
	}, [filterSearch, flag]);
	const create: (result: boolean) => void = async (result) => {
		if (result) {
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
					<Box boxShadow={3} p={3} style={{ backgroundColor: 'white' }}>
						<Grid container justify="center" spacing={3}>
							<Grid item xs={12}>
								<TextField
									label={t('tenant.name')}
									variant="outlined"
									fullWidth
									value={valChange}
									onChange={handleChangeSearch}
								/>
							</Grid>

							<Grid item xs={6}>
								<Grid container justify="flex-end" spacing={5}>
									<Grid item>
										<ButtonComponent onClick={handleClick}>{t('tenant.search')}</ButtonComponent>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={6}>
								<Grid container justify="flex-start" spacing={5}>
									<Grid item>
										<ButtonComponent color="secondary" onClick={handleClickClear}>
											{t('tenant.clear')}
										</ButtonComponent>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Box>
				</Grid>
			</Grid>
			<Box mt={3}>
				<MUIDataTableComponent
					columns={column}
					data={data}
					options={{
						rowsPerPageOption: [5, 10, 20],
						rowsPerPage: rowPage,
						count: totalDoc,
						page: pageTB,
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
							setFilterSearch({
								...filterSearch,
								pageSize: currentPage * rowPage + rowPage,
							});

							setPageTB(currentPage);
						},
						onChangeRowsPerPage: (numberOfRows: number) => {
							setFilterSearch({
								...filterSearch,
								pageSize: numberOfRows,
							});
							setRowPage(numberOfRows);
							setPageTB(0);
						},
					}}
				></MUIDataTableComponent>
			</Box>
			<Dialog
				//disableBackdropClick
				//disableEscapeKeyDown
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">{t('tenant.' + titleDialog)}</DialogTitle>
				<IconButton className={classes.closeButton} onClick={handleClose}>
					<Close />
				</IconButton>
				<DialogContent>
					<CreateLicense valueEdit={valueEdit} create={create} />
				</DialogContent>
			</Dialog>
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
};
export default License;
