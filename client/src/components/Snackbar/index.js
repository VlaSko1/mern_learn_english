import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { footerHeight } from '../utils/sizes';

export const SnackbarError = (props) => {

  return (
    <Snackbar
      open={props.isOpen}
      onClose={props.handleClose}
      autoHideDuration={5000}
      sx={{bottom: {xs: `${footerHeight + 1}vh`}}}
    >
      <Alert severity="error">
        {typeof props.text === 'object' ? props.text.map((el, ind) => <p key={ind + 1}>{el}</p>) : props.text}
      </Alert>
    </Snackbar>
  )
};

export const SnackbarOk = (props) => {

  return (
    <Snackbar
      open={props.isOpen}
      onClose={props.handleClose}
      autoHideDuration={5000}
      sx={{bottom: {xs: `${footerHeight + 1}vh`}}}
    >
      <Alert severity="success">
        {typeof props.text === 'object' ? props.text.map((el, ind) => <p key={ind + 1}>{el}</p>) : props.text}
      </Alert>
    </Snackbar>
  )
};
