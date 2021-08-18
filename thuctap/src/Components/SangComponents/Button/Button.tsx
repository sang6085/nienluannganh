import { Button as ButtonComponent} from "@material-ui/core";
import React from "react";
interface ButtonProps {
  variant?: "text" | "outlined" | "contained";
  color?: "default" | "inherit" | "primary" | "secondary";
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  onClick?: ()=>void;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: "reset" | "submit" | "button";
  size?: "small" | "medium" | "large";
  className?:string
}
const Button: React.FC <ButtonProps> = (props) => {
    return(
      <ButtonComponent
       variant={props.variant}
        disabled={props.disabled}
        color={props.color}
        startIcon={props.startIcon}
        endIcon={props.endIcon}
        type={props.type}
        onClick={props.onClick}
        size={props.size}
        fullWidth={props.fullWidth}
      >
        {props.children}
      </ButtonComponent>
    )
} 
export default Button