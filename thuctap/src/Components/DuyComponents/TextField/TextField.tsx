import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

interface Props {
  id?: string,
  variant?: "outlined",
  label?: string,
  value?: any,
  defaultValue?: any,
  onChange?: () => void, 
}

export const BasicTextFields = ({id, variant, label, value, defaultValue, onChange}: Props) : React.ReactElement => {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id={id} label={label} variant={variant} value={value} defaultValue={defaultValue} onChange={onChange} />
    </form>
  );
}
