import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import ProgressProvider from './ProgressProvider';
import theme from '../../utils/theme';
import { Box } from '@material-ui/core';
interface ChartProps {
	usedCapacity?: number;
	totalCapacity?: number;
}
const Chart: React.FC<ChartProps> = (props) => {
	const { usedCapacity, totalCapacity } = props;

	return (
		<ProgressProvider valueStart={0} valueEnd={usedCapacity}>
			{(value: number) => (
				<CircularProgressbarWithChildren
					strokeWidth={10}
					value={(value / (totalCapacity || 0)) * 100}
					styles={buildStyles({
						strokeLinecap: 'butt',
						textColor: `${theme.palette.success.contrastText}`,
						pathColor: `${
							value / Number(totalCapacity) >= 0.8
								? theme.palette.warning.main
								: theme.palette.primary.main
						}`,
					})}
				>
					<Box style={{ fontSize: '2.5vw', marginTop: '1vw', color: 'blue' }}>
						{/* <Box fontWeight="fontWeightBold">{`${value}/${totalCapacity}`}</Box>
						<Box fontWeight="fontWeightBold" textAlign="center">
							GB
						</Box> */}
						{(Number(usedCapacity) / Number(totalCapacity)) * 100 > 100
							? '100.0%'
							: ((Number(usedCapacity) / Number(totalCapacity)) * 100).toFixed(1) + '%'}
						{/* {((Number(usedCapacity) / Number(totalCapacity)) * 100).toFixed(1)}% */}
					</Box>
				</CircularProgressbarWithChildren>
			)}
		</ProgressProvider>
	);
};

export default Chart;
