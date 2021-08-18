import React from 'react';
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
import CreateCategory from './CreateCategory';
import Swal from 'sweetalert2';
import { CategoryDelete, CategoryGet } from '../../api/CategoryApi';

const useStyles = makeStyles((theme) => ({
	closeButton: {
		position: 'absolute',
		top: theme.spacing(1),
		right: theme.spacing(1),
		color: theme.palette.grey[500],
		zIndex: 1,
	},
}));

const CategoryList: React.FC = () => {
	const [open, setOpen] = React.useState(false);
	const [t] = useTranslation();
	const [filterSearch, setFilterSearch] = React.useState<any>({
		name: '',
		description: '',
		from_date: '',
		to_date: '',
	});
	const [search, setSearch] = React.useState<any>('');
	const column = [
		{
			name: t('category.action'),
			options: {
				filter: false,
				sort: false,
				empty: true,
				customBodyRenderLite: (index: number) => {
					return (
						<React.Fragment>
							<IconButton
								onClick={() => {
									setOpen(true);
									setTitleDialog('edit_category');
									setUpdate(data[index]);
								}}
							>
								<CreateIcon color="primary" />
							</IconButton>
							<IconButton
								onClick={() => {
									deleteCategory(index);
								}}
							>
								<DeleteIcon color="secondary" />
							</IconButton>
						</React.Fragment>
					);
				},
			},
		},
		{
			name: 'name',
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
		setTitleDialog('create_category');
		setUpdate({ id: 0, name: '' });
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChangeSearch = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilterSearch({
			...filterSearch,
			[name]: e.target.value,
		});
	};
	const handleClickClear = () => {
		setFilterSearch({
			name: '',
			description: '',
			from_date: '',
			to_date: '',
		});
		setGetAll({ ...getAll, Search: '' });
		setCreate(!create);
	};
	const handleSubmitSearch = () => {
		setGetAll({ ...getAll, Search: filterSearch.name });
		setCreate(!create);
	};

	const classes = useStyles();
	const [data, setData] = React.useState<any>([]);
	const [create, setCreate] = React.useState<boolean>(true);
	const [totalCount, setTotalCount] = React.useState<number>();
	const [page, setPage] = React.useState<number>(0);
	const [rowPage, setRowPage] = React.useState<number>(5);
	const [getAll, setGetAll] = React.useState<any>({
		Search: search,
		Order: '',
		Page: page,
		PageSize: rowPage,
	});

	const [update, setUpdate] = React.useState<any>({ id: 0, name: '' });

	const deleteCategory = (index: number) => {
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
				const deleteCategory = await CategoryDelete(data[index].id);
				if (deleteCategory?.errorCode == null) {
					Swal.fire(
						t('confirmDelete.deleted'),
						t('confirmDelete.your_file_has_been_deleted'),
						'success'
					);
					setCreate(!create);
				}
			}
		});
	};

	React.useEffect(() => {
		const fetchCategory = async () => {
			const res = await CategoryGet(getAll);
			setData(res?.data?.listData);
			if (res?.data?.totalCount) {
				setTotalCount(res.data.totalCount);
			}
		};
		fetchCategory();
	}, [getAll, create, search]);

	const flag: (result: boolean) => void = (result) => {
		if (result) {
			setOpen(false);
			setCreate(!create);
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
							<Grid item xs={6}>
								<TextField
									label={t('category.name')}
									variant="outlined"
									fullWidth
									value={filterSearch.name}
									onChange={handleChangeSearch('name')}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									label={t('category.description')}
									variant="outlined"
									fullWidth
									value={filterSearch.description}
									onChange={handleChangeSearch('description')}
								/>
							</Grid>

							<Grid item xs={6}>
								<Grid container justify="flex-end" spacing={5}>
									<Grid item>
										<ButtonComponent onClick={handleSubmitSearch}>
											{t('category.search')}
										</ButtonComponent>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={6}>
								<Grid container justify="flex-start" spacing={5}>
									<Grid item>
										<ButtonComponent color="secondary" onClick={handleClickClear}>
											{t('category.clear')}
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
						rowsPerPageOption: [5, 10, 15, 20],
						rowsPerPage: rowPage,
						count: totalCount,
						page: page,
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
						onSearchChange: (searchText: any) => {
							setSearch(searchText);
						},
						onChangePage: (currentPage: number) => {
							setPage(currentPage);
							setGetAll({ ...getAll, PageSize: currentPage * rowPage + rowPage });
						},
						onChangeRowsPerPage: (numberOfRows: number) => {
							setRowPage(numberOfRows);
							setGetAll({ ...getAll, PageSize: numberOfRows });
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
					<CreateCategory titleDialog={titleDialog} flag={flag} update={update} />
				</DialogContent>
			</Dialog>
		</>
	);
};
export default CategoryList;
