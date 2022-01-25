import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Button, Box, TextField, Typography } from '@mui/material';
import { SnackbarError, SnackbarOk } from '../Snackbar';

import { createSignUpWithThunk, getMessageSignUp, getMessageError, createSetError, createDelMessageSignUP } from '../../store/users';


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

const RegistrationComp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const clearForm = () => {
    setName('');
    setEmail('');
    setPassword('');
  }

  const dispatch = useDispatch();
 
  const [isSnackErrorOpen, setIsSnackErrorOpen] = useState(false);
  const [textSnackError, setTextSnackError] = useState('');

  const closeSnackError = useCallback(() => {
    setIsSnackErrorOpen(false);
    dispatch(createSetError(''));
  }, [dispatch]);

  let messageSignUp = useSelector(getMessageSignUp);
  const [isSnackOkOpen, setIsSnackOkOpen] = useState(false);
  const [textSnackOk, setTextSnackOk] = useState('');

  const closeSnackOk = useCallback(() => {
    setIsSnackOkOpen(false);
    dispatch(createDelMessageSignUP());
  }, [dispatch]);

  useEffect(() => {
    if (Boolean(messageSignUp)) {
      setTextSnackOk(messageSignUp);
      setIsSnackOkOpen(true);
      clearForm();
    } else {
      closeSnackOk();
      setTextSnackOk('');
    }
  }, [messageSignUp, closeSnackOk]);


  let messageError = useSelector(getMessageError);

  useEffect(() => {
    if (Boolean(messageError)) {
      setTextSnackError(messageError);
      setIsSnackErrorOpen(true);
    } else {
      closeSnackError();
      setTextSnackError('');
    }
  }, [messageError, closeSnackError]);


  

  
  const changeName = (event) => {
    let text = event.target.value;
    closeSnackOk();
    if (text.search(/[^\w-]/g) !== -1) {
      setTextSnackError('Поле name может содержать только латинский буквы, цифры, дефис и символ подчёркивания!');
      setIsSnackErrorOpen(true);
    }
    text = text.replace(/[^\w-]/g, '');
    setName(text);
  };
  const changeEmail = (event) => {
    let email = event.target.value;
    closeSnackOk();
    if (email.search(/[^\w.@_-]/g) !== -1) {
      setTextSnackError('Поле email может содержать только латинский буквы, цифры и символы: "@", "-", "_" или "." !');
      setIsSnackErrorOpen(true);
    }
    email = email.replace(/[^\w.@_-]/g, '');
    setEmail(email);
  };
  const changePassword = (event) => {
    let password = event.target.value;
    closeSnackOk();
    if (password.search(/[^0-9a-zA-Z@#^%$&*!]/g) !== -1) {
      setTextSnackError('Поле password может содержать только латинский буквы, цифры и символы: "@", "#", "^", "%", "$", "&", "*" или "!".');
      setIsSnackErrorOpen(true);
    }
    password = password.replace(/[^0-9a-zA-Z@#^%$&*!]/g, '');
    setPassword(password);
  };
  const registrationCheck = () => {
    closeSnackOk();
    let nameReg = /^[\w-]{3,20}/;
    let emailReg = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    let passwordReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}$/;
    const arrayError = [];

    if (!nameReg.test(name)) {
      arrayError.push("Поле name должно содержать в себе от 3 до 20 символов!");
    }
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
      dispatch(createSignUpWithThunk(name, email, password));
    }
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
        <Typography align="center" variant="h6" >Регистрация</Typography>
        <CssTextField value={name} onChange={changeName} label="name" type="text" id="registr_name" />
        <CssTextField value={email} onChange={changeEmail} label="email" type="email"  id="registr_email"/>
        <CssTextField value={password} onChange={changePassword} label="password" type="password" id="registr_password" />
        <Button variant="contained" onClick={registrationCheck}>Зарегистрироваться</Button>
      </Box>
      <SnackbarError
        isOpen={isSnackErrorOpen}
        handleClose={closeSnackError}
        text={textSnackError}
      />
      <SnackbarOk
        isOpen={isSnackOkOpen}
        handleClose={closeSnackOk}
        text={textSnackOk}
      />
    </>
  )
};

export default RegistrationComp;