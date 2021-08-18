import { Avatar } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import React from 'react';
import IconButton from '../Button/IconButton';
interface AvatarComponentProps {
	src: any;
	alt?: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const AvatarComponent: React.FC<AvatarComponentProps> = (props) => {
	return (
		<Grid container justify="flex-end">
			<Grid item>
				<Avatar>
					<IconButton onClick={props.onClick}>
						<Avatar alt={props.alt} src={props.src}></Avatar>
					</IconButton>
				</Avatar>
			</Grid>
		</Grid>
	);
};
export default AvatarComponent;
