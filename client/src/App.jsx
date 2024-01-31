import React from 'react'
import {Routes, Route} from "react-router-dom";

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MessMenuPage from './pages/MessMenuPage';
import RegisterPage from './pages/RegisterPage';
import BuyCouponPage from './pages/BuyCouponPage';

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/mess" element={<MessMenuPage/>}/>
        <Route path="/buycoupon" element={<BuyCouponPage/>}/>
      </Routes>
    </div>
  )
}

export default App
