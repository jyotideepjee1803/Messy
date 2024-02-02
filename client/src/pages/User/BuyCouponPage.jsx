/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { getAxiosConfig } from '../../utils/axios';
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import {ShoppingCart} from '@mui/icons-material/';

const BuyCouponPage = () => {
    
    const [menuData, setMenuData] = useState([]);
    const [coupon, setCoupon] = useState();
    // const [loading, setLoading] = useState(false);
    const [mealCost, setMealCost] = useState({
        breakfast: 0,
        lunch: 0,
        dinner: 0
    });
    const [total , setTotal] = useState(0);

    var date = new Date();
    var currentDateTime = date.toISOString(); 

    const getDayDifference = (dateString1, dateString2) => {
        const date1 = new Date(dateString1);
        const date2 = new Date(dateString2);

        const timeDifference = Math.abs(date2.getTime() - date1.getTime());

        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    
        return daysDifference;
    }

    const mp = {'breakfast' : 0, 'lunch' : 1, 'dinner' : 2}
    const sortIdx = {'Monday' : 0, 'Tuesday' : 1, 'Wednesday' : 2, 'Thursday' : 3, 'Friday' : 4, 'Saturday' : 5, 'Sunday' : 6};
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const config = getAxiosConfig({ loggedInUser });

    const fetchMenuData = async () => {      
        try {
        const response = await axios.get('api/user/getmenu', config);
        
        //sort according to day name : 
        let data = response.data;
        data.sort((a,b)=>{return sortIdx[a.day] - sortIdx[b.day]})
        setMenuData(data);
        
        } catch (error) {
        console.error('Error fetching menu data:', error);
        }
    };

    const fetchCoupon = async()=>{
        try{
            const couponRes = await axios.post('api/user/getcoupon', {email : loggedInUser.email}, config);
            setCoupon(couponRes.data);
            console.log(couponRes.data);
        }catch(error){
            console.error('Error fetching data:', error);
        }
    }

    const check = async()=>{
        const response = await axios.get("api/user/getmeal" , config);
        // console.log(res);
        const breakfastCost = response.data.find(meal => meal.mealName === 'breakfast').cost;
        const lunchCost = response.data.find(meal => meal.mealName === 'lunch').cost;
        const dinnerCost = response.data.find(meal => meal.mealName === 'dinner').cost;
        setMealCost({
            breakfast: breakfastCost,
            lunch: lunchCost,
            dinner: dinnerCost
        });
    }

    useEffect(()=>{
        fetchCoupon();
    },[])

    useEffect(() => {
        fetchMenuData();
    }, []);

    useEffect(()=>{
        check();
    },[])

    const [selectedItems, setSelectedItems] = useState([
        [false, false, false, false, false, false, false], // Breakfast
        [false, false, false, false, false, false, false], // Lunch
        [false, false, false, false, false, false, false]  // Dinner
    ]);

    const navigate = useNavigate();

    const handleCheckboxChange = (mealIndex, dayIndex)=>{
        const newSelected = [...selectedItems];
        newSelected[mealIndex][dayIndex] = !newSelected[mealIndex][dayIndex];
        setSelectedItems(newSelected);

        handleCost();
    }
    
    const handleBuy = async()=>{
        const response = await axios.post("/api/user/buyCoupon", {email : loggedInUser.email, selected : selectedItems}, config)
        // console.log(response);
        navigate('/pay', { state: { total } });
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

    return (
        <Grid 
            marginTop={5}
            container 
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
        >
            {!coupon || ((coupon.taken===true && getDayDifference(currentDateTime, coupon.updatedAt) >=5) || coupon.taken===false) ? 
            (
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
                    
                    <Button variant="contained" onClick={handleBuy}>
                        <Typography mr={1}>Buy</Typography> <ShoppingCart/>
                    </Button>
                </Box>
            </Box>
            ) : (
                <div>
                    You've already bought coupon
                </div>
            )}
        </Grid>
    );
};

export default BuyCouponPage;
