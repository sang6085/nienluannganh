import { Typography } from '@material-ui/core';
import { Box, makeStyles } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { FilePostChunk } from '../../api/FileAPI';
import ButtonComponent from '../../Components/Button/ButtonComponent';
import prettyBytes from 'pretty-bytes';
import { toast, ToastContainer } from 'react-toastify';
const useStyles = makeStyles({
	borderBox: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '20px',
		borderWidth: 3,
		borderRadius: 2,
		borderColor: 'black',
		borderStyle: 'dashed',
		outline: 'none',
		transition: 'border .24s ease-in-out',
	},
	CloudUploadIcon: {
		fontSize: 50,
		cursor: 'pointer',
	},
});
interface DropZoneProps {
	FolderId?: number;
	uploaded?: (result: boolean, id: number) => void;
}
const Dropzone: React.FC<DropZoneProps> = (props) => {
	const { t } = useTranslation();
	const [progress, setProgress] = React.useState({ percent: 0, fileSize: '' });
	const [flag, setFlag] = React.useState(false);
	const { acceptedFiles, getRootProps, getInputProps, open } = useDropzone({
		noClick: true,
		noKeyboard: true,
		onDrop: (acceptedFiles) => {
			upload(acceptedFiles);
			setFlag(true);
		},
		//accept: 'image/jpeg, image/png',
	});

	const uploadFileToSV = async (start: number, fileUpdate: any) => {
		let loadedPG = 0;
		const file = fileUpdate;
		const slice_size = 256 * 1024;
		const fileSize = file.size + 1;
		const next_slice = start + slice_size;
		let file_Id: any = '';
		let conti: any = true;
		const arr: any = [];

		for (start; start <= fileSize; start += next_slice) {
			if (start + next_slice < fileSize) {
				const blob = file.slice(start, start + next_slice, {
					type: 'text/plain;charset=utf-8',
				});
				arr.push(blob);
			} else {
				const blob = file.slice(start, fileSize, {
					type: 'text/plain;charset=utf-8',
				});
				arr.push(blob);
			}
		}
		for (let i = 0; i < arr.length; i++) {
			const fd = new FormData();
			if (props.FolderId) {
				fd.append('FolderId', props.FolderId.toString());
			}
			fd.append('TotalSize', file.size);
			fd.append('ChunkSize', (256 * 1024).toString());
			fd.append('Chunk', i.toString());

			fd.append('File', arr[i], file.name);
			if (file_Id) {
				fd.append('FileId', file_Id);
			}

			if (conti) {
				const onUploadProgress: (progressEvent: any) => void = (progressEvent) => {
					const { loaded, total } = progressEvent;
					setProgress({
						percent: Math.round(((loaded + loadedPG) * 100) / fileSize),
						fileSize: `${prettyBytes(loaded + loadedPG)} / ${prettyBytes(fileSize)}`,
					});
					if (loaded < fileSize && loaded === total) {
						loadedPG = loadedPG + loaded;
					}
				};
				const response = await FilePostChunk(fd, onUploadProgress);
				file_Id = response?.data?.fileId.toString();
				conti = response?.data?.continue;
				if (conti === false) {
					setProgress({
						percent: 0,
						fileSize: '',
					});
				}
			}
		}
	};

	const upload = async (acceptedFiles: any) => {
		let count = 0;
		for (let i = 0; i < acceptedFiles.length; i++) {
			await uploadFileToSV(0, acceptedFiles[i]);
			acceptedFiles.splice(i, 1);
			i = i - 1;
			count++;
			props?.uploaded?.(true, count);
			setProgress({
				percent: 0,
				fileSize: '',
			});
		}
		toast.info(`${count}` + ' ' + t('filemanager.file_uploaded_successfully'));
		setFlag(false);
	};

	const showFiles = acceptedFiles.map((file: any, index) => {
		return index === 0 ? (
			<React.Fragment key={file.path}>
				<p>{file.name}</p>
				<LinearProgress variant="determinate" value={progress.percent} />
				<Typography variant="body2" color="textSecondary">
					{`${progress.percent}%`} | {progress.fileSize}
				</Typography>
			</React.Fragment>
		) : (
			<React.Fragment>
				<p>{file.name}</p>
				<LinearProgress />
			</React.Fragment>
		);
	});

	const classes = useStyles();
	return (
		<Box>
			<div className={classes.borderBox} {...getRootProps()}>
				<input {...getInputProps()} />
				<CloudUploadIcon color="primary" onClick={open} className={classes.CloudUploadIcon} />
				<Typography variant="h6" color="primary" gutterBottom>
					{t('dropzone.drag_and_drop_supporting_file_here_to_upload')}
				</Typography>
				<ButtonComponent variant="contained" color="primary" onClick={open}>
					{t('dropzone.or_click_to_select')}
				</ButtonComponent>
			</div>
			{flag ? showFiles : ''}
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
		</Box>
	);
};
export default Dropzone;
