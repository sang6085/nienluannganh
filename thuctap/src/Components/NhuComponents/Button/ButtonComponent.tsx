import { Button } from "@material-ui/core"
interface ButtonComponentProps {
    label: string,
    color?: 'inherit'
    | 'primary'
    | 'secondary',
    variant?: 'contained'
    | 'outlined'
    | 'text'

    onClick?: () => void
}
const ButtonComponent: React.FC<ButtonComponentProps> = (props) => {
    return (
        <Button variant={props.variant || "contained"} color={props.color || 'primary'} onClick={props.onClick}>
            {props.label}
        </Button>
    )
}
export default ButtonComponent;