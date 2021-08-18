import React, { TransitionEventHandler } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
	avatar: {
		backgroundColor: blue[100],
		color: blue[600],
	},
});
interface Props {
	open: boolean;
	selectedValue: string;
	onClose: (value: string) => void;
  children?: React.ReactNode;
}

export const DialogComponent: React.FC<Props> = ({ open, selectedValue, onClose, children }) => {
	const classes = useStyles();

	const handleClose = () => {
		onClose(selectedValue);
	};

	const handleListItemClick = (value: string) => {
		onClose(value);
	};
	return (
		<Dialog open={open}>
			{children}
		</Dialog>
	);
};

export default function DialogComponents() {
	const [open, setOpen] = React.useState(false);
	const [selectedValue, setSelectedValue] = React.useState('');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (value: string) => {
		setOpen(false);
		setSelectedValue(value);
	};

	return (
		<div>
			<Typography variant="subtitle1">Selected: {selectedValue}</Typography>
			<br />
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Open simple dialog
			</Button>
			<DialogComponent selectedValue={selectedValue} open={open} onClose={handleClose} />
		</div>
	);
}
