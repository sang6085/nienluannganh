import {
	Box,
	Container,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	makeStyles,
	Typography,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import prettyBytes from 'pretty-bytes';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LicenseGet } from '../../Api/License';
import ChoosePlanBox from '../../Components/ChoosePlanBox/ChoosePlanBox';
import theme from '../../utils/theme';
import { Close } from '@material-ui/icons';

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
const ChoosePlan: React.FC = () => {
	const classes = useStyles();
	const { t } = useTranslation();

	const [data, setData] = React.useState<any>([]);
	const [getAll /*, setGetAll*/] = React.useState<any>({
		page: 0,
		pageSize: 10,
		search: '',
	});

	React.useEffect(() => {
		const fecthChoosePlan = async () => {
			const res = await LicenseGet(getAll);
			if (res.errorCode === null) {
				setData(res?.data?.listData);
			}
		};
		fecthChoosePlan();
	}, [getAll]);
	const [open, setOpen] = React.useState(false);
	const handleClose = () => {
		setOpen(false);
	};
	const onClick = () => {
		setOpen(true);
	};
	return (
		<>
			<Container>
				<Grid container spacing={5} className={classes.root}>
					<Grid item xs={12}>
						<Box
							border={2}
							color={theme.palette.success.dark}
							borderLeft={0}
							borderRight={0}
							borderTop={0}
						>
							<Typography component="h1" variant="h3" gutterBottom>
								{t('chooseplanpage.choose_your_subscription_plan')}
							</Typography>
						</Box>
					</Grid>

					{data?.map(
						(item: any) =>
							item.name !== 'FREE' && (
								<Grid item sm={4} md={4} xs={4} key={item.id}>
									<ChoosePlanBox
										className={classes.bgBox}
										width="100%"
										price={item.price}
										title={item.name}
										capacity={prettyBytes(item.storageSize)}
										onClick={onClick}
									/>
								</Grid>
							)
					)}

					<Grid item xs={12}>
						<Box
							border={2}
							color={theme.palette.primary.contrastText}
							borderLeft={0}
							borderRight={0}
							borderTop={0}
						>
							<Typography component="h1" variant="h3" gutterBottom></Typography>
						</Box>
					</Grid>
				</Grid>
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
			</Container>
		</>
	);
};
export default ChoosePlan;
