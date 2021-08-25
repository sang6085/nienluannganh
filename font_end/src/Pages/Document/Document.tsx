import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Dialog,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Theme,
	Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import FolderIcon from '@material-ui/icons/Folder';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';
import theme from '../../utils/theme';
import NoteIcon from '@material-ui/icons/Note';
import Swal from 'sweetalert2';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import { useHistory, useParams } from 'react-router-dom';
import { FolderDelete, FolderGet } from '../../Api/FolderAPI';
import CustomizedDialogs from '../../Components/Dialog/CustomizedDialogs';
import CreateDocument from './CreateDocument';
import { useTranslation } from 'react-i18next';
import { AppURL } from '../../utils/const';
import { useDropzone } from 'react-dropzone';
import ImageIcon from '@material-ui/icons/Image';
import { FileDelete, FileGet, FilePost } from '../../Api/FileAPI';
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
		console.log(data);
		history.push(`/document/${data.id}`);
	};
	const renameFolder = (item: any) => {
		setAnchorEl(null);
		setTitleDialog('rename_folder');
		setOpenDialog(true);
		setValue({ id: item.id, name: item.name });
	};
	const deleteFolder = (item: any) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			reverseButtons: true,
			confirmButtonText: 'Yes',
			cancelButtonColor: '#d33',
		}).then(async (result) => {
			if (result.isConfirmed) {
				const response = await FolderDelete(item.id);
				if (response.errorCode === null) {
					Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
					setFlagFolder(flagFolder + 1);
				}
			}
		});
		setAnchorEl(null);
	};
	const deleteFile = (item: any) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			reverseButtons: true,
			confirmButtonText: 'Yes',
			cancelButtonColor: '#d33',
		}).then(async (result) => {
			if (result.isConfirmed) {
				const response = await FileDelete(item.id);
				if (response.errorCode === null) {
					Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
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
	const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
		// Disable click and keydown behavior
		noClick: true,
		noKeyboard: true,
		onDrop: (acceptedFiles) => {
			uploadFile(acceptedFiles);
		},
	});
	const uploadFile = async (acceptedFiles: any) => {
		const formData = new FormData();
		formData.append('file', acceptedFiles[0]);
		const response = await FilePost(formData, id);
		if (response.errorCode === null) {
			setFlagFolder(flagFolder + 1);
		}
	};
	const fileIcon = (item: any) => {
		if (item.type.substring(0, item.type.indexOf('/')) == 'image')
			return <ImageIcon style={{ color: 'red', fontSize: '20vh' }} />;
		else return <NoteIcon style={{ color: 'red', fontSize: '20vh' }} />;
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
					Create Folder
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
						Upload
					</Button>
				</div>
			</Grid>
			<Grid item xs={12}>
				{dataFolder.length !== 0 && <Typography variant="body2">Thư mục</Typography>}
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
							&nbsp;&nbsp;&nbsp; Delete
						</MenuItem>
						<MenuItem onClick={() => renameFolder(item)}>
							<EditIcon />
							&nbsp;&nbsp;&nbsp; Edit
						</MenuItem>
					</Menu>
				</Grid>
			))}
			<Grid item xs={12}>
				{dataFile.length !== 0 && <Typography variant="body2">Tệp</Typography>}
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
						//onDoubleClickFile={(e) => onDoubleClick(e, item)}
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
							&nbsp;&nbsp;&nbsp; Delete
						</MenuItem>
						<MenuItem onClick={() => renameFile(item)}>
							<EditIcon />
							&nbsp;&nbsp;&nbsp; Edit
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
		</Grid>
	);
};
export default Document;
