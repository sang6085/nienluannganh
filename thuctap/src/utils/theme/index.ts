import { createMuiTheme } from '@material-ui/core/styles';

export const palette = {
	primary: '#0087ff',
	secondary: '#F50057',
	green: '#4CAF50',
	white: '#FFFFFF',
	black: '#000000',
	darkBlue: '#263238',
	lightWhite: '#D9E3F0',
	yellow: '#FCCB00',
	grey: '#808080',
	red: '#B80000',
};

const theme = createMuiTheme({
	palette: {
		primary: {
			main: palette.primary,
		},
		secondary: {
			main: palette.secondary,
		},
		success: {
			main: palette.green,
		},
		error: {
			main: palette.red,
		},
	},
});
export default theme;
