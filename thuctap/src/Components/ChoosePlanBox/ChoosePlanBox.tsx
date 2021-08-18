import { CardActions, Typography } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Box } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ButtonComponent from '../Button/ButtonComponent';
interface ChoosePlanBoxProps {
	width: string | number;
	title: string;
	price: number;
	capacity: string;
	className?: string;
	onClick?: () => void;
}
const ChoosePlanBox: React.FC<ChoosePlanBoxProps> = (props) => {
	const { t } = useTranslation();
	return (
		<Box width={props.width} boxShadow={3} pb={1} position="relative" className={props.className}>
			{props.title === 'Premium' ? (
				<Box position="absolute" top={0} right="10%">
					<StarBorderIcon fontSize="large" />
				</Box>
			) : null}
			<Box pt={5} bgcolor="#eeeeee">
				<Typography variant="h5">
					<Box>{props.title}</Box>
				</Typography>
				<Box
					border={3}
					borderBottom={0}
					borderLeft={0}
					borderRight={0}
					borderColor="primary.main"
					width={40}
					display="inline-block"
				>
					<Typography component="br"></Typography>
				</Box>
			</Box>

			<Box component="h1" fontWeight="fontWeightBold" display="inline">
				{props.price === 0 ? 'FREE' : `$ ${props.price}`}
			</Box>

			<Box display="inline" component="h2" color="text.secondary">
				{props.price === 0 ? null : '/mo'}
			</Box>

			<Box mt={7} mb={7} position="relative">
				<Typography component="h1" variant="h3" gutterBottom>
					<Box fontWeight="fontWeightBold">{props.capacity}</Box>
				</Typography>
			</Box>
			<CardActions>
				<ButtonComponent fullWidth color="primary" variant="contained" onClick={props.onClick}>
					{t('chooseplanbox.get_started')}
				</ButtonComponent>
			</CardActions>
		</Box>
	);
};
export default ChoosePlanBox;
