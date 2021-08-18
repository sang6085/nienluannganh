import React, { useState } from 'react';
import { Box, Dialog, Grid, makeStyles } from '@material-ui/core';
import MUIDataTableComponent from '../../Components/Table/MUIDataTableComponent';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TextField from '../../Components/TextField/TextField';
import ButtonComponent from '../../Components/Button/ButtonComponent';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '../../Components/Button/IconButton';
import { Close } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import CreateUser from './CreateUser';
import DeleteIcon from '@material-ui/icons/Delete';
import { UserInTenantDTO } from '../../DTO/response/Tenant';
import { useEffect } from 'react';
import { UserGet } from '../../api/TenantApi';
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

const Tenant: React.FC = () => {
	const [open, setOpen] = React.useState(false);
	const [t] = useTranslation();
	const [filterSearch, setFilterSearch] = React.useState<any>({
		Search: '',
		Page: 0,
		Order: 'asc',
		PageSize: 5,
	});
	const [valChange, setValChange] = React.useState<any>('');
	const [data, setData] = React.useState<UserInTenantDTO[]>([]);
	const [flag, setFlag] = React.useState(false);
	const [totalDoc, setTotalDoc] = useState<number>(0);
	const [pageTB, setPageTB] = useState<number>(0);
	const [rowPage, setRowPage] = useState<number>(5);
	const column = [
		{
			name: 'id',
			label: t('tenant.action'),
			options: {
				filter: false,
				sort: false,
				empty: true,
				customBodyRenderLite: () => {
					return (
						<React.Fragment>
							<IconButton onClick={() => alert('Click Delete')}>
								<DeleteIcon color="secondary" />
							</IconButton>
						</React.Fragment>
					);
				},
			},
		},
		{
			name: 'name',
			label: t('tenant.name'),
			options: {
				sort: true,
			},
		},
		{
			name: 'loginName',
			label: t('tenant.login_name'),
			options: {
				sort: false,
			},
		},
	];
	const textTable = {
		pagination: {
			rowsPerPage: t('document.rows_per_page'),
			displayRows: t('document.display_rows'),
			jumpToPage: t('document.jump_to_page'),
		},
		body: {
			noMatch: t('tenant.no_match'),
		},
	};
	const [titleDialog, setTitleDialog] = React.useState<string>('');
	const handleClickOpen = () => {
		setOpen(true);
		setTitleDialog('add_user');
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
			Search: '',
		});
		setValChange('');
	};
	const handleClick = () => {
		setFilterSearch({
			...filterSearch,
			Search: valChange,
		});
	};
	const classes = useStyles();
	useEffect(() => {
		const fetchUser = async () => {
			const result = await UserGet(filterSearch);
			if (result?.data?.listData) {
				setData(result.data.listData);
			}
			if (result?.data?.totalCount) {
				setTotalDoc(result?.data?.totalCount);
			}
		};
		fetchUser();
	}, [filterSearch, flag]);
	const create: (result: boolean) => void = async (result) => {
		if (result) {
			toast.info(t('tenant.create_tenant'));
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
								PageSize: currentPage * rowPage + rowPage,
							});

							setPageTB(currentPage);
						},
						onChangeRowsPerPage: (numberOfRows: number) => {
							setFilterSearch({
								...filterSearch,
								PageSize: numberOfRows,
							});
							setRowPage(numberOfRows);
							setPageTB(0);
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
					<CreateUser titleDialog={titleDialog} create={create} />
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
export default Tenant;
