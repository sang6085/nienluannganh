import { Button } from '@material-ui/core';
interface ButtonComponentProps {
	className?: any;
	color?: 'inherit' | 'primary' | 'secondary';
	variant?: 'contained' | 'outlined' | 'text';
	fullWidth?: true | false;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	href?: string | undefined;
	size?: 'small' | 'medium' | 'large';
	children?: React.ReactNode;
	disabled?: boolean;
	type?: 'reset' | 'submit' | 'button';
}
const ButtonComponent: React.FC<ButtonComponentProps> = (props) => {
	return (
		<Button
			className={props.className}
			href={props.href}
			size={props.size || 'medium'}
			variant={props.variant || 'contained'}
			color={props.color || 'primary'}
			fullWidth={props.fullWidth || false}
			onClick={props.onClick}
			disabled={props.disabled || false}
			type={props.type}
		>
			{props.children}
		</Button>
	);
};
export default ButtonComponent;
