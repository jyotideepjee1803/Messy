import React from 'react'
import {Routes, Route} from "react-router-dom";

import HomePage from './pages/HomePage';
import LoginPage from './pages/Auth/LoginPage';
import MessMenuPage from './pages/User/MessMenuPage';
import RegisterPage from './pages/Auth/RegisterPage';
import BuyCouponPage from './pages/User/BuyCouponPage';
import AdminTaskPage from './pages/Admin/AdminTaskPage';
import MealCountPage from './pages/Admin/MealCountPage';
import SideMenu from './components/Menu/SideMenu/SideMenu';

const App = () => {
  return (
    <>
    <SideMenu/>
    <Routes>
         <Route path="/" element={<HomePage/>}/>
         <Route path="/login" element={<LoginPage/>}/>
         <Route path="/register" element={<RegisterPage/>}/>
         <Route path="/mess" element={<MessMenuPage/>}/>
         <Route path="/buycoupon" element={<BuyCouponPage/>}/>
         <Route path="/admin" element={<AdminTaskPage/>}/>
         <Route path="/admin/totalMeal" element={<MealCountPage/>}/>
    </Routes>
    </>
  )
}

export default App
