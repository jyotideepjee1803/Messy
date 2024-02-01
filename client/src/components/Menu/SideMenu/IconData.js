import React from "react";
import {Home, CurrencyRupee, ConfirmationNumber, AdminPanelSettings, Assignment} from '@mui/icons-material';

export const UserIcons = [
    {
        text : 'Home',
        icon : <Home/>,
        path : "/mess"
    },
    {
        text : 'BuyCoupon',
        icon : <CurrencyRupee/>,
        path : "/buyCoupon",
    },
    {
        text : 'My Coupon',
        icon : <ConfirmationNumber/>,
        path : "/mess"
    }
]

export const AdminIcons = [
    {
        text : 'Admin Panel',
        icon : <AdminPanelSettings/>,
        path : "/admin"
    },
    {
        text : 'Total Meals',
        icon : <Assignment/>,
        path : "/admin/totalMeal",
    },
]