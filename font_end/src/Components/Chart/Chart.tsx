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
					<Box style={{ fontSize: '2.5vw', marginTop: '2vw' }}>
						<Box fontWeight="fontWeightBold">{`${value}/${totalCapacity}`}</Box>
						<Box fontWeight="fontWeightBold" textAlign="center">
							GB
						</Box>
					</Box>
				</CircularProgressbarWithChildren>
			)}
		</ProgressProvider>
	);
};

export default Chart;
