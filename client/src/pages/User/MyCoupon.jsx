/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import axios, { getAxiosConfig } from '../../utils/axios';
import Table from '../../components/table/Table';
import { Grid } from '@mui/material';
import TableRowsLoader from '../../components/Loaders/TableLoader';

const MyCoupon = () => {

    const [menuData, setMenuData] = useState([]);
    const [coupon, setCoupon] = useState([
        [false, false, false, false, false, false, false], // Breakfast
        [false, false, false, false, false, false, false], // Lunch
        [false, false, false, false, false, false, false]  // Dinner
    ]);
    const [loadingMenu , setloadingMenu] = useState(false);
    const [loadingTaken, setLoadingTaken] = useState(false);

    const sortIdx = {'Monday' : 0, 'Tuesday' : 1, 'Wednesday' : 2, 'Thursday' : 3, 'Friday' : 4, 'Saturday' : 5, 'Sunday' : 6};
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const config = getAxiosConfig({ loggedInUser });

    const fetchCoupon = async()=>{
        try{
            const couponRes = await axios.post('api/user/getcoupon', {email : loggedInUser.email}, config);
            if(couponRes != null) setCoupon(couponRes.data.week);
            setLoadingTaken(false);
        }catch(error){
            console.error('Error fetching data:', error);
        }
    }

    useEffect(()=>{
        setLoadingTaken(true)
        fetchCoupon();
    },[])


    const fetchMenuData = async () => {      
        try {
        const response = await axios.get('api/user/getmenu', config);

        //sort according to day name : 
        let data = response.data;
        data.sort((a, b) => {return sortIdx[a.day] - sortIdx[b.day]})
        setMenuData(data);
        setloadingMenu(false);

        } catch (error) {
            console.error('Error fetching menu data : ', error);
        }
    };

    useEffect(()=>{
        setloadingMenu(true);
        fetchMenuData();
    },[])

    return (   
        <Grid 
            marginTop={2}
            alignItems="center"
            justifyContent="center"
            pb={5}
        >
        <Table data={menuData} taken={coupon} loading={loadingMenu == true || loadingTaken == true} title='My Coupon' />
        </Grid>
    )
}

export default MyCoupon;