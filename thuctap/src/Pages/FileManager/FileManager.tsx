import React, { useEffect } from 'react';
import { Box, CircularProgress, Dialog, Grid, makeStyles, Typography } from '@material-ui/core';
import MUIDataTableComponent from '../../Components/Table/MUIDataTableComponent';
import CreateIcon from '@material-ui/icons/Create';
import ButtonComponent from '../../Components/Button/ButtonComponent';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '../../Components/Button/IconButton';
import { Close } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import GetAppIcon from '@material-ui/icons/GetApp';
import { toast, ToastContainer } from 'react-toastify';
import { DownloadGet, FileGet } from '../../api/FileAPI';
import Dropzone from '../../Components/Dropzone/Dropzone';
import prettyBytes from 'pretty-bytes';
import { useParams } from 'react-router-dom';
import RenameFile from './RenameFile';

const useStyles = makeStyles((theme) => ({
	closeButton: {
		position: 'absolute',
		top: theme.spacing(1),
		right: theme.spacing(1),
		color: theme.palette.grey[500],
		zIndex: 1,
	},
}));

const FileManager: React.FC = () => {
	const { id } = useParams<{ id?: string }>();
	const [progress, setProgress] = React.useState({ percent: 0, fileSize: '' });
	const [open, setOpen] = React.useState(false);
	const [down, setDown] = React.useState(-1);
	const [flag, setFlag] = React.useState(false);
	const [count, setCount] = React.useState(-1);
	const [totalPage, setTotalPage] = React.useState(0);
	const [valueEdit, setValueEdit] = React.useState({
		id: 0,
		name: '',
	});
	const [t] = useTranslation();
	const [filterSearch] = React.useState<any>({
		name: '',
		description: '',
	});
	const [valueSearch, setValueSearch] = React.useState<any>({
		Search: '',
		FolderId: Number(id),
		Order: 'ASC',
		Page: 0,
		PageSize: 5,
	});
	const column = [
		{
			name: t('filemanager.action'),
			options: {
				filter: false,
				sort: false,
				empty: true,
				customBodyRenderLite: (index: any) => {
					return (
						<React.Fragment>
							<IconButton onClick={() => handleDownload(index)}>
								{index === down ? (
									<Box position="relative" display="inline-flex">
										<CircularProgress variant="determinate" value={progress.percent} />
										<Box
											top={0}
											left={0}
											bottom={0}
											right={0}
											position="absolute"
											display="flex"
											alignItems="center"
											justifyContent="center"
										>
											<Typography variant="caption" component="div" color="textSecondary">
												{`${progress.percent}%`}
											</Typography>
										</Box>
									</Box>
								) : (
									<GetAppIcon color="primary" />
								)}
							</IconButton>
							<IconButton onClick={() => handleEdit(index)}>
								<CreateIcon color="primary" />
							</IconButton>
						</React.Fragment>
					);
				},
			},
		},
		{
			name: 'name',
			label: t('filemanager.name'),
			options: {
				sort: true,
			},
		},

		{
			name: 'fileSize',
			label: t('filemanager.file_size'),
			options: {
				sort: true,
			},
		},
		{
			name: 'createdDate',
			label: t('filemanager.created_date'),
			options: {
				sort: true,
			},
		},
		{
			name: 'modifiedDate',
			label: t('filemanager.modified_date'),
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
		selectedRows: {
			text: 'File(s) selected',
			delete: 'Delete',
			deleteAria: 'Deleted Selected Row(s)',
		},
	};
	const [titleDialog, setTitleDialog] = React.useState<string>('');

	const handleClose = () => {
		setOpen(false);
	};

	const {} = useForm({
		defaultValues: filterSearch,
	});

	const handleEdit = (value: any) => {
		setOpen(true);
		setTitleDialog('rename_file');
		setValueEdit({ id: data[value].id, name: data[value].name });
	};
	const handleDownload = async (value: any) => {
		setProgress({ ...progress, percent: 0 });
		setDown(value);
		const onDownloadProgress: (progressEvent: any) => void = (progressEvent) => {
			const { loaded, total } = progressEvent;
			setProgress({
				percent: Math.round((loaded * 100) / total),
				fileSize: `${prettyBytes(loaded)} / ${prettyBytes(total)}`,
			});
		};
		const response = await DownloadGet(data[value].id, onDownloadProgress);
		const url = window.URL.createObjectURL(new Blob([response]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', data[value].name);
		document.body.appendChild(link);
		link.click();
		link.remove();
	};

	const [init, setInit] = React.useState<any>({ page: 0, rowPerPage: 5 });
	const [data, setData] = React.useState<any>([]);
	useEffect(() => {
		const fetchFiles = async () => {
			const list = await FileGet(valueSearch);
			const newFiles = list?.data?.listData?.map((file: any) => {
				const createdDate = new Date(file.createdDate * 1000).toLocaleDateString('en-US');
				const modifiedDate = new Date(file.modifiedDate * 1000).toLocaleDateString('en-US');
				return {
					id: file.id,
					name: file.name,
					fileSize: prettyBytes(file.fileSize),
					createdDate: createdDate,
					modifiedDate: modifiedDate,
				};
			});
			setData(newFiles);

			if (list?.data?.totalCount) setTotalPage(list?.data?.totalCount);
		};

		fetchFiles();
	}, [flag, valueSearch, count]);

	const classes = useStyles();
	const create: (result: boolean) => void = (result) => {
		if (result) {
			toast.info(t('renameFile.renamed_file'));
			setOpen(false);
			setFlag(!flag);
		}
	};
	const uploaded: (result: boolean, id: number) => void = async (result, id) => {
		if (result) {
			setCount(id);
		}
	};
	return (
		<>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Box boxShadow={3} p={4} pt={2} pl={4}>
						<Dropzone FolderId={Number(id)} uploaded={uploaded} />
					</Box>
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
						rowsPerPageOption: [5, 10, 20],
						rowsPerPage: init.rowPerPage,
						count: totalPage,
						page: init.page,
						pagination: true,
						jumpToPage: true,
						download: false,
						filter: false,
						responsive: 'vertical',
						viewColumns: false,
						print: false,
						search: false,
						customToolbarSelect: () => (
							<Box mr={3}>
								<ButtonComponent
									variant="contained"
									color="primary"
									children="DELETE"
								></ButtonComponent>
							</Box>
						),
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
					<RenameFile titleDialog={titleDialog} create={create} valueEdit={valueEdit} />
				</DialogContent>
			</Dialog>
		</>
	);
};
export default FileManager;
