import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChoosePlanGet } from '../../api/ChoosePlanAPI';
import ChoosePlanBox from '../../Components/ChoosePlanBox/ChoosePlanBox';
import theme from '../../utils/theme';

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
const ChoosePlanPage: React.FC = () => {
	const classes = useStyles();
	const { t } = useTranslation();

	const [data, setData] = React.useState<any>([]);
	const [getAll /*, setGetAll*/] = React.useState<any>({
		Page: 0,
		PageSize: 10,
	});

	React.useEffect(() => {
		const fecthChoosePlan = async () => {
			const res = await ChoosePlanGet(getAll);
			setData(res?.data?.listData);
		};
		fecthChoosePlan();
	}, [getAll]);

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

					{data?.map((item: any) => (
						<Grid item sm={4} md={4} xs={4} key={item.id}>
							<ChoosePlanBox
								className={classes.bgBox}
								width="100%"
								price={item.price}
								title={item.number}
								capacity={item.storageSize}
							/>
						</Grid>
					))}

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
			</Container>
		</>
	);
};
export default ChoosePlanPage;
