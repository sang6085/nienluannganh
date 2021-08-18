import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& > *': {
				margin: theme.spacing(1),
			},
		},
	})
);

interface Props {
	badgeContent?: number;
	color?: 'default' | 'primary' | 'secondary';
	icon?: any;
}

export const SimpleBadge = ({ badgeContent, color, icon }: Props): React.ReactElement => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Badge badgeContent={badgeContent} color={color}>
				<MailIcon />
			</Badge>
		</div>
	);
};
