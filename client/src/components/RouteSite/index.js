import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegistrationPage from '../../page/RegistrationPage';
import LoginPage from '../../page/LoginPage';
import MainPage from '../../page/MainPage';


function RouteSite() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/registration" element={<RegistrationPage />} /> 
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/*" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSite;