import { Box, Dialog, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import MUIDataTableComponent from '../../Components/Table/MUIDataTableComponent';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '../../Components/TextField/TextField';
import AutoCompleteComponent from '../../Components/AutoComplete/AutoComplete';
// import DateComponent from '../../Components/DateTimePicker/DateComponent';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import ButtonComponent from '../../Components/Button/ButtonComponent';
import DialogContent from '@material-ui/core/DialogContent';
import CreateList from './CreateList';
import IconButton from '../../Components/Button/IconButton';
import { Close } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import { CategoyrGet } from '../../api/CategoryApi';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { DocumentDelete, DocumentFavorite, DocumentGet } from '../../api/DocumentApi';
import { FolderDTO } from '../../DTO/Document/FolderDTO';
import { FolderDTOGet } from '../../DTO/Document/FolderDTOGet';
import { SelectItemDTO } from '../../DTO/Category/SelectItemDTO';
import { toast, ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { updateTitleHeader } from '../../layout/SideBarLayout/SideBarSlice';
const useStyles = makeStyles((theme) => ({
	closeButton: {
		position: 'absolute',
		top: theme.spacing(1),
		right: theme.spacing(1),
		color: theme.palette.grey[500],
		zIndex: 1,
	},
}));

const DocumentList: React.FC = () => {
	const classes = useStyles();
	//list state
	const [open, setOpen] = React.useState(false);
	const [flag, setFlag] = React.useState(false);
	const [flagDel, setFlagDel] = React.useState(false);
	const [t] = useTranslation();
	const history = useHistory();
	const [filterSearch, setFilterSearch] = useState<FolderDTOGet>({
		Search: '',
		CategoryId: undefined,
		Order: 'ASC',
		Page: 0,
		PageSize: 5,
	});
	const [changVal, setChangeVal] = useState<any>({
		Search: '',
		CategoryId: undefined,
	});
	const [option, setOption] = useState<SelectItemDTO[]>([]);
	const [data, setData] = useState<FolderDTO[]>([]);
	const [totalDoc, setTotalDoc] = useState<number>(0);
	const [titleDialog, setTitleDialog] = React.useState<string>('');
	const [update, setUpdate] = React.useState<any>({
		id: 0,
		name: '',
		categoryId: undefined,
	});
	const [rowPage, setRowPage] = useState<number>(5);
	const [pageTB, setPageTB] = useState<number>(0);
	const [defVal, setDefVal] = useState<string>('');
	const dispatch = useAppDispatch();
	//fetch category
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
	// custom column
	const column = [
		{
			name: 'id',
			label: t('document.action'),
			options: {
				filter: false,
				sort: false,
				empty: true,
				customBodyRenderLite: (rowIndex: any) => {
					return (
						<React.Fragment>
							<IconButton onClick={() => handleClickEdit(rowIndex)}>
								<CreateIcon color="primary" />
							</IconButton>
							<IconButton
								onClick={() => {
									dispatch(updateTitleHeader(`file_manager/${data[rowIndex].id}`));
									history.push(`/file_manager/${data[rowIndex].id}`);
								}}
							>
								<SubdirectoryArrowRightIcon color="action" />
							</IconButton>
							<IconButton onClick={() => handleClickDelete(rowIndex)}>
								<DeleteIcon color="secondary" />
							</IconButton>
						</React.Fragment>
					);
				},
			},
		},

		{
			name: 'name',
			label: t('document.name'),
			options: {
				sort: false,
			},
		},

		{
			name: 'categoryId',
			label: t('document.category'),
			options: {
				sort: false,
				customBodyRender: (value: number) => {
					const val = optionCategory.map((item) => {
						if (parseInt(item.id) === value) {
							return item.name;
						}
					});
					return val;
				},
			},
		},
		{
			name: 'isFavorite',
			label: t('document.favorite'),
			options: {
				filter: false,
				sort: false,
				empty: true,
				customBodyRender: (value: boolean, tableMeta: any, updateValue: any) => {
					return (
						<React.Fragment>
							<IconButton
								onClick={async () => {
									await DocumentFavorite({
										id: tableMeta.rowData[0],
										isFavorite: !value,
									});
									updateValue(!value);
								}}
							>
								{value ? <StarIcon color="primary" /> : <StarBorderIcon color="primary" />}
							</IconButton>
						</React.Fragment>
					);
				},
			},
		},
	];
	// translation footer table
	const textTable = {
		pagination: {
			rowsPerPage: t('document.rows_per_page'),
			displayRows: t('document.display_rows'),
			jumpToPage: t('document.jump_to_page'),
		},
		body: {
			noMatch: t('document.no_match'),
		},
	};
	const handleClickOpen = () => {
		setOpen(true);
		setTitleDialog('createDocument');
		setUpdate({ id: 0, name: '', categoryId: undefined });
		setDefVal('');
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleClickEdit = (rowIndex: number) => {
		setTitleDialog('edit');
		setUpdate(data[rowIndex]);
		const id = data[rowIndex].categoryId;
		if (id) {
			optionCategory.map((item) => {
				if (item.id === id.toString()) {
					setDefVal(item.name);
				}
			});
		}
		setOpen(true);
	};
	const handleClickDelete = (rowIndex: number) => {
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
				const id = data[rowIndex].id;
				if (id) {
					const response = await DocumentDelete(id);
					if (response?.data) {
						Swal.fire(
							t('confirmDelete.deleted'),
							t('confirmDelete.your_file_has_been_deleted'),
							'success'
						);
						setFlagDel(!flagDel);
					}
				}
			}
		});
	};

	const handleChangeSearch = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setChangeVal({
			...changVal,
			[name]: e.target.value,
		});
	};
	const handleClickClear = () => {
		setFilterSearch({
			...filterSearch,
			Search: '',
			CategoryId: undefined,
		});
		setChangeVal({
			...filterSearch,
			Search: '',
			CategoryId: undefined,
		});
		setDefVal('');
	};
	useEffect(() => {
		const fetchInit = async () => {
			const response = await DocumentGet(filterSearch);
			if (response?.data?.listData) {
				setData(response.data.listData);
			}
			if (response?.data?.totalCount) {
				setTotalDoc(response?.data?.totalCount);
			}
		};
		fetchInit();
	}, [filterSearch, flag, flagDel]);

	const handleClick = () => {
		setFilterSearch({
			...filterSearch,
			Search: changVal.Search,
			CategoryId: changVal.CategoryId,
		});
	};
	const create: (result: boolean, id: number) => void = async (result, id) => {
		if (result) {
			toast.info(
				t(id === 0 ? 'createDocument.document_created' : 'createDocument.document_update')
			);
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
							<Grid item xs={6}>
								<TextField
									label={t('document.search')}
									variant="outlined"
									fullWidth
									value={changVal.Search}
									onChange={handleChangeSearch('Search')}
								/>
							</Grid>
							<Grid item xs={6}>
								<AutoCompleteComponent
									label={t('document.category')}
									data={optionCategory}
									fullWidth
									onChange={(value?: number) => setChangeVal({ ...changVal, CategoryId: value })}
									value={changVal.CategoryId}
								/>
							</Grid>

							<Grid item xs={6}>
								<Grid container justify="flex-end" spacing={5}>
									<Grid item>
										<ButtonComponent onClick={handleClick}>{t('document.search')}</ButtonComponent>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={6}>
								<Grid container justify="flex-start" spacing={5}>
									<Grid item>
										<ButtonComponent color="secondary" onClick={handleClickClear}>
											{t('document.clear')}
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
					<CreateList titleDialog={titleDialog} create={create} update={update} defVal={defVal} />
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
export default DocumentList;
