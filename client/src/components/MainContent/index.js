import React from 'react';
import {Box, Typography } from '@mui/material';

const MainContent = () => {
  return (
    <Box sx={{ flexGrow: 1, height: "100%", paddingTop: "24px", overflowX: 'hidden', overflowY: "auto", textAlign: 'justify' }}>
      <Typography variant="h4" component="div" textAlign="center">
        Изучаем английские слова!
      </Typography>
      <Typography variant="body1" component="div" paragraph >
        Добрый день, уважаемый посетитель! Приветствуем тебя на сайте <Typography variant="h6" component="span"> Learning English Words!</Typography>&nbsp; 
        Данный сайт будет полезен всем, кто интересуется изучением английского языка. Здесь мы будем учить английские слова в игровой форме. 
        На сайте представлены несколько видов тренировок:
        <Typography>1. Перевод слова - предлагается ввести в текстовое поле одно из значений на русском языке данного английского слова. </Typography>
        <Typography>2. Часть речи - предлагается выбрать часть речи, к которой относится слово. </Typography>
        <Typography>3. Обратный перевод - дано русское слово, нужно ввести в текстовое поле его английский вариант. </Typography> 
        <Typography fontWeight="bold">В планах:</Typography> 
        1. Реализация разбиения словаря по темам и поддержка возможности пользователя формировать собственные словари. <br/>
        2. Создание большего количества тренажёров.<br/>
        3. Организация дуэлей, соревнований и турниров между пользователями. <br/>
        4. Реализация рейтинговой системы для пользователей. <br/><br/>
        Всем желаем удачи в изучении английского языка!
      </Typography>
    </Box>
  )
};

export default MainContent;


