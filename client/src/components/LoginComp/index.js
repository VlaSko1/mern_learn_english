import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Button, Box, TextField, Typography } from '@mui/material';
import { SnackbarError } from '../Snackbar';

import { createSignInWithThunk, getMessageError, getAuth} from '../../store/users';
import { useNavigate } from 'react-router-dom';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'green',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#1976d2',
    },
    '&:hover fieldset': {
      borderColor: '#F4A460',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
    marginBottom: "5px"
  },

});

const LoginComp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  let isAuth = useSelector(getAuth);
  const navigate = useNavigate();

  const [isSnackErrorOpen, setIsSnackErrorOpen] = useState(false);
  const [textSnackError, setTextSnackError] = useState('');

  const closeSnackError = () => {
    setIsSnackErrorOpen(false);
  }

  let messageError = useSelector(getMessageError);

  useEffect(() => {
    if (Boolean(messageError)) {
      setTextSnackError(messageError);
      setIsSnackErrorOpen(true);
    } else {
      closeSnackError();
      setTextSnackError('');
    }
  }, [messageError]);



  const changeEmail = (event) => {
    let email = event.target.value;
    closeSnackError();
    if (email.search(/[^\w.@_-]/g) !== -1) {
      setTextSnackError('Поле email может содержать только латинский буквы, цифры и символы: "@", "-", "_" или "." !');
      setIsSnackErrorOpen(true);
    }
    email = email.replace(/[^\w.@_-]/g, '');
    setEmail(email);
  };
  const changePassword = (event) => {
    let password = event.target.value;
    closeSnackError();
    if (password.search(/[^0-9a-zA-Z@#^%$&*!]/g) !== -1) {
      setTextSnackError('Поле password может содержать только латинский буквы, цифры и символы: "@", "#", "^", "%", "$", "&", "*" или "!".');
      setIsSnackErrorOpen(true);
    }
    password = password.replace(/[^0-9a-zA-Z@#^%$&*!]/g, '');
    setPassword(password);
  };
  const loginCheck = () => {
    closeSnackError();
    let emailReg = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    let passwordReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}$/;
    const arrayError = [];

    if (!emailReg.test(email)) {
      arrayError.push("Введенная в поле email строка не является адресом электронной почты!");
    }
    if (!passwordReg.test(password)) {
      arrayError.push("Поле password должно содержать хотя бы одну цифру, " +
       "хотя бы по одной латинской букве в верхнем и нижнем регистре, хотя бы один спецсимвол и не может быть менее 6 символов!");
    }
    if (arrayError.length !== 0) {
      setTextSnackError(arrayError);
      setIsSnackErrorOpen(true);
    } else {
      dispatch(createSignInWithThunk(email, password));
    }
  };
  
  if (isAuth) {  
    setTimeout(() => navigate('/'), 100);
  }
  return (
    <>
      <Box p={1}
        component="form"
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '280px',
          border: "1px solid #808080",
          borderRadius: "20px",
          backgroundColor: "#FAF0E6"
        }}
      >
        <Typography align="center" variant="h6" >Авторизация</Typography>
        <CssTextField value={email} onChange={changeEmail} label="email" type="email" id="login_email" />
        <CssTextField value={password} onChange={changePassword} label="password" type="password" id="login_password" />
        <Button variant="contained" onClick={loginCheck}>Войти</Button>
      </Box>
      <SnackbarError
        isOpen={isSnackErrorOpen}
        handleClose={closeSnackError}
        text={textSnackError}
      />
    </>
  )
};

export default LoginComp;