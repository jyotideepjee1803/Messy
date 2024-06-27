/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo, useCallback} from 'react';
import axios, { getAxiosConfig } from '../../utils/axios';

import { Box, Button, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import {ShoppingCart} from '@mui/icons-material/';
import Toast from '../../components/Toast';

import AlertCard from './PageComponent/AlertCard';
import { mycoupon } from '../../utils/alerts';

const BuyCouponPage = () => {
 
    const [menuData, setMenuData] = useState([]);
    const [coupon, setCoupon] = useState();
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState('success');
    const [loadingMenu , setloadingMenu] = useState(false);
    const [loadingCoupon, setLoadingCoupon] = useState(false);

    const [bought, setBought] = useState(false);

    const [selectedItems, setSelectedItems] = useState([
        [false, false, false, false, false, false, false], // Breakfast
        [false, false, false, false, false, false, false], // Lunch
        [false, false, false, false, false, false, false]  // Dinner
    ]);

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const config = useMemo(() => getAxiosConfig({ loggedInUser }), [loggedInUser]);

    const sortIdx = useMemo(() => ({ 'Monday': 0, 'Tuesday': 1, 'Wednesday': 2, 'Thursday': 3, 'Friday': 4, 'Saturday': 5, 'Sunday': 6 }), []);
    const mp = useMemo(() => ({ 'breakfast': 0, 'lunch': 1, 'dinner': 2 }), []);


    const handleToastOpen = (message, severity) => {
        setToastMessage(message);
        setToastSeverity(severity);
        setToastOpen(true);
      };
    
    const handleToastClose = () => {
        setToastOpen(false);
    };

    const [mealCost, setMealCost] = useState({
        breakfast: 0,
        lunch: 0,
        dinner: 0
    });
    const [total , setTotal] = useState(0);

    var date = new Date();
    var currentDateTime = date.toISOString(); 

    const getDayDifference = useCallback((dateString1, dateString2) => {
        const date1 = new Date(dateString1);
        const date2 = new Date(dateString2);
        const timeDifference = Math.abs(date2.getTime() - date1.getTime());
        return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    }, []);

    const fetchMenuData = async () => {      
        try {
        const response = await axios.get('api/user/getmenu', config);
        
        //sort according to day name : 
        let data = response.data;
        data.sort((a,b)=>{return sortIdx[a.day] - sortIdx[b.day]})
        setMenuData(data);
        setloadingMenu(false);
        
        } catch (error) {
        console.error('Error fetching menu data:', error);
        }
    };

    const fetchCoupon = async()=>{
        try{
            const couponRes = await axios.post('api/user/getcoupon', {email : loggedInUser.email}, config);
            setCoupon(couponRes.data);
            setLoadingCoupon(false);
        }catch(error){
            console.error('Error fetching data:', error);
        }
    }

    const check = useCallback(async()=>{
        const response = await axios.get("api/user/getmeal" , config);
        const breakfastCost = response.data.find(meal => meal.mealName === 'breakfast').cost;
        const lunchCost = response.data.find(meal => meal.mealName === 'lunch').cost;
        const dinnerCost = response.data.find(meal => meal.mealName === 'dinner').cost;
        setMealCost({
            breakfast: breakfastCost,
            lunch: lunchCost,
            dinner: dinnerCost
        });
    },[config]);

    useEffect(()=>{
        setLoadingCoupon(true);
        fetchCoupon();
    },[])

    useEffect(() => {
        setloadingMenu(true);
        fetchMenuData();
    }, []);

    useEffect(()=>{
        check();
    },[])

    const handleCheckboxChange = (mealIndex, dayIndex)=>{
        const newSelected = [...selectedItems];
        newSelected[mealIndex][dayIndex] = !newSelected[mealIndex][dayIndex];
        setSelectedItems(newSelected);

        handleCost();
    }
    
    const paymentStatus = async(data)=>{
        const resp = await axios.post('/api/user/paymentStatus', data, config);
        if(resp.data){
            handleToastOpen('Coupon Bought', 'success');
            setBought(true);
        }
        else{
            handleToastOpen('Transaction Failed', 'error');
        }
    }    
    const initPayment = (res)=>{
        // const {data} = res.data;
        const options = {
            key: process.env.REACT_APP_RAZORPAY_ID_KEY,
            amount: res.data.amount.toString(),
            currency: res.data.currency,
            order_id: res.data.id,
            handler : async(res)=>{
                await paymentStatus(res)
            }
        }
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const handleBuy = async()=>{
        // const response = await axios.post("/api/user/buyCoupon", {email : loggedInUser.email, selected : selectedItems}, config)
        // navigate('/pay', { state: { total } });
        try{
            
            const res = await axios.post('api/user/initiatePayment', {amount : total, selected : selectedItems}, config);
            initPayment(res);
        }catch(error){
            handleToastOpen('Transaction Failed', 'error');
        }
    }

    const handleCost = () => {
        
        let totalCost = 0;

        // Calculate total cost based on selected checkboxes
        selectedItems[mp['breakfast']].forEach((isSelected, index) => {
            if (isSelected) {
                totalCost +=mealCost.breakfast; 
            }
        });

        selectedItems[mp['lunch']].forEach((isSelected, index) => {
            if (isSelected) {
                totalCost += mealCost.lunch;
            }
        });

        selectedItems[mp['dinner']].forEach((isSelected, index) => {
            if (isSelected) {
                totalCost += mealCost.dinner; 
            }
        });
        setTotal(totalCost);
    };

    return(

        loadingMenu || loadingCoupon ? (
        <CircularProgress
            size={70}
            sx={{
              position: "fixed",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 2
            }}
          /> // Show loading indicator while data is being fetched
    ) : (
        <>
            {!bought && (!coupon || ((coupon.taken===true && getDayDifference(currentDateTime, coupon.updatedAt) >=5) || coupon.taken===false)) ?
            (
                <Grid 
                    marginTop={5}
                    container 
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                >
                    <Toast
                        open={toastOpen}
                        severity={toastSeverity}
                        message={toastMessage}
                        onClose={handleToastClose}
                    />
                    <Box sx={{backgroundColor:'white', borderRadius:1, padding:3, boxShadow:1}}>
                        <Box>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: "lightgray", boxShadow: "1" }}>
                                            <TableCell>Day</TableCell>
                                            <TableCell>{`Breakfast (Rs. ${mealCost.breakfast})`}</TableCell>
                                            <TableCell>{`Lunch (Rs. ${mealCost.lunch})`}</TableCell>
                                            <TableCell>{`Dinner (Rs. ${mealCost.dinner})`}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {menuData.map((rowData, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{rowData.day}</TableCell>
                                                <TableCell
                                                    sx={{ cursor: 'pointer', backgroundColor: selectedItems[0]?.[index] && "#ceface" }}
                                                    onClick={() => handleCheckboxChange(0, index)}
                                                >
                                                    {rowData.breakfast}
                                                </TableCell>
                                                <TableCell
                                                    sx={{ cursor: 'pointer', backgroundColor: selectedItems[1]?.[index] && "#ceface" }}
                                                    onClick={() => handleCheckboxChange(1, index)}
                                                >
                                                    {rowData.lunch}
                                                </TableCell>
                                                <TableCell
                                                    sx={{ cursor: 'pointer', backgroundColor: selectedItems[2]?.[index] && "#ceface" }}
                                                    onClick={() => handleCheckboxChange(2, index)}
                                                >
                                                    {rowData.dinner}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                        
                        <Box ml={2} mt={2} textAlign="right" alignSelf={'right'}>
                            <Box py={1} mb={1}><Typography variant='h6'>{`Total cost:  ₹${total}.00`}</Typography></Box>
                            
                            <Button variant="contained" onClick={handleBuy} disabled={total === 0}>
                                <Typography mr={1}>Buy</Typography> <ShoppingCart/>
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            ) 
            : (
                <AlertCard title={mycoupon.title} subtitle={mycoupon.subtitle} redir={mycoupon.redir} img={mycoupon.img} buttonText={mycoupon.buttonText}/>

            )}
        </>
    )
    )
};

export default BuyCouponPage;