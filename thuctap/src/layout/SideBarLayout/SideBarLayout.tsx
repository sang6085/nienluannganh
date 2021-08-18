import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Logo from '../../public/images/logo.png';
import DividerComponent from '../../Components/Divider/Divider';
import { NavLink } from 'react-router-dom';
import ListItemComponent from '../../Components/ListItem/ListItem';
import { useAppDispatch } from '../../app/hooks';
import { updateTitleHeader } from './SideBarSlice';
import { useTranslation } from 'react-i18next';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		hide: {
			display: 'none',
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
			whiteSpace: 'nowrap',
		},
		drawerOpen: {
			width: drawerWidth,
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		drawerClose: {
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			overflowX: 'hidden',
			width: theme.spacing(7) + 1,
			[theme.breakpoints.up('sm')]: {
				width: theme.spacing(9) + 1,
			},
		},
		toolbar: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			padding: theme.spacing(0, 1),
			...theme.mixins.toolbar,
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(1),
			background: '#fff',
		},
		logoOpen: {
			width: 140,
			height: 40,
		},
		logoClose: {
			width: 70,
			height: 20,
		},

		button: {},
		selected: {
			background: '#e3f2fd',
		},
		defaultColor: {},
		activeColor: { color: '#1bb55c' },
		link: {
			color: '#1bb55c !important',
			textDecoration: 'none',
			background: '#e3f2fd',
		},
		default: {
			color: '#000',
			textDecoration: 'none',
		},
	})
);

interface IList {
	text: string;
	icon?: React.ReactNode;
	url?: string;
}

interface ISelected {
	index?: number | undefined;
	selected?: boolean;
}

interface props {
	open?: boolean;
	list: IList[];
	pageName?: string;
}

const IList = [
	{
		text: '1',
		icon: '',
		url: '',
	},
	{
		text: '2',
		icon: '',
		url: '',
	},
];

const SideBarLayout: React.FC<props> = (props) => {
	const classes = useStyles();

	const [selectedItem, setSelectedItem] = React.useState<ISelected>({
		index: undefined,
		selected: false,
	});

	const { open, list } = props;
	const dispatch = useAppDispatch();
	const [t] = useTranslation();

	const handleClick = (i: number, str: string): void => {
		setSelectedItem({
			index: i,
			selected: true,
		});

		const action = updateTitleHeader(str);
		dispatch(action);
	};

	return (
		<div>
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<div className={classes.toolbar}>
					<img className={open ? classes.logoOpen : classes.logoClose} src={Logo} />
				</div>
				<DividerComponent />
				{list?.map((item, index) => (
					<NavLink
						activeClassName={classes.link}
						className={classes.default}
						to={{ pathname: item?.url }}
						key={index}
					>
						<ListItemComponent
							onClick={() => handleClick(index, item.text)}
							button
							key={index}
							className={clsx(classes.button, {
								[classes.selected]: selectedItem.index === index,
							})}
						>
							<ListItemIcon
								className={clsx(classes.defaultColor, {
									[classes.activeColor]: selectedItem.index === index,
								})}
							>
								{item?.icon}
							</ListItemIcon>
							<ListItemText
								className={clsx(classes.defaultColor, {
									[classes.activeColor]: selectedItem.index === index,
								})}
							>
								{t('sidebar.' + item.text)}
							</ListItemText>
						</ListItemComponent>
					</NavLink>
				))}
			</Drawer>
		</div>
	);
};

export default SideBarLayout;
