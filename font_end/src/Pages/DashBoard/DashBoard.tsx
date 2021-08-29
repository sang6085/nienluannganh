import React from 'react';
import { Avatar, Box, Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'react-circular-progressbar/dist/styles.css';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Chart from '../../Components/Chart/Chart';
import DateFnsUtils from '@date-io/date-fns';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../app/hooks';
import { updateTitleHeader } from '../../features/Header/HeaderSlice';
import { TenantGet } from '../../Api/TenantAPI';
import prettyBytes from 'pretty-bytes';
import { useHistory } from 'react-router-dom';
const DashBoard: React.FC = () => {
	const { t } = useTranslation();
	const [document /*, setDocument*/] = React.useState([
		{
			avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
			title: 'Remy Sharp',
			subheader: 'New York, NY',
		},
		{
			avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
			title: 'Remy Sharp',
			subheader: 'New York, NY',
		},
		{
			avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
			title: 'Remy Sharp',
			subheader: 'New York, NY',
		},
		{
			avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
			title: 'Remy Sharp',
			subheader: 'New York, NY',
		},
		{
			avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
			title: 'Remy Sharp',
			subheader: 'New York, NY',
		},
	]);
	const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());

	const handleDateChange = (date: Date | null) => {
		setSelectedDate(date);
	};
	const [usedCapacity, setUsedCapacity] = React.useState(0);
	const [totalCapacity, setTotalCapacity] = React.useState(190);
	const dispatch = useAppDispatch();
	dispatch(updateTitleHeader(location.pathname.substring(1)));
	React.useEffect(() => {
		const getTenant = async () => {
			const response = await TenantGet();
			if (response) {
				if (response.errorCode === null) {
					setTotalCapacity(response.data.storageMax);
					setUsedCapacity(response.data.storageUsed);
				}
			}
		};
		getTenant();
	}, []);
	const history = useHistory();
	const handleChoosePlan = () => {
		history.push('/chooseplan');
	};
	return (
		<Box m={3}>
			<Grid container spacing={3}>
				<Grid item xs={8} style={{ display: 'grid' }}>
					<Box boxShadow={3} style={{ display: 'flex' }} p={2}>
						<Grid item xs={4} style={{ textAlign: 'left' }}>
							<Typography variant="h5">{t('dashboard.storage')}</Typography>
							<Box color="text.disabled" style={{ cursor: 'default' }} onClick={handleChoosePlan}>
								{t('dashboard.choose_new_plan')}
							</Box>
						</Grid>
						<Grid item xs={4} style={{ marginTop: '20px' }}>
							<Chart usedCapacity={usedCapacity} totalCapacity={totalCapacity} />
						</Grid>
						<Grid item xs={4} style={{ textAlign: 'right' }}>
							<Typography color="primary" variant="h5">
								{prettyBytes(usedCapacity)}/{prettyBytes(totalCapacity)}
							</Typography>
						</Grid>
					</Box>
				</Grid>
				<Grid item xs={4} style={{ display: 'grid' }}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<Box style={{ display: 'grid' }}>
							<Card variant="outlined">
								<CardContent>
									<DatePicker
										disableToolbar
										variant="static"
										format="MM/dd/yyyy"
										margin="normal"
										id="date-picker-static"
										value={selectedDate}
										onChange={handleDateChange}
										style={{ maxWidth: '100%' }}
									/>
								</CardContent>
							</Card>
						</Box>
					</MuiPickersUtilsProvider>
				</Grid>
			</Grid>
			{/* <Grid container spacing={3}>
				<Grid item xs={4}>
					<Box style={{ textAlign: 'left' }}>
						<Card variant="outlined">
							<CardContent>
								<Typography variant="h5" component="h2">
									{t('dashboard.recent_document')}
								</Typography>
							</CardContent>
							{document?.map((item, index) => (
								<CardHeader
									key={index}
									avatar={<Avatar alt={item?.title} src={item?.avatar} />}
									action={
										<IconButton aria-label="settings">
											<MoreVertIcon />
										</IconButton>
									}
									title={item?.title}
									subheader={item?.subheader}
								/>
							))}
						</Card>
					</Box>
				</Grid>
				<Grid item xs={4}>
					<Box style={{ textAlign: 'left' }}>
						<Card variant="outlined">
							<CardContent>
								<Typography variant="h5" component="h2">
									{t('dashboard.favorite_document')}
								</Typography>
							</CardContent>
							{document?.map((item, index) => (
								<CardHeader
									key={index}
									avatar={<Avatar alt={item?.title} src={item?.avatar} />}
									action={
										<IconButton aria-label="settings">
											<MoreVertIcon />
										</IconButton>
									}
									title={item?.title}
									subheader={item?.subheader}
								/>
							))}
						</Card>
					</Box>
				</Grid>
				<Grid item xs={4}>
					<Box style={{ textAlign: 'left' }}>
						<Card variant="outlined">
							<CardContent>
								<Typography variant="h5" component="h2">
									{t('dashboard.reference_document')}
								</Typography>
							</CardContent>
							{document?.map((item, index) => (
								<CardHeader
									key={index}
									avatar={<Avatar alt={item?.title} src={item?.avatar} />}
									action={
										<IconButton aria-label="settings">
											<MoreVertIcon />
										</IconButton>
									}
									title={item?.title}
									subheader={item?.subheader}
								/>
							))}
						</Card>
					</Box>
				</Grid>
			</Grid> */}
		</Box>
	);
};
export default DashBoard;
