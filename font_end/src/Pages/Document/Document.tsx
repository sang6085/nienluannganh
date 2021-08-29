import {
	Box,
	Breadcrumbs,
	Button,
	Card,
	CardContent,
	CardHeader,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
	LinearProgress,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Theme,
	Typography,
} from '@material-ui/core';
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@material-ui/icons/Close';
import GetAppIcon from '@material-ui/icons/GetApp';
import FolderIcon from '@material-ui/icons/Folder';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';
import theme from '../../utils/theme';
import MovieIcon from '@material-ui/icons/Movie';
import NoteIcon from '@material-ui/icons/Note';
import Swal from 'sweetalert2';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import { useHistory, useParams } from 'react-router-dom';
import { FolderDelete, FolderGet, TreeviewGet } from '../../Api/FolderAPI';
import CustomizedDialogs from '../../Components/Dialog/CustomizedDialogs';
import CreateDocument from './CreateDocument';
import { useTranslation } from 'react-i18next';
import { AppURL } from '../../utils/const';
import { useDropzone } from 'react-dropzone';
import ImageIcon from '@material-ui/icons/Image';
import { DownloadGet, FileDelete, FileGet, FileGetAll, FilePost } from '../../Api/FileAPI';
import prettyBytes from 'pretty-bytes';
import { toast, ToastContainer } from 'react-toastify';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
const useStyles = makeStyles((theme: Theme) => ({
	click: {
		backgroundColor: '#e3f2fd',
		color: theme.palette.success.main,
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
	button: {},
	divDropzone: {
		display: 'inline-block',
	},
}));
const Document: React.FC = () => {
	const { t } = useTranslation();
	const classes = useStyles();
	const [styleOnClick, setStyleOnClick] = React.useState<any>({ open: false, id: -1 });
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const { id } = useParams<{ id?: string }>();
	const onClick = (e: any, data: any) => {
		if (e.type === 'click') {
			setStyleOnClick({ open: true, id: data.id });
		} else if (e.type === 'contextmenu') {
			e.preventDefault();
			setStyleOnClick({ open: true, id: data.id });
			setAnchorEl(e.currentTarget);
		}
	};
	const handleClose = () => {
		setAnchorEl(null);
		setStyleOnClick(false);
	};
	const [value, setValue] = React.useState<any>({
		id: 0,
		parentId: 0,
		name: '',
	});
	const [dataFolder, setDataFolder] = React.useState<any>([]);
	const [dataFile, setDataFile] = React.useState<any>([]);
	const [flagFolder, setFlagFolder] = React.useState(1);
	const [flagRenameFile, setFlagRenameFile] = React.useState(false);
	const flag: (result: any) => void = (result) => {
		if (result) {
			setOpenDialog(false);
			setFlagFolder(flagFolder + 1);
			setFlagRenameFile(false);
		}
	};
	React.useEffect(() => {
		const getDataFolder = async () => {
			const params = {
				search: '',
				page: 0,
				pageSize: 100,
				parentId: id,
			};
			setValue({ id: 0, name: '', parentId: id });
			const response = await FolderGet(params);
			const responseFile = await FileGet(params);

			if (responseFile.errorCode === null) {
				setDataFile(responseFile.data.listData);
			}
			if (response.errorCode === null) {
				setDataFolder(response.data.listData);
			}
			// const fetchTreview = await TreeviewGet(id);
			// console.log(fetchTreview);
		};
		getDataFolder();
	}, [id, flagFolder]);
	const [openDialog, setOpenDialog] = React.useState(false);
	const [titleDialog, setTitleDialog] = React.useState('new_folder');
	const handleCloseDialog = () => {
		setOpenDialog(false);
	};
	const handleCreateFolder = () => {
		setOpenDialog(true);
		setValue({ id: 0, name: '', parentId: id });
	};
	const history = useHistory();
	const onDoubleClick = (e: any, data: any) => {
		history.push(`/document/${data.id}`);
	};
	const renameFolder = (item: any) => {
		setAnchorEl(null);
		setTitleDialog('rename_folder');
		setOpenDialog(true);
		setValue({ id: item.id, name: item.name });
	};
	const deleteFolder = async (item: any) => {
		Swal.fire({
			title: t('confirmDelete.are_you_sure'),
			text: t('confirmDelete.you_wont_be_able_to_revert_this'),
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			reverseButtons: true,
			confirmButtonText: t('confirmDelete.yes'),
			cancelButtonText: t('confirmDelete.cancel'),
			cancelButtonColor: '#d33',
		}).then(async (result) => {
			if (result.isConfirmed) {
				const response = await FolderDelete(item.id);
				const response1 = await FileGetAll(item.id);
				if (response1.data.length !== 0) {
					response1.data.map((item: any) => {
						FileDelete(item._id);
					});
				}
				if (response.errorCode === null) {
					Swal.fire(
						t('confirmDelete.deleted'),
						t('confirmDelete.your_file_has_been_deleted'),
						'success'
					);
					setFlagFolder(flagFolder + 1);
				}
			}
		});

		setAnchorEl(null);
	};
	const deleteFile = (item: any) => {
		Swal.fire({
			title: t('confirmDelete.are_you_sure'),
			text: t('confirmDelete.you_wont_be_able_to_revert_this'),
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			reverseButtons: true,
			confirmButtonText: t('confirmDelete.yes'),
			cancelButtonText: t('confirmDelete.cancel'),
			cancelButtonColor: '#d33',
		}).then(async (result) => {
			if (result.isConfirmed) {
				const response = await FileDelete(item.id);
				if (response.errorCode === null) {
					Swal.fire(
						t('confirmDelete.deleted'),
						t('confirmDelete.your_file_has_been_deleted'),
						'success'
					);
					setFlagFolder(flagFolder + 1);
				}
			}
		});
		setAnchorEl(null);
	};

	const renameFile = (item: any) => {
		setAnchorEl(null);
		setTitleDialog('rename_folder');
		setOpenDialog(true);
		setValue({ id: item.id, name: item.name });
		setFlagRenameFile(true);
	};
	const [flagUpload, setFlagUpload] = React.useState(false);
	const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
		// Disable click and keydown behavior
		noClick: true,
		noKeyboard: true,
		onDrop: (acceptedFiles) => {
			uploadFile(acceptedFiles);
			setFlagUpload(true);
			//setProgressUpload({ percent: 0, fileSize: '' });
		},
	});
	const [progressUpload, setProgressUpload] = React.useState({ percent: 0, fileSize: '' });
	const uploadFile = async (acceptedFiles: any) => {
		let count = 0;
		let countnot = 0;
		let uploadNot = 0;
		for (let i = 0; i < acceptedFiles.length; i++) {
			const formData = new FormData();
			formData.append('file', acceptedFiles[i]);
			const onUploadProgress: (progressEvent: any) => void = (progressEvent) => {
				const { loaded, total } = progressEvent;
				setProgressUpload({
					percent: Math.floor((loaded * 100) / total),
					fileSize: ` ${prettyBytes(loaded)} / ${prettyBytes(total)}`,
				});
			};
			const response = await FilePost(formData, id, onUploadProgress);

			if (response.errorCode === null) {
				acceptedFiles.splice(i, 1);
				setFlagFolder(flagFolder + 1);
				count++;
				i = i - 1;
			} else if (response.errorCode === 10) {
				//console.log(response);
				uploadNot = 1;
				setFlagUpload(false);
				countnot = acceptedFiles.length;
				break;
			}
		}
		setFlagUpload(false);
		count !== 0 && toast.info(`${count}` + ' ' + t('filemanager.file_uploaded_successfully'));
		uploadNot === 1 &&
			toast.error(
				'Không đủ dung lượng, ' + `${countnot}` + ' ' + 'Tập tin tải lên không thành công'
			);
	};
	const fileIcon = (item: any) => {
		if (item.type.substring(0, item.type.indexOf('/')) == 'image')
			return <ImageIcon style={{ color: 'red', fontSize: '20vh' }} />;
		else if (item.type.substring(0, item.type.indexOf('/')) == 'video') {
			return <MovieIcon style={{ color: 'red', fontSize: '20vh' }} />;
		} else return <NoteIcon style={{ color: 'red', fontSize: '20vh' }} />;
	};
	const showFiles = acceptedFiles.map((file: any, index) => {
		return index === 0 ? (
			<React.Fragment>
				<p>{file.name}</p>
				<LinearProgress variant="determinate" value={progressUpload.percent} />
				<Typography variant="body2" color="textSecondary">
					{`${progressUpload.percent}%`} | {progressUpload.fileSize}
				</Typography>
			</React.Fragment>
		) : (
			<React.Fragment>
				<p>{file.name}</p>
				<LinearProgress />
			</React.Fragment>
		);
	});
	const [progress, setProgress] = React.useState({ percent: 0, fileSize: '' });
	const [idDownload, setIdDownload] = React.useState(-1);
	const downloadFile = async (item: any) => {
		setIdDownload(item.id);
		setProgress({ ...progress, percent: 0 });

		const onDownloadProgress: (progressEvent: any) => void = (progressEvent) => {
			const { loaded, total } = progressEvent;
			console.log(Math.floor((loaded * 100) / total));
			setProgress({
				percent: Math.floor((loaded * 100) / total),
				fileSize: ` ${prettyBytes(loaded)} / ${prettyBytes(total)}`,
			});
		};
		const response = await DownloadGet(item.id, onDownloadProgress);
		const url = window.URL.createObjectURL(new Blob([response]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', item.name);
		document.body.appendChild(link);
		link.click();
		link.remove();
		setAnchorEl(null);
	};
	const [openViewFile, setOpenViewFile] = React.useState<boolean>(false);
	const [viewFile, setViewFile] = React.useState({ title: '', link: '', end: '' });
	const onDoubleClickFile = async (e: any, item: any) => {
		setOpenViewFile(true);
		console.log();

		setViewFile({
			title: item.name,
			link: `http://localhost:9000/upload/${
				item.id + item.name.substring(item.name.lastIndexOf('.'), item.name.length)
			}`,
			end: item.type.substring(0, item.type.indexOf('/')),
		});
	};
	const handleCloseViewFile = () => {
		setOpenViewFile(false);
	};
	const showViewFile = () => {
		if (viewFile.end === 'image') {
			return <img width="100%" src={viewFile.link} />;
		} else if (viewFile.end === 'video') {
			return (
				<video width="100%" height="100%" controls>
					<source src={viewFile.link} type="video/mp4" />
				</video>
			);
		}
	};
	return (
		<Grid container spacing={2}>
			<Grid item xs={12} style={{ textAlign: 'end' }}>
				<Button
					variant="contained"
					color="default"
					className={classes.button}
					startIcon={<CreateNewFolderIcon />}
					onClick={handleCreateFolder}
				>
					{t('document.create_folder')}
				</Button>
				&nbsp; &nbsp;&nbsp;&nbsp;
				<div {...getRootProps({ className: classes.divDropzone })}>
					<input {...getInputProps()} />
					<Button
						variant="contained"
						color="default"
						className={classes.button}
						startIcon={<CloudUploadIcon />}
						onClick={open}
					>
						{t('document.upload_file')}
					</Button>
				</div>
			</Grid>
			{flagUpload && (
				<Grid item xs={12}>
					{showFiles}
				</Grid>
			)}

			<Grid item xs={12}>
				{dataFolder.length !== 0 && <Typography variant="body2">{t('document.folder')}</Typography>}
			</Grid>
			{dataFolder.map((item: any, index: number) => (
				<Grid item xs={3} key={index}>
					<Card
						className={clsx(classes.button, {
							[classes.click]: styleOnClick.open && styleOnClick.id === item.id,
							// [classes.drawerClose]: !open,
						})}
						variant="outlined"
						onClick={(e) => onClick(e, item)}
						onContextMenu={(e) => onClick(e, item)}
						onDoubleClick={(e) => onDoubleClick(e, item)}
					>
						<ListItem>
							<ListItemIcon>
								<FolderIcon />
							</ListItemIcon>
							<Typography component="h6" style={{ cursor: 'default' }} noWrap>
								{item.name}
							</Typography>
						</ListItem>
					</Card>
					<Menu
						getContentAnchorEl={null}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'center',
						}}
						id="simple-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(styleOnClick.id == item.id ? anchorEl : null)}
						onClose={handleClose}
					>
						<MenuItem onClick={() => deleteFolder(item)}>
							<DeleteIcon />
							&nbsp;&nbsp;&nbsp; {t('tenant.delete')}
						</MenuItem>
						<MenuItem onClick={() => renameFolder(item)}>
							<EditIcon />
							&nbsp;&nbsp;&nbsp; {t('tenant.edit')}
						</MenuItem>
					</Menu>
				</Grid>
			))}
			<Grid item xs={12}>
				{dataFile.length !== 0 && <Typography variant="body2">{t('document.file')}</Typography>}
			</Grid>
			{dataFile.map((item: any, index: number) => (
				<Grid item xs={3}>
					<Card
						className={clsx(classes.button, {
							[classes.click]: styleOnClick.open && styleOnClick.id === item.id,
							// [classes.drawerClose]: !open,
						})}
						style={{ height: '35vh' }}
						variant="outlined"
						onClick={(e) => onClick(e, item)}
						onContextMenu={(e) => onClick(e, item)}
						onDoubleClick={(e) => onDoubleClickFile(e, item)}
					>
						<Grid item xs={12}>
							<ListItem style={{ display: 'inherit', textAlign: 'center' }}>
								<ListItemIcon style={{ margin: '1vw' }}>{fileIcon(item)}</ListItemIcon>
							</ListItem>
						</Grid>
						<Grid item xs={12}>
							<ListItem>
								<ListItemIcon style={{}}>
									<ImageIcon style={{ color: 'red', fontSize: '4vh' }} />
								</ListItemIcon>
								<Typography component="h6" style={{ cursor: 'default' }} noWrap>
									{item.name}
								</Typography>
								<ListItemIcon>
									{item.id === idDownload && (
										<Box position="relative" display="inline-flex">
											<Box
												top={0}
												left={40}
												bottom={0}
												right={0}
												position="absolute"
												display="flex"
												alignItems="center"
												justifyContent="center"
											>
												<Typography variant="body2" component="div" color="textSecondary">
													{`${progress.percent}%`}
												</Typography>
											</Box>
										</Box>
									)}
								</ListItemIcon>
							</ListItem>
						</Grid>
					</Card>
					<Menu
						getContentAnchorEl={null}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'center',
						}}
						id="simple-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(styleOnClick.id == item.id ? anchorEl : null)}
						onClose={handleClose}
					>
						<MenuItem onClick={() => deleteFile(item)}>
							<DeleteIcon />
							&nbsp;&nbsp;&nbsp; {t('tenant.delete')}
						</MenuItem>
						<MenuItem onClick={() => renameFile(item)}>
							<EditIcon />
							&nbsp;&nbsp;&nbsp; {t('tenant.edit')}
						</MenuItem>
						<MenuItem onClick={() => downloadFile(item)}>
							<GetAppIcon />
							&nbsp;&nbsp;&nbsp; {t('tenant.download')}
						</MenuItem>
					</Menu>
				</Grid>
			))}
			<Dialog
				//disableBackdropClick
				//disableEscapeKeyDown
				open={openDialog}
				onClose={handleCloseDialog}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">{t('createDocument.' + titleDialog)}</DialogTitle>
				<IconButton className={classes.closeButton} onClick={handleCloseDialog}>
					<CloseIcon />
				</IconButton>
				<DialogContent>
					<CreateDocument flag={flag} value={value} flagRenameFile={flagRenameFile} />
				</DialogContent>
			</Dialog>
			<Dialog
				//disableBackdropClick
				//disableEscapeKeyDown
				open={openViewFile}
				onClose={handleCloseViewFile}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">{viewFile.title}</DialogTitle>
				<IconButton className={classes.closeButton} onClick={handleCloseViewFile}>
					<CloseIcon />
				</IconButton>
				<DialogContent>{showViewFile()}</DialogContent>
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
		</Grid>
	);
};
export default Document;
