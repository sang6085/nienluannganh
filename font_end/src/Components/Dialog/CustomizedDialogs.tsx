import React, { SetStateAction } from 'react';
import { createStyles, makeStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
interface DialogProps {
	open?: boolean;
}
const useStyles = makeStyles((theme) => ({
	root: {
		textAlign: 'center',
		justifyContent: 'center',
	},
	bgBox: {
		backgroundColor: theme.palette.secondary.contrastText,
	},
	closeButton: {
		position: 'absolute',
		top: theme.spacing(1),
		right: theme.spacing(1),
		color: theme.palette.grey[500],
		zIndex: 1,
	},
}));
const CustomizedDialogs: React.FC<DialogProps> = (props) => {
	const [open, setOpen] = React.useState(false);
	const classes = useStyles();
	const handleClickOpen = () => {
		setOpen(props.open || false);
	};
	const handleClose = () => {
		setOpen(false);
	};
	React.useEffect(() => {
		setOpen(props.open || false);
		console.log(props.open);
	}, [props.open]);
	return (
		<Dialog
			//disableBackdropClick
			//disableEscapeKeyDown
			open={open}
			onClose={handleClose}
			aria-labelledby="form-dialog-title"
		>
			<DialogTitle id="form-dialog-title">Thong tin thanh toan</DialogTitle>
			<IconButton className={classes.closeButton} onClick={handleClose}>
				<Close />
			</IconButton>
			<DialogContent>
				<Typography variant="body2">
					- Số Tài Khoản: 0501000182310 tên tài khoản: TRAN VAN SANG Ngân hàng TMCP ngoại thương
					Việt Nam - chi nhánh Bắc Sài Gòn.
				</Typography>
				<Typography variant="body2">- Tài khoản Momo: 0904978049 - TRAN VAN SANG. </Typography>
				<Typography variant="body2">
					- Nội dung chuyển tiền các bạn để: ten dang nhap, ten goi license ma ban mua.
				</Typography>
				<Typography variant="body2">
					-Nhận được tiền, Admin sẽ kich hoat goi ma ban da chon!
				</Typography>
			</DialogContent>
		</Dialog>
	);
};
export default CustomizedDialogs;
