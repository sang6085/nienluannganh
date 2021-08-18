import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

interface Props {
  variant?: "contained",
  color?: "primary" | "secondary",
  label?: string,
  onClick?: () => void,
}

export const ContainedButton = ({variant, color, label, onClick}: Props) : React.ReactElement => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button variant={variant} color={color} onClick={onClick}>{label}</Button>   
    </div>
  );
}
