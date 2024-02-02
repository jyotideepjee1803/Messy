import React from "react";
import {Home, CurrencyRupee, ConfirmationNumber, AdminPanelSettings, Assignment} from '@mui/icons-material';

export const UserIcons = [
    {
        text : 'Home',
        icon : <Home/>,
        path : "/mess",
        tooltitle : 'Home'
    },
    {
        text : 'BuyCoupon',
        icon : <CurrencyRupee/>,
        path : "/buycoupon",
        tooltitle : 'Buy Coupon'
    },
    {
        text : 'My Coupon',
        icon : <ConfirmationNumber/>,
        path : "/mycoupon",
        tooltitle : 'My Coupons'
    }
]

export const AdminIcons = [
    {
        text : 'Admin Panel',
        icon : <AdminPanelSettings/>,
        path : "/admin",
        tooltitle : 'Admin Panel'
    },
    {
        text : 'Total Meals',
        icon : <Assignment/>,
        path : "/admin/totalMeal",
        tooltitle : 'Total Meals'
    },
]