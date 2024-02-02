/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import axios, { getAxiosConfig } from '../../utils/axios';
import Table from '../../components/Menu/Table';
import { Grid, Typography } from '@mui/material';

const MyCoupon = () => {

    const [menuData, setMenuData] = useState([]);
    const [coupon, setCoupon] = useState([
        [false, false, false, false, false, false, false], // Breakfast
        [false, false, false, false, false, false, false], // Lunch
        [false, false, false, false, false, false, false]  // Dinner
    ]);

    const sortIdx = {'Monday' : 0, 'Tuesday' : 1, 'Wednesday' : 2, 'Thursday' : 3, 'Friday' : 4, 'Saturday' : 5, 'Sunday' : 6};
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const config = getAxiosConfig({ loggedInUser });

    const fetchCoupon = async()=>{
        try{
            const couponRes = await axios.post('api/user/getcoupon', {email : loggedInUser.email}, config);
            if(couponRes != null) setCoupon(couponRes.data.week);
        }catch(error){
            console.error('Error fetching data:', error);
        }
    }

    useEffect(()=>{
        fetchCoupon();
    },[])


    const fetchMenuData = async () => {      
        try {
        const response = await axios.get('api/user/getmenu', config);

        //sort according to day name : 
        let data = response.data;
        data.sort((a, b) => {return sortIdx[a.day] - sortIdx[b.day]})
        setMenuData(data);

        } catch (error) {
            console.error('Error fetching menu data : ', error);
        }
    };

    useEffect(()=>{
        fetchMenuData();
    },[])

    // const logout = () =>{
    //     localStorage.removeItem("loggedInUser");
    //     navigate("/");
    // }

    return (
        // <div>
        //     {/* Mess Menu */}
        //     <Table data={menuData}/>
        // </div>
        <Grid 
            marginTop={5}
            container 
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
        >
            <Typography variant='h3'>My Coupons</Typography>
            <Table data={menuData} taken={coupon}/>
        </Grid>
    )
}

export default MyCoupon;